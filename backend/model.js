import mongoose from "mongoose";

const formDataSchema = new mongoose.Schema({
    name: String,
    phoneNumber: String,
    email: {
        type: String,
        unique: true
    },
    hobbies: String,
});

const FormData = mongoose.model('FormData', formDataSchema);

export default FormData;