const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../public/utils/wrapAsync");
const Listing = require("../models/listing.js");
const Review= require("../models/review.js");
const { isLoggedIn, validateReview, isReviewAuthor } = require("../middleware.js");
const reviewController=require("../controllers/reviews.js");




//review route
//Post routeS
router.post("/",isLoggedIn,
  // validateReview,
 wrapAsync(reviewController.createReview));

//delete review
router.delete("/:reviewid",isLoggedIn,
  isReviewAuthor,wrapAsync(reviewController.deleteReview));

module.exports=router;