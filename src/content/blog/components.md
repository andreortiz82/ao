---
layout: "../../layouts/BlogPost.astro"
title: "Developing Components"
description: "Using Atomic principals to stay organized"
pubDate: "2024"
heroImage: "/covers/4.png"
tags: ["Tailwind", "Front-end", "React", "Design Systems", "Storybook"]
---

## Atomic Patterns

I'm a fan of the [Atomic Design Principals](https://atomicdesign.bradfrost.com/) by Brad Frost. In my experience working on design systems, I've found this method is great for organization and for communicating component concepts with engineering product and teams. In short, _Atomic_ design is a mental model for thinking about user interfaces as both a cohesive whole and a collection of parts.

<div class="w-full m-auto my-[40px] p-3 bg-zinc-50 rounded">
<img src="/art/atomic-design.png" alt="atomic"/>
</div>

In my past experience, I've used UI component libraries like [Ant Design](https://ant.design/) and [JoyUI](https://mui.com/joy-ui/getting-started/?srsltid=AfmBOoqxoUgnfhsUSfosl1lHxUM1eXHTmwOx8vSVU4_f1pF3FN04Z_EE) to serve as my Atoms. This enables me to prototype my ideas faster since I don't have to develop components like Buttons and Inputs from scratch.

```js

// Importing Atoms from a third-party lib
import { Button, Card, Statistic, Space } from 'antd';

// Constructing Molecules or Organizms
const AwesomeMolecule = (props) => {
    const { some_prop } = props

    // This could be a response from an API
    const statistics_data = [
        {title: 'Foo', amount: 100},
        {title: 'Bar', amount: 200},
        {title: 'Zap', amount: 300}]

    return (
        <section className="custom-class-added-for-scoping">
            <Card title="Awesome" >
                <div className="flex gap-4">
                    {statistics_data.map(({title, amount}) => {
                        return (<Statistic key={title} title={title} value={amount} />)
                    })}
                </div>
                <div>
                    <Space>
                        <Button type="primary">Action</Button>
                        <Button>Operation</Button>
                    </Space>
                    {some_prop} ... more Atoms
                </div>
            </Card>
        <section>
    )
}

```

So now you have a bunch of code as a result of your prototyping. If you're working with a team (or working solo), abstracting your functionality into a reuseable component is a solid next step. The next level maneuver would be to incorporate a gallery using a tool like [Storybook](https://storybook.js.org/).

<div class="w-full m-auto my-[40px] p-3 bg-zinc-50 rounded">
<img src="/art/storybook.png" alt="storybook"/>
</div>

Working in this manner has improved how I collaborate with my teams - Design can realize a vision, product can verify that business objectives are being met, and engineering develop with confidence.
