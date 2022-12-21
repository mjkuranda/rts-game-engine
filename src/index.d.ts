import Game from "./Game";
import GameConfig  from "./GameConfig";
import GameMap from "./GameMap";
import {
    setMapTileResource, getMapTileResource, resetMapTileResource,
    setMapTileType, getMapTileType, resetMapTileType
} from "./GameGlobalConfig";

import Database, { MapChunkData, IDatabaseQuery, DatabaseResult } from "./databases/Database";
import InMemoryDatabase from "./databases/InMemoryDatabase";

import GameObject from "./entities/GameObject";
import GameObjectConverter from "./entities/GameObjectConverter";

import ChunkConverter from "./entities/embedded/converters/ChunkConverter";
import HumanConverter from "./entities/embedded/converters/HumanConverter";

import Human, { HumanId, SpouseId, Skills, Gender } from "./entities/embedded/objects/Human";
import Vector2 from "./entities/embedded/objects/Vector2";
import MapChunk from "./entities/embedded/objects/map/MapChunk";
import MapTile, { MapTileType } from "./entities/embedded/objects/map/MapTile";
import MapTileResource, { MapTileResourceType } from "./entities/embedded/objects/map/MapTileResource";

export {
    // Main types
    Game,
    GameConfig,
    GameMap,

    // Game Global Config
    setMapTileResource, getMapTileResource, resetMapTileResource,
    setMapTileType, getMapTileType, resetMapTileType,

    // Databases
    Database, MapChunkData, IDatabaseQuery, DatabaseResult,
    InMemoryDatabase,

    // Embedded
    GameObject,
    GameObjectConverter,

    // Embedded converters
    ChunkConverter,
    HumanConverter,

    // Embedded objects
    Human, HumanId, SpouseId, Skills, Gender,
    Vector2,
    MapChunk,
    MapTile, MapTileType,
    MapTileResource, MapTileResourceType,
};