
// properly angular ka swagat karna
// foodieApp is the name of the app here
//ngRoute is not a directive it is a module
var foodieApp = angular.module('foodieApp',['ngRoute']);
//console.log(foodieApp);

//configure kar rahe hain
foodieApp.config(function ($routeProvider) {
	$routeProvider
	.when('/',{
		templateUrl: 'pages/login.html',
		controller: 'loginController'
	})
	.when('/home',{
		templateUrl: 'pages/main.html',
		controller: 'mainController'
	})

	.when('/restaurant/:id', {
		templateUrl: 'pages/restaurant.html',
		controller: 'restaurantController'
	})
})

foodieApp.controller('restaurantController',function($scope,$routeParams,$http) {
	//Empty
	$scope.ingredients = [];
	$scope.restaurantId = $routeParams.id;
//console.log($routeParams.id);
var restaurants = [{
					name: 'Hamir Hotel',
					address: '38/39, Level 1, Block E , Near Gandhhi Chowk, Hamirpur',
					location: 'Gandhi Chowk ,Hamirpur',
					category: 'Veg ,Non-Veg , Casual Dining, Bar',
					vote: '4.6',
					cuisines: 'Indian',
					cost: '100',
					id: 1,
					hours: '12 Noon to  12AM (Mon-Sun)',
					bestDish: {
								name: 'Fries',
								image: 'https://i.ytimg.com/vi/ETTyVQrUZt8/maxresdefault.jpg'
							},
					image: 'http://showmeinstitute.org/sites/default/files/Restaurant.jpg'
				},
				{
            name: 'Nisi Coffee',
            address: 'Inner Circle, Connaught Place',
            location: 'Connaught Place',
            category: 'Coffee',
            vote: '4.8',
            cuisines: 'Modern Indian',
            cost: '400',
						id: 2,
						bestDish: {
									name: 'Espresso',
									image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSu_HhBLt8HRcEb_HRYFKsuwHYK8SV8fuXUKSW2fKDO-Qo1ZuXQlQ'
								},
            hours: '9 AM to 10 PM (Mon-Sun)',
            image: 'https://d3tv8y14ogpztx.cloudfront.net/pulses/images/000/028/878/wide_product/nisi1.jpg'
          },
          {
                name: 'A 1 Food Point',
                address: 'baddi',
                location: 'Himachal pradesh',
                category: 'Casual Dining, Veg and Non-Veg',
                vote: '3.9',
                cuisines: 'Modern Indian',
                cost: '300',
								id: 3,
                hours: '9 AM Noon to 10 PM (Mon-Sun)',
								bestDish: {
											name: 'Butter chicken',
											image: 'http://www.ndtv.com/cooks/images/chicken.butter.masala%20%281%29.jpg'
										},
								image: 'https://content3.jdmagicbox.com/comp/solan/w7/9999p1792.1792.151030173852.n7w7/catalogue/a1-punjabi-food-point-bhud-solan-8lyw.jpg'
              },
              {
								name: 'Best Restaurant (B.R.)',
								address: 'Opposite to Bus Stand, Kangra',
								location: 'Kangra',
								category: 'Party, Bar, Dining',
								vote: '4.8',
								cuisines: 'Modern Indian',
								cost: '150',
										id: 4,
                    hours: '6 AM to 2 AM (Mon-Sun)',
										bestDish: {
													name: 'Oatmeal cookies',
													image: 'http://www.shelikesfood.com/wp-content/uploads/2017/03/Healthy-Baked-Oatmeal-Cups-6-Ways-9404.jpg'
												},
										image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT7cVdj15aJ_iihZ9uaBRkLZAmtvCkGsrlPWCGLPiJkfTWfj7Nk'
									},
									{

									name: ' PizzaHut ',
								 address: 'Near Govt. Degree College, Shimla',
								 location: 'Shimla',
								 category: 'Fast food , Casual Dining, Pizza',
								 vote: '4.7',
								 cuisines: 'Italian',
								 cost: '350',
								 id: 5,
								 hours: '12 Noon to  12AM (Mon-Sun)',
								 bestDish: {
											 name: 'Margherita',
											 image: 'https://www.daringgourmet.com/wp-content/uploads/2013/02/Pizza-6-sm.jpg'
										 },
								 image: 'https://s-media-cache-ak0.pinimg.com/originals/e2/08/23/e20823e49d862f0c3fa5487d9b7d3c13.jpg'
							 },
							 {
 									name: ' The Great Dhaba ',
 								 address: 'Post Office Box 924, Ludhiana 141003',
 								 location: 'Ludhiana',
 								 category: 'Fast food , Casual Dining',
 								 vote: '4.7',
 								 cuisines: 'Indian, Japanese',
 								 cost: '550',
 								 id: 6,
 								 hours: '12 Noon to  12AM (Mon-Sun)',
 								 bestDish: {
 											 name: 'Sushi',
 											 image: 'https://i.ytimg.com/vi/jPLJbSp6vKY/maxresdefault.jpg'
 										 },
 								 image: 'https://media-cdn.tripadvisor.com/media/photo-s/0d/00/21/5a/front-exterior.jpg'

							 }]

				$scope.restaurant = restaurants[$routeParams.id - 1];

			$scope.getIngredients = function(url) {
	var data = '{"inputs":[{"data":{"image":{"url":"' + url + '"}}}]}'
					$http({
						'method': 'POST',
						'url': 'https://api.clarifai.com/v2/models/bd367be194cf45149e75f01d59f77ba7/outputs',
						'headers': {
							'Authorization': 'Key a653de3715d5400ab765c24b3770ffee',
							'Content-Type': 'application/json'
						},
						'data': data,

					}).then(function (response) {
								var ingredients = response.data.outputs[0].data.concepts;
								//console.log(ingredients[0].value);

					  			var list = '';
									var protein = ['egg','chicken','oats','cheese','yogurt','milk','broccoli','tuna','lentil','fish','shrimp'];
									var fat = ['flaxseed','almond','oil','avocado','walnuts','peanut','cashew','dark chocolate','chips','french fries','sweet','pizza','pastry','frozen pizza'];
									var carb = ['oatmeal','yams','brown rice','pumpkin','apple','oranges','pears','mangobread', 'beans', 'milk', 'popcorn', 'potatoes', 'cookies', 'spaghetti', 'soft drinks'];


									for (var i =0;i < ingredients.length;i++) {

										//if($scope.ingredients[i].value > 0.85){
										$scope.ingredients.push(ingredients[i].name);
									    //}
										}

										for(var i=0;i< protein.length;i++){
											// CHECK FOR THE PROTEIN ROR CARB OR FAT RICH FOOD
											//console.log($scope.protein);
										if ($scope.ingredients.indexOf(protein[i]) > -1) {
												var info = "<p class='highlight-info'>Protien Rich</p>";
												console.log("run");
													$(".rest-extra .bestDish").append(info);
													$(".highlight-info").css("background-color" ,"cyan");
													$(".highlight-info").css("color" ,"black");
													$(".highlight-info").css("font-size" ,"20px");
													$(".highlight-info").css("font-size" ,"20px");
													break;
												 }

									 else if($scope.ingredients.indexOf(fat[i]) > -1){
										 	var info2 = "<p class='highlight-info'>Fat Rich</p>";
												console.log('fat rich');
												$(".type .bestDish").append(info2);
												$(".highlight-info").css("background-color" ,"yellow");
												$(".highlight-info").css("color" ,"black");
												$(".highlight-info").css("font-size" ,"20px");
												$(".highlight-info").css("font-size" ,"20px");
												break;
											}

										else if($scope.ingredients.indexOf(carb[i]) > -1){
	 										 	var info3 = "<p class='highlight-info'>Carbohydrate Rich</p>";
	 												console.log('carb rich');
	 												$(".type .bestDish").append(info3);
	 												$(".highlight-info").css("background-color" ,"green");
													$(".highlight-info").css("color" ,"white");
													$(".highlight-info").css("font-size" ,"20px");

	 												break;
	 											}

												else {
													 	var info4 = "<h1 class='highlight-info'>Not a nutrient rich food</h1>";
														$(".type .bestDish").append(info3);
														$(".highlight-info").css("background-color" ,"black");
														$(".highlight-info").css("color" ,"white");
														$(".highlight-info").css("font-size" ,"20px");

												}



										}





										//console.log(ingredients.length);
						//console.log(list);
					}, function (xhr) {
												   console.log(xhr);
												  });


}


})


foodieApp.controller('loginController',function($scope,$location) {
	$scope.goToHome = function() {
			$location.url('home')
			console.log($location.url);
		}
})

//controller ka function is used to create a controller
//main controller controller ka naam h
// iss function ke andar aayega jo bhi kaam hoga controller ka
foodieApp.controller('mainController',function($scope) {
  //CONTROLLER KAREGA KYA

  $scope.restaurants = [{
							name: 'Hamir Hotel',
							address: '38/39, Level 1, Block E , Near Gandhhi Chowk, Hamirpur',
							location: 'Gandhi Chowk ,Hamirpur',
							category: 'Veg ,Non-Veg , Casual Dining, Bar',
							vote: '4.2',
							cuisines: 'Modern Indian',
							cost: '100',
							id: 1,
							hours: '12 Noon to 12 AM (Mon-Sun)',
							image: 'http://showmeinstitute.org/sites/default/files/Restaurant.jpg'
						},
						{
            name: 'Nisi Coffee',
            address: 'Inner Circle, Connaught Place',
            location: 'Connaught Place',
            category: 'Coffee',
            vote: '4.8',
            cuisines: 'Modern Indian',
            cost: '400',
						id: 2,
            hours: '9 AM to 10 PM (Mon-Sun)',
            image: 'https://d3tv8y14ogpztx.cloudfront.net/pulses/images/000/028/878/wide_product/nisi1.jpg'
          },
          {
						name: 'A 1 Food Point',
						address: 'baddi',
						location: 'Himachal pradesh',
						category: 'Casual Dining, Veg and Non-Veg',
						vote: '3.9',
						cuisines: 'Modern Indian',
						cost: '300',
						id: 3,
						hours: '9 AM Noon to 10 PM (Mon-Sun)',
                image: 'https://content3.jdmagicbox.com/comp/solan/w7/9999p1792.1792.151030173852.n7w7/catalogue/a1-punjabi-food-point-bhud-solan-8lyw.jpg'
              },
              {
                    name: 'Best Restaurant (B.R.)',
                    address: 'Opposite to Bus Stand, Kangra',
                    location: 'Kangra',
                    category: 'Party, Bar, Dining',
                    vote: '4.8',
                    cuisines: 'Modern Indian',
                    cost: '150',
										id: 4,
                    hours: '1 AM to 1 PM (Mon-Sun)',
                    image: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT7cVdj15aJ_iihZ9uaBRkLZAmtvCkGsrlPWCGLPiJkfTWfj7Nk'
									},
									{
										name: ' PizzaHut ',
									 address: 'Near Govt. Degree College, Shimla',
									 location: 'Shimla',
									 category: 'Fast food , Casual Dining, Pizza',
									 vote: '4.7',
									 cuisines: 'Italian',
									 cost: '350',
									 id: 5,
									 hours: '12 Noon to  12AM (Mon-Sun)',
									image: 'https://s-media-cache-ak0.pinimg.com/originals/e2/08/23/e20823e49d862f0c3fa5487d9b7d3c13.jpg'
								},
								{
									name: ' The Great Dhaba ',
								 address: 'Post Office Box 924, Ludhiana 141003',
								 location: 'Ludhiana',
								 category: 'Fast food , Casual Dining',
								 vote: '4.4',
								 cuisines: 'Indian, Japanese',
								 cost: '550',
								 id: 6,
								 hours: '12 Noon to  12AM (Mon-Sun)',
								 image: 'https://media-cdn.tripadvisor.com/media/photo-s/0d/00/21/5a/front-exterior.jpg'
							 }]

})
