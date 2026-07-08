# TaqwaHub - New Tab

**Every New Tab, A Step Closer to Allah.**

TaqwaHub is an open-source Chrome Manifest V3 new tab extension built with **React**, **TypeScript**, and **Vite**. It replaces the default browser new tab page with a beautiful Islamic productivity dashboard.

TaqwaHub helps users stay connected with Salah, Quran, Hadith, Hijri date, Islamic reminders, and daily productivity tools every time they open a new tab.

---

## Live Extension

Install from Chrome Web Store:

https://chromewebstore.google.com/detail/taqwahub/cmhpklbfahdojpbknjheffjnfgnichpm

---

## Preview
https://butterflydevs.web.app/projects/taqwahub

![TaqwaHub Screenshot](Screenshorts/rsz_taqwa%20hub.webp)
---

## Features

### Islamic Dashboard

- Live clock with Gregorian date, weekday, and day-part label.
- Salah times from Aladhan API with local cache fallback.
- Fajr, Dhuhr, Asr, Maghrib, and Isha prayer times.
- Next prayer countdown.
- Sunrise and Sunset time.
- Hijri date display.
- Approximate Islamic event countdowns.
- Ayyam al-Bid fasting reminders.
- Jumu'ah and Ramadan mode cards.

### Quran and Hadith

- Hourly Quran ayah.
- Bangla and English Quran translation.
- Random Quran ayah refresh.
- Copy and favorite actions.
- Hourly sourced Hadith.
- Bangla and English Hadith support.
- Random Hadith refresh.
- Copy and favorite actions.

### Productivity Tools

- Daily Salah completion tracker.
- Automatic daily reset for Salah tracking.
- Focus tasks.
- Quick note.
- Barakah Pomodoro timer.
- Dhikr counter.
- Search engine selector.
- Compact Islamic widget-style new tab layout.

### Customization

- Bangla and English interface toggle.
- City and country settings.
- Prayer calculation method selection.
- Time format settings.
- Notification settings.
- Card visibility controls.
- Reset data option.

### Chrome Extension Support

- Chrome Manifest V3.
- MV3 background service worker.
- Hourly Quran and Hadith reminders.
- Prayer alarm scheduling.
- Local cache fallback.
- Chrome extension APIs with localStorage fallback during development.

---

## Tech Stack

- React
- TypeScript
- Vite
- Chrome Extension Manifest V3
- Aladhan Prayer Times API
- Chrome Storage API
- Chrome Notifications API
- Chrome Alarms API
- CSS / Responsive UI

---

## Installation

Clone the project:

```bash
git clone https://github.com/your-username/taqwahub-new-tab.git
cd taqwahub-new-tab
````

Install dependencies:

```bash
npm install
```

---

## Development

Run the development server:

```bash
npm run dev
```

Open the Vite URL shown in the terminal for normal browser development.

Chrome extension APIs gracefully fall back to `localStorage` during normal web development.

---

## Build

Create a production build:

```bash
npm run build
```

The build output will be generated inside the `dist` folder.

---

## Load in Chrome

1. Run the build command.
2. Open Chrome.
3. Go to:

```text
chrome://extensions
```

4. Enable **Developer mode**.
5. Click **Load unpacked**.
6. Select the `dist` folder.

The `dist` folder works as a complete unpacked Chrome extension.

---

## Customize Location

Open the settings button inside the dashboard and update:

* City
* Country
* Calculation method

Default values:

```text
City: Dhaka
Country: Bangladesh
Calculation Method: 1
```

---

## Privacy

TaqwaHub is designed to be privacy-friendly.

Most user data is stored locally in the browser, including:

* User settings
* Selected city and country
* Language preference
* Salah tracker data
* Tasks
* Notes
* Dhikr counter data
* Favorite ayahs or hadith

TaqwaHub does not sell user data.

Prayer time, Quran, Hadith, or related Islamic content may be fetched from external APIs only to provide extension features.

---

## Important Notes

Islamic dates may vary depending on local moon sighting, country, calculation method, and local Islamic authority announcements.

Event countdowns in version 1 are approximate and based on Hijri dates from the prayer API response.

---

## Future Roadmap

Planned improvements:

* More Quran and Hadith collections.
* Better background notification handling.
* Optional geolocation after user consent.
* More Ramadan duas and Ramadan customization.
* More themes and backgrounds.
* More Islamic event reminders.
* Improved offline mode.
* Better mobile-size responsive preview.
* More productivity widgets.
* Import/export settings.
* Better accessibility support.

---

## Contributing

TaqwaHub is an open-source project. Contributions are welcome.

You can contribute by:

* Reporting bugs.
* Suggesting new features.
* Improving UI/UX.
* Adding translations.
* Improving Quran or Hadith data handling.
* Improving documentation.
* Fixing code issues.

### Contribution Steps

1. Fork the repository.
2. Create a new branch:

```bash
git checkout -b feature/your-feature-name
```

3. Make your changes.
4. Commit your changes:

```bash
git commit -m "Add your feature"
```

5. Push to your branch:

```bash
git push origin feature/your-feature-name
```

6. Open a pull request.

---

## License

This project is open source.

You may use the MIT License or add your preferred open-source license.

Recommended:

```text
MIT License
```

---

## Developer

Developed by **MD NAZMUL HASAN - Butterfly Devs**