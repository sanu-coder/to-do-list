//importing modules ie express, body-parser
const express = require("express");
const bodyParser = require("body-parser");

//line we are writing before using express
const app = express();

//below line prepares our code to use ejs module/package
app.set("view engine", "ejs");

//creates an empty to-list list
let items = [];

let worklist = [];
//using body-parser
app.use(bodyParser.urlencoded({ extended: true }));

var output = '';

//makes our code ready to usse stylesheets
app.use(express.static("public"));



app.get("/", function(req, res) {
    //below is the date format in the for dd/mm/yyyy
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var today = new Date();
    const month = monthNames[today.getMonth()];
    const day1 = String(today.getDate()).padStart(2, '0');
    const year = today.getFullYear();
    output = month + '-' + day1 + '-' + year;
    console.log(output);
    var currentDate = today.getDay();
    var day = "";


    //below code tells the weekday
    switch (currentDate) {
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;
        case 0:
            day = "Sunday";
            break;
        default:
            console.log("Wrong choice");
    }




    //here it renders the list in the formatted string ..(ejs)
    res.render("list", {
        kind_of_day: day,
        todays_date: output,
        content: items
    });
})


//here it is used in the form portion 
app.post("/", function(req, res) {
    console.log(req.body)
    var item = req.body.newItem;
    items.push(item);
    // console.log(item);
    //redirects to the "/" part ..so that it goes to get part of the code.
    res.redirect("/");
})


app.get("/work", function(req, res) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var today = new Date();
    const month = monthNames[today.getMonth()];
    const day1 = String(today.getDate()).padStart(2, '0');
    const year = today.getFullYear();
    output = month + '-' + day1 + '-' + year;
    res.render("list", {
        kind_of_day: "Work List",
        todays_date: output,
        content: worklist
    });
})

app.get("/about", function(req, res) {
    res.render("about");
})
app.post("/work", function(req, res) {
    let item = req.body.newItem;
    worklist.push(item);
    res.redirect("/work");
})
app.listen(3000, function() {
    console.log("Server started at port 3000");
})