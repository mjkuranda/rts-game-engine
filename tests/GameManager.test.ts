import { AgentTypes } from "../src/classes/Agent";
import Human, { Gender, Skills } from "../src/classes/entities/Human";
import Vector2 from "../src/classes/Vector2";
import GameManager from "../src/GameManager";

const manager = new GameManager();

describe('GameManager', () => {
    it('Should born new man', () => {
        // Given
        const name = 'hum';
        const age = 0;
        
        // When
        const result = manager.born(name, age);
        
        // Then
        expect((result.result as Human).getGender()).toBe(Gender.MALE);
    });
    
    it('Should born new woman', () => {
        // Given
        const name = 'hum';
        const age = 0;
        const gender = false; // female
        
        // When
        const result = manager.born(name, age, gender);
        
        // Then
        expect((result.result as Human).getGender()).toBe(Gender.FEMALE);
    });
    
    it('Should create new agent', () => {
        // Given
        const agentType = AgentTypes.TRIBE;
        const vector = new Vector2(1, 5);
        const humansListIds = [
            '\x00',
            '\x01'
        ];
        const expectedResultId = '\x00';
        
        // When
        const result = manager.setAgent(agentType, vector, humansListIds);
        
        // Then
        expect(result.id).toBe(expectedResultId);
    });
    
    it('Should gain a new engineering skills', () => {
        // Given
        const man = new Human('Noname', 21);
        const givenSkillValue = 3;
        const expectedSkillValue = 3;
        
        // When
        man.gainSkill(Skills.ENGINEERING, givenSkillValue);
        
        // Then
        expect(man.getSkill(Skills.ENGINEERING)).toBe(expectedSkillValue);
        expect(man.getSkill(Skills.ENGINEERING)).toBeGreaterThan(1);
    });
});