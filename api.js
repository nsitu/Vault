// Import express and activate a router for our API
import express from 'express'    
const api = express.Router()  

// Filesystem library to let us open the contents of files directly from disk
import { readFile } from 'fs/promises';  

// Import the OpenID Connect Library (maintained by Auth0)
// See also: https://github.com/auth0/express-openid-connect
import auth0 from 'express-openid-connect' 
const { requiresAuth } = auth0

// Auth0 attatches user data to each incoming request
// Let's publish this user data to allow for more
// dynamic user context and personalization on the frontend. 
api.get('/user', (req, res) => {  
  // First, make sure the user is logged in     
  if ( req.oidc.isAuthenticated() ){
    // NOTE: "req.oidc.user" is the variable where Auth0 stores user data
    res.send({
      ...req.oidc.user,
      isAuthenticated:true
    }) 
  }
  // If the user is not logged in, 
  // Let's inform the frontend that we have a Guest user.
  else{
    res.send({
      name:"Guest",
      isAuthenticated:false
    }) 
  }  
})


// This is a secure endpoint. Login is required to access it.
api.get('/vault',  requiresAuth(), async (req, res) => {      
  try {
      const data = await readFile('./vault.json');
      const json = JSON.parse(data)
      res.send(json);
  } catch {
      res.status(500).json({ error: 'Failed to read the file' });
  } 
})

  
export { api as apiEndpoints}; 
 