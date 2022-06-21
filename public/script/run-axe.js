/* eslint no-undef: "off" */
axe
	.run()
	.then(results => {
		console.log(results.violations);
	})
	.catch(err => {
		console.error('Something bad happened:', err.message);
	});