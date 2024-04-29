const express = require('express');
const dotenv = require('dotenv');

dotenv.config();


const port = process.env.PORT;

const app = express();

//in memory data : 
var users = [
    //user 1
    {
    name : 'John',
    kidneys : [{
        healthy : false
    }, 
    {
        healthy : true
    }
    ]
},
     //user 2
    //  {

    //  }
];

console.log(users);

//doctor assignment : 
app.get('/', (req, res) => {
    const userkidneys = users[0].kidneys;
    const numberOfKidneys = userkidneys.length;
    let numberOfHealthyKidneys = 0;
    for (i = 0; i < userkidneys.length; i++) {
        if (userkidneys[i].healthy) {
            numberOfHealthyKidneys++;
        }
    }
    const unhealthy = numberOfKidneys - numberOfHealthyKidneys;

    res.json({
        userkidneys,
        numberOfKidneys,
        numberOfHealthyKidneys,
        unhealthy
    })
});


//use express.json to parse the json / db body: it is a middleware
app.use(express.json());
app.post('/', (req, res) => {
    const isHealthy = req.body.isHealthy;
    //if want to get a healhty kidney, update it to the json db and if want unhealthy then also get the health to false
    users[0].kidneys.push({
        healthy : isHealthy
        //add unhealthy kidneys : 
        // healthy : false 
    });
    res.json({
        message : "Done adding kidney"
    })
});

app.put('/', (req, res) => {
    //make unhealthy to healthy : without adding any extra kidneys :
    for (var i = 0; i < users[0].kidneys.length; i++) {
        users[0].kidneys[i].healthy = true;
    }

    res.json({msg : 'done updating kidneys'});
});

app.delete('/', (req, res) => {
    //delete all unhealthy kidneys and update the total number of kidneys : 
    const newKidenysAfterDeletion = [];
    for (let i = 0; i < users[0].kidneys.length; i++) {
        if (users[0].kidneys[i].healthy) {
            newKidenysAfterDeletion.push({
                healthy: true
            })
        }
    }
    //update users[0].kidneys with new values : 
    users[0].kidneys = newKidenysAfterDeletion
    res.json({msg : 'done deltion'})
});











//controllers : 
function sum (n) {
    ans = 0;
    for (i = 1; i <= n; i++) {
        ans += i;
    }
    return ans;
}


app.get('/home', (req, res) => {
    // res.send("hello world!");
    const a = req.query.n;
    const ans = sum(a);
    res.send('hi your answer is ' +  ans);
});


app.listen(port, () => {
    console.log('listening on port ' + port);
});