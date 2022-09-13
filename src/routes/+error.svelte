<!-- Формат ошибки при навигации по стартовой странице -->

<!-- context="module" 
    ->  код выполняется до инстанциации экземпляров данного svelte-компонента,
        это имеет смысл например для "load"-функции и переменных, 
        с которыми она оперирует
 -->
<script>
    // генерится автоматически, 
    // поэтому самому прописывать load-функцию не нужно
    import { page } from '$app/stores';
</script>


<div class="error">
	<h1>Start page error</h1>
	<h1>{$page.status}: {$page.error?.message}</h1>
	<img
		src="/error.png"
		alt="Surprised cat"
	/>
</div>

<style>
	.error {
		height: 100vh;
		display: grid;
		gap: var(--spacing-32);
		place-content: center;
		place-items: center;
	}

	img {
		width: 200px;
		height: 200px;
		border-radius: 50%;
		object-fit: cover;
	}
</style>
