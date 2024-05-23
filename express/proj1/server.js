const express = require('express');
const zod = require('zod');
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

// AUTHENTICATION : 

// creating a schema for array of number : we need an array of kidneys --> other data isn't acceptable
const schema = zod.array(zod.number());   //only array of numbers are allowed by zod


//  ZOD EMAIL + PASSWORD + COUNTRY = 'US' OR 'IN' SCHEMA : 
const emailSchema = zod.object({
    email : zod.string().email(),       //should be a string + email 
    password : zod.string().min(8), //min lenght of stirng should be 8 characters and max can be any length
    country : zod.literal("IN").or(zod.literal("US"))
})

app.get('/health-checkup', (req, res) => {
    const username = req.header.username;
    const password = req.headers.password;
    const kidneyId = req.query.kidneyId;

    if(username != 'abhishek' && password != 'pass') {
        res.status(400).json({"msg" : "Invalid username or password"});
        return;
    }
    if (kidneyId != 1 && kidneyId != 2) {
        // res.json({
            res.status(400).json({message : 'Something went wrong'});
            return;
        // });
    } 
    //if all checks are successful and they do not return back : 
    res.json({msg : "You have successfully logged in and your kidney is  fine"});
});

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

    //ZOD VALIDATION : 
    const kidneys = req.body.kidneys;   //array of kidneys : array of numbers
    const response = schema.safeParse(kidneys);
    // res.send(response); 
    if (!response.success) {
        res.status(411).json({
            msg : "invalid input"
        });
    } else {
        res.send(response);
    }


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

    // EDGE CASE : 
    // if no unhealthy kidney found
    // COMPLETE THIS ASSIGNMENT : 


    //make unhealthy to healthy : without adding any extra kidneys :
    for (var i = 0; i < users[0].kidneys.length; i++) {
        users[0].kidneys[i].healthy = true;
    }

    res.json({msg : 'done updating kidneys'});
});

app.delete('/', (req, res) => {
    
    // EDGE CASE : 
    // if there are no unhealthy kidneys : do nothing and return 400 status code 
        let numberOfUnhealthy = 0;
        //if no unhealthy condition, return status 411:
        for (let i = 0; i < users[0].kidneyslength; i++) {
            if (users[0].kidneys[i].healthy == false) numberOfUnhealthy++;
        }
        if (numberOfUnhealthy == 0) {
            res.status(411).send({
                message : "No unhealthy kidneys found"
            })
        }


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



//ASSIGNMENTS : 
// 1) RETURN true if a string in a string array the size of the array is 1, else return false : 
const stringSchema = zod.array(zod.string()).length(1);

app.get('/api/stirng/check', (req, res) => {
    const res = stringSchema.safeParse(req.params);
    console.log(res);
    // if (res) res.send("True");
    // else res.send("False");
})









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