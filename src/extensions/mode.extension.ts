import { ChallengesMode } from "~/design/factory/advance-mode/AdvanceModeChallenges";
import { SuperHardMode } from "~/design/factory/advance-mode/AdvanceModeSuperHard";
import { EazyMode } from "~/design/factory/basic-mode/BasicModeEazy";
import { HardMode } from "~/design/factory/basic-mode/BasicModeHard";
import { MediumMode } from "~/design/factory/basic-mode/BasicModeMedium";
import { ConcreteFactoryBasic } from "~/design/factory/concrete-factory/ConcreteFactoryBasic";
import { ConcreteFactoryChallenge } from "~/design/factory/concrete-factory/ConcreteFactoryChallenge";
import { ConcreteFactoryHard } from "~/design/factory/concrete-factory/ConcreteFactoryHard";
import { ConcreteFactoryMedium } from "~/design/factory/concrete-factory/ConcreteFactoryMedium";
import { ConcreteFactorySuperHard } from "~/design/factory/concrete-factory/ConcreteFactorySuperHard";
import { IAbstractAdvancedMode, IAbstractBasicMode, IAbstractFactory } from "~/interface/AbstractFactory.interface";
import { LEVEL1 } from "~/setup";
import { CanvasView } from "~/view/CanvasView";

export function modeGame(factory: IAbstractFactory, level: number[]): IAbstractBasicMode[] | IAbstractAdvancedMode[] | null  {
    var new_chickens: IAbstractBasicMode[] | IAbstractAdvancedMode[] | null = [];
    var nameModel = factory.constructor.name;
    var typeLV = level.length === 9 ? "BOSS" : "BASIC";
    if(nameModel == "ConcreteFactoryBasic" || nameModel == "ConcreteFactoryMedium" || nameModel == "ConcreteFactoryHard") {
      new_chickens = factory.createBasicModeGame(level, typeLV)
    }
    else {
      new_chickens = factory.createAdvancedModeGame(level, typeLV);
    }
    return new_chickens;
}

export function setModeGame(view: CanvasView, level: number[]) : EazyMode[] | MediumMode[] | HardMode[] | ChallengesMode[] | SuperHardMode[] {
    var chickens = [] as EazyMode[] | MediumMode[] | HardMode[] | ChallengesMode[] | SuperHardMode[];
    if(view.getMode() == "No" || view.getMode() == "Eazy") {
        chickens = modeGame(new ConcreteFactoryBasic(), level) as EazyMode[];
    }
    else if (view.getMode() == "Medium") {
    chickens = modeGame(new ConcreteFactoryMedium(), level) as MediumMode[];
    }
    else if(view.getMode() == "Hard") {
    chickens = modeGame(new ConcreteFactoryHard(), level) as HardMode[];
    }
    else if(view.getMode() == "Supper Hard") {
    chickens = modeGame(new ConcreteFactorySuperHard(), level) as SuperHardMode[];
    }
    else if(view.getMode() == "Challenge") {
    chickens = modeGame(new ConcreteFactoryChallenge(), level) as ChallengesMode[];
    }

    return chickens;
}

