const express = require('express');
const app = express();

// Settings //
app.set('appName', 'Proyecto JAP');
app.set('port', 3000);


// Port //
app.listen(app.get('port'), ()=>{
    console.log('server on port ', app.get('port'));
    console.log(app.get('appName'));
});

app.use(express.static('public'));
