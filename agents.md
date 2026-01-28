# agents.md  
## Frontend SCSS Architecture & Naming Conventions

This file defines **mandatory rules** for any AI agent working on this codebase.
All generated or refactored code MUST follow these conventions exactly.

This project is a **multi-homepage e-commerce frontend** built with **SCSS**.

---

## 1. Core Principles

1. Reusability comes first  
2. Page styles must never pollute global components  
3. Naming must describe **intent**, not appearance  
4. Global styles define **what a component is**  
5. Page styles define **where a component is used**  

If unsure, choose the **simpler and more reusable** option.

---

## 2. SCSS Folder Structure (Strict)

AI MUST follow this structure and MUST NOT invent new folders without instruction.

```
scss/
├── abstracts/
│   ├── _variables.scss
│   ├── _mixins.scss
│
├── base/
│   ├── _reset.scss
│   ├── _typography.scss
│
├── components/
│   ├── _buttons.scss
│   ├── _forms.scss
│   ├── _cards.scss
│
├── layout/
│   ├── _header.scss
│   ├── _footer.scss
│
├── pages/
│   ├── _home-one.scss
│   ├── _home-two.scss
│   ├── _home-three.scss
│
└── main.scss
```

---

## 3. Button System (Global Rules)

### 3.1 Global Buttons

All reusable buttons MUST live in:

```
components/_buttons.scss
```

Required structure:

- Base:
  - `.btn`
- Variants (intent-based only):
  - `.btn--primary`
  - `.btn--secondary`
  - `.btn--outline`
  - `.btn--ghost`
  - `.btn--danger`
- Sizes:
  - `.btn--sm`
  - `.btn--md`
  - `.btn--lg`
- States:
  - `.is-disabled`
  - `.is-loading`

❌ AI MUST NOT:
- Create color-based names (`btn-red`)
- Create layout-based names (`btn-big`)
- Add page-specific logic here

---

## 4. Page-Specific Buttons

A button is **page-specific** only if it is visually unique to ONE page.

Rules:
1. Must live in that page’s SCSS file  
2. Must be scoped under the page root class  
3. Must reuse global buttons via `@extend` or mixins  

### Naming Convention (Mandatory)

```
.page-name__component-name
```

Examples:
- `.home-one__hero-cta`
- `.home-two__campaign-cta`
- `.home-three__newsletter-cta`

Example:
```scss
.home-one {
  &__hero-cta {
    @extend .btn;
    @extend .btn--primary;
    border-radius: 999px;
  }
}
```

❌ AI MUST NOT:
- Create names like `btn-home-one-primary`
- Duplicate `.btn` styles inside page files
- Modify global button behavior from page files

---

## 5. Page Wrapper Requirement

Each page MUST have a root class:

```html
<body class="home-one">
```

All page styles MUST be scoped:

```scss
.home-one {
  .section-hero {
    padding: 80px 0;
  }
}
```

---

## 6. Decision Rules (Mandatory Logic)

AI MUST follow this logic:

1. Is the button reused across pages?  
   → YES → Global `.btn--variant`

2. Is the button unique to a single page?  
   → YES → Page-scoped button

3. Is the difference only spacing or positioning?  
   → YES → Page override, NOT a new button

4. Is a page-specific button reused later?  
   → Promote it to a global variant

---

## 7. HTML Usage Rules

### Global button
```html
<button class="btn btn--primary btn--lg">
  Add to Cart
</button>
```

### Page-specific button
```html
<button class="home-two__campaign-cta">
  Limited Offer
</button>
```

❌ AI MUST NOT:
- Stack multiple page button classes
- Mix utility logic into button naming

---

## 8. Code Quality Rules

AI MUST:
- Use lowercase + hyphen naming
- Follow BEM-style conventions
- Keep nesting ≤ 3 levels
- Use variables for colors and spacing
- Prefer composition over duplication

AI MUST NOT:
- Introduce magic values repeatedly
- Create unused styles
- Change UI output unless explicitly asked

---

## 9. Compilation Rule (Mandatory)

Always compile SCSS to a single CSS output file: `assets/css/style.css`. Do not create any additional CSS files (e.g., `main.css`).

---

## 10. Refactoring Rules

When refactoring existing SCSS, AI MUST:
- Preserve visual output
- Extract reusable styles into components
- Keep page logic inside page files
- Reduce duplication using mixins or extends

---

## 11. Authority Rule

This `agents.md` file is the **single source of truth**.

If any instruction conflicts with this file:
→ **This file always wins.**
