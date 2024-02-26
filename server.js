const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/validate-face-position', (req, res) => {
  // Perform your validation logic here
  // If the face position is valid, send a response with a 200 status code and a JSON object with a "valid" property set to true
  // If the face position is not valid, send a response with a 400 status code and a JSON object with a "valid" property set to false
  const isValid = true; // Set to true or false based on your validation logic
  if (isValid) {
    res.status(200).json({ valid: true });
  } else {
    res.status(400).json({ valid: false });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
