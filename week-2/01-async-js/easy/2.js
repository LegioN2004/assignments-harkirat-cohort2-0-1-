let count = 0;

function counterH() {
  count++;
  console.log(count);
  setTimeout(counterH, 1000);
}

counterH();
