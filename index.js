// Initialize express app
const express = require("express");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// Serve static files
app.use(express.static("public"));

// Homepage get request
app.get("/", (req,res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// First endpoint
app.get("/api/hello", (req,res) => {
  res.json({greetings: "Hello API World"});
});


// Timestamp Microservice
// Enter date either in unix seconds or utc time and it will return json with both utc and unix times
const checkInvalidDate = (date) => date.toUTCString() === "Invalid Date";

app.get("/api/:date", (req,res) => {
  let date = new Date(req.params.date);

  if(checkInvalidDate(date)){
    date = new Date(Number(req.params.date));
  }

  if(checkInvalidDate(date)){
    res.json({error: "Invalid Date"});
    return;
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  })
});

app.get("/api", (req,res) => {
  const dateNow = new Date();

  res.json({
    unix: dateNow.getTime(),
    utc: dateNow.toUTCString()
  })
});

// Define port 
const port = process.env.PORT || 3000;


// Listen to app
app.listen(port, () => {
  console.log("Server is listening on port " + port);
});