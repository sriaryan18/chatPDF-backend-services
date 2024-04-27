const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'application/json'});
  
  const parsedUrl = url.parse(req.url, true);
  const requestData = {
    method: req.method,
    url: req.url,
    query: parsedUrl.query,
    headers: req.headers,
    // You can add more request details if needed
  };
  
  const responseBody = JSON.stringify(requestData, null, 2);
  console.log('Request received with query parameters:', parsedUrl);

  res.end(responseBody);
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
