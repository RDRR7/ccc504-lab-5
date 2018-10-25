var Hapi = require('hapi');
var Inert = require('inert');
const Path = require('path');
var Vision = require('vision');

const server = Hapi.Server({
	host: 'localhost',
	port: Number(process.argv[2] || 8080)
});

(async () => {
	await server.register(Inert);
	await server.register(Vision);

	server.views({
		engines: {
			html: require('handlebars')
		},
		path: Path.join(__dirname, 'templates')
	});

	server.route({
		path: '/',
		method: 'GET',
		handler: {
			view: 'index.html'
		}
	});

	await server.start();

	console.log('Server running at:', server.info.uri);
})();
