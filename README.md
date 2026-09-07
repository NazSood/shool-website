# Shool Robotics Website

Static marketing site for Shool Robotics / Shool-ZERO. Plain HTML/CSS/JS, no
build step. Deployed via Cloudflare Workers (static assets, `wrangler.jsonc`)
connected to this repo — pushes to `main` auto-build and deploy.

Live at: https://shoolrobotics.com

## Temporarily Hidden / Pending Content

These elements are hidden with the `.wip-hidden` CSS class (see
`css/style.css`) because they link to content that doesn't exist yet. Remove
the `wip-hidden` class from the element once its real content is ready:

- **Hero "Watch Video" button** (`index.html`, hero section) — needs an
  actual product/demo video before re-enabling.
- **Footer "Privacy" link** (`index.html`, footer nav) — needs a real
  Privacy Policy page before re-enabling.
- **Footer "Terms" link** (`index.html`, footer nav) — needs a real Terms
  of Service page before re-enabling.

## Contact form

The footer contact form posts to FormSubmit.co (`contact@shoolrobotics.com`),
which forwards via Cloudflare Email Routing to a personal inbox — no separate
mail hosting involved.
