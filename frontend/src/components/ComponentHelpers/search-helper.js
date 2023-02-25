const processString = (inputString) => {
    const createKeywords = ["make", "create", "add", "generate", "new", "build", "mate", "creet", "cr8", "addin", "genarate", "neew", "bild"];
    const noteKeywords = ["note", "memo", "reminder", "jot", "not", "meme", "remender", "jott"];
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
    }
    return newWord
}
