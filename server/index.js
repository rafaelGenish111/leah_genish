const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(express.json())
app.use(cors())

app.use('/user', require('./routes/user'))
app.use('/declerations', require('./routes/declerations'))

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const port = process.env.PORT || 7070
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})