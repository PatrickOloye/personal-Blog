const express = require('express');

const router = express.router();
const blogController = require('../controller/blogs');

router.get('/allBlogs', blogController.getAllBlogs);
router.post('/addBlog', blogController.addBlog);
router.patch('/updateBlog/:id', blogController.updateBlog);
router.get('/getBlog/:id', blogController.getBlog);
router.delete('/deleteBlog/:id', blogController.deleteBlog);
router.get('/user/:id', blogController.getUserBlogs);

module.exports = router;
