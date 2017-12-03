import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ChildWindow } from './child-window';

export class PopUp extends ChildWindow {

    public constructor(_window: Window) { super(_window); }
    protected _cleanUp(): void { this._window.close(); }
}
