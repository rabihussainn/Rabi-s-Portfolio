# Rabi Hussain – Portfolio

A single static page: no build step, no dependencies.

```
index.html        the whole site (HTML, CSS and JS inline)
assets/rabi.jpg   hero photo
favicon.svg       browser tab icon
```

## Run locally
Open `index.html` in a browser, or serve the folder:

```bash
npx serve .        # or: python3 -m http.server
```

## Deploy
- **GitHub Pages:** push to your repo, then Settings → Pages → deploy from the branch and folder that contains `index.html`.
- **Vercel / Netlify:** import the repo. Framework preset "Other", no build command, output directory = this folder.

## Editing
- Colors live in `:root` at the top of the `<style>` block (`--lilac`, `--mint`, `--sky`, `--coral`, `--butter`).
  Lilac = Kollegio, mint = Pattern, sky = cloud, coral = research, butter = highlight.
- Resume buttons point to the Google Drive file; search for `drive.google.com` to change all four at once.
- Fonts load from Google Fonts (Bricolage Grotesque + Instrument Sans).
- Respects `prefers-reduced-motion` and dark mode.

## After deploying
Change `og:image` in `<head>` to the full URL (e.g. `https://yourdomain.com/assets/rabi.jpg`)
so link previews show the photo on LinkedIn and Slack.
