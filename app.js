// declarations
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');

app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// connecting the app with data base and save them in 
// mongoose ODM
mongoose.connect('mongodb://localhost/single-page');


// MODEL
const Translation = mongoose.model('Translation', {
    word: String,
    trans: String,
    example: String
})

// let translations = [
//     { word: "awesome", trans: "translation", example: "This is example" },
//     {
//         word: "fish",
//         trans: "translation",
//         example: "This is example"
//     }
// ]
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




app.listen(port, () => {
    console.log('App listening on port 3000!')
})