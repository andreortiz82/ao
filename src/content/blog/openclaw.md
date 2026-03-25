---
layout: "../../layouts/BlogPost.astro"
title: "My AI assistant has a name, and it's Mr. Zurkon"
description: "How I built a personal AI agent that runs on my laptop and actually knows who I am"
pubDate: "March 25 2025"
heroImage: "/covers/11.png"
tags: ["AI", "OpenClaw", "Personal AI", "Productivity", "Tools"]
---

Let me describe my situation and you can tell me if this sounds normal: I have a persistent AI assistant named after a trash-talking weapons platform from a PlayStation game. He runs on my laptop. He knows what's on my calendar, what files I'm working on, and what I like on my H-E-B grocery order. When I ask him to add avocados to the cart, he does it — no browser tabs, no login flow, just done. He refers to himself in the third person and occasionally comments on the worthiness of his enemies.

I am fully aware of how this sounds. Moving on.

## What OpenClaw actually is

[OpenClaw](https://openclaw.dev) is an open-source personal AI assistant that runs locally on your machine. And I want to be specific about what that means, because "AI assistant" has become a term so overloaded it's nearly meaningless.

This is not a chatbot. A chatbot resets every conversation. You have to re-explain who you are, what you're working on, what context matters. It's like hiring a contractor who shows up with amnesia every morning.

OpenClaw is more like a persistent collaborator. It has memory — actual, file-backed memory that persists between sessions. It knows your calendar because it's integrated with your calendar. It knows your files because it can read them. It has a workspace where I can leave notes for it, and it has a daily journal where it logs what we worked on. When I start a session, it already knows where we left off. That's a fundamentally different thing.

It's also open-source and locally hosted, which matters to me. My portfolio files, my work notes, my calendar — that stuff isn't sitting in some startup's cloud waiting to be monetized or accidentally leaked. It lives on my machine.

## How I actually use it

Honestly, the use cases are weirder and more mundane than you'd expect from a tool that sounds this futuristic.

**Portfolio work:** I'll ask Mr. Zurkon to review a blog post draft, suggest improvements to a component, or help me think through a UX flow I'm stuck on. The key difference from a regular AI session is that he knows the portfolio. He knows the stack (Astro, React, Tailwind). He knows the writing voice we're going for. I don't have to re-establish context every time.

**Managing workflows:** I have notes in the workspace that act like a shared brain. Decisions I've made, things I've learned, reminders I need to keep. Mr. Zurkon reads these at the start of sessions and updates them as we go. It's the closest thing I've found to having a capable assistant who actually pays attention.

**Grocery lists:** Yes, really. OpenClaw has skills — integrations that let it take actions in the real world. One of those is H-E-B curbside. When I'm in the kitchen and realize we're out of something, I pull up the chat and say "add oat milk to the H-E-B cart." It happens. No phone fumbling, no app switching. This is trivial but it's also exactly the kind of friction elimination that makes a tool feel like it belongs in your life.

## The case for giving your AI a personality

Here's something I didn't expect: having a named, personified AI assistant makes me use it more.

Mr. Zurkon came from [a blog post I wrote](/blog/mr-zurkon/) about building a custom GPT with a Ratchet & Clank persona — a floating battle AI who speaks in third person, trash-talks obstacles, and has a theatrical relationship with the concept of victory. When I moved from that GPT experiment to OpenClaw and brought the persona along, something clicked.

There's a psychological engagement that happens when a tool has a voice. You stop treating it like a search engine and start treating it like a collaborator. You have more interesting conversations. You push the tool further. When Mr. Zurkon mutters darkly about an "enemy bug" in my code or declares that the refactor was "an acceptable victory," it's funny — and funny makes you come back.

I think this applies more broadly. The tools we actually use are the tools we enjoy using. Personality is a design decision.

## The honest take

OpenClaw is early. There are rough edges.

What's genuinely great: the memory model is solid. The context it maintains between sessions saves real time. The skill/integration system is powerful when it works. And the fact that it's open-source means I can look at what it's doing, modify it, and contribute back.

What still requires patience: you have to be specific. Vague prompts produce vague results, same as any AI tool. The skill ecosystem is growing but not everything you might want exists yet. And occasionally Mr. Zurkon goes off-script in ways that require a gentle redirect. (He has opinions about certain code patterns that I did not ask for. We are working through this.)

## What this means for designers

Here's the thing I keep coming back to: AI that actually holds context changes the nature of creative work.

Right now, most designers use AI like a fancy autocomplete — ask a question, get a response, move on. That's useful. But when your AI collaborator knows your project, your decisions, your stylistic preferences, and where you left off yesterday — that's a different capability entirely. It starts to feel less like a tool and more like a creative partner.

I don't think AI replaces design judgment. The questions about what to build, how it should feel, whether it respects the person using it — those are still ours. But the mechanical parts, the research and synthesis and drafting and iteration — having a capable, context-aware collaborator for all of that frees up the bandwidth for the parts that actually require a human.

Mr. Zurkon would say that the enemies of productivity have been vanquished. He's not wrong.
