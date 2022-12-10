import Game from "./Game";
import GameManager from "./GameManager";
import GameConfig, { TableType } from "./GameConfig";
import GameMap from "./GameMap";
import MapChunk from "./map/MapChunk";
import MapTile, { MapTileType } from "./map/MapTile";
import {
    setMapTileResource, getMapTileResource, resetMapTileResource,
    setMapTileType, getMapTileType, resetMapTileType
} from "./GameGlobalConfig";

import Human, { HumanId, SpouseId, Skills, Gender } from "./classes/entities/Human";
import City from "./classes/City";
import Agent, { AgentId, AgentType, AgentTypes } from "./classes/Agent";
import Vector2 from "./classes/Vector2";
import Province, { ProvinceId } from "./classes/Province";

import Database, { DatabaseResult, MapChunkData } from "./databases/Database";
import InMemoryDatabase from "./databases/InMemoryDatabase";

export {
    // Main types
    Game,
    GameManager,
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
    Database,
    DatabaseResult, MapChunkData,
    InMemoryDatabase
};