# ADR 0001: SchemaStore publication conventions

Status: Accepted

## Context

Issues #2 through #5 record SchemaStore review feedback. Existing publication
filenames, identifiers and catalog entries are inconsistent. Generic basename
matching can select unrelated files. Nullable properties must retain their
existing accepted values.

## Decision

Use hyphenated allstar-prefixed publication filenames, corresponding identifiers,
and one distinct catalog entry per schema. Omit generic file matches and retain
the distinctive allstar.json match. Express nullable types as disjoint oneOf
branches, retaining array item constraints in the array branch. Standardize
description punctuation and provide a strict AJV compatibility check.

## Alternatives and consequences

Keeping existing publication names would avoid URL migration but retain the
upstream naming conflict. Keeping generic matches risks false positives.
Disabling strict checking would weaken the publication gate. The existing
nullable union form is valid JSON Schema, but explicit disjoint branches satisfy
the reviewer preference without changing the accepted values.

Consumers using old schema URLs or local paths must update them. Actual Allstar
configuration filenames and validation intent remain unchanged. The repository
README describes the schemas as developmental; we assume the old publication
URLs are not an established stable interface.
