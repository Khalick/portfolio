# Peter Agak Odongo — personal site

Static site (HTML, CSS, vanilla JS). No build step.

Live address: https://peteragakodongo.vercel.app/

## Deploy on Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Name the project **`peteragakodongo`** so the address matches the one used in the site's SEO tags.
4. Framework preset: **Other**. Leave the build command and output directory empty.
5. Click **Deploy**. Every push to `main` redeploys automatically.

`vercel.json` sets caching and security headers. `.vercelignore` keeps `media/` (original photos), `tools/` and this README off the live site.

## Changing the domain

If the project gets a different `.vercel.app` name or a custom domain, update every canonical link, social tag, the sitemap and robots.txt in one go:

```powershell
powershell -ExecutionPolicy Bypass -File tools\set-site-url.ps1 -NewUrl https://your-domain.com/
```

## After the first deploy

- Add the site to Google Search Console and submit `sitemap.xml`.
- Put the address on LinkedIn, GitHub, Instagram and the Lokari website.

## Preview locally

Open `index.html` in a browser, or serve the folder with any static server.
