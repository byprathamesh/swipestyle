const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.get('/', (req, res) => {
  res.send('Hello from SwipeStyle Backend!');
});

// Placeholder endpoints (to be implemented)
app.post('/auth/signup', (req, res) => res.json({ message: 'Signup endpoint placeholder' }));
app.post('/auth/login', (req, res) => res.json({ message: 'Login endpoint placeholder' }));
app.get('/items', (req, res) => res.json({ message: 'List items placeholder' }));
app.post('/items', (req, res) => res.json({ message: 'Create item placeholder' }));
app.post('/messages', (req, res) => res.json({ message: 'Send message placeholder' }));
app.get('/preferences', (req, res) => res.json({ message: 'Get preferences placeholder' }));
app.put('/preferences', (req, res) => res.json({ message: 'Update preferences placeholder' }));

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
}); 