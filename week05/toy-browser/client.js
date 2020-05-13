const net = require("net")
class Request {
  // method url=host+port+path
  //body: k/v
  //content-type
}
class Response {}
// POST / HTTP/1.1
// Host: localhost:8088
// Connection: keep-alive
// Pragma: no-cache
// Cache-Control: no-cache
const client = net.createConnection({ 
  host:"127.0.0.1",
  port: 8088 }, () => {
  // 'connect' listener.
  console.log('connected to server!');
  client.write('GET / HTTP/1.1\r\n');
  client.write('Content-Length: 5\r\n')
  // client.write('Host: 127.0.0.1:8088\r\n');
  client.write('Content-Type: application/x-www-form-urlencoded\r\n');
  client.write('\r\n')
  client.write("aa=bb")
});
client.on('data', (data) => {
  console.log(data.toString());
  client.end();
});
client.on('end', () => {
  console.log('disconnected from server');
});