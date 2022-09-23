<script>
	import Tweet from '$root/components/tweet.svelte'
	import Compose from '$root/components/compose.svelte'
	import Info from '$root/components/info.svelte'

	import {print_r} from 'print_r'

	/** @type {import('./$types').PageData} */	
	export let data
//console.log('data is:' + print_r(data))	

	// Вынесен в отдельный @typedef в файле определений типа в маршурута '/home/*',
	// используется для сопряжения с типом, возвращаемым 'load'-функцией, 
	// загружающей в клиента массив данных этого типа 
	/** @type {import('$root/types/home').TweetType[]} */
	let tweets = data.result

	// /** @type {string} */
	// let info = data.info

 	/** @type {import('./$types').ActionData} */  
	export let form; // response type of actions in the bound '+page.server.js'
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<slot>
	<Compose />
{#if form?.body}  <!-- '?' here selects the non-void type of the 'ActionData' union -->
	<Info data={form.body}/>
{/if}

	<h1>Feed</h1>

	{#each tweets as tweet (tweet.id)}
		<Tweet {tweet} />
	{/each}
</slot>

<style>
	h1 {
		position: sticky;
		top: 0;
		padding: var(--spacing-8) var(--spacing-24);
		font-size: var(--font-24);
		backdrop-filter: blur(100px);
	}
</style>
