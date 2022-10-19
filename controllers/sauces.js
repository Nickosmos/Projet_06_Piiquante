const Sauce = require('../models/sauces');
const fs = require('fs');

// Création du controlleur pour créer une sauce
exports.createSauce = (req, res, next) => {
    const sauceProduct = JSON.parse(req.body.sauce);
    delete sauceProduct._id;
    delete sauceProduct._userId;
    const sauce = new Sauce({
        ...sauceProduct,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
  
    sauce.save()
    .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
    .catch(error => { res.status(400).json( { error })})
};

// Création du controlleur pour récupérer une sauce
exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => res.status(200).json(sauce))
    .catch(error => res.status(404).json({ error }));
};

// Création du controlleur pour modifier une sauce
exports.modifySauce = (req, res, next) => {
    const sauceProduct = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  
    delete sauceProduct._userId;
    Sauce.findOne({_id: req.params.id})
        .then((sauce) => {
            if(sauce.userId != req.auth.userId) {
                res.status(403).json({ message : 'unauthorized request'});
            }else {
                Sauce.updateOne({ _id: req.params.id}, { ...sauceProduct, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Objet modifié!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
};

// Création du controlleur pour supprimer une sauce
 exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
        .then(sauce => {
            if(sauce.userId != req.auth.userId) {
                res.status(401).json({message: 'Not authorized'});
            }else {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Objet supprimé !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
};

// Création du controlleur pour récupérer toutes les sauces
exports.getAllSauces = (req, res, next) => {
    Sauce.find()
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(400).json({ error }));
};

// Création du controlleur like/dislike
exports.likeSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
        .then(sauce => {
            if(req.body.like == 1) {
                if(sauce.usersLiked.includes(req.body.userId) || sauce.usersDisliked.includes(req.body.userId)) {
                    res.status(400).json({message: 'already like/dislike'});
                }else {
                    sauce.likes += 1;
                    sauce.usersLiked.push(req.body.userId);
                    sauce.save();
                    res.status(200).json({message: 'like added'});
                }
            }else if(req.body.like == 0) {
                if(sauce.usersLiked.includes(req.body.userId)) {
                    sauce.likes -= 1;
                    sauce.usersLiked.remove(req.body.userId);
                }else if(sauce.usersDisliked.includes(req.body.userId)) {
                    sauce.dislikes -= 1;
                    sauce.usersDisliked.remove(req.body.userId);
                }else {
                    res.status(400).json({ error});
                }    
                sauce.save();
                res.status(200).json({message: 'like/dislike reset'});

            }else if(req.body.like == -1) {
                if(sauce.usersLiked.includes(req.body.userId) || sauce.usersDisliked.includes(req.body.userId)) {
                    res.status(400).json({message: 'already like/dislike'});
                }else {
                    sauce.dislikes += 1;
                    sauce.usersDisliked.push(req.body.userId);
                    sauce.save();
                    res.status(200).json({message: 'dislike added'});
                }
            }else {
                res.status(400).json({ error});
            }

        })
        .catch( error => {
            res.status(500).json({ error });
        });
};