---
title: "Memory vs fetch-based AI: accuracy and cost"
description: "CTO office perspective on why schema-aware memory beats session-by-session fetching (accuracy, tokens, and time)"
---

# Memory vs fetch-based AI: accuracy and cost

This reference summarizes two public posts from DevRev’s CTO office on why “connected” general-purpose AI can still produce confident-but-wrong answers, and why token/time costs compound when an assistant has to rediscover schema every session.

The key distinction is **retrieval architecture**, not just model quality:

- A **fetch-based assistant** (even with API/MCP access) often has to **discover schema**, **load raw data**, and **reconstruct relationships** inside the model each session.
- A system with **shared, persistent memory** can **read authoritative relationships** (typed edges) and answer from the data with deterministic queries, returning only what is needed.

## 1) When the answer looks right but is wrong (inferred structure)

If an assistant cannot read authoritative relationships, it may infer structure from naming patterns (IDs, titles, numbering conventions). The result can look correct while being wrong, and the burden shifts to the human to already know what to verify.

Practical takeaways:

- Prefer answers that are built from **typed relationships** in the system of record (not inferred from text patterns).
- Ask “**how was this constructed**?” and require a reproducible path (edges/joins) when decisions depend on it.

## 2) Starting from zero every morning: why tokens/time compound

When an assistant has to explore schema and load raw data into context each time, cost tends to scale with **source data volume** (and repeated discovery). When a system has a persistent, permissioned memory layer (e.g., a knowledge graph + deterministic querying), cost scales more with the **result set** than the source.

What drives the cost in practice:

- **Schema exploration**: discovering projects, custom field IDs, join keys, link semantics
- **Bulk payloads** returned from tools during exploration and sampling
- **Repeated work** every session because the assistant does not retain a shared map of your data model

Benchmarks reported in the posts (illustrative, same business query repeated):

- One comparison reported ~**3.2M tokens** and ~**8m50s** per run vs ~**157k tokens** and ~**1m36s** per run (≈95% fewer tokens, ≈5.5× faster).
- Another example highlighted ~**616,843 tokens** vs ~**169,986 tokens** on corrected/authoritative runs (≈72% fewer tokens).

Practical takeaways:

- Treat schema knowledge and relationship mapping as a first-class layer (CPU/deterministic) rather than “reasoning inside the model.”
- Optimize retrieval to return only the rows needed for the question, with evidence attached.

## Differentiation: what “Computer + Memory” changes

From these posts, the differentiators are consistently about **authoritative traversal and evidence**:

- **Authoritative relationships**: part hierarchies, issue↔part mapping, ticket↔account mapping are read from explicit edges—not inferred.
- **Deterministic querying for structured data**: compute joins/filters outside the model (CPU), and send back only the result set.
- **Semantic retrieval without loading content**: rank knowledge results without stuffing full articles into the model context.
- **Evidence-first answers**: the system can show how each row was derived (which links/edges were followed).

## References

- [Right or wrong - flip a coin?](https://www.linkedin.com/pulse/right-wrong-flip-coin-jeff-smith-0frke/)
- [Your AI starts from zero every morning — the costs compound](https://www.linkedin.com/pulse/your-ai-starts-from-zero-every-morning-costs-compound-jeff-smith-wnele/)

