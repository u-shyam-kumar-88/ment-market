# 🛍️ Ment Market — Campus & Student Marketplace

A modern, responsive e-commerce storefront crafted with **semantic HTML5**, **editorial CSS3**, and **vanilla JavaScript**. Designed with a warm, tactile paper-and-sage aesthetic, live search and category filtering, an interactive slide-out shopping bag drawer, and GitHub Pages deployment automation.

🔗 **GitHub Repository:** <https://github.com/u-shyam-kumar-88/ment-market>

🌐 **Live Demo (GitHub Pages):** <https://u-shyam-kumar-88.github.io/ment-market/>

![Ment Market Preview](https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80)

---

## ✨ Features & Sections

### 1. 🧭 Announcement Bar & Sticky Navigation
* **Top Announcement Strip**: Highlights student perks and free campus delivery over ₹999.
* **Sticky Glassmorphic Header**:
  * Custom circular `M` monogram brand mark with links to **Shop**, **Categories**, **Our story**, and **Reviews**.
  * Quick search shortcut and interactive **Bag** trigger with live `aria-live` item counter badge.
  * Accessible mobile hamburger menu toggle with smooth link auto-collapse.

### 2. 🌟 Editorial Hero & Campus Promises
* **Split Hero Showcase**: Pairs high-contrast editorial typography (*Playfair Display* & *DM Sans*) with a tilted **"STUDY • BUILD • THRIVE"** sticker badge and student rating note.
* **Promise Strip**: Highlights student-tested, budget-friendly gear and free hostel delivery.

### 3. 🗂️ Category Cards & Live Product Filtering (`script.js`)
* **Browse by Need**: Interactive category cards (**Desk & Study**, **Hostel & Brew**, **Tech & Kits**) that smoothly jump to the storefront and apply the matching filter.
* **Real-Time Search & Filter Toolbar**:
  * Filter pills for **All gear**, **Study**, **Hostel**, **Tech**, and **Lighting** with `aria-pressed` states.
  * Instant keyword search input (`#product-search`) with live result count updates and empty-state feedback.
* **Curated 8-Item Product Grid**: Displays student pricing in `INR`, product badges (*Bestseller*, *Small batch*, *New*), material specs, and rotating `+` quick-add buttons.

### 4. 🛒 Slide-Out Shopping Bag Drawer (`script.js`)
* **Interactive Cart State**: Managed via JavaScript `Map` with real-time `Intl.NumberFormat("en-IN")` currency formatting.
* **Quantity & Item Controls**: Increment (`+`), decrement (`−`), or remove items directly inside the slide-out drawer.
* **Keyboard & Focus Accessibility**: Supports `Escape` key closing, backdrop click dismissal, focus management, and screen-reader status announcements.

### 5. 🎁 Student Bundle Offer, Story, Reviews & Newsletter
* **Semester Bundle Banner**: 15% student ID bundle callout with direct category jump action.
* **About Ment Market & Campus Buzz**: Brand story section paired with a 3-column student testimonial grid and interactive demo newsletter signup form.

---

## 🎨 Design & Aesthetic Highlights

* **Warm Editorial Palette**: Soft paper tones (`#fbfaf6`, `#f5f2eb`), deep forest ink (`#25342b`), muted sage (`#dce5d8`, `#6b806b`), and warm terracotta clay accents (`#c97759`).
* **Typography Pairing**: Combines *Playfair Display* italic accents with clean *DM Sans* UI copy.
* **Accessibility & Motion**: Full ARIA attributes, keyboard focus rings, and `@media (prefers-reduced-motion: reduce)` support.

---

## 📱 Fully Responsive Breakpoints

| Device | Breakpoint | Adaptations |
| :--- | :--- | :--- |
| **Desktop / Ultrawide** | `> 1000px` | 4-column product grid, asymmetric 3-column category showcase, full sticky navigation, and slide-over 440px cart drawer. |
| **Tablet** | `721px – 1000px` | 3-column product grid, balanced split hero, and adaptive container margins. |
| **Mobile** | `≤ 720px` | Collapsible mobile menu drawer, single-column hero stack, horizontally scrollable filter pills, and 2-column compact product grid. |

---

## 📁 Project Structure

```text
ment-market/
├── index.html          # Semantic storefront, product catalog & cart drawer markup
├── style.css           # Editorial styling, CSS Grid/Flexbox layouts & responsive rules
├── script.js           # Live search, category filtering, cart state & drawer interactions
├── deploy-pages.yml    # GitHub Actions workflow for automated GitHub Pages deployment
└── README.md           # Project documentation
```

---

## 🚀 Getting Started

Simply open `index.html` in any modern web browser:

```bash
# Option 1: Directly open the file in your default browser
start index.html    # Windows
open index.html     # macOS
xdg-open index.html # Linux

# Option 2: Run a local static server
npx serve .
# or
python -m http.server 3000
```

---

## 🛠️ Built With

* **HTML5**: Semantic landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`) and ARIA live regions
* **CSS3**: CSS Custom Properties, CSS Grid, Flexbox, sticky backdrop blur, and reduced-motion media queries
* **JavaScript (ES6+)**: DOM manipulation, `Map`-based cart management, live search/filter logic, and `Intl.NumberFormat` currency formatting
* **GitHub Actions**: Automated deployment via `deploy-pages.yml`

---

## 📄 License

MIT License. Free to use for personal and commercial projects.