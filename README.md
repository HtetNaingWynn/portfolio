# Portfolio Website

A modern, responsive developer portfolio built with:

- HTML
- Tailwind CSS (CDN)
- Vanilla JavaScript

## Features

- Mobile-first responsive layout
- Sticky navbar with active section highlighting
- Smooth scrolling navigation
- Skills, Projects, and Contact sections
- Contact form with basic client-side validation
- Lightweight scroll reveal animation
- SEO-ready metadata (title, description, Open Graph, Twitter tags)

## Project Structure

```text
portfolio/
  index.html
  styles/
    style.css
  scripts/
    main.js
```

## Run Locally

Open `index.html` directly in your browser, or use a local static server.

## Deploy on GitHub Pages

1. Create a new GitHub repository.
2. Push this project to the repository root.
3. In GitHub, open **Settings -> Pages**.
4. Under **Build and deployment**, choose:
   - **Source:** Deploy from a branch
   - **Branch:** `main` (or `master`) and `/ (root)`
5. Save and wait for deployment.
6. Your site will be available at:
   - `https://<your-username>.github.io/<repo-name>/`

## Deploy on Vercel

1. Go to [Vercel](https://vercel.com/) and sign in.
2. Click **Add New -> Project**.
3. Import your GitHub repository.
4. Keep defaults (Framework Preset can remain **Other**).
5. Click **Deploy**.
6. After deployment, Vercel gives you a live URL.

## Final Checklist

- Replace placeholder links and names in `index.html`.
- Update SEO URLs:
  - `canonical`
  - `og:url`
  - `og:image`
  - `twitter:image`
- Test mobile and desktop layouts before sharing.
