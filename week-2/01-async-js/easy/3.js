let read = require("fs");

read.readFile("a.txt", "utf-8", (err, data) => {
  for (let i = 0; i < 1000; i++) {
    console.log(i);
  }
  console.log("done reading file");
  console.log(err);
  console.log(data);
});

for (let i = 0; i < 100; i++) {
  console.log(i);
}
