import Agent from "../classes/Agent";
import City from "../classes/City";
import Human, { HumanId } from "../classes/entities/Human";

export enum DataTables {
    PEOPLE = "people" 
};

interface IDatabase {
    set(table: DataTables, obj: Human | City | Agent): void;
    // get(human: Human): void;
    // deleteHuman(human: Human): void;
}

export default abstract class Database implements IDatabase {
    abstract set(table: DataTables, obj: Human | City | Agent): void;
};