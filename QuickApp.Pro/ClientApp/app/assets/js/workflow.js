var app = angular.module('myApp', []);
app.controller("MainController",['$scope',function($scope){
    $scope.data = [{partNumber:"",pnDescription:"",materialType:"",qty:"1",uom:"",condition:"",unitCost:"",extendedCost:"",provision:"",deferred:"",disableEdit:false},	              
	              {partNumber:"",pnDescription:"",materialType:"",qty:"1",uom:"",condition:"",unitCost:"",extendedCost:"",provision:"",deferred:"",disableEdit:false}];
	$scope.names1 = ["", "12345", "56789", "89562", "45725", "56814", "38456", "58695"];
	$scope.materialType1 = ["Avionics", "Hydraulics", "Instruments", "Landing Gears", "Pannels", "Pneumatics", "Valves"];
	$scope.condition1 = ["AR", "AS-IS", "NEW", "OVH", "REP", "SRV"];
	$scope.uom = ["Ctr", "Ea", "Ft", "g", "Gal", "inch", "kg", "lbs", "Ltr", "Mtr", "Oz", "Yd"];
	$scope.itemClassification = ["Consumables", "Calibrated Equipmemt", "Equipmemt", "Expendables", "Kit", "Rotables"];
	$scope.provision = ["Exchange", "Loan", "Repair", "Replace", "Turn-in", "WO"];
	$scope.deferred = ["No", "Yes"];
	$scope.assets1 = angular.copy( $scope.data);
	 $scope.enabledEdit =[];
    $scope.addMaterial = function(){
	    var material ={ partNumber:"",pnDescription:"",itemClassification:"",qty:"1",uom:"",condition:"",unitCost:"",extendedCost:"",provision:"",deferred:"",disableEdit:false};
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
	$scope.names11 = ["", "12345", "56789", "89562", "45725", "56814", "38456", "58695"];
	$scope.materialType11 = ["Avionics", "Hydraulics", "Instruments", "Landing Gears", "Pannels", "Pneumatics", "Valves"];
	$scope.condition11 = ["AR", "AS-IS", "NEW", "OVH", "REP", "SRV"];
	$scope.uom1 = ["Ctr", "Ea", "Ft", "g", "Gal", "inch", "kg", "lbs", "Ltr", "Mtr", "Oz", "Yd"];
	$scope.provision1 = ["Exchange", "Loan", "Repair", "Replace", "Turn-in", "WO"];
	$scope.deferred1 = ["No", "Yes"];
	$scope.assets11 = angular.copy( $scope.data);
	 $scope.enabledEdit =[];
    $scope.addMaterial1 = function(){
	    var material1 ={ partNumber:"",pnDescription:"",materialType1:"",qty:"1",uom1:"",condition:"",unitCost:"",extendedCost:"",provision1:"",deferred1:"",disableEdit:false};
		$scope.assets11.push(material1);
		$scope.enabledEdit[$scope.assets11.length-1]=true;
	}
	$scope.editMaterial1 = function(index){
		console.log("edit index"+index);
		$scope.enabledEdit[index] = true;
	}
	$scope.deleteMaterial1 = function(index) {
		  $scope.assets1.splice(index,1);
	}	
	$scope.submitMaterial1 = function(){
		console.log("form submitted:"+angular.toJson($scope.assets11 ));
	}
	
	$scope.data = [];
	$scope.names12 = ["", "12345", "56789", "89562", "45725", "56814", "38456", "58695"];
	$scope.materialType12 = ["Avionics", "Hydraulics", "Instruments", "Landing Gears", "Pannels", "Pneumatics", "Valves"];
	$scope.condition12 = ["AR", "AS-IS", "NEW", "OVH", "REP", "SRV"];
	$scope.uom2 = ["Ctr", "Ea", "Ft", "g", "Gal", "inch", "kg", "lbs", "Ltr", "Mtr", "Oz", "Yd"];
	$scope.provision2 = ["Exchange", "Loan", "Repair", "Replace", "Turn-in", "WO"];
	$scope.deferred2 = ["No", "Yes"];
	$scope.assets12 = angular.copy( $scope.data);
	 $scope.enabledEdit =[];
    $scope.addMaterial2 = function(){
	    var material2 ={ partNumber:"",pnDescription:"",materialType2:"",qty:"1",uom2:"",condition:"",unitCost:"",extendedCost:"",provision2:"",deferred2:"",disableEdit:false};
		$scope.assets12.push(material2);
		$scope.enabledEdit[$scope.assets12.length-1]=true;
	}
	$scope.editMaterial2 = function(index){
		console.log("edit index"+index);
		$scope.enabledEdit[index] = true;
	}
	$scope.deleteMaterial2 = function(index) {
		  $scope.assets1.splice(index,1);
	}	
	$scope.submitMaterial2 = function(){
		console.log("form submitted:"+angular.toJson($scope.assets12 ));
	}
	
	$scope.data = [{partNumber:"",pnDescription:"",materialType:"",qty:"1",condition:"",materialId:"",disableEdit:false},
				  {partNumber:"",pnDescription:"",materialType:"",qty:"1",condition:"",materialId:"",disableEdit:false}];
	$scope.names2 = ["", "12345", "56789", "89562", "45725", "56814", "238456", "586954"];
	$scope.materialType2 = ["Consumable", "Equipment", "Expendable", "Kit", "Rotatable"];
	$scope.condition2 = ["AR", "AS-IS", "NEW", "OVH", "REP", "SRV"];
	$scope.assets2 = angular.copy( $scope.data);
	 $scope.enabledEdit =[];
    $scope.addEquipment = function(){
	    var equipment ={partNumber:"",pnDescription:"",materialType:"",qty:"1",condition:"",materialId:"",disableEdit:false};
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
	
	
	$scope.data = [{ expertiseType:"",estimatedHours:"",standardRate:"",estimatedCose:"",condition:"",materialId:"",disableEdit:false},
				  { expertiseType:"",estimatedHours:"",standardRate:"",estimatedCose:"",condition:"",materialId:"",disableEdit:false}];
	$scope.expertiseType = ["", "Auditor", "Engineer", "Inspector", "Mechanic", "Quality", "Receiver", "Technician"];
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
	
	
	
	$scope.data = [{ type:"",qty:"1",unitCost:"",extendedCost:"",disableEdit:false},
				  { type:"",qty:"1",unitCost:"",extendedCost:"",disableEdit:false}];
	$scope.assets4 = angular.copy( $scope.data);
	$scope.chargeType = ["", "AOG Fee", "Out of Scope", "Rework"];
	 $scope.enabledEdit =[];
    $scope.addCharges = function(){
	    var charges ={ type:"",qty:"1",unitCost:"",extendedCost:"",disableEdit:false};
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
	
	
	$scope.data = [{partNumber:"",pnDescription:"",notes:"",disableEdit:false},
				  {partNumber:"",pnDescription:"",notes:"",disableEdit:false}];
	$scope.names2 = ["", "12345", "56789", "89562", "45725", "56814", "238456", "586954"];
	$scope.assets5 = angular.copy( $scope.data);
	 $scope.enabledEdit =[];
    $scope.addExclusions = function(){
	    var exclusions ={partNumber:"",pnDescription:"",notes:"",disableEdit:false};
		$scope.assets5.push(exclusions);
		$scope.enabledEdit[$scope.assets5.length-1]=true;
	}
	$scope.editExclusions = function(index){
		console.log("edit index"+index);
		$scope.enabledEdit[index] = true;
	}
	$scope.deleteExclusions = function(index) {
		  $scope.assets5.splice(index,1);
	}	
	$scope.submitExclusions = function(){
		console.log("form submitted:"+angular.toJson($scope.assets5 ));
	}
	
	
	
	
	$scope.data = [{savedpartNumber:"12345",savedpnDescription:"Sample Description",saveditemClassification:"Consumables",savedqty:"2",saveduom:"Ea",savedcondition:"NEW",savedunitCost:"10.00",savedextendedCost:"50.00",savedprovision:"Replace",saveddeferred:"Yes"},
	              {savedpartNumber:"56789",savedpnDescription:"Sample Description",saveditemClassification:"Rotables",savedqty:"5",saveduom:"Ea",savedcondition:"REP",savedunitCost:"20.00",savedextendedCost:"120.00",savedprovision:"Exchange",saveddeferred:"No"}];
	$scope.savednames1 = ["12345", "56789", "89562", "45725", "56814", "38456", "58695"];
	$scope.savedmaterialType1 = ["Avionics", "Hydraulics", "Instruments", "Landing Gears", "Pannels", "Pneumatics", "Valves"];
	$scope.savedcondition1 = ["AR", "AS-IS", "NEW", "OVH", "REP", "SRV"];
	$scope.savedprovision = ["Exchange", "Loan", "Repair", "Replace", "Turn-in", "WO"];
	$scope.saveditemClassification = ["Consumables", "Calibrated Equipmemt", "Equipmemt", "Expendables", "Kit", "Rotables"];
	$scope.saveddeferred = ["No", "Yes"];
	$scope.savedassets1 = angular.copy( $scope.data);
	$scope.enabledMaterialsavedEdit =[];
    $scope.addMaterialsaved = function(){
	    var materialsaved ={ savedpartNumber:"",savedpnDescription:"",savedmaterialType:"",savedqty:"",savedcondition:"",savedunitCost:"",savedextendedCost:"",savedprovision:"",saveddeferred:"",disableEdit:false};
		$scope.savedassets1.push(materialsaved);
		$scope.enabledMaterialEdit[$scope.savedassets1.length-1]=true;
	}
	$scope.editMaterialsaved = function(index){
		console.log("edit index"+index);
		$scope.enabledMaterialsavedEdit[index] = true;
	}
	$scope.deleteMaterialsaved = function(index) {
		  $scope.savedassets1.splice(index,1);
	}	
	$scope.submitMaterialsaved = function(){
		console.log("form submitted:"+angular.toJson($scope.savedassets1 ));
	}
	
	
	$scope.data = [{savedpartNumber:"12345",savedpnDescription:"Sample Description",savedmaterialType:"Hydraulics",savedqty:"2",savedcondition:"NEW",savedunitCost:"10.00",savedextendedCost:"50.00",savedprovision:"Replace",saveddeferred:"Yes"},
	              {savedpartNumber:"56789",savedpnDescription:"Sample Description",savedmaterialType:"Pannels",savedqty:"5",savedcondition:"REP",savedunitCost:"20.00",savedextendedCost:"120.00",savedprovision:"Exchange",saveddeferred:"No"}];
	$scope.savednames12 = ["12345", "56789", "89562", "45725", "56814", "38456", "58695"];
	$scope.savedmaterialType12 = ["Avionics", "Hydraulics", "Instruments", "Landing Gears", "Pannels", "Pneumatics", "Valves"];
	$scope.savedcondition12 = ["AR", "AS-IS", "NEW", "OVH", "REP", "SRV"];
	$scope.savedprovision2 = ["Exchange", "Loan", "Repair", "Replace", "Turn-in", "WO"];
	$scope.saveddeferred2 = ["No", "Yes"];
	$scope.savedassets12 = angular.copy( $scope.data);
	 $scope.enabledMaterialsavedEdit2 =[];
    $scope.addMaterialsaved2 = function(){
	    var materialsaved2 ={ savedpartNumber:"",savedpnDescription:"",savedmaterialType:"",savedqty:"",savedcondition:"",savedunitCost:"",savedextendedCost:"",savedprovision:"",saveddeferred:"",disableEdit:false};
		$scope.savedassets12.push(materialsaved2);
		$scope.enabledMaterialEdit[$scope.savedassets12.length-1]=true;
	}
	$scope.editMaterialsaved2 = function(index){
		console.log("edit index"+index);
		$scope.enabledMaterialsavedEdit2[index] = true;
	}
	$scope.deleteMaterialsaved2 = function(index) {
		  $scope.savedassets12.splice(index,1);
	}	
	$scope.submitMaterialsaved2 = function(){
		console.log("form submitted:"+angular.toJson($scope.savedassets12 ));
	}
	
	$scope.data = [{savedpartNumber:"12345",savedpnDescription:"Sample Description",savedmaterialType:"Kit",savedqty:"2",savedcondition:"NEW"},
	              {savedpartNumber:"56789",savedpnDescription:"Sample Description",savedmaterialType:"Expendable",savedqty:"5",savedcondition:"REP"}];
	
	$scope.savednames2 = ["12345", "56789", "89562", "45725", "56814", "238456", "586954"];
	$scope.savedmaterialType2 = ["Consumable", "Equipment", "Expendable", "Kit", "Rotatable"];
	$scope.savedcondition2 = ["AR", "AS-IS", "NEW", "OVH", "REP", "SRV"];
	$scope.savedassets2 = angular.copy( $scope.data);
	 $scope.enabledEquipmentsavedEdit =[];
    $scope.addEquipmentsaved = function(){
	    var equipment ={ savedpartNumber:"",savedpnDescription:"",savedmaterialType:"",savedqty:"",savedcondition:"",disableEdit:false};
		$scope.savedassets2.push(equipmentsaved);
		$scope.enabledEquipmentsavedEdit[$scope.savedassets2.length-1]=true;
	}
	$scope.editEquipmentsaved = function(index){
		console.log("edit index"+index);
		$scope.enabledEquipmentsavedEdit[index] = true;
	}
	$scope.deleteEquipmentsaved = function(index) {
		  $scope.savedassets2.splice(index,1);
	}	
	$scope.submitEquipmentsaved = function(){
		console.log("form submitted:"+angular.toJson($scope.savedassets2 ));
	}
	
	
	$scope.data = [{savedexpertiseType:"Mechanic",savedestimatedHours:"4",savedstandardRate:"95.00",savedestimatedCost:"100.00"},
	              {savedexpertiseType:"Technician",savedestimatedHours:"6",savedstandardRate:"150.00",savedestimatedCost:"140.00"} ];
	$scope.savedexpertiseType = ["Auditor", "Engineer", "Inspector", "Mechanic", "Quality", "Receiver", "Technician"];
	$scope.savedassets3 = angular.copy( $scope.data);
	 $scope.enabledExpertisesavedEdit =[];
    $scope.addExpertisesaved = function(){
	    var expertisesaved ={ savedexpertiseType:"",savedestimatedHours:"",savedstandardRate:"",savedestimatedCost:"",disableEdit:false};
		$scope.savedassets3.push(expertisesaved);
		$scope.enabledExpertisesavedEdit[$scope.savedassets3.length-1]=true;
	}
	$scope.editExpertisesaved = function(index){
		console.log("edit index"+index);
		$scope.enabledExpertisesavedEdit[index] = true;
	}
	$scope.deleteExpertisesaved = function(index) {
		  $scope.savedassets3.splice(index,1);
	}	
	$scope.submitExpertisesaved = function(){
		console.log("form submitted:"+angular.toJson($scope.savedassets3 ));
	}
	
	
	
	$scope.data = [{savedchargesType:"Rework",savedqty:"5",savedunitCost:"250.00",savedextendedCost:"80.00"},
	              {savedchargesType:"AOG",savedqty:"1",savedunitCost:"123.00",savedextendedCost:"80.00"} ];
	
	$scope.savedassets4 = angular.copy( $scope.data);
	$scope.savedchargesType = ["AOG", "Out of Scope", "Rework"];
	 $scope.enabledChargessavedEdit =[];
    $scope.addChargessaved = function(){
	    var chargessaved ={ chargesType:"",qty:"",unitCost:"",extendedCost:"",disableEdit:false};
		$scope.savedassets4.push(chargessaved);
		$scope.enabledChargessavedEdit[$scope.savedassets4.length-1]=true;
	}
	$scope.editChargessaved = function(index){
		console.log("edit index"+index);
		$scope.enabledChargessavedEdit[index] = true;
	}
	$scope.deleteChargessaved = function(index) {
		  $scope.savedassets4.splice(index,1);
	}	
	$scope.submitChargessaved = function(){
		console.log("form submitted:"+angular.toJson($scope.savedassets4 ));
	}
	
	
	$scope.data = [{savedpartNumber:"12345",savedpnDescription:"Sample Description",savednotes:"Mandatory"},
	              {savedpartNumber:"56789",savedpnDescription:"Sample Description",savednotes:"Additional"}];
	
	$scope.savednames2 = ["12345", "56789", "89562", "45725", "56814", "238456", "586954"];
	$scope.savedassets5 = angular.copy( $scope.data);
	$scope.enabledExclusionssavedEdit =[];
    $scope.addExclusionssaved = function(){
	    var exclusionssaved ={ savedpartNumber:"",savedpnDescription:"",savednotes:""};
		$scope.savedassets5.push(exclusionssaved);
		$scope.enabledExclusionssavedEdit[$scope.savedassets5.length-1]=true;
	}
	$scope.editExclusionssaved = function(index){
		console.log("edit index"+index);
		$scope.enabledExclusionssavedEdit[index] = true;
	}
	$scope.deleteExclusionssaved = function(index) {
		  $scope.savedassets5.splice(index,1);
	}	
	$scope.submitExclusionssaved = function(){
		console.log("form submitted:"+angular.toJson($scope.savedassets5 ));
	}
	
	
	
}]);
