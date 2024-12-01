import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { resolve } from 'path';

// Define your website base URL
const BASE_URL = 'https://cjdportfolio.netlify.app';

// Define the routes you want to include in the sitemap
const routes = [
  { url: '/', priority: 1.0 },
  { url: '/#about', priority: 0.8 },
  { url: '/#projects', priority: 0.8 },
  { url: '/#skills', priority: 0.8 },
  { url: '/#contact', priority: 0.8 },
];

async function generateSitemap() {
  const sitemap = new SitemapStream({ hostname: BASE_URL });

  routes.forEach((route) => {
    sitemap.write(route);
  });

  sitemap.end();

  // Convert the stream to a promise and write it to a file
  const sitemapXML = await streamToPromise(sitemap).then((data) => data.toString());
  const filePath = resolve('./public/sitemap.xml');
  createWriteStream(filePath).write(sitemapXML);

  console.log('Sitemap generated!');
}

generateSitemap();