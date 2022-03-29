//import http from 'http';
//const http = http();

const http = require('http');
const app = require('./index');
const port = 5000;
const server = http.createServer(app);
server.listen(port);
