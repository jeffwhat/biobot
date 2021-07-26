


// server/ids: return IDs to populate typeahead

// server/track: get tracking information for given ID

const express = require("express");
const fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();

// get kit id

const dataPath = './server/data/KITS_SHIPPING_DATA.json';

// Fetch all ids for typeahead
app.get('/ids', (req, res) => {

  fs.readFile(dataPath, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
    res.send(JSON.parse(data));
  });

});

// Fetch data based on ID passed in

app.get('/track', (req, res) => {

  let id = req.query.id;
  let max = req.query.max;

  fs.readFile(dataPath, 'utf8', (err, data) => {
    
    if (err) {
      throw err;
    }

    if (id) {   // show match

      // {"id":1,"label_id":"47-561-8310","shipping_tracking_code":"5796955810"}

      let matchedData = {};
      let foundMatch = false;

      var jsondata = JSON.parse(data);

      for (let i=0; i<jsondata.length; i++){
        if (jsondata[i].label_id == id ) {
           matchedData = jsondata[i];
           foundMatch = true;
          
        }
      }

      if (foundMatch) {
      res.send(matchedData);
      } else {
        res.send("ID not found");

      }


      } else { 

    res.send("No ID provided");

  }
  
  });

});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
