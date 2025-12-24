const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 9000;

app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
  res.json({ message: 'Server is working!' });
});

app.listen(PORT, () => {
  console.log(`✅ Test server running on port ${PORT}`);
});