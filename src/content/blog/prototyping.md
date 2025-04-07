---
layout: "../../layouts/BlogPost.astro"
title: "Front-end Development & Prototyping."
description: "Learn how I bridge the gaps between product, design, and engineering teams."
pubDate: "2024"
heroImage: "/covers/12.png"
tags: ["Front-end", "Prototyping", "React", "Ruby on Rails"]
---

## Should designers learn to code?

**Yes!** Thanks for reading.

```javascript
const skills = [
  "storytelling",
  "design",
  "illustration",
  "motion graphics",
  "code",
];

if (skills.includes("code")) {
  // Todo: Create Function
  console.log("Let's go!");
}
```

But seriously, being able to work across the disciplines and contribute to the products we design is incredibly rewarding. Don't missunderstand, I'm not a _"full stack"_ guy but I know enough about the development, front and back, to be supportive in most engineering conversations - and isn't that what it's all about - supporting our teams.

I've seen all manner of development tools and have had to learn a lot of languages, frameworks, and build systems just to keep up. Here are a few: **_HTML, CSS, Javascript, Ruby, Python, PHP, C#, ClojureScript, Webpack, Vite, React, Vue, Angular, Style Dictionary, Tailwind_,**, and so many others.

## Developing Imagination

Today, I find myself using [React](https://react.dev/), [Vite](https://vite.dev/), and [Tailwind](https://tailwindcss.com/) when I want to quickly prototype something. This combo is a great way to showcase simple ideas, communicate interactions, and create an artifact that could eventually become production code.

Checkout my current starter project, [react-vite-template](https://github.com/andreortiz82/react-vite-template), if you're interested.

### A Quick Overview

<div class="w-full m-auto my-[40px] p-3 bg-zinc-50 rounded">
<img src="/art/react-vite-starter.png" alt="react-vite-starter"/>
</div>

This project needed to support a number of qualities:

- React/Typescript was a the language of choice
- Customizations had to be simple
- Prototyping had to be fast
- It needed to be deployable, destroyable, and password protected

#### What's in it?

- Typescript
- Vite
- CSS Modules
- [Phosphor React](https://phosphoricons.com/)
- [Tailwind 4](https://tailwindcss.com/)
- [AO Design Tokens](https://github.com/andreortiz82/ao-design-tokens)
- [Ant Design 5](https://ant.design/components/overview/)

I used a custom component called `AuthenticationWrapper` to check for a session when certain pages were requested.

```javascript
const AuthenticationWrapper = (props: any) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [inputPassword, setInputPassword] = React.useState("");

  useEffect(() => {
    const storedAuth = sessionStorage.getItem(SESSION_KEY);
    if (storedAuth === password) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: any) => {
    // handle login
  };

  // Continue if authenticated or login
  if (isAuthenticated) {
    return <AppProvider>{props.children}</AppProvider>;
  } else {
    return (
      <Login
        loginCallback={handleSubmit}
        setInputPassword={setInputPassword}
        inputPassword={inputPassword}
      />
    );
  }
};
```

Additionally, I used the React `useContext` hook to share global state across my routes.

```javascript
// AppContext.tsx
export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const value = useMemo(() => ({ count, incrementCount }), [count]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// App.tsx
import { useContext, useEffect } from "react";
import { AppProvider, AppContext } from "./AppContext";

const Action = ({ count, incrementCount }: any) => {
  return (
    <div className="flex gap-4 items-center">
      <Button
        size="large"
        type="primary"
        onClick={() => {
          incrementCount();
          console.log({ count });
        }}
      >
        Increment Count
      </Button>
      <code>{JSON.stringify({ count })}</code>
    </div>
  );
};
```

Once I had the all necessary elements, I had to ensure that I could deploy it. Vercel has been a faily reliable platform for hosting projects like these. Again, if you're interested in these details, check out my starter template, [react-vite-template](https://github.com/andreortiz82/react-vite-template), on Github.
