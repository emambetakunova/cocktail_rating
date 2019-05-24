const express = require('express');
const multer = require('multer');
const path = require('path');
const config = require('../config');
const nanoid = require('nanoid');
const Cocktail = require('../models/Cocktail');
const User = require('../models/User');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const check = require('../middleware/check');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname));
    }
});

const upload = multer({storage});

const router = express.Router();


router.get('/', check, (req, res) => {
    let criteria = {published: true};
    if (req.user) {
        criteria = {
            $or: [
                {published: true},
                {user: req.user._id}
            ]
        }
    }
    if (req.user && req.user === "admin") {
        criteria = {}
    }
    Cocktail.find(criteria)
        .then(result => {
            if (result) return res.send(result);
            res.sendStatus(404)
        })
        .catch(error => res.status(500).send(error));

});


router.get('/:id', (req, res) => {
    Cocktail.findById(req.params.id)
        .then(result => {
            if (result) return res.send(result);
            res.sendStatus(404)
        })
        .catch(() => res.sendStatus(500));
});


router.post('/', auth, upload.single('image'), async (req, res) => {
    const data = req.body;
    if (req.file) {
        data.image = req.file.filename;
    }
    console.log(data.ingredients);

    const cocktail = await new Cocktail({
        user: req.user._id,
        image: data.image,
        recipe: data.recipe,
        title: data.title
    });
    cocktail.save()
        .then(result => res.send(result))
        .catch(error => res.status(400).send(error));
});

// router.put('/:id/toggle_published', [auth, permit('admin')], async (req, res) => {
//     const cocktail = await Cocktail.findById(req.params.id);
//     if (!cocktail) {
//         return res.sendStatus(404);
//     }
//     cocktail.published = !cocktail.published;
//
//     await cocktail.save()
//         .then(() => res.send({message: 'success'}))
//         .catch(() => res.sendStatus(500).send(error))
// });

router.post('/:id/toggle_published', [auth, permit('admin')], async (req, res) => {
    const cocktail = await Cocktail.findById(req.params.id);
    if (!cocktail) {
        return res.sendStatus(404);
    }
    cocktail.published = !cocktail.published;

    await cocktail.save()
        .then(result => res.send(result))
        .catch(error => res.sendStatus(400).send(error));
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
    await Cocktail.deleteOne({_id: req.params.id});

    res.send('success');
});

router.post('/:id/rating', auth, async (req, res) => {
    const cocktail = await Cocktail.findById(req.params.id);
    const rating = req.body.newRating;
    const ratingObj = { userId: req.user._id, rating: rating };
    cocktail.ratings.push(ratingObj);
    await cocktail.save()
        .then(result => res.send(result))
        .catch(error => res.sendStatus(400).send(error));
});


module.exports = router;