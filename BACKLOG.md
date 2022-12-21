# RTS Game Engine - Backlog

### Linter
- Add Linter. (:

### DatabaseManager / DatabaseHandler
- Using to handle or manage selected database.
- It needs Database object e. g. InMemory etc...
- Includes Database config? Current database? :)
- Has the same interface as Database child.
- Catch errors in above database layer (InMemory, MongoDB, ...).
- Returns DatabaseResult?

### Modification Database layer
- Return promises (`return object;`) or throw errors.
- Query key param should be an array of keys - to create complex queries.

### Docs
- Add documentation together with `README` file.
- `docs` directory including `index.md`.
- That file will refer to other files in `docs`.

### MongoDB database
- Add MongoDB class to handle such database.

### Tests for MapXClasses
- Extend tests for `GameMap` and the other files managing map stuff.

### Mocha
- Add mocked data capability.