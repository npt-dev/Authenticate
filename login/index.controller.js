function loginController ($location, AuthenticationService) {
    const vm = this;

    const initController = () => {
      // reset login status
      AuthenticationService.Logout();
    };

    const login = () => {
      vm.loading = true;
      AuthenticationService.Login(vm.username, vm.password, (result) => {
          if(result) {
              return $location.path("/");
          } else {
              vm.error = 'User name or password is incorrect';
              return vm.loading = false;
          }
      });
    };

    vm.login = login;
    initController();
}

angular
    .module('myAuth')
    .controller('Login.IndexController', loginController);