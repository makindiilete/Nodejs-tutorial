//Promise function
const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      //if any of the argument passed is a negative number, we reject the operation and return
      if (a < 0 || b < 0) {
        return reject("Numbers must be non-negative!");
      }
      resolve(a + b);
    }, 2000);
  });
};

//Async function that calls the "add" promise function
const doWork = async () => {
  //passing a negative value the first function in the chain
  const sum = await add(1, -99);
  const sum2 = await add(sum, 50);
  const sum3 = await add(sum2, -3);
  return sum3;
};

//Handling the resolve and reject of our doWork async function
doWork()
  .then(result => {
    console.log("Result " + result);
  })
  .catch(e => {
    console.log(e);
  });
