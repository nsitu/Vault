// import Express library and activate it
import express from "express";
const app = express();

// Publish our static frontend files
app.use('/',express.static('./public'))   

// Import the OpenID Connect Library (maintained by Auth0)
// See also: https://github.com/auth0/express-openid-connect
import auth0 from 'express-openid-connect' 
const { auth } = auth0

/** 
 * Auth0 Configuration
 * NOTE: the settings below assume the use of environment variables.
 * Therefore you must add the following variables to your .env file:
 * BASE_URL, SECRET, CLIENT_ID, ISSUER_BASE_URL
 */ 
const lookFor = ['BASE_URL', 'SECRET', 'CLIENT_ID', 'ISSUER_BASE_URL']
const missing = lookFor.filter(name => !process.env[name])
if (missing.length > 0) {
    console.error(`Please add Environment Variables to .env: ${missing.join(', ')}, see also: https://auth0.com/docs/quickstart/webapp/express/interactive`)
}
else{
    const config = {
        authRequired: false,
        auth0Logout: true, 
        baseURL: process.env.BASE_URL,  
        secret: process.env.SECRET,
        clientID: process.env.CLIENT_ID,
        issuerBaseURL: process.env.ISSUER_BASE_URL
    } 
    
    // Tell our Express app to use auth0
    // NOTE: this will add  routes for  /login, /logout, /callback  etc.
    app.use( auth(config) )   
}




// activate API endpoints is auth required
import { apiEndpoints } from './api.js'
app.use('/api', apiEndpoints)  

// Start Express
app.listen(process.env.PORT, () => { 
    console.log(`Express is now Live.`) 
    console.log(`Public URL: `+ process.env.PUBLIC_URL)
}); 
