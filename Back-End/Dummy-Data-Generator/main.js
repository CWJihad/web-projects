const express = require('express')
const mongoose = require('mongoose');
const employee = require("./models/employee");

const app = express()
const port = 3000

mongoose.connect('mongodb://127.0.0.1:27017/company'); // "/company it's a db name"
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index')
})

let nameArr = ["Jihad", "Ahad", "Samiul", "Polash", "Harry", "Hitesh"]
let cityArr = ["Pabna", "Sujanagar", "Dhaka", "Barisal", "Sirajganj", "Delhi"]
let lanArr = ["Js", "Py", "Java", "Cpp", "Kotlin", "GO"]

let randomGen = (arr) => {
    let index = Math.floor(Math.random() * (arr.length - 1))
    return arr[index]
}

app.get('/generate', async (req, res) => {

    await employee.deleteMany({})

    // Dummy data generating logic
    for (let i = 0; i < 1; i++) {
        let e = await employee.create({
            name: randomGen(nameArr),
            salary: Math.floor(Math.random() * (50000 - 30000)) + 30000,
            language: randomGen(lanArr),
            city: randomGen(cityArr),
            isManager: Math.random() > 0.5 ? true: false // random data greater than zero then true otherwise false
        })
        console.log(e);
    }
    
    res.render('index')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
