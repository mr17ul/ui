const express = require('express');

const app = express();

app.use(express.static('./dist/rms'));

app.get('/*', function (req, res) {
    res.sendFile('index.html', { root: 'dist/rms/' }
    );
});

app.listen(process.env.PORT || 8080);
