const net = require('net');
// const postData = 'msg=Hello World!'
// const client = net.createConnection({ host: '127.0.0.1', port: 3000 }, () => {
//   // 'connect' listener.
//   console.log('connected to server!');
//   client.write('GET * HTTP/1.1\r\n');
//   client.write('Host: /\r\n');
//   client.write('Content-Type: text/html\r\n');
//   client.write(`Content-Length: ${Buffer.byteLength(postData)}\r\n`);
//   client.write('\r\n');
//   client.write(`${postData}`);
//   client.write('\r\n');
// });
// client.on('data', (data) => {
//   console.log(data.toString());
//   client.end();
// });
// client.on('end', () => {
//   console.log('disconnected from server');
// });
// client.on('error', (err) => {
//   console.log(err);
//   client.end();
// });

class Query {
  typeof(data) {
    const typeString = Object.prototype.toString.call(data)
    const reg = /(\[object) (\w+)/
    const execArr = reg.exec(typeString)

    return execArr[2].toLowerCase()
  }
  stringify(data) {
    let queryString = ''
    if (this.typeof(data) === 'object') {
      for (let key in data) {
        if (queryString !== '') {
          queryString += '&'
        }
        queryString += `${key}=${data[key] || ''}`
      }
    } else {
      throw new Error('need a object, but get ' + this.typeof(data))
    }
    return queryString
  }
}
const query = new Query
class Request {
  constructor({
    method = 'GET',
    host = '127.0.0.1',
    path = '*',
    port = 80,
    headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body = {}
  } = {
    }) {
    console.log({
      method,
      host,
      path,
      port,
      headers,
      body
    })
    this.host = host
    this.path = path
    this.port = port
    this.headers = headers
    if (this.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      this.body = query.stringify(body)
    } if (this.headers['Content-Type'] === 'application/json') {
      this.body = JSON.stringify(body)
    }
    this.headers['Content-Length'] = Buffer.byteLength(this.body)
    this.method = method

    this.client = null
  }
  createConnection() {
    this.client = net.createConnection({ host: this.host, port: this.port })
  }
  write() {
    if (!this.client) {
      this.createConnection()
    }
    const client = this.client
    client.write(`${this.method} ${this.path} HTTP/1.1\r\n`);
    client.write(`Host: ${this.host}:${this.port}\r\n`);
    for (let key in this.headers) {
      client.write(`${key}: ${this.headers[key]}\r\n`);
    }
    client.write('\r\n');
    client.write(`${this.body}`);
    client.write('\r\n');
  }
  send() {
    return new Promise((resolve, reject) => {
      this.write()
      this.client.on('data', (data) => {
        resolve(data.toString())
        this.client.end();
      });
      this.client.on("end", () => {
        console.log("disconnected from server");
      });
      this.client.on("error", (e) => {
        reject(new Error(e));
        this.client.end();
        throw new Error(e);
      });
    })

  }
}
const request = new Request({ port: 3000 })
request.send().then(res => {
  console.log(res)
})
class ResponseParser {

  receive(string) {
    for (const c of string) {
      this.receiveChar(c);
    }
  }
  receiveChar(c) { }
}