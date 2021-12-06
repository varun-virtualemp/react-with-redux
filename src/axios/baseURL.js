let api_server = '127.0.0.1';
let localApiUrl = 'http://127.0.0.1:5000/api/';
  
switch (window.location.origin) {
    default:
    case 'http://127.0.0.1:3000': // local
        api_server = localApiUrl;
        break
}

 export default api_server;