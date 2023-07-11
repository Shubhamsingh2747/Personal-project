import express from 'express';
import auth from '../middleware/auth.js';
import { createPost, getAllPosts, getUniquePost, getSearch, deletePost, likePost, commentPost } from '../controllers/posts.js';

const router = express.Router();

router.post('/',auth, createPost);
router.get('/', getAllPosts);
router.get('/:id', getUniquePost);
router.get('/search', getSearch);
router.delete('/delete', deletePost);
router.patch('/:id/likePost', likePost);
router.post('/:id/comments', commentPost);


export default router;