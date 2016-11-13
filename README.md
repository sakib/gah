## GIFs Against Humanity
Cards Against Humanity, but with GIFs! Built at HackPrinceton Fall 2016.

![alt text](http://i.imgur.com/ta05yUe.jpg "Don't you dare hover over me")

Equipped with a random cat photo, battle your friends by picking the best out of a hand of random GIFs from Giphy!

Uses Microsoft Computer Vision API to title each GIF - just hover over your hand :^)

Uses NodeJS and Socket.io to manage group membership through multicast event messaging between clients and the server.

To run locally, install [NodeJS](https://nodejs.org/en/download/) 

```
git clone https://github.com/sakib/gah
mv gah chat-app
cd chat-app
npm install
node index.js
```

The server should be running on [localhost:3000](http://localhost:3000/).
