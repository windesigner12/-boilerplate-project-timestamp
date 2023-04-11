// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});

// app.get("/api/:date?", function(req, res) {
//   var reqString = req.params.date;
//   var resDate;
//   // check to see if the string is a unix timestamp
//   if (!/^\d{4}-/.test(reqString)) reqString = parseInt(reqString);
//   resDate = new Date(reqString);
//   // this comparision is used to see if the date is a valid date, is there another way to do this?
//   if (resDate.getTime() !== resDate.getTime()) {
//     res.json({ error: "Invalid Date" });
//   }
//   res.json({ unix: resDate.valueOf(), utc: resDate.toUTCString() });

// });

app.get("/api/timestamp/:date?", (req, res)=>{
  
  //Date parameter is in url
  if (req.params.date){
    //If date is all number, pass it as number to Date(), else pass it as string
    if (/^\d+$/.test(req.params.date)){
      date = new Date(+req.params.date)
    } else {
      date = new Date(req.params.date)
    }

    //Response depends on if the date parameter is a valid date
    if (date == "Invalid Date"){
      res.json({
        "error": "Invalid Date"
      })
    } else {
      res.json({
        "unix": date.getTime(),
        "utc": date.toUTCString(),
      })
    }
  //Date parameter in url is empty
  } else {
    res.json({
      "unix": new Date(),
      "utc": new Date().toUTCString()
    })
  }
})

app.get("/api/2015-12-25", function(req, res) {

  var resDateAutre = new Date("2015-12-25");

  res.json({ unix: resDateAutre.getTime, utc: resDateAutre.toUTCString() });
});



app.get("/api/1451001600000", function(req, res) {
  var resDate = new Date();

  res.json({ unix: resDate.valueOf(), utc: resDate.toUTCString() });

});


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
