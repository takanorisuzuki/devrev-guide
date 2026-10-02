---
title: "Article Access Control Reference"
description: "KB Article permission model — how scope, access_level, and shared_with work together"
---

# Article Access Control Reference

Last updated: October 3, 2026

Knowledge Base (KB) Articles support fine-grained access control to determine who can see what. [s05](/en/s05) covers the basics of Collection publishing; this page is a comprehensive reference for the **full permission model**.

## Three Control Parameters

Article access is governed by three parameters working together.

| Parameter | Role | How it's set |
|-----------|------|-------------|
| **scope** | High-level classification (internal vs customer-facing) | Set at create time or by creation path. Can also be changed on update (see below) |
| **access_level** | Visibility level (private / public, etc.) | Set via API. Not allowed on Internal articles (the system sets private). Not directly editable in the GUI |
| **shared_with** | Explicit additional users/groups who can view | GUI "Visible to" field, or API |

`access_level` and `shared_with` **cannot be set in the same request**. Specifying one causes the system to keep the other consistent (for example, setting `access_level=public` on an External article can populate default share targets).

---

## scope: Internal vs External

| Aspect | **Internal** | **External** |
|--------|------------|------------|
| Meaning | Internal documents (similar to Google Docs/Notion sharing) | Help center articles (customer-facing) |
| access_level | System sets **private** (not a caller-supplied field) | public / external, etc. May remain unset if not provided |
| shared_with targets | **DevUser-type** users/groups only | Both DevUsers and RevUsers |
| Primary creation path | Computer AirSync imports (Confluence, Notion, OneDrive, etc.), or API with Internal scope | Manual GUI creation (default), or URL crawling |
| Computer for Your Customers exposure | Not exposed by default (prevents accidental publication) | Exposed based on settings |

**Why Computer AirSync imports default to Internal**: Documents synced from external tools often contain internal-only information. To prevent accidental exposure through Computer for Your Customers or the Support Portal, Internal (=private) is applied by default.

### Updating scope (since July 2026)

Since July 2026, `articles.update` can change scope. Earlier versions did not allow changing scope after creation.

- Internal → External is supported
- Changing to External **clears** existing `shared_with`. Re-add shares as needed
- Do not flip Internal → External merely to bypass share restrictions; you must reconfigure sharing afterward

**Changing scope via API is not the same as Computer AirSync re-sync.** Import update paths may omit scope, so "API can change scope" must not be read as "re-sync also updates scope."

**Simultaneous scope and shared_with updates** can be gated by organization settings. A safe sequence is:

1. Inspect current shares if needed
2. Update scope alone
3. Re-add any cleared shares

On `jp-trans-ux-test` (October 3, 2026), sharing an Internal article with a DevUser-type group and then updating **scope only** to External cleared `shared_with`. Behavior when scope and shared_with are sent in the **same** request may differ by environment, so this page does not generalize that case.

---

## access_level: Five Possible Values

| Value | Meaning | Primary use |
|---|---|---|
| **private** | Default seeded roles do NOT apply. Additional viewers are listed in `shared_with` (owners have access by default) | Value the system sets for Internal articles. Internal-only documents |
| **public** | If status=published, can be retrieved anonymously when other conditions allow | SEO-enabled help center articles |
| external | External scope article without SEO (authentication required, but RevUsers can access) | Restricted customer-facing articles |
| restricted | Exists in design but limited current significance | — |
| internal | Exists in design but limited current significance | — |

> The two values that matter most in practice are **`private`** and **`public`**.

### How private works

- Default system roles (seeded roles) are **bypassed**
- **Owners can access by default.** Grant additional access with `shared_with`
- **Creator (`created_by`) and owner (`owned_by`) are not necessarily the same.** Prefer "owner only," not "creator only," when shares are empty
- For Internal articles, create sets `access_level=private` automatically
- Specifying `access_level` on Internal create/update is rejected ("access_level must not be set for internal articles")

### How public works

- status=published AND access_level=public are the **article-side** conditions for anonymous retrieval
- **Anonymous Support Portal display** also requires **Public Portal** to be enabled. If Public Portal is off, access is limited to signed-in customers
- Treat API anonymous retrieval and portal anonymous display as separate concerns
- May also be searchable from Computer for Your Customers (separate from portal settings)
- Eligible for SEO indexing
- On External articles, setting `access_level=public` may cause the system to attach default share targets (for example All Users / Customers)

---

## shared_with: Specifying Users and Groups

The `shared_with` field grants **additional** viewers (users or groups) beyond the default owner access.

### Eligible targets

| Target | scope=internal | scope=external |
|--------|:---:|:---:|
| DevUser (individual) | ○ | ○ |
| DevUser-type group | ○ | ○ |
| RevUser (individual) | × | ○ |
| RevUser-type group | × | ○ |

For Internal articles, the group itself must be **DevUser-type**. Specifying a RevUser-type group is rejected ("group must be of member type DevUser for internal articles").

### GUI operation

In the GUI, use the **"Visible to"** field on the Article detail screen to configure `shared_with`.

- Specifying a group grants access to all members of that group
- Leaving "Visible to" empty on an Internal article means the **owner** can access it (not necessarily the creator)

### Example: Group-based access control (External)

By adding RevUser-type groups (e.g., "All Customers", "Partner Group") to `shared_with`, you can control Article visibility by customer segment.

```
Article: "API Migration Guide v2"
  scope: external
  access_level: external (authentication required)
  shared_with:
    - Group: "Enterprise Partners" (member_type: rev_user)
    - Group: "Beta Program Members" (member_type: rev_user)
```

In this case, only RevUsers who belong to Enterprise Partners or Beta Program Members can view the article.

---

## Access Decision Flow

Preconditions differ by use case.

- **Customer-facing surfaces** (Support Portal / Computer for Your Customers): status=published is required. Anonymous portal display also needs Public Portal enabled
- **Internal viewing, editing, and draft review**: articles can be saved and updated without being Published

Customer-facing evaluation sketch:

```
1. Is status = published?
   └─ No → Not visible to RevUsers (DevUser-only draft, etc.)

2. Is access_level = private?
   └─ Yes → Default roles disabled. Owner + explicit shared_with
   └─ No → Continue

3. Is access_level = public?
   └─ Yes → Article is a candidate for anonymous retrieval; portal anonymity still needs Public Portal
   └─ No → Default roles apply

4. Is scope = internal?
   └─ Yes → Not visible to RevUsers. Owner and DevUsers in shared_with only
   └─ No (external) → RevUser/Group in shared_with determines customer access
```

---

## Computer AirSync Import vs Manual Creation

| Aspect | Computer AirSync import | Manual creation (GUI) |
|--------|--------------|---------------------|
| Default scope | **internal** | **external** |
| access_level | System sets **private** | Depends on publish settings (e.g. public) |
| Computer for Your Customers/Portal exposure | **Not exposed** by default | Exposed when Published with public visibility settings |
| Widening internal access | Add DevUser-type groups to `shared_with` | Adjust "Visible to" |

### Making imported articles customer-visible

You cannot share an Internal article with a RevUser group. To make it customer-facing:

1. Update scope to External (existing shares are cleared; re-add as needed), or
2. Recreate the article as External

Do not change Internal → External only to bypass share restrictions. Do not expect re-sync to change scope to External either.

---

## Permission Aware Sync (OneDrive / SharePoint)

Some Computer AirSync Extractors support **Permission Aware** sync, which preserves the original system's access settings.

### OneDrive

- Preserves original OneDrive permissions during sync
- Maps OneDrive users/groups to corresponding DevRev users/groups
- Users who can view in DevRev match those with access in OneDrive

### SharePoint

- Can import Communication Site content
- Choose between **Public** (visible to all) or **Restricted to Owner Only**
- Default is "Restricted to Owner Only"

---

## GUI / API Capability Summary

| Parameter | GUI | API | Notes |
|-----------|:---:|:---:|-------|
| **shared_with** | ○ ("Visible to") | ○ (articles.create / articles.update) | Cannot set together with access_level |
| **access_level** | × | ○ (not allowed on Internal) | Cannot set together with shared_with. On External, public may populate default shares |
| **scope** | × | ○ (create / update; Internal=1 / External=2) | Updatable since July 2026. Changing to External clears shares. Separate from re-sync |
| **status** | ○ (Publish/Draft/Archive) | ○ (articles.update) | Published required for customer-facing visibility; Draft save is allowed |

---

## Design Considerations

- `access_level` and `shared_with` cannot be sent together; the system keeps them consistent when one is set
- For Internal articles, callers do not set `access_level`; the system sets private
- private defaults to the **owner**; do not equate creator with owner
- Internal shares accept DevUser individuals or DevUser-type groups. RevUser individuals and RevUser-type groups cannot be specified
- Changing scope to External clears shares; re-add recipients afterward
- API scope updates and AirSync re-sync scope behavior are different
- Anonymous Support Portal display requires Public Portal to be enabled
- There is no GUI to directly view or edit `access_level` (inspect via API)
- Computer AirSync-imported articles do not appear in Computer for Your Customers/Portal by default

---

## Verification scope for this page

| Item | Detail |
|------|--------|
| Date | October 3, 2026 |
| Environment | `jp-trans-ux-test` (API) |
| Verified | Internal/External create; rejecting explicit access_level on Internal; DevUser vs RevUser group share; rejecting access_level + shared_with together; scope-only Internal→External with share clear; Draft→Published |
| Not verified | Viewing as another user; anonymous Support Portal display; Agent search; Computer AirSync re-sync; same-request scope + shared_with update |

---

## Related Links

- [s05: Building a Knowledge Base and Support Portal](/en/s05) — Basic KB setup steps
- [s08: Admin Settings and Access Control](/en/s08) — Overall role and permission design
- [Architecture Reference](/en/reference/architecture) — Article and Part relationships
- [Official: Creating KB Articles](https://support.devrev.ai/devrev/article/ART-21914)
- [Official: Collections](https://support.devrev.ai/devrev/article/ART-21915)
