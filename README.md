# Sterling Specialist Hospital — Frontend

Static site (no build step) for Vercel.

- `/` — hospital home, doctors, appointment booking
- `/board` — Board of Directors
- `/admin` — admin panel (appointments, doctors, departments, articles, partners, page content, logo)

Set the live API URL in `js/config.js` (and in `connect-src` inside `vercel.json` if the URL changes). The backend's `CLIENT_ORIGIN` must equal this site's exact URL.
