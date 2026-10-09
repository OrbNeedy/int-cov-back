import commentModel from "../models/CommentModel.js";

const addComment = async (req, res) => {
    try {
        const comment = req.body.newComment;
        // I may need to reconsider this
        comment.admin = false; // On the public side, nobody ever will be admin, this guarantees it
        
        const newComment = new commentModel(comment);
        newComment.createdAt = Date.now();
        await newComment.save();

        res.status(200).json({ Success: "Request successful.", NewComment: newComment });
    } catch (e) {
        console.log(e);
        res.status(500).json({ Error: "An error occurred while posting a comment.", Message: e });
    }
};

// Remember to set a middleware to verify credentials for this one
const addAdminComment = async (req, res) => {
    try {
        const comment = req.body.newComment; 
        comment.admin = true; 
        
        const newComment = new commentModel(comment);
        newComment.createdAt = Date.now();
        await newComment.save();

        res.status(200).json({ Success: "Request successful.", NewComment: newComment });
    } catch (e) {
        console.log(e);
        res.status(500).json({ Error: "An error occurred while posting a comment.", Message: e });
    }
};

const getCommentById = async (req, res) => {
    try {
        const comment = await commentModel.findById(req.params.id);

        res.status(200).json({ Success: "Request successful.", Comment: comment });
    } catch (e) {
        console.log(e);
        res.status(500).json({ Error: "An error occurred while getting a comment.", Message: e });
    }
};

const getAllComments = async (req, res) => {
    try {
        const comments = await commentModel.find({}).sort({ createdAt: -1 });

        res.status(200).json({ Success: "Request successful.", Comments: comments });
    } catch (e) {
        console.log(e);
        res.status(500).json({ Error: "An error occurred while getting comments.", Message: e });
    }
};

const getCommentsByPost = async (req, res) => {
    try {
        const comments = await commentModel.find({ post: req.params.id }).sort({ createdAt: -1 });

        res.status(200).json({ Success: "Request successful.", Comments: comments });
    } catch (e) {
        console.log(e);
        res.status(500).json({ Error: "An error occurred while getting comments.", Message: e });
    }
};

const updateComment = async (req, res) => {
    try {
        const newComment = req.body.newComment;
        const comment = await commentModel.findById(req.params.id);
        const oldComment = comment;
        comment = newComment;

        res.status(200).json({ Success: "Request successful.", OldComment: oldComment });
    } catch (e) {
        console.log(e);
        res.status(500).json({ Error: "An error occurred while updating a comment.", Message: e });
    }
};

const deleteComment = async (req, res) => {
    try {
        const comment = await commentModel.findById(req.params.id);

        await comment.deleteOne();

        res.status(200).json({ Success: "Request successful.", OldComment: comment });
    } catch (e) {
        console.log(e);
        res.status(500).json({ Error: "An error occurred while deleting a comment.", Message: e });
    }
};

export { addComment, addAdminComment, getCommentById, getAllComments, getCommentsByPost, updateComment, deleteComment };