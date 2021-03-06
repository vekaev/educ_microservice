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

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
    const id = randomBytes(4).toString('hex');
    const {content} = req.body;
    const comments = commentsByPostId[req.params.id] || [];
    const comment = {id, content, status: 'pending'};

    comments.push(comment);

    commentsByPostId[req.params.id] = comments;

    axios.post('http://event-bus-srv:4005/events', {
        type: 'CommentCreated',
        data: {...comment, postId: req.params.id}
    }).then(() => null)

    res.status(201).send(commentsByPostId[id]);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    console.log(type)

    switch (type) {
        case 'CommentModerated':
            const comments = commentsByPostId[data.postId] || [];
            const comment = comments.find(({id}) => id === data.id);

            comment.status = data.status;

            axios.post('http://event-bus-srv:4005/events', {
                type: 'CommentUpdated',
                data
            })
    }

    res.send({})
})

app.listen(4001, () => {
    console.log('Listen on 4001')
});
