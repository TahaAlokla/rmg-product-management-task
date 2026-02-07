const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  const file = path.join(process.cwd(), 'mock-data.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  
  if (req.method === 'GET') {
    res.status(200).json(data.products);
  } else {
    res.status(405).send('Method Not Allowed');
  }
};
