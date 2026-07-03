---
title: "Ontology Design Guide"
description: "A design guide for deciding which DevRev object your company's data belongs in, and how to structure it"
---

# Ontology Design Guide

This page helps you decide **what goes where** when bringing your company's data into DevRev. It is not a how-to for the UI — it teaches the way of thinking.

By the end, you should be able to:

- Look at any piece of your company's data and know which object it belongs in
- Tell whether the standard objects are enough or you need a custom object
- Picture how your data connects, and see the value those connections unlock

For the full object catalog, diagrams, and link rules, see the [Object model reference](/en/reference/architecture). For a tutorial on the data model, see [s03](/en/s03).

## The five questions — every piece of business data answers one

All of your company's data answers one of five questions.

| # | Question | Object |
|---|------|--------|
| 1 | Who is involved? | Account / RevUser / DevUser |
| 2 | What do you offer? | Parts (Product / Capability / Feature) |
| 3 | What is happening? | Ticket / Issue / Incident, plus Enhancement |
| 4 | What are you trying to sell, and to whom? | Opportunity |
| 5 | What do you know? | Article |

Only data that answers none of these questions is a candidate for a custom object.

### Why these five

Most businesses run on this cycle:

```
Sell to customers → customers use the product → problems arise → the team responds → improve → deliver value again
```

The information flowing through this cycle boils down to people, offerings, work, deals, and knowledge. DevRev makes these five its core structure so the whole cycle connects in one place.

## 1. Who is involved — Account / RevUser / DevUser

People and organizations fall into three groups.

- **Account** — companies you do business with: customers, partners and resellers, vendors. One record = one company.
- **RevUser** — the individuals at those companies: points of contact, people who file requests, deal decision-makers, and the end users of your product.
- **DevUser** — everyone inside your own company who uses DevRev: support, sales, engineering, PM. Teams and departments can be modeled as groups.

**Key point:** a single RevUser can be linked to multiple Accounts. A partner's sales rep covering several end customers, or someone working across group companies, does not need duplicate records. People whose company is unknown — leads, freelancers — can be registered without an Account link and attached later.

### Quick sorting table

| Your data | Where it goes |
|---|---|
| Customer company list | Account |
| Customer contact list | RevUser |
| Business cards | RevUser (company side becomes an Account) |
| Employee roster | DevUser |
| Department list | Groups |
| Reseller list | Account (distinguish with a tag) |

## 2. What you offer — Parts (up to 4 levels)

Model what your company offers as Parts. This is not a mere catalog — it is **the map that tells you which part of your offering every request and every piece of work relates to**.

| Level | Object | Meaning |
|---|---|---|
| Level 1 | Product | The thing customers name when they say "we use your ___" |
| Level 2 | Capability | Major functional areas or modules (e.g. journal entry, reports, expense management) |
| Level 3 | Feature | The smallest unit a customer points at when saying "this works well" or "this is broken" (e.g. PDF export, CSV export) |
| Level 4 | Builder Parts (Sub-feature / Runnable / Linkable) | The implementation behind the scenes: sub-features, microservices, APIs, internal modules |

Levels 1–3 are the customer-facing structure (customer parts); level 4 is for builders (builder parts). This is not software-only: for industrial equipment think "arm control → collision detection"; for consulting, "strategy → KPI design". The rule is simply to **decompose by what customers talk about**.

**What level 4 (Builder Parts) buys you:**

- Issues can be tied to the specific technical component they concern
- Pull requests automatically trace to the customer-facing feature they affect
- During an outage you instantly see which customer features are impacted by a failing service

Not everyone needs level 4. Use it when the engineering team wants to connect code to product structure. Levels 1–3 are enough for customer-facing work.

### Why structure it at all

With structure in place, you automatically learn:

- **Where requests concentrate** → improvement priorities become visible
- **How many companies an outage here would affect** → impact is immediately clear
- **Which improvements customers want most** → input for the roadmap

Without structure, 100 tickets arrive and you cannot tell where they cluster — you end up aggregating spreadsheets by hand, and things still slip through.

### How fine-grained should you go

Do not aim for perfection.

| Situation | Recommendation |
|---|---|
| One simple offering | 2 levels (Product + Feature) is enough |
| One feature-rich offering | Use 3–4 levels |
| Multiple offerings | 2–4 levels under each Product |
| Engineering wants in too | Model services and components at level 4 |

**Start with just your top 5–10 items.** As requests come in and you decide where each belongs, the structure grows naturally. A Parts hierarchy design exercise is available in [s03](/en/s03).

## 3. What is happening — Ticket / Issue / Enhancement / Incident

Classify day-to-day work by who it is for.

### Ticket (work for a customer)

Work you promised a customer after they asked: support requests, bug reports, feature requests, complaints.

**What they share:**

- There is always a requester
- You owe the customer a "this is resolved" reply
- A response deadline is expected

### Issue (internal work)

Work your team decided to do on its own. Customers do not directly know it exists: development tasks, bug fixes, initiative work, research.

### The Ticket–Issue link — the most important idea on this page

**Customer work spawns internal work.**

```
Customer: "PDFs in the report come out garbled" (Ticket)
     │
     ▼ Support investigates and files work for engineering
     │
Internal: "Fix font handling in the PDF generation library" (Issue)
     │
     ▼ Fix complete
     │
Tell the customer "it's fixed" and close the Ticket
```

Keeping this link intact means:

- No customer reply falls through the cracks (no more "fixed it, forgot to tell them")
- You can list exactly which customers' problems are still open
- "How many customers does this one bug affect?" becomes a number

The relationship is many-to-many: one Ticket can split into several Issues, and one Issue can resolve several customers' problems at once.

### Enhancement

A larger theme or improvement project that groups multiple Issues — what you may call an epic, project, or initiative. In DevRev, an Enhancement is a **Part**, not a Work item, acting as the parent of multiple Issues (see the [Object model reference](/en/reference/architecture)).

```
Enhancement: "Mobile support"
  ├── Issue: "Responsive design"
  ├── Issue: "Touch interaction tuning"
  ├── Issue: "Mobile API"
  └── Issue: "Offline mode"
```

Progress on "Mobile support" then rolls up automatically from the Issues beneath it.

### Incident

An abnormal event in your system or service. Incidents are kept separate from regular work because their urgency differs and impact must be assessed immediately.

### Work triage flow

```
Is it something to be done?
│
├── Yes → who asked for it?
│   │
│   ├── A customer → Ticket
│   │
│   └── Ourselves → how big?
│       │
│       ├── Small task → Issue
│       │
│       └── Multiple people, weeks or more → Enhancement
│              └── with individual Issues underneath
│
├── A system outage → Incident
│
└── No → consider other objects
```

## 4. Deals and knowledge — Opportunity / Article

### Opportunity

Tracks deals in motion that have not closed yet. It carries the target Account, amount, win probability, stage, owner, and expected close date.

**An Opportunity is the pre-commitment state.** If you need to manage post-signature artifacts like contracts and orders, those are custom-object candidates (see below).

### Article

Knowledge accumulated by your organization: FAQs, manuals, internal runbooks, release notes.

**Articles connect to other objects:**

- Answer a Ticket by pointing to an Article
- Package recurring questions for reuse
- A richer knowledge base reduces incoming requests in the first place

For permissions details, see [Article access control](/en/reference/article-access-control).

## 5. The power of connections — what linked data reveals

DevRev's biggest value is not what sits inside each object, but the connections between objects.

### The full picture

```
RevUser (Ms. Tanaka, Director)
    │ belongs to
    ▼
Account (Company A)
    │                          │
    ▼                          ▼
Opportunity                 Ticket
"Annual renewal"            "Reports are slow"
                                │
                                ▼
                            Issue
                            "Optimize SQL queries"
                                │
                                ▼
                            Feature
                            "Automated monthly reports"
                                │
                                ▼
                            Product
                            "Cloud accounting suite"
```

### Questions the connections can answer

| What leadership asks | What answers it |
|---|---|
| Which customers near renewal have unresolved problems? | Opportunity (renewal date) + Account + open Tickets |
| Which area got the most requests this quarter? | Aggregate Ticket → Parts |
| How many companies did this outage affect? | Incident → Parts → Ticket → Account |
| Which improvement do customers want most? | Ticket (requests) → Issue → Enhancement |
| How many open requests would shipping that improvement clear? | Enhancement → Issue → Ticket count |

### What it takes to keep connections alive

**Do these two things:**

- When filing a Ticket, pick which Part it concerns
- When creating an Issue, link the Ticket that triggered it

**These connect automatically (no manual work):**

- RevUser ↔ Account (inferred from email domain)
- Which Account a Ticket belongs to (inferred from the requester)

## 6. When standard objects are not enough — deciding on custom objects

The extension mechanisms themselves (custom fields, subtypes, custom objects and how to configure them) are covered in the "Extension mechanisms" section of the [Object model reference](/en/reference/architecture). This section covers **how to decide which one to use**.

### Ground rule

**First ask whether a standard object plus custom fields will do.**

Most of the time you do not need a custom object.

| What you want | The right approach |
|---|---|
| Add "industry" and "plan" to customer records | Custom fields on Account |
| Split Tickets into "returns", "outages", "questions" | Ticket subtypes |
| Add bug-specific fields to Issues | A "Bug" subtype with its own fields |

### Five patterns that call for a custom object

**Pattern 1: A "thing" that matches no existing concept**

What you manage is not a person, a Part, work, a deal, or a document.

- Maintenance contracts (validity period, coverage, SLA terms)
- License keys (issue date, expiry, assignee)
- Physical assets and devices (serial number, location, warranty)
- Internal request forms (travel requests, purchase requests)

**Pattern 2: Multiple independent records per parent**

"Can't we just add contract fields to the Account?" — not if one company holds several contracts, each with its own period and terms. Fields cannot express that.

- One company with multiple maintenance contracts
- One Opportunity with multiple quotes

**Pattern 3: A lifecycle of its own**

The data has its own stage flow.

- Quote: draft → submitted → approved → won/lost
- Approval request: drafted → manager approval → finance approval → done
- Job candidate: applied → screening → interview → offer → hired/declined

**Pattern 4: No standard counterpart for an external system's data**

You are importing data from another tool and nothing standard maps to it.

- CRM quotes, orders, invoices
- Inventory data from an internal ERP

**Pattern 5: High-volume data you want to search and analyze independently**

You could stuff it into fields on a standard object, but the volume or nature does not fit.

- Alert streams from IoT sensors
- E-commerce order data

### When NOT to create a custom object

| What you want | No custom object needed — do this |
|---|---|
| Finer Ticket categories | Create subtypes |
| Add "root cause" / "blast radius" to Issues | Add custom fields |
| Flag VIP customers | A tag or custom field |
| Different kinds of Opportunities | Create subtypes |

### Decision flow

```
You have data to manage
│
├── People or organizations? → Account / RevUser / DevUser
│
├── The structure of your offering? → Parts (up to 4 levels)
│
├── Work to be done? → Ticket / Issue / Enhancement / Incident
│   │
│   └── Missing information?
│       ├── A few extra fields would do → custom fields
│       └── Different kinds need different info → subtypes
│
├── A deal? → Opportunity
│
├── A document? → Article
│
└── A standalone "thing" that is none of the above?
    ├── Multiple records per parent? → custom object
    ├── Its own lifecycle? → custom object
    └── High-volume, independently searchable? → custom object
```

## 7. Importing from external tools — what lands where

For a terminology cross-reference see [s03](/en/s03); for AirSync/ADaaS implementation details see the [ADaaS Reference](/en/reference/adaas-reference). This section maps the destinations.

### CRM (Salesforce / HubSpot / Dynamics, etc.)

| Source data | Destination in DevRev | Notes |
|---|---|---|
| Account / Company | Account | |
| Contact | RevUser | |
| Lead | RevUser | Company can be unknown |
| Opportunity / Deal | Opportunity | |
| Quote | Custom object | No standard counterpart |
| Order | Custom object | Same |

### Support (Zendesk / Freshdesk / Intercom, etc.)

| Source data | Destination in DevRev | Notes |
|---|---|---|
| Ticket / Case / Conversation | Ticket | |
| Organization | Account | |
| User / End User | RevUser | |
| Agent | DevUser | |
| Knowledge base article | Article | |

### Development (Jira / Azure DevOps / Linear, etc.)

| Source data | Destination in DevRev | Notes |
|---|---|---|
| Issue (Bug / Story / Task) | Issue (distinguish with subtypes) | |
| Epic | Enhancement | Parent of multiple Issues |
| User | DevUser | |
| Sprint | DevRev's Sprint feature | |

### Code hosting (GitHub / GitLab)

| Source data | Destination in DevRev | Notes |
|---|---|---|
| Repository | Builder Parts | |
| Pull Request / Commit | Linked to Issues | Events that signal progress |

### Data warehouse (Snowflake / BigQuery, etc.)

| Source data | Destination in DevRev | Notes |
|---|---|---|
| Customer tables | Account / RevUser | |
| Deal tables | Opportunity | |
| Everything else | Custom objects | Can be auto-generated per table |

### How to think about mapping

**Ask "is it the same concept?"**

- Their "account" and DevRev's Account → same concept → map directly
- Their "issue" and DevRev's Issue → same concept → map directly
- Their "quote" → no standard DevRev counterpart → custom object

**When there is no counterpart, your options are:**

1. Create a custom object
2. Express it with a subtype plus custom fields on an existing object
3. Do not import it at all (not everything needs to live in DevRev)

## 8. Design examples by industry

### Example 1: B2B SaaS

```
Account  = subscribing customer companies
RevUser  = customer admins and end users
DevUser  = your sales, CS, engineers

Product    = "Marketing automation"
Capability = "Email campaigns", "Lead management", "Analytics"
Feature    = "A/B testing", "Scoring", "Funnel analysis"

Ticket      = requests, feature asks, bug reports
Issue       = engineering work
Enhancement = quarterly improvement themes
Opportunity = new contracts, upsells
Incident    = service outages

Article = help center articles, internal support knowledge

→ Custom objects are often unnecessary
  (consider "Subscription" if contract management is complex)
```

### Example 2: Manufacturing (industrial equipment)

```
Account  = buyers and distributors
RevUser  = purchasing staff, facility managers
DevUser  = sales, field engineers, designers

Product    = "Industrial robot X series", "Control unit Y series"
Capability = "Arm control", "Safety systems", "Communication module"
Feature    = "Collision detection", "Remote operation", "Predictive maintenance alerts"

Ticket      = repair requests, technical questions, parts orders
Issue       = design changes, firmware fixes
Enhancement = next-generation model improvements
Opportunity = large orders
Incident    = critical defects in shipped units

Article = user manuals, maintenance guides

Custom object candidates:
- "Installed unit" (serial number, location, warranty expiry)
- "Maintenance contract" (covered units, scope, SLA)
- "Part" (part number, stock, compatibility)
```

### Example 3: Consulting firm

```
Account  = client companies
RevUser  = client contacts and decision-makers
DevUser  = consultants, managers, partners

Product    = "DX consulting", "M&A advisory"
Capability = "Assessment", "Strategy", "Execution support", "PMO"
Feature    = "Process mapping", "KPI design", "Change management"

Ticket      = additional requests, questions
Issue       = deliverable creation, analysis work
Enhancement = project-wide milestones
Opportunity = new engagements, renewals

Article = proposal templates, industry insights, methodology docs

Custom object candidates:
- "Project" (duration, budget, phase, members)
- "Deliverable" (name, delivery date, approval state)
```

### Example 4: Staffing agency

```
Account  = hiring companies (clients)
RevUser  = HR contacts, hiring managers
DevUser  = recruiters, sales, coordinators

Product    = "Placement service", "Temp staffing service"
Capability = "Candidate sourcing", "Matching", "Follow-up"
Feature    = "Skill search", "Interview scheduling", "Post-hire follow-up"

Ticket      = "we need someone like this" requests
Issue       = candidate handling, document prep
Opportunity = winning job orders

Article = hiring trends by industry, interview guides

Custom object candidates:
- "Candidate" (skills, experience, preferences, stage)
- "Job posting" (position, terms, channel)
- "Staffing contract" (period, rate, renewal terms)
```

## 9. How to run the design process

### Step 1: Inventory your data

List the data your company manages today: CRM, support tools, project trackers, spreadsheets, internal systems, even paper ledgers. A level like "customer master", "deal list", "request history", "development backlog" is plenty.

### Step 2: Sort

Assign each dataset using the five questions.

| Your data | Object |
|---|---|
| Customer master | Account + RevUser |
| Deal list | Opportunity |
| Request history | Ticket |
| Development backlog | Issue |
| Knowledge articles | Article |
| Maintenance contract ledger | → fits nothing standard → custom object candidate |
| Employee roster | DevUser |
| Product catalog | Parts (up to 4 levels) |

### Step 3: Scrutinize the custom object candidates

For everything that "fits nothing standard", check:

1. **Can a standard object really not express it?** Reconsider custom fields or subtypes first.
2. **Does it need to live in DevRev at all?** If it connects to nothing else, leaving it in the external system may be fine.
3. **What should it link to?** If you do create it, decide how it connects to Accounts, Tickets, and the rest.

## Common design questions

### One contact works with several companies

Common. A single RevUser record can be linked to multiple Accounts — no per-company copies needed. Typical cases: a partner rep covering several end customers, someone working across group companies, or a contact who changed employers.

### Do I have to get the design right up front?

No. Everything can be extended later. Starting with just Accounts, a 2–4 level Parts hierarchy, Tickets, and Issues is fine. Add custom fields or custom objects once real usage shows what is missing.

### Should data already managed in other tools move into DevRev?

Decide by whether connections to other DevRev data create value.

- **Bring in:** customer data, requests, development work, deals — connecting these reveals the full picture
- **Fine to leave out:** payroll, expense reports — weak connection to customer work and product development

### A piece of data seems to fit two objects

Use these tie-breakers:

- Does a customer interact with it directly? → leans Ticket
- Does it stay entirely internal? → leans Issue
- Is it about money? → leans Opportunity

When in doubt, match the most common usage; absorb the exceptions with subtypes or custom fields.

### Subtype vs. custom object

- **Subtype** = same object, slightly different extra information per kind (e.g. an Issue subtype "Bug" carries "root cause" and "repro steps")
- **Custom object** = fundamentally different in nature from every existing object (e.g. a "maintenance contract" is neither work nor a deal)

Rule of thumb: a variation of an existing object → subtype. An entirely different concept → custom object.

## Summary

1. **There are five kinds of objects** — people (Account / RevUser / DevUser), Parts, Work (Ticket / Issue / Incident), Opportunity, and Article
2. **Most data fits the standard objects** — fill gaps with custom fields and subtypes
3. **Create custom objects only for what does not fit** — judge by whether it is conceptually a different thing
4. **The connections between objects are the biggest value** — for isolated record-keeping, existing tools suffice; DevRev's power is in the links
5. **You do not need to be perfect on day one** — grow the structure as you use it
