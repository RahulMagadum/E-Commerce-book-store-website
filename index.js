const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const con = require('./DB_conn.js');
const app = express();
app.use(bodyParser.urlencoded({ extended: true}));
const publicpath = path.join(__dirname, 'public')

//app.use(express.static(publicpath));


app.get('/Home', (req, res)=>{
    res.sendFile(`${publicpath}/index.html`);
})


app.get('/Login', (req, res)=>{
    res.sendFile(`${publicpath}/login.html`);
})

app.post('/loginvalidation', (req, res)=>{
    const uname = req.body.Email;
    const pass = req.body.pass;

    const sql = `SELECT * FROM users WHERE email=${con.escape(uname)} and password=${con.escape(pass)}`;
    con.query(sql, function(err, result, fields) {
        if(err) throw err;
        console.log(result.length);
        if(result.length>0)
        {
            res.sendFile(`${publicpath}/index.html`)
        }

        else
        {
            res.sendFile(`${publicpath}/login.html`)
        }
})
})

app.post("/register",(req,res)=>{
    var fname=req.body.fname;
    var email=req.body.email;
    var pass=req.body.password;
   
var sql = `INSERT INTO users (Fname, email, password) VALUES ("${fname}","${email}", "${pass}")`;
    con.query(sql,function(err,result,field){
        if(err) throw err;
        
        console.log("Data Inserted SucessFully");
        res.redirect('/Login');

        
        

    })
})


app.get('*', (req, res)=>{
    res.sendFile(`${publicpath}/error.html`);
})

app.listen(8000);
