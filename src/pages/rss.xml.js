import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

export async function GET(context) {
	const posts = await getCollection('blog');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		// Include `base` so the channel URL is /ao/, not the domain root.
		// Item links are path-absolute (`/ao/blog/…`) and still resolve correctly.
		site: new URL(import.meta.env.BASE_URL, context.site),
		items: posts.map((post) => ({
			...post.data,
			link: `${import.meta.env.BASE_URL}blog/${post.id}/`,
		})),
	});
}
