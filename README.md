# Inclusiv

_“A job portal built for everyone. Especially those usually left out.”_

---

## Introduction

Picture this: You're a talented developer. You're in a wheelchair. You spend days scrolling through job boards, opening 57 tabs, and reading between the lines of every "We're an equal opportunity employer" blurb just to figure out if the building has an elevator.

Sound exhausting? That’s exactly why Inclusiv exists.

**Inclusiv** is a carefully crafted, AI-enhanced job portal designed to do one thing right: **find jobs that are actually inclusive** — for people with disabilities, marginalized backgrounds, or anyone who’s tired of guessing whether “we value diversity” really means something.

---

## Why This Project?

### The Short Version

Most job portals are built for speed. Inclusiv is built for **empathy**.

### The Long Version

While building tech products, we often optimize for the majority. Clean UIs, blazing-fast filters, clever UX patterns. But what happens when you stop and ask: "Is this job accessible to someone with mobility issues?" or "Will this employer respect neurodivergent candidates?" Most platforms don't even attempt to answer.

So, we did.

Inclusiv isn’t just a scraper or another listings site. It’s a statement: **Technology should serve the edges, not just the middle**.

We collect jobs from real-world companies and assess them based on indicators of inclusion — then present them with clarity, context, and respect.

---

## What It Does

Inclusiv fetches and filters job listings from open job board APIs (like Greenhouse) and passes them through a logic-driven inclusivity filter. That means we try to understand:

- Does the company mention disability inclusion?
- Are there remote or flexible options?
- Do they have a public DEI (Diversity, Equity, and Inclusion) policy?
- Are the descriptions accessible in language and structure?

And most importantly: **Would someone who is typically excluded feel welcome here?**

We don’t rely on guesswork — we analyze the job description text using actual natural language processing tools. Think of it as an accessibility-aware search engine, minus the corporate fluff.

---

## Features

- **Inclusive Job Detection**  
  Intelligent parsing of job descriptions to detect inclusive signals like DEI statements, accessibility mentions, and flexible work policies.

- **Multi-Source Aggregation**  
  Jobs are pulled from various companies via their Greenhouse boards, including Code for America, ProPublica, Hebbia, Notion, and more.

- **Clean Frontend Interface**  
  Accessible HTML + TailwindCSS-based UI (React optional). No logins. No clutter. Just the jobs.

- **Fast Go Backend**  
  Written in idiomatic Go, dockerized for easy deployment. Fast, lightweight, and scalable.

- **Portable and Open Source**  
  MIT-licensed. Plug-and-play for anyone looking to host or modify their own inclusive job portal.

---

## Live Demo?

Not yet — but coming soon. Until then, clone the repo, run it locally (see below), and experience the magic for yourself.

---

## How It Works (A Brief Technical Tale)

### The Backend

Powered by Go, the backend does the heavy lifting. It fetches job data from multiple companies via the Greenhouse API, then processes each job listing using inclusive detection logic.

```go
func FetchJobs(apiURL string) ([]Job, error) {
  // Fetch job postings from Greenhouse
  // Apply inclusive criteria
  // Return clean job list
}

We respect user-agent headers. We avoid unnecessary retries. We do one thing well: fetch jobs, then tell you which ones are likely worth your time.
Inclusivity Detection

You can think of this as a mini-critic with a magnifying glass. We check job descriptions for terms that indicate:

    Wheelchair accessibility

    Remote work flexibility

    Gender-neutral language

    Neurodiversity-friendly environments

    Genuine diversity policies (not just buzzwords)

The current model uses a rule-based parser (soon to be upgraded to a small language model or in-house embedding matcher). It’s not perfect, but it’s better than squinting through 300 listings.
Project Structure

Inclusiv/
├── backend/
│   ├── main.go               # Entry point
│   ├── jobfetcher.go         # Job fetching & parsing logic
│   ├── utils.go              # Utilities
│   ├── models.go             # Job structs
│   └── docker-compose.yaml   # Compose file
├── frontend/
│   ├── index.html            # Main UI
│   ├── tailwind.config.js    # Styling setup
│   └── styles.css            # CSS classes

How to Run It
Prerequisites

    Go 1.20+

    Docker & Docker Compose

    Node.js (for Tailwind, optional)

Quickstart

# Backend
cd backend
go run main.go

# Or, use Docker
docker compose up --build

# Frontend (static for now)
cd frontend
open index.html

Boom. You’re now staring at jobs handpicked (by code) for inclusion.
Roadmap

    Replace Hugging Face API with local NLP model or embedding classifier

    Add company profiles with inclusion ratings

    Weekly digest or job alert emails (with opt-in)

    Add GitHub OAuth for bookmarking jobs (optional)

    Publish the Inclusiv Score algorithm as an open framework

Contributing

This project is built with love, irritation (at inaccessible job portals), and a desire to do better. If you believe in the cause, want to improve the parser, or just like Go and accessibility, you’re welcome here.

Submit an issue. Fork the repo. Build something better.
License

MIT. Use it for good. Don’t resell it as another VC-funded clone without at least sending us a thank-you note.
A Final Word

Inclusiv doesn’t promise to solve inequality. But it does promise to start somewhere.

It won’t fix systemic hiring biases, but it will refuse to ignore them.

It’s not perfect. But it is open. It’s improving. And it’s real.

If you've ever felt left out of the tech job market, Inclusiv was built for you.

If you've never had to think about that — Inclusiv was built for you, too.

Now go hire better.

—
Team Inclusiv
