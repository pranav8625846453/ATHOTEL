
const express = require("express");
const router = express.Router();
const wrapAsync = require("../public/utils/wrapAsync");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer=require('multer');
const {storage}=require("../cloudConfig.js");
const upload=multer({storage});

router.route("/")
// Index route
.get( wrapAsync(listingController.index))
// Create route
 .post(isLoggedIn,upload.single('listing[image]') ,wrapAsync(listingController.createListing));

// New route (form)
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
// Show route
.get( wrapAsync(listingController.showListing))
// Update route
 .put( isLoggedIn,upload.single('listing[image]'), isOwner, wrapAsync(listingController.updateListing))
// Delete route
.delete( isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));










// Edit route (form)
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.editListing));



module.exports = router;