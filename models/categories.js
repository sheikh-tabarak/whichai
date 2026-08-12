import { Schema, model, models } from "mongoose";

const CategorySchema = Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  icon: {
    default: "",
    type: String,
  },
  description: {
    type: String,
  },
});

CategorySchema.pre('validate', function (next) {
  if (this.name && !this.slug) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  }
  next();
});

const categories = models.categories || model("categories", CategorySchema);

export default categories;