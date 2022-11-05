import Vector2 from "./Vector2";

interface IAgent {
    getEntitiesIds(): string[];    
}

export type AgentId = string;

export type AgentType = "Settler" | "Tribe" | "Refugees" | "Army";

export enum AgentTypes {
    SETTLER = "Settler",
    TRIBE = "Tribe",
    REFUGEES = "Refugees",
    ARMY = "Army"
};

/*
    Every instance of this object needs to assign about 68B.
    It consist of:
    coords: 4B
    entitiesIds: (each 2B) and max. 32? them, then 64B.
*/
export default class Agent implements IAgent {
    private entitiesIds: string[];
    
    private readonly type: AgentType;
    
    private readonly v: Vector2;
    
    constructor(type: AgentType, v: Vector2, entitiesId?: string[]) {
        this.type = type;
        this.entitiesIds = entitiesId ?? [];
        this.v = v;
    }
    
    public getEntitiesIds(): string[] {
        return this.entitiesIds;
    }
}