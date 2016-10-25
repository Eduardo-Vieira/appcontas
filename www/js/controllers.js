
angular.module('starter.controllers', ['ngCordova'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('UsuarioCtrl',function($scope, $ionicPopup, $cordovaSQLite, $state, $timeout){
    // Triggered on a button click, or some other target

    $scope.allUsuarios =[];
    $scope.formuser = [];
       
    $scope.selectAll = function() {      
        var query = "SELECT id_usuario, tx_nome, tx_login, tx_senha, tx_email FROM tb_usuario";
        $cordovaSQLite.execute(db, query, []).then(function(res) {
            $scope.allUsuarios =[];
            console.log("lista..");
            for (var i=0; i<res.rows.length; i++) {
                $scope.allUsuarios.push({
                    id_usuario: res.rows.item(i).id_usuario,
                    tx_nome: res.rows.item(i).tx_nome,
                    tx_login: res.rows.item(i).tx_login,
                    tx_senha: res.rows.item(i).tx_senha,
                    tx_email: res.rows.item(i).tx_email
                    });
            }
        }, function (err) {
            console.error(err);
        });
    }
    
   
    $scope.removeAll = function() {
        var query = "DELETE FROM tb_usuario";
        $cordovaSQLite.execute(db, query, []).then(function(res) {
            console.log("lista limpa");
            $scope.selectAll();
        }, function (err) {
            console.error(err);
        });
    }

    $scope.doInsert = function() {

        var query = "INSERT INTO tb_usuario (tx_nome, tx_login, tx_senha, tx_email) VALUES (?,?,?,?)";
        var valores = [$scope.formuser.tx_nome, 
                       $scope.formuser.tx_login, 
                       $scope.formuser.tx_senha,
                       $scope.formuser.tx_email];

        $cordovaSQLite.execute(db, query, valores).then(function(res) {
            console.log("INSERT ID -> " + res.insertId);
            $scope.formuser = [];
            $state.go('app.user');
        }, function (err) {
            console.error(err);
        });

    }

    // A confirm dialog
   $scope.showConfirm = function() {
        var confirmPopup = $ionicPopup.confirm({
            title: 'Remover Lista',
            template: 'Deseja remover todos os registros?'
        });
        confirmPopup.then(function(res) {
            if(res) {
                 $scope.removeAll();
            } else {
                 console.log('operação cancelada.');
            }
        });
   }

    // init
    $scope.selectAll();

    $scope.novo = function () {
        $state.go('app.newuser');
    }

});