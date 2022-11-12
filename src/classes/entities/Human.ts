import { people } from '../../GameData';

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

// { offset: 12, mask: 0x7000 }

/*
    Every instance of this object needs to assign about 42B.
    It consist of:
    name: (max 16 chars), then: 32B maximally
    age: 8B
    spouseId: 2B
    skills: 2B
*/
export default class Human {
    // Human id
    private spouseId: SpouseId | null;
    
    // Gender (true - male, false - female)
    private readonly gender: boolean;
    
    private skills: string;
    
    constructor(
        private readonly name: string,
        private readonly age?: number,
        isMale?: boolean) {
        this.name = name.slice(0, 16);
        this.age = age ?? 0;
        this.gender = isMale ?? true;
        this.spouseId = null;
        this.skills = '\x00'; // 0
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
    
    public marriage(humanId: string): void {
        if (!people.get(humanId)) {
            console.error('Error: There is no such human.');
            
            return;
        }
        
        this.spouseId = humanId;
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
            [Skills.FIGHTING]: (this.skills.charCodeAt(0) & SkillsDetails[Skills.FIGHTING].mask) >> SkillsDetails[Skills.FIGHTING].offset,
            [Skills.MECHANICS]: (this.skills.charCodeAt(0) & SkillsDetails[Skills.MECHANICS].mask) >> SkillsDetails[Skills.MECHANICS].offset,
            [Skills.ENGINEERING]: (this.skills.charCodeAt(0) & SkillsDetails[Skills.ENGINEERING].mask) >> SkillsDetails[Skills.ENGINEERING].offset,
            [Skills.SCIENCE]: (this.skills.charCodeAt(0) & SkillsDetails[Skills.SCIENCE].mask) >> SkillsDetails[Skills.SCIENCE].offset
        };
        
        console.table(skills);
    }
}