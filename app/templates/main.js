require.config({
	baseUrl: '',
	// define AMD package layout for dependencies.
	packages: [
		{
			name: 'jquery',
			main: 'dist/jquery.js'
		},
		{
			name: 'poly',
			main: 'poly.js'
		},
		{
			name: 'when',
			main: 'when.js'
		}
	],
	deps: ['require', 'when/monitor/console'],
	callback: function bootstrap(require) {
		require(['troopjs-dom/application/widget', 'jquery'], function (App, $) {
			App($('html')).start();
		});
	}
});
