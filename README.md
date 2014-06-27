Dining Management Systems (DMS)
==================

# Summary

DMS web app that allows DSV members can register meals and DSV admin can list how many DSV members are going to have lunch as well as plan meal menu

g

# Setup
```sh
Clone project : git clone…
Open project : cd dinning-management
Install sails : sudo npm install -g sails
Install node-modules : npm install
Connect Mongo Database : config file /config/local.js (line 74 : host: '192.168.11.10’)
Run project : sails lift
```

# High-level requirements:

##### Webapp built on top of node.js
##### Display views:
* Login view 
* User View
* Admin View
* Profile User View
* Register Meal View
* Menu View
* Deposit View

# Stack

* Environment: Node.JS (on linux)
* Language: javascript
* Framework: sailsjs
* Presentation: Handlebars
* Database: MongoDb
* Browser framework: backbonejs.

#Package Node extension	
* MD5
* node-schedule
* nodemailer