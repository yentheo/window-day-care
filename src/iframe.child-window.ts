import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ChildWindow } from './child-window';

export class Iframe extends ChildWindow {

    public constructor(private _iframeElement: HTMLIFrameElement) {
        super(_iframeElement.contentWindow);
        _iframeElement.contentDocument.addEventListener('DOMContentLoaded', () => console.log('loaded iframe'));
        _iframeElement.addEventListener('DOMContentLoaded', () => console.log('loaded iframe'));
        _iframeElement.contentWindow.document.addEventListener('DOMContentLoaded', () => console.log('loaded iframe'));
    }

    protected _cleanUp(): void {
        this._iframeElement.parentElement.removeChild(this._iframeElement);
    }
}
