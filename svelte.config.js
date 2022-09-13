//import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-node';

// by Vano
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: preprocess(), // by Vano
	kit: {
		adapter: adapter(),
		alias: { // by Vano
			$root: 'src'
		}
	}
};

export default config;
