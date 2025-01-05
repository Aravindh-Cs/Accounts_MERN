const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://todo:todopassword@cluster0.zlqeu.mongodb.net/eventDetailsone?retryWrites=true&w=majority')
.then(()=>console.log("connected"))
.catch(()=>console.log("not connected"))

const eventSchema = new mongoose.Schema({
    sl:{type: Number,required:true},
    date: { type: Date, required: true },
    event: { type: String, required: true },
    billno: { type: String, required: true },
    particulars: { type: String, required: true },
    givento: { type: String, required: true },
    expense: { type: Number, required: true },
  });
const eventName =async({sl,date,event,bill,particular,givento,expense})=>{
    const cname = mongoose.model(event,eventSchema,event)
    const newdata=new cname({sl:sl,date:date,event:event,billno:bill,particulars:particular,givento:givento,expense:expense})
    await newdata.save()
    .then(()=>console.log("saved"))
    .catch(()=>console.log("not saved"))
    
}
const getCollection = async()=>{
    const db = mongoose.connection
    db.once('open',()=>{
        console.log("opened")
    })
    const collections = await db.db.listCollections().toArray();
    const collection = collections.map((list,indx)=>{
        return list.name
    })
    return collection
}
const getTotal = async(eventname)=>{
    const cname = mongoose.model(eventname,eventSchema,eventname)
    try{
        const totalamt = await cname.aggregate([{
        $group:{
            _id:null,
            total:{$sum:'$expense'}
        }
    }])
    const total =  totalamt.length > 0 ? totalamt[0].total : 0;
    console.log("total:",total)
    return total
    }
    catch{
        const err = "0"
        console.log(err)
        return err
    }
}
module.exports = {eventName,getCollection,getTotal}