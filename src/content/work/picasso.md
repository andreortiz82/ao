---
layout: "../../layouts/WorkPost.astro"
title: "Picasso Design System"
description: "Creating consistent, high quality outcomes at scale."
pubDate: "2025"
heroImage: "/covers/19.png"
tags:
  [
    "Design Systems",
    "React",
    "Design Tokens",
    "Figma",
    "UI Kits",
    "Product Teams",
  ]
role:
  [
    "Design Systems Lead",
    "UI Component Design",
    "React Development",
    "Github / Figma Reviews",
    "Documentation",
    "Maintenece",
  ]
team: ["1 Design Systems Lead", "Rotating Teammates"]
password: "true"
---

Inspired by the forefather of the [Cubist](https://en.wikipedia.org/wiki/Cubism) art movement, the **Picasso Design System** serves as the medium for creating high-quality, on-brand products for the _OneStudyTeam (OST)_ ecosystem.

<div class="w-full m-auto my-[40px] p-3 bg-zinc-50 rounded flex items-center justify-center">
<img src="/art/pui-logo.png" alt="wires"/>
</div>

### Organization

For a product as diverse as OST, Picasso's organizational strategy needed to accommidate a large collection of artifacts. Using the [atomic design principles](/blog/components/) seemed like a no brainer.

### UI Libraries

Figma UI libraries we published for other teammates to use for their design artifacts. Figma variables were leveraged to ensure the consistancy across the product teams. [Radix](https://www.radix-ui.com/colors) was used as our color foundation - enabling us to be accessibile. Contributions from the other designers were handled by pairing or through a Figma pull request. Finally, in preparation for development, we used [this technique](/blog/design-systems/#level-up-design-to-code) to extract our Figma variables.

<div class="w-full m-auto my-[40px] p-3 bg-zinc-50 rounded flex items-center justify-center">
<img src="/art/pui-accessibility.png" alt="accessibility"/>
</div>

### React Components & Development Efforts

We built a mono-repo using the [NX build system](https://www.npmjs.com/package/nx). This enabled us to update components one package at a time. This had mixed feelings but in the end, the engineering team was comfortable with the outcomes. More improvements are being planned.

```js

// Instead of a single import for Picasso UI Components
"dependencies": {
    "@reifyhealth/picasso": "^1.0.1",
    // ... more
  }

// We had multiple
"dependencies": {
    "@reifyhealth/picasso-design-tokens": "^1.12.0",
    "@reifyhealth/picasso-theme-provider": "^1.0.0",
    "@reifyhealth/picasso-buttons": "^1.0.5",
    "@reifyhealth/picasso-calendars": "^4.0.0",
    "@reifyhealth/picasso-modals": "^1.4.0",
    "@reifyhealth/picasso-forms": "^5.0.9",
    // ... more
  }
```

### Themes & Modes

The OneStudyTeam ecosystem offers diverse products to serve different customers. The Picasso Design System has to account for this.

- 3 Themes: Site, Sponsor, & Admin
- 2 Modes: Light & Dark

<div class="w-full m-auto my-[40px] p-3 bg-zinc-50 rounded flex items-center justify-center">
<img src="/art/pui-themes.png" alt="themes"/>
</div>

The developer experience and confidence was paramount. Here's how it all fit together:

```js
// Projects used the picasso-theme-provider
import ThemeProvider from "@reifyhealth/picasso-theme-provider";

// Options: site, sponsor, admin
<ThemeProvider product="site">
    <Application {...}/>
</ThemeProvider>
```

### Contributions

A number of talented designers and engineers contributed to Picasso every week. Our development process was simple:

- Submit it a Github PR for review - try to keep it contained
- Include a screenshot on the PR
- All CI tests must be green
- Components are documented using [Storybook](https://storybook.js.org/) - (NX was useful here)

<div class="w-full m-auto my-[40px] p-3 bg-zinc-50 rounded flex items-center justify-center">
<img src="/art/ui-kitfull.png" alt="kitfull"/>
</div>
