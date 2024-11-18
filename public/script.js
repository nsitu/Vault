const userWelcome = async () => { 
    // the profile endpoint will give us information 
    // about the currently logged in user. 
    const response = await fetch('/api/user')
    const data = await response.json()

    // if the user is logged in,
    // we can personalize the page for them
    if (data.isAuthenticated){
        profile.innerHTML = ` 
        <img src="${data.picture || 'user.svg'}">
        <div>
            <h4>${data.name}</h4>
            <h5>${data.email}</h5>
        </div>
        <a class="button" href="/logout">Logout</a>
        `
        
        displayVault()

    }
    // If the user is not logged in 
    // we should show a Guest Landing page with a Login button
    else{ 
        profile.innerHTML = ` 
        <img src="user.svg">
        <div>
            <h4>Guest</h4>
            <h5>Welcome</h5> 
        </div>
        <a class="button" href="/login">Login</a>
        `  
    } 
} 
userWelcome()



const displayVault = async () =>{ 
    // the vault endpoint is protected so it will only work for logged in users. 
    // See also:  ../api.js  uses the requiresAuth middleware to achieve this. 
    try{
        console.log('ok')
        const response = await fetch('/api/vault')
        
        console.log(response)
        const data = await response.json()
        console.log(data)
        const listItems = data.map(item => template(item)).join('') 
        const ul = document.createElement('ul') 
        ul.innerHTML = DOMPurify.sanitize(listItems)
        content.appendChild(ul) 
    }
    catch(e) {
        console.log(e)
    } 

}

const template = (item) => 
        `<li>
            <a class="sauce" target="_blank" href="${item.url}">
                <span>${item.name}</span>
            </a>
        </li>`