//Angular

var app = angular.module('myApp', ['ngRoute']);
app.config(function($routeProvider, $httpProvider){
	$routeProvider
		.when('/players', {
			templateUrl: 'partials/partial1.html',
			controller: 'playersController'
		})
		.when('/teams', {
			templateUrl: 'partials/partial2',
			controller: 'teamsController'
		})
		.when('/players/new', {
			templateUrl: 'partials/newPlayer.html',
			controller: 'playersController'
		})
		.when('/rosters', {
			templateUrl: '/partials/teamRosters.html',
			controller: 'teamsController'
		})
		.otherwise({
			redirectTo: '/players'
		})
	$httpProvider.defaults.headers.common['X-CSRF-TOKEN'] = $('meta[name=csrf-token]').attr('content');
});
app.factory('playerFactory', function($http){
	var factory = {};
	factory.index = function(callback){
		$http.get("/players").success(callback)
	};
	factory.create = function(input, callback){
		$http.post('/players', input).success(callback)
	};
	factory.destroy = function(id, callback){
		$http.delete('/players/' + id).success(callback)
	};
	return factory;
});
app.factory('teamFactory', function($http){
	var factory = {}
	factory.index = function(callback){
		$http.get('/teams').success(callback)
	}
	factory.create = function(input, callback){
		$http.post('/teams', input).success(callback)
	}
	factory.show = function(id, callback){
		$http.get('/teams/' + id).success(callback)
	}
	factory.destroy = function(id, callback){
		$http.delete('/teams/' + id).success(callback)
	}
	return factory;
});
app.controller('playersController', function($scope, playerFactory, teamFactory){
	playerFactory.index(function(json){
		$scope.players = json;
	});
	teamFactory.index(function(json){
		$scope.teams = json;
	})
	$scope.create = function(input){
		$('#newPlayer_error').html('');
		if(!input){
			html_str = '<p class="error">';
			html_str += 'Name must not be blank.';
			html_str += '</p>';
			$('#newPlayer_error').html(html_str);
			return;
		} else if(!input.player){
			html_str = '<p class="error">';
			html_str += 'Name must not be blank.';
			html_str += '</p>';
			$('#newPlayer_error').html(html_str);
			return;
		} else if(!input.player.name){
			html_str = '<p class="error">';
			html_str += 'Name must not be blank.';
			html_str += '</p>';
			$('#newPlayer_error').html(html_str);
			return;
		} else if(!input.player.team_id){
			html_str = '<p class="error">';
			html_str += 'A team must be selected.';
			html_str += '</p>';
			$('#newPlayer_error').html(html_str);
			return;
		} else {
			input.player.name = capitalizeEachWord(input.player.name);
			for(i in $scope.players){
				if($scope.players[i].name == input.player.name){
					html_str = '<p class="error">';
					html_str += 'This player has already been added.';
					html_str += '</p>';
					$('#newPlayer_error').html(html_str);
					return;
				}
			}
		}
		playerFactory.create(input, function(json){
			$scope.newPlayer = {};
			$("#newPlayer").css('display', 'none');
			$scope.players = json;
		})
	}
	$scope.destroy = function(playerId){
		playerFactory.destroy(playerId, function(json){
			$scope.players = json;
		})
	}
});
app.controller('teamsController', function($scope, teamFactory){
	teamFactory.index(function(json){
		$scope.teams = json;
	})
	$scope.create = function(input){
		$('#newTeam_name_nerror').html('')
		if (!input){
			html_string = '<p class="error">';
			html_string += 'Name must not be blank.';
			html_string += '</p>';
			$('#newTeam_name_error').html(html_string);
		} else {
			input.team.name = capitalizeEachWord(input.team.name);
			for(i in $scope.teams){
				if($scope.teams[i].name == input.team.name){
					html_string = '<p class="error">';
					html_string += 'This team has already been registered.';
					html_string += '</p>';
					$('#newTeam_name_error').html(html_string);
					return;
				}
			}
			teamFactory.create(input, function(json){
				$scope.newTeam = {};
				$("#newTeam").css('display', 'none');
				$scope.teams = json;
			})
		}
	}
	$scope.show = function(input){
		teamFactory.show(input.roster.id, function(output){
			$scope.roster = output;
		})
	}
	$scope.destroy = function(teamId){
		teamFactory.destroy(teamId, function(json){
			$scope.teams = json;
		})
	}
});

// Helper Functions

function capitalizeEachWord(str) {
  return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

// JQuery

$(document).on("change", "#teamOption", function(){
	$("#roster").click();
});
$(document).on("click", "#addPlayerButton", function(){
	$('#newPlayer').css('display', 'block');
});
$(document).on("click", "#closeNewPlayer", function(){
	$('#newPlayer').css('display', 'none');
});
$(document).on("click","#addTeamButton",function(){
	$("#newTeam").css('display', 'block');
});
$(document).on("click","#closeNewTeam",function(){
	$("#newTeam").css('display', 'none');
});















