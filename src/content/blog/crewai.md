---
layout: "../../layouts/BlogPost.astro"
title: "CrewAI"
description: "An Agentic Framework"
pubDate: "May 5 2024"
heroImage: "/covers/5.png"
tags: ["AI Agents", "Automation", "Python"]
---

[CrewAI](https://www.crewai.com/) is a framework that enables you to create a team of AI chatbots that can work together toward a shared goal. Each chatbot in the crew, called _Agents_, contain their own set of instructions and together, they can complete specified tasks.

<div class="w-full m-auto my-[40px] p-3 bg-zinc-50 rounded flex items-center justify-center">
<img src="/art/ai-agents.png" alt="agents"/>
</div>

### Core Concepts

Here’s the 101 on CrewAI:

1. **Agents**: Think of these as the individuals in your team. Each agent has:

   - A **role** (e.g., researcher, writer, analyst).
   - A **goal** (what they’re supposed to achieve).
   - A **backstory** (a little personality never hurts).
   - **Tools** (optional, for special powers like searching the web and RAG).

2. **Tasks**: These are the jobs your agents need to complete. Tasks come with:

   - A detailed **description** so there's no room for confusion.
   - An **expected output** to set clear expectations.

3. **Tools**: Sometimes, agents need a bit of help. CrewAI supports built-in tools and third-party integrations (like APIs) to give your agents superpowers.

4. **Processes**: Define how your team works—whether tasks are done one at a time, all at once, or in a hierarchy of steps.

### Example:

Let’s say you want to create a crew that researches the latest _"economic news"_ and writes a summary. Here’s how you’d do it:

```python
from crewai import Agent, Task, Crew, Process
from crewai_tools import SerperDevTool

# Add a search tool for research
search_tool = SerperDevTool()

# Define your agents
researcher = Agent(
    role="Researcher",
    goal="Find the latest trends in {topic}",
    backstory="An expert at digging up fresh insights",
    tools=[search_tool]
)

writer = Agent(
    role="Writer",
    goal="Turn research into an engaging article",
    backstory="A storyteller at heart, great at simplifying complex ideas"
)

# Define the tasks
research_task = Task(
    description="Research {topic} and summarize findings.",
    expected_output="A summary of the research on {topic}.",
    agent=researcher
)

write_task = Task(
    description="Write an article based on the research on {topic}.",
    expected_output="A polished, engaging article on {topic}.",
    agent=writer
)

# Assemble your crew
crew = Crew(
    agents=[researcher, writer],
    tasks=[research_task, write_task],
    process=Process.sequential  # Tasks are completed one after another
)

# Kick it off
inputs = {"topic": "economic news"}
results = crew.kickoff(inputs=inputs)
print(results)
```

Check out [this project](https://github.com/andreortiz82/crew-template) to see how it all comes together.
