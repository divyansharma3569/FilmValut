const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();


router.get('/', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId);

        if (!user) return res.status(404).json([]);
        res.json(user.watchlist || []); 
    } catch (err) {
        console.error('Error fetching watchlist:', err);
        res.status(500).json([]);
    }
});

//  Add movie to watchlist
router.post('/add', authMiddleware, async (req, res) => {
    const { movie } = req.body;

    if (!movie || !movie.id) {
        return res.status(400).json({ message: 'Invalid movie data' });
    }

    try {
        const user = await User.findById(req.userId);

        const exists = user.watchlist.some((m) => m.id === movie.id);
        if (!exists) {
            user.watchlist.push(movie);
            await user.save(); 
        }

        res.json({ message: 'Movie added to watchlist', watchlist: user.watchlist });
    } catch (err) {
        console.error('Add Movie Error:', err);
        res.status(500).json({ message: 'Failed to add movie' });
    }
});


// Remove movie from watchlist
router.post('/remove', authMiddleware, async (req, res) => {
    const { movieId } = req.body;

    if (!movieId) {
        return res.status(400).json({ message: 'Movie ID is required' });
    }

    try {
        const user = await User.findById(req.userId);
        user.watchlist = user.watchlist.filter((m) => m.id !== movieId);
        await user.save();

        res.json({ message: 'Movie removed', watchlist: user.watchlist });
    } catch (err) {
        console.error('Remove Movie Error:', err);
        res.status(500).json({ message: 'Failed to remove movie' });
    }
});

module.exports = router;
