const express =require('express');
const app=express();
const port=8000;

const expressLayouts=require('express-ejs-layouts');

app.use(express.static('./assets'));
app.use(expressLayouts);

app.set('layout extractStyles',true);
app.set('layout extractScripts',true);


//use express  router as routes folder
app.use('/',require('./routes'));


//set up the view engine c
app.set('view engine','ejs');
app.set('views','./views');
app.listen(port,function(err){
    if(err){
        console.log(`error occurs in ${port}`);

    }
    console.log(`server is running on the port: ${port}`);
});