var path = require('path');
var express = require('express');
var app = express();
var port = 3000;

// This is a very simple server to serve the html shell for our built app to run on.
// I know this is janky, but this is not a production application!
app.use('/dist', express.static(__dirname + '/dist'));
app.get('/', function(req, res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
  }
});