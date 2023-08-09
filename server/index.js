require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post('/authenticate', async (req, res) => {
  const { username } = req.body;

  try {
    const response = await axios.put(
      'https://api.chatengine.io/users/',
      {
        username,
        secret: username,
        firstName: username
      },
      { headers: { 'PRIVATE-KEY': process.env.CHAT_ENGINE_PRIVATE_KEY } }
    );

    return res.status(response.status).json(response.data);
  } catch (error) {
    console.log('error', error);
    return res.status(error.response.status).json(error.response.data);
  }

  return res.json({ username: username, secret: 'sha256...' });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
