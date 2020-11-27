const server = require('./server.js');
const PORT = 3003;
server.listen(PORT,() => {
  console.log(`Server running on localhost:${PORT}`);
} );