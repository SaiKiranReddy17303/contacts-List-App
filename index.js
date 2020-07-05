const express=require('express');
const path = require('path');
const port=3000;
const db = require('./config/mongoose');
const Contact=require('./models/contact');
const app=express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded() );
app.use(express.static('assets'));
// creating our own middleware1
//  app.use(function(req,res,next){
//     req.myname="saikiranreddy",
//     //console.log("midlleware1 is called");
//     next();
// });
//  // creating our own middleware2
// app.use(function(req,res,next){
//     console.log('My Name is from mw2',req.myname);

//     //console.log("midlleware2is called");
//     next();
// });
//end of middlewares

// var contactList=[
//     {
//         name:"Arun",
//         phone:"8501937057"

//     },
//     {
//         name:"Lucky",
//         phone:"8096563499"

//     },
//     {
//         name:"Bunny",
//         phone:"7989280175"

//     }

// ]
//start of the controller(which contains the various functions to control the specific requests)
app.get('/',function(req,res){
  // console.log('From the home route controller',req.myname);
  Contact.find({},function(err,contacts){
      if(err){
          console.log('Error in fetching the data from the database');
          return;
      }
      return res.render('home',
   {
       title:"contact List",
       contact_list:contacts

});
      
  });
   

});

app.get('/practice',function(req,res){
   
    return res.render('practice',{title:"Govindugari"}
    );
 });

 app.post('/create-contact',function(req,res){
    //  contactList.push(
    //      {
    //          name:req.body.name,
    //          phone:req.body.phone
    //      });

//  contactList.push(req.body);
//      return res.redirect('back');
Contact.create({
    name:req.body.name,
    phone:req.body.phone
},function(err,newcontact){
    if(err){
        console.log('error in creating a contact');
        return;
    }
    console.log('*********',newcontact);
    return res.redirect('back');
});
 });
//for deleting the contact from the database
 app.get('/delete-contact/', function(req, res){
    // console.log(req.query);
    // let phone = req.query.phone;

    // let contactindex = contactList.findIndex(contact => contact.phone == phone);

    // if(contactindex != -1){
    //     contactList.splice(contactindex, 1);
    // }

    // return res.redirect('back');
//get the id from the query in the url
let id=req.query.id;
//find the contact in the database using the id and delete that conatct
Contact.findByIdAndDelete(id,function(err){
    if(err){
        console.log('error in deleting the contact from the database');
        return;
    }
    return res.redirect('back');
});
});

//end of controller



app.listen(port,function(err)
{
    if(err)
    {
    console.log('Error in running the server',err);
    }

console.log('My express server is running sucessfully',port);

}
);
