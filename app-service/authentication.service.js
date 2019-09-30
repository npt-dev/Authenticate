function Service ($http, $localStorage) {
    const service = {};

    const Login = (username, password, callback) => {
        $http
            .post('/api/authenticate', {username, password})
            .then(function(res) {
                // login successful if there's a token in the response
                if (res.data.token) {
                    // store username and token in local storage to keep user logged in between page refreshes
                    $localStorage.currentUser = { username, token: res.data.token};

                    // add jwt token to auth header for all request made by the $http service
                    $http.defaults.headers.common.Authorization = 'Bearer ' + res.data.token;

                    // execute callback with true to indicate successful login
                    callback(true);
                } else {
                    // execute callback with false to indicate failed login
                    callback(false);
                }
            });
    };

    const Logout = () => {
        // remove user from local storage and clear http auth header
        delete $localStorage.currentUser;
        $http.defaults.headers.common.Authorization = '';
    };

    service.Login = Login;
    service.Logout = Logout;

    return service;
}

angular.module('myAuth').factory('AuthenticationService', Service);