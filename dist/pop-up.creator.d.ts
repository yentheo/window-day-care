import { ChildWindow } from "./child-window";
export interface PopUpOptions {
    height?: number;
    width?: number;
    toolbar?: boolean;
    status?: boolean;
    left?: number;
    top?: number;
    centerscreen?: boolean;
    fullscreen?: boolean;
    minimizable?: boolean;
    resizable?: boolean;
}
export declare const DefaultPopUpOptions: PopUpOptions;
export declare function openPopUp(name?: string, popUpOptions?: PopUpOptions): ChildWindow;
export declare function openTab(name?: string): ChildWindow;
