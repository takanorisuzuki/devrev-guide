---
title: "Article Access Control Reference"
description: "KB Article permission model — how scope, access_level, and shared_with work together"
---

# Article Access Control Reference

Knowledge Base (KB) Articles support fine-grained access control to determine who can see what. [s05](/en/s05) covers the basics of Collection publishing; this page is a comprehensive reference for the **full permission model**.

## Three Control Parameters

Article access is governed by three parameters working together.

| Parameter | Role | How it's set |
|-----------|------|-------------|
| **scope** | High-level classification (internal vs customer-facing) | Automatically determined by creation path (manual=external, AirSync import=internal) |
| **access_level** | Visibility level (private / public, etc.) | Set via API. Not directly editable in the GUI |
| **shared_with** | Explicit list of users/groups who can view | GUI "Visible to" field, or API |

These three are not independent — they are **internally synchronized**. API requests can send either `access_level` or `shared_with`, but not both simultaneously.

---

## scope: Internal vs External

| Aspect | **Internal** | **External** |
|--------|------------|------------|
| Meaning | Internal documents (similar to Google Docs/Notion sharing model) | Help center articles (customer-facing) |
| Default access_level | **private** (creator only) | public or external (all Platform Users have default access) |
| shared_with targets | DevUsers only | Both DevUsers and RevUsers |
| Primary creation path | **AirSync** imports (Confluence, Notion, OneDrive, etc.) | Manual creation via GUI, or URL crawling |
| PLuG exposure | Not exposed by default (prevents accidental publication) | Exposed based on settings |

**Why AirSync imports default to Internal**: Documents synced from external tools often contain internal-only information. To prevent accidental exposure through PLuG or the Support Portal, Internal scope (=private) is applied by default.

---

## access_level: Five Possible Values

| Value | Meaning | Primary use |
|---|---|---|
| **private** | Default seeded roles do NOT apply. Only users explicitly listed in `shared_with` can access | Default for Internal scope. Internal-only documents |
| **public** | If status=published, accessible without authentication | SEO-enabled help center articles |
| external | External scope article without SEO (authentication required, but RevUsers can access) | Restricted customer-facing articles |
| restricted | Exists in design but limited current significance | — |
| internal | Exists in design but limited current significance | — |

> The two values that matter most in practice are **`private`** and **`public`**.

### How private works

- Default system roles (seeded roles) are **entirely bypassed**
- Only users/groups explicitly added to `shared_with` can access the article
- All Internal scope articles default to `access_level=private`

### How public works

- If status=published AND access_level=public, the article is accessible **without an authentication token**
- Becomes searchable in the Support Portal and PLuG
- Eligible for SEO indexing

---

## shared_with: Specifying Users and Groups

The `shared_with` field explicitly defines which users or groups can view an Article.

### Eligible targets

| Target | scope=internal | scope=external |
|--------|:---:|:---:|
| DevUser (individual) | ○ | ○ |
| DevUser group | ○ | ○ |
| RevUser (individual) | × | ○ |
| RevUser group | × | ○ |

### GUI operation

In the GUI, use the **"Visible to"** field on the Article detail screen to configure `shared_with`.

- Specifying a group grants access to all members of that group
- Leaving "Visible to" empty on an Internal scope article means only the creator can access it

### Example: Group-based access control

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

When an access request is made for an Article, the system evaluates in this order:

```
1. Is status = published?
   └─ No → Not visible to RevUsers (DevUser-only draft)

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

## AirSync Import vs Manual Creation

| Aspect | AirSync import | Manual creation (GUI) |
|--------|--------------|---------------------|
| Default scope | **internal** | **external** |
| Default access_level | **private** (creator only) | **public** (everyone can access) |
| PLuG/Portal exposure | **Not exposed** by default | Exposed when Published |
| How to change | Add `shared_with` via API/GUI | Add restrictions via "Visible to" |

### Making AirSync-imported articles customer-visible

To publish an article imported as Internal scope to customers:

1. Add the target RevUser group to the Article's `shared_with`
2. Or recreate the Article manually so it gets External scope

---

## Permission Aware Sync (OneDrive / SharePoint)

Some AirSync Extractors support **Permission Aware** sync, which preserves the original system's access settings.

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
| **shared_with** | ○ ("Visible to") | ○ (articles.create / articles.update) | Mutually exclusive with access_level (cannot send both) |
| **access_level** | × | ○ (articles.create / articles.update) | Mutually exclusive with shared_with. Plug backend manages sync |
| **scope** | × | × (not in public API schema) | Automatically determined by creation path |
| **status** | ○ (Publish/Draft/Archive) | ○ (articles.update) | Must be Published for RevUser visibility |

---

## Design Considerations

- Since `shared_with` and `access_level` are internally synchronized, **changing one via API affects the other**
- `scope` cannot be changed after creation (converting Internal→External requires recreating the article)
- There is no GUI interface to directly view or modify the `access_level` value (use the API to inspect)
- AirSync-imported articles are designed to not appear in PLuG/Portal by default — you must explicitly configure `shared_with` to make them visible

---

## Related Links

- [s05: Building a Knowledge Base and Support Portal](/en/s05) — Basic KB setup steps
- [s08: Admin Settings and Access Control](/en/s08) — Overall role and permission design
- [Architecture Reference](/en/architecture) — Article and Part relationships
- [Official: Creating KB Articles](https://support.devrev.ai/devrev/article/ART-21914)
- [Official: Collections](https://support.devrev.ai/devrev/article/ART-21915)
