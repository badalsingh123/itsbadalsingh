var express=require('express');
var nodemailer = require("nodemailer");
var app=express();
/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: "your email",
        pass: "your pass"
    }
});
/*------------------SMTP Over-----------------------------*/

/*------------------Routing Started ------------------------*/

app.get('/send',function(req,res){
    var msg="<strong>Dear Admin</strong><br>";
        msg+="<p>You have receive enquiry from Positrust</p>";
        msg+="<p>Please find the details below:</p>";
        msg+="<p>Name   :"+req.query.name+"</p>";
        msg+="<p>Email   :"+req.query.email+"</p>";
        msg+="<p>Number   :"+req.query.number+"</p>";
        msg+="<p>City   :"+req.query.city+"</p>";
        msg+="<p>Address   :"+req.query.address+"</p>";
        msg+="<p>Comment   :"+req.query.comment+"</p>";

    var mailOptions={
        from: '"Positrust Visitors" <Positrust@example.com>',
        to : req.query.email,
        subject : req.query.subject,
        html : msg,
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){ 
     if(error){
            console.log(error);
        res.end("error");
     }else{
            console.log(JSON.stringify(response));
            console.log("Message sent: " + response.messageId);
            res.end("sent");
         }
    });
});

/*--------------------Routing Over----------------------------*/

app.listen(3000,function(){
    console.log("Express Started on Port 3000");
});