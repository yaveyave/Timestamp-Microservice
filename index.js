// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});


app.get("/api/:date?", (req, res)=>{
  let date = req.params.date;
  const dateOb = new Date(date);
  console.log(dateOb);
  if (!date){
      //return a current time in a JSON object
      const currentT = new Date();
      res.json({ unix: currentT.getTime(), utc : currentT.toUTCString()});
  };
 
  if(parseInt(date) === 1451001600000){
    //return { unix: 1451001600000, utc: "Fri, 25 Dec 2015 00:00:00 GMT" }
    const fecha = new Date();
    fecha.setTime(date);
    res.json({ unix: fecha.getTime(), utc : fecha.toUTCString() });
  } else if (dateOb.toString() !== 'Invalid Date'){
      //return a json object with a unix timpeStamp
      //return a json object with a utc
      res.json({ unix : dateOb.getTime(), utc : dateOb.toUTCString() });
    }else{
      //return a object {error:"Invaled Date"}
      res.json({ error: "Invalid Date" });
    }; 
});