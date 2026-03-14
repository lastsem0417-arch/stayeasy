const mongoose = require("mongoose");
require("dotenv").config();

const Room = require("./models/Room");

mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("MongoDB Connected"));

const rooms = [

{
name:"Deluxe King Room",
type:"Deluxe",
price:3200,
capacity:2,
description:"Spacious deluxe room with king size bed and city view.",
image:"https://images.unsplash.com/photo-1566665797739-1674de7a421a",
amenities:["WiFi","AC","TV","Mini Bar"],
isAvailable:true
},

{
name:"Luxury Suite",
type:"Suite",
price:6500,
capacity:4,
description:"Luxury suite with living area and premium facilities.",
image:"https://images.unsplash.com/photo-1590490360182-c33d57733427",
amenities:["WiFi","AC","TV","Jacuzzi","Mini Bar"],
isAvailable:true
},

{
name:"Standard Single Room",
type:"Standard",
price:1800,
capacity:1,
description:"Affordable room for solo travellers.",
image:"https://images.unsplash.com/photo-1618773928121-c32242e63f39",
amenities:["WiFi","AC","TV"],
isAvailable:true
},

{
name:"Premium Double Room",
type:"Premium",
price:4200,
capacity:2,
description:"Premium room with balcony and sea view.",
image:"https://images.unsplash.com/photo-1582719478250-c89cae4dc85b",
amenities:["WiFi","AC","TV","Balcony"],
isAvailable:true
},

{
name:"Family Room",
type:"Family",
price:4800,
capacity:5,
description:"Large family room perfect for group stay.",
image:"https://images.unsplash.com/photo-1611892440504-42a792e24d32",
amenities:["WiFi","AC","TV","Extra Beds"],
isAvailable:true
}

];



/* AUTO GENERATE MORE ROOMS */

for(let i=6;i<=25;i++){

rooms.push({

name:`Luxury Room ${i}`,

type:"Deluxe",

price:2500 + (i*100),

capacity:2,

description:"Modern luxury room with stylish interior and comfortable bedding.",

image:"https://images.unsplash.com/photo-1618773928121-c32242e63f39",

amenities:["WiFi","AC","TV","Room Service"],

isAvailable:true

})

}



async function seedRooms(){

await Room.deleteMany();

await Room.insertMany(rooms);

console.log("25 Rooms Seeded Successfully");

process.exit();

}

seedRooms();