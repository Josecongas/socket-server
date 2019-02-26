"use strict";
exports.__esModule = true;
var express_1 = require("express");
var environment_1 = require("../global/environment");
var socket_io_1 = require("socket.io");
var http_1 = require("http");
var socket = require("../sockets/socket");
var Server = /** @class */ (function () {
    function Server() {
        this.app = express_1["default"]();
        this.port = environment_1.SERVER_PORT;
        this.httpServer = new http_1["default"].Server(this.app);
        this.io = socket_io_1["default"](this.httpServer);
        this.escucharSockets();
    }
    Object.defineProperty(Server, "instance", {
        get: function () {
            return this._intance || (this._intance = new this());
        },
        enumerable: true,
        configurable: true
    });
    Server.prototype.escucharSockets = function () {
        console.log('Escuchando conexiones - sockets');
        this.io.on('connection', function (cliente) {
            console.log('Cliente conectado');
            // Mensajes
            socket.mensaje(cliente);
            // Desconectar
            socket.desconectar(cliente);
        });
    };
    Server.prototype.start = function (callback) {
        this.httpServer.listen(this.port, callback);
    };
    return Server;
}());
exports["default"] = Server;
