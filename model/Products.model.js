import mongoose, { Schema, model } from "mongoose";

const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: { type: String, required: true },
    price: {
      type: Number,
      required: true,
      min: [1, " Wrong Price Value !Invalid"],
      max: [100000, " Invalid ! Price"],
    },
    discountPercentage: {
      type: Number,
      required: true,
      min: [1, " Wrong Price Value !Invalid"],
      max: [99, " Invalid ! discountPrice"],
    },
    rating: { type: Number, required: true, min: [0,"wrong min rating"], max: [5,"wrong max rating"], default: 0 },
    stock: { type: Number, required: true,min:[0, "wrong min stock"], default: 0 },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true },
    images: { type: [String], required: true },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const virtual = productSchema.virtual("id");

virtual.get(function () {
  return this._id;
});

productSchema.set("toJSON", {
  virtuals: true,
  versionKey: true,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

export const Product = model("Product", productSchema);
