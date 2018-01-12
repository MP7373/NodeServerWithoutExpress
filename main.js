const http = require('http')
const fs = require('fs')
const querystring = require('querystring')

const server = http.createServer((req, res) => {
  const { method, url } = req
  console.log('Request type: ' + method)
  console.log('Url: ' + url)
  switch (method) {
    case 'GET':
      switch (url) {
        case '/1':
          fs.readFile("page1.html", (err, data) => {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(data)
            res.end()
          })
          break
        case '/2':
          fs.readFile("page2.html", (err, data) => {
          res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(data)
            res.end()
          }) 
      }
      break
    case 'POST':
      switch (url) {
        case '/1':
          req.on('data', d => {
            let data1 = querystring.parse(d.toString())
            fs.writeFile('page1.html',
            `<!doctype <!DOCTYPE html><html><head></head><body><h1>File 1</h1><h2>${data1.page1}</h2></body></html>`, err => {
              if (err) throw err;
              console.log('Page 1 has been changed.')
            })
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html')
            res.end('Page 1 changed')
          })
          break
        case '/2':
          req.on('data', d => {
            let data2 = querystring.parse(d.toString())
            fs.writeFile('page2.html',
            `<!doctype <!DOCTYPE html><html><head></head><body><h1>File 1</h1><h2>${data2.page2}</h2></body></html>`, err => {
              if (err) throw err;
              console.log('Page 2 has been changed.')
            })
            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html')
            res.end('Page 2 changed')
          })
      }
      break
    default:
      res.statusCode = 400
      res.end
  }
})

server.listen(3000, () => {
  console.log('server listening on port 3000 ')
})
