# Projet_06_Piiquante

## Table of Contents
1. [General Info](#general-info)
2. [Technologies](#technologies)
3. [Installation](#installation)
4. [How to use](#Howtouse)

### General Info
***
This is an API REST for a food review website. This API has been create with the following technologies

## Technologies
***
A list of technologies used within the project:
* [BCrypt]: Version 5.0.1 
* [DotEnv]: Version 16.0.3
* [Express]: Version 4.18.1
* [JsonWebToken]: Version 8.5.1
* [Mongoose]: Version 6.6.4
* [Mongoose-Unique-Validator]: Version 3.1.0
* [Multer]: Version 1.4.5

## Installation
***
About the installation. 
```
$ Create a account on https://www.mongodb.com 
$ Create a cluster in your new account (Save your Id and Password)
$ Connect your application to your cluster and copy the link
$ In the "Backend" folder, create a .env file
$ In the .env file, create a "mdbLog =" and paste the link of your Mongo cluster connection
$ In the .env file, create a "tokenKey =" and choose a keystring

$ git clone https://github.com/Nickosmos/Projet_06_Piiquante.git
$ cd ../yourfolder/backend
$ nodemon server
```
## How to use
***
About the API.
```
$ Route POST/Signup for create account
$ Route POST/login for connect to account
$ Route GET/sauces for read all sauces
$ Route GET/sauces/id for read one sauce
$ Route POST/sauces for create one sauce
$ Route PUT/sauce/id for modify one sauce
$ Route DELETE/sauce/id for delete one sauce
$ Route POST/sauce/id/like for like/dislike one sauce
```
