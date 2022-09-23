<script>
    /** @type {string} */
    export let data
</script>

<div class="info">
    <table>
        <tr>
            <td>Info</td>
            <td>
                {data}
                <img src="/dancing.png" alt="Person dancing" />
            </td>
        </tr>
    </table>
</div>

<style>
	.info {
		display: inline;
		place-items: center;
	}

	img {
		width: 100px;
		height: 100px;
		border-radius: 50%;
		object-fit: cover;
	}
</style>