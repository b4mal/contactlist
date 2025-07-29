import { model, models, Schema } from "mongoose";

const ContactSchema = new Schema({
  contName: {
    type: String,
    required: [true, "Contact name is required"],
  },
  contNumber: {
    type: String,
    required: [true, "Contact number is required"],
  },
  tag: {
    type: String,
    required: [true, "Tag is required"],
  },
  userId: {
    type: String,
    required: [true, "User ID is required"],
  },
});

const Contact = models.Contact || model("Contact", ContactSchema);
export default Contact;
