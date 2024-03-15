'use strict';


import { generateId, findNotebook, findNotebookIndex } from "./utils.js";
// DB Object

let notekeeperDB = {};

const initDB = function () {
    const db = localStorage.getItem("notekeeperDB");

    if (db) {
        notekeeperDB = JSON.parse(db);
    } else {
        notekeeperDB.notebooks = [];
        localStorage.setItem("notekeeperDB", JSON.stringify(notekeeperDB));
    }
}

initDB();


/**
 * Reads and loads the loacalStorage dara in to the global variable `notekeeperDB`
 */

const readDB = function () {
    notekeeperDB = JSON.parse(localStorage.getItem("notekeeperDB"));
}

const writeDB = function () {
    localStorage.setItem("notekeeperDB", JSON.stringify(notekeeperDB));
}


export const db = {
    post: {
        notebook(name) {
            readDB();

            const notebookData = {
                id: generateId(),
                name,
                notes: []
            }

            notekeeperDB.notebooks.push(notebookData);
            writeDB();

            return notebookData;
        }
    },

    get: {
        notebook() {
            readDB();

            return notekeeperDB.notebooks
        }
    },

    update: {
        notebook(notebookId, name) {
            readDB();
            const notebook = findNotebook(notekeeperDB, notebookId);
            notebook.name = name;
            writeDB();

            return notebook;
        }
    },

    delete: {
        notebook(notebookId) {
            readDB();

            const notebookIndex = findNotebookIndex(notekeeperDB, notebookId);

            notekeeperDB.notebooks.splice(notebookIndex, 1)

            writeDB();
        }
    }
};