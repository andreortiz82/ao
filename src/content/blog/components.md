---
layout: "../../layouts/BlogPost.astro"
title: "Components"
description: "Using Atomic principals to stay organized."
pubDate: "2024"
heroImage: "/covers/4.png"
tags: ["Tailwind", "Front-end", "React", "Design Systems"]
---

## Atom Design

I'm a fan of the [Atomic Design Principals](https://atomicdesign.bradfrost.com/) by Brad Frost. In my experience working on design systems, I've found this method really great for organization and for communicating with engineering teams. In short, _Atomic_ design is a mental model for thinking about our user interfaces as both a cohesive whole and a collection of parts.

<div class="w-full m-auto my-[40px] p-3 bg-zinc-50 rounded">
<img src="/art/atomic-design.png" alt="atomic"/>
</div>

### Atoms

These are basic elements like form labels, inputs, buttons, and others that can’t be broken down any further without ceasing to be functional.

### Molecules

Molecules are relatively simple groups of UI elements functioning together as a unit. For example, a form label, search input, and button can join together to create a search form molecule.

### Organisms

Organisms are relatively complex UI components composed of groups of molecules and/or atoms and/or other organisms. In my experience, I've classified an Organism as a component that can make API calls.

### Templates & Pages

Templates are page-level objects that place components into a layout. Pages are specific instances of templates that show what a UI looks like with real representative content in place.
