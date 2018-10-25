var Hapi = require('hapi');
var Inert = require('inert');

const server = Hapi.Server({
	host: 'localhost',
	port: Number(process.argv[2] || 8080),
	routes: {
		files: {
			relativeTo: __dirname
		}
	}
});

(async () => {
	await server.register(Inert);

	server.route({
		path: '/',
		method: 'GET',
		handler: {
			file: 'index.html'
		}
	});

	await server.start();

	console.log('Server running at:', server.info.uri);
})();
