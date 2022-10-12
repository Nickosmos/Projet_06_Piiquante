const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// Création du schéma de données pour chaque utilisateur
const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

// Vérification de l'unicité de l'adresse mail
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);

