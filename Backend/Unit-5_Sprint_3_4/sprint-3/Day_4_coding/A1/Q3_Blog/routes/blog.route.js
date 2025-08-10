const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const { testRoute, addNewBlog, getBlogs, updateBlog, deleteBlog, stats } = require("../controllers/blog.controller");
const BlogModel = require("../models/blog.model");

const blogRouter = express.Router();

// Test route
blogRouter.get("/protected", authMiddleware,testRoute);

// Add Blog
blogRouter.post("/", authMiddleware, addNewBlog);

// Get Blog
blogRouter.get("/", authMiddleware,getBlogs);

// Update Blog
blogRouter.put("/:id", authMiddleware,updateBlog);

// Delete Blog
blogRouter.delete("/:id",authMiddleware,deleteBlog);

// Aggregation Route (Analytics)
blogRouter.get('/stats',authMiddleware,stats)


module.exports = blogRouter;
