//USING PROMISES

/*
//A promise takes two args : - "resolve" & "reject". Resolve for positive scenario & reject for negative scenario
const doWorkPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    // resolve([7, 4, 1]);
    reject("Things went wrong!");
  }, 2000);
});

//.then is called when a promise is resolved
doWorkPromise
  .then(result => {
    console.log("Success!", result);
  })
  //  .catch is called when the promise is rejected.
  .catch(error => {
    console.log("Error", error);
  });
*/

//Normal promise scenario
const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 2000);
  });
};

/*//First async operation
add(1, 2)
  .then(sum => {
    console.log(sum);
    //2nd nested async operation
    add(sum, 5)
      .then(sum2 => {
        console.log(sum2);
      })
      .catch(e => {
        console.log(e);
      });
  })
  .catch(e => {
    console.log(e);
  });*/

//PROMISE CHAINING 2ND METHOD (MODERN)
//first async then call
//first operation to perform
add(1, 1)
  .then(sum => {
    console.log(sum);
    //2nd operation to perform
    return add(sum, 4);
  })
  //second async then call
  .then(sum2 => {
    console.log(sum2);
  })
  .catch(e => {
    console.log(e);
  });
