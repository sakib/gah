## GIFs Against Humanity
Cards Against Humanity, but with GIFs! Built at HackPrinceton Fall 2016.

![alt text](http://i.imgur.com/ta05yUe.jpg "Don't you dare hover over me")

## Description

Equipped with a random cat photo, battle your friends by picking the best out of a hand of random GIFs from Giphy!

Uses Microsoft Computer Vision API to title each GIF - just hover over your hand and you'll probably see funny guesses as to what's in each GIF.

Uses NodeJS and Socket.io to manage group membership through multicast event messaging between clients and the server.

## Setup

To run locally, first install [NodeJS](https://nodejs.org/en/download/) and then run these in your terminal.

```
git clone https://github.com/sakib/gah
mv gah chat-app
cd chat-app
npm install
node index.js
```

The server should be running on [localhost:3000](http://localhost:3000/).
