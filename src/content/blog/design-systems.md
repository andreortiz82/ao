---
layout: "../../layouts/BlogPost.astro"
title: "UI, Design Systems, Tooling, & Teams."
description: "Develop wonderful experiences at scale."
pubDate: "2024"
heroImage: "/art/ui-cover.png"
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

<div class="w-full m-auto my-[40px] p-3 bg-zinc-50 rounded">
<img src="/art/ui-login.png" alt="login"/>
</div>

<!-- <div class="w-full m-auto my-[40px] p-3 bg-zinc-50 rounded">
<img src="/art/ui-stfin.png" alt="fin"/>
</div> -->

<div class="w-full m-auto my-[40px] p-3 bg-zinc-50 rounded">
<img src="/art/ui-xtrem.png" alt="xtrem"/>
</div>

<div class="w-full m-auto my-[40px] p-3 bg-zinc-50 rounded">
<img src="/art/ui-kongo.png" alt="kongo"/>
</div>

## Design at Scale

As my projects grows, I like to start componentizing elements I know will be reused. Since I'm using Figma, creating components and variants have become a big part of my workflow. This is especially helpful when I'm working with other designers. It doesn't take long before you've got a UI Kit of Figma components you can share with the team and improve over time.

<div class="w-full m-auto my-[40px] p-3 bg-zinc-50 rounded">
<img src="/art/ui-kit1.png" alt="uikit"/>
</div>

<div class="w-full m-auto my-[40px] p-3 bg-zinc-50 rounded">
<img src="/art/ui-kitfull.png" alt="fin"/>
</div>

## Design to Code

- Figma tooling
- Style Dictionary
- CSS, Tailwind, JS, and more...

```javascript
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

```javascript
StyleDictionary.registerFormat({
  name: "custom/js",
  formatter: function ({ dictionary, file, options }) {
    let collections = [];
    dictionary.allTokens.map((token) => {
      if (!collections.includes(token.collection)) {
        collections.push(token.collection);
      }
    });

    let output = collections
      .map((c) => {
        if (c === "foundation") {
          const foundationLight = dictionary.allTokens.filter(
            (t) => t.collection === c && t.mode === "light"
          );
          const foundationDark = dictionary.allTokens.filter(
            (t) => t.collection === c && t.mode === "dark"
          );

          return `export const foundation = {
            light: {
              ${foundationLight
                .map((token) => {
                  let tname = token.name
                    .replace("foundation-", "")
                    .replace("light-", "");
                  return `"${tname}": "${token.value}"`;
                })
                .join(",\n")}
            },
            dark: {
              ${foundationDark
                .map((token) => {
                  let tname = token.name
                    .replace("foundation-", "")
                    .replace("dark-", "");
                  return `"${tname}": "${token.value}"`;
                })
                .join(",\n")}
            }
          }\n`;
        }

        return `export const ${_.camelCase(c)} = {
          ${dictionary.allTokens
            .filter((t) => {
              return t.collection === c;
            })
            .map((token) => {
              let value = token.value;
              let tname = token.name
                .replace("foundation-", "")
                .replace("semantic-", "")
                .replace("mode-1-", "");
              return `"${tname}": "${value}"`;
            })
            .join(",")}
        }\n`;
      })
      .join("");

    return `${output}`;
  },
});
```
