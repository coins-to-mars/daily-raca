const { Schema, model } = require("mongoose");

const itemSchema = new Schema(
  {
    name: { type: String, required: true },
    price: {type: String},
    imageUrl: {type: String}
  },
  { timestamps: true }
);

const Item = model("Item", itemSchema);

module.exports = Item;