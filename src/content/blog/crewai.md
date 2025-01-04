---
layout: "../../layouts/BlogPost.astro"
title: "CrewAI"
description: "Building an agentic workflow"
pubDate: "May 5 2024"
heroImage: "https://picsum.photos/1920/400"
tags: ["AI Agents", "Automation", "Python"]
---

CrewAI is a framework that brings together a multiple AI agents to work as a team, like a crew! These agents have different roles, goals, and tools, and they collaborate to tackle complex tasks. It's pretty amazing how they all come together and make things happen! Check out [this project](https://github.com/andreortiz82/crew-template) to see how it all comes together.

Here are the core concepts for CrewAI:

**Agent:** Agents are autonomous AI entities with specific roles, goals, and backstories. They can be configured to use various tools and possess memory capabilities to retain information across interactions.

```yaml
creative_writer:
  role: >
    Creative Writer
  goal: >
    Write a captivating {story_type} based on creative idea
  backstory: >
    You're a talented writer with a flair for writing {story_type}. You're known for
    your ability to bring imaginative ideas to life through your writing, creating
    captivating narratives that transport readers to other worlds. You always conform to this structure: {structure}.
```

**Task:** Tasks are specific assignments given to agents. Each task has a description, expected output, and can utilize certain tools.

```yaml
creative_writer_task:
  description: >
    Write a creative {story_type} based on the creative idea.
  expected_output: >
    A creative {genre} {story_type} based on the creative idea.
    The story should be engaging and transport the reader to another world.
```

**Tool:** Tools are external integrations or utilities that agents use to perform their tasks. They can be APIs, databases, web scraping tools, etc.

```python
# Importing crewAI tools
from crewai_tools import (
    DirectoryReadTool,
    FileReadTool,
    JSONSearchTool,
    CSVSearchTool,
    CodeDocsSearchTool,
    GithubSearchTool,
    WebsiteSearchTool,
    PDFSearchTool,
    RagTool,
    ScrapeWebsiteTool
)
```

**Crew:** A crew is a collection of agents working together to achieve a common goal. It is defined by the agents involved, the tasks they need to accomplish, and the process by which they operate.

```python
crew = Crew(
  agents=[writer, illustrator, narrator],
  tasks=[write_story, create_illustration, tell_story],
  process=Process.sequential
)
```
