# AVS — Airport-Verpackungs-Service GmbH

Hochmoderne Website für die **Airport-Verpackungs-Service GmbH** am Flughafen München.
Deployed on Vercel: [avs-tau.vercel.app](https://avs-tau.vercel.app/)

Inhaltlich basierend auf [airport-verpackungen.de](https://www.airport-verpackungen.de/).

## Stack

- Next.js (App Router)
- TypeScript + Tailwind CSS
- Three.js Globe (München Hub)
- Vercel Serverless API für Kontaktformular

## Lokal starten

```bash
npm install
npm run dev
```

## Kontaktformular (optional)

Ohne E-Mail-Provider werden Anfragen im Server-Log protokolliert.
Für echten Versand:

```env
RESEND_API_KEY=re_xxx
CONTACT_TO_EMAIL=info@airport-verpackungen.de
CONTACT_FROM_EMAIL=AVS Website <onboarding@resend.dev>
```

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
