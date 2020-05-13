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
      const parser = new ResponseParser();
      if (connection) {
        connection.write(this.toString());
      } else {
        connection = net.createConnection(
          {
            host: this.host,
            port: this.port,
          },
          () => {
            connection.write(this.toString());
          }
        );
      }
      connection.on("data", (data) => {
        // new Response(data);
        parser.receive(data.toString());
        console.log(parser.statusLine)
        // resolve(`${data.toString()}`);
        // console.log(parser.statusLine)
        connection.end();
      });

      connection.on("error", (error) => {
        reject(error);
        connection.end();
      });

      connection.on("end", () => {
        console.log("disconnected from server");
      });
    });
  }
}


class Response {}

class ResponseParser {
  constructor() {
    this.WAITING_STATUS_LINE = 0;
    this.WAITING_STATUS_LINE_END = 1;
    this.WAITING_HEADER_NAME = 2;
    this.WAITING_HEADER_VALUE = 3;
    this.WAITING_HEADER_LINE_END = 4;
    this.WAITING_HEADER_BLOCK_END = 5;

    this.current = this.WAITING_STATUS_LINE;
    this.statusLine = "";
    this.headers = {};
    this.headerName = "";
    this.headerValue = "";
  }
  receive(string) {
    for (let i = 0; i < string.length; i++) {
      this.receiveChar(string.charAt(i));
    }
  }
  receiveChar(char) {
    if (this.current === this.WAITING_STATUS_LINE) {
      if (char === "\r") {
        this.current = this.WAITING_STATUS_LINE_END;
      } else {
        this.statusLine += char;
      }
    }
  }
}
class TrunkedBodyparser {}

void (async function () {
  let req = new Request({
    methods: "POST",
    host: "127.0.0.1",
    port: "8088",
    headers: {
      "x-http": "test",
    },
    body: {
      name: "fan",
    },
  });
  let response = await req.send();
  console.log(response);
})();