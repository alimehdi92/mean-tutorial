var app = angular.module('flapperNews', ['ui.router']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('home', {
        url: '/home',
        templateUrl: '/home.html',
        controller: 'MainCtrl'
    });

    $stateProvider.state('posts', {
        url: '/posts/{id}',
        templateUrl: '/posts.html',
        controller: 'PostsCtrl'
    });

    $urlRouterProvider.otherwise('home');
}]);

app.controller('MainCtrl', ['$scope', 'posts', function($scope, posts) {
    $scope.test = "Hello World";
    $scope.posts = posts.posts;

    $scope.addPost = function() {
        if(!$scope.title || $scope.title === '') {
            alert('Please enter a title');
            return;
        }
        $scope.posts.push({
                title: $scope.title,
                upvotes: 0,
                link: $scope.link,
                comments: [
                    {author: 'Joe', body: 'Cool Post', upvotes: 0},
                    {author: 'Bobby', body: 'Awesome Post', upvotes: 0}
                ]
            });
        $scope.title = '';
        $scope.link = '';
    };

    $scope.incUpvotes = function(post) {
        post.upvotes += 1;
    }

}]);

app.controller('PostsCtrl', ['$scope', '$stateParams', 'posts', function($scope, $stateParams, posts){
    $scope.post = posts.posts[$stateParams.id];
    $scope.addComment = function() {
        if($scope.body === '') { return; }
        $scope.post.comments.push({
            body: $scope.body,
            author: 'user',
            upvotes: 0
        });
        $scope.body = '';
    };

    $scope.incUpvotes = function(comment) {
        comment.upvotes += 1;
    };
}]);

app.factory('posts', [function() {
    // service body
    var o = {
        posts: []
    };
    return o;
}]);