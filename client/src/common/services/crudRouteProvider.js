(function() {
  function crudRouteProvider($routeProvider) {

    this.$get = function () { return {}; }; //we are not interested in instances

    this.routesFor = function(resourceName, urlPrefix, routePrefix) {
      var baseUrl = urlPrefix + '/' + resourceName.toLowerCase();
      routePrefix = routePrefix || urlPrefix;
      var baseRoute = '/' + routePrefix + '/' + resourceName.toLowerCase();

      var createRoute = function (operation, resolveFns) {
        return {
          templateUrl: baseUrl + '/' + resourceName.toLowerCase() +'-'+operation.toLowerCase()+'.tpl.html',
          controller: resourceName + operation +'Ctrl',
          resolve: resolveFns
        };
      };

      var routeBuilder = {
        whenList: function(resolveFns) {
          routeBuilder.when(baseRoute, createRoute('List', resolveFns));
          return routeBuilder;
        },
        whenNew: function(resolveFns) {
          routeBuilder.when(baseRoute +'/new', createRoute('Edit', resolveFns));
          return routeBuilder;
        },
        whenEdit: function(resolveFns) {
          routeBuilder.when(baseRoute+'/:itemId', createRoute('Edit', resolveFns));
          return routeBuilder;
        },
        when: function(path, route) {
          $routeProvider.when(path, route);
          return routeBuilder;
        },
        otherwise: function(params) {
          $routeProvider.otherwise(params);
          return routeBuilder;
        },
        $routeProvider: $routeProvider
      };
      return routeBuilder;
    };

  }
  // Add our injection dependencies here since we cannot do it in module.provider()
  crudRouteProvider.$inject = ['$routeProvider'];

  angular.module('services.crudRouteProvider', []).provider('crudRoute', crudRouteProvider);
})();