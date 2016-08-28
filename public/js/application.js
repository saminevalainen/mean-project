angular.module("meanProjectAdmin", ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "main.html"
            })
            .when("/list/users", {
                controller: "ListController",
                templateUrl: "list.html",
                resolve: {
                    users: function(Users) {
                        return Users.getUsers();
                    }
                }
            })
            .when("/new/user", {
                controller: "NewUserController",
                templateUrl: "user-form.html"
            })
            .when("/user/:userId", {
                controller: "EditUserController",
                templateUrl: "user.html"
            })
            .otherwise({
                redirectTo: "/"
            })
    })
    .service("Users", function($http) {
        this.getUsers = function() {
            return $http.get("/users").
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error finding users.");
                });
        }
        this.createUser = function(user) {
            return $http.post("/users", user).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error creating user.");
                });
        }
        this.getUser = function(userId) {
            var url = "/users/" + userId;
            return $http.get(url).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error finding this user.");
                });
        }
        this.editUser = function(user) {
            var url = "/users/" + user._id;
            console.log(user._id);
            return $http.put(url, user).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error editing this user.");
                    console.log(response);
                });
        }
        this.deleteUser = function(userId) {
            console.log("Deleting");
            var url = "/users/" + userId;
            return $http.delete(url).
                then(function(response) {
                    console.log("Deleting..");
                    return response;
                }, function(response) {
                    console.log("Deleting...");
                    alert("Error deleting this user.");
                    console.log(response);
                });
        }
    })


    .controller("NewUserController", function($scope, $window, $location, Users) {
        $scope.back = function() {
            $location.path("#/");
        }

        $scope.saveUser = function(user) {
            Users.createUser(user).then(function(doc) {
                var userUrl = "/user/" + doc.data._id;
                $location.path(userUrl);
            }, function(response) {
                alert(response);
            });
        }
    })

    .controller("EditUserController", function($scope, $routeParams, Users) {
        Users.getUser($routeParams.userId).then(function(doc) {
            $scope.user = doc.data;
        }, function(response) {
            alert(response);
        });

        $scope.toggleEdit = function() {
            $scope.editMode = true;
            $scope.userFormUrl = "user-form.html";
        }

        $scope.back = function() {
            $scope.editMode = false;
            $scope.userFormUrl = "";
        }

        $scope.saveUser = function(user) {
            Users.editUser(user);
            $scope.editMode = false;
            $scope.userFormUrl = "";
        }

        $scope.deleteUser = function(userId) {
            console.log("app.js: Delete controller: user id: "+ userId);
            Users.deleteUser(userId);
            console.log("app.js: Delete controller: done.");
        }
    })

    .controller("ListController", function(users, $scope, $location, Users) {
        $scope.users = users.data;
        $scope.deleteUser = function(userId) {
            Users.deleteUser(userId);
            $scope.userFormUrl = "";
        }
    });