import mongoose from 'mongoose';
import Postbody from "../models/post.js";

export const createPost = async (req, res) => {
    const { name, creator, creatorEmail, heading, body } = req.body;
    const newPost = new Postbody({ name, creator, creatorEmail, heading, body, createdAt: new Date().toISOString() })

    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getAllPosts = async (req, res) => {
    var curr = new Date; 
    var first = curr.getDate() - curr.getDay(); 
    var last = first + 6; 

    var startDate = new Date(curr.setDate(first)).toISOString();
    var endDate = new Date(curr.setDate(last)).toISOString();

    try {
        const posts = await Postbody.find({
            // createdAt: {
            //     $gte: new Date(new Date(startDate)),
            //     $lt: new Date(new Date(endDate))
            // }
        }).sort({createdAt:-1});
        res.json({posts});
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUniquePost = async (req,res) => {

    const { id } = req.params;
    const uniqueId = id.slice(1);
     try {
         const post = await Postbody.findById(uniqueId);
         res.json({post});
     } catch (error) {
         res.status(404).json({ message: error.message });
     }
}

export const getSearch = async (req, res) => {
    // const { searchQuery } = req.params;
    // console.log(searchQuery);
    console.log("reached server search");
    // try {
    //     const heading = new RegExp(searchQuery, "i");
    //     const posts = await PostMessage.find({ heading });

    //     res.json({ data: posts });
    // } catch (error) {    
    //     res.status(404).json({ message: error.message });
    // }
}

export const deletePost = async (req, res) => {

    const id = req.query.id;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post found');

    await Postbody.findByIdAndRemove(id);

    res.json({ message: 'Post deleted successfully'});
}

export const likePost = async (req, res) => {

    const { id } = req.params;
    const userId = req.body.params.userId;

    if (!userId) {
        return res.json({ message: "Unauthenticated" });
      }

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);
    
    const post = await Postbody.findById(id);

    const index = post.likes.findIndex((id) => id ===String(userId));

    if (index === -1) {
      post.likes.push(userId);
    } else {
      post.likes = post.likes.filter((id) => id !== String(userId));
    }

    const updatedPost = await Postbody.findByIdAndUpdate(id, post, { new: true });

    res.status(200).json(updatedPost);
}

export const commentPost = async(req,res) => {
    const { id } = req.params;
    const postId = id.slice(1);
    const { comment, commentor } = req.body;
    
    const post = await Postbody.findById(postId);
    post.comments.push({comment: comment, commentor: commentor});

    const updatedPost = await Postbody.findByIdAndUpdate(postId, post, { new: true });
    res.json(updatedPost);
}