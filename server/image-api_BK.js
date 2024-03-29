const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const express = require('express');
const bodyParser = require('body-parser');
// const router = require('express').Router();
const axios = require('axios');
const mongodb = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const config = require('../../../config/config');
const mongoURI = config.db;
// const conn = mongoose.createConnection(mongoURI);
const conn = mongoose.createConnection(mongoURI);

const client = mongodb.MongoClient;


let gfs;

conn.once('open', ()=> {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
})

const storage = new GridFsStorage({
  url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = file.originalname;
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads',
            metadata: {
              productName: file.originalname.slice(0,-4),
              ownBy: "Vegreen"
            }
          };
          resolve(fileInfo);
        });
      });
    }
});

const upload = multer({ storage }).single('file');

module.exports = (app) => {

// Upload images
app.post('/api/upload', upload, (req, res)=>{
    console.log("<<=======================>>");
    console.log(req.file)
    console.log("<<=======================>>");
    console.log(req.file.filename)
});


// Get single image
app.get('/api/image/:filename', (req, res) =>{
  gfs.files.findOne({filename: req.params.filename}, (err, file) => {
    if(!file || file.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      });
    }
    // Check if image
    if(file.contentType === 'image/png' || file.contentType === 'image/jpeg' || file.contentType === 'image/gif'){
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
      } else {
      res.status(404).json({
        err: 'Not an image'
      })
    }
  })
});

// Get all files
app.get('/api/afiles', (req, res) =>{
  gfs.files.find().toArray((err, files)=>{
    // Check if files
    if(!files || files.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      });
    }
    //Files exist
    return res.json(files);
  });
});


// get all chunks
// Not working
app.get('/api/aafiles', (req, res) =>{
  gfs.chunks.find().toArray((err, chunks)=>{
    // Check if chunks
    if(!chunks || chunks.length === 0) {
      return res.status(404).json({
        err: 'No chunks exist'
      });
    }
    //Files exist
    return res.json(chunks);
  });
});



// delete one by ID
// working
app.delete('/api/findinfo/:objid', (req, res)=>{
  gfs.files.deleteOne({_id: new mongodb.ObjectID(req.params.objid)}, (err, file) => {
    return res.json(file);
  })
});

// Find one by ID
//workding
app.get('/api/findinfo/:objid', (req, res)=>{
  gfs.files.findOne({_id: new mongodb.ObjectID(req.params.objid)}, (err, file) => {
    console.log("<================== some info ========================>")
    return res.json(file);
  })
});

// Delete a file
app.delete('/api/delete/:filename', (req, res) =>{
  gfs.files.findOne({filename: req.params.filename}, (err, file) => {
    if(!file || file.length === 0) {
      return res.status(404).json({
        err: 'No files exist'
      });
    } else {
      gfs.files.deleteOne({filename: req.params.filename}, (info) => {
        console.log("deteled")
        console.log(res.json({info: "delete complete"}))
      })
    }
  })
});



}; //end module
              srcSet={picture+' 1x, '+picture2+' 2x, '+picture3 +' 3x'}
