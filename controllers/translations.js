// translations.js 

const Translation = require('../models/translation.js');

module.exports = function(app) {
    // INDEX
    app.get('/', (req, res) => {
        Translation.find()
            .then(translations => {
                res.render('translations-index', {
                    translations: translations
                });
            })
            .catch(err => {
                console.log(err);
            })
    });

    // NEW 
    app.get('/translations/new', (req, res) => {
        res.render('translations-new')
    });

    // CREATE
    app.post('/translations', (req, res) => {
        Translation.create(req.body).then((translation) => {
            console.log(translation);
            res.redirect(`/translations/${translation._id}`);
        }).catch((err) => {
            console.log(err.message);
        })
    });

    // SHOW
    app.get('/translations/:id', (req, res) => {
        Translation.findById(req.params.id).then((translation) => {
            res.render('translations-show', {
                translation: translation
            })
        }).catch((err) => {
            console.log(err.message);
        })
    });

    // EDIT
    app.get('/translations/:id/edit', (req, res) => {
        Translation.findById(req.params.id, function (err, translation) {
            res.render('translations-edit', {
                translation: translation
            });
        })
    })

    // UPDATE
    app.put('/translations/:id', (req, res) => {
        Translation.findByIdAndUpdate(req.params.id, req.body)
            .then(translation => {
                res.redirect(`/translations/${translation._id}`)
            })
            .catch(err => {
                console.log(err.message)
            })
    })

    // DELETE
    app.delete('/translations/:id', function (req, res) {
        console.log("DELETE Translation")
        Translation.findByIdAndRemove(req.params.id).then((translation) => {
            res.redirect('/');
        }).catch((err) => {
            console.log(err.message);
        })
    });
}