import GameObject from "../../GameObject";

export type HumanId = string;

export type SpouseId = string;

export enum Gender {
    MALE = "Male",
    FEMALE = "Female"
};

export enum Skills {
    FIGHTING = "Fighting",
    MECHANICS = "Mechanics",
    ENGINEERING = "Engineering",
    SCIENCE = "Science"
};

interface Skill {
    offset: number;
    mask: number;
};

const SkillsDetails: Record<string, Skill> = {
    [Skills.FIGHTING]: { offset: 12, mask: 0x7000 },
    [Skills.MECHANICS]: { offset: 8, mask: 0x0700 },
    [Skills.ENGINEERING]: { offset: 4, mask: 0x0070 },
    [Skills.SCIENCE]: { offset: 0, mask: 0x0007 }
};

/*
    Every instance of this object needs to assign about 42B.
    It consists of:
    name: (max 16 chars), then: 32B maximally
    age: 8B
    spouseId: 2B
    skills: 2B
*/
export default class Human extends GameObject {
    // Human id
    private id: HumanId;

    // Human spouse id
    private spouseId: SpouseId | null;

    // Gender (true - male, false - female)
    private readonly gender: boolean;

    private skills: string;

    constructor(
        private readonly name: string,
        private readonly age?: number,
        isMale?: boolean,
        peopleSize?: number) {
        super();

        this.name = name.slice(0, 16);
        this.age = age ?? 0;
        this.gender = isMale ?? true;
        this.spouseId = null;
        this.skills = '\x00'; // 0
        this.id = String.fromCodePoint(peopleSize ?? Math.floor(Math.random() * 100000));
    }

    public getName(): string {
        return this.name;
    }

    // NOTE: Died human is deleted and there is no need to calculate his/her age
    public getAge(year: number): number {
        return year - this.age!;
    }

    public getGender(): string {
        return (this.gender) ? Gender.MALE : Gender.FEMALE;
    }

    public isMale(): boolean {
        return this.gender;
    }

    public getSpouseId(): SpouseId | null {
        return this.spouseId;
    }

    public marriage(spouseId: string, spouse: Human | null): void {
        if (!spouse) {
            console.error('Error: There is no such human.');

            return;
        }

        this.spouseId = spouseId;
    }

    public dissolveMarriage(): void {
        this.spouseId = null;
    }

    // TODO: Try not to overflow it! Maximal amount of skill is 15.
    public gainSkill(skill: Skills, amount: number): void {
        const skillDetail = SkillsDetails[skill];

        const skillsNumeric = this.skills.charCodeAt(0) + (amount << skillDetail.offset);
        this.skills = String.fromCharCode(skillsNumeric);
    }

    public logSkills(): void {
        const skills = {
            [Skills.FIGHTING]: this.getSkill(Skills.FIGHTING),
            [Skills.MECHANICS]: this.getSkill(Skills.MECHANICS),
            [Skills.ENGINEERING]: this.getSkill(Skills.ENGINEERING),
            [Skills.SCIENCE]: this.getSkill(Skills.SCIENCE)
        };

        console.table(skills);
    }

    public getSkill(skill: Skills): number {
        return (this.skills.charCodeAt(0) & SkillsDetails[skill].mask) >> SkillsDetails[skill].offset;
    }

    public getId(): HumanId {
        return this.id;
    }

    public toString(): string {
        return `Human object. ${this.getName()}, ${this.getAge(0)} years old. ${this.spouseId ? "Spouse" : "No marriage"}`;
    }
}