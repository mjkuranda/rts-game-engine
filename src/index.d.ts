import Game from "./Game";
import GameConfig, { TableType } from "./GameConfig";
import GameMap from "./GameMap";
import MapChunk from "./entities/embedded/objects/map/MapChunk";
import MapTile, { MapTileType } from "./entities/embedded/objects/map/MapTile";
import {
    setMapTileResource, getMapTileResource, resetMapTileResource,
    setMapTileType, getMapTileType, resetMapTileType
} from "./GameGlobalConfig";

import Human, { HumanId, SpouseId, Skills, Gender } from "./classes/entities/Human";
import City from "./classes/City";
import Agent, { AgentId, AgentType, AgentTypes } from "./classes/Agent";
import Vector2 from "./classes/Vector2";
import Province, { ProvinceId } from "./classes/Province";

import DatabaseOld, { DatabaseResult, MapChunkData } from "./databases/old/DatabaseOld";
import InMemoryDatabase from "./databases/old/InMemoryDatabase";

export {
    // Main types
    Game,
    GameConfig, TableType,
    GameMap,
    MapChunk,
    MapTile, MapTileType,

    // Game Global Config
    setMapTileResource, getMapTileResource, resetMapTileResource,
    setMapTileType, getMapTileType, resetMapTileType,

    // Main classes
    Human, HumanId, SpouseId, Skills, Gender,
    City,
    Agent, AgentId, AgentType, AgentTypes,
    Vector2,
    Province, ProvinceId,

    // Databases
    DatabaseOld,
    DatabaseResult, MapChunkData,
    InMemoryDatabase
};