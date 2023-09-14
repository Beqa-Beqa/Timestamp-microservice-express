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
app.get("/api/:date", (req,res) => {
  if(req.params.date.includes("-")) {
    const unix = Number((new Date(req.params.date).getTime()).toFixed(0));
    const utc = new Date(unix).toString();
    res.json({
      unix: unix,
      utc: utc 
    });
  } else {
    res.json({
      unix: Number(req.params.date),
      utc: new Date(Number(req.params.date)).toString()
    });
  }
});

// Define port 
const port = process.env.PORT || 3000;


// Listen to app
app.listen(port, () => {
  console.log("Server is listening on port " + port);
});