// declarations
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const exphps = require('express-handlebars');


app.engine('handlebars', exphps({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => { 
    res.render('home', {msg: 'This is going to be a great website!'})
});



app.listen(port, () => {
    console.log('App listening on port 3000!')
})