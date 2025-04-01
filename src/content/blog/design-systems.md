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

- Creating a style for the UI
- Defining some values

## Teams

- Creating components
- UI Kits

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
