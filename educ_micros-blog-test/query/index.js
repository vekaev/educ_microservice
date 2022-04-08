const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
    switch (type) {
        case 'PostCreated':
            posts[data.id] = {...data, comments: []}
            break;
        case 'CommentCreated':
            const {postId, ...newComment} = data;

            posts[postId]?.comments.push(newComment)
            break;
        case 'CommentUpdated':
            const post = posts[data.postId];
            const foundComment = post.comments.find(({id}) => id === data.id);

            foundComment.status = data.status;
            foundComment.content = data.content;
            break;
    }
}

app.get('/posts', (req, res) => {
    res.send(posts);
})

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    handleEvent(type, data);

    res.send({})
})

app.listen(4002, async () => {
    console.log('Listen on 4002')

    const res = await axios.get('http://event-bus-srv:4005/events')

    for (let event of res.data) {
        console.log('Processing event: ' + event.type);

        handleEvent(event.type, event.data);
    }
});
