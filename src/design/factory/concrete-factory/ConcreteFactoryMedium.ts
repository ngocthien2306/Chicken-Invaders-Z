import { randomIntFromInterval } from "~/extensions/helper.extension";
import { IAbstractBasicMode, IAbstractFactory } from "~/interface/AbstractFactory.interface";
import { BRICK_HEIGHT, BRICK_PADDING, BRICK_WIDTH, CHICKEN_ENERGY, CHICKEN_IMAGES, STAGE_COLS, STAGE_PADDING } from "~/setup";
import { ChallengesMode } from "../advance-mode/AdvanceModeChallenges";
import { EazyMode } from "../basic-mode/BasicModeEazy";
import { MediumMode } from "../basic-mode/BasicModeMedium";

export class ConcreteFactoryMedium implements IAbstractFactory {
    public createBasicModeGame(level: number[], typeLV: string): IAbstractBasicMode[] {
        if(typeLV === "BOSS") {
          return level.reduce((ack, element, i) => {
            const row = Math.floor((i + 1) / STAGE_COLS);
            const col = i % STAGE_COLS;
        
            const x = STAGE_PADDING + col * (BRICK_WIDTH + BRICK_PADDING);
            const y = STAGE_PADDING + row * (BRICK_HEIGHT + BRICK_PADDING);
        
            if (element === 0) return ack;
        
            return [
              ...ack,
              new MediumMode(
                "#playField",
                2,
                200,
                220,
                { x, y },
                CHICKEN_ENERGY[element],
                CHICKEN_IMAGES[element],
                
              )
            ];
          }, [] as MediumMode[]);
        }
        else{
        return level.reduce((ack, element, i) => {
            const row = Math.floor((i + 1) / STAGE_COLS);
            const col = i % STAGE_COLS;
        
            const x = STAGE_PADDING + col * (BRICK_WIDTH + BRICK_PADDING);
            const y = STAGE_PADDING + row * (BRICK_HEIGHT + BRICK_PADDING);
        
            if (element === 0) return ack;
        
            return [
              ...ack,
              new MediumMode(
                "#playField",
                1.5,
                BRICK_WIDTH,
                BRICK_HEIGHT,
                { x, y },
                CHICKEN_ENERGY[element] + randomIntFromInterval(2,  5),
                CHICKEN_IMAGES[element],
                
              )
            ];
          }, [] as MediumMode[]);
        }
    }

    public createAdvancedModeGame(level: number[]): null {
        return null;
    }
}