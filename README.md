# Φ PhiPonder

**Great minds. Endless possibilities.**

An open-source React atlas for curious people. Explore 42 thinkers across seven fields, find connections and disagreements, and save personal field notes.

## Features
- Search and discipline filters, with profile links to reference material
- 14 curated idea bridges, each with resonance, tension, and a reflection question
- Random thinker and changing questions
- Favorites and notes saved in browser storage; export them to JSON
- Responsive, accessible-first interface; reduced-motion support

## Local development

Node.js 20+ required.

~~~bash
npm install
npm run dev
npm test
npm run build
~~~

## Publish with GitHub Pages
Under **Settings → Pages**, select **GitHub Actions** as the source. The workflow at .github/workflows/deploy.yml runs tests, builds the Vite app, and deploys on pushes to main. Vite's base path is configured for /PhiPonder/.

Once deployed, the page is expected at: https://michaelwave369.github.io/PhiPonder/

## Source integrity
Profile summaries and prompts are original editorial paraphrases, **not quotations**. Connections are thought experiments, **not proof of historical influence**. Some ideas are speculative or scientifically disputed; critical context is included where appropriate. Profiles link to biography/reference pages and can be expanded with stronger primary-source citations.

## Privacy
Favorites and notes stay in this browser's localStorage. No accounts, tracking, or server. Clearing site data erases anything you haven't exported.

## Contributing
Add people or bridges in src/data.js; npm test checks uniqueness and valid links between people. Follow the evidence, include diverse traditions, and keep questions open.

MIT licensed.
