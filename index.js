const express = require('express')
const app = express()
const port = 3001;

app.use(express.json());

const USERS = [];

const QUESTIONS = [{
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "5"
    }]
}];


const SUBMISSION = [

]

app.post('/signup', function(req, res) {
  // Add logic to decode body
  // body should have email and password

  const {email , password} = req.body;
  const userExist = USERS.find(user => user.email === email  );

  if(userExist){
    return res.status(409).json({erro:"user already exist"});
  }
  const user = {email , password};
  USERS.push(user);
  return res.status(200).json({error:"User added "});

  //Store email and password (as is for now) in the USERS array above (only if the user with the given email doesnt exist)


  // return back 200 status code to the client
  res.send('Hello World!')
})

app.post('/login', function(req, res) {
  // Add logic to decode body
  // body should have email and password
  const {email , password}= req.body ;
  // Check if the user with the given email exists in the USERS array
  const user = USERS.find(user => user.email === email);
  if(!user){
    return res.status(404).json({error:"user dosen't exist"});
  }
  // Also ensure that the password is the same
  if(user.password !== password){
    return res.status(401).json({error:"Invalid password"});
  }
  const success = "user_success";
  return res.status(200).json({error:"Login successfull"});
  
  


  // If the password is the same, return back 200 status code to the client
  // Also send back a token (any random string will do for now)
  // If the password is not the same, return back 401 status code to the client


  res.send('Hello World from route 2!')
})

app.get('/questions', function(req, res) {

  //return the user all the questions in the QUESTIONS array
  return res.status(200).json(QUESTIONS);
  res.send("Hello World from route 3!")
})

app.get("/submissions", function(req, res) {
   // return the users submissions for this problem
  res.send("Hello World from route 4!")
});


app.post("/submissions", function(req, res) {
   // let the user submit a problem, randomly accept or reject the solution
   // Store the submission in the SUBMISSION array above
  const submission = req.body ;
  SUBMISSION.push(submission);

  const accepted = Math.random() > 0.5;
  if(accepted){
    return res.status(200).json({error:"Submitted accepted"});
  }
  return res.status(400).json({error:"Submission rejected"});
  res.send("Hello World from route 4!")
});

// leaving as hard todos
// Create a route that lets an admin add a new problem
// ensure that only admins can do that.
app.post("/admin/add" , (req,res)=>{
  // check if the user is an admin
  if(req.user.role !== "admin"){
    return res.status(401).json({error:"You are not an admin"});
  }
  // add the problem to the QUESTIONS array
  QUESTIONS.push(req.body);
  return res.status(200).json(QUESTIONS);
  res.send("Hello World from route 5!")

})

app.listen(port, function() {
  console.log(`Example app listening on port ${port}`)
})