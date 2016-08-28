var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
testDBEnv();
var mongodb = require("mongodb");
var ObjID = mongodb.ObjectID;

var USERS = "users";

var myApp = express();
myApp.use(express.static(__dirname + "/public"));
myApp.use(bodyParser.json());
var server;
var db;

function testDBEnv() {
	if (!(process.env.MONGODB_URI)) {
		console.log("MONGODB_URI undefined!");
		process.exit(1);
	}
}

mongodb.MongoClient.connect(process.env.MONGODB_URI, function (err, database) {
   	if (err) {
		console.log("DB ERR:" + err);
		process.exit(1);
	}
	db = database;
	console.log(Date() + "\nDB ready");
	server = myApp.listen(process.env.PORT || 8080, function() {
		var port = server.address().port;
		console.log("mean-project-admin address ", server.address().address, " port ", port);
	})
});



// USERS API ROUTES

function handleError(res, reason, message, code) {
	console.log("ERR:" + reason);
	res.status(code || 500).json({"error": message});
}

 myApp.get("/users", function(req, res) {
 	db.collection(USERS).find({}).toArray(function(err, docs) {
 		if (err) {
 			handleError(res, err.message, "Failed to get users.");
 		} else {
 			res.status(200).json(docs);
 		}
 	});
 });

myApp.post("/users", function (req, res) {
	var newUser = req.body;
	newUser.createDate = new Date();

	if (!(req.body.userName && req.body.password)) {
		handleError(res, "Invalid input", "Must provide username and password.", 400);
	}

	db.collection(USERS).insertOne(newUser, function(err, doc) {
		if (err) {
			handleError(res, err.message, "Create failed.");
		} else {
			res.status(201).json(doc.ops[0]);
		}
	});
});

myApp.get("/users/:id", function(req, res) {
	db.collection(USERS).findOne({ _id: new ObjID(req.params.id) }, function(err, doc) {
		if (err) {
			handleError(res, err.message, "Get users failed");
		} else {
			res.status(200).json(doc);
		}
	});
});

myApp.put("/users/:id", function (req, res) {
	var updateDoc = req.body;
	delete updateDoc._id;

	db.collection(USERS).updateOne({_id: new ObjID(req.params.id)}, updateDoc, function(err, doc) {
		if (err) {
			handleError(res, err.message, "Update users failed");
		} else {
			res.status(204).end();
		}
	});
});

myApp.delete("/users/:id", function (req, res) {
	db.collection(USERS).deleteOne({_id: new ObjID(req.params.id)}, function(err, result) {
		if (err) {
			handleError(res, err.message, "Delete user failed");
		} else {
			res.status(204).end();
		}
	});
});
