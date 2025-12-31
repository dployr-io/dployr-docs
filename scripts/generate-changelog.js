#!/usr/bin/env node

/**
 * Changelog Generator
 * Fetches CHANGELOG.md files from dployr repositories and intelligently merges them
 * Groups by semantic version and date, consolidating related changes
 */

import { writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const CHANGELOG_SOURCES = [
  {
    name: 'dployr',
    displayName: 'Dployr',
    description: 'Main CLI and daemon',
    url: 'https://raw.githubusercontent.com/dployr-io/dployr/refs/heads/master/CHANGELOG.md',
    repo: 'dployr-io/dployr'
  },
  {
    name: 'dployr-base',
    displayName: 'Dployr Base',
    description: 'Control plane',
    url: 'https://raw.githubusercontent.com/dployr-io/dployr-base/refs/heads/main/CHANGELOG.md',
    repo: 'dployr-io/dployr-base'
  },
  {
    name: 'dployr-web',
    displayName: 'Dployr Web',
    description: 'Web dashboard',
    url: 'https://raw.githubusercontent.com/dployr-io/dployr-web/refs/heads/main/CHANGELOG.md',
    repo: 'dployr-io/dployr-web'
  }
]

const VERSION_API_URL = 'https://base.dployr.io/v1/runtime/versions'

function parseVersion(versionString) {
  // Extract version like "0.4.13-beta.20" or "0.4.0"
  const match = versionString.match(/\[?(\d+\.\d+\.\d+(?:-[a-z]+\.\d+)?)\]?/)
  if (!match) return null
  
  const version = match[1]
  const parts = version.split('-')
  const semver = parts[0].split('.').map(Number)
  
  let prerelease = null
  let prereleaseNum = null
  
  if (parts[1]) {
    const preMatch = parts[1].match(/([a-z]+)\.(\d+)/)
    if (preMatch) {
      prerelease = preMatch[1]
      prereleaseNum = parseInt(preMatch[2])
    }
  }
  
  return {
    full: version,
    major: semver[0],
    minor: semver[1],
    patch: semver[2],
    prerelease,
    prereleaseNum,
    isPrerelease: !!prerelease,
    // Numeric value for sorting (major.minor.patch)
    numericValue: semver[0] * 1000000 + semver[1] * 1000 + semver[2]
  }
}

function compareVersions(a, b) {
  // Parse component@version format
  const parseComponentVersion = (cv) => {
    const [component, version] = cv.split('@')
    return { component, version, parsed: parseVersion(version) }
  }
  
  const aData = parseComponentVersion(a)
  const bData = parseComponentVersion(b)
  
  // Same component, sort by version
  if (aData.component === bData.component) {
    const aParsed = aData.parsed
    const bParsed = bData.parsed
    
    // Compare numeric value (major.minor.patch)
    if (aParsed.numericValue !== bParsed.numericValue) {
      return bParsed.numericValue - aParsed.numericValue
    }
    
    // If same base version, stable comes before beta
    if (aParsed.isPrerelease && !bParsed.isPrerelease) return 1
    if (!aParsed.isPrerelease && bParsed.isPrerelease) return -1
    
    // Both prerelease, sort by prerelease number (higher first)
    if (aParsed.isPrerelease && bParsed.isPrerelease) {
      return bParsed.prereleaseNum - aParsed.prereleaseNum
    }
    
    return 0
  }
  
  // Different components, sort by component name
  return aData.component.localeCompare(bData.component)
}

function parseChangelog(content, sourceName) {
  const entries = []
  const lines = content.split('\n')
  
  let currentEntry = null
  let currentSection = null
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    
    // Match version header: ## [0.4.13-beta.20] - 2025-12-31
    const versionMatch = line.match(/^##\s+\[([^\]]+)\]\s+-\s+(.+)/)
    if (versionMatch) {
      if (currentEntry) {
        entries.push(currentEntry)
      }
      
      const versionInfo = parseVersion(versionMatch[1])
      currentEntry = {
        version: versionMatch[1],
        versionInfo,
        date: versionMatch[2].trim(),
        source: sourceName,
        sections: {}
      }
      currentSection = null
      continue
    }
    
    // Match section header: ### 🚀 Features
    const sectionMatch = line.match(/^###\s+(.+)/)
    if (sectionMatch && currentEntry) {
      currentSection = sectionMatch[1].trim()
      currentEntry.sections[currentSection] = []
      continue
    }
    
    // Match list item: - *(scope)* Description
    if (line.trim().startsWith('-') && currentEntry && currentSection) {
      currentEntry.sections[currentSection].push(line.trim().substring(2))
    }
  }
  
  if (currentEntry) {
    entries.push(currentEntry)
  }
  
  return entries
}

function groupVersions(allEntries) {
  // Group by major.minor version
  const grouped = {}
  
  allEntries.forEach(entry => {
    if (!entry.versionInfo) return
    
    const key = `${entry.versionInfo.major}.${entry.versionInfo.minor}`
    if (!grouped[key]) {
      grouped[key] = []
    }
    grouped[key].push(entry)
  })
  
  // Sort each group by version (latest first)
  Object.keys(grouped).forEach(key => {
    grouped[key].sort((a, b) => {
      // Compare patch
      if (a.versionInfo.patch !== b.versionInfo.patch) {
        return b.versionInfo.patch - a.versionInfo.patch
      }
      // Compare prerelease
      if (a.versionInfo.isPrerelease && !b.versionInfo.isPrerelease) return 1
      if (!a.versionInfo.isPrerelease && b.versionInfo.isPrerelease) return -1
      if (a.versionInfo.prereleaseNum && b.versionInfo.prereleaseNum) {
        return b.versionInfo.prereleaseNum - a.versionInfo.prereleaseNum
      }
      return 0
    })
  })
  
  return grouped
}

async function fetchVersionData() {
  try {
    const response = await fetch(VERSION_API_URL)
    
    if (!response.ok) {
      return null
    }
    
    const data = await response.json()
    
    if (data.success && data.data) {
      return {
        latest: data.data.latest,
        oldestSupported: data.data.oldestSupportedVersion,
        versions: data.data.versions
      }
    }
    return null
  } catch (error) {
    return null
  }
}

function isVersionDeprecated(version, versionData) {
  if (!versionData || !versionData.oldestSupported) return false
  
  // Parse both versions for comparison
  const versionParsed = parseVersion(version)
  const oldestParsed = parseVersion(versionData.oldestSupported)
  
  if (!versionParsed || !oldestParsed) return false
  
  // Compare numeric values
  if (versionParsed.numericValue < oldestParsed.numericValue) return true
  
  // Same base version, check prerelease
  if (versionParsed.numericValue === oldestParsed.numericValue) {
    if (versionParsed.isPrerelease && oldestParsed.isPrerelease) {
      return versionParsed.prereleaseNum < oldestParsed.prereleaseNum
    }
    if (versionParsed.isPrerelease && !oldestParsed.isPrerelease) return true
  }
  
  return false
}

async function fetchChangelog(source) {
  try {
    console.log(`Fetching changelog for ${source.name}...`)
    const response = await fetch(source.url)
    
    if (!response.ok) {
      console.warn(`⚠️  Failed to fetch ${source.name}: ${response.status}`)
      return null
    }
    
    const content = await response.text()
    console.log(`✓ Successfully fetched ${source.name}`)
    
    // Remove the main title (first # heading) if it exists
    const contentWithoutTitle = content.replace(/^#\s+[^\n]+\n+/, '')
    
    return {
      ...source,
      content: contentWithoutTitle.trim(),
      entries: parseChangelog(contentWithoutTitle, source.name)
    }
  } catch (error) {
    console.error(`✗ Error fetching ${source.name}:`, error.message)
    return null
  }
}

function generateChangelogMarkdown(changelogs, versionData) {
  const timestamp = new Date().toISOString()
  const readableDate = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZoneName: 'short'
  })
  
  let markdown = `<!-- 
  ⚠️  AUTO-GENERATED FILE - DO NOT EDIT MANUALLY
  This file is automatically generated from the CHANGELOG.md files in the dployr repositories.
  To update this changelog, run: npm run generate:changelog
  Last generated: ${timestamp}
-->

# Changelog

All notable changes to dployr are documented in this file.

This changelog intelligently merges updates from all dployr components:
- **dployr** - Main CLI and daemon
- **dployr-base** - Control plane
- **dployr-web** - Web dashboard

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

::: tip
For detailed commit history, visit the respective repositories: [dployr](https://github.com/dployr-io/dployr/commits) • [dployr-base](https://github.com/dployr-io/dployr-base/commits) • [dployr-web](https://github.com/dployr-io/dployr-web/commits)
:::

---

::: info Last Updated
${readableDate}
:::

`

  if (changelogs.length === 0) {
    markdown += `
::: warning No Changelogs Available
Unable to fetch changelogs from the repositories. Please check:
- [dployr CHANGELOG.md](https://github.com/dployr-io/dployr/blob/master/CHANGELOG.md)
- [dployr-base CHANGELOG.md](https://github.com/dployr-io/dployr-base/blob/main/CHANGELOG.md)
- [dployr-web CHANGELOG.md](https://github.com/dployr-io/dployr-web/blob/main/CHANGELOG.md)
:::
`
    return markdown
  }

  // Collect all entries from all changelogs
  const allEntries = []
  changelogs.forEach(changelog => {
    if (changelog.entries) {
      allEntries.push(...changelog.entries)
    }
  })

  // Group by major.minor version
  const grouped = groupVersions(allEntries)
  
  // Sort version groups (latest first)
  const sortedGroups = Object.keys(grouped).sort((a, b) => {
    const [aMajor, aMinor] = a.split('.').map(Number)
    const [bMajor, bMinor] = b.split('.').map(Number)
    if (aMajor !== bMajor) return bMajor - aMajor
    return bMinor - aMinor
  })

  // Generate markdown for each version group
  sortedGroups.forEach(versionGroup => {
    const entries = grouped[versionGroup]
    const latestEntry = entries[0]
    const isStable = !latestEntry.versionInfo.isPrerelease
    
    // Version header
    markdown += `\n## ${isStable ? '🎉' : '🚧'} Version ${versionGroup}.x\n\n`
    
    if (isStable) {
      markdown += `**Stable Release** • ${latestEntry.date}\n\n`
    } else {
      markdown += `**Beta Series** • Latest: ${latestEntry.version} (${latestEntry.date})\n\n`
    }

    // Merge all changes from this version group
    const mergedSections = {}
    const componentVersions = new Set()
    
    entries.forEach(entry => {
      componentVersions.add(`${entry.source}@${entry.version}`)
      
      Object.keys(entry.sections).forEach(sectionName => {
        if (!mergedSections[sectionName]) {
          mergedSections[sectionName] = []
        }
        
        entry.sections[sectionName].forEach(item => {
          // Add component tag to each item
          const componentTag = entry.source === 'dployr' ? 'dployrd' : 
                              entry.source === 'dployr-base' ? 'base' : 'web'
          mergedSections[sectionName].push({
            text: item,
            component: componentTag,
            version: entry.version
          })
        })
      })
    })

    // Show component versions (sorted semantically) with GitHub release links and deprecation markers
    markdown += `::: details Component Versions\n`
    Array.from(componentVersions).sort(compareVersions).forEach(cv => {
      const [component, version] = cv.split('@')
      const repoMap = {
        'dployr': 'dployr-io/dployr',
        'dployr-base': 'dployr-io/dployr-base',
        'dployr-web': 'dployr-web'
      }
      const repo = repoMap[component] || component
      const releaseUrl = `https://github.com/${repo}/releases/tag/v${version}`
      
      // Check if version is deprecated (only for dployr component)
      const isDeprecated = component === 'dployr' && versionData && isVersionDeprecated(version, versionData)
      const deprecationMarker = isDeprecated ? ' ⚠️ **DEPRECATED**' : ''
      
      markdown += `- [\`${cv}\`](${releaseUrl})${deprecationMarker}\n`
    })
    markdown += `:::\n\n`

    // Output merged sections
    const sectionOrder = ['🚀 Features', '🐛 Bug Fixes', '🚜 Refactor', '📚 Documentation', '🎨 Styling', '🧪 Testing', '⚙️ Miscellaneous Tasks', '💼 Other']
    
    sectionOrder.forEach(sectionName => {
      if (mergedSections[sectionName] && mergedSections[sectionName].length > 0) {
        markdown += `### ${sectionName}\n\n`
        
        mergedSections[sectionName].forEach(item => {
          markdown += `- **[${item.component}]** ${item.text}\n`
        })
        
        markdown += `\n`
      }
    })

    markdown += `---\n`
  })

  return markdown
}

async function main() {
  console.log('🚀 Generating changelog...\n')
  
  // Fetch version data for deprecation marking
  console.log('📡 Fetching version data...')
  const versionData = await fetchVersionData()
  if (versionData) {
    console.log(`✓ Latest version: ${versionData.latest}`)
    console.log(`✓ Oldest supported: ${versionData.oldestSupported}\n`)
  } else {
    console.log('⚠️  Version data unavailable, skipping deprecation markers\n')
  }
  
  const results = await Promise.all(
    CHANGELOG_SOURCES.map(source => fetchChangelog(source))
  )
  
  const validChangelogs = results.filter(r => r !== null)
  
  console.log(`\n📊 Fetched ${validChangelogs.length}/${CHANGELOG_SOURCES.length} changelogs\n`)
  
  const markdown = generateChangelogMarkdown(validChangelogs, versionData)
  
  const outputPath = join(__dirname, '..', 'changelog.md')
  writeFileSync(outputPath, markdown, 'utf-8')
  
  console.log(`✅ Changelog generated successfully: ${outputPath}`)
  console.log(`📝 ${validChangelogs.length} repository changelog(s) included\n`)
}

main().catch(error => {
  console.error('❌ Error generating changelog:', error)
  process.exit(1)
})
