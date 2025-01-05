const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const {amounts,eventwhole,bills} = require('./models/model')

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://todo:todopassword@cluster0.zlqeu.mongodb.net/eventsDB?retryWrites=true&w=majority')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });

// Route for adding amount
app.post('/addform', async (req, res) => {
  const { date, givenby, amount } = req.body;
  console.log('Request received:', { date, givenby,amount}); 
  const ft = parseFloat(amount).toFixed(2)
  try {
    const newAmount = new amounts({ date, givenby, amount:ft});
    await newAmount.save();
    
    res.status(200).json({ message: 'Amount added successfully' });
  } catch (err) {
    console.log('Error adding amount:', err);
    res.status(500).json({ message: 'Amount cannot be added', error: err.message });
  }
});

//getting all datas from amount
app.get('/all',async (req,res)=>
{
  try{
    const data = await amounts.find({})
    const datas = data.map((dts)=>({date:dts.date,givenby:dts.givenby,amount:parseFloat(dts.amount).toFixed(2)}))
    res.status(200).json(datas)
  }catch(err){
    res.status(500).json({message:'err in collecting',error:err})
  }
})
// Route to fetch total amount
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

// Start server
app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});

