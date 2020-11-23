angular.module("myApp",["ngAnimate","ngSanitize","ui.bootstrap","ui.router","mds"])
    .config(function ($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state("app",{
                url:"/app",
                views:{
                    "main":{
                        templateUrl:"templates/main.html",
                        controller:"appCtrl"
                    }
                }
            })
            .state("app.home",{
                url:"/home",
                views:{
                    "sub":{
                        templateUrl:"templates/home.html",
                        controller:"homeCtrl"

                    }
                }
            })
            .state("app.register",{
                url:"/register",
                views:{
                    "sub":{
                        templateUrl:"templates/register.html",
                        controller:"regCtrl"
                    }
                }
            })
            .state("app.login",{
                url:"/login",
                views:{
                    "sub":{
                        templateUrl:"templates/login.html",
                        controller:"loginCtrl"
                    }
                }
            })

            .state("app.admin",{
                url:"/admin",
                views:{
                    "sub":{
                        templateUrl:"templates/admin.html",
                        controller:"AdminCtrl"
                    }
                }
            })

            .state("app.product",{
                url:"/product",
                views:{
                    "sub":{
                        templateUrl:"templates/product.html",
                        controller:"productCtrl"
                    }
                }
            })
            .state("app.newProduct",{
                url:"/newProduct",
                views:{
                    "sub":{
                        templateUrl:"templates/newProduct.html",
                        controller:"newProductCtrl"
                    }
                }
            })


        $urlRouterProvider.otherwise("/app/home")
    })

