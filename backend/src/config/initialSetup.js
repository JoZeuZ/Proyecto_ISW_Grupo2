"use strict";
// Importa el modelo de datos 'Role'
const Role = require("../models/role.model.js");
const User = require("../models/user.model.js");
const Categoria = require("../models/categoria.model.js");
const Fondo = require("../models/fondo.model.js");
const Concurso = require("../models/concurso.model.js");
const Postulacion = require("../models/postulacion.model.js");

/**
 * Crea los roles por defecto en la base de datos.
 * @async
 * @function createRoles
 * @returns {Promise<void>}
 */
async function createRoles() {
  try {
    // Busca todos los roles en la base de datos
    const count = await Role.estimatedDocumentCount();
    // Si no hay roles en la base de datos los crea
    if (count > 0) return;

    await Promise.all([
      new Role({ name: "user" }).save(),
      new Role({ name: "admin" }).save(),
      new Role({ name: "postulante" }).save(),
      new Role({ name: "evaluador" }).save(),
    ]);
    console.log("* => Roles creados exitosamente");
  } catch (error) {
    console.error(error);
  }
}

/**
 * Crea los usuarios por defecto en la base de datos.
 * @async
 * @function createUsers
 * @returns {Promise<void>}
 */
async function createUsers() {
  try {
    const count = await User.estimatedDocumentCount();
    if (count > 0) return;

    const admin = await Role.findOne({ name: "admin" });
    const user = await Role.findOne({ name: "user" });
    const postulante = await Role.findOne({ name: "postulante" });
    const evaluador = await Role.findOne({ name: "evaluador" });

    await Promise.all([
      new User({
        username: "user",
        email: "user@email.com",
        password: await User.encryptPassword("user123"),
        roles: user._id,
      }).save(),
      new User({
        username: "admin",
        email: "admin@email.com",
        password: await User.encryptPassword("admin123"),
        roles: admin._id,
      }).save(),
      new User({
        username: "postulante",
        email: "postulante@email.com",
        password: await User.encryptPassword("postulante123"),
        roles: postulante._id,
      }).save(),
      new User({
        username: "evaluador",
        email: "evaluador@email.com",
        password: await User.encryptPassword("evaluador123"),
        roles: evaluador._id,
      }).save(),
    ]);
    console.log("* => Users creados exitosamente");
  } catch (error) {
    console.error(error);
  }
}

async function createDefaultCategories() {
  try {
    const count = await Categoria.estimatedDocumentCount();
    if (count > 0) return;

    await Promise.all([
      new Categoria({
        nombre: "Categoría A",
        descripcion: "Descripción de la categoría A",
      }).save(),
      new Categoria({
        nombre: "Categoría B",
        descripcion: "Descripción de la categoría B",
      }).save(),
      new Categoria({
        nombre: "Categoría C",
        descripcion: "Descripción de la categoría C",
      }).save(),
    ]);
    console.log("* => Categorías creadas exitosamente");
  } catch (error) {
    console.error(error);
  }
}


/**
 * Crea un fondo de prueba en la base de datos.
 */
async function createDefaultFunds() {
  const count = await Fondo.estimatedDocumentCount();
  if (count > 0) return;

  const categoria = await Categoria.findOne({ nombre: "Categoría A" });
  const fondo = new Fondo({
    _id: "6f9d88b9c3b3d9b1e4f0b1a0",
    montoTotal: 1000000,
    categoria: categoria._id,
  });

  await fondo.save();
  console.log("* => Fondo de prueba creado exitosamente");
}

/**
 * Crea un concurso de prueba en la base de datos.
 */
async function createDefaultContests() {
  const count = await Concurso.estimatedDocumentCount();
  if (count > 0) return;

  const fondo = await Fondo.findOne({ _id: "6f9d88b9c3b3d9b1e4f0b1a0" });
  if (!fondo) {
    createDefaultFunds();
  }

  const concurso = new Concurso({
    nombre: "Concurso Test",
    bases: "Bases del concurso de prueba",
    fechaInicio: new Date(),
    fechaFin: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // Una semana después
    montoAsignado: 100000,
    fondo: fondo._id,
  });

  await concurso.save();
  console.log("* => Concurso de prueba creado exitosamente");
}

/**
 * Crea una postulación de prueba en la base de datos.
 */
async function createDefaultPostulacion() {
  const count = await Postulacion.estimatedDocumentCount();
  if (count > 0) return;

  const concurso = await Concurso.findOne({ nombre: "Concurso Test" });
  if (!concurso) createDefaultContests();

  const postulacion = new Postulacion({
    nombrePostulante: "Test Postulante",
    rutPostulante: "12345678-9",
    correoElectronico: "testpostulante@example.com",
    numeroTelefono: "99999999",
    nombreEmpresa: "Empresa Test",
    rutEmpresa: "87654321-k",
    temaProyecto: "Tema del Proyecto Test",
    propuestaProyecto: "Propuesta del Proyecto Test",
    respaldoPostulacion: "respaldoPostulacion.pdf",
    concurso: concurso._id,
  });
  await postulacion.save();
  console.log("* => Postulación de prueba creada exitosamente");
}

/**
 * Función principal para crear todos los datos de prueba.
 */
async function initializeTestData() {
  try {
    const fondo = await createDefaultFunds();
    const concurso = await createDefaultContests(fondo);
    await createDefaultPostulacion(concurso);
  } catch (error) {
    console.error("Error al crear datos de prueba:", error);
  }
}

module.exports = {
  createRoles,
  createUsers,
  createDefaultCategories,
  initializeTestData,
};
