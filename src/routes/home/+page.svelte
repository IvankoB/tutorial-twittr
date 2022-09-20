<script>
	import Tweet from '$root/components/tweet.svelte'

	/** @type {import('./$types').PageData} */	
	export let data

	// Вынесен в отдельный @typedef в файле определений типа в маршурута '/home/*',
	// используется для сопряжения с типом, возвращаемым 'load'-функцией, 
	// загружающей в клиента массив данных этого типа 
	/** @type {import('$root/types/home').TweetType[]} */
	let tweets = data.result

</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<h1>Feed</h1>

{#each tweets as tweet (tweet.id)}
	<Tweet {tweet} />
{/each}

<style>
	h1 {
		position: sticky;
		top: 0;
		padding: var(--spacing-8) var(--spacing-24);
		font-size: var(--font-24);
		backdrop-filter: blur(100px);
	}
</style>
