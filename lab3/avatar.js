angular.module('app', [])
  .controller('mainCtrl', mainCtrl)
  .directive('avatar', avatarDirective );

function mainCtrl ($scope) {
    $scope.users = [];
    
    $scope.addNew = function (user) {
        console.log($scope.users)
        console.log("user namne = " + user.name + "\nuser email = " + user.email)
        
        if ( (user.name === undefined && user.email === undefined ) || 
             (user.name === "" && user.email === "" ) ) {
            alert("Cannot add without both Name and Email");
            return;
        } else {
            $scope.users.push({
                name: user.name,
                email: user.email,
                avatarUrl: user.url
            })    
            user.name = "";
            user.email = "";
            user.url = "";
        }
        
    };
}

 
function avatarDirective() {
    return {
        scope: {
         user: '='
        },
        restrict: 'E',
        replace: 'true',
        template: (
            '<div class="Avatar">' +
                '<img ng-src="{{user.avatarUrl}}" />' +
                '<h4>Name: {{user.name}}</h4>' +
                '<h4>Email: {{user.email}}</h4>' +
            '</div>'   
        ),
        link: link
    };
    
    function link(scope) {
        if (!scope.user.avatarUrl) {
            scope.user.avatarUrl = 'https://www.drupal.org/files/issues/default-avatar.png';
        }
    }
}