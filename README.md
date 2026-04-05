# Anthony DevBlog

A Hugo-powered developer blog & portfolio with a **Steam 2005** dark-portal aesthetic.
Olive green + black, dense sidebar layout, monospace code, retro early-web vibe.

---

## 📁 Project Structure

```
anthony-devblog/
├── .github/
│   └── workflows/
│       └── hugo.yml          ← GitHub Actions: auto-deploy on push
├── archetypes/
│   └── posts.md              ← Template for new posts (hugo new)
├── content/
│   ├── _index.md             ← Homepage
│   ├── about/
│   │   └── index.md          ← About Me page  ← EDIT THIS
│   ├── book/
│   │   └── index.md          ← Book page       ← EDIT THIS
│   └── posts/
│       ├── _index.md         ← Posts listing
│       └── *.md              ← Your blog posts ← ADD HERE
├── themes/
│   └── steam2005/            ← The custom theme (don't touch unless styling)
│       ├── layouts/          ← HTML templates
│       └── static/css/       ← style.css
└── hugo.toml                 ← Site config     ← EDIT THIS FIRST
```

---

## 🚀 Setup: GitHub Pages (Free Domain)

### Step 1 — Create the repository

1. Go to [github.com](https://github.com) and create a **new repository**
2. Name it exactly: `YOUR_USERNAME.github.io`  
   *(Replace `YOUR_USERNAME` with your actual GitHub username)*
3. Set it to **Public**
4. Do **not** initialize with README

### Step 2 — Push this project

```bash
cd anthony-devblog

# Initialize git
git init
git add .
git commit -m "Initial commit"

# Add your GitHub repo as remote
git remote add origin https://github.com/YOUR_USERNAME/YOUR_USERNAME.github.io.git

# Push
git branch -M main
git push -u origin main
```

### Step 3 — Enable GitHub Pages with Actions

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (left sidebar)
3. Under **Source**, select **GitHub Actions**
4. That's it! The workflow in `.github/workflows/hugo.yml` will run automatically

### Step 4 — Update hugo.toml

Open `hugo.toml` and change `baseURL` to your real URL:

```toml
baseURL = "https://YOUR_USERNAME.github.io/"
```

Also update:

```toml
[params]
  author = "Your Real Name"
  github = "https://github.com/YOUR_USERNAME"
  instagram = "https://instagram.com/YOUR_HANDLE"
  whatsapp = "https://wa.me/55XXXXXXXXXX"   # your number with country code
```

### Step 5 — Commit and push

```bash
git add hugo.toml
git commit -m "Update config with real URLs"
git push
```

Your site will be live at `https://YOUR_USERNAME.github.io` in about 60 seconds! 🎉

---

## ✍️ Writing Posts

### Create a new post

```bash
hugo new posts/my-post-title.md
```

This creates a file in `content/posts/my-post-title.md` using the archetype template.

### Post front matter (the stuff at the top between `---`)

```yaml
---
title: "Your Post Title"
date: 2025-01-20
description: "Short description shown in listings and SEO"
tags: ["C", "assembly", "tutorial"]
categories: ["Low-Level Dev"]
draft: false     # set to true while writing, false to publish
---
```

### Write in Markdown

```markdown
## Section Header

Regular paragraph text here.

Code block with syntax highlighting:

```c
#include <stdio.h>
int main(void) {
    printf("Hello!\n");
    return 0;
}
```

**Bold**, *italic*, `inline code`.

- bullet list
- item two
```

### Publish

```bash
git add content/posts/my-post-title.md
git commit -m "Add post: my-post-title"
git push
```

GitHub Actions builds and deploys automatically. Done.

---

## 📖 Updating the Book Page

Edit `content/book/index.md`.

### To add download links, set in front matter:

```yaml
---
title: "Descompilando"
pdf_url: "/downloads/descompilando.pdf"
epub_url: "/downloads/descompilando.epub"
github_url: "https://github.com/YOUR_USERNAME/descompilando"
---
```

### To add a real book cover image:

1. Put your image in `static/img/book-cover.jpg`
2. In `themes/steam2005/layouts/book/single.html`, find the `book-cover-large` div
3. Replace the placeholder div content with:

```html
<img src="/img/book-cover.jpg" alt="Descompilando cover" style="width:100%; height:100%; object-fit:cover; position:absolute; inset:0;" />
```

### To add downloadable files:

Put files in `static/downloads/`:
```
static/downloads/descompilando.pdf
static/downloads/descompilando.epub
```

Then reference them with `/downloads/descompilando.pdf`.

---

## 👤 Updating the About Page

Edit `content/about/index.md`. The front matter controls the structured sections:

```yaml
academics:
  - degree: "Computer Science"
    institution: "UFC — Universidade Federal do Ceará"
    period: "2022 – present"
    description: "Focus on systems programming..."

skills:
  - "C / C++"
  - "x86-64 ASM"
  - "Your skill here"
```

The body (below the `---`) is regular Markdown — write whatever you want there.

---

## 🔗 Updating Social Links

In `hugo.toml`:

```toml
[params]
  github    = "https://github.com/USERNAME"
  instagram = "https://instagram.com/HANDLE"
  whatsapp  = "https://wa.me/5585999999999"
```

WhatsApp format: `https://wa.me/` + country code (55) + DDD + number, no spaces or dashes.
Example: `https://wa.me/5585912345678`

---

## 🧭 Navigation Menu

In `hugo.toml`:

```toml
[[menu.main]]
  name = "NEWS"
  url  = "/posts/"
  weight = 1
```

`weight` controls order. Lower = appears first.
To add a new section (e.g., Projects): add a new `[[menu.main]]` block and create `content/projects/`.

---

## 🎨 Customizing the Theme

All styles are in one file: `themes/steam2005/static/css/style.css`

Key CSS variables at the top of the file control the color palette:

```css
:root {
  --olive-bright: #9aaa40;   /* main accent color */
  --text-bright:  #e8e6d0;   /* bright text */
  --panel-bg:     #1e1e18;   /* sidebar background */
  /* ... */
}
```

Change `--olive-bright` to `#40a0aa` for a teal variant, for example.

---

## 🛠️ Running Locally

Install Hugo: https://gohugo.io/installation/

```bash
# In the project root:
hugo server -D

# Open: http://localhost:1313
# The -D flag shows draft posts too
```

Changes auto-reload in the browser.

---

## ➕ Adding New Sections

Example: adding a **Projects** section.

1. Create `content/projects/_index.md`:
```yaml
---
title: "Projects"
---
```

2. Add individual projects as `content/projects/my-project.md`

3. Add to menu in `hugo.toml`:
```toml
[[menu.main]]
  name = "PROJECTS"
  url  = "/projects/"
  weight = 5
```

4. Add to sidebar in `themes/steam2005/layouts/partials/sidebar.html`:
```html
<li><a href="{{ "/projects/" | relURL }}">Projects</a></li>
```

The default `list.html` and `single.html` templates handle any section automatically.

---

## 📝 Quick Reference Cheatsheet

| Task | Command / File |
|------|----------------|
| New post | `hugo new posts/post-name.md` |
| Preview | `hugo server -D` |
| Deploy | `git push` (auto via GitHub Actions) |
| Edit about | `content/about/index.md` |
| Edit book | `content/book/index.md` |
| Edit nav | `hugo.toml` → `[[menu.main]]` |
| Edit colors | `themes/steam2005/static/css/style.css` → `:root {}` |
| Add social link | `hugo.toml` → `[params]` |

---

## 🐛 Troubleshooting

**Site not updating after push?**  
→ Go to GitHub repo → Actions tab → check if the workflow ran and passed

**Broken styles?**  
→ Check `baseURL` in `hugo.toml` matches your actual GitHub Pages URL exactly

**Post not showing?**  
→ Make sure `draft: false` in the post's front matter

**Local server errors?**  
→ Make sure you're running `hugo server` from inside the `anthony-devblog/` folder
