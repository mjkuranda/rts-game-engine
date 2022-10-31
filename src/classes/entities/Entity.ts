interface IEntity {
    getAge(): number;
}

abstract class Entity implements IEntity {
    public abstract getAge(): number;
}

export default Entity;