const setupBackend = ($httpBackend) => {
    const testUser = { username: 'test', password: 'test', firstName: 'test', lastName: 'user' };

    // fake authentication api end point
    $httpBackend.whenPOST('/api/authenticate').respond(function (method, url, data) {
        // get param from post request
        const param = angular.fromJson(data);

        // check user credentials and return fake jwt token if valid
        if (param.username === testUser.username && param.password === testUser.password) {
            return [200, { token: 'fake-jwt-token' }, {}];
        } else {
            return [200, {}, {}];
        }
    });
    $httpBackend.expectGET("/usr/1");
    $httpBackend.whenGET(/^\w+.*/).passThrough();
};

angular.module('myAuth').run(setupBackend);