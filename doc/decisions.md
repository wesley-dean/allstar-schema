# Architecture decisions

## SchemaStore publication conventions

Schema publication filenames and identifiers follow the Allstar-prefixed
SchemaStore naming convention. Catalog entries are unique and generic basename
matches are omitted to avoid false positives. Nullable types retain their
validation semantics through explicit disjoint branches, with strict AJV checks
available for publication readiness. See [ADR 0001](adr/0001-schemastore-publication.md).
