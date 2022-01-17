async function notifyCustomer() {
  try {
    const customer = await getCustomer();
    console.log("Customer: ", customer);
    //if the "isGold" is set to true, this code block will be executed i.e. We will get the top movies and email will be sent, else we return.
    if (customer.isGold) {
      const movies = await getTopMovies();
      console.log("Top movies: ", movies);
      await sendEmail();
      console.log("Email sent to ", customer.email);
    } else {
      console.log(
        "Sorry, I cannot notify you because you are not the right User"
      );
    }
  } catch (error) {
    console.log("Error : -", error.message);
  }
}
notifyCustomer();

function getCustomer(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: "Michaelz Omoakin",
        isGold: true,
        email: "akindiileteforex@gmail.com"
      });
    }, 4000);
  });
}

function getTopMovies() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(["movie1", "movie2"]);
    }, 4000);
  });
}

function sendEmail() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // here we simply resolve the function without passing any value
      resolve();
    }, 4000);
  });
}
