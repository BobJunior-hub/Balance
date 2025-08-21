const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());
app.use(express.static('.')); // index.html, style.css, main.js shu papkada

const FILE = 'file.txt';

// Balansni olish
app.get('/balance', (req, res) => {
  fs.readFile(FILE, 'utf8', (err, data) => {
    if (err || !data) {
      return res.json({ balance: 0, history: [] });
    }
    const [balanceLine, historyLine] = data.split('\n');
    const balance = parseInt(balanceLine.replace('balance=', '')) || 0;
    const history = historyLine ? historyLine.replace('history=', '').split('|') : [];
    res.json({ balance, history });
  });
});

// Balansni yangilash
app.post('/balance', (req, res) => {
  const { balance, history } = req.body;
  const text = `balance=${balance}\nhistory=${history.join('|')}`;
  fs.writeFile(FILE, text, () => {
    res.json({ status: 'ok' });
  });
});

app.listen(3000, () => console.log("✅ Server ishlayapti: http://localhost:3000"));
