var app = angular.module('myApp', []);
app.controller("MainController",['$scope',function($scope){
    $scope.data = [];
	$scope.names1 = ["", "12345", "56789", "89562", "45725", "56814", "38456", "58695"];
	$scope.materialType1 = ["", "Mandatory", "Additional", "Optional"];
	$scope.condition1 = ["AS-IS", "NEW", "REP", "SRV", "OVH", "AR"];
	$scope.provision = ["", "Replace", "Exchange", "Loan", "Wo", "Repair"];
	$scope.deferred = ["", "Yes", "No"];
	$scope.assets1 = angular.copy( $scope.data);
	 $scope.enabledEdit =[];
    $scope.addMaterial = function(){
	    var material ={ partNumber:"",pnDescription:"",materialType:"",qty:"",condition:"",unitCost:"",extendedCost:"",provision:"",deferred:"",disableEdit:false};
		$scope.assets1.push(material);
		$scope.enabledEdit[$scope.assets1.length-1]=true;
	}
	$scope.editMaterial = function(index){
		console.log("edit index"+index);
		$scope.enabledEdit[index] = true;
	}
	$scope.deleteMaterial = function(index) {
		  $scope.assets1.splice(index,1);
	}	
	$scope.submitMaterial = function(){
		console.log("form submitted:"+angular.toJson($scope.assets1 ));
	}
	
	$scope.data = [];
	$scope.names2 = ["", "12345", "56789", "89562", "45725", "56814", "238456", "586954"];
	$scope.materialType2 = ["", "Mandatory", "Additional", "Optional"];
	$scope.condition2 = ["AS-IS", "NEW", "REP", "SRV", "OVH", "AR"];
	$scope.assets2 = angular.copy( $scope.data);
	 $scope.enabledEdit =[];
    $scope.addEquipment = function(){
	    var equipment ={ partNumber:"",pnDescription:"",materialType:"",qty:"",condition:"",materialId:"",disableEdit:false};
		$scope.assets2.push(equipment);
		$scope.enabledEdit[$scope.assets2.length-1]=true;
	}
	$scope.editEquipment = function(index){
		console.log("edit index"+index);
		$scope.enabledEdit[index] = true;
	}
	$scope.deleteEquipment = function(index) {
		  $scope.assets2.splice(index,1);
	}	
	$scope.submitEquipment = function(){
		console.log("form submitted:"+angular.toJson($scope.assets2 ));
	}
	
	
	$scope.data = [];
	$scope.assets3 = angular.copy( $scope.data);
	 $scope.enabledEdit =[];
    $scope.addExpertise = function(){
	    var expertise ={ expertiseType:"",estimatedHours:"",standardRate:"",estimatedCose:"",condition:"",materialId:"",disableEdit:false};
		$scope.assets3.push(expertise);
		$scope.enabledEdit[$scope.assets3.length-1]=true;
	}
	$scope.editExpertise = function(index){
		console.log("edit index"+index);
		$scope.enabledEdit[index] = true;
	}
	$scope.deleteExpertise = function(index) {
		  $scope.assets3.splice(index,1);
	}	
	$scope.submitExpertise = function(){
		console.log("form submitted:"+angular.toJson($scope.assets3 ));
	}
	
	
	
	$scope.data = [];
	$scope.assets4 = angular.copy( $scope.data);
	$scope.chargeType = ["", "Rework", "Out of Scope", "AOG Fee"];
	 $scope.enabledEdit =[];
    $scope.addCharges = function(){
	    var charges ={ type:"",qty:"",unitCost:"",extendedCost:"",disableEdit:false};
		$scope.assets4.push(charges);
		$scope.enabledEdit[$scope.assets4.length-1]=true;
	}
	$scope.editCharges = function(index){
		console.log("edit index"+index);
		$scope.enabledEdit[index] = true;
	}
	$scope.deleteCharges = function(index) {
		  $scope.assets4.splice(index,1);
	}	
	$scope.submitCharges = function(){
		console.log("form submitted:"+angular.toJson($scope.assets4 ));
	}
	
	
	
}]);
