const fs = require("fs");

let listadoPorHacer = [];

// Guardar en archivo data.json las tareas por hacer
const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile("db/data.json", data, err => {
        if (err) throw new Error("No se pudo grabar la tarea por hacer");
    });
};

// Cargar la base de datos con las tareas por hacer
const cargarDB = () => {
    try {
        listadoPorHacer = require("../db/data.json");
    } catch (e) {
        listadoPorHacer = [];
    }
};

// Crear la tarea por hacer
const crear = descripcion => {
    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
};

// Obtener el listado de tareas por hacer
const getListado = () => {
    cargarDB();
    return listadoPorHacer;
};

// Actualizar el estado de las tareas por hacer
const actualizar = (descripcion, completado) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(
        tarea => tarea.descripcion === descripcion
    );

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
};

// Borra la tarea por hacer según la descripción dada
const borrar = descripcion => {
    cargarDB();

    let index = listadoPorHacer.findIndex(
        tarea => tarea.descripcion === descripcion
    );

    if (index >= 0) {
        listadoPorHacer.splice(index, 1);
        guardarDB();
        return "Tarea eliminada";
    } else {
        return "No se encuentra la tarea que desea eliminar.";
    }
};

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
};
