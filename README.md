## GIFs Against Humanity
Cards Against Humanity, but with GIFs! Built at HackPrinceton Fall 2016.

![ayy lmao](http://i.imgur.com/A1bkSVA.png "Don't you dare hover over me")

## Description

Equipped with a random cat photo, battle your friends by picking the best out of a hand of random GIFs from Giphy!

Uses Microsoft Computer Vision API to title each GIF - just hover over your hand and you'll probably see funny guesses as to what's in each GIF.

Uses NodeJS and Socket.io to manage group membership through multicast event messaging between clients and the server.

We apologize for the cruddy front end design, but this was all new to us :( Also front end sucks

Built by [me](http://sakib.github.io/), [Heman](https://github.com/hemangandhi) and [Aditya](https://github.com/xplustwo)

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

![great game](https://i.imgur.com/N2dNfan.jpg "great game try it out 10/10")
