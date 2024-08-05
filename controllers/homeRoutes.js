const router = require('express').Router();
const { Blog, Blogger } = require('../models');
const withAuth = require('../utils/auth');

// Route for homepage
router.get('/', async (req, res) => {
  try {
    res.render('homepage', {
      layout: 'main',
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for all existing blogs
router.get('/blog', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: Blogger,
          attributes: ['name'],
        }
      ],
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render('blog', {
      blogs,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  }
});

// Route for single Pet Sitting request
router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: Blogger,
          attributes: ['name'],
        }
      ],
    });

    const blog = blogData.get({ plain: true });

    res.render('singleblog', {
      ...blog,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
})
//Route for displaying all bloggers
router.get('/bloggers', async (req, res) => {
  try {
    const bloggerData = await Blogger.findAll();

    const bloggers = bloggerData.map((blogger) => blogger.get({ plain: true }));

    res.render('bloggers', {
      bloggers,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route for creating a new blog
router.get('/create', async (req, res) => {
  // If the user is not logged in, redirect the request to login route
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }

  const bloggerData = await Blogger.findByPk(req.session.blogger_id);

  const blogger = bloggerData.get({ plain: true });

  res.render('createrequest', { ...blogger, logged_in: true });
});

router.get('/login', (req, res) => {
  // If the blogger is already logged in, redirect the request to request route
  if (req.session.logged_in) {
    res.redirect('/request');
    return;
  }
  res.render('login');
});

module.exports = router;