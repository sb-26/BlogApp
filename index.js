const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/mongoose.js');
const Post = require('./models/post.js');


const homeContent = "A blog site where u can write blog";

var post_lists=[

];

const port = 3000;
const app = express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname));
app.use(express.urlencoded());
app.use(express.static('assets'));

app.get('/',function(req,res){

  Post.find({},function(err,posts){
    res.render('./views/home',
      {
        title:'Blog App',
        homeContent: homeContent,
        post_lists:posts,
      }
    );
  });
  

  
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
  Post.create({
    postTitle:req.body.postTitle,
    postBody:req.body.postBody
  },
  function(err,newPost){
    console.log(newPost.postTitle+" "+newPost.postBody);
    res.redirect('back');
  });
  
});


app.get('/posts/:postName',function(req,res){
  const url = req.params.postName;
  Post.find({},function(err,posts){
    res.render('./views/blog',{
      title:url,
      post_lists:posts,
    });
  });
});


app.listen(port,function(){
  console.log('server is running');
})