<script>
	import Tweet from '$root/components/tweet.svelte'
	import Compose from '$root/components/compose.svelte'
	import Info from '$root/components/info.svelte'

	import {print_r} from 'print_r'
	import { FormCheckError } from '$root/types/common'	
	import { JsonCheckedParse } from '$root/utils/json'		

	/** @type {import('./$types').PageData} */	
	export let data

	// Вынесен в отдельный @typedef в файле определений типа в маршурута '/home/*',
	// используется для сопряжения с типом, возвращаемым 'load'-функцией, 
	// загружающей в клиента массив данных этого типа 
	/** @type {import('$root/types/home').TweetType[]} */
	let tweets = data.result

	 // The response type of actions in the bound '+page.server.js'
 	/** @type {import('./$types').ActionData} */  
	export let form;

	/** @type {FormCheckError | undefined}*/
	let checkError = new FormCheckError();
	checkError = JsonCheckedParse( Object.keys(checkError), form?.body || '{}') 
console.log('ce => ' + checkError)	

</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<slot>
	<Compose tweet={checkError?.oldValue || ''} maxCharacters={1400}/>
{#if checkError?.errorMessage}  <!-- '?' here selects the non-void type of the 'ActionData' union -->
	<Info data={String(checkError.errorMessage)}/>
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
