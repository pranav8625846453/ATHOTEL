
// middleware.js
const { listingSchema,reviewSchema} = require("./schema.js");
const ExpressError = require("./public/utils/ExpressError");
const Listing=require("./models/listing");
 const Review =require("./models/review");


module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be signed in first!");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);

  if (!listing.owner._id.equals(req.user._id)) {
    req.flash("error", "You don't have permission");
    return res.redirect(`/listings/${id}`);
  }

  next(); // ✅ Don’t forget to call next() if the user is authorized
};

module.exports.validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    
    throw new ExpressError(400, error.message);
  }
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  const { id, reviewid } = req.params;
  const review = await Review.findById(reviewid);
  const listing = await Listing.findById(id);

  if (!review) {
    req.flash("error", "Review not found.");
    return res.redirect(`/listings/${id}`);
  }

  if (!review.author.equals(req.user._id) && !listing.owner.equals(req.user._id)) {
    req.flash("error", "You don't have permission to do that.");
    return res.redirect(`/listings/${id}`);
  }

  next();
};


