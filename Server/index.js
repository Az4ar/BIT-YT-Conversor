require('dotenv').config();

const express = require('express');
const cors = require('cors');
const ytdl = require('ytdl-core');
const app = express();
let path = require("path")

app.use(cors());


app.listen(process.env.PORT, () => {
	console.log(`Servidor iniciado com sucesso!!! => http://${process.env.HOST}:${process.env.PORT} <=`);
});

app.get('/', async (req, res) => {
	let file = path.join(__dirname, "..", "index.html");
	res.sendFile(file);	
})

app.get('/videomp3', async (req, res, next) => {
	try {
		var url = req.query.url;
		if(!ytdl.validateURL(url)) {
			return res.sendStatus(400);
		}

		let titleString = await ytdl.getBasicInfo(url);
		let title = titleString.videoDetails.title

		let encode = encodeURI(title);

		res.header('Content-Disposition', `attachment; filename="${encode}.mp3"`);

		ytdl(url, {
			format: 'mp3',
			filter: 'audioonly',
		}).pipe(res);

	} catch (err) {
		console.error(err);
	}
});

app.get('/videomp4', async (req, res, next) => {
	try {
		let url = req.query.url;
        
		if(!ytdl.validateURL(url)) {
			return res.sendStatus(400);
		}

		let titleString = await ytdl.getBasicInfo(url);
		let title = titleString.videoDetails.title;
		let encode = encodeURI(title);
		
		res.header('Content-Disposition', `attachment; filename="${encode}.mp4"`);
		ytdl(url, {
			format: 'mp4',
            filter: 'audioandvideo'
		}).pipe(res);

	} catch (err) {
		console.error(err);
	}
});