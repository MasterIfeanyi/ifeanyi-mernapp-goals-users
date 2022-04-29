# Refrences

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

