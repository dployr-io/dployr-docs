# API Reference

The dployr API provides programmatic access to all platform functionality.

## Authentication

All API requests require authentication using a bearer token.

### Get Access Token

```bash
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password"
}
```

Response:

```json
{
  "access_token": "eyJhbGc...",
  "refresh_token": "eyJhbGc...",
  "expires_in": 3600
}
```

### Use Token

Include the token in the Authorization header:

```bash
Authorization: Bearer eyJhbGc...
```

## Deployments

### Create Deployment

```bash
POST /api/v1/deployments
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "my-app",
  "source": "remote",
  "runtime": "nodejs",
  "version": "20",
  "remote": "https://github.com/user/repo",
  "branch": "main",
  "build_cmd": "npm install",
  "run_cmd": "npm start",
  "port": 3000
}
```

### List Deployments

```bash
GET /api/v1/deployments
Authorization: Bearer <token>
```

### Get Deployment

```bash
GET /api/v1/deployments/:id
Authorization: Bearer <token>
```

### Update Deployment

```bash
PUT /api/v1/deployments/:id
Content-Type: application/json
Authorization: Bearer <token>

{
  "version": "22",
  "env": {
    "NODE_ENV": "production"
  }
}
```

### Delete Deployment

```bash
DELETE /api/v1/deployments/:id
Authorization: Bearer <token>
```

## Services

### List Services

```bash
GET /api/v1/services
Authorization: Bearer <token>
```

### Get Service Status

```bash
GET /api/v1/services/:id/status
Authorization: Bearer <token>
```

### Start Service

```bash
POST /api/v1/services/:id/start
Authorization: Bearer <token>
```

### Stop Service

```bash
POST /api/v1/services/:id/stop
Authorization: Bearer <token>
```

### Restart Service

```bash
POST /api/v1/services/:id/restart
Authorization: Bearer <token>
```

### Get Service Logs

```bash
GET /api/v1/services/:id/logs?tail=100&follow=true
Authorization: Bearer <token>
```

## Instances

### List Instances

```bash
GET /api/v1/instances
Authorization: Bearer <token>
```

### Get Instance

```bash
GET /api/v1/instances/:id
Authorization: Bearer <token>
```

### Get Instance Metrics

```bash
GET /api/v1/instances/:id/metrics
Authorization: Bearer <token>
```

## Proxy Routes

### List Routes

```bash
GET /api/v1/proxy/routes
Authorization: Bearer <token>
```

### Create Route

```bash
POST /api/v1/proxy/routes
Content-Type: application/json
Authorization: Bearer <token>

{
  "domain": "example.com",
  "service_id": "service-123",
  "port": 3000
}
```

### Delete Route

```bash
DELETE /api/v1/proxy/routes/:id
Authorization: Bearer <token>
```

## Projects

### List Projects

```bash
GET /api/v1/projects
Authorization: Bearer <token>
```

### Create Project

```bash
POST /api/v1/projects
Content-Type: application/json
Authorization: Bearer <token>

{
  "name": "my-project",
  "description": "Project description"
}
```

### Delete Project

```bash
DELETE /api/v1/projects/:id
Authorization: Bearer <token>
```

## Environment Variables

### List Variables

```bash
GET /api/v1/services/:id/env
Authorization: Bearer <token>
```

### Set Variable

```bash
POST /api/v1/services/:id/env
Content-Type: application/json
Authorization: Bearer <token>

{
  "key": "NODE_ENV",
  "value": "production"
}
```

### Delete Variable

```bash
DELETE /api/v1/services/:id/env/:key
Authorization: Bearer <token>
```

## Webhooks

### Create Webhook

```bash
POST /api/v1/webhooks
Content-Type: application/json
Authorization: Bearer <token>

{
  "url": "https://example.com/webhook",
  "events": ["deployment.created", "deployment.failed"],
  "secret": "webhook-secret"
}
```

### List Webhooks

```bash
GET /api/v1/webhooks
Authorization: Bearer <token>
```

## Rate Limits

- **Authenticated requests**: 1000 requests per hour
- **Unauthenticated requests**: 60 requests per hour

Rate limit headers are included in all responses:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1640000000
```

## Error Responses

All errors follow this format:

```json
{
  "error": {
    "code": "invalid_request",
    "message": "Invalid deployment configuration",
    "details": {
      "field": "runtime",
      "issue": "Unsupported runtime version"
    }
  }
}
```

### Common Error Codes

- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Internal Server Error

## Next Steps

- [Use the CLI](./cli)
- [Deploy an application](./deployment)
- [Configure services](./configuration)
