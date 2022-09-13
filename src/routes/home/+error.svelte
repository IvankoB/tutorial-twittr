<script>
    // генерится автоматически, 
    // поэтому самому прописывать load-функцию не нужно
    import { page } from '$app/stores';

</script>

<!-- Формат ошибки при навигации по страницам внутри /home/ -->

<div class="error">
	<h1>Home page error</h1>
	<h2>{$page.status}: {$page.error?.message}</h2>
	<img src="/dancing.png" alt="Person dancing" />
</div>

<style>
	.error {
		display: grid;
		gap: var(--spacing-32);
		padding: var(--spacing-24) var(--spacing-32);
		place-items: center;
	}

	img {
		width: 200px;
		height: 200px;
		border-radius: 50%;
		object-fit: cover;
	}
</style>
