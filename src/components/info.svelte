<script>
    /** @type {string | null} */
    export let data
</script>

<table class="info">
    <tr>
        <td>
            <h3>Info:</h3>
        </td>
        <td>
            {data}
        </td>        
        <td>
            <img src="/exclamation.png" alt="Exclamation"/>
        </td>
    </tr>
</table>

<style>
	.info {
        width: 100%;
        border:5px solid lightsalmon;
        background-color: var(--color-brand);
	}

    td {
        vertical-align: middle;
        padding: 3px;
	}

	img {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		object-fit: cover;
	}
</style>