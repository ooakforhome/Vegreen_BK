var assert = require('assert'),
    path = require('path'),
    Grid = require('gridfs-stream'),
    fs = require('fs'),
    mongodb = require('mongodb'),
    mongoose = require('mongoose'),
    User = require('../../models/user'),
    mediaUri = 'mongodb://localhost:27017/Vegreen',
    userUri = 'mongodb://localhost:27017/Vegreen-auth';

module.exports = {


    writeFile: function (file, userId, fileType, fileInfo, res) {
        var fileId;
        var fileTitle = file.originalFilename;
        var conn = mongoose.createConnection('mongodb://localhost:27017/Vegreen', (error) => {
            if (error) {
                console.error('Error connecting to mongod media instance'.red);
                process.exit(1);
            } else {
                console.info('Connected successfully to mongod media instance in the write file!'.blue);
            }
        });
        // The following line is designating a file to grab/read, and save into mongo
        //  in our case it will be something from ng-file-upload that the user wants to upload
        var myFile = file.path;

        // Connect gridFs and mongo
        Grid.mongo = mongoose.mongo;

        conn.once('open', function () {
            console.log('connection open, ready for I/O!');
            var gfs = Grid(conn.db);

            // This write stream is how well write to mongo
            var writeStream = gfs.createWriteStream({
                // Name the file the way you want it stored in mongo
                filename: file.originalFilename,
                type: fileType,
                info: fileInfo
            });

            // Create a read stream, so that we can read its data, and then with that well use the
            //  write stream to write to the DB via piping the writestream
            var readStream = fs.createReadStream(myFile)
                .on('end', () => {
                    writeToUserDb(userId, fileType, readStream.id, fileInfo, fileTitle);
                    res.status(200).send(
                        {
                            ref: readStream.id,
                            type: fileType,
                            user: userId,
                            mediaInfo: fileInfo,
                            title: fileTitle
                        }
                    );
                })
                .on('error', () => {
                    res.status(500).send('error in writing with gridfs');
                })
                .pipe(writeStream);
            writeStream.on('close', function (file) {
                console.log(file.filename + 'written to DB');
                fs.unlink(myFile);
                myFile = null;
                conn.close();
            });
        });

        function writeToUserDb(uid, type, fileId, authInfo, title) {
            console.info('called to write to user db without a \'this\' reference');
            var userConn = mongoose.createConnection('mongodb://localhost:27017/Vegreen-auth', (error) => {
                if (error) {
                    console.error('Error connecting to the mean-auth instance'.red);
                    process.exit(1);
                } else {
                    User.findById(uid, (err, doc) => {
                        if (err) {
                            console.error('Error finding user with id: ', uid);
                            process.exit(1);
                        } else {
                            console.log('original doc: ', doc);
                            doc.addMedia(type, fileId, authInfo, title);
                            doc.save();
                            console.log('new doc: ', doc);
                        }
                    })
                }
            });
            userConn.close();
        }
    },

    downloadFile: function (userId, file, fileType, objId, location, res) {
        console.info('called to download file');
        var id = new mongodb.ObjectID(objId);
        var conn = mongoose.createConnection(mediaUri, (error) => {
            assert.ifError(error);

            var gfs = Grid(conn.db, mongoose.mongo);

            gfs.findOne({_id: id}, (err, result) => {
                if (err) {
                    res.status(400).send(err);
                } else if (!result) {
                    res.status(404).send('Error finding file')
                } else {
                    res.set('Content-Type', result.contentType);
                    res.set('Content-Disposition', 'attachment; filename="' + result.filename + '"');
                    var readStream = gfs.createReadStream({
                        _id: id,
                        root: 'resume'
                    });
                    readStream.on('error', (err) => {
                        res.end();
                    });
                    readStream.pipe(res);
                }
            });
        });
        conn.close();
    },

    deleteFile: function ( objId, res) {
        var client = mongodb.MongoClient;
        var id = new mongodb.ObjectID(objId);

        console.log('object id to find is: ', id);
        client.connect('mongodb://localhost:27017/Vegreen', (err, db) => {
            db.collection('fs.files', {}, (err, files) => {
                files.remove({_id: id}, (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(500);
                    }
                    console.log(result);
                });
            });
            db.collection('fs.chunks', {}, (err, chunks) => {
                chunks.removeMany({files_id: id}, (err, result) => {
                    if (err) {
                        console.log(err);
                        res.status(500);
                    }
                    console.log(result);
                });
            });
            db.close();
        });
        res.status(200).send({ ref: id});
    },

    getAll: function (req, res) {
        var uid = req.query.id;
        var conn = mongoose.createConnection('mongodb://localhost:27017/Vegreen-auth', (err) => {
            if (err) {
                console.error('Error connecting to mean-auth instance to read all');
                process.exit(1);
            } else {
                User.findById(uid, (err, doc) => {
                    if (err) {
                        console.error('Error finding user with id: ', uid);
                        process.exit(1);
                    } else {
                        if (doc) {
                            console.log('original doc: ', doc);
                            res.status(200).send({media: doc.media});
                        } else {
                            res.status(200);
                        }
                    }
                })
            }
        });
    }
};
