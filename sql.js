const mysql = require("mysql");
const secrets = require("./secrets.json");
const db = mysql.createConnection({
    host: secrets.mysql.host,
    user: secrets.mysql.user,
    password: secrets.mysql.password,
    database: secrets.mysql.database
})
db.on("end", () => {
    console.log("[MySQL] Reconnecting...");
    db.connect();
    console.log("[MySQL] Reconnected!");
})
console.log("[MySQL] Connecting...");
db.connect();
console.log("[MySQL] Connected!");

async function dbqp(sql, opts) {
    const promise = new Promise((resolve, reject) => {
        db.query(sql, opts, (err, results, fields) => {
            if(err) {
                reject(err);
                return;
            }

            resolve(results);
        });
    });
    return promise;
}

module.exports = dbqp;
