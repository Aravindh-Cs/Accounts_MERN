const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const excel = require('exceljs')
const bcrypt = require('bcrypt')
const pdf = require('pdfkit')
const {Document,Packer,Paragraph} = require('docx')
const fs = require('fs')
const {amounts,eventwhole,bills,memberlogin, treasurerlogin, db1} = require('./models/model')
const {eventName,getCollection,getTotal} = require('./models/event');
const { data } = require('react-router-dom');
const { Children } = require('react');
const { buffer } = require('stream/consumers');
const app = express();

app.use(cors());
app.use(express.json());

//route for adding amount
app.post('/addform', async (req, res) => {
  const { date, givenby, amount } = req.body;
  const ft = parseFloat(amount).toFixed(2)
  try {
    const newAmount = new amounts({ date, givenby, amount:ft});
    await newAmount.save();
    
    res.status(200).json({ message: 'Amount added successfully' });
  } catch (err) {
    console.log('Error in adding amount:', err);
    res.status(500).json({ message: 'Amount cannot be added', error: err.message });
  }
});

//route to fetch total amount
app.get('/totalamt', async (req, res) => {
  try {
    const totalamt = await amounts.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
        },
      },
    ]);

    const totalAmount = totalamt.length > 0 ? totalamt[0].total : 0;
    res.status(200).json({ totalAmount });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching total amount', error: err });
  }
});

//route for adding the expese of event
app.post('/eventwise', async(req, res) => {
  const {sl,date,event,bill,particular,givento,expense} = req.body;
  try{
   const uinpt = await eventName({sl,date,event,bill,particular,givento,expense})
   res.status(200).json("added succesfully")
  }catch(err){
    res.status(500).json({message:"err",error:err})
  }
});

//route for getting all event collection names
app.get('/collectionname',async (req,res)=>
{
  try{
    const collectionname = await getCollection()
    res.status(200).json(collectionname)
  }
  catch{
    res.status(500).json("can not fetch collection name")
  }
})

//route for getting total for whole event
app.post('/gettotal',async (req,res)=>{
  const {eventname} = req.body
  try{
    const rslt = await getTotal(eventname)
    console.log("rslt",rslt)
    res.status(200).json(rslt)
  }
  catch{
    res.status(500).json({message:"can not be calcullated"})
  }
})

//route for adding datas to bill form
app.post('/billdetails',async (req,res)=>{
  const {sl,date,bill,particular,expense} = req.body
  try{
    const resdts = new bills({sl:sl,date:date,billno:bill,particulars:particular,expense:expense})
    await resdts.save()
    console.log("added bill")
    res.status(200).json("added")
  }
  catch{
    res.status(500).json("error in adding")
  }
})

app.post('/eventwhole',async(req,res)=>{
  const {date,eventname,resource,venue,expense} = req.body
  try{
    const data = new eventwhole({date:date,eventname:eventname,resourceperson:resource,venue:venue,expense:expense})
    await data.save()
    res.status(200).json("data added")
  }
  catch{
    res.status(500).json("data is not added")
  }
})
//

app.post('/mlogin', async (req, res) => {
  const { uname, pwd } = req.body; 
  try {
    const data = await memberlogin.findOne({ username: uname });
    console.log(uname,pwd)
    console.log("data",data)
    if(pwd === data.password)
    {
      res.status(200).json({message:"correct"})
      console.log("pwd is right")
    }else{
      res.status(200).json({message:"wrong"})
      console.log("pwd is wrong")
    }
  } catch (err) {
    res.status(500).json("error in loging");
  }
});

//
app.post('/login',async(req,res)=>{
  const { username, reg, password } = req.body;
  try {
    if(data.username === username && data.reg === reg && data.password === password)
    {
      console.log("correct")
      res.status(200).json({message:"correct"})
    }
    else
    {
      res.status(200).json({message:"wrong"})
    }
  }
  catch{
    res.status(500).json("error in login")
  }
})
//


app.post('/tlogin', async (req, res) => {
  const { username,reg,password } = req.body;

  try {
    const data = await treasurerlogin.findOne({username})
    console.log(data)
    if(!data)
    {
      res.status(200).json({message:"no data found"})
    }
    const valid = await bcrypt.compare(password,data.password)
    if(valid && reg === data.reg)
    {
      res.status(200).json({message:"correct"})
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error" });
  }
});

const getCollectionname = (collection)=>
{
  switch(collection){
    case 'sanctions':
      return amounts;
    case 'eventwhole':
      return eventwhole;  
    case 'bills':
      return bills;
    default:throw new Error("no collection")  
  }
}

//word
app.get('/word/:collection',async(req,res)=>{
  const {collection} = req.params
  const tbl = getCollectionname(collection)
  try{
    const datas = await tbl.find();
    const doc = new Document()
    const para = datas.map(item=>new Paragraph(JSON.stringify(item)))
    doc.addSection({Children:para})
    const fpath  = `./${collection}.docx`
    const buffer = await Packer.toBuffer(doc)
    fs.writeFileSync(fpath,buffer)
    res.download(fpath)
  }catch{
    res.status(500).json("no data")
  }
})

//excel
app.get('/xlsx/:collection',async(req,res)=>
{
  const {collection} = req.params
  const tbl = getCollectionname(collection)

  try{
    const datas = await tbl.find()
    const wbook = new excel.Workbook()
    const wsheet = wbook.addWorksheet('datas')
    const col = Object.keys(tbl.schema.obj)
    wsheet.addRow(col)
    if (collection === 'sanctions') {
      console.log("coll:",collection)
      datas.forEach(dts=>{
        wsheet.addRow([(dts.date).toLocaleDateString('en-US',{
          year:'numeric',month:'2-digit',day:'2-digit'
        }),dts.givenby,dts.amount])
      })
    } else if (collection === 'eventwhole') {
      console.log("coll:",collection)
      datas.forEach((dts)=>{
        wsheet.addRow([(dts.date).toLocaleDateString('en-US',{
          year:'numeric',month:'2-digit',day:'2-digit'
        }),dts.eventname,dts.resourceperson,dts.venue,dts.expense])
      })
    } else if (collection === 'bills') {
      console.log("coll:",collection)
      datas.forEach((dts)=>{
        wsheet.addRow([dts.sl,(dts.date).toLocaleDateString('en-US',{
          year:'numeric',month:'2-digit',day:'2-digit'
        }),dts.billno,dts.particulars,dts.expense])
      })
    } else {
      return res.status(400).json({ message: 'Invalid collection type' });
    }
    const buffer = await wbook.xlsx.writeBuffer()
    res.setHeader('Content-Type', 'application/octet-stream')
    res.setHeader('Content-Disposition', 'attachment; filename=datas.xlsx');
    res.send(buffer)
  }
  catch{
    console.log("can not fetch")
    res.status(500).json("err")
  }
})

//start the server
app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
