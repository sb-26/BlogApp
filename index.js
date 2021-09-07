const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const { url } = require('inspector');


const homeContent = "A blog site where u can write blog";

var posts=[

];

const port = 3000;
const app = express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname));
app.use(express.urlencoded());
app.use(express.static('assets'));

app.get('/',function(req,res){
  res.render('./views/home',
  {
    title:'Blog App',
    homeContent: homeContent,
    posts:posts,
  }
  );
});


app.get('/about',function(req,res){
  res.render('./views/about');
});

app.get('/contact',function(req,res){
  res.render('./views/contact');
});

app.get('/compose',function(req,res){
  res.render('./views/compose');
});


app.post('/compose',function(req,res){
  posts.push({
    postTitle:req.body.postTitle,
    postBody:req.body.postBody
  })
  res.redirect('back');
});


app.get('/posts/:postName',function(req,res){
  const url = req.params.postName;
  res.render('./views/blog',{
    title:url,
    posts:posts,
  })
});


app.listen(port,function(){
  console.log('server is running');
})