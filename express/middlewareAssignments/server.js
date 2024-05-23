const express = require('express');


const app = express();


//functions for middlewares
let pingCount = 0;
function countRequests(req, res, next) {
    pingCount += 1;
    // if (next) next();
    next();
}
let time= 0;
function avgServerTime() {

}


//MIDDLEWARES : 
//1) body parse/json()
app.use(express.json());

// 2)count the number of requests middleware
app.use(countRequests);
// 3) find the average time server is taking to handle requests : 
app.use(avgServerTime);

// ENDPINTS : 
app.get('/', (req, res) => {
    console.log(pingCount)
});
app.get('/hello', (req, res) => {
    app.send("hello world");
});
app.get('/bye', (req,res) => {
    app.send("bye world" + pingCount);
})


//GLOBAL CATCH : 
app.use(function(err, req, res, next) {
    res.json({
        msg : "Sorry something is up with our server"
    })
});

app.listen(3000, () => {
    console.log("3000");
})