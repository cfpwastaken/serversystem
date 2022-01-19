const sql = require("./sql");

// TODO: caching

module.exports.get = async (id) => {
    const result = await sql("SELECT xp, level, reqxp FROM users WHERE id=?", id);
    if(result.length == 0) {
        await sql("INSERT INTO users (id, xp, level, reqxp) VALUES (?, 0, 1, 100)", id);
        return {
            xp: 0,
            level: 1,
            reqxp: 100
        }
    }
    return result[0];
}

module.exports.addXP = async (id, xp) => {
    const current = await this.get(id);
    current.xp += xp;
    
    if(current.xp > current.reqxp) {
        current.xp -= current.reqxp;
        current.level++;
        current.reqxp = Math.floor(current.reqxp * 1.25);
        await sql("UPDATE users SET xp=?, level=?, reqxp=?", [current.xp, current.level, current.reqxp]);
        return current.level;
    }
    await sql("UPDATE users SET xp=?", current.xp);
    return 0;
}

