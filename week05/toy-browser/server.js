const http = require('http')
const server = http.createServer((req, res) => {
  console.log('\n\n------ begin: request ------')
  console.log(req.headers)
  console.log('------ end: res ------\n\n')
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('X-Foo', 'bar');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('ok');
});
server.listen(8088)