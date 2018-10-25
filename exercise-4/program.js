var Hapi = require('hapi');
var Inert = require('inert');
const Path = require('path');

const server = Hapi.Server({
	host: 'localhost',
	port: Number(process.argv[2] || 8080),
});

(async () => {
	await server.register(Inert);

	server.route({
		path: '/foo/bar/baz/{filename}',
		method: 'GET',
		handler: {
			directory: {
				path: Path.join(__dirname, '/public')
			}
		}
	});

	await server.start();

	console.log('Server running at:', server.info.uri);
})();
