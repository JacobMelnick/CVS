const express = require("express");
const path = require("path");
const app = express();


const port = process.env.PORT || 5500;

// document.getElementById('form').addEventListener('click', (event) => {
//     event.preventDefault()
// })

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  console.log("hello");
  res.render("index", {title: 'hey'})
});

app.post("/", (req, res) => {
  const body = JSON.parse(req.body.key);
    res.end( handleFile(body).join(''))
});

app.listen(port, () => {
  console.log(`app is listening on http://localhost:${port}`);
});

const handleFile = (body) => {
  let cvs = [];
  const keys = Object.keys(body);
  cvs.push(keys + "\r\n");
  cvs.push(
    `${body.firstName}, ${body.lastName}, ${body.county}, ${body.city}, ${body.role}, ${body.sales},  \r\n`
  );

  if (body.children.length > 0) {
    body.children.map((song) => {
      if (song.children.length > 0) {
        cvs.push(
          `${song.firstName}, ${song.lastName}, ${song.county}, ${song.city}, ${song.role}, ${song.sales},  \r\n`
        );
        song.children.map((nextSongs) => {
          cvs.push(Object.values(nextSongs) + "\r\n");
        });
      } else {
        cvs.push(Object.values(song) + "\r\n");
      }
    });
  }

  console.log(cvs.join(""));
  return cvs;
};
