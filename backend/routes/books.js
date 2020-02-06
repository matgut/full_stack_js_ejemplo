const  { Router }= require('express');
const router = Router();
const Book = require('../models/Book');
const fs = require('fs-extra');
const path = require('path')

router.get('/', async (req, resp) => {
    const books = await Book.find();
    resp.json(books);
});

router.post('/', async (req,resp) => {
    const {title,author,isbn} = req.body;
    const imagePath = '/uploads/'+req.file.filename;
    const newBook = new Book({title:title,author:author,isbn:isbn,imagePath});
    await newBook.save();
    resp.json({message: 'Book saved succesfully'});
})

router.delete('/:id', async (req,resp) =>{
    const bookDel = await Book.findByIdAndDelete(req.params.id);
    fs.unlink(path.resolve('./backend/public'+bookDel.imagePath))
    resp.json({message: 'Book deleting succesfully'});
})
module.exports = router;
