export default {
    log:{
        red: (msg) => { console.log(" [31m" + msg + " [0m") },
        green: (msg) => { console.log(" [32m" + msg + " [0m") },
        blue: (msg) => { console.log(" [34m" + msg + " [0m") },
        yellow: (msg) => { console.log(" [33m" + msg + " [0m") },
        bold: (msg) => { console.log(" [37m" + msg + " [0m") },
        magenta: (msg) => { console.log(" [35m" + msg + " [0m") },
        cyan: (msg) => { console.log(" [36m" + msg + " [0m") },

        /* Red
            <ESC>[32m Green
            <ESC>[33m Yellow
            <ESC>[34m Blue
            <ESC>[35m Magenta
            <ESC>[36m Cyan
            <ESC>[37m White */
    },
    alert:{
        red: (msg) => { console.log(" [91m" + msg + " [0m") },
        green: (msg) => { console.log(" [92m" + msg + " [0m") },
        blue: (msg) => { console.log(" [94m" + msg + " [0m") },
        yellow: (msg) => { console.log(" [93m" + msg + " [0m") },
        bold: (msg) => { console.log(" [97m" + msg + " [0m") },
        magenta: (msg) => { console.log(" [95m" + msg + " [0m") },
        cyan: (msg) => { console.log(" [96m" + msg + " [0m") },
    },
    list: (msg={}) => {
        if (typeof msg !== "object") return;
        console.log("{");
        msg.forEach(e => {
            console.log(e)
        });
        console.log("}");
    }
}