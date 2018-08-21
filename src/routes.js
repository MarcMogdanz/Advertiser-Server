var express = require('express');
var router = express.Router();
var config = require('./config.js');
var adfly = require('adf.ly')(config.adfly.id, config.adfly.publicKey);

// Array for all entries aka tokens
var entries = [];

// Home route to check if the API is working
router.get('/', function(req, res) {
    res.json({ message: 'API is working :)' });
});

// Route to generate a new token and generate a adf.ly url
router.get('/adfly', checkSecret, function(req, res) {
    // Generate a token
    var token = generate_token(32);
    // Put the token as key and false as value into the token array (false means not redeemed yet)
    entries[token] = false;
    // Short the url via adf.ly
    return adfly.short(config.baseURL + 'redeem/' + token, function(url) {
        // Return the adf.ly url and token in a json format
        console.log('Generated new token: ' + token);
        return res.json({ url: url, token: token});
    });
});

// Route to pull all redeemed tokens which are currently in the token/entries array
router.get('/adfly/pull', checkSecret, function(req, res) {
    var tokens = [];
    var newEntriesArray = [];

    // Run through every token
    for(var entry in entries) {
        // Check if the value of the key (token) is true which means this token was redeemed
        if(entries[entry]) {
            // Push the redeemed token to the to be returned array
            tokens.push(entry);
        } else {
            // Push all not redeemed tokens to the newEntriesArray which will override the entries array
            // A 'I don't want to use .slice() so I just push it into a new array and override the old one' workaround
            newEntriesArray[entry] = false;
        }
    }

    // Override the entries array with newEntriesArray, now there are just not redeemed tokens in entries
    entries = newEntriesArray;

    // If there are no redeemed tokens, return null, else return the tokens as json
    if(tokens === undefined || tokens.length == 0) {
        return res.json({ tokens: [null] });
    } else {
        return res.json({ tokens });
    }
});

// Route for the adf.ly shortened links
router.get('/redeem/:token', function(req, res) {
    var token = req.params.token;

    if(entries[token] == null) {
        return res.send('Unknown token.');
    }

    if(entries[token]) {
        return res.send('Token already used.');
    }

    entries[token] = true;
    return res.send('Token redeemed, you can close this page now.');
});


// Middleware to check if the request is authentificated (secret must be the same in node server config and plugin config)
function checkSecret(req, res, next) {
    if(!req.headers.secret || req.headers.secret != config.secret) {
        console.log('Unauthorized API call.');
        return res.sendStatus(401);
    }
    next();
}

// https://stackoverflow.com/a/46874407
function generate_token(length){
    //edit the token allowed characters
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var b = [];
    for (var i=0; i<length; i++) {
        var j = (Math.random() * (a.length-1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}

module.exports = router;
