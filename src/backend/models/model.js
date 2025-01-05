const mongoose = require('mongoose')

//collection for add amount form
const amt = mongoose.Schema(
    {
        date:{
            type: Date,
            required: true,
        },
        givenby:{
            type: String,
            required: true,
        },
        amount:{
           type: Number,
           required: true,
        } 
    })

//collection for eventwhole form
const eventwh = mongoose.Schema(
    {
        date:{
            type: Date,
            required: true,
        },
        eventname:{
            type: String,
            required: true,
        },
        resourceperson:{
            type: String,
            required: true,
        },
        venue:{
            type: String,
            required: true,
        },
        expense:{
           type: Number,
           required: true,
        } 
    })

//collection for bill form
const bill = mongoose.Schema(
    {
        sl:{
            type:Number,
            required: true,
        },
        date:{
            type: Date,
            required: true,
        },
        billno:{
            type: String,
            required: true,
            unique:true
        },
        particulars:{
            type: String,
            required: true,
        },
        expense:{
           type: Number,
           required: true,
        } 
    })

const mlogin = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const tlogin = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    reg:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
    
const db1 = mongoose.createConnection('mongodb+srv://todo:todopassword@cluster0.zlqeu.mongodb.net/eventsDBone?retryWrites=true&w=majority')
const db2 = mongoose.createConnection('mongodb+srv://todo:todopassword@cluster0.zlqeu.mongodb.net/logindata?retryWrites=true&w=majority&appName=Cluster0')
const amounts = db1.model('sanctions',amt)
const memberlogin = db2.model('member',mlogin)
const treasurerlogin = db2.model('treasurers',tlogin)
const eventwhole = db1.model('eventwhole',eventwh)
const bills = db1.model('bills',bill)

module.exports = {db1,amounts,eventwhole,bills,memberlogin,treasurerlogin}