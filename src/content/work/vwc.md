---
layout: "../../layouts/WorkPost.astro"
title: "Visit Window Calculator"
description: "Removing complexity and reducing schedule deviations for clinical trials."
pubDate: "2025"
heroImage: "/covers/18.png"
tags: ["Product Design", "Healthcare", "Design Systems"]
role: ["User Research", "Product Design (UI/UX)", "Front-end Prototyping"]
team: ["1 Senior Product Designer", "1 Product Manager", "5 Engineers"]
password: "true"
---

Patients that enroll in a clinical trial often have to follow a strict schedule. Those schedule requirements are outlined in the protocol of every trial - referred to as the _Schedule of Events (SOE)_. Typical visit schedules contain a _Target Date_ and a _Visit Tolerance_. For example, a patient visit might have a target date for Visit 1 on **January 10th** with a visit tolerance of _-3/+3_ - meaning the patient can be scheduled within a window of **January 7th - 13th**. Anything outside of that window is considered a deviation. Calculating a visit schedule is complex and can be time consuming for each patient.

<div class="w-full m-auto my-[40px] p-3 bg-zinc-50 rounded">
<img src="/art/vwc-visit-window.png" alt="visit-window"/>
</div>

### Problems

- Calculating a visit schedule is time consuming
- Calculated visit schedules can be inconsistent and may lead to schedule deviations
- Calculations cannot be distributed securely
- Tracking activites performed at every visit is inconsistent

### Research

We spoke to a number of Clinical Research Coordinators (CRC) with contrasting backgrounds and similar responsibilities.

**CRC Responsibilities**

- Recruitment and Screening tasks
- Coordinate participant scheduling and follow-up
- Ensure participant safety and comfort throughout the study
- Collect, validate, and manage clinical research data
- Maintain accurate and comprehensive research documentation
- Ensure compliance with FDA regulations and research ethics
- Manage study-related adverse event reporting
- Maintain strict confidentiality of participant information

<div class="w-full m-auto my-[40px] p-3 bg-zinc-50 rounded">
<img src="/art/vwc-personas.png" alt="personas"/>
</div>

### Iteration 1

Our first move was to build the calculator at the trial configuration level. This would provide the user with a quick way generate a schedule visit schedule with minimal inputs.

<div class="flex gap-5">
    <article>
        <h4>Our Assumption</h4>
        <ul>
            <li>The user can simply enter a date for the screening visit to run the calculation</li>
            <li>Calculations can be saved or exported to the patient's binder</li>
        </ul>
    </article>
    <article>
        <h4>What we learned</h4>
        <ul>
            <li>Users want to run this calculation at the patient level</li>
            <li>Displaying the calculated schedule on a patients profile is essential</li>
        </ul>
    </article>
</div>

<div class="w-full m-auto my-[40px] p-3 bg-zinc-50 rounded">
<img src="/art/vwc-trial-conf.png" alt="vwc-trial-conf"/>
</div>

### Iteration 2

As we learned more about the way sites manage patient visits, we decided to move the calculator into the patient profile so calculations can be configured at the patient level. The lifecycle of a visit requires some consideration. A scheduled protocol visit, once started, must be scheduled, executed, and completed with a specified time period.

<div class="flex gap-5">
    <article>
        <h4>Our Assumption</h4>
        <ul>
            <li>Moving the calculator to the profile is better for study coordination</li>
            <li>Display the scheduled appointments and activities together for better tracking</li>
            <li>Displaying warnings about deviations will encourage behavior</li>
        </ul>
    </article>
    <article>
        <h4>What we learned</h4>
        <ul>
            <li>Looking at the patient profile for scheduling details is better than looking at the site calendar</li>
            <li>Clear communication about a possible deviation reduces them by more than 30%</li>
        </ul>
    </article>
</div>

<div class="w-full m-auto my-[40px] p-3 bg-zinc-50 rounded">
<img src="/art/vwc-profile.png" alt="vwc-profile"/>
</div>

### Results

In the end, we built a tool that helps our site customers create visit schedules (as defined by a protocol) for patients enrolled in a trial.

- ~~Calculating a visit schedule is time consuming~~
  - Removed the need for custom Excel formulas or questionable online calculators
- ~~Calculated visit schedules can be inconsistent and may lead to schedule deviations~~
  - Visit schedules are configured on a trial basis according to their protocols
- ~~Calculations cannot be distributed securely~~
  - If our customer is part of a network, visit configurations can be shared
- ~~Tracking activites performed at every visit is inconsistent~~
  - All activities are tracked and available for billing.

<div class="w-full m-auto my-[40px] p-3 bg-zinc-50 rounded">
<img src="/art/vwc-full.png" alt="vwc-full"/>
</div>

<div class="w-full m-auto my-[40px] p-3 bg-zinc-50 rounded">
<img src="/art/vwc-form.png" alt="vwc-form"/>
</div>
