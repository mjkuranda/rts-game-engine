interface IEntity {
    getAge(): number;
}

export default abstract class Entity implements IEntity {
    public abstract getAge(): number;
}