import GameObjectConverter from "../../GameObjectConverter";
import { Example1 } from "../../GameObjectFactory";

export default class HumanConverter extends GameObjectConverter<Example1, string> {
    decode(gameObjectData: string): Example1 {
        return new Example1();
    }

    encode(gameObject: Example1): string {
        return "XXX";
    }

}