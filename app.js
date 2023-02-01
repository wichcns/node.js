
//ทำการ import express เข้ามาใช้งาน โดยสร้างตัวแปร express ขึ้นมาเพื่อรับค่า
const express = require('express')
const path = require('path')
const fs = require('fs')

//ทำการสร้าง Instance ของ express และสร้างตัวแปร app ขึ้นมาเพื่อรับค่า
const app = express()

//สร้างตัวแปร PORT ขึ้นมารับค่า port ในกรณีที่เราได้กำหนดไว้ใน environment ของเครื่อง
//แต่ถ้าไม่ได้กำหนดไว้ เราจะใช้ค่า 8080 แทน
const PORT =  4000

//app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.static('view'))

//สร้าง route ขึ้นมา 1 ตัว โดยกำหนดให้ path คือ / หรือ index ของ host นั่นเอง
//จากนั้นให้กำหนด response แสดงคำว่า Hello World
app.get('/', (req, res) => {
    console.log('123');
    res.json({data: "Hello Wich"})
})

app.get('/api', (req, res) => {
    
    let obj = {}

    if(req.query.age == '' || req.query.age.langth < 0){
        obj = {
            status: 401,
            message: "Please enter your age"
        }
    } else {
        if(req.query.age >= 20) {
            obj = {
                status: 200,
                name: "Hello Wich",
                video: "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/n0OIhBxg-xg\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" allowfullscreen></iframe>",
            }
        } else {
            obj = {
                status: 200,
                name: "Hello Wich",
                video: "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/0wj3yD2Mqkg\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" allowfullscreen></iframe>",
            }
        }
    }

    res.json(obj)
})

app.get('/wich', (req,res) => {

    let data = fs.readFileSync('./view/index.html', 'utf8');
    if(data) res.send(data);
    //if(data) res.send(data.replace('name','wich'));
})

//run web server ที่เราสร้างไว้ โดยใช้ PORT ที่เรากำหนดไว้ในตัวแปร PORT
app.listen(PORT, () => {
    //หากทำการ run server สำเร็จ ให้แสดงข้อความนี้ใน cmd หรือ terminal
    console.log(`Server is running on port : ${PORT}`)
})

//ทำการ export app ที่เราสร้างขึ้น เพื่อให้สามารถนำไปใช้งานใน project อื่นๆ 
//เปรียบเสมือนเป็น module ตัวนึง
module.exports = app

