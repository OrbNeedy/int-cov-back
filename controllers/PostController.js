import commentModel from "../models/CommentModel.js";
import postModel from "../models/PostModel.js";

const addPost = async (req, res) => {
    try {
        const newPost = req.body.newPost;
        const post = new postModel(newPost);

        await post.save();

        res.status(200).json({ Success: "Request successful.", NewPost: post });
    } catch (e) {
        console.log(e);
        res.status(500).json({ Error: "An error occurred while adding a post.", Message: e });
    }
};

const getPostById = async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id);

        res.status(200).json({ Success: "Request successful.", Post: post });
    } catch (e) {
        console.log(e);
        res.status(500).json({ Error: "An error occurred while getting a post.", Message: e });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await postModel.find({}).sort({ createdAt: -1 });

        res.status(200).json({ Success: "Request successful.", Posts: posts });
    } catch (e) {
        console.log(e);
        res.status(500).json({ Error: "An error occurred while getting all posts.", Message: e });
    }
};

const getTop = async (req, res) => {
    try {
        const posts = await postModel.find({}).sort({ createdAt: -1 }).limit(5);

        res.status(200).json({ Success: "Request successful.", Posts: posts });
    } catch (e) {
        console.log(e);
        res.status(500).json({ Error: "An error occurred while getting top posts.", Message: e });
    }
};

const updatePost = async (req, res) => {
    try {
        const newPost = req.body.newPost;
        const post = await postModel.findById(req.params.id);
        const oldPost = post;
        post = newPost;

        await post.save();

        res.status(200).json({ Success: "Request successful.", OldPost: oldPost });
    } catch (e) {
        console.log(e);
        res.status(500).json({ Error: "An error occurred while updating a post.", Message: e });
    }
};

const deletePost = async (req, res) => {
    try {
        //console.log(req.params.id);
        const post = await postModel.findById(req.params.id);
        //console.log(post);

        await post.deleteOne();

        await commentModel.deleteMany({ post: req.params.id });

        res.status(200).json({ Success: "Request successful.", OldPost: post });
    } catch (e) {
        console.log(e);
        res.status(500).json({ Error: "An error occurred while deleting a post.", Message: e });
    }
};

export { addPost, getPostById, getAllPosts, getTop, updatePost, deletePost };