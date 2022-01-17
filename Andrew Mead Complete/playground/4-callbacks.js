const doWorkCallback = callback => {
  setTimeout(() => {
    // callback("This is my error!", undefined);
    callback(undefined, [1, 4, 7]);
  }, 2000);
};
doWorkCallback((error, result) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log(result);
});
