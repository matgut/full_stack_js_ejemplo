if(process.env.NODE_ENV === 'development'){
    require('dotenv').config();
}

const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

//init
const app = express();
require('./database');

//settings
app.set('port',process.env.PORT || 3000);


//midlewares
app.use(morgan('dev'));
const storage = multer.diskStorage({
    destination: path.join(__dirname,'public/uploads'),
    filename(req,file,cb){
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
})
app.use(multer({storage}).single('image'));
app.use(express.urlencoded({extended: false})); //interpretamos los datos del formulario como json
app.use(express.json()); //entender json
app.use(cors());//permite comunicar 2 servidores

//routes
app.use('/api/books', require('./routes/books'));



//static files
app.use(express.static(path.join(__dirname,'public')))

//start server
app.listen(app.get('port'), () =>{
    console.log('server on port ', app.get('port'));
})