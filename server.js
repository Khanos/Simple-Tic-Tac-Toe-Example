const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
const server = express();
server.use(serveStatic(path.join(__dirname, 'dist')));
const port = process.env.PORT || 80;
const host = process.env.HOST || 'khanos-tictactoe.herokuapp.com';
server.listen(port, () => {
  console.log('The app is running...');
  console.log(`http://${host}:${port}`);
});
module.exports = server;
