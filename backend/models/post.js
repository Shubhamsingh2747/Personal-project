import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    creator: {
        type: String,
        require: true
    },
    creatorEmail: { type: String, required: true },
    heading: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    },
    createdAt : {
        type: Date,
        default: new Date()
    },
    // selectedFile: String,
    likes : {
        type: [String],
        default: [],
    },
    comments : {
        type: [{
            comment : String,
            commentor : String
             }],
        default: [],
    }
});

const Postbody = mongoose.model('Postbody', postSchema);
export default Postbody;
