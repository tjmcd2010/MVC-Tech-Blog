const router = require('express').Router();
const { Blog, Owner } = require('../models');
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

// Route to view existing blogs
router.get('/blog', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: Owner,
          attributes: ['ownerName'],
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

// Route to view a single blog
router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: Owner,
          attributes: ['ownerName'],
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

// Route for creating a new blog
router.get('/create', async (req, res) => {
  // If the user is not logged in, redirect the blog owner to login route
  if (!req.session.logged_in) {
    res.redirect('/login');
    return;
  }

  const ownerData = await Owner.findByPk(req.session.owner_id);

  const owner = ownerData.get({ plain: true });

  res.render('createblog', { ...owner, logged_in: true });
});

router.get('/login', (req, res) => {
  // If the blog owner is already logged in, redirect the blog to the blog route
  if (req.session.logged_in) {
    res.redirect('/blog');
    return;
  }
  res.render('login');
});

module.exports = router;