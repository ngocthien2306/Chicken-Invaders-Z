import { randomIntFromInterval } from "~/extensions/helper.extension";
import {  IAbstractAdvancedMode, IAbstractBasicMode, IAbstractFactory } from "~/interface/AbstractFactory.interface";
import { BRICK_HEIGHT, BRICK_PADDING, BRICK_WIDTH, CHICKEN_ENERGY, CHICKEN_IMAGES, STAGE_COLS, STAGE_PADDING } from "~/setup";
import { ChallengesMode } from "../advance-mode/AdvanceModeChallenges";

import { HardMode } from "../basic-mode/BasicModeHard";

export class ConcreteFactoryChallenge implements IAbstractFactory {

    public createBasicModeGame(level: number[]): IAbstractBasicMode[] {
        return level.reduce((ack, element, i) => {
            const row = Math.floor((i + 1) / STAGE_COLS);
            const col = i % STAGE_COLS;
        
            const x = STAGE_PADDING + col * (BRICK_WIDTH + BRICK_PADDING);
            const y = STAGE_PADDING + row * (BRICK_HEIGHT + BRICK_PADDING);
        
            if (element === 0) return ack;
        
            return [
              ...ack,
              new HardMode(
                "#playField",
                3,
                BRICK_WIDTH,
                BRICK_HEIGHT,
                { x, y },
                CHICKEN_ENERGY[element] + 40,
                CHICKEN_IMAGES[element],
                
              )
            ];
          }, [] as HardMode[]);
    }

   public createAdvancedModeGame(level: number[], typeLV: string): IAbstractAdvancedMode[] | null {
    if(typeLV === "BOSS") {
      return level.reduce((ack, element, i) => {
        const row = Math.floor((i + 1) / STAGE_COLS);
        const col = i % STAGE_COLS;
    
        const x = STAGE_PADDING + col * (BRICK_WIDTH + BRICK_PADDING);
        const y = STAGE_PADDING + row * (BRICK_HEIGHT + BRICK_PADDING);
    
        if (element === 0) return ack;
    
        return [
          ...ack,
          new ChallengesMode(
            "#playField",
            3,
            200,
            220,
            { x, y },
            CHICKEN_ENERGY[element],
            CHICKEN_IMAGES[element],
            
          )
        ];
      }, [] as ChallengesMode[]);
    }
    else {
    return level.reduce((ack, element, i) => {
        const row = Math.floor((i + 1) / STAGE_COLS);
        const col = i % STAGE_COLS;
    
        const x = STAGE_PADDING + col * (BRICK_WIDTH + BRICK_PADDING);
        const y = STAGE_PADDING + row * (BRICK_HEIGHT + BRICK_PADDING);
    
        if (element === 0) return ack;
    
        return [
          ...ack,
          new ChallengesMode(
            "#playField",
            5,
            BRICK_WIDTH,
            BRICK_HEIGHT,
            { x, y },
            CHICKEN_ENERGY[element] + randomIntFromInterval(20,  30) ,
            CHICKEN_IMAGES[element],
            
          )
        ];
      }, [] as ChallengesMode[]);
   }
  }
}