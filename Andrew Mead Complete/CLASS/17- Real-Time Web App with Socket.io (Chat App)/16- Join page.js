/*GOAL : - Setting up the join page for the chat app.
* 1-  Users will provide their username and the room they like to join
* 2-  They submit the form and get redirected to the chatroom

1-  Create a separate html file in the "public" dir "chat.html" >>> Index.html is the homepage and will be the join page, "chat.html" will contain everything we have in the index.html file*/

//INDEX.HTML
/*<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Chat App</title>
    <link rel="icon" href="img/favicon.png" />
    <link rel="stylesheet" href="css/styles.min.css" />
  </head>
  <body>
    <div class="centered-form">
      <!--actual form content-->
      <div class="centered-form__box">
        <h1>Join</h1>
        <!--form action redirect user to d chat page when the form is submitted-->
        <form action="chat.html">
          <label>Display name</label>
          <input
            type="text"
            name="username"
            placeholder="Display name"
            required
          />
          <label>Room</label>
          <input type="text" name="room" placeholder="Room" required />
          <button>Join</button>
        </form>
      </div>
    </div>
  </body>
</html>
*/

//CHAT.HTML
/*<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Chat App</title>
    <link rel="icon" href="img/favicon.png" />
    <link rel="stylesheet" href="css/styles.min.css" />
  </head>
  <body>
    <div class="chat">
      <!--sidebar-->
      <div class="chat__sidebar"></div>
      <!--Main content-->
      <div class="chat__main">
        <div id="messages" class="chat__messages"></div>
        <!--our form-->
        <div class="compose">
          <form id="message-form">
            <input name="message" placeholder="Message" />
            <button>Send</button>
          </form>
          <button id="send-location">Send location</button>
        </div>
      </div>
    </div>

    <!--Setting our template for chat messages-->
    <script id="message-template" type="text/html">
      <div class="message">
          <p>
              <span class="message__name">Some User Name</span>
              <span class="message__meta">{{createdAt}}</span>
          </p>
          <p>{{chatMessage}} </p>
      </div>
    </script>
    <!--Setting our template for location messages-->
    <script id="location-template" type="text/html">
      <div class="message">
          <p>
              <span class="message__name">Some User Name</span>
              <span class="message__meta">{{createdAt}}</span>
          </p>
          <p> <a href="{{locationUrl}}" target="_blank">My Current Location</a> </p>
      </div>
    </script>

    <!--for mustache dynamic templating-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/3.0.1/mustache.min.js"></script>
    <!--ds enable us track d time msgs was sent-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.22.2/moment.min.js"></script>
    <!--ds enable us send query string-->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/qs/6.6.0/qs.min.js"></script>
    <!--The client side version of socket.io library-->
    <script src="/socket.io/socket.io.js"></script>
    <script src="js/chat.js"></script>
  </body>
</html>
*/

/*Now if we refresh the app, we get a nice styling for a registration form on the index.html page and when we click on Join, we get redirected to the chat page.

On the chat page though, in the address bar, we have query strings of the name we entered with and the room, this we will use to dynamically render the username and room in the chat page instead of the static page we are using now.

http://localhost:3000/chat.html?username=Michaelz&room=Lagos
*/
