// declarations

const express = require('express');
const app = express();
const translations = require('./controllers/translations.js');
const port = process.env.PORT || 3000;
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override')



app.use(bodyParser.urlencoded({ extended: true }));
// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

// Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');



// connecting the app with data base and save them in 
// mongoose ODM
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/single-page', {
    useNewUrlParser: true
});


translations(app);

app.listen(port, () => {
    console.log('App listening on port 3000!')
})
module.exports = app;