import { Schema, model, models } from "mongoose";

const CategorySchema = Schema({
  name: {
    type: String,
    default:"Default Value"
    // required: true,
  },
  icon: {
    default:"",
    type: String,
  },
  description: {
    type: String,
  },
});

const categories = models.categories || model("categories", CategorySchema);

export default categories;