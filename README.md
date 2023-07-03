# Serverless Shortlinker

Long URLs can be inconvenient to use, especially in correspondence. To solve this
problem, there are services that shorten long links. We need to build our own costefficient and flexible API for a link shortener application.

## Endpoints

### Auth
- /auth/sign-up (POST) - register
- /auth/sign-in (POST) - login

### Link
- / (POST) - create link
- / (GET) - get my link
- /:shortUrl (PUT) - deactivate my link
- /:shortUrl (GET) - redirect to original link

## Environment Variables

Example env.json:

```
{
  "PORT": "5000",
  "AWS_REGION": "us-east-1",
  "BASE_URL": "https://43xkn51hzh.execute-api.us-east-1.amazonaws.com/dev",
  "ACCESS_SECRET": "your access secret",
  "REFRESH_SECRET": "your refresh secret",
  "ACCESS_LIFE_TIME": "60m",
  "REFRESH_LIFE_TIME": "1d",
  "NO_REPLY_EMAIL": "your email"
}

```

## Get Started

```
# Install serverless globally
npm install -g serverless

# Install dependencies
npm install

# Build project
npm run build

# Deploy to AWS
serverless deploy

```
After first deploy insert AWS_LINK and QUEUE_URL to env.json file, then redeploy project

```
npm run build

serverless deploy
```
