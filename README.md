# Vault  
This is an example of a NodeJS app that uses [Auth0](https://auth0.com/) for User authentication. It displays a public landing page, but also shares secret data via a `/vault` endpoint. This makes use of `isAuthenticated` logic to ensure the user is logged in before sending the secret data.

## Setup Auth0
To use this code, create your own [Auth0](https://auth0.com/) account.
- In the Auth0 dashboard choose `Create Application` 
- Choose the `Regular Web Application` option 
- When asked "What technology are you using", choose `Express`.
- Select `Integrate Now` to Configure Auth0 with these settings:
- Allowed Callback URL: `http://localhost:3000/callback`
- Allowed Logout URLs: `http://localhost:3000`

## Integrate Auth0 
The Auth0 quickstart includes an `Integrate the SDK` section. This is useful as a point of comparison; this repo is setup in a similar way, but we will use Environment Variables, instead of hard-coding the details. These variables to the parameters that are needed by the Auth0 router, as specified in the [Auth0 documentation](https://auth0.com/docs/quickstart/webapp/express/interactive).  

### Setup Environment Variables
Here's an example `.env` file showing the environment variables that are needed. You'll find something similar in the `.env.example` file included with in this repo.  *You will need to modify them* to fit your own Auth0 account details.  

```
# The URL where the application is served 
BASE_URL=http://localhost:3000
# A long, random string
SECRET=*****
# The Client ID found in your Application settings
CLIENT_ID=*****
# The Domain as a secure URL found in your Application settings
ISSUER_BASE_URL=https://*****.auth0.com
```

## Deploying to Vercel
When deploying to Vercel:
1. Add the above settings as [Environment Variables](https://vercel.com/docs/environment-variables) to your Vercel project during deployment, (or via Project > Settings > Environment Variables). *Important:* For the `BASE_URL`, use your actual Vercel project URL (e.g. `https://my-project.vercel.app`), instead of `localhost`. 
2. Update your Auth0 dashboard settings to allow Vercel:
-Allowed Callback URL: `http://localhost:3000/callback,https://my-project.vercel.app/callback`
-Allowed Logout URLs: `http://localhost:3000,https://my-project.vercel.app`

## Note
This is a demonstration only. Protecting your routes will not prevent people from viewing otherwise public source code.  