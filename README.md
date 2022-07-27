# Getting started

Chima Ifeanyi ThankGod
## Description

This is a simple project that allows a user to register, log-in and and the goals they hope to achieve.

## React

This project was bootstrapped with create-react-app. `npx create-react-app .`

## Project Set-up

The dependencies required are all included in the `package.json` file. They will all be installed by running the `npm install` command.

To start the project run `npm start`.

## Check out the web app

click the link below

Open [Ifeanyi-goals-app](https://ifeanyi-mernapp-goals-users.netlify.app) to view it in the browser.



# Issues

## CORS 

I ran into cors issues when creating this project 

#### The first issue
The first issue I ran into was when I tried to set multiple headers

```javascript
res.set({
    "Access-Control-Allow-Origin": origin, // add client origin
    "Access-Control-Allow-Credentials": true
})
```
[stackoverflow](https://stackoverflow.com/questions/23751914/how-can-i-set-response-header-on-express-js-assets)


#### The second issue
The second issue I ran into was when I tried to make a request from my deployed **Netlify** app to my **localhost nodejs server**, I got this \
``console.error`` message
```javascript
Access to XMLHttpRequest at 'http://localhost:3500/login' from origin 'https://ifeanyi-mernapp-goals-users.netlify.app' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

so, here is the solution

[stackoverflow](https://stackoverflow.com/questions/53180726/cors-on-server-header)

```javascript
res.set({
    "Access-Control-Allow-Origin": origin, // add client origin
})
```

#### The third issue
The third issue I ran into was when I tried to make a **PUT** request to ``/users`` endpoint, I got the following error
```javascript 
Cannot read properties of undefined (reading 'cancelToken')
```

so, here is the solution 

[github](https://github.com/svrcekmichal/redux-axios-middleware/issues/83)

```javascript
const requestIntercept = axiosPrivate.interceptors.request.use(config => {
    if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${auth?.accessToken}`
    }
    return config // make sure to return config
    }, (error) => {
            return Promise.reject(error)
        }   
    )
```

### The fourth issue
The fourth issue I ran into was when I tried to use **CONTEXT API** 
```javascript
Uncaught TypeError: Cannot destructure property 'auth' of '(0 , _useAuth__WEBPACK_IMPORTED_MODULE_1__.default)(...)' as it is undefined.
```

so, here is the solution


[stackoverflow](https://stackoverflow.com/questions/62378796/cannot-destructure-property-of-object-from-context)

```javascript

//AuthContext.js

import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState({})

    return (
        <AuthContext.Provider value={{auth, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;

```

```javascript

// index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/*" element={<App />}/>
        </Routes>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);


```

```javascript

//useAuth.js
// here we consume the context store

import { useContext } from "react"
import AuthContext from "../context/AuthContext"

const useAuth = () => {   
    return useContext(AuthContext)
}

export default useAuth

```


```javascript

//useRefreshToken.js

import axios from "../api/axios"
import useAuth from "./useAuth"

const useRefreshToken = () => {

    // global state 
    const { setAuth } = useAuth();

    // global state 
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get("/refresh", {
            // send cookies to the server
            withCredentials: true
        });
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            // show the new accessToken we receive
            console.log(response.data.accessToken)
            // replace accessToken in the state with the new one
            return { ...prev, accessToken: response.data.accessToken }
        });
        return response.data.accessToken;
    }

  return refresh
}

export default useRefreshToken

```
