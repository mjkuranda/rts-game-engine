export default abstract class GameObjectConverter<T, S> {
    public abstract encode(gameObject: T): S;
    public abstract decode(gameObjectData: S): T;
}