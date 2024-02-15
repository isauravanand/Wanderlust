const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedin, isOwnwer, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});


router.route("/")
.get(wrapAsync(listingController.index))
.post( isLoggedin,upload.single("listing[image]"), validateListing,wrapAsync(listingController.createListing))

//New Route
router.get("/new", isLoggedin, (listingController.renderNewForm));


router.route("/:id")
.get(wrapAsync(listingController.showListing))
.post( isLoggedin, isOwnwer,upload.single("listing[image]"),validateListing, wrapAsync(listingController.updateListing))
.delete( isLoggedin, isOwnwer, wrapAsync(listingController.deleteListing));


//Edit Route
router.get("/:id/edit", isLoggedin, isOwnwer, wrapAsync(listingController.editListing));


module.exports = router;