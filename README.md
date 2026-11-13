# Φ PhiPonder

**Great minds. Endless possibilities.**

An open-source React atlas for curious people. Explore 42 thinkers across seven fields, find connections and disagreements, browse external reading and museum sources, and save personal field notes.

## Features
- Search and discipline filters, with profile links to reference material
- 14 curated idea bridges, each with resonance, tension, and a reflection question
- Interactive timeline: eras, year scrubber, and contemporaries
- Reading Room with 27 curated external texts, museum records, lectures, and official archives
- Reading shelf statuses: To explore, Exploring, and Finished
- Source links integrated with thinker profiles and Field Notes
- Random thinker and changing questions
- Favorites, notes, and reading statuses saved in browser storage; export as JSON
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

## Timeline integrity

All 42 thinkers have chronological placements, with uncertain and traditional ranges explicitly distinguished from documented lifetimes. Temporal overlap does not prove that historical people met or influenced one another. The year marker counts only individuals in this collection.

## Reading Room sourcing and copyright

`src/works.js` is a curated **link directory**, not a full-text mirror. Each record names the host, source relationship, access status, an editorial question, and copyright or edition caveats. **Public-domain** editions generally link to Project Gutenberg; translators are identified where known. **Copyrighted** lectures, museum images, and archival materials remain hosted by their owners and subject to their terms. Some links may require an account, payment, or institutional access. We distinguish original works from archival collection pages and museum commentary. Links can change.

The personal Reading Shelf saves statuses only in this browser (`phiponder:reading-shelf`) and can be exported as JSON. No user account or server sync is involved.

## Source integrity
Profile summaries and prompts are original editorial paraphrases, **not quotations**. Connections are thought experiments, **not proof of historical influence**. Some ideas are speculative or scientifically disputed; critical context is included where appropriate. Profiles link to biography/reference pages and can be expanded with stronger primary-source citations.

## Privacy
Favorites and notes stay in this browser's localStorage. No accounts, tracking, or server. Clearing site data erases anything you haven't exported.

## Contributing
Add people or bridges in src/data.js; npm test checks uniqueness and valid links between people. Follow the evidence, include diverse traditions, and keep questions open.

MIT licensed.
