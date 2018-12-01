angular.module('app', [])
  .controller('mainCtrl', mainCtrl)
  .directive('admin', adminDirective );

function mainCtrl ($scope) {
    $scope.candidates = [];
    $scope.ballot     = [];
    
    $scope.getAll = function () {
        $.ajax( {
           url:  "/voting",
           type: "GET",
           contentType: "application/json; charset=utf-8",
           success: function(data) {
               console.log("\t~~getAll() success. ");
               angular.copy(data, $scope.candidates);
           }
        });
    };
    
    $scope.getAll();
    console.log("Current candidates list:\n****\t");
    console.log($scope.candidates);
    
    
    
    // $scope.create = function(candidate) {
    //     return $http.post('/voting', candidate).success(function(data){
    //     	$scope.candidates.push(data);
    //     });
    // };
    
    
    
    $scope.dovote = function() {
        console.log("In Dovote");
        angular.forEach($scope.candidates, function(value,key) {
            if(value.selected) {
                $scope.upvote(value);
                // $http.put('/voting/' + value._id + '/upvote').success(function(data){
                    
                // });
                $scope.ballot.push(value);
            }
        });
    }
    
    $scope.upvote = function(candidate) {
        // return $http.put('/voting/' + candidate._id + '/upvote')
        //     .success(function(data){
        //         console.log("upvote worked");
        //         candidate.upvotes += 1;
        //     });
        $.ajax({
            url:  '/voting/:' + candidate._id + '/upvote',
            type: 'PUT',
            success: function(data, textStatus) {
                console.log("\t~~Success PUT op");
                candidate.upvotes += 1;
            }
        })
    };

    
    
    $scope.addNew = function (candidate) {
        
        if ( (candidate.name === undefined ) || (candidate.name === "" ) ) {
            alert("Cannot add without Name");
            return;
        } else {
            
            let new_candidate = {
                Name: candidate.name,
                Votes: 0
            };
            
            // $scope.create(new_candidate);
            
            $.ajax({
                url:  "/voting",
                type: "POST",
                data: JSON.stringify(new_candidate),
                contentType: "application/json; charset=utf-8",
                success: function(data,textStatus) {
                    console.log("\t~~POST SUCCESS");
                    $scope.candidates.push(new_candidate);
                }
            });
            
            candidate.name = "";
        }
        console.log($scope.candidates);
    };
    
    $scope.incrementUpvotes = function(candidate) {
        $scope.upvote(candidate);
    };
    
    $scope.delete = function (candidate) {
        console.log("Deleting Name "+candidate.Name+" ID "+candidate._id);
        $.ajax({
           url:  "/voting/" + candidate._id ,
           type: "DELETE",
           success: function(data, textStatus) {
               console.log("delete worked: " + textStatus);
           }
        });
        
        $scope.getAll();
    }
    
}

 
function adminDirective() {
    return {
        scope: {
         candidate: '='
        },
        restrict: 'E',
        replace: 'true',
        template: ( //all must be wrapped in a single element (div)
            '<div>' + 
                '<span class="glyphicon glyphicon-remove" ng-click="delete(candidate)"></span>' + 
                '{{candidate.Name}} - votes {{candidate.votes}}' + 
            '</div>'
        ),
    };
    
}