# PageOrgin

A responsive React and Vite implementation of the PageOrgin reference screens. The artwork and four concept thumbnails are cropped from the supplied designs. The interface, navigation, cards and form use editable React components.

## Run locally

Install Node.js 22 or later. Open a terminal in the extracted `pageorgin` folder.

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. Use `npm run build` to generate the production site in `dist/`, then `npm run preview` to serve that build locally.

## Enable form email

1. Copy `.env.example` to `.env.local`. In Windows PowerShell, run `Copy-Item .env.example .env.local`.
2. Create a Web3Forms access key for the inbox that should receive enquiries. See the [Web3Forms setup guide](https://docs.web3forms.com/getting-started/installation).
3. Set `VITE_WEB3FORMS_ACCESS_KEY` to the issued key. Set `VITE_CONTACT_EMAIL` to the address you want displayed on the site. Email delivery uses the inbox linked to the access key.
4. Restart the Vite server or rebuild the production site, then send a test enquiry and check the connected inbox.

The default contact email is `hello@example.com`. With the example access key or no key, submitting a valid form displays the demo status and sends no request. Once configured, the form sends the visitor's name, reply email, optional phone number, project type, selected pricing plan (when applicable) and message. The site displays submission success only after Web3Forms confirms it.

Set `VITE_WHATSAPP_NUMBER` with the country code to open a chat with your business. Fill the four social URL variables to activate those links. Without a configured number, the WhatsApp link opens the installed app without a preset recipient. All `VITE_` values are included in the public frontend.

## Project structure

```text
pageorgin/
  public/art/             Reference artwork and project thumbnails
  src/
    components/           Header, Hero, Services, Projects, About, Pricing, Contact and Footer
                          Each section has its own .jsx and .css
    api/web3forms.js      Form submission and API error handling
    data/                 Services, navigation and public site settings
    App.jsx               Assembles sections
    global.css            Typography, colors and shared styles
    main.jsx              React entry point
  .env.example            Contact and social configuration
  index.html
  package.json
  package-lock.json
  vite.config.js
```

The four projects are portfolio concepts. Each card opens a dedicated detail page with a Back to Projects link. Ask About This Style preselects the matching project type in the contact form. The footer includes short starter privacy and terms copy that can be updated in `src/components/Footer.jsx`.
