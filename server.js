'use strict';

import readline from "readline";

if (!process.env.ENVIRONMENT || !["DEVELOPMENT", "PRODUCTION"].includes(process.env.ENVIRONMENT)) {
    console.error("Missing or invalid environment. Must be DEVELOPMENT or PRODUCTION.");
    process.exit(1);
}

if (!process.env.DEFAULT_PORT) {
    console.error("Missing Port number for http");
    process.exit(1);
}

const mongoParams = [
    "MONGO_USER",
    "MONGO_PASSWORD",
    "MONGO_SERVER",
    "MONGO_DB"
];

const missingParams = mongoParams.filter(param => !process.env[param]);

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let db;

if (missingParams.length === 0) {
    import("./db.js").then(module => {
        db = module.default;
        console.log("MongoDB configuration found, database module loaded.");

        startServer();
    }).catch(err => {
        console.error("Error loading db.js:", err);
    });
} else {
    console.warn(`Missing MongoDB configuration: ${missingParams.join(', ')}`);
    console.warn("API is running, but it will not connect to the database. This may cause instability.");

    rl.question("Do you want to continue despite the missing MongoDB configuration? (yes/no) [no]: ", answer => {
        if (answer.toLowerCase() === "no" || answer.trim() === "") {
            console.log("Exiting due to missing configuration...");
            rl.close();
            process.exit(1);
        } else if (answer.toLowerCase() === "yes") {
            console.log("Continuing with the missing MongoDB configuration...");
            rl.close();

            startServer();
        } else {
            console.log("Invalid response, exiting...");
            rl.close();
            process.exit(1);
        }
    });
}

function startServer() {
    const PORT = process.env.DEFAULT_PORT;
    const HOST = process.env.ENVIRONMENT === "DEVELOPMENT" ? process.env.ENDPOINT_DEV : process.env.ENDPOINT;

    (async () => {
        try {
            const http = await import("http");
            const { default: app } = await import("./app.js"); // Importa app correctamente

            const server = http.createServer(app);
            server.maxHeadersCount = 10000;

            server.listen(PORT, HOST, () => {
                console.log(`Server running on http://${HOST}:${PORT}`);
            });

            process.on("SIGINT", async () => {
                console.log("Closing server...");
                if (db) {
                    await db.close();
                }
                process.exit(0);
            });


        } catch (err) {
            console.error("Error loading modules:", err);
        }
    })();
}
