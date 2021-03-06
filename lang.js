const fs = require("fs");
const path = require("path");
const langs = {};

class Language {
    constructor(data) {
        this.data = data;
    }

    get(text) {
        return this.data[text];
    }
    
    get(text, options) {
        let message = this.data[text];
        for(const key in options) {
            message = message.replace(`{${key}}`, options[key]);
        }
        return message;
    }
}

module.exports.load = () => {
    fs.readdirSync("./langs/").forEach(file => {
        console.log("[Langs] Loading lang: " + file);
        const lang = require(`./langs/${file}`);
        langs[path.parse(file).name] = lang;
    });
}

module.exports.loadSilent = () => {
    fs.readdirSync("./langs/").forEach(file => {
        const lang = require(`./langs/${file}`);
        langs[path.parse(file).name] = lang;
    });
}

module.exports.get = (lang) => {
    return new Language(langs[lang] ? langs[lang] : "en");
}

/**
 * @deprecated Use get instead
 */
module.exports.directGet = (lang, text) => {
    if(langs[lang]) {
        return langs[lang][text];
    } else {
        console.error(`[Langs] Unknown lang: ${lang}`);
        return text;
    }
}