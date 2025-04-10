---
layout: "../../layouts/BlogPost.astro"
title: "UI, Design Systems, Tooling, & Teams"
description: "Discover how I have developed wonderful experiences that serve teams and customers."
pubDate: "2024"
heroImage: "/covers/2.png"
tags:
  [
    "Product Teams",
    "Design Systems",
    "Figma",
    "Style Dictionary",
    "Design Tokens",
    "UI Kits",
    "UI Design",
  ]
---

## UI Design

There are a number of things I like to consider when designing interfaces:

- **User needs and goals** - Begin with understanding who will use your interface and what they want to accomplish.
- **Information architecture** - Plan how information will be organized and structured
- **Visual hierarchy** - Design elements to naturally guide users' attention
- **Consistency** - Use consistent patterns, components, colors, and typography throughout to create a cohesive experience
- **Accessibility** - Ensure your design works for people with different abilities by considering color contrast, text size
- **Feedback Mechanisms** - Make it clear what elements are interactive and provide appropriate feedback when users take actions
- **Simplicity** - Eliminate unnecessary elements and reduce cognitive load

## The Team Trifecta

There are some trios that will forever remain iconic. When it comes to a product teams, the `lead designer`, `product manager`, and `lead engineer` should operate as that **Trifecta**.
I have found that when the 3 disciplines work well together the outcomes are 10x improved.

<div class="w-full m-auto my-[40px] p-3 bg-zinc-50 rounded">
<img src="/art/iconic-trios.png" alt="iconic-trios"/>
</div>

## Design at Scale

As my projects grows, I like to start componentizing elements I know will be reused. Since I'm using Figma, creating components and variants have become a big part of my workflow. This is especially helpful when I'm working with other designers. It doesn't take long before you've got a UI Kit of Figma components you can share with the team and improve over time. [Learn more](/blog/prototyping/) about my process.

<div class="w-full m-auto my-[40px] p-3 bg-zinc-50 rounded">
<img src="/art/ui-login.png" alt="login"/>
</div>

<div class="w-full m-auto my-[40px] p-3 bg-zinc-50 rounded">
<img src="/art/ui-xtrem.png" alt="xtrem"/>
</div>

<div class="w-full m-auto my-[40px] p-3 bg-zinc-50 rounded">
<img src="/art/ui-kongo.png" alt="kongo"/>
</div>

<div class="w-full m-auto my-[40px] p-3 bg-zinc-50 rounded">
<img src="/art/ui-kit1.png" alt="uikit"/>
</div>

<div class="w-full m-auto my-[40px] p-3 bg-zinc-50 rounded">
<img src="/art/ui-kitfull.png" alt="fin"/>
</div>

## Level Up: Design to Code

Figma's plugin ecosystem is great. One plugin I've had some success with is [Export/Import Variables](https://www.figma.com/community/plugin/1256972111705530093/export-import-variables). I use this plugin to export my Figma variables to a JSON file:

```json
// Example output color

{
  "id": "VariableID:2:11",
  "name": "Red/9",
  "description": "",
  "type": "COLOR",
  "valuesByMode": {
    "2:0": {
      "r": 0.8980392217636108,
      "g": 0.2823529541492462,
      "b": 0.3019607961177826,
      "a": 1
    },
    "2:1": {
      "r": 0.8980392217636108,
      "g": 0.2823529541492462,
      "b": 0.3019607961177826,
      "a": 1
    }
  }
},
... more
```

### Style Dictionary

Once I have the artifacts I want to tokenize, I use the [Style Dictionary](https://amzn.github.io/style-dictionary) library to convert my JSON into a format I can use during development. In the example below, I create 2 files: a `tokens.css` file with all my variables and a custom `tailwind` config.

```javascript
// Example Style Dictionary manifest
{
  "source": ["./tokendata/**/*.json"],
  "platforms": {
    "tokenlib": {
      "transformGroup": "custom/group",
      "buildPath": "./dist/",
      "files": [
        {
          "destination": "tokens.css",
          "format": "custom/css/theme"
        },
        {
          "destination": "tailwind.custom.js",
          "format": "custom/tailwind"
        }
      ]
    },
  }
}
```

```css
/* Style Dictionary CSS Output */

@media (prefers-color-scheme: light) {
  :root {
    --red-1: rgba(255, 252, 252, 1);
    --red-2: rgba(255, 248, 248, 1);
    --red-3: rgba(255, 239, 239, 1);
    ...;
  }
}

@media (prefers-color-scheme: dark) {
  :root {
    --red-1: rgba(31, 19, 21, 1);
    --red-2: rgba(41, 20, 21, 1);
    --red-3: rgba(60, 24, 26, 1);
    ...;
  }
}
```
