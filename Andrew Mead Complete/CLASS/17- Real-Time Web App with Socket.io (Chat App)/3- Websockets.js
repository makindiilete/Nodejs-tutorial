/*GOAL : - Learning about the websocket protocol.
WEBSOCKET PROTOCOL : - This is what we will be using to create realtime app with nodejs. Websocket are not specific to nodejs, you can use them for other programming languages as well but we will be using it for nodejs in this course to create our real time chat app.

Just like the HTTP protocol, the websocket protocol will allow us to setup communication.

CHECK THE SLIDE FOR WHAT THIS LOOKS LIKE

In the diagram of the websocket protocol, : - We have the server in the middle connecting to 4 clients/browser.

HTTP VS WEBSOCKET
1-  FULL DUPLEX COMMUNICATION : - Websocket allow for full-duplex communication which means the client connect to the server and stay connected for as long as required and the client can send a message to the server while the server can also send a message to the client on its own not until the client send a request like HTTP. So its like both the client and the server can chat and any of the two party can initiate the chat.
2-  Websocket is a separate protocol from HTTP.
3-  Persistent connection between client and server.

HOW DOES THE SERVER INITIATE COMMUNICATION WITH CLIENT (A feature we do not have with HTTP)

This can be found in the diagrams : - websocket3 & 4
A client first send a message to the server (CLIENT --> SERVER) >>> The server prints this message to the chat room >>> The server now take the message and notify other 3 connected users that there is a new message from client 1 (SERVER --> CLIENT). This is what allows realtime application.

So we will be setting this up using the socket.io library which we will do in the next lesson.
*/
