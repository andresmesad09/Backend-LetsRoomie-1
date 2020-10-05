const express = require('express');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');
const config = require('../config');
const response = require('../network/response');
/**
 * express.Router() creates modular, mountable route handlers
 * A Router instance is a complete middleware and routing system; for this reason, it is often referred to as a “mini-app”.
 */
const router = express.Router();
/**
 * PROFILE IMAGE STORING STARTS
 */
const s3 = new aws.S3({
  accessKeyId: config.awsAccessKeyId,
  secretAccessKey: config.awsSecretKey,
  Bucket: 'letsroomie',
  region: 'us-east-2'
});
/**
 * Single Upload
 */
const profileImgUpload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'letsroomie',
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          '-' +
          Date.now() +
          path.extname(file.originalname)
      );
    },
  }),
  limits: {fileSize: 2000000}, // In bytes: 2000000 bytes = 2 MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single('file');
/**
 * Check File Type
 * @param file
 * @param cb
 * @return {*}
 */
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}
/**
 * @route POST api/profile/avatarUpload
 * @desc Upload post image
 * @access public
 */
router.post('/avatarUpload', (req, res) => {
  profileImgUpload(req, res, (error) => {
    if (error) {
      console.log('errors', error);
      res.json({error: error});
    } else {
      // If File not found
      if (req.file === undefined) {
        const details = 'No File Selected!'
        response.error(req, res, "No file selected", 500, details)
      } else {
        // If Success
        const imageName = req.file.originalname;
        const imageLocation = req.file.location;
        console.log(`[AWS service]: image ${imageName} created in the s3 bucket`)
        response.success(req, res, {location: imageLocation}, 201);
      }
    }
  });
});
// End of single profile upload
/**
 * BUSINESS GALLERY IMAGES
 * MULTIPLE FILE UPLOADS
 */
// Multiple File Uploads ( max 8 )
const uploadsBusinessGallery = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'letsroomie',
    acl: 'public-read',
    key: function (req, file, cb) {
      cb(
        null,
        path.basename(file.originalname, path.extname(file.originalname)) +
          '-' +
          Date.now() +
          path.extname(file.originalname)
      );
    },
  }),
  limits: {fileSize: 2000000}, // In bytes: 2000000 bytes = 2 MB
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).array('galleryImage', 8);
/**
 * @route POST /api/profile/business-gallery-upload
 * @desc Upload business Gallery images
 * @access public
 */
router.post('/multipleUpload', (req, res) => {
  uploadsBusinessGallery(req, res, (error) => {
    // console.log('files', req.files);
    if (error) {
      console.log('errors', error);
      response.error(req, res, "Unexpected error", 500, error);
    } else {
      // If File not found
      if (req.files === undefined) {
        console.log('Error: No File Selected!');
        response.error(req, res, "No files selected", 500, "No file selected");
      } else {
        // If Success
        let fileArray = req.files,
          fileLocation;
        const galleryImgLocationArray = [];
        for (let i = 0; i < fileArray.length; i++) {
          fileLocation = fileArray[i].location;
          galleryImgLocationArray.push(fileLocation);
        }
        console.log('[AWS] locations:' + galleryImgLocationArray)
        response.success(req, res, galleryImgLocationArray, 201);
      }
    }
  });
});
// We export the router so that the server.js file can pick it up
module.exports = router;
