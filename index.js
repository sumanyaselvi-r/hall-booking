const express = require("express")
const fs = require("fs")
const path = require("path");




const data = [
    {
        id:"1",
        Seats:100,
        amenities:["AC","chairs","food","dj"],
        priceForAnHour:1000,
        customerName:"Dev",
        date:"16-12-2023",
        startTime:"12am",
        endTime:" 10pm",
        RoomeId:100,
        RoomName:"Duplex",
        status:"Booked",
       
       
    },
    {
        id:"2",
        Seats:50,
        amenities:["AC","chairs","discolights"],
        priceForAnHour:"999",
        customerName:"Riya",
        date:"20-12-2023",
        startTime:"6am",
        endTime:" 12pm",
        RoomeId:101,
        RoomName:"Duplex",
        status:"vacant",
       
       
    },
    {
        id:"3",
        Seats:20,
        amenities:["AC","chairs","discolights","internetAccess"],
        priceForAnHour:1500,
        
        customerName:"Devi",
        date:"27-12-2023",
        startTime:"6am",
        endTime:" 12pm",
        RoomeId:111,
        RoomName:"Duplex",
        status:"vacant",
    },
    {
        id:"4",
        Seats:200,
        amenities:["wifi,","AC","chairs"],
        priceForAnHour:1500,
        customerName:"nandy",
        date:"23-12-2023",
        startTime:"8am",
        endTime:" 6pm",
        RoomeId:128,
        RoomName:"Elite",
        status:"booked",
    },
    {
        id:"5",
        Seats:20,
        amenities:["AC","chairs","discolights","wifi"],
        priceForAnHour:2500,
        customerName:"dev",
        date:"25-12-2023",
        startTime:"12am",
        endTime:"10pm",
        RoomeId:208,
        RoomName:"suit",
        status:"booked",
    },
]

const app = express()

app.use(express.json())

app.get("/", function (req, res) {
    res.send(data);
  });



app.get("/hallbooking",(req,res)=>{
       
    if(req.query){
    const {status}=req.query;
    
    console.log(status)

    let filterddata = data;
    if(status){
        filterddata =  filterddata.filter((halls)=>halls.status===status)

    }
    res.send(filterddata)
}else{
    res.send(data)   
}
})

app.get("/hallbooking/:id",(req,res)=>{
    const {id}=req.params;
    console.log(id)
    const specificHall =data.find(hall=>hall.id===id)

    res.send(specificHall)
})



//creating a room

app.post("/hallbooking",(req,res)=>{
    const Hall ={
        id:data.length+1,
        Seats:req.body.Seats,
        amenities:req.body.amenities,
        priceForAnHour:req.body.priceForAnHour,
        RoomId:req.body.RoomId,
        customerName:req.body.customerName,
        date:req.body.date,
        startTime:req.body.startTime,
        endTime:req.body.endTime,
        RoomName:req.body.RoomName,

    }
    console.log(req.body);
    data.push(Hall);
    res.send(data);
 })

 //Booking a Room

 app.put("/hallbooking/:id",(req,res)=>{
    const {id}= req.params;
    const halls = data.find(hall=>hall.id===id);
    if(halls.status==="Booked"){
        res.status(400).send("Hey the hall is already booked")
    }else{
    halls.date = req.body.date;
    halls.startTime = req.body.startTime;
    halls.endTime = req.body.endTime;
    halls.customerName = req.body.customerName;
    halls.status="Booked"
    res.status(200).send(data)
    }
 })

 //List all rooms with booked data

 app.get("/allRoom",(req,res)=>{
    res
    .status(200)
    .send(
        data.map((room)=>{
            if(room.status==="Booked"){
                return{
                    "RoomName":room.RoomName,
                    "status":room.status,
                    "customerName":room.customerName,
                    "date":room.date,
                    "StartTime":room.startTime,
                    "endTime":room.endTime
                }
            } else{
                return{"RoomName":room.RoomName, "status":"vacant"}
            }
        })
    )
 })

 //List all customers with booked data

 app.get("/list/allcustomers",(req,res)=>{
    res
    .status(200)
    .send(
        data.map((room)=>{
            if(room.status==="Booked"){
                return{
                    "customerName":room.customerName,
                    "RoomName":room.RoomName,
                    "date":room.date,
                    "StartTime":room.startTime,
                    "endTime":room.endTime
                }
            } else{
                
                return{"RoomName":room.RoomName, "status":"vacant"}
            }
        })
    )
 })





app.listen(3500, ()=>console.log(`server started in localhost:3500`))
