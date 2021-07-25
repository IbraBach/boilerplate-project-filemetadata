var express = require('express');
var cors = require('cors');
var formidable = require('formidable');
require('dotenv').config()

var app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', function (req, res) {
  const form = formidable({ multiples: false });
 
    form.parse(req, (err, fields, file) => {
      console.log({name: file.upfile.name, type: file.upfile.type, size: file.upfile.size});
      //res.writeHead(200, { 'content-type': 'application/json' });
      res.json({name: file.upfile.name, type: file.upfile.type, size: file.upfile.size});
      //res.end(JSON.stringify({ fields, file }, null, 2));
    });
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
