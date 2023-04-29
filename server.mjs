
import { createServer } from 'http';
import https from 'https';
import { renderFile } from 'pug';

const server = createServer((req, res) => {
	if (req.url === '/') {
		https.get('https://jsonplaceholder.typicode.com/photos', (response) => {
			let data = '';
			response.on('data', (chunk) => {
				data += chunk;
			});
			response.on('end', () => {
				const photos = JSON.parse(data);
				const html = renderFile('views/index.pug', { photos: photos });
				res.writeHead(200, { 'Content-Type': 'text/html' });
				res.end(html);
			});
		}).on('error', (error) => {
			console.error(error.message);
		});
	} else {
		res.writeHead(404, { 'Content-Type': 'text/plain' });
		res.end('Page not found');
	}
});

const port = 3000;
server.listen(port, () => console.log('server start at http://localhost:' + port));