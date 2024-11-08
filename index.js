const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello from the Node.js Microservice!');
});

app.listen(port, () => {
  console.log(`Microservice running on port ${port}`);
});
