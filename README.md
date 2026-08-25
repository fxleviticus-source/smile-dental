# Smile Dental Clinic — Demo Website

A modern, multi-page demo website built for **Smile Dental Clinic**
(28 Bwinjimfumu Road, Siliwiziya, Lusaka, Zambia).

## What's included

- `index.html` — Home page (welcome animation, hero slideshow, services
  preview, about preview, gallery preview, reviews placeholder, CTA)
- `about.html` — About the clinic
- `services.html` — Full detail on all four care categories
- `gallery.html` — Full photo gallery with a lightbox viewer
- `contact.html` — Location, map, hours, phone & WhatsApp
- `css/style.css` — All styling, design tokens and animations
- `js/main.js` — Preloader, navigation, hero slideshow, scroll reveal,
  gallery lightbox, back-to-top

## How to view it

Open `index.html` in any modern browser. No build step or server is
required — it's a fully static site. (Some browsers restrict local
`file://` access to fonts/scripts; if anything looks off, serve the
folder with any simple local server, e.g. `python3 -m http.server`,
and open `http://localhost:8000`.)

## Design notes

- **Palette:** white and soft mist backgrounds, a turquoise/teal
  accent, and deep navy headings — bright and clinical without being
  cold.
- **Logo:** rebuilt to match the clinic's real signage — the blue
  tooth-shaped mark with the parent/child silhouette, "Smile" in a
  blue script, "Dental Clinic" in green underneath.
- **Signature element:** the "smile arc" — a soft curved underline
  used under section headings throughout the site, echoing the shape
  of a smile.
- **Preloader:** appears once per browser session on the home page
  only (it won't replay on internal navigation), and is skipped
  automatically for visitors with reduced-motion preferences enabled.
- **Photography:** all photos are stock images (sourced from Pexels)
  standing in for real clinic photography. A short note under the
  gallery makes this clear. Swap in real photos from the clinic
  whenever they're available — every `<img>` tag is a simple `src`
  swap.

## Content accuracy

All business details (address, phone, hours, and services) come
directly from what was provided. No doctor names, awards, patient
counts, prices, or testimonials were invented — the "Patient
Reviews" section on the home page is intentionally left as a clearly
labelled placeholder, ready to hold real reviews once they're
collected.

## Things to plug in before going live

- Real clinic photography (hero slideshow, about page, services,
  gallery)
- Real patient reviews, once available
- A live booking form or scheduling link, if the clinic wants one
  beyond phone/WhatsApp
- A custom domain and hosting

---
Demo build by Orbit Media Agency.
