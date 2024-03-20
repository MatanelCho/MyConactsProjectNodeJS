const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel')
//const constants = require('../constants')
// @desc Get all contact
// @route GET /api/contacts
// @access Privet

const getContacts = asyncHandler( async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id})
    res.status(200).json(contacts);
});

// @desc Create New contact
// @route POST /api/contacts
// @access Privet

const createContact = asyncHandler( async (req, res) => {
    const {name, email, phone} = req.body;
    if (!name || !email || !phone) {
        res.status(404);
        throw new Error("Name, email and phone are required");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    })
    res.status(201).json(contact);
});

// @desc Get contact
// @route GET /api/contacts/:id
// @access Privet

const getContact = asyncHandler( async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error ("Contact not found")
    }
    res.status(200).json(contact);
});

// @desc Update contact
// @route PUT /api/contacts/:id 
// @access Privet

const updateContact = asyncHandler( async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error ("Contact not found")
    }

    if(contact.user_id.toString() !== req.user.id) {
        res.status(403)
        throw new Error("user don't have prommision to update this contact")
    }

    const updateContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updateContact);
});

// @desc Delete contact
// @route DELETE /api/contacts/:id
// @access Privet

const deleteContact = asyncHandler( async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error ("Contact not found")
    }

    if(contact.user_id.toString() !== req.user.id) {
        res.status(403)
        throw new Error("user don't have prommision to delete this contact")
    }

    await Contact.findByIdAndDelete(req.params.id)
    res.status(200).json(contact);
});

module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };