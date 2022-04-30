// global variables
const fs = require("fs");
const util = require("util");
const uuid = require("../helpers/uuid");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// class to handle notes, creates functions to read, write, get, and add notes
class Store {
  read() {
    return readFileAsync("db/db.json", "utf-8");
  }

  write(note) {
    return writeFileAsync("db/db.json", JSON.stringify(note));
  }

  getNotes() {
    return this.read().then((notes) => {
      let parsedNotes;
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (error) {
        parsedNotes = [];
      }
      return parsedNotes;
    });
  }

  addNotes(note) {
    const { title, text } = note;
    const newNote = {
      title,
      text,
      id: uuid(),
    };
    return this.getNotes()
      .then((notes) => [...notes, newNote])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNote);
  }
}

module.exports = new Store();
