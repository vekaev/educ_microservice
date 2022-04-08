const express = require('express');
const { randomBytes } = require('crypto')
const cors = require('cors');
const axios = require("axios");

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());

const posts = {};

app.get('/posts', (req, res) => {
  res.send(posts);
});

app.post('/posts/create', (req, res) => {
  const {title} = req.body;
  const id = randomBytes(4).toString('hex');

  posts[id] = {id, title};

  axios.post('http://event-bus-srv:4005/events', {
    type: 'PostCreated',
    data: posts[id]
  }).then(() => null)

  res.status(201).send(posts[id]);
});

app.post('/events', (req, res) => {
  console.log('Received event', req.body.type)

  res.send({})
})

app.listen(4000, () => {
  console.log('Listen on 4000')
});
