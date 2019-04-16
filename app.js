var express = require('express');
var fs = require('fs');
var app = new express();
var port = 3000;
app.listen(port, function(err) {
    console.log(err)
    if (typeof(err) == "undefined") {
        console.log('Your application is running on : ' + port + ' port');
    }
});

var routeMap = []
var routeMapDir = fs.readdirSync('views/pages')
routeMapDir.forEach(function(itm) {
  itm = itm.split('.');
  itm = [ '/'+itm[0], itm[0] ]
  routeMap.push(itm)
})

console.log(routeMap);

app.set('view engine', 'ejs')
app.use('/static/css', express.static('static/css'));
app.use('/static/js', express.static('static/js'));

app.get("/:url",(req,res,next)=>{
  console.log(req.params)
  if (routeMap[0][req.params.url] === req.params.url) {
    res.render('pages/'+req.params.url)
  }else {
    res.render('404')
  }
})
app.get("/",(req,res,next)=>{
  res.render('pages/index')
})
