/*
 * @typedef {object} TweetType
 * @property {number}  id       descr
 * @property {string}  content  descr
 * @property {number}  likes    descr
 * @property {string}  posted   descr
 * @property {string}  url      descr
 * @property {string}  avatar   descr
 * @property {string}  handle   descr
 * @property {string}  name     descr
 * @property {boolean} liked    descr
 */

import prisma from '$root/lib/prisma'
//import '$root/types/home'

/* @typedef {import('$root/lib/prisma').TweetType} Prisma */

import { timePosted } from '$root/utils/date'
//import { redirect } from '@sveltejs/kit'

//import printR from 'print_r'

/** @type {import('./$types').PageServerLoad} */
export async function load({ params}) {
    	// get the tweets and the user data (Prisma 😍)
	const tweetsOfUsers = await prisma.tweet/*table name*/.findMany({
		include: { // включить в результат также данные из таблиц, связанных по @relation-полям Prizma-схемы
			user: true // + по схема-полю "user" (связывает с таблицей "User")
		}, 
		orderBy: { posted: 'desc' }
	})

	// get the liked tweets
	const liked = await prisma.liked/*table name*/.findMany({
		where: { userId: 1 },
		select: { // какие поля схемы включить в результат
			tweetId: true // + поле "tweetId"
		}
	})
    
    /* @param {TweetType} tweet */
	const likedTweets = liked
		.map( /** @param { import('$root/lib/prisma').TweetType } tweet */tweet => tweet.id)

	// we can shape the data however we want
	// so our user doesn't have to pay the cost for it
	const tweets = tweetsOfUsers.map(/** @param {TweetType} tweet */tweet => {
		return {
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

/*
*/

// export const actions = {
//     default: async ({ request }) => {
//          const values = await request.formData(); 
//     },
//     POST: {}
// }