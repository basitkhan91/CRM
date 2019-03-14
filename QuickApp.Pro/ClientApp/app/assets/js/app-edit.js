var app = angular.module('myApp', []);
app.controller("MainController",['$scope',function($scope){
    $scope.data = [{partNumber:"12345",pnDescription:"Sample Description",materialType:"Mandatory",qty:"2",condition:"NEW",unitCost:"10.00",extendedCost:"50.00",provision:"Replace",deferred:"Yes"},
	              {partNumber:"56789",pnDescription:"Sample Description",materialType:"Mandatory",qty:"5",condition:"REP",unitCost:"20.00",extendedCost:"120.00",provision:"Exchange",deferred:"No"} ];
	$scope.names1 = ["12345", "56789", "89562", "45725", "56814", "38456", "58695"];
	$scope.materialType1 = ["Mandatory", "Additional", "Optional"];
	$scope.condition1 = ["AS-IS", "NEW", "REP", "SRV", "OVH", "AR"];
	$scope.provision = ["Replace", "Exchange", "Loan", "Wo", "Repair"];
	$scope.deferred = ["Yes", "No"];
	$scope.assets1 = angular.copy( $scope.data);
	 $scope.enabledMaterialEdit =[];
    $scope.addMaterial = function(){
	    var material ={ partNumber:"",pnDescription:"",materialType:"",qty:"",condition:"",unitCost:"",extendedCost:"",provision:"",deferred:"",disableEdit:false};
		$scope.assets1.push(material);
		$scope.enabledMaterialEdit[$scope.assets1.length-1]=true;
	}
	$scope.editMaterial = function(index){
		console.log("edit index"+index);
		$scope.enabledMaterialEdit[index] = true;
	}
	$scope.deleteMaterial = function(index) {
		  $scope.assets1.splice(index,1);
	}	
	$scope.submitMaterial = function(){
		console.log("form submitted:"+angular.toJson($scope.assets1 ));
	}
	
	$scope.data = [{partNumber:"12345",pnDescription:"Sample Description",materialType:"Mandatory",qty:"2",condition:"NEW"},
	              {partNumber:"56789",pnDescription:"Sample Description",materialType:"Additional",qty:"5",condition:"REP"} ];
	
	$scope.names2 = ["12345", "56789", "89562", "45725", "56814", "238456", "586954"];
	$scope.materialType2 = ["Mandatory", "Additional", "Optional"];
	$scope.condition2 = ["AS-IS", "NEW", "REP", "SRV", "OVH", "AR"];
	$scope.assets2 = angular.copy( $scope.data);
	 $scope.enabledEquipmentEdit =[];
    $scope.addEquipment = function(){
	    var equipment ={ partNumber:"",pnDescription:"",materialType:"",qty:"",condition:"",disableEdit:false};
		$scope.assets2.push(equipment);
		$scope.enabledEquipmentEdit[$scope.assets2.length-1]=true;
	}
	$scope.editEquipment = function(index){
		console.log("edit index"+index);
		$scope.enabledEquipmentEdit[index] = true;
	}
	$scope.deleteEquipment = function(index) {
		  $scope.assets2.splice(index,1);
	}	
	$scope.submitEquipment = function(){
		console.log("form submitted:"+angular.toJson($scope.assets2 ));
	}
	
	
	$scope.data = [{expertiseType:"Mech",estimatedHours:"4",standardRate:"95.00",estimatedCost:"100.00"},
	              {expertiseType:"Mech",estimatedHours:"6",standardRate:"150.00",estimatedCost:"140.00"} ];
	
	$scope.assets3 = angular.copy( $scope.data);
	 $scope.enabledExpertiseEdit =[];
    $scope.addExpertise = function(){
	    var expertise ={ expertiseType:"",estimatedHours:"",standardRate:"",estimatedCost:"",disableEdit:false};
		$scope.assets3.push(expertise);
		$scope.enabledExpertiseEdit[$scope.assets3.length-1]=true;
	}
	$scope.editExpertise = function(index){
		console.log("edit index"+index);
		$scope.enabledExpertiseEdit[index] = true;
	}
	$scope.deleteExpertise = function(index) {
		  $scope.assets3.splice(index,1);
	}	
	$scope.submitExpertise = function(){
		console.log("form submitted:"+angular.toJson($scope.assets3 ));
	}
	
	
	
	$scope.data = [{chargesType:"Rework",qty:"5",unitCost:"250.00",extendedCost:"80.00"},
	              {chargesType:"AOG",qty:"1",unitCost:"123.00",extendedCost:"80.00"} ];
	
	$scope.assets4 = angular.copy( $scope.data);
	$scope.chargesType = ["Rework", "Out of Scope", "AOG"];
	 $scope.enabledChargesEdit =[];
    $scope.addCharges = function(){
	    var charges ={ chargesType:"",qty:"",unitCost:"",extendedCost:"",disableEdit:false};
		$scope.assets4.push(charges);
		$scope.enabledChargesEdit[$scope.assets4.length-1]=true;
	}
	$scope.editCharges = function(index){
		console.log("edit index"+index);
		$scope.enabledChargesEdit[index] = true;
	}
	$scope.deleteCharges = function(index) {
		  $scope.assets4.splice(index,1);
	}	
	$scope.submitCharges = function(){
		console.log("form submitted:"+angular.toJson($scope.assets4 ));
	}
	
	
	
}]);
