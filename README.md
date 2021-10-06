# runner.ws
🚀 Server WebSocket based for Runner.io project.
The idea of Runner.io project is focused on *Networking* understanding how games have such low latency, sustain, fast connection, session management, and try to use Steam API.
(Node.js is used becuse of the fast refresh and no long compiling, when the sistem is done I have plans to integrate the server in ingame C# so the players will be able to use the Steam Tunnel instead of an external VPN)

▶ Start the server will open 3001 ports for http and ws.
✅ When use http the server will verify if the user is an admin, them send the control panel:

![When connect to server](https://github.com/N3Knekner/N3Knekner/blob/main/step1.png?raw=true)

![When connect to server internal logs](https://github.com/N3Knekner/N3Knekner/blob/main/step2.png?raw=true)
(the map and console panel are to in game debugging, so they are not implemented)

✅ When in game are two steps, conect to the server and start match.

![When connect to server](https://github.com/N3Knekner/N3Knekner/blob/main/step3.png?raw=true)

![When connect to server internal logs](https://github.com/N3Knekner/N3Knekner/blob/main/step4.png?raw=true)

![When connect to server control panel](https://github.com/N3Knekner/N3Knekner/blob/main/step5.png?raw=true)

![When connection is success](https://github.com/N3Knekner/N3Knekner/blob/main/step6.png?raw=true)
