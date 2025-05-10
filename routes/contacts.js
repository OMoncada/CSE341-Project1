const express = require('express');
const router = express.Router();

const contactsController = require('../controllers/contacts');

// Ruta para obtener todos los contactos
router.get('/', contactsController.getAll);

// Ruta para obtener un contacto específico por ID
router.get('/:id', contactsController.getSingle);

// Ruta para crear un nuevo contacto
router.post('/', contactsController.createContact);

module.exports = router;
