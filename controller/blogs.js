const asyncErrors = require('./errorController');
const Blog = require('../model/Blog');
const User = require('./user');

exports.getAllBlogs = asyncErrors(async (req, res, next) => {
  const blogs = await Blog.find();
  if (!blogs) return next(res.status(404).json({ msg: 'blogs not found' }));
  return (
    res.status(200),
    json({
      status: 'successfull',
      data: blogs,
    })
  );
});

exports.addBlog = asyncErrors(async (req, res, next) => {
  const { title, description, image, user } = req.body;

  const existingUser = await User.findById(user);
  if (!existingUser)
    return next(res.status(400).json({ Msg: 'please sign up to create blog' }));
  if (!title || !description || !image)
    return next(
      res.status(400).json({ msg: 'please input the necessary fields' })
    );
  const blog = new Blog({
    title,
    description,
    image,
    user,
  });
  //add the blog to the user
  const session = await mongoose.startSession();
  session.startTransaction();
  await blog.save({ session });
  existingUser.blogs.push(blog);
  await existingUser.save({ session });
  await session.commitTransaction();
});

exports.updateBlog = asyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const blog = await Blog.findOneAndUpdate(id, {
    title,
    description,
  });
  if (!blog) return next(res.status(500).json({ msg: 'no blog found' }));

  return res.status(200).json({ blog });
});

exports.getBlog = asyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (!blog) return next(res.status(404).json({ msg: 'blog not found' }));

  return res.status(200).json({ blog });
});

exports.deleteBlog = asyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const blog = await Blog.findByIdAndDelete(id).populate('user').exec();
  await blog.user.blogs.pull(blog);
  await blog.user.save();
  if (!blog)
    return next(res.status(500).json({ msg: 'could not delete blog' }));

  return res.status(200).json({ msg: 'blog deleted' });
});

exports.getUserBlogs = asyncErrors(async (req, res, next) => {
  const userId = req.params.id;
  const userBlogs = await User.findById(userId).populate('blogs');
  if (!userBlogs)
    return next(
      res.status(404).json({ msg: 'this user does not have blogs to display' })
    );

  return res.status(200).json({ blogs: userBlogs });
});
