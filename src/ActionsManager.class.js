export default class ActionsManager{
    constructor(){
        this._actions = [];
    }
    notify(trigger = "string", ws, ...msg){
        if(typeof this._actions[trigger] == undefined) return;
        this._actions[trigger](ws, ...msg);
    }
    on(trigger = "string", callback = (ws, ...msg)=>{}){
        this._actions[trigger] = callback;
    }
}