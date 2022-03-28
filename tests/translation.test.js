const lang = require("../lang");

describe("Translate strings", () => {
  lang.loadSilent();
  it("Translates strings correctly", () => {
    expect(lang.get("en").get("help_title")).toBe("Help");
    expect(lang.get("de").get("help_title")).toBe("Hilfe");
  });
})