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
        if(parser.isFinished) {
          resolve(parser.response)
        }
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
    this.WAITING_HEADER_SPACE = 3;
    this.WAITING_HEADER_VALUE = 4;
    this.WAITING_HEADER_LINE_END = 5;
    this.WAITING_HEADER_BLOCK_END = 6;
    this.WAITING_BODY = 7;

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
  get isFinished() {
    return this.bodyParser && this.bodyParser.isFinished
  }
  get response() {
    this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/);
    return {
      statusCode: RegExp.$1,
      statusText:RegExp.$2,
      headers:this.headers,
      body:this.bodyParser.content.join('')
    }
  }
  receiveChar(char) {
    if (this.current === this.WAITING_STATUS_LINE) {
      if (char === "\r") {
        this.current = this.WAITING_STATUS_LINE_END;
      } else {
        this.statusLine += char;
      }
    } else if (this.current === this.WAITING_STATUS_LINE_END) {
      if (char === "\n") {
        this.current = this.WAITING_HEADER_NAME;
      }
    } else if (this.current === this.WAITING_HEADER_NAME) {
      if (char === "\r") {
        this.current = this.WAITING_HEADER_BLOCK_END;
      }
      if (char === ":") {
        this.current = this.WAITING_HEADER_SPACE;
      } else {
        this.headerName += char;
      }
    } else if (this.current === this.WAITING_HEADER_SPACE) {
      if (char === " ") {
        this.current = this.WAITING_HEADER_VALUE;
      }
    } else if (this.current === this.WAITING_HEADER_VALUE) {
      if (char === "\r") {
        this.current = this.WAITING_HEADER_LINE_END;
        this.headers[this.headerName] = this.headerValue;
        this.headerName = "";
        this.headerValue = "";
      } else {
        this.headerValue += char;
      }
    } else if (this.current === this.WAITING_HEADER_LINE_END) {
      if (char === "\n") {
        this.current = this.WAITING_HEADER_NAME;
      }
    } else if (this.current === this.WAITING_HEADER_BLOCK_END) {
      if (this.headers["Transfer-Encoding"] === "chunked") {
        this.bodyParser = new TrunkedBodyparser();
      }
      if (char === "\n") {
        this.current = this.WAITING_BODY;
      }
    } else if (this.current === this.WAITING_BODY) {
      this.bodyParser.receiveChar(char);
    }
  }
}
class TrunkedBodyparser {
  constructor() {
    this.WAITING_LENGTH = 0;
    this.WAITING_LENGTH_LINE_END = 1;
    this.READING_TRUNK = 2;
    this.WAITING_NEW_LINE=3;
    this.WAITING_NEW_LINE_END=4
    this.length = 0;
    this.content = [];
    this.isFinished = false
    this.current = this.WAITING_LENGTH
  }
  receiveChar(char) {
    if (this.current === this.WAITING_LENGTH) {
      if(char === '\r') {
        if(this.length ===0) {
          this.isFinished = true
        
        }else {
          this.current = this.WAITING_LENGTH_LINE_END
        }
       
      }else {
        this.length *= 16;
        this.length += parseInt(char, 16);
      }

    } else if (this.current === this.WAITING_LENGTH_LINE_END) {
      if(char === '\n') {
        this.current = this.READING_TRUNK
      }
    }else if(this.current === this.READING_TRUNK) {
      this.content.push(char)
      this.length--;
      if(this.length===0) {
        this.current = this.WAITING_NEW_LINE
      }
    } else if(this.current ===this.WAITING_NEW_LINE) {
 
      if(char === '\n'){
        this.current = this.WAITING_LENGTH
      }
      
    }
  }
}

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
  let dom = parser.parseHTML(response.body);
  console.log(response);
})();
