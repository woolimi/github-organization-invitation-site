# Github organization invitation site

<div align="center">
<img src="./screen-shot.webp">
</div>
<br>
<br>

Simple automatic github organization invitation issuance site (express + vuejs), inspired by [this repo (sinatra ver.)](https://github.com/thundergolfer/automated-github-organization-invites)

## Before start

You must be an **owner** of a Github organization. If yes, please generate github access token in advance with proper scope settings (`Settings` -> `Developer Settings` -> `Personal access tokens`)

## How to use

1. Rename `.env.example` to `.env` and fill the right informations.

```
GITHUB_ACCESS_TOKEN = XXXXXXXXXX
ORGANIZATION_NAME = My-Awesome-Org
```

2. Deploy your app.

If you have heroku account, simply click the button below.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

Or you can deploy manually with any platform you prefer.

## Demo

https://welcome-to-translation.herokuapp.com/
