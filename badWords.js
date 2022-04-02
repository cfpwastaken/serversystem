const badWords = ["fuck", "shit", "piss off", "dick", "asshole", "bitch", "bastard", "wixxer", "wichs", "noob", "nub", "ratio", "didn't ask", "stay mad", "cry about it", "negative iq", "your opinion is wrong", "get a life", "touch grass", "n00b"]

module.exports = function check(content) {
  let containsBadWord = false;
  // remove invisible characters and diacritics from the string as they can be used to bypass the bad word check
  let censored = content.normalize("NFD").replace(/[^\u0000-\u007E]/g, "").replace(/[\u0300-\u036f]/g, '');
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