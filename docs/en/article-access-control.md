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
| **shared_with** | Explicit list of users/groups who can view | GUI "Visible to" field, or API |

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

---

## access_level: Five Possible Values

| Value | Meaning | Primary use |
|---|---|---|
| **private** | Default seeded roles do NOT apply. Only users explicitly listed in `shared_with` can access | Value the system sets for Internal articles. Internal-only documents |
| **public** | If status=published, accessible without authentication | SEO-enabled help center articles |
| external | External scope article without SEO (authentication required, but RevUsers can access) | Restricted customer-facing articles |
| restricted | Exists in design but limited current significance | — |
| internal | Exists in design but limited current significance | — |

> The two values that matter most in practice are **`private`** and **`public`**.

### How private works

- Default system roles (seeded roles) are **bypassed**
- Only users/groups explicitly added to `shared_with` can access the article
- For Internal articles, create sets `access_level=private` automatically
- Specifying `access_level` on Internal create/update is rejected ("access_level must not be set for internal articles")

### How public works

- If status=published AND access_level=public, the article is accessible **without an authentication token**
- Becomes searchable in the Support Portal and Computer for Your Customers
- Eligible for SEO indexing
- On External articles, setting `access_level=public` may cause the system to attach default share targets (for example All Users / Customers)

---

## shared_with: Specifying Users and Groups

The `shared_with` field explicitly defines which users or groups can view an Article.

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
- Leaving "Visible to" empty on an Internal article means only the creator can access it

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

- **Customer-facing surfaces** (Support Portal / Computer for Your Customers): status=published is required
- **Internal viewing, editing, and draft review**: articles can be saved and updated without being Published

Customer-facing evaluation sketch:

```
1. Is status = published?
   └─ No → Not visible to RevUsers (DevUser-only draft, etc.)

2. Is access_level = private?
   └─ Yes → Default roles disabled. Only shared_with members
   └─ No → Continue

3. Is access_level = public?
   └─ Yes → Accessible without authentication (SEO)
   └─ No → Default roles apply

4. Is scope = internal?
   └─ Yes → Not visible to RevUsers. DevUsers in shared_with only
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

Do not change Internal → External only to bypass share restrictions.

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
| **scope** | × | ○ (create / update; Internal=1 / External=2) | Updatable since July 2026. Changing to External clears shares |
| **status** | ○ (Publish/Draft/Archive) | ○ (articles.update) | Published required for customer-facing visibility; Draft save is allowed |

---

## Design Considerations

- `access_level` and `shared_with` cannot be sent together; the system keeps them consistent when one is set
- For Internal articles, callers do not set `access_level`; the system sets private
- Internal shares accept DevUser-type groups only; RevUser-type groups are rejected
- Changing scope to External clears shares; re-add recipients afterward
- There is no GUI to directly view or edit `access_level` (inspect via API)
- Computer AirSync-imported articles do not appear in Computer for Your Customers/Portal by default

---

## Related Links

- [s05: Building a Knowledge Base and Support Portal](/en/s05) — Basic KB setup steps
- [s08: Admin Settings and Access Control](/en/s08) — Overall role and permission design
- [Architecture Reference](/en/reference/architecture) — Article and Part relationships
- [Official: Creating KB Articles](https://support.devrev.ai/devrev/article/ART-21914)
- [Official: Collections](https://support.devrev.ai/devrev/article/ART-21915)
