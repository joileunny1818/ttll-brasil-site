# TTLL Brasil Portuguese Site

Static Brazilian Portuguese B2B LED website for Cloudflare Pages.

## Structure

- `index.html` - homepage
- `styles.css` - global styles
- `assets/` - images
- `produtos/` - product and product subpages
- `aplicacoes/` - application pages
- `blog/` - technical article pages

## Local Preview

Run from this folder:

```bash
python3 -m http.server 4177
```

Open:

```text
http://127.0.0.1:4177/
```

## Cloudflare Pages Settings

Use Git integration:

- Framework preset: `None`
- Build command: leave blank
- Build output directory: `/`
- Production branch: `main`

If Cloudflare asks for a root directory, keep it blank when this folder is the repository root.

## Update Workflow

1. Edit HTML, CSS, or images locally.
2. Preview locally.
3. Commit changes to Git.
4. Push to GitHub.
5. Cloudflare Pages deploys automatically from the `main` branch.
