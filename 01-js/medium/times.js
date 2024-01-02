/*
Write a function that calculates the time (in seconds) it takes for the JS code to calculate sum from 1 to n, given n as the input.
Try running it for
1. Sum from 1-100
2. Sum from 1-100000
3. Sum from 1-1000000000
Hint - use Date class exposed in JS
There is no automated test for this one, this is more for you to understand time goes up as computation goes up
*/

let n = 1000000000;
function calculateTime() {
  return new Promise(function (resolve) {
    const startTime = new Date().getTime(); // Get the current timestamp in milliseconds

    // Perform the computation (summing from 1 to n)
    for (let i = 1; i <= n; i++) {
      let a = i;
    }

    const endTime = new Date().getTime(); // Get the timestamp after the computation
    const elapsedTime = endTime - startTime; // Calculate the elapsed time in milliseconds

    resolve(elapsedTime);
  });
}
async function main() {
  const count = await calculateTime();
  console.log(count);
}

main(n);
