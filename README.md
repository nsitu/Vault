# Vault  
This is an example of a NodeJS app that uses [Auth0](https://auth0.com/) for User authentication. It displays a public landing page, but the `/vault` API endpoint is protected from public access.  

## Iteration
To iterate on this code, create your own [Auth0](https://auth0.com/) account, and add the relevant environment variables, as specified in the [Auth0 documentation](https://auth0.com/docs/quickstart/webapp/express/interactive).  

## Example .env file
Here's an example showing the environment variables that you should add to your `.env` file, along with placeholder values so you can get a sense of what they look like. *You will need to modify them* to fit your own account details. You can generally find the specific details in the [Auth0 docs](https://auth0.com/docs/quickstart/webapp/express/interactive).  
```
ISSUER_BASE_URL=https://dev-******.us.auth0.com
CLIENT_ID=abc123def456************
BASE_URL=https://public--main--vault--username.ixdcoder.com/
SECRET=BZZZT!!ThisCanBeLiterallyAnyStringOfCharacters
```

## Note
This is a demonstration only. Protecting your routes will not prevent people from viewing otherwise public source code.  