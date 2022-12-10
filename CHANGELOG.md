# RTS Game Engine

## [1.10.0] 2022-12-10
### Improved
- [@mjkuranda]: Encoding and decoding chunks and tiles.

## [1.9.0] 2022-12-08
### Added
- [@mjkuranda]: MapChunk, MapTile system.
- [@mjkuranda]: Encoding and decoding chunk.
- [@mjkuranda]: Game global config file containing many functionalities.
- [@mjkuranda]: GameMap module.

## [1.8.0] 2022-12-03
### Improved
- [@mjkuranda]: Better initializing GameManager and Game.

### Added
- [@mjkuranda]: Types file with all imports.
- [@mjkuranda]: GainSkill method inside GameManager.

## [1.7.1] 2022-11-26
### Improved
- [@mjkuranda]: GameManager operations.

### Added
- [@mjkuranda]: Keys for `Human` and `Agent`.

### Removed
- [@mjkuranda]: GameObject type. It has been only object since now - without it.

## [1.7.0] 2022-11-25
### Added
- [@mjkuranda]: Error handling and their own types.

### Changed
- [@mjkuranda]: Improved database interface: get and delete.
- [@mjkuranda]: Improved `GameManager` - new return types and database implementation.

## [1.6.0] 2022-11-19
### Added
- [@mjkuranda]: Added game configuration class.
- [@mjkuranda]: Added database abstraction layer and `InMemoryDatabase`.

## [1.5.0] 2022-11-18
### Added
- [@mjkuranda]: Added handling tests in the library.
- [@mjkuranda]: Added simple tests included in index.ts.

## [1.4.0] 2022-11-12
### Added
- [@mjkuranda]: Added skills and their types: `fighting`, `mechanics`, `engineering`, `science`.

## [1.3.0] 2022-11-05
### Added
- [@mjkuranda]: Added changelog.
- [@mjkuranda]: Added game object types.
- [@mjkuranda]: Handling of human death.
- [@mjkuranda]: Handling genders, marriages and their dissolving.

## [1.2.0] 2022-11-05
### Changed
- [@mjkuranda]: Optimized `Vector2` class. 4B instead of 16B.

## [1.1.0] 2022-10-31
### Added
- [@mjkuranda]: Simple management between game objects.

## [1.0.0] 2022-10-31
### Added
- [@mjkuranda]: Initial version of the game engine.