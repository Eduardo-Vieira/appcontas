// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var db = null;

angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers'])

.factory('dbConfig',function(){
  return {
    dbConf : function(){
      // Configuração de conexão com o banco de dados
      return {name: 'appcontas.db', location: 'default'}
    },
    sqlConf : function(){
      // Estrutura do banco de dados
      var sql = "CREATE TABLE IF NOT EXISTS `tb_usuario` (`id_usuario`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,	`tx_nome`	TEXT,	`tx_login`	TEXT,	`tx_senha`	TEXT,	`tx_email`	TEXT);";
      sql += "CREATE TABLE IF NOT EXISTS `tb_lista` (`id_lista`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,	`tx_nome`	TEXT)";
      return sql;
    }
  }
  
})
.run(function($http, $ionicPlatform, dbConfig) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
     
  
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    if (window.sqlitePlugin) {
        // openDatabase
        document.addEventListener('deviceready', function() {
          db = window.sqlitePlugin.openDatabase(dbConfig.dbConf());
          db.transaction(function(tx) {
            // CREATE TABLES.
            tx.executeSql(dbConfig.sqlConf());
          }, function(error) {
            alert('Transaction ERROR: ' + error.message);
          }, function() {
            // alert('database OK');
          });
        });
    }
  });    
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  
  .state('app.user',{
    url: '/user',
    views: {
      'menuContent': {
        templateUrl: 'templates/user.html',
        controller:'UsuarioCtrl'       
      }
    },
     cache: false
  })
  
  .state('app.newuser',{
    url: '/newuser',
    views: {
      'menuContent': {
        templateUrl: 'templates/newuser.html',
        controller:'UsuarioCtrl',
      }
    },
    cache: false
  })

 .state('app.inicio',{
    url: '/inicio',
    views: {
      'menuContent': {
        templateUrl: 'templates/inicio.html'
      }
    }
  })

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/inicio');
});

