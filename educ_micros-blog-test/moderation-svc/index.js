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

app.post('/events', (req, res) => {
    const { type, data } = req.body;

    console.log(type)

    switch (type) {
        case 'CommentCreated':
            const status = data.content.includes('orange') ? 'deprecated': 'approved';

            axios.post('http://localhost:4005/events', {
                type: 'CommentModerated',
                data: { ...data, status },
            })
    }

})

app.listen(4003, () => {
    console.log('Listen on 4003')
});
