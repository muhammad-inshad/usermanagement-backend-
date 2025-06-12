const express=require('express')
const cors=require('cors')
require('dotenv').config();
const db=require('./models/connectmongo')

const adminRoute=require('./router/adminRoute');
const user=require('./router/userRoute')

const app=express()
const PORT=process.env.PORT;

app.use(cors())

app.use(express.json());

app.use('/api',adminRoute)
app.use('/api/user',user)
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});