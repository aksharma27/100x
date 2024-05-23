const express = require('express');

const app = express();
const zod = require('zod');

function validateInput (inputObject) {
    const schema = zod.object({
        email : zod.string().email(),
        password : zod.string().min(8);
    });

    const response = schema.safeParse(inputObject);
    console.log(response);
}

app.post('/login', (req,res) => {
    // const inputs = req.body;
    const response = validateInput(req.body);
    if (!response.success) {
        res.json({message : 'Your inputs are invalid'});
        return;
    } else {

    }
})
