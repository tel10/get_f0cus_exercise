var ex_app = angular.module("example_app",[]);
ex_app.controller('RespCtrl',function($scope) {
/*    addChannel.getResponse();
    });
                  
ex_app.service('addChannel', function($http, $scope){
    this.getResponse = function(){
        $http.jsonp( "https://demo.getfokus.com:3000/Service/Console/YoutubeChannelStats",{
                params: {
                    authKey: 91162629, 
                    channelId: $scope.givenChannelId
                }
        }).success(function(data, status, header, config){
            console.log(data);
        });
    };
});*/
    
    $scope.addChannel = function () {
            if( validateInput($scope.givenChannelId)){
            $.ajax({
                type: "GET",
                url: "https://demo.getfokus.com:3000/Service/Console/YoutubeChannelStats",
                data: {
                    authKey: 91162629,
                    channelId: $scope.givenChannelId
                },
                dataType: 'json',
                success: function(data, textStatus, xhr) { 
                    console.log("status code:",xhr.status);
                },
                complete: function(xhr, textStatus) { 
                    if (xhr.status === 400)
                    {
                        alert("Empty channel id, please enter valid Id");
                    }
                    else if(xhr.status === 401)
                    {
                        alert("Unauthorized User - Please use valid Authentication Key")
                    }
                    else
                    {
                        console.log("status code:",xhr.status);
                    }
                }
            }).done(function (resp) {
                if (resp) {
                    $scope.responses = resp;
                } else {
                    alert('No result.');
                }
            });
        }
        };
//    }
});

function validateInput(arg){
    if( arg.length >= 10 && arg.length <= 30)
    {   
        var checker = !(/[\\/&.,!@#%^*'":?><$;]/.test(arg));
        console.log(checker);
        if(checker === false)
        {
            alert("inappropriate signs channel ID");
            return false;
        }
        else
        {
            return true;
        }
    }
    else
    {
        alert("Too short or too long channel ID");
        return false;
    }
}