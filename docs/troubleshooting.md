---
title: Troubleshooting dployr
description: Common dployr issues and how to fix them. Covers deployment failures, service crashes, WebSocket errors, custom domain DNS, and HTTPS setup.
---

# Troubleshooting dployr

## Deployment failed

The first place to look is the logs. Open the service in the dashboard and go to the **Logs** tab, or run:

```bash
dployr logs my-api --tail 100
```

Build output shows up here. If the build command exited non-zero, you'll see why.

Common causes:
- The build command is wrong or references a missing file
- Dependencies failed to install (check for network errors or private package issues)
- The wrong working directory: set `working_dir` in your blueprint if your app isn't at the repo root
- The source repo or branch doesn't exist, or the token doesn't have access

## Service starts then immediately crashes

Check logs right after the crash:

```bash
dployr logs my-api --follow
```

The crash output will be there. Common causes: a missing environment variable, a port that's already in use, or an application-level startup error.

If the service crashes in a loop, check health check settings too. An aggressive threshold can trigger restarts faster than the app can come up.

## Service is running but not responding (502 errors)

The service process is alive but not listening where dployr expects. Verify:

1. The `--port` you set (or the `port` field in your blueprint) matches the port your app actually binds to
2. Your app is binding to `0.0.0.0` rather than `127.0.0.1`. Some frameworks default to localhost-only
3. The app has fully started. Check logs for startup completion messages

## Custom domain not working

After adding a domain, DNS changes can take anywhere from a few minutes to a few hours. To check whether your DNS has propagated:

```bash
dig yourdomain.com
nslookup yourdomain.com
```

The A record should resolve to your instance's IP (find it on the **Instances** page in the dashboard).

HTTPS certificates are issued automatically once DNS is pointing correctly. If the cert isn't being issued, make sure port 80 is not blocked at the network level, since that's what the certificate challenge uses.

## WebSocket connection errors (401/403)

If you're running your own server (BYOS) and `dployrd` is showing 401 or 403 errors in its logs, the access token needs to be reacquired. `dployrd` does this automatically, so give it a minute. If it persists, check that the bootstrap token used during installation was valid and hasn't expired.

To check `dployrd` logs on a BYOS server:

```bash
tail -f /var/log/dployrd/app.log
```

## mTLS certificate errors (BYOS)

`dployrd` generates its own client certificate on first run. If you're seeing certificate validation failures, the most common cause is a misconfigured cert path. Check the `dployrd` config at `/etc/dployr/config.yaml` and verify the cert and key paths are correct:

```bash
openssl x509 -in /etc/dployr/certs/client.crt -text -noout
```

## Port conflict on a BYOS server

If a service fails to start because its port is already in use:

```bash
lsof -i :3000
```

Either stop the conflicting process or change the port your app listens on and redeploy.

## Database locked (BYOS)

This usually means two `dployrd` processes are running at the same time. Find and stop the extra one:

```bash
ps aux | grep dployrd
```

Then restart:

```bash
sudo systemctl restart dployrd
```

## Still stuck?

- Check [GitHub Issues](https://github.com/dployr-io/dployr/issues): someone may have hit the same thing
- Join the [Discord community](https://discord.gg/tY8ZbjvrSZ) for help from the team and other users
- The dashboard logs view and `dployr logs` are almost always the fastest path to the answer
