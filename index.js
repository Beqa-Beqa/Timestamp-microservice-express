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

const formatDateTime = (date) => {
  let unix;
  let utc;

  if(date && date.includes("-")) {
    unix = Number((new Date(date).getTime()).toFixed(0));
    utc = new Date(unix);
  } else if(date && !date.include("-")){
    unix = Number(date);
    utc = new Date(unix);
  } else {
    unix = Number(new Date().getTime());
    utc = new Date(unix);
  }

  const year = utc.getFullYear();
  const month = months[utc.getMonth()];
  const dayOfWeek = daysOfWeek[utc.getDay()].slice(0, 3);
  const dateOfMonth = utc.getDate();
  const hhmmss = `${utc.getHours().toString().padStart(2, "0")}:${utc.getMinutes().toString().padStart(2, "0")}:${utc.getSeconds().toString().padStart(2, "0")} GMT`;

  return {
    unix: unix,
    utc: `${dayOfWeek}, ${dateOfMonth} ${month} ${year} ${hhmmss}`
  }
}

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const daysOfWeek = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

app.get("/api/:date", (req,res) => {
  const {unix, utc} = formatDateTime(req.params.date);
  res.json({
    unix: unix,
    utc: utc
  });
});

app.get("/api", (req,res) => {
  const {unix, utc} = formatDateTime();
  res.json({
    unix: unix,
    utc: utc
  });
});

// Define port 
const port = process.env.PORT || 3000;


// Listen to app
app.listen(port, () => {
  console.log("Server is listening on port " + port);
});