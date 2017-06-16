const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  cuid: { type: "String", required: true },
  user_id: { type: "String", required: true },
  firstName: { type: "String", required: true },
  lastName: { type: "String", required: true },
  phone: { type: "String", required: true },
  email: { type: "String", required: true },
  address1: { type: "String", required: true },
  address2: { type: "String"},
  city: { type: "String", required: true },
  state: { type: "String", required: true },
  zipcode: { type: "String", required: true },
  location: {
    type: {
      type: String,
      default: "Point"
    },
    coordinates: [
      {
        type: Number
      }
    ],
    address: {
      type: String
    }
  },
  created_at: { type: "Date", default: Date.now, required: true },
  updated_at: { type: "Date", default: Date.now, required: true }
});

// on every save, add the date
OrderSchema.pre("save", function(next) {
  // get the current date
  var currentDate = new Date();

  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at) this.created_at = currentDate;

  next();
});

// create the model for post and expose it to our app
module.exports = mongoose.model("Order", OrderSchema);
