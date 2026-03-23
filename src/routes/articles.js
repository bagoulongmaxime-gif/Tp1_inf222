const express = require('express');
const Article = require('../models/article');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { category, author, date } = req.query;
    const where = {};

    if (author) where.author = author;
    if (category) where.category = category;
    if (date) where.date = date;

    const articles = await Article.findAll({ where, order: [['date', 'DESC']] });
    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

router.get('/search', async (req, res) => {
  try {
    const query = req.query.query;
    if (!query) {
      return res.status(400).json({ message: 'Le paramètre query est requis.' });
    }

    const articles = await Article.findAll({
      where: {
        [require('sequelize').Op.or]: [
          { title: { [require('sequelize').Op.like]: `%${query}%` } },
          { content: { [require('sequelize').Op.like]: `%${query}%` } },
        ],
      },
      order: [['date', 'DESC']],
    });

    res.json(articles);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article non trouvé.' });
    res.json(article);
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, content, author, date, category, tags } = req.body;
    if (!title || !content || !author || !category) {
      return res.status(400).json({ message: 'title, content, author et category sont obligatoires.' });
    }

    const article = await Article.create({ title, content, author, date: date || new Date(), category, tags });
    res.status(201).json({ message: 'Article créé', id: article.id, article });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: 'Validation error', errors: error.errors.map(e => e.message) });
    }
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, content, category, tags, author, date } = req.body;
    const article = await Article.findByPk(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article non trouvé.' });

    if (title !== undefined) article.title = title;
    if (content !== undefined) article.content = content;
    if (category !== undefined) article.category = category;
    if (tags !== undefined) article.tags = tags;
    if (author !== undefined) article.author = author;
    if (date !== undefined) article.date = date;

    await article.save();
    res.json({ message: 'Article mis à jour', article });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ message: 'Validation error', errors: error.errors.map(e => e.message) });
    }
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (!article) return res.status(404).json({ message: 'Article non trouvé.' });

    await article.destroy();
    res.json({ message: 'Article supprimé' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error: error.message });
  }
});

module.exports = router;
