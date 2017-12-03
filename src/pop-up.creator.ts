import { ChildWindow } from './child-window';
import { Iframe } from './iframe.child-window';
import { PopUp } from './pop-up.child-window';

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

export const DefaultPopUpOptions: PopUpOptions = {
    height: 250,
    width: 250,
    toolbar: true,
    status: true,
    left: 0,
    top: 0,
    centerscreen: false,
    fullscreen: false,
    minimizable: true,
    resizable: true
};

function optionsToString(options: PopUpOptions): string {
    const allOptions = extend(options);
    return `height=${allOptions.height},width=${allOptions.width}`
        + `,status=${allOptions.status ? '1' : '0'},resizable=${allOptions.toolbar ? '1' : '0'}`
        + `,toolbar=${allOptions.toolbar ? '1' : '0'},minimizable=${allOptions.minimizable ? '1' : '0'}`
        + `,fullscreen=${allOptions.fullscreen ? '1' : '0'},centerscreen=${allOptions.centerscreen ? '1' : '0'}`;
}

function extend(obj: { [key: string]: any }): PopUpOptions {
    const extended: { [key: string]: any } = {};
    for (const property in DefaultPopUpOptions) {
        if (obj[property] === undefined) {
            extended[property] = (DefaultPopUpOptions as any)[property];
        }
    }
    return extended;

}

export function openPopUp(name: string = 'pop-up', popUpOptions: PopUpOptions = {}): ChildWindow {
    const options = optionsToString(popUpOptions);
    return new PopUp(window.open('', name, options));
}

export function openTab(name: string = 'pop-up'): ChildWindow {
    return new PopUp(window.open('', name));
}
