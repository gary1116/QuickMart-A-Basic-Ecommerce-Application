export default  {

    oidc:{
        clientId: '0oab3ldtwdVSWjbhh5d7',
        issuer: 'https://dev-43432448.okta.com/oauth2/default',
        redirectUri: 'https://localhost:4200/login/callback',
        scopes: ['openid','profile','email']
    }
}

// client id is the public identifier of the client app

// issuer: is the issuer of tokens thats the url we will use when authorizing with
// okta authorization server

// redirect uri is where they gonna send the user once the user logs in

// scopes provide access to information about a user

// openid: required for authentication requests
// profile: user's first name, last name, phone,etc
// email: user's email address