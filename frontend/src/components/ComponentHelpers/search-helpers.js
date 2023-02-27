//optimized to use a set for faster lookup
export const actionGenerator = (inputString) => {

    if (inputString === "test") return "test";
    const createKeywords = new Set(["make", "create", "add", "generate", "new", "build", "mate", "creet", "cr8", "addin", "genarate", "neew", "bild"]);
    const noteKeywords = new Set(["note", "memo", "reminder", "jot", "not", "meme", "remender", "jott", "nate", "n8"]);
    const notebookKeywords = new Set(["notebook", "nootbook", "ntebook", "notbook", "journel", "jornal", "diery", "diarry", "logbok", "scrapbok", "scrapbuk", "recrod", "journal", "diary", "logbook", "scrapbook", "natebook"]);

    const words = inputString.toLowerCase().split(" ");
    const newWords = new Set();
    for (let i = 0; i < words.length; i++) {
        if (createKeywords.has(words[i])) newWords.add("new");
        if (notebookKeywords.has(words[i])) newWords.add("notebook")
        if (noteKeywords.has(words[i]) && !newWords.has("notebook")) newWords.add("note")
    }

    if (newWords.size < 2) return false;
    return [...newWords].sort().join("");
}

//A mini switch statement I based on a redux pattern.
export const searchReducer = (word) => {
    switch (word) {
        case "newnote":
            return "/new-note";
        case "newnotebook":
            return "/new-notebook";
        case "test":
            return "/test"
        default:
            break;
    }
};
