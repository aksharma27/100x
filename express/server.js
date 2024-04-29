const express = require('express');

const app = express();


app.get('/', (req, res) => {
    res.send("Hi world");
});

app.post('/post', (req, res) => {
    const message = req.body.message;
    console.log(req.body);
    res.send({
        output: "2 + 2 = 4"
    })
})

app.listen(3000, () => {
    console.log('listening on port 3000');
});