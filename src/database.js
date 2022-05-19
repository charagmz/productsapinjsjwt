import mongoose from "mongoose";

mongoose.connect("mongodb://localhost/productsapi", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('Db is connected'))
    .catch(error => console.log(error));