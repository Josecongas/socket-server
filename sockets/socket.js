"use strict";
exports.__esModule = true;
exports.desconectar = function (cliente) {
    cliente.on('disconnect', function () {
        console.log('Cliente desconectado');
    });
};
exports.mensaje = function (cliente) {
    cliente.on('mensaje', function (payload) {
        console.log("Escuchando mensaje de " + JSON.stringify(payload));
    });
};
