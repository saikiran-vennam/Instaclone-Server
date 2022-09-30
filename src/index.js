const mongoose = require('mongoose');
const port = 5000
const app = require('./app');
require('dotenv').config()
mongoose.connect('mongodb+srv://saikiran:saikiranvennam@cluster1.q9bry8o.mongodb.net/test', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });

mongoose.connection.once('open', () =>{
    console.log('connection established')
}).on('connectionError',(err) =>{
    console.log(err);
})

app.listen(process.env.PORT || port, () => console.log(`App listening on port ${port}!`));