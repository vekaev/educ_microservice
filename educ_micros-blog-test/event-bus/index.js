const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));

const events = [];

app.post('/events', (req, res) => {
	const event = req.body;

	events.push(event)

	console.log(event.type)

	axios.post('http://posts-srv:4000/events', event).then(() => null).catch(() => null)
	axios.post('http://comments-srv:4001/events', event).then(() => null).catch(() => null)
	axios.post('http://query-srv:4002/events', event).then(() => null).catch(() => null)
	axios.post('http://moderation-srv:4003/events', event).then(() => null).catch(() => null)

	res.send({ status: 'OK' });
});

app.get('/events', (req, res) => {
	res.send(events)
});

app.listen(4005, () => {
	console.log('Listening on http://localhost:4005')
})
