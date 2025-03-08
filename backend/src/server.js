const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const caseRoutes = require('./routes/caseRoutes');
const authRoutes = require('./routes/authRoutes');
const connectDb = require('./config/connectDb');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;


app.use(express.json());
app.use(cors());
connectDb();

app.get('/', (req, res) => { 
    res.send("API is running");
}); 

app.use('/api/cases', caseRoutes)

app.use('/api/auth', authRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`); 
});
