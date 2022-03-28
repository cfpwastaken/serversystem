const check = require("../badWords");

describe("Bad Word Checking", () => {
  it("Notices bad words correctly", () => {
    const res = check("fuck");
    expect(res.containsBadWord).toBe(true);
  });
  it("Censors bad words correctly", () => {
    const res = check("you are a fucking piece of shit");
    expect(res.censored).toBe("you are a ****ing piece of ****");
  })
});