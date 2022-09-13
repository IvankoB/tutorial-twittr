REM for 'ncu' node utility
call npm -G install npm-check-updates
rem call npm -G install ts-to-jsdoc

call npm -D install ^
	@prisma/client ^
	"@sveltejs/adapter-auto"@next ^
	"@sveltejs/adapter-node"@next ^
	"@sveltejs/kit"@next ^
	eslint ^
	eslint-config-prettier ^
	eslint-plugin-jsdoc ^
	eslint-plugin-svelte3 ^
	prettier ^
	prettier-plugin-svelte ^
	print_r ^
	prisma ^
	svelte ^
	svelte-check ^
	typescript ^
	vite
