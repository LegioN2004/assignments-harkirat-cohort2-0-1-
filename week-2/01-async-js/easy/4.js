let read = require("fs");

read.writeFile("a.txt", "dekh tera baap aya", "utf-8", (err) => {
  if (err) {
    console.error("Error writing to file:", err);
  } else {
    console.log("File has been written successfully.");
  }
});

read.readFile("a.txt", "utf-8", (err, data) => {
  console.log(data);
  if (err) {
    console.error("Error writing to file:", err);
  } else {
    console.log("File has been written successfully.");
  }
});

for (let i = 0; i < 100; i++) {
  console.log(i);
}
