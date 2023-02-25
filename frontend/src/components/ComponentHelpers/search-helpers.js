export const actionGenerator = (inputString) => {
    //Returns boolean if a valid command is not found in the phrase.
    const createKeywords = ["make", "create", "add", "generate", "new", "build", "mate", "creet", "cr8", "addin", "genarate", "neew", "bild"];
    const noteKeywords = ["note", "memo", "reminder", "jot", "not", "meme", "remender", "jott", "nate"];
    const notebookKeywords = ["notebook", "nootbook", "notbook", "journel", "jornal", "diery", "diarry", "logbok", "scrapbok", "scrapbuk", "recrod", "journal", "diary", "logbook", "scrapbook"];

    const words = inputString.toLowerCase().split(" ");
    let newWord = "";

    for (let i = 0; i < words.length; i++) {
        if (createKeywords.includes(words[i])) {
            newWord += "new ";
        }

        if (notebookKeywords.includes(words[i])) {
            newWord += "notebook ";
        }

        if (noteKeywords.includes(words[i]) && words.indexOf("notebook") === -1) {
            newWord += "note ";
        }
        if (newWord.split(' ').length > 2) return newWord

    }
    if (newWord.split(' ').length < 2 ) return false
    return newWord
}


//A mini switch statement I based on a redux pattern.
export const searchReducer = (word, history) => {
    switch (word) {
        case "new note":
            return history.push("/new-note");
        case "new notebook":
            return history.push("/new-notebook");
        default:
            break;
    }
};
