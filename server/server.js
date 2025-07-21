require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 4000;

// Sample route
app.get('/', (req, res) => {
  res.send('Hello from Node.js!');
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
