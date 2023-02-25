export const actionGenerator = (inputString) => {
    //Returns boolean if a valid command is not found in the phrase.
    const createKeywords = ["make", "create", "add", "generate", "new", "build", "mate", "creet", "cr8", "addin", "genarate", "neew", "bild"];
    const noteKeywords = ["note", "memo", "reminder", "jot", "not", "meme", "remender", "jott", "nate", "n8"];
    const notebookKeywords = ["notebook", "nootbook","ntebook", "notbook", "journel", "jornal", "diery", "diarry", "logbok", "scrapbok", "scrapbuk", "recrod", "journal", "diary", "logbook", "scrapbook"];

    const words = inputString.toLowerCase().split(" ");
    let newWords = [];

    for (let i = 0; i < words.length; i++) {
        if (createKeywords.includes(words[i])) {
            if (newWords.includes("new")) continue;
            newWords.push("new");
        }

        if (notebookKeywords.includes(words[i])) {
            if (newWords.includes("notebook")) continue;
            newWords.push("notebook")
        }

        if (noteKeywords.includes(words[i]) && words.indexOf("notebook") === -1) {
            if (newWords.includes("note")) continue;
            newWords.push("note")
        }

        if (newWords.length > 1) return newWords.join("")

    }
    if (newWords.length < 2) return false
    return newWords.sort().join("")
}


//A mini switch statement I based on a redux pattern.
export const searchReducer = (word, history) => {
    switch (word) {
        case "newnote":
            return "/new-note";
        case "newnotebook":
            return "/new-notebook";
        default:
            break;
    }
};
