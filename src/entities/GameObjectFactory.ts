import GameObjectConverter from "./GameObjectConverter";
import HumanConverter from "./embedded/HumanConverter";

export class Example1 {}
class Example2 {}

const map = {
    ex1: Example1,
    ex2: Example2
};

type keys = keyof typeof map;
type types = typeof map[keys];
type ExtractInstanceType<T> = T extends new () => infer R ? R : never;

class GameObjectFactory {
    constructor(private readonly map: any) {}

    static getObject(k: keys): ExtractInstanceType<types> {
        return new map[k]();
    }

    public get<T>(key: string, table: string, converter: GameObjectConverter<T, string>): T {
        const data = "XXXXXX";
        return converter.decode(data);
    }
}

const fact = new GameObjectFactory({});
fact.get<Example1>("X", "XXX", new HumanConverter());

const obj1 = GameObjectFactory.getObject("ex1");
console.info(obj1 instanceof Example1 ? "Example1QQQ" : "Unknown...");