export default class Session{
    constructor(ws, id) {
        this._webSocket=ws;
        this._userId=id;
        this._steamId = 0;
        this._connectionStatus=4; // 1: opening, 2:open, 3: closing, 4: closed
        this._player = { name: "Admin", thumbnail: "https://img.icons8.com/bubbles/2x/admin-settings-male.png", class: "Administrator", profile:"https://store.steampowered.com/"};
    }
}