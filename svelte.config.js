import adapter from '@sveltejs/adapter-node';


/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter({ out: 'build' }),
		vite: {
			optimizeDeps: {
				include: ["highlight.js", "highlight.js/lib/core"],
			},
		},
	},
};

export default config;
