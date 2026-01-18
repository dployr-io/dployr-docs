# Contributing to dployr Documentation

Thank you for your interest in contributing to dployr documentation! This guide will help you get started.

## Documentation Structure

```
dployr-docs/
├── docs/           # Technical documentation
├── blog/           # Blog posts and articles
├── legal/          # Legal documents
├── changelog.md    # Project changelog
└── .vitepress/     # VitePress configuration
```

## How to Contribute

### Documentation Updates

1. **Fork and clone** the repository
2. **Create a branch** for your changes:
   ```bash
   git checkout -b docs/improve-installation-guide
   ```
3. **Make your changes** to the relevant markdown files
4. **Test locally**:
   ```bash
   pnpm install
   pnpm run docs:dev
   ```
5. **Commit with clear messages**:
   ```bash
   git commit -m "docs: improve installation guide for Windows users"
   ```
6. **Push and create a pull request**

### Updating Changelog

The documentation site's changelog is auto-generated from all dployr repositories:
- [dployr](https://github.com/dployr-io/dployr/blob/master/CHANGELOG.md)
- [dployr-base](https://github.com/dployr-io/dployr-base/blob/master/CHANGELOG.md)
- [dployr-web](https://github.com/dployr-io/dployr-web/blob/master/CHANGELOG.md)

**Important:** Do not manually edit `changelog.md` in the docs repository. It is auto-generated and will be overwritten.

We use [Conventional Commits](https://www.conventionalcommits.org/) for changelog generation in each repository.

#### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```bash
feat(cli): add support for custom domains
fix(deployment): resolve timeout issue on large files
docs(api): update authentication examples
chore(deps): update vitepress to v2.0.0
```

#### Generating Changelog

See [git-cliff](https://git-cliff.org/):

```markdown
## [Version] - YYYY-MM-DD

### Added
- New feature description

### Changed
- Changed functionality description

### Fixed
- Bug fix description

### Security
- Security improvement description
```

## Style Guide

### Markdown

- Use ATX-style headers (`#` instead of underlines)
- Use fenced code blocks with language identifiers
- Keep lines under 120 characters when possible
- Use relative links for internal documentation

### Code Examples

- Include language identifier in code blocks
- Provide context and explanation
- Test all code examples before submitting
- Use realistic examples, not `foo` and `bar`

### Writing Style

- Use clear, concise language
- Write in second person ("you") for tutorials
- Use active voice
- Define acronyms on first use
- Include examples for complex concepts

## Testing

Before submitting:

1. **Build the documentation**:
   ```bash
   pnpm run build
   ```

2. **Check for broken links**:
   VitePress will warn about dead links during build

3. **Preview your changes**:
   ```bash
   pnpm run docs:dev
   ```

4. **Verify formatting**:
   - Check that code blocks render correctly
   - Ensure images display properly
   - Test all internal and external links

## Pull Request Process

1. **Update documentation** for any changed functionality
2. **Add yourself** to contributors if it's your first contribution
3. **Ensure the build passes** without errors
4. **Write a clear PR description**:
   - What changes were made
   - Why the changes were necessary
   - Any related issues

5. **Wait for review** from maintainers
6. **Address feedback** if requested

## Questions?

- Join our [Discord](https://discord.gg/tY8ZbjvrSZ)
- Open an [issue](https://github.com/dployr-io/dployr/issues)
- Check existing [documentation](https://docs.dployr.io)

Thank you for contributing! 🚀
