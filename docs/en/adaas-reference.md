---
title: "ADaaS Implementation Reference"
description: "Checklists, specs, and patterns to consult while building an AirSync connector"
---

# ADaaS Implementation Reference

A reference document to consult during implementation after learning the concepts in [s15 (Building a Custom AirSync Connector)](/en/s15).

---

## Entity Scopes

External system objects have two scopes. Understanding this upfront directly affects how you implement your workers.

| Scope | Description | Examples |
|-------|-------------|---------|
| **External System Scoped** | Global entities across the entire instance. Referenced by multiple Sync Units | Jira users, Salesforce contacts |
| **External Sync Unit Scoped** | Entities contained within a single workspace | Jira Issues, Zendesk Tickets |

**Implementation implications:**

- External System Scoped entities (e.g. users) are shared across multiple Sync Units. Incorrect scope settings in Object Mapper can cause duplicate registrations
- External Sync Unit Scoped entities can have the same ID in different Sync Units (e.g. ISSUE-1 exists in both Project A and Project B)

---

## Subtype and Custom Field Management

### Subtypes auto-created by AirSync

AirSync automatically creates subtypes for the following object types when syncing records:

- works, parts, conversations, articles, incidents

External fields that do not map to DevRev stock fields are automatically imported as custom fields.

### Order of schema changes

**Always make changes in the external system first, then let the next Sync Run propagate them to DevRev.** Manually changing subtypes on the DevRev side excludes them from sync.

### Removing a record type from mappings

Existing data is not deleted. Only future updates (creates and changes) stop.

### Importing custom stages

Declare a stage diagram in External Domain Metadata to import external system stages into DevRev.

| Property | Required | Description |
|----------|----------|-------------|
| `controlling_fields` | ✅ | Name of the external field that encodes the stage (single string, not an array) |
| `stages` | ✅ | Map of custom stages to import |
| `states` | - | Map of custom states to import |
| `all_transitions_allowed` | - | Whether transitions between any stages are permitted |
| `starting_stage` | - | Initial stage for new records |

### Dynamic record types (Record Type Categories)

For record types that grow dynamically (e.g. custom objects), use **Record Type Categories**. Define mappings at the category level and they are automatically applied to all record types belonging to that category.

---

## Mixins (Data Attached to Synced Records)

The following Mixins are automatically attached to records created or updated by AirSync. Use them when reading or manipulating DevRev objects.

| Mixin | Attached data |
|-------|--------------|
| **Sync Metadata Mixin** | Source reference, origin system, Last Sync In / Last Sync Out status |
| **External Source Data Mixin** | Created / Updated / Closed timestamps from the external system |
| **Staged Data Mixin** | Unresolved fields (Sync In / Sync Out) |

---

## Sync Modes Reference

| Mode | Description | Extraction logic |
|------|-------------|-----------------|
| `SyncMode.INITIAL` | Initial sync. Extract all data | Use `extract_from` as start timestamp if provided; otherwise extract all data |
| `SyncMode.INCREMENTAL` | Incremental sync. Diff since last run | If `reset_extract_from` is `true`, use `extract_from`; if `false`, use `lastSuccessfulSyncStarted` |

If the external API does not support differential fetching, a full refresh is acceptable for incremental sync — document this behavior explicitly.

---

## Validation Checklist (Full)

Check every item before releasing.

### Manifest

- [ ] `external_system_name` is correctly set
- [ ] `is_subdomain: true` or `organization_data` determines the org ID dynamically (not hardcoded)
- [ ] `token_verification` points to an endpoint that requires authentication
- [ ] `secret_config.fields` declares every field that the code reads
- [ ] `capabilities` includes required capabilities (e.g. `TIME_SCOPED_SYNCS`)
- [ ] `loader_function` is declared (required even for extract-only connectors)

### Extraction Logic

- [ ] All completion flags are reset at the start of a Sync Run (`StartExtractingData`)
- [ ] High-water mark is preserved and updated during incremental sync
- [ ] `adapter.isTimeout` is checked before each page / batch
- [ ] `repo.push()` is not called after timeout
- [ ] `onTimeout` emits a Progress event (not Error or Done)
- [ ] `modified_date` is derived from source data (not `new Date()`)
- [ ] Pagination cursor is advanced only after a successful push
- [ ] `extract_from` / `reset_extract_from` are handled correctly (Time-Scoped Sync)

### ID Management

> **Terminology note**: In s15, `external_org_id` refers to the value configured in the manifest. The internal platform name is `external_system_id`, used as `external_system_unique_identifier = <external_system_name>/<external_system_id>`.

- [ ] `external_system_id` is unique per customer instance
- [ ] `external_system_id` is immutable (not a display name or any renameable value)
- [ ] ESU `id` is a GUID or stable identifier (not a display name)
- [ ] Two different customers (different DevOrgs) never share the same `external_system_id`
- [ ] Different OAuth users connecting from the same customer produce the same `external_system_id` (because the tenant ID is tied to the instance, not the user)

### Loading (DR2E)

- [ ] `load-data.ts` correctly emits the `LoadingDataDone` event
- [ ] `load-attachments.ts` correctly emits the `LoadingAttachmentsDone` event
- [ ] Loading functions complete cleanly without crashing even for extract-only connectors

### Testing

- [ ] Initial sync completes and expected records are created in DevRev
- [ ] Second sync does not duplicate data
- [ ] Incremental sync updates only records that changed
- [ ] Resume from timeout produces no data loss or duplication
- [ ] Invalid credentials produce a clear error message
- [ ] Empty response (0 records) does not cause an error
- [ ] null / empty string / special characters / Unicode are handled correctly
- [ ] Tested with production-scale data volumes

---

## Common Failure Patterns (Full List)

| # | Failure | Impact | Fix |
|---|---------|--------|-----|
| 1 | `external_system_id` hardcoded | Data bleeds between customers | Fetch dynamically from external API |
| 2 | Mutable value used for `external_system_id` | Duplicates on rename | Use an immutable GUID |
| 3 | Completion flags not reset between Sync Runs | Second+ syncs extract nothing | Always reset on `StartExtractingData` |
| 4 | `token_verification` uses a public endpoint | Invalid credentials go undetected | Use an endpoint that requires auth |
| 5 | `modified_date` set with `new Date()` | Every record looks changed on every run | Use source data timestamps |
| 6 | Missing field declaration in `secret_config.fields` | Users cannot enter credentials in the UI | Declare every field the code reads |
| 7 | Total retry backoff time exceeds Lambda budget | Sleep during timeout, risk of data loss | Calculate and cap total max wait time |
| 8 | `onTimeout` emits Error event | Recoverable timeout becomes fatal | Always emit Progress event |
| 9 | `_dev_external_system_type` is empty | Part of system identifier is missing | Set correct value in IDM file |
| 10 | ESU `id` uses display name | ID changes when resource is renamed | Use GUIDs or stable identifiers |
