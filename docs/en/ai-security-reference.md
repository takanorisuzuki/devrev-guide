---
title: "AI/LLM Security & Data Protection Reference"
description: "Data processing, no-training guarantee, compliance certifications, and all information required for internal AI adoption approvals at enterprise customers."
---

# AI/LLM Security & Data Protection Reference

This reference consolidates the information needed for internal AI adoption approvals and security reviews. It supplements the AI architecture introduced in [s01](/en/s01) with a data protection and compliance perspective.

---

## Background: DevRev's AI Capabilities

DevRev is designed as an AI-native platform — AI is fully integrated, not bolted on. There is no need to separately procure or connect external generative AI services like Microsoft Copilot or ChatGPT.

Core AI capabilities:

- **Computer (conversational AI agent)** — SQL analysis, semantic search, action execution, automatic ticket classification and summarization
- **Computer for Your Customers (customer-facing AI)** — end-user AI chatbot, knowledge base answer generation

---

## Data Processing Architecture

Computer uses a hybrid Text2SQL + RAG architecture (see also "Computer Memory Architecture" in the [Object Model Reference](/en/reference/architecture)).

### Processing Flow

```
User natural-language query
  → Text2SQL (convert to SQL query against knowledge graph, execute)  ← DevRev infrastructure
  → Semantic search (RAG) to supplement with unstructured data        ← DevRev infrastructure
  → Build permission-filtered context                                  ← DevRev infrastructure
  → Send minimal context chunks only to LLM                           → External LLM inference
  → Return generated answer to user (logged to audit trail)
```

### Where Processing Happens

| Step | Location | Details |
|------|----------|---------|
| Text2SQL (structured data retrieval) | DevRev infrastructure | Natural language → SQL, retrieval from knowledge graph. Fully contained within DevRev |
| Semantic search / embedding generation | DevRev infrastructure | Open-source models. Vector index stored within DevRev |
| Knowledge graph | DevRev infrastructure | Customer data held in DevRev's secure cloud |
| LLM inference (generation) | External LLM provider | Only permission-filtered minimal context sent. Zero Data Retention contract |
| Audit log | DevRev infrastructure | All AI operations recorded. Full visibility |

4 of 5 processing steps complete within DevRev-managed infrastructure. Only permission-checked minimal context is sent to the external LLM.

### LLM Providers and Model-Agnostic Design

DevRev uses a model-agnostic architecture with no lock-in to a specific LLM vendor.

- Knowledge accumulates in DevRev's knowledge graph; the LLM is a swappable "inference engine"
- Model selection is configurable at the tenant level
- Can be configured to use only customer-approved models (e.g., Azure OpenAI only, self-hosted only)
- When a better model becomes available, it can be swapped instantly with no changes to the knowledge graph

All LLM provider contracts include **enterprise terms (customer data is not used for model training)**.

### Computer App (Desktop) Specifics

In Computer App (desktop), LLM inference requests are sent directly from the local Claude Code engine to the Anthropic API. Data retrieval from the DevRev platform occurs only via the MCP protocol.

| Item | Computer (Web) | Computer App (Desktop) |
|------|---------------|----------------------|
| LLM inference | Via DevRev-managed infrastructure | Direct from local machine to Anthropic API (Claude) |
| Data access | Completed server-side at DevRev | Connects to DevRev platform via MCP protocol |
| Runtime environment | Browser (SaaS) | User's local machine |
| Local file access | Not available | Available (with user permission) |

Desktop security protections:

- **No training use**: Anthropic API also under enterprise contract — training use of submitted data is prohibited
- **DevRev authentication**: MCP server connections authenticated via OAuth or PAT (Personal Access Token). Tenant isolation is maintained
- **Minimal data transmission**: DevRev's MCP server returns only permission-filtered data
- **Audit log**: Operations on the DevRev platform (data access via MCP) are recorded in the audit log
- **Local data protection**: Access to local files requires explicit user permission. Local files are never automatically sent to the DevRev platform

---

## Three-Layer "No Training" Guarantee

Customer data is protected from LLM training use through three independent layers.

### Layer 1: Enterprise Contracts with LLM Providers

DevRev's contracts with all LLM providers include:

- Explicit prohibition on using submitted data for model training
- **Zero Data Retention (ZDR)** — data sent for inference is not stored by the provider
- These are **standard enterprise contract terms** published by each provider, not DevRev-specific arrangements

### Layer 2: DevRev DPA (Data Processing Agreement)

- DevRev's DPA explicitly describes protections for AI processing scenarios
- **Contractually prohibits** sub-processors from using customer data for training
- DPA available at https://devrev.ai/legal/dpa

### Layer 3: Architectural Data Minimization

- Only **permission-filtered, query-relevant context chunks** are passed to the LLM
- Raw customer records and bulk data exports are never sent to the LLM
- Search, embedding, and vector indexing all **complete within DevRev's own infrastructure**

---

## Data Storage Regions and Cross-Border Transfers

### Available Regions

DevRev is hosted on AWS (primary) and GCP, with the following regions available for customer selection:

| Region | Location |
|--------|----------|
| US East | N. Virginia |
| EU Central | Frankfurt |
| AP South | Mumbai |
| AP Southeast | Singapore |
| AP Southeast | Sydney |
| AP Northeast | Japan |

Data is localized to the customer-selected region and **does not move outside that region**. Selecting the Japan region means data is held within Japan.

### Cross-Border Transfer Basis

- Data is held in the customer-selected region and does not cross regional boundaries
- DevRev's DPA includes EU Standard Contractual Clauses (SCCs), providing a contractual basis for cross-border data transfers under GDPR and equivalent frameworks
- Data sent for LLM inference is permission-filtered minimal context only; Zero Data Retention means immediate deletion post-inference

---

## DevRev Employee Access to Customer Data

DevRev employee access to customer data is strictly limited as follows:

| Item | Details |
|------|---------|
| Default access | **Disabled**. Access to production customer data is prohibited by default |
| Access grant conditions | Granted temporarily only when needed, after an approval process |
| Approver | Infrastructure and Security team reviews case by case |
| Access duration | Temporary — auto-expires after task completion |
| Monitoring | Continuous monitoring via Datadog, Prometheus, and Grafana |
| Background checks | Background checks conducted on employees |

Summary: DevRev employees have no open access to customer data. All access is governed by least privilege, requires approval, is time-limited, and is audited.

---

## Data Deletion and Retention

### Post-Contract Deletion

- All copies deleted within **30 business days** of the earlier of the service contract end date or user account deletion date
- Individual data deletion requests can be executed immediately from the user dashboard / data deletion feature

### Retention Periods

| Data type | Retention period |
|-----------|-----------------|
| Active data | Duration of service use; deleted within 30 days of deletion request |
| Backups | Retained for 12 months |
| Audit logs | Retained for a minimum of 7 years |

---

## Incident Notification Process

DevRev notifies customers of security incidents through the following process:

- **Documented incident response procedures** are in place and tested
- Incidents are classified by severity; classification level is recorded in the ticket
- Initial response SLA for production outages or critical business-impacting incidents: **60 minutes**
- Security incident notifications are made to affected customers without undue delay under DPA terms
- **Status page**: https://status.devrev.ai/ for real-time service availability

> DevRev notifies affected customers without undue delay after incident discovery, per DPA terms. Notifications include the nature of the incident, scope of impact, and measures taken.

---

## Compliance Certifications

| Certification / Standard | Status |
|--------------------------|--------|
| SOC 2 Type II | Certified |
| ISO/IEC 27001:2022 | Certified |
| HIPAA | Compliant (BAA available) |
| GDPR | Compliant (DPO appointed, EU SCCs in place) |
| CCPA | Compliant |

Latest certification reports available at [security.devrev.ai](https://security.devrev.ai/).

---

## Security Controls

| Item | Details |
|------|---------|
| Encryption at rest | AES-256 |
| Encryption in transit | TLS 1.2 / 1.3 |
| Architecture | Zero Trust. Mutual TLS enforced across the service mesh |
| Tenant isolation | Software and hardware-level isolation in multi-tenant environment. All DB queries include tenant identifiers |
| Access control | Object- and field-level RBAC with policy engine |
| SSO | SAML support. SSO integration with customer IdPs (Okta, etc.) |
| SCIM | Supported. Automates user provisioning and deprovisioning |
| MFA | Supported. Multi-factor authentication applicable to all system changes |
| Monitoring | Real-time monitoring (OTLP). Datadog / Prometheus / Grafana |
| Audit log | All operations (including AI) recorded. Minimum 7-year retention |
| Penetration testing | Regular third-party testing. Reports available from security portal |
| Vulnerability scanning | Continuous static vulnerability analysis |

---

## BCP / DR (Business Continuity and Disaster Recovery)

DevRev maintains documented BCP (Business Continuity Plan) and DRP (Disaster Recovery Plan).

| Item | Details |
|------|---------|
| Infrastructure | High-availability on Kubernetes (EKS) across 3 AWS Availability Zones |
| BCP/DRP testing | Simulation and testing conducted at least annually |
| Recovery team | DIRT (Disastrous Incidents Response Team). Three phases: Notification/Activation → Damage Assessment → Recovery |
| Backups | All production data stored in encrypted volumes. Backups retained 12 months |

> **Note**: Specific RTO/RPO guarantee values are agreed individually per SLA contract. Contact your account team for details.

---

## AI Governance and Safety Controls

### Prompt Injection Defense

DevRev implements multi-layered defense with a proprietary guardrail framework:

**Input guardrails (applied before reaching the LLM):**

- PII/PHI detection and masking
- Harmful content and out-of-scope request blocking
- Prompt injection detection and neutralization
- Input validation (adversarial input filtering)

**Output guardrails (applied before returning to user):**

- Factual accuracy verification (cross-check against knowledge sources)
- Sensitive data leakage prevention
- Tool call validity check (permission confirmation before execution)

### Hallucination Mitigation

- **RAG architecture**: Responses are generated only from information retrieved from the organization's own knowledge — not from the LLM's internal training data
- **Citation**: Responses always include source references, ensuring traceability
- **Human-in-the-Loop**: Confirmation workflows for high-risk actions can be configured
- **Deterministic validation**: Hard-coded business rule validation steps execute independently of LLM interpretation

### Reversibility of AI Actions

- All AI operations are versioned and can be rolled back immediately if issues arise
- Confirmation workflows can be configured before production changes take effect (staging → approval → apply)

### Permission Inheritance

- AI response scope is **limited to the querying user's access permissions**
- The knowledge graph automatically inherits ACLs (access control lists) from source systems
- The LLM executes within the user's context — no elevated or backdoor access is granted

---

## Frequently Asked Questions (Security Review)

**Q. Will our data be used to train AI models?**

No. DevRev does not use customer data for model training or fine-tuning of any kind. Enterprise contracts with all LLM providers include a Zero Data Retention (ZDR) policy — data sent for inference is neither stored nor used for training on the provider side.

**Q. Can data be stored in our region?**

Yes. DevRev offers multiple regions globally (US, EU, and Asia Pacific). Data is localized to your selected region and does not move outside it.

**Q. Is data sent outside our environment?**

For LLM inference, only permission-filtered minimal context chunks are sent to an external LLM API. Raw customer records and bulk data are never transmitted. Search and embedding processing completes within DevRev's own infrastructure. ZDR contracts ensure submitted data is immediately discarded post-inference.

**Q. Which LLMs does DevRev use?**

DevRev uses a model-agnostic architecture with no lock-in to a specific vendor. Model selection is configurable at the tenant level and can be restricted to customer-approved models only. No-training guarantees are in place with all providers.

**Q. Can DevRev employees access our data?**

Access to production customer data is disabled by default. It is granted only when necessary, through an approval process and on a temporary basis. All access requires case-by-case review by the Infrastructure and Security team and is recorded in the audit log.

**Q. When is data deleted after contract termination?**

All copies are deleted within 30 business days of the earlier of the service contract end date or user account deletion date.

**Q. When will we be notified in the event of an incident?**

Per documented incident response procedures and DPA terms, affected customers are notified without undue delay after incident discovery. Service outages are published in real time on the status page (status.devrev.ai).

**Q. Can our data be mixed with another company's data?**

No. Tenant isolation is enforced at both software and hardware levels — no cross-tenant data commingling is possible. All database queries include tenant identifiers to restrict access. AI responses are also limited to the requesting user's access scope.

**Q. Where is data sent in the Computer App (Desktop)?**

LLM inference requests are sent directly from the local Claude Code engine to the Anthropic API. Data retrieval from the DevRev platform occurs only via the MCP protocol. The Anthropic API is also under an enterprise contract, which prohibits the use of submitted data for training.

**Q. What documentation is available to demonstrate no training use?**

Three documents are available: (1) DevRev DPA (Data Processing Agreement), (2) Sub-processor list, and (3) SOC 2 Type II report. In addition, each LLM provider's published enterprise terms explicitly prohibit training use.

**Q. How are AI operations logged?**

All AI operations — who asked what, which data was referenced, what response was returned — are fully recorded in the audit log. Logs are retained for a minimum of 7 years, supporting compliance audits.

**Q. What protections exist against prompt injection and similar attacks?**

DevRev's proprietary guardrail framework provides multi-layer defense: prompt injection detection and blocking at the input stage, and factual accuracy verification and sensitive data leakage prevention at the output stage. Additionally, the permission model structurally prevents access to unauthorized data even if an injection attempt were to succeed — the AI can only access data within the querying user's permission scope.

---

## Available Documentation and Links

| Document | URL | Contents |
|----------|-----|---------|
| Security portal | https://security.devrev.ai/ | SOC 2 report, ISO 27001 certificate, penetration test reports |
| DPA (Data Processing Agreement) | https://devrev.ai/legal/dpa | AI processing terms, sub-processor management, data subject rights, cross-border transfer clauses |
| Sub-processor list | https://devrev.ai/security/sub-processors | Sub-processor details including LLM providers |
| Privacy policy | https://devrev.ai/legal/privacy-policy | Data collection and use policy |
| Terms of service | https://devrev.ai/legal/terms-of-service | Service terms |
| SLA | https://devrev.ai/legal/sla | Service level guarantees |
| Status page | https://status.devrev.ai/ | Real-time service availability |
| DPO contact | dpo@devrev.ai | Contact the Data Protection Officer |
| Security inquiries | security@devrev.ai | Security-related questions |

---

## Industry-Specific Compliance

| Requirement | Status |
|-------------|--------|
| GDPR (EU data protection) | Compliant — DPA with SCCs in place |
| HIPAA (US healthcare) | Compliant — BAA available |
| SOX / financial audit | Supported via 7-year audit log retention |
| Sector-specific requirements | Consult your account team for details |

---

## Where This Page Fits

| Reference | Related content |
|-----------|----------------|
| [s01](/en/s01) | Overview of Computer's four foundations |
| [Object Model Reference](/en/reference/architecture) | Computer Memory architecture, LLM loose coupling |
| [Memory & Cost Reference](/en/reference/memory-vs-fetch-ai-accuracy-and-cost) | Fetch-type AI vs Memory-type comparison |
| This page | Data protection information for security reviews and AI adoption approvals |
