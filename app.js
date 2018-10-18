// declarations
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: true }));
// connecting the app with data base and save them in 
// mongoose ODM
mongoose.connect('mongodb://localhost/single-page');


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
        res.redirect('/');
    }).catch((err) => {
        console.log(err.message);
    })
});



app.listen(port, () => {
    console.log('App listening on port 3000!')
})