// // // const express = require('express')
// // // const app = express()
// // // const mongoose = require('mongoose')

// // // app.listen(3001,()=>
// // // {
// // //     console.log("started")
// // // })

// // // app.get('/',(req,res)=>{
// // // res.send('hi')
// // // })

// // // mongoose.connect('mongodb+srv://todo:todopassword@cluster0.zlqeu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
// // //     .then(()=>{console.log('connected')})
// // //     .catch(()=>{console.log('err')})

// // // const eventwschema = mongoose.Schema({
// // //     date: Date,
// // //     eventname: String,
// // //     resource: String,
// // //     venue: String,
// // //     expense: Number
// // // })    

// // // const eventwmodel = mongoose.model('allevent',eventwschema)

// // // app.post('/eventwhole',async(req,res)=>
// // // {
// // //     const {date,eventname,resource,venue,expense} = req.body;
// // //     try{
// // //         const newdata = new eventwmodel({date,eventname,resource,venue,expense})
// // //         await newdata.save()
// // //         console.log(req.body)
// // //         alert("saved")
// // //     }
// // //     catch{
// // //         res.status(500).json({ message: 'Error adding data', error: err });
// // //     }
// // // })
// // const express = require('express');
// // const mongoose = require('mongoose');
// // const cors = require('cors'); // Import cors

// // const app = express();

// // // Middleware to enable CORS and parse JSON
// // app.use(cors());
// // app.use(express.json());

// // const PORT = 3001;

// // // Connect to MongoDB
// // mongoose
// //   .connect('mongodb+srv://todo:todopassword@cluster0.zlqeu.mongodb.net/eventsDB?retryWrites=true&w=majority')
// //   .then(() => {
// //     console.log('Connected to MongoDB');
// //   })
// //   .catch((err) => {
// //     console.error('Error connecting to MongoDB:', err);
// //   });

// // // Schema and Model
// // const eventSchema = mongoose.Schema({
// //   date: Date,
// //   eventname: String,
// //   resource: String,
// //   venue: String,
// //   expense: Number,
// // });

// // const Event = mongoose.model('Event', eventSchema);

// // // Routes
// // app.get('/', (req, res) => {
// //   res.send('Hello from the server!');
// // });

// // //adding whole event accounts
// // app.post('/eventwhole', async (req, res) => {
// //   const { date, eventname, resource, venue, expense } = req.body;
// //   try {
// //     const newEvent = new Event({ date, eventname, resource, venue, expense });
// //     await newEvent.save();
// //     res.status(201).json({ message: 'Event added successfully' });
// //   } catch (err) {
// //     console.error('Error saving event:', err);
// //     res.status(500).json({ message: 'Error adding data', error: err });
// //   }
// // });

// // //calculate total of all eventwhole expense
// // app.get('/eventwholetotal',async(req,res)=>
// // {
// //   try{
// //     const totalexp = await Event.aggregate([{
// //       $group:{
// //         _id:null,
// //         total:{$sum:'$expense'}
// //       }
// //     }])
// //     const total = totalexp.length > 0 ?totalexp[0].total :0;
// //     res.status(200).json({total})
// //   }
// //   catch(err){
// //     res.status(500).json({message:'no data',error:err})
// //   }
// // })

// // // Start Server
// // app.listen(PORT, () => {
// //   console.log(`Server started on port ${PORT}`);
// // });

// const even =  mongoose.Schema(
//   {
//       date:{
//           type: Date,
//           required: true,
//       },
//       eventname:{
//           type: String,
//           required: true,
//       },
//       particulars:{
//           type: String,
//           required: true,
//       },
//       givento:{
//           type: String,
//           required: true,
//       },
//       expense:{
//          type: Number,
//          required: true,
//       } 
//   })
//   const collectionname ='';
//   const eventwise = mongoose.model(collectionname,eventw)