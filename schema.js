const Joi = require("joi");
const review = require("./models/review");

const listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required().messages({
            "string.empty": "Title is required.",
        }),
        description: Joi.string().required().messages({
            "string.empty": "Description is required.",
        }),
        location: Joi.string().required().messages({
            "string.empty": "Location is required.",
        }),
        country: Joi.string().required().messages({
            "string.empty": "Country is required.",
        }),
        price: Joi.number().min(0).required().messages({
            "number.base": "Price must be a number.",
            "number.min": "Price cannot be negative.",
            "any.required": "Price is required.",
        }),
    }).required()
});

const reviewSchema = Joi.object({
  review: Joi.object({
    rating: Joi.number().required(),
    comment: Joi.string().required()
  }).required()
});

