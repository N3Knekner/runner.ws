//import c from "./src/console-rgb-win.single";
const c = require("./src/console-rgb-win.single");
import ActionsManager from "./src/ActionsManager.class";
//import RoomHandler from "./src/roomHandler.single"
import Session from "./src/Session.class"

import express from 'express';
import ws from "express-ws";
//import web from "ws";

const SteamAPI = require('steamapi');
const steam = new SteamAPI('486A18304265FD47ED317BE4F8442A2C');

const app = express();
const xws = ws(app);
const adm = new ActionsManager();

app.use(express.static('public'));

var _lastId=0;

const _connected = [null];
const _disconnected = [new Session(null, 0)];

app.ws('/', function (ws, req) {
    //console.clear();
    c.log.cyan("New Connection > ");
    c.log.magenta("ip: "+ req.connection.remoteAddress);

    //manageConnection(ws, req);
    
    ws.on('message', function (msg) {
        const data = msg.split('|');
        data[0] === "!" ? admin(ws, data[1]) : false;
        data[0] === "?" ? manageConnection(ws, req, data[1]):
        console.log("Msg received from "+req.connection.remoteAddress,msg);
    });
});

function manageConnection(ws,req, steamId){
    var session = null;
    //const steamId = req.connection.remoteAddress;
    c.log.yellow("Old Status:");
    console.log("Sessions online:  ", _connected.map((v, i, o) => { return (v || { _userId: "X" })._userId }));
    console.log("Sessions offline: ", _disconnected.map((v, i, o) => { return (v || { _userId: "X" })._userId }));

    const alreadyJoined = steamId === "admin" ? 0 : (_disconnected.findIndex((v, i, o) => { return ((v === undefined || v === null) ? { steamId: false } : v)._steamId == steamId; }));
    c.log.green(alreadyJoined !== -1 ? "Detected reconnecting attempt" : "Detected as new session");
    if (alreadyJoined === -1) {
        _lastId++;
        session = new Session(ws, _lastId);
        session._steamId = steamId;
        session._player.class = "runner"
        _connected[_lastId] = session;
        getSteamProfile(session);
        ws.send("?|connection:success");
    } else {
        _disconnected[alreadyJoined]._webSocket = ws;
        _connected[alreadyJoined] = _disconnected[alreadyJoined];
        _disconnected[alreadyJoined] = null;
        session = _connected[alreadyJoined];
        ws.send("?|reconnection:success");
    }

    c.log.yellow("New Status:");
    console.log("Sessions online:  ", _connected.map((v, i, o) => { return (v || { _userId: "X" })._userId }));
    console.log("Sessions offline: ", _disconnected.map((v, i, o) => { return (v || { _userId: "X" })._userId }));

    ws.on('close', function (msg) {
        c.log.cyan(session._userId + " disconnected! " + msg);
        _connected[session._userId] = null;
        _disconnected[session._userId] = session;
    });

    ws.send("1|playersList" + JSON.stringify(_connected));
}

function admin(ws, msg) {
    //if(_connected[0]._webSocket !== ws)return; <--------------------------------- Security
    const data = msg.split(':');
    adm.notify(data[0], ws, data[1]);
}

function getSteamProfile(session){
    console.log("Requesting Steam profile");
    steam.resolve('https://steamcommunity.com/id/'+session._steamId).then(id => {
        console.log("Steam id: "+id); // 76561198146931523
        steam.getUserSummary(id).then(summary => {
            console.log(summary.nickname);
            session._player.name = summary.nickname;
            session._player.thumbnail = summary.avatar.medium;
            session._player.profile = 'https://steamcommunity.com/id/'+session._steamId;
            admin(_connected[0]._webSocket, "requestPlayersList:" + session._userId);
        });
    });

        /**
            PlayerSummary {
                avatar: {
                    small: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/7f/7fdf55394eb5765ef6f7be3b1d9f834fa9c824e8.jpg',
                    medium: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/7f/7fdf55394eb5765ef6f7be3b1d9f834fa9c824e8_medium.jpg',
                    large: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/7f/7fdf55394eb5765ef6f7be3b1d9f834fa9c824e8_full.jpg'
                },
                steamID: '76561198146931523',
                url: 'http://steamcommunity.com/id/DimGG/',
                created: 1406393110,
                lastLogOff: 1517725233,
                nickname: 'Dim',
                primaryGroupID: '103582791457347196',
                personaState: 1,
                personaStateFlags: 0,
                commentPermission: 1,
                visibilityState: 3
            }
        */
}

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
adm.on('requestPlayersList',(ws, msg)=>{
    if (msg !== undefined) {
        const v = _connected[parseInt(msg)];
        ws.send("3|updatePlayerInList:"+{
            _steamId: v._steamId,
            _connectionStatus: v._connectionStatus,
            _player: v._player
        });
    } else
    ws.send("3|requestPlayersList:"+
        JSON.stringify({
            connected : (_connected.map((v, i, o) => { 
                if (v === undefined || v === null) return;
                return { 
                    _steamId: v._steamId,
                    _connectionStatus: v._connectionStatus,
                    _player: v._player}
                })
            ),
            disconnected: (_disconnected.map((v, i, o) => {
                if (v === undefined || v === null) return;
                return {
                    _steamId: v._steamId,
                    _connectionStatus: v._connectionStatus,
                    _player: v._player}
                })
            )
        })
    )
}
)
adm.on('kick',async (ws, steamId) => {
    await sessionQuit(_disconnected.findIndex((v, i, o) => { return ((v === undefined || v === null) ? { steamId: false } : v)._steamId == steamId; }));
    ws.send(`2|disconnected:${steamId}`);
})

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

async function sessionQuit(index) {
    await _disconnected[index]._webSocket.close();
    _disconnected[index] = undefined;
}

function stillAlive(ws){
    let res = false;
    ws.on('pong', () => { res = true})
    ws.ping(null, false, true);
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(res), 2000)
    })
}


/* 
MS_PER_TICK = 1000 / 64  // the time one game-tick represents | 15,625ms

PROCESSED_TIME = currentTimeInMs();

while game is running
drawFrame()

while (PROCESSED_TIME + MS_PER_TICK) < currentTimeInMs()

updateGame()
PROCESSED_TIME += MS_PER_TICK */




app.listen(3001);