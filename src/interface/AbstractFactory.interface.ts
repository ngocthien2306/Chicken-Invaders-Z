import { Chicken } from "~/services/Chicken";
import { CanvasView } from "~/view/CanvasView";

export interface IAbstractFactory {
    createBasicModeGame(level: number[], type: string): IAbstractBasicMode[] | IAbstractAdvancedMode[] | null;
    createAdvancedModeGame(level: number[], type: string): IAbstractBasicMode[] | IAbstractAdvancedMode[] | null;
}

export interface IAbstractBasicMode {
    drawChicken() : void;
    moveChickenByCross(view: CanvasView) : void;

}

export interface IAbstractAdvancedMode {
    drawChicken(frame: Chicken) : void;
    moveChickenByCross(view: CanvasView) : void;
}