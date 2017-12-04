import { ChildWindow } from './child-window';
/** Options for pop-up */
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
/** Default options */
export declare const DefaultPopUpOptions: PopUpOptions;
/**
 * Opens a pop-up window.
 * @param name name of the pop-up, if this is the same as an already open pop-up, there will be no new pop-up
 * @param popUpOptions options for the pop-up, like width
 */
export declare function openPopUp(name?: string, popUpOptions?: PopUpOptions): ChildWindow;
/**
 * Opens a tab.
 * @param name name of the tab, if this is the same as an already open tab, there will be no new tab
 */
export declare function openTab(name?: string): ChildWindow;
