"use strict";

const Categoria = require('../models/categoria.model');
const { handleError } = require('../utils/errorHandler');

async function getCategorias() {
  try {
    const categorias = await Categoria.find().exec();
    if (!categorias) return [null, 'No hay categorias'];

    return [categorias, null];
  } catch (error) {
    handleError(error, 'categoria.service -> getCategorias');
  }
}

async function createCategoria(categoria) {
  try {
    const { nombre, descripcion } = categoria;
    const categoriasFound = await Categoria.findOne({ nombre }).exec();
    if (categoriasFound) return [null, 'La categoria ya existe'];

    const newCategoria = new Categoria({
      nombre,
      descripcion,
    });
    await newCategoria.save();

    return [newCategoria, null];
  } catch (error) {
    handleError(error, 'categoria.service -> createCategoria');
  }
}

async function getCategoriaById(id) {
  try {
    const categoriaFound = await Categoria.findById(id).exec();
    if (!categoriaFound) return [null, 'La categoria no existe'];

    return [categoriaFound, null];
  } catch (error) {
    handleError(error, 'categoria.service -> getCategoriaById');
  }
}

async function updateCategoria(id, categoria) {
  try {
    const categoriaFound = await Categoria.findById(id).exec();
    if (!categoriaFound) return [null, 'La categoria no existe'];

    const { nombre, descripcion } = categoria;

    const categoriaUpdated = await Categoria.findByIdAndUpdate(
        id,
        { nombre, descripcion },
        { new: true }
    );
    return [categoriaUpdated, null];
  } catch (error) {
    handleError(error, 'categoria.service -> updateCategoria');
  }
}

async function deleteCategoria(id) {
  try {
    const categoriaFound = await Categoria.findById(id).exec();
    if (!categoriaFound) return [null, 'La categoria no existe'];

    await Categoria.findByIdAndDelete(id);
    return ["Categoria elminada", null];
  } catch (error) {
    handleError(error, 'categoria.service -> deleteCategoria');
  }
}

module.exports = {
    getCategorias,
    createCategoria,
    getCategoriaById,
    updateCategoria,
    deleteCategoria,
};