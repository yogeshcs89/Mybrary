const express = require('express');
const router = express.Router();

const Author = require('../models/author');

// All Authors Route
router.get('/', async (req, res) => {
  let searchOptions = {};
  console.log(req.query.name);
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i');
  }
  try {
    console.log('searchOptions', searchOptions);
    const authors = await Author.find(searchOptions);
    console.log('all authors', authors);
    res.render('authors/index', { authors: authors, searchOptions: req.query });
  } catch {
    res.redirect('/');
  }
});

// New Author Route
router.get('/new', (req, res) => {
  res.render('authors/new', { author: new Author() });
});

// Create Author Route
router.post('/', async (req, res) => {
  const author = new Author({
    name: req.body.name
  });

  try {
    const newAuthor = await author.save();
    //res.redirect(`authors/${newAuthor.id}`);
    res.redirect('authors');
  } catch {
    res.render('authors/new', {
      author: author,
      errorMessage: 'Error creating Author'
    });
  }
});

module.exports = router;
