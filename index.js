require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const ConnectDB = require('./controller/connect');

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(cookieParser());

ConnectDB();


app.get('/',(req,res)=>{
    res.json({msg:'Hi I am here!'})
})



// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const verifyRoutes = require('./routes/verify');
const eventRoutes = require('./routes/event')

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/verify', verifyRoutes);
app.use('/api/events', eventRoutes);

const PORT = process.env.PORT || 3001;
const start = async () => {
    try {
        // await ConnectDB();
        app.listen(PORT, () => {
            console.log("Server is running on port", PORT);
        });
    } catch (err) {
        console.log(err);
    }
};

start();
