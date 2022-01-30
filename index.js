
// TASK-1(COMPLETED)

const express = require("express");
const app = express();
const mysql = require("mysql");
const port = 8000;

app.use(
    express.urlencoded({
      extended: true
    })
  )

app.use(express.json())

const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password : "password",
    database : "test",

})
con.connect(function(err){
 if(err) throw err;
    console.log('database connection successfully!');
})


app.get("/",(req,res)=>{
res.status(200).send("Hello .......");
});

app.post("/user/create", (req, res) => {
    const data = req.body;
    // Query..
    var sql = `INSERT INTO user_details () VALUES (${data.id},'${data.username}',${data.cont_number},'${data.password}','${data.create_date_time}')`;
    con.query(sql, function (err, result) {
      if (err){
          console.log(err);
        throw err;
      } 
      console.log("1 record inserted");
    });
    res.status(200).send("User created successfully..");
})

app.get('/users', (req, res) => {
    con.query("select * from user_details order by create_date_time asc;", function(err, results) {
        if(err) throw err
        res.status(200).send(results);
    })
})

app.delete("/users/:id",(req,res)=>{
    const userIds = req.params.id; // [1,2,3,4]
    let ids = "";
    var sql = `DELETE FROM user_details WHERE user_id=${userIds};`
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Number of records deleted: " + result.affectedRows);
    });
    res.status(200).send("user has been deleted successfully..");
})

app.listen(port ,()=>{
   console.log(`To listen my port no ${port}`)
});

