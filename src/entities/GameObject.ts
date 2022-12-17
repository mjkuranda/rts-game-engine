interface IGameObject {
    toString(): string;
}

export default abstract class GameObject implements IGameObject {
    protected constructor() {}

    abstract toString(): string;
}
