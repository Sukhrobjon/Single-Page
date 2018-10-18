// declarations

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')


app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));

// connecting the app with data base and save them in 
// mongoose ODM
mongoose.connect('mongodb://localhost/single-page');

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

// MODEL
const Translation = mongoose.model('Translation', {
    word: String,
    trans: String,
    synonym: String
})


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
})

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
        res.render('translations-show', { translation: translation })
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


app.listen(port, () => {
    console.log('App listening on port 3000!')
})