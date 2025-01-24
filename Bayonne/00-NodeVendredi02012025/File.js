class File {
    constructor() {
        const FS = require("fs");
    }

    Get(Path) {
        FS.readFile(Path, "utf8", (Error, Data) => {
            if (Error) {
                console.log(Error);
                return false;
            }
            JsonData = JSON.parse(Data);
            return Data;
        });
    }
}

module.exports = {File};