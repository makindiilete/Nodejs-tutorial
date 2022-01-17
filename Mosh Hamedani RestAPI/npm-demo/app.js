const http = require("http");

//We create server and we pass two parameters (request & response)
const server = http.createServer((req, res) => {
  //VARIOUS ROUTES
  if (req.url === "/") {
    res.write("Hello Client");
    res.end();
  }

  if (req.url === "/api/courses") {
    res.write(JSON.stringify([1, 2, 3]));
    res.end();
  }
  //This route displays the family members
  if (req.url === "/api/family") {
    res.write(
      JSON.stringify([
        { id: 1, Name: "Michaelz Omoakin" },
        { id: 2, Name: "Abiodun Akindiilete" },
        { id: 3, Name: "Abimbola Akindiilete" },
        { id: 4, Name: "Ayobami Akindiilete" },
        { id: 5, Name: "Eunice Akindiilete" },
        { id: 6, Name: "Iyanu Akindiilete" },
        { id: 7, Name: "Oluwayemisi Akindiilete" },
        { id: 8, Name: "Oluwaferanmi Akindiilete" }
      ])
    );
    res.end();
  }
});

//we call our server variable and give it the 'listen' method and pass a port it listens to as argument.
server.listen(3000);

console.log("Listening on port 3000...");
