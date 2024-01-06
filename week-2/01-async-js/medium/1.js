// const fs = require("fs");

// fs.readFile("a.txt", "utf8", (err, data) => {
//   let hello = data;
//   let hello1 = hello.replace(/\s+/g, " ");
//   fs.writeFile("a.txt", hello1, "utf8", (data, err) => {
//   });
// });

// more fancy  way of writing
const fs = require("fs");

fs.readFile("a.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  let hello = data;
  let hello1 = hello.replace(/\s+/g, " ");

  fs.writeFile("a.txt", hello1, "utf8", (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return;
    }
    console.log("File written successfully!");
  });
});
