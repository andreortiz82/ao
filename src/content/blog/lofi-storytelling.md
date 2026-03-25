---
layout: "../../layouts/BlogPost.astro"
title: "Low-fidelity Storytelling"
description: "Learn how I use low-fidelity artifacts to tell a compelling story."
pubDate: "2024"
heroImage: "/covers/9.png"
tags: ["Lofi", "Wireframes", "Product Design", "UI Kits"]
---

There's a trap I've fallen into more times than I'd like to admit: jumping straight to high-fidelity mocks before the idea is actually ready for them. You spend hours getting the typography perfect, obsessing over corner radius, tweaking the color palette — and then someone in the review asks a question about the core flow that you haven't really answered yet. All that polish was just noise.

Low-fidelity work forces you to slow down and think. No aesthetics to hide behind. No beautiful gradients to distract from a fundamentally broken interaction. Just the idea, stripped to its bones. When I'm using lo-fi, I'm not designing — I'm *thinking out loud in a visual medium*. There's a real difference.

If you have a mature [design system](/tag/Design%20Systems) you can move fast in high-fidelity and that's great. But when the idea is still forming? Slow it down.

<hr/>

## Drop app

A few years back I had a simple idea for a mobile app: **Drop geo-location based messages for others when they're in an area.**

🌩 Brain Storm:

- As I travel around a city, I receive a notification.
- I grab my phone and see this notification: _"New Drop! from Pinky"_.
- I tap the notification to open it, I see a photo of a group of people and a message: _"We're hanging out if folks are around."_
- I happen to be nearby which is why I received the dropped message.
- I stop in and see my friends.

### As I travel around a city, I receive a notification.

The more I thought about it, the more edge cases surfaced. First one: I definitely wouldn't want notifications pinging me while I'm driving around town. So — **the user must be traveling at a walking speed to receive a Drop notification.** One constraint, and suddenly the use case snaps into focus.

<div class="w-full my-[40px] p-3 bg-zinc-50 rounded">
        <img src="/art/lofi-1.png" alt="lofi-1"/>
    </div>

### _"New Drop!"_ - I tap the notification to open it...

My first instinct was a friends-list model — you choose who can see your Drops. Then I started asking "what if?" questions and things got more interesting. What if Drops could be public?

- **What if I go to a restaurant and the bathrooms are genuinely terrible?**
  - Drop a public warning. Do the community a service.
- **What if I create some street art and want others to come find it?**
  - Drop a photo. Like hide and seek, but for adults who are into street art.

<div class="w-full my-[40px] p-3 bg-zinc-50 rounded">
<img src="/art/lofi-2.png" alt="lofi-2"/>
</div>

### I happen to be nearby which is why I received the dropped message.

The core feeling I was after was simple: *know more about the space around you.* Know if friends are nearby. Know if there's something worth stopping for. Geo-location as a layer of social context — less about broadcasting yourself and more about discovery.

The idea had legs. Whether it would have had users is a different question entirely — but that's what lo-fi is for. Work out the idea before you invest in the execution.

<div class="w-full my-[40px] p-3 bg-zinc-50 rounded">
<img src="/art/lofi-3.png" alt="lofi-3"/>
</div>

<span>Thanks for reading. Here's a copy of my <a href="/art/ao-ui-kit.zip">Balsamiq UI Kit</a>. Enjoy!</span>
