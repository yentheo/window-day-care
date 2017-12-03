import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { ChildWindow } from './child-window';

export class Iframe implements ChildWindow {

    private _message$ = new Subject<any>();
    public get message$(): Observable<any> { return this._message$.asObservable(); }

    private _messageListener = (e: any): void => {
        this._message$.next(e['data']);
    };

    public constructor(private _iframeElement: HTMLIFrameElement) {
        window.addEventListener('message', this._messageListener);
    }

    public sendMessage(message: any): void {
        this._iframeElement.contentWindow.postMessage(message, window.location.origin);
    }

    public remove(): void {
        this._iframeElement.removeEventListener('message', this._messageListener);
        this._message$.complete();
        this._iframeElement.parentElement.removeChild(this._iframeElement);
    }

    public setLocation(uri: string): void {
        this._iframeElement.contentWindow.location.href = uri;
    }
}
