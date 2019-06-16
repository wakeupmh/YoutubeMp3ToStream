const fs = require('fs')
 , express = require('express')
 , ytdl = require('ytdl-core')
 , app = express();
app.listen(4000, () => {
    console.log('Server Works !!! At port 4000');
});
app.get('/download', async (req,res) => {
    // var URL = req.query.URL;
    let URL = "https://www.youtube.com/watch?v=T8Zj1oLGaQE";
    let name = `${new Date().getTime()}.mp3`;
    ytdl(URL, {
        filter:'audioonly',
        format:'audioEncoding'
    })
    .pipe(fs.createWriteStream(name)).on('finish', () => {
        res.writeHead(200, {
            'Content-Type': 'audio/mpeg'
        });
        const stream = fs.createReadStream(`${name}`);
        stream.on('end', () => console.log('acabou'));
        stream.pipe(res);
    });
});
