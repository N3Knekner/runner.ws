module.exports = {
    log:{
        red: (msg) => { console.log("[31m" + msg + " [0m") },
        green: (msg) => { console.log("[32m" + msg + " [0m") },
        blue: (msg) => { console.log("[34m" + msg + " [0m") },
        yellow: (msg) => { console.log("[33m" + msg + " [0m") },
        bold: (msg) => { console.log("[37m" + msg + " [0m") },
        magenta: (msg) => { console.log("[35m" + msg + " [0m") },
        cyan: (msg) => { console.log("[36m" + msg + " [0m") },
    },
    alert:{
        red: (msg) => { console.log("[1;91m" + msg + " [0m") },
        green: (msg) => { console.log("[1;92m" + msg + " [0m") },
        blue: (msg) => { console.log("[1;94m" + msg + " [0m") },
        yellow: (msg) => { console.log("[1;93m" + msg + " [0m") },
        bold: (msg) => { console.log("[1;97m" + msg + " [0m") },
        magenta: (msg) => { console.log("[1;95m" + msg + " [0m") },
        cyan: (msg) => { console.log("[1;96m" + msg + " [0m") },
    },
    list: (msg={}) => {
        if (typeof msg !== "object") return;
        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx\n{");
        for(var x in msg) {
            let colorX = 37;
            let colorMsg = 37;
            if (typeof msg[x] === "string") {
                colorMsg = 33;
            }else if (typeof msg[x] === "number") {
                colorMsg = 34;
            }else if (typeof msg[x] === "boolean") {
                colorMsg = 35;
            }else if (typeof msg[x] === "object") {
                colorX = 37;
                colorMsg = 1;

                console.log("  ", `[${colorX}m` + x + "[0m :", `[${colorMsg}m{...}[0m,`);
                continue;
            }else if (typeof msg[x] === "function") {
                colorMsg = 34;
                colorX = 32;

                console.log("  ", `[${colorX}m` + x + "[0m :", `()[${colorMsg}m => [0m[1m{...}[0m,`);
                continue;
            }
            console.log("  ", `[${colorX}m` + x + "[0m :", `[${colorMsg}m` + msg[x] + " [0m,");
            
        }
        console.log("}\nxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    }
}