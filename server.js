// import Express library and activate it
import express from "express";
const app = express();

// Serve static files from /public folder (useful when running Node locally, optional on Vercel).
app.use(express.static('public'))
// Define index.html as the root explicitly (useful on Vercel, optional when running Node locally).


import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})


app.get('/dirname', (req, res) => {
    res.send({
        meta: import.meta.url,
        filename: __filename,
        dirname: __dirname
    });
})


// Import the OpenID Connect Library (maintained by Auth0)
// See also: https://github.com/auth0/express-openid-connect
import auth0 from 'express-openid-connect'
const { auth, requiresAuth } = auth0

/** 
 * Auth0 Configuration
 * NOTE: the settings below assume the use of environment variables.
 * Therefore you must add the following variables to your .env file:
 * BASE_URL, SECRET, CLIENT_ID, ISSUER_BASE_URL
 */
const lookFor = ['SECRET', 'BASE_URL', 'CLIENT_ID', 'ISSUER_BASE_URL']
const missing = lookFor.filter(name => !process.env[name])
if (missing.length > 0) {
    console.error(`Please add Environment Variables to .env: ${missing.join(', ')}, see also: https://auth0.com/docs/quickstart/webapp/express/interactive`)
}
else {
    const config = {
        authRequired: false,
        auth0Logout: true,
        secret: process.env.SECRET,
        baseURL: process.env.BASE_URL,
        clientID: process.env.CLIENT_ID,
        issuerBaseURL: process.env.ISSUER_BASE_URL
    }
    // Tell our Express app to use auth0
    // NOTE: this will add  routes for  /login, /logout, /callback  etc.
    app.use(auth(config))
}

app.get('/profile', requiresAuth(), (req, res) => {
    res.send({ ...req.oidc.user });
});

// Auth0 attatches user data to each incoming request
// Let's publish this user data to allow for more
// dynamic user context and personalization on the frontend. 
app.get('/api/user', (req, res) => {
    // First, make sure the user is logged in     
    if (req.oidc?.isAuthenticated()) {
        // NOTE: "req.oidc.user" is the variable where Auth0 stores user data
        res.send({
            ...req.oidc.user,
            isAuthenticated: true
        })
    }
    // If the user is not logged in, 
    // Let's inform the frontend that we have a Guest user.
    else {
        res.send({
            name: "Guest",
            isAuthenticated: false
        })
    }
})

// This is a secure endpoint. Login is required to access it.
app.get('/api/vault', async (req, res) => {
    try {
        if (req.oidc?.isAuthenticated()) {
            res.send([
                {
                    "name": "Cookie Recipe",
                    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                },
                {
                    "name": "Secret Sauce",
                    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                },
                {
                    "name": "Inside Information",
                    "url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                }
            ]);
        }
        else {
            return res.status(401).json({ error: 'Authentication required' });

        }

    } catch {
        res.status(500).json({ error: 'Failed to send data' });
    }
})


const port = 3000
// Start Express
app.listen(port, () => {
    console.log(`Express is now Live.`)
    console.log(`http://localhost:${port}`)
}); 
