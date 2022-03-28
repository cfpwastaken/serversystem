const badWords = ["fuck", "shit", "piss off", "dick", "asshole", "bitch", "bastard", "wixxer", "wichs", "noob", "nub", "ratio", "didn't ask", "stay mad", "cry about it", "negative iq", "your opinion is wrong", "get a life", "touch grass", "n00b"]

module.exports = function check(content) {
  let containsBadWord = false;
  let censored = content;
  for(const badWord in badWords) {
      if(censored.toLowerCase().match(new RegExp(badWords[badWord], "g"))) {
          containsBadWord = true;
          // set the description to the messages with the detected words in bold
          const censoredWord = "*".repeat(badWords[badWord].length);
          censored = censored.toLowerCase().replace(new RegExp(badWords[badWord], "g"), `${censoredWord}`);
      }
  }
  return {containsBadWord, censored};
}