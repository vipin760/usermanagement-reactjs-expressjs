const mongoose = require('mongoose')

const dbConnect = () => {
    try {
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("database connected");
        });
    } catch (error) { 
        console.log("error", error); 
    }
};

module.exports = dbConnect