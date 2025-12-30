# Supported Runtimes

dployr supports multiple runtimes through vfox version management.

## Node.js

Deploy Node.js applications with any version:

```bash
dployr deploy \
  --name my-node-app \
  --runtime nodejs \
  --version 20 \
  --build-cmd "npm install" \
  --run-cmd "npm start" \
  --port 3000
```

**Supported versions**: 14, 16, 18, 20, 21, 22

## Python

Deploy Python applications:

```bash
dployr deploy \
  --name my-python-app \
  --runtime python \
  --version 3.11 \
  --build-cmd "pip install -r requirements.txt" \
  --run-cmd "python app.py" \
  --port 8000
```

**Supported versions**: 3.8, 3.9, 3.10, 3.11, 3.12

## Go

Deploy Go applications:

```bash
dployr deploy \
  --name my-go-app \
  --runtime go \
  --version 1.22 \
  --build-cmd "go build -o app" \
  --run-cmd "./app" \
  --port 8080
```

**Supported versions**: 1.20, 1.21, 1.22, 1.23

## PHP

Deploy PHP applications:

```bash
dployr deploy \
  --name my-php-app \
  --runtime php \
  --version 8.3 \
  --build-cmd "composer install" \
  --run-cmd "php -S 0.0.0.0:8000" \
  --port 8000
```

**Supported versions**: 7.4, 8.0, 8.1, 8.2, 8.3

## Ruby

Deploy Ruby applications:

```bash
dployr deploy \
  --name my-ruby-app \
  --runtime ruby \
  --version 3.3 \
  --build-cmd "bundle install" \
  --run-cmd "ruby app.rb" \
  --port 4567
```

**Supported versions**: 2.7, 3.0, 3.1, 3.2, 3.3

## .NET

Deploy .NET applications:

```bash
dployr deploy \
  --name my-dotnet-app \
  --runtime dotnet \
  --version 8.0 \
  --build-cmd "dotnet build" \
  --run-cmd "dotnet run" \
  --port 5000
```

**Supported versions**: 6.0, 7.0, 8.0

## Java

Deploy Java applications:

```bash
dployr deploy \
  --name my-java-app \
  --runtime java \
  --version 21 \
  --build-cmd "mvn package" \
  --run-cmd "java -jar target/app.jar" \
  --port 8080
```

**Supported versions**: 11, 17, 21

## Static Files

Deploy static websites:

```bash
dployr deploy \
  --name my-static-site \
  --runtime static \
  --build-cmd "npm run build" \
  --working-dir "dist"
```

Static files are served by Caddy with automatic HTTPS.

## Docker Containers

Deploy Docker containers:

```bash
dployr deploy \
  --name my-container \
  --source docker \
  --image nginx:latest \
  --port 80
```

### Custom Dockerfile

Deploy from a custom Dockerfile:

```bash
dployr deploy \
  --name my-app \
  --source remote \
  --runtime docker \
  --remote https://github.com/user/repo \
  --dockerfile Dockerfile \
  --port 8080
```

## Custom Runtimes

Define custom runtimes for specialized applications:

```bash
dployr deploy \
  --name my-custom-app \
  --runtime custom \
  --build-cmd "./build.sh" \
  --run-cmd "./start.sh" \
  --port 3000
```

## Runtime Configuration

### Environment Variables

Set runtime-specific environment variables:

```bash
# Node.js
dployr env set my-app NODE_ENV=production

# Python
dployr env set my-app PYTHONPATH=/app/src

# Go
dployr env set my-app GOOS=linux GOARCH=amd64
```

### Version Management

Switch runtime versions:

```bash
# Update to a different version
dployr deploy \
  --name my-app \
  --runtime nodejs \
  --version 22
```

## Next Steps

- [Deploy your application](/docs/deployment)
- [Configure environment variables](/docs/cli#environment-variables)
- [Learn about concepts](/docs/concepts)
