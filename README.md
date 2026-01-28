# Luxury Perfume Ecommerce - HTML/Bootstrap Migration

This project is a migration of the Luxury Perfume Ecommerce site from Tailwind CSS to **Bootstrap 5.3.3** and **SCSS**.

## Project Structure

- `index.html`: Main entry point, fully refactored to use Bootstrap classes.
- `assets/`: Contains all local assets.
  - `vendor/bootstrap/`: Contains locally downloaded Bootstrap CSS and JS files.
  - `vendor/lucide/`: Contains locally downloaded Lucide Icons script.
  - `scss/`: Contains source SCSS files (compiled to CSS).
  - `css/`: Contains compiled CSS.
  - `js/`: Contains custom JavaScript (`main.js`).

## Asset Sources

The following external libraries were downloaded locally:

1.  **Bootstrap 5.3.3**
    -   Source: [Bootstrap Official Website](https://getbootstrap.com/)
    -   Downloaded via CDN: `https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css` & `.../js/bootstrap.bundle.min.js`

2.  **Lucide Icons**
    -   Source: [Lucide.dev](https://lucide.dev/)
    -   Downloaded via UNPKG: `https://unpkg.com/lucide@latest`

3.  **Fonts**
    -   Source: [Google Fonts](https://fonts.google.com/) (Linked via CSS import)
    -   Families: Montserrat, Playfair Display

## Development

### Prerequisites
-   Node.js & npm (for Sass compilation)

### Styling (SCSS)
External CSS logic is written using SCSS in `assets/scss/main.scss`.
To compile the SCSS to CSS, run:

```bash
npx sass assets/scss/main.scss assets/css/style.css
```

(The `sass` package is installed as a dev dependency).

### JavaScript
Custom interaction logic (Navbar scroll effect, 3D tilt, Scroll reveal) is located in `assets/js/main.js`.
# ecomemrce-perfume
