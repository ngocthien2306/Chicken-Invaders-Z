import { Chicken } from "~/services/Chicken";
import { CanvasView } from "~/view/CanvasView";

export interface IAbstractFactory {
    createBasicModeGame(): IAbstractBasicMode;
    createAdvancedModeGame(): IAbstrackAdvancedMode;
}

export interface IAbstractBasicMode {
    drawChicken(frame: Chicken) : void;
    moveChickenByCross(view: CanvasView) : void;
}

export interface IAbstrackAdvancedMode {
    drawChicken(frame: Chicken) : void;
    moveChickenByElip(view: CanvasView) : void;
}