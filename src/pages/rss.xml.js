import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context) {
	const posts = await getCollection('blog');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		// Follow Astro `base` (`import.meta.env.BASE_URL`). With base `/`,
		// the channel and item links are root-absolute (`/blog/…`).
		site: new URL(import.meta.env.BASE_URL, context.site),
		items: posts.map((post) => ({
			...post.data,
			link: `${import.meta.env.BASE_URL}blog/${post.id}/`,
		})),
	});
}
