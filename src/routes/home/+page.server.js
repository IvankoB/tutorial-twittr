import { redirect } from '@sveltejs/kit'
import prisma from '$root/lib/prisma'
import { timePosted } from '$root/utils/date'
import { invalidate } from '$app/navigation'
import { FormCheckError } from '$root/types/common'

import {print_r} from 'print_r'

//import printR from 'print_r'

//Types (for convinience & typing assistance) :
//
//  Automatically created by Prisma (may be skipped):
/** @typedef {import('@prisma/client').User}  User */
/** @typedef {import('@prisma/client').Tweet} Tweet */
/** @typedef {import('@prisma/client').Liked } Liked */
//
//  User defined (for 2+ usages):
/** @typedef {import('$root/types/home').TweetType} TweetType */ 

//---------------------------------------------------------------------------------------------------
/*
	load's return :
	  Record<string,any> | Promise<Record<string,any>>,
	  set of keys to be checked against later is taken as keys of actual return structure,
	  
	  Notes:
	    - 'result' is a predefined (expected by 'Svelte') key of OK-result 	
*/

/** @type {import('./$types').PageServerLoad} */
export async function load(requestEvent) {

//	console.log('info= ' + requestEvent.locals.info)

    // get the tweets and the user data (Prisma 😍)
	// A type of SQL-result of two combined types : 'Tweet' and it's relaton to 'User' on field 'user'
	/** @type {(Tweet & {user: User;})[]} */	
	const tweetsOfUsers = await prisma.tweet/*table name*/.findMany({
		include: { // включить в результат также данные из таблиц, связанных по @relation-полям Prisma-схемы
			user: true // + по схема-полю "user" (связывает с таблицей "User")
		}, 
		orderBy: { posted: 'desc' }
	})

	// get array of selected field sets of the liked tweets
	//
	// A type of SQL-result of 'tweetId' field
	/** @type { {tweetId: number;}[] } */	
	const liked = await prisma.liked/*table name*/.findMany({
		where: { userId: 1 },
		select: { // какие поля схемы включить в результат
			tweetId: true // + поле "tweetId"
		}
	})
    
	// convert the array of field sets to array of tweet IDs
	/** @type {number[]} */	
	const likedTweets = liked.map( likedItem => likedItem.tweetId)

	// we can shape the data however we want
	// so our user doesn't have to pay the cost for it
	//
	// Данная структура будет использоваться также в SVELTE-компонентах, поэтому вынесем ее тип 
	// в отдельный '@typedef' в файле объявлений типов маршрута '/home/*' -> '$root/types/home.js',
	// и будем импортировать этот тип из этого файла (в данном случае массив этих структур)
	//
	/** @type {TweetType[]} */
	const tweets = tweetsOfUsers.map(tweet/* record of 'tweetsOfUsers' see above*/ => {
		return { // строим на лету новый тип - из данных записи 'tweetsOfUsers' и отфильтрованных записей 'likedTweets'
			id: tweet.id,
			content: tweet.content,
			likes: tweet.likes,
			posted: timePosted(tweet.posted),
			url: tweet.url,
			avatar: tweet.user.avatar,
			handle: tweet.user.handle,
			name: tweet.user.name,
			liked: likedTweets.includes(tweet.id) // проверка входит ли в список лайкнутых 
		}
	})
	return { result: tweets }
}

// /** @type {import('./$types').RequestHandler} */
// export async function POST({ request }) {
// 	const { a, b } = await request.json();
// 	return json(a + b);
//   }

//---------------------------------------------------------------------------------------------------

/* 'Request' type:

  // Fields inherited from 'Body'

    body: ReadableStream<Uint8Array> | null;	// r/o
    bodyUsed: boolean; 							// r/o
    arrayBuffer(): Promise<ArrayBuffer>;
    blob(): Promise<Blob>;
    formData(): Promise<FormData>;
    json(): Promise<any>;
    text(): Promise<string>;

  //
  // own fields:
  //

	/* Returns the cache mode associated with request, which is a string indicating how the request will interact with the browser's cache when fetching.
	cache:			RequestCache;			// r/o

	/* Returns the credentials mode associated with request, which is a string indicating whether credentials will be sent with the request always, never, or only when sent to a same-origin URL.
	credentials:	RequestCredentials;		// r/o

	/* Returns the kind of resource requested by request, e.g., "document" or "script".
	destination:	RequestDestination;		// r/o

	/* Returns a Headers object consisting of the headers associated with request. Note that headers added in the network layer by the user agent will not be accounted for in this object, e.g., the "Host" header.
	headers:		Headers;				// r/o

	/* Returns request's subresource integrity metadata, which is a cryptographic hash of the resource being fetched. Its value consists of multiple hashes separated by whitespace. [SRI] 
	integrity:		string;					// r/o

	/* Returns a boolean indicating whether or not request can outlive the global in which it was created. 
	keepalive:		boolean;				// r/o

	/* Returns request's HTTP method, which is "GET" by default.
	method:			string;					// r/o

	/* Returns the mode associated with request, which is a string indicating whether the request will use CORS, or will be restricted to same-origin URLs.
	mode:			RequestMode;			// r/o

	/* Returns the redirect mode associated with request, which is a string indicating how redirects for the request will be handled during fetching. A request will follow redirects by default.
	redirect:		RequestRedirect;		// r/o

	/* Returns the referrer of request. Its value can be a same-origin URL if explicitly set in init, the empty string to indicate no referrer, and "about:client" when defaulting to the global's default. This is used during fetching to determine the value of the `Referer` header of the request being made.
	referrer:		string;					// r/o

	/* Returns the referrer policy associated with request. This is used during fetching to compute the value of the request's referrer.
	referrerPolicy:	ReferrerPolicy;			// r/o

	/* Returns the signal associated with request, which is an AbortSignal object indicating whether or not request has been aborted, and its abort event handler.
	signal:			AbortSignal;			// r/o

	/* Returns the URL of request as a string.
	url:			string;					// r/o

	clone():		Request;

  'RequestEvent<RouteParams>' type :
	cookies:			Cookies;
	getClientAddress:	() => string;
	locals:				App.Locals;
	params:				Params;
	platform:			Readonly<App.Platform>;
	request:			Request;  // ==============> see the above
	routeId:			string | null;
	setHeaders:			(headers: Record<string, string>) => void;
	url: URL;

	Action's return :
	  Record<string,any> | Promise<Record<string,any>>	
*/ 

/** @type {import('./$types').Actions} */
export const actions = {
	//----------------------------------------------
    // default: async ({request}/* the type of default action is 'Request' */) => {
	// 	//const values = await request.formData(); 
    // },
	//----------------------------------------------
// 	showInfo: async (requestEvent/* the type of rest actions is 'RequestEvent<RouteParams>' */) => {
// 		console.log('info is: ' + (await requestEvent.request.formData()).get('info'))
// //		return {result : (await requestEvent.request.formData()).get('info') }
// 		return {}
// 	},
	create: async (requestEvent/* the type of rest actions is 'RequestEvent<RouteParams>' */) => {
		const form = await requestEvent.request.formData()
		const tweet = String(form.get('tweet'))
		const maxCharacters = parseInt(String(form.get('maxCharacters')))
//		console.log("mc= " + maxCharacters)

		if (tweet.length == 0) {
			return {
				body:  JSON.stringify(
					new FormCheckError("You shouldn't post empty tweets.", tweet)
				)
			}
		}

		// you should probably use a validation library
		if (tweet.length > maxCharacters) {
			return {
				body:  JSON.stringify( 
					new FormCheckError('Maximum Tweet length exceeded.', tweet)
				)
			}
		}

		// the user id is hardcoded but you can get it from a session
		await prisma.tweet.create({
			data: {
				posted: new Date(),
				url: Math.random().toString(16).slice(2),
				content: tweet,
				likes: 0,
				user: { connect: { id: 1 } }
			}
		})

		return {}
	},
	delete: async (requestEvent/* the type of rest actions is 'RequestEvent<RouteParams>' */) => {
		const form = await requestEvent.request.formData()
		const tweetId = parseInt(String(form.get('id')))
		await prisma.tweet.delete({ where: { id: tweetId } })
	}
	//----------------------------------------------

}
