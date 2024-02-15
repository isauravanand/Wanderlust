const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const{validateReview, isLoggedin, isReviewAuthor} = require("../middleware.js");
const listingController = require("../controllers/review.js")

//Review Route
router.post("/", isLoggedin,validateReview, wrapAsync(listingController.reviewRoute));

//Delete Review Route
router.delete("/:reviewId",isLoggedin,isReviewAuthor, wrapAsync(listingController.destroyReviewRoute));

module.exports = router;