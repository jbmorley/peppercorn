/*
 * Copyright (C) 2015-2016 InSeven Limited.
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 */

var Express = require('express'),
    Path = require('path'),
    HTTP = require('http'),
    SocketIO = require('socket.io');

var app = Express(),
    server = HTTP.Server(app),
    io = SocketIO(server)

/**
 * Lazy mechanism for generating a guid for each item.
 * 
 * Items require unique keys to make it possible for React to efficiently determine which DOM elements need to be
 * recreated and replaced.
 */
 function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

/**
 * Utility function for parsing a JSON-encoded message.
 */
function parse_message(callback) {
  return function(message) {
    callback(JSON.parse(message));
  }
}

/**
 * Modify the io instance to add a new method to emit a JSON-encoded object.
 */
 io.emitJSON = function(message, parameters) {
    io.emit(message, JSON.stringify(parameters))
}

/**
 * Utility function to broadcast the current state to all connected clients.
 */
 function broadcastState() {
    io.emitJSON('server-set-state', state)
}

// Application state. This is modified by client update messages and re-broadcast to clients on any change.
state = {
    items: []
}

// Configure Express to render static pages.
app.use(Express.static(Path.join(__dirname, 'static')))

// Configure web-sockets.
io.on('connection', function(socket) {

    // Broadcast the state whenever a new client is connected.
    broadcastState();

    socket.on('disconnect', function() {

        // If we were tracking connected users by their sockets, we could do that here and re-broadcast the new list of
        // users as-and-when users disconnect.

    }).on('client-add-item', parse_message(function(item) {

        // We have received a message from the client informing us to add a new item.
        // Generate an identifier for the item, update the state, and broadcast this to our connected clients.
        item.id = guid();
        state.items.push(item);
        broadcastState();

    }));
});

// Start listening.
server.listen(3000, function(){
  console.log('listening on *:3000');
});
