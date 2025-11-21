const userWelcome = async () => {
    // the profile endpoint will give us information 
    // about the currently logged in user. 
    const response = await fetch('/api/user')
    const data = await response.json()

    // if the user is logged in,
    // we can personalize the page for them
    if (data.isAuthenticated) {
        const isLanding = document.getElementById('landing') !== null
        const vaultLink = isLanding
            ? '<a class="button" href="/vault">Enter Vault</a>'
            : ''

        const safePicture = data.picture || 'user.svg'

        profile.innerHTML = `
        <img src="${safePicture}" onerror="this.onerror=null;this.src='user.svg';">
        <div>
            <h4>${data.name}</h4>
            <h5>${data.email}</h5>
        </div>
        <a class="button" href="/logout">Logout</a>
        ${vaultLink}
        `
        if (isLanding) {
            content.innerHTML = `<span class="secret-sauce">
            Your <a href="/vault">secret sauce</a> is ready.
            </span>`;
        }
        // Only load vault data on pages that show content
        if (document.getElementById('vault')) {
            displayVault()
        }
    }
    // If the user is not logged in 
    // we should show a Guest Landing page with a Login button
    else {
        profile.innerHTML = ` 
        <img src="user.svg">
        <div>
            <h4>Guest</h4>
            <h5>Welcome</h5> 
        </div>
        <a class="button" href="/login">Login</a>
        `
        if (document.getElementById('landing')) {
            content.innerHTML = `<span class="secret-sauce">
            Have you tried our <a href="/vault">secret sauce</a>?
            </span>`;
        }
    }
    if (logo) {
        logo.addEventListener('click', () => {
            window.location.href = '/'
        })
    }
}



userWelcome()

// template for each secret item
const template = (item) =>
    `<li>
        <a class="sauce" target="_blank" href="${item.url}">
            <span>${item.name}</span>
        </a>
    </li>`


const displayVault = async () => {
    // the vault endpoint only works for logged in users
    // see also, the /api/secrets endpoint in ./server.js
    try {
        const response = await fetch('/api/secrets')
        const data = await response.json()

        const listItems = data.map(item => template(item)).join('')

        vaultHTML = `<span class="secret-sauce">
            Here you go.
            </span><ul class="items">${listItems}</ul>`;

        content.innerHTML = DOMPurify.sanitize(vaultHTML)
    }
    catch (e) {
        console.log(e)
    }
}

