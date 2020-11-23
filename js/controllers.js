angular.module("myApp")
   .controller("appCtrl",function ($scope,$rootScope,$state,$interval,$timeout,$http2,$http) {

   })
    .controller("AdminCtrl",function ($scope,$rootScope,$state,$interval,$timeout,$uibModal,$http) {
        if(!$rootScope.id){
            toastr.warning("Login First","Warning",{timeOut:2000})
        $state.go("app.login")
    }
        $scope.data={}
        getProducts = function () {
            $http.post("api/getProducts.php")
                .then(function (resp) {
                    $scope.products = resp.data
                })
        };
        getProducts();
        $scope.insertProduct=function () {
            $http.post("api/insertProducts.php",$scope.data)
                .then(function (resp) {
                    if(resp.data.status){
                        toastr.success("Product inserted successfully","Success",{timeOut:2000})
                        $scope.data={}
                       getProducts()
                    }
                    else{
                        toastr.error("Something went wrong !","Error",{timeOut:2000})

                    }
                    getProducts()
                })
        }
        $scope.preModify=function (product) {
            product.price=parseFloat(product.price);
            $scope.selectedProduct=Object.assign({},product);
            console.log(product);
            $scope.x=$uibModal.open({
                templateUrl:"templates/UpdateProduct.html",
                scope:$scope
            })
        };
        $scope.updateProduct=function () {
            $http.post("api/updateProduct.php",$scope.selectedProduct)
                .then(function (resp) {
                    if(resp.data.status){
                        toastr.success("Product updated successfully","Success",{timeOut:2000})
                        $scope.x.close();
                        getProducts()
                    }
                    else
                        toastr.error("Something went wrong !","Error",{timeOut:2000})
                })
        };
        $scope.changedSelectedProduct=function (file) {
            var y=new FileReader();
            y.onload=function (event) {
                $scope.selectedProduct.img=event.target.result; // base64 image string
                $scope.$apply()
            };

            y.readAsDataURL(file)
        }
        $scope.deleteProduct = function (id) {
            var x = confirm("Are you sure ?");
            if (x) {
                $http.post("api/delProducts.php", {id:id})
                    .then(function (resp) {
                        if (resp.status) {
                            toastr.success("Product deleted successfully","Success",{timeOut:2000})

                            getProducts()
                        }
                        else {
                            toastr.error("Something went wrong !","Error",{timeOut:2000})
                        }
                    })


            }
        };
        $scope.getOrders=function () {
            $http.post("api/getOrders.php",{
            }).then(function (resp) {

                $scope.orders=resp.data
                $scope.orders.forEach(function (order) {
                order.products=angular.fromJson(order.products)

                })
                $scope.$apply()
            })
            getOrders();
        }
        $scope.ready=function (id) {
            $scope.id=id;
            $http.post("api/readyTime.php",{
                id:id
        }).then(function (resp) {
                if (resp.status) {
                    toastr.success("The order is ready", "Success", {timeOut: 2000})
                }
                })

        }
        $scope.deleteOrder=function (id) {
            var x = confirm("Are you sure ?");
            if (x) {
                $http.post("api/deleteOrder.php", {id: id})
                    .then(function (resp) {
                        if (resp.status) {
                            toastr.success("order deleted successfully", "Success", {timeOut: 2000})

                            getOrders()
                        }
                        else {
                            toastr.error("Something went wrong !", "Error", {timeOut: 2000})
                        }
                    })
            }
            getOrders()
        }

        $scope.changed=function (file) {
            var y=new FileReader()
            y.onload=function (event) {
                $scope.data.img=event.target.result // base64 image string
                $scope.$apply()
            }

            y.readAsDataURL(file)
        }

        // $scope.changedSelectedMeal=function (file) {
        //     var y=new FileReader()
        //     y.onload=function (event) {
        //         $scope.selectedMeal.img=event.target.result // base64 image string
        //         $scope.$apply()
        //     }
        //
        //     y.readAsDataURL(file)
        // }
        //
        //
        //
        // getMeals=function () {
        //     $http.post("api/getMeals.php",{rest_id:$rootScope.id})
        //         .then(function (resp) {
        //             $scope.meals=resp.data
        //         })
        // }
        // getMeals()

    })

    .controller("homeCtrl",function ($scope,$rootScope,$state,$interval,$timeout,$http) {

    })

    .controller("regCtrl",function ($scope,$rootScope,$state,$interval,$timeout,$http) {
        $scope.data={}

        $scope.register=function () {
            $http.post("api/register.php",$scope.data).then(function (resp) {
                if(resp.data.status){
                    toastr.success("Successfully Regitered !","Success",{timeOut:2000})
                    $rootScope.id=resp.data.id
                    $rootScope.user=resp.data.user
                    if($scope.data.type=='cust')
                        $state.go("app.product")
                    else
                        $state.go("app.admin")
                }
                else{
                    toastr.error("User Already Exist","Error",{timeOut:2000})
                }
            })
        }
    })

    .controller("loginCtrl",function ($scope,$rootScope,$state,$interval,$timeout,$http) {
        $scope.data={}
        $scope.login=function () {
            $http.post("api/login.php",$scope.data)
                .then(function (resp) {
                    if(resp.data.status){
                        toastr.success("Welcome "+$scope.data.user,"Success",{timeOut:2000})
                        $rootScope.id=resp.data.id
                        $rootScope.user=resp.data.user
                        if($scope.data.type=='cust')
                            $state.go("app.product")
                        else
                            $state.go("app.admin")
                    }
                    else{
                        toastr.error("Wrong Username or Password","Error",{timeOut:2000})
                        $scope.data.user=""
                        $scope.data.pass=""
                    }
                })
        }
    })
    .controller("productCtrl",function ($scope,$rootScope,$http2,$state,$interval,$timeout,$http,$uibModal) {
        if(!$rootScope.id){
            toastr.warning("Login First","Warning",{timeOut:2000})
            $state.go("app.login")
        }
        $http.get("api/getProducts.php")
            .then(function (resp) {
                $scope.products=resp.data
            });
        $scope.bascket=[];
        $scope.data={};
        $scope.openBasket=function (cust_id) {
            $scope.x=$uibModal.open({
                templateUrl:"templates/bascket.html",
                scope:$scope
            })
            $scope.cust_id=cust_id
            $http.post("api/getDelevery.php",{
                cust_id:cust_id
        }).then(function (resp) {
                if (resp.status) {
                        $scope.orders = resp.data
                    $scope.orders.forEach(function (order) {
                        order.products = angular.fromJson(order.products)
                    })
                }
                $scope.$apply()
            })
        };
        $scope.addToCart=function (name,price,img) {
            var x=1;
                console.log(name,price,img);
                x=parseFloat(x);
                $scope.bascket.push({name:name,img:img,price:price,qty:x});
                toastr.success("product added to Cart","Success",{timeOut:2000})
            //}

        };
        // $scope.proceed=function () {
        //     var x=confirm("Confirm the order");
        //     if(x){
        //         $http.post("api/orderProduct.php",{
        //             loc:$scope.data.loc,
        //     }).then(function (resp) {
        //             if(resp.data.status){
        //                 console.log(name,price,img);
        //                 toastr.success("product ordered successfully","Success",{timeOut:2000})
        //                 $scope.x.close();
        //                 $scope.bascket=[]
        //             }
        //             else
        //             toastr.warning("something went wrong","Warning",{timeOut:2000})
        //
        //         })
        //     }
        // };

        $scope.proceed=function (addr) {
            var x=confirm("Sure to order ?")

            if(x){
                $http2.post("api/orderProduct.php",{
                    cust_id:$rootScope.id,
                    addr:addr,
                    order_details:angular.toJson($scope.bascket)
                }).then(function (resp) {
                    if(resp.data.status){
                        toastr.success("Products ordered successfully","success",{timeOut:2000})
                        $scope.bascket=[]
                        $scope.x.close();
                    }
                    else {
                        toastr.warning("Products is not ordered","warning",{timeOut:2000})

                    }
                })
            }
        }
        $scope.receivedButton=function (cust_status,id) {
            $scope.id=id;
            if (!cust_status) {

                toastr.info("Please wait until you receive order", "", "info");
            }

            else {
                $http.post("api/recieved.php", {}).then(function (resp) {
                    $("#b").css({"display": "none"});
                    $("#right_img").css({"display": "block"});
                    if (resp.data.status) {
                        toastr.success("Thanks for choosing our store", "", "success");
                    }

                })
            }
        }



            $scope.getProduct=function () {
            $http.post("api/getProducts.php")
                .then(function (resp) {
                    $scope.Products=resp.data
                })
        }
    })


// app.filter("Filter",function ($scope,$rootScope) {
//     return function (products,min) {
//         if(!min)
//             return products.data
//         else{
//             products.forEach(function (product) {
//                 if(product.price<=min)
//                     return  $scope.products.data;
//             })
//             return  $scope.products.data;
//
//         }
//
//     }
// })
    .filter("totalFilter",function ($rootScope) {
        return function (bascket) {
            console.log("Hi")
            $rootScope.total=0

            bascket.forEach(function (item) {
                $rootScope.total+=item.qty*item.price
            })



            return bascket
        }
    })