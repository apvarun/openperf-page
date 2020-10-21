# OpenPerf Page

Google Analytics Stats page from [OpenPerf](https://openperf.now.sh)

## Getting Started

In order to access the site's google analytics data, you need to create a service account and provide read access in GA.

Refer [Service accounts](https://cloud.google.com/iam/docs/service-accounts) for more details.

### TLDR:

- Create a project in [console.developers.google.com](https://console.developers.google.com)
- Open IAM Settings -> Credentials -> Service Account
- Create a service account. On creating a service account, You'll receive the private key and client email.
- Add both to environment variables
- Open [analytics.google.com](https://analytics.google.com) and navigate to Admin, to provide read permissions for the generated client email.

## Environment Variables

```
PRIVATE_KEY=
CLIENT_EMAIL=
VIEW_ID=
SITENAME=
GA=
```

| Property     | Description                               |
| ------------ | ----------------------------------------- |
| PRIVATE_KEY  | Key for the Service account               |
| CLIENT_EMAIL | Email assigned for the service account    |
| VIEW_ID      | View ID for the Google Analytics Property |
| SITENAME     | Name of the site - string                 |
| GA           | UA ID for this page - optional            |

## Deploy

Since the project uses NextJS under the hood, [Vercel](https://vercel.com/) is the ideal platform to deploy the project. If you'd like to deploy it elsewhere, check this [out](https://nextjs.org/docs/deployment#other-hosting-options).

## Local Development

In order to run the project locally, clone the repository and create `.env` file with the environment variables mentioned above. And start the server.

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Setup too hard?

Head over to [OpenPerf](https://openperf.now.sh) to get your custom dashboard without any setup.

## Credits

Project by [apvarun](https://github.com/apvarun)