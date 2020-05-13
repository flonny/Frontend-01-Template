const net = require("net");
class Request {
  constructor({ methods, host, port, path, body, headers }) {
    this.methods = methods || "GET";
    this.host = host;
    this.port = port;
    this.body = body;
    this.path = path || "/";
    this.headers = headers || {};
    if (!this.headers["Content-Type"]) {
      this.headers["Content-Type"] = "application/x-www-form-urlencoded";
    }
    if (this.headers["Content-Type"] === "application/json") {
      this.bodyText = JSON.stringify(this.body);
    }
    if (this.headers["Content-Type"] === "application/x-www-form-urlencoded") {
      this.bodyText = Object.keys(this.body)
        .map((key) => `${key}=${encodeURI(this.body[key])}`)
        .join("&");
    }
    this.headers["Content-Length"] = this.bodyText.length;
  }
  toString() {
    return `${this.methods} ${this.path} HTTP/1.1\r\n${Object.keys(this.headers)
      .map((key) => `${key}: ${this.headers[key]}`)
      .join("\r\n")}\r\n\r\n${this.bodyText}`;
  }
  send(connection) {
    return new Promise((resolve, reject) => {
      if (connection) {
        connection.write(this.toString());
      } else {
        connection = net.createConnection({
          host:this.host,
          port: this.port },() => {
            connection.write(req.toString())
          })
      }
      connection.on('data', (data) => {
        resolve(`${data.toString()}`)
        connection.end();
      });
      
      connection.on('error', (error) => {
        reject(error)
        connection.end();
      });
      
      connection.on('end', () => {
        console.log('disconnected from server');
      });
    })
 
  }
}
let req = new Request({
  methods: "POST",
  host: "127.0.0.1",
  port: "8088",
  headers: {
    'x-http': 'test'
  },
  body: {
    name: "fan",
  },
});

void async function () {
  let response =  await  req.send()
  console.log(response)
}();
class Response {}
class ResponseParser {

}
