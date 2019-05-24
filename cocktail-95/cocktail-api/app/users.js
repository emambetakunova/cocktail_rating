const express = require('express');
const User = require('../models/User');
const config = require('../config');
const axios = require('axios');

const router = express.Router();

router.delete('/sessions', async (req, res) => {
    const token = req.get('Authorization');
    const success = {message: 'Success'};

    if (!token) {
        return res.send(success);
    }
    const user = await User.findOne({token});

    if (!user) {
        return res.send(success);
    }

    user.generateToken();
    user.save();

    return res.send(success);
});

router.post('/facebookLogin', async (req, res) => {
    const inputToken = req.body.accessToken;
    const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;
    const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;
    try {
        const response = await axios.get(debugTokenUrl);

        if (response.data.data.error) {
            return res.status(401).send({message: 'Facebook token incorrect'});
        }

        if (req.body.id !== response.data.data.user_id) {
            return res.status(401).send({message: 'Wrong user ID'});
        }

        let user = await User.findOne({facebookId: req.body.id});

        if (!user) {
            user = new User({
                facebookId: req.body.id,
                displayName: req.body.name,
                avatar: req.body.picture.data.url
            });
        }

        user.generateToken();
        await user.save();

        return res.send({message: 'Login or register successful', user});
    } catch (error) {
        return res.status(401).send({message: 'Facebook token incorrect'});
    }
});

module.exports = router;