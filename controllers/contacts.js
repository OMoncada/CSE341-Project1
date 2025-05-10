const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Obtener todos los contactos
const getAll = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    });
};

// Obtener un solo contacto por ID
const getSingle = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('contacts').find({ _id: userId });
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    });
};

// Crear un nuevo contacto
const createContact = async (req, res) => {
    const { firstName, lastName, email, favoriteColor, birthday } = req.body;

    // Verificar que todos los campos necesarios estén presentes
    if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
        return res.status(400).send('Faltan datos requeridos');
    }

    // Crear el nuevo contacto
    const newContact = {
        firstName,
        lastName,
        email,
        favoriteColor,
        birthday: new Date(birthday)  // Asegúrate de que birthday sea una fecha válida
    };

    try {
        const result = await mongodb.getDatabase().db().collection('contacts').insertOne(newContact);
        res.status(201).json({ message: 'Contacto creado exitosamente', contactId: result.insertedId });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al insertar el contacto');
    }
};

module.exports = { getAll, getSingle, createContact };
