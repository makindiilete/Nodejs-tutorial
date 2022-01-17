/*GOAL : - We will be integrating style into the chat app.
Just like we did in weather app*/

/*
//style.min.css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html {
  font-size: 16px;
}
input {
  font-size: 14px;
}
body {
  line-height: 1.4;
  color: #333;
  font-family: Helvetica, Arial, sans-serif;
}
h1 {
  margin-bottom: 16px;
}
label {
  display: block;
  font-size: 14px;
  margin-bottom: 8px;
  color: #777;
}
input {
  border: 1px solid #eee;
  padding: 12px;
  outline: none;
}
button {
  cursor: pointer;
  padding: 12px;
  background: #7c5cbf;
  border: none;
  color: #fff;
  font-size: 16px;
  transition: background 0.3s ease;
}
button:hover {
  background: #6b47b8;
}
button:disabled {
  cursor: default;
  background: #7c5cbf94;
}
.centered-form {
  background: #333744;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.centered-form__box {
  box-shadow: 0 0 17px 1px #1d1f26;
  background: #f7f7fa;
  padding: 24px;
  width: 250px;
}
.centered-form button {
  width: 100%;
}
.centered-form input {
  margin-bottom: 16px;
  width: 100%;
}
.chat {
  display: flex;
}
.chat__sidebar {
  height: 100vh;
  color: #fff;
  background: #333744;
  width: 225px;
  overflow-y: scroll;
}
.chat__main {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  max-height: 100vh;
}
.chat__messages {
  flex-grow: 1;
  padding: 24px 24px 0;
  overflow-y: scroll;
}
.message {
  margin-bottom: 16px;
}
.message__name {
  font-weight: 600;
  font-size: 14px;
  margin-right: 8px;
}
.message__meta {
  color: #777;
  font-size: 14px;
}
.message a {
  color: #0070cc;
}
.compose {
  display: flex;
  flex-shrink: 0;
  margin-top: 16px;
  padding: 24px;
}
.compose form {
  display: flex;
  flex-grow: 1;
  margin-right: 16px;
}
.compose input {
  border: 1px solid #eee;
  width: 100%;
  padding: 12px;
  margin: 0 16px 0 0;
  flex-grow: 1;
}
.compose button {
  font-size: 14px;
}
.room-title {
  font-weight: 400;
  font-size: 22px;
  background: #2c2f3a;
  padding: 24px;
}
.list-title {
  font-weight: 500;
  font-size: 18px;
  margin-bottom: 4px;
  padding: 12px 24px 0;
}
.users {
  list-style-type: none;
  font-weight: 300;
  padding: 12px 24px 0;
}



//INDEX.HTML
<!DOCTYPE html>
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
