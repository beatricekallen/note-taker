const express = require("express");
const path = require("path");
const fs = require("fs");
// const notes = require("./db/db.json");
const uuid = require("./helpers/uuid");
const htmlRoutes = require("./routes/htmlRoutes");
const apiRoutes = require("./routes/apiRoutes");

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

app.use(express.static(path.join(__dirname, "public")));

// should read the db.json file and return all saved notes as JSON
// app.get("/api/notes", (req, res) => {
//   fs.readFile("./db/db.json", "utf8", (err, data) => {
//     if (err) {
//       console.error(err);
//     } else {
//       res.json(data);
//     }
//   });
// });

// should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client.
// app.post("/api/notes", (req, res) => {
//   fs.readFile(__dirname + "/db/db.json", "utf8", (err, data) => {
//     if (err) return res.json(err);
//     const notes = JSON.parse(data);
//     notes.push(req.body);
//     fs.writeFile(
//       __dirname + "/db/db.json",
//       JSON.stringify(notes, null, 2),
//       (err) => {
//         if (err) return res.json(err);
//         res.status(200).send(req.body);
//       }
//     );
//   });
// });

// const { title, text } = req.body;

// notes.push(req.body);

// if (title && text) {
//   const newNote = {
//     title,
//     text,
//     review_id: uuid(),
//   };

//   fs.readFile(__dirname + "/db/db.json", "utf8", (err, data) => {
//     if (err) {
//       console.error(err);
//     } else {
//       const parsedNotes = JSON.parse(data);
//       parsedNotes.push(newNote);
//       fs.writeFile(
//         __dirname + "/db/db.json",
//         JSON.stringify(parsedNotes, null, 4),
//         (err) =>
//           err ? console.error(err) : console.info("Successfully updated notes!")
//       );
//     }
//   });

//   const response = {
//     status: "success",
//     body: newNote,
//   };

//   console.log(response);
//   res.json(response);
// } else {
//   res.json("Error in posting note");
// }

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
