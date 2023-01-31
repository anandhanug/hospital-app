const express = require("express");
const app = new express();
const fs = require("fs");
app.use(express.json());
const data = require("./dataset.json");
app.get("/hospital",(req,res)=>{
    res.send(data);
})

app.post("/hospital",(req,res)=>{
    data.push(req.body);
    fs.writeFile("dataset.json",JSON.stringify(data),(err)=>{
        if(err){
            res.send("Data Cannot be Written");
        }
        else{
            res.send("Data Written Successfully");
        }
    })
})

app.put("/hospital/:name",(req,res)=>{
    let name = req.params.name;
    data.forEach((item)=>{
        if(item.hospitalName == name){
            item.patientCount = req.body.patientCount;
            item.location = req.body.location;
        }
    })
    fs.writeFile("dataset.json",JSON.stringify(data),(err)=>{
        if(err){
            res.send("Data Cannot be Updated");
        }
        else{
            res.send("Data Updated Successfully");
        }
    });
})

app.delete("/hospital/:name",(req,res)=>{
    let name = req.params.name;
    let value = data.filter(item=>item.hospitalName !== name);
    fs.writeFile("dataset.json",JSON.stringify(value),(err)=>{
        if(err){
            res.send("Data Cannot be Deleted");
        }
        else{
            res.send("Data Deleted");
        }
    })
})

fs.readFile("./dataset.json",(err,result)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log(JSON.parse(result));
    }
});


// let newData = {
//     hospitalName : "Ashwini",
//     patientCount : 18,
//     location : "Kochi"
// };
//  data.push(newData);
// fs.writeFile("./dataset.json",JSON.stringify(newData,null), err =>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("Data Added");
//     }
// });


app.listen(3000);
console.log("Server listening to port 3000");