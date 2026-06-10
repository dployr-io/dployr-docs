---
title: Security
description: Enable two-factor authentication, manage API tokens, and review active sessions from the dployr dashboard.
---

# Security

Security settings live at **Settings > Security** in the dashboard.

## Two-factor authentication

2FA is opt-in. Once enabled, dployr asks for a one-time code before letting you complete sensitive actions like creating or revoking API tokens, removing team members, or transferring cluster ownership.

### Setting it up

1. Go to **Settings > Security** and click **Enable authenticator app**.
2. Scan the QR code with any TOTP app (Google Authenticator, Authy, 1Password, etc.).
3. Enter the six-digit code to confirm.
4. Save your backup codes.

That's it. Your account now requires TOTP for sensitive actions.

### Backup codes

When you enable TOTP, dployr generates eight single-use backup codes. Each one works once. Use them if you lose access to your authenticator app.

Download them immediately after setup -- they're shown once and not stored in plaintext. If you use one or lose the file, generate a new set from **Settings > Security > Regenerate backup codes**. You'll need your current TOTP code to do that.

If you lose both your authenticator and your backup codes, contact support.

### Disabling TOTP

Go to **Settings > Security**, click **Remove authenticator app**, and enter your current TOTP code to confirm.

### Verification window

After you verify a code, the session is considered authenticated for five minutes. You won't be asked again within that window.

## What requires 2FA

If you have TOTP enabled, the following actions will ask for a code:

- Creating or revoking API tokens
- Removing a team member from a cluster
- Transferring cluster ownership
- Updating your profile or email

API token sessions (requests authenticated with `DPLOYR_TOKEN`) skip this check. Tokens are already scoped credentials.

## API tokens

API tokens let scripts and CI pipelines call the dployr API without an interactive login session. Tokens are prefixed with `dpat_` and shown once at creation time.

### Creating a token

From **Settings > Security**, click **New token**. Give it a name, select the scopes you need, and optionally set an expiry. Copy the token before closing the dialog -- it won't be shown again.

Available scopes:

| Scope | What it allows |
|---|---|
| `oidc:bind` | Register OIDC bindings (used by GitHub Actions bootstrap) |

From the CLI:

```bash
dployr auth tokens create --name "github-actions" --scope oidc:bind
```

If TOTP is enabled, the CLI will prompt for a code before creating the token.

### Using a token

Set the token as an environment variable. The CLI and any direct API calls will pick it up.

```bash
export DPLOYR_TOKEN=dpat_...
```

For GitHub Actions, add it as a repository secret and reference it in your workflow:

```yaml
env:
  DPLOYR_TOKEN: ${{ secrets.DPLOYR_TOKEN }}
```

### Revoking a token

From the dashboard, find the token and click **Revoke**. From the CLI:

```bash
dployr auth tokens revoke <id>
```

Revocation is immediate.

## Active sessions

The **Sessions** tab shows every active session for your account: device, IP address, and when it was created. You can revoke any session from there. Logging out clears all sessions.
