$( function() {
var alphanumberids = ["", "ACC123","ACC356","ACC565","ACC589","ACC685","ACC789","ACC825","ACC851"];
var creditterms = ["", "2% 10, Net 30", "2% 10, Net 45", "3% 10, Net 45", "CIA", "Credit Card", "Due Upon Receipt", "Net 30", "Net 45", "Net 60",  "Net 90"];    
var numberids = ["", "11223","12345","15782","45678","45785","62358","84595","85968"];
var names = ["Adriana C. Ocampo Uria","Albert Einstein","Anna K. Behrensmeyer","Blaise Pascal","Caroline Herschel","Cecilia Payne-Gaposchkin","Chien-Shiung Wu","Dorothy Hodgkin","Edmond Halley","Edwin Powell Hubble","Elizabeth Blackburn","Enrico Fermi","Erwin Schroedinger","Flossie Wong-Staal","Frieda Robscheit-Robbins","Geraldine Seydoux","Gertrude B. Elion","Ingrid Daubechies","Jacqueline K. Barton","Jane Goodall","Jocelyn Bell Burnell","Johannes Kepler","Lene Vestergaard Hau","Lise Meitner","Lord Kelvin","Maria Mitchell","Marie Curie","Max Born","Max Planck","Melissa Franklin","Michael Faraday","Mildred S. Dresselhaus","Nicolaus Copernicus","Niels Bohr","Patricia S. Goldman-Rakic","Patty Jo Watson","Polly Matzinger","Richard Phillips Feynman","Rita Levi-Montalcini","Rosalind Franklin","Ruzena Bajcsy","Sarah Boysen","Shannon W. Lucid","Shirley Ann Jackson","Sir Ernest Rutherford","Sir Isaac Newton","Stephen Hawking","Werner Karl Heisenberg","Wilhelm Conrad Roentgen","Wolfgang Ernst Pauli"];
var compNames = ["Betasoloin","Betatech","Bioholding","Bioplex","Blackzim","Cancity","Codehow","Condax","Conecom","Dalttechnology","Domzoom","Doncon","Donquadtech","Dontechi","Donware","Fasehatice","Faxquote","Finhigh","Finjob","Funholding","Ganjaflex","Gogozoom","Golddex","Goodsilron","Green-Plus","Groovestreet","Hatfan","Hottechi","Inity","Isdom","Iselectrics","J-Texon","Kan-code","Kinnamplus","Konex","Konmatfix","Labdrill","Lexiqvolax","Mathtouch","Nam-zim","Newex","Ontomedia","Openlane","Opentech","Plexzap","Plusstrip","Plussunin","Rangreen","Rantouch","Ron-tech","Rundofase","Scotfind","Scottech","Silis","Singletechno","Sonron","Stanredtax","Statholdings","Streethex","Sumace","Sunnamplex","Toughzap","Treequote","Warephase","Xx-holding","Xx-zobam","Y-corporation","Yearin","Zathunicon","Zencorporation","Zoomit","Zotware","Zumgoity","dambase","year-job"];


var classification = ["", "Broker","BusJet","Cargo","Commercial","General Aviation ","Military","OEM","Rotary"];
var custclassification = ["", "Commercial Airline","Military","Broker","Cargo","Bus-Jet","MRO","General Aviation (GA)"];
var vendorclassification = ["", "Calibration","Repair Station","DER","Distributor","OEM"];
var action = ["", "Assemble","Clean","Evaluate","Inspect","QC","Receive","Ship","Teardown","Testing"];
var actionattribute = ["", "Charges","Equipment","Expertise","Material List"];
var jobtitles = ["", "Accountant","CSR","Controller","Engineer","General Manager","Janitor","Mech","Purchasing Manager","Purchasing","QC Manager","Receptionist","Sales manager","Sales","Shop Manager","Supply Room Clerk","Tech","Warehouse man" ];
var employeeexpertise = ["", "Auditor","Engineer","Inspector","Mech","Quality","Receiver","Tech"];
var conditioncode = ["", "AR","AS-IS","NEW","OVH","REP","SRV"];
var uom = ["", "Each", "Gals", "Inch", "Lbs", "Ozs", "Feet", "Yards", "Litre", "Meter", "Kilograms", "Grams", "Centimeters"];
var uomsname = ["", "Ea", "Gal", "inch", "lbs", "Oz", "Ft", "Yd", "Ltr", "Mtr", "Kg", "g", "ctr"];
var workscopes = ["", "Benchtest","Insp","Manu","Ovh","Repair"];
var workscopedes = ["", "Benchtest","Inspection","Manufacturing","Overhaul","Repair"];
	
var itemclassification = ["", "Consumables", "Calibrated Equipmemt", "Equipmemt", "Expendables", "Kit", "Rotables"];
var currency = ["", "British Pound","Euro","Indian Rupee","US Dollar"];
var currencycode = ["", "GBP","EUR","INR","USD"];
var currencysymbol = ["", "£","€","₹","$"];
var taxtype = ["",  "City Tax","Sales Tax","Parish Tax","County Tax","PST","GST","Provincial Tax","Property tax","Excise Tax","Luxury Tax"];	
var percentvalues = ["", "1%", "1.5%", "2%", "2.5%", "3%", "5%", "7%", "7.5%"];
var taxrate = ["",  "FL state tax","FL state"];
var expenditurecategory = ["", "CIP","Cleaning Supplies","Equipment","Furniture and Fixtures","Machinery","Office Equipment - Capital","Office Equipment - Non Capital","Office Supplie","Professional Services","Recruiting","Repair-Building","Repair-Equipment","Stock Parts","Temp Labor"];
var gatestatus = ["", "Ready to Build","Approved Pull Parts","Awaiting Approval","Awaiting Shipping instructions","Awaiting payment","Failed Final Test","Final Testing","In Assembly","Inspection","Invoicing","Long Term Waiting on Approval","Manual Review","Parts Ordered","Preliminary Inspection","Quoting","Teardown Evaluation","Work Order Closed","Work Order Opened"];
var ata = ["", "Honeywell", "Thales"];
var provision = ["Exchange", "Loan", "Repair", "Replace", "Turn-in", "WO"];
var priority = ["AOG", "Critical", "Routine"];
	var integration = ["Aeroxchange", "ILS", "Parts base"];

	
$( ".integration" ).autocomplete({source: integration});
$( ".priority" ).autocomplete({source: priority});	
	$( ".provision" ).autocomplete({source: provision});	
$( ".alphanumberids" ).autocomplete({source: alphanumberids});
$( ".numberids" ).autocomplete({source: numberids});
$( ".names" ).autocomplete({source: names});
$( ".compnames" ).autocomplete({source: compNames});
$( ".custclassification" ).autocomplete({source: custclassification});	
$( ".vendorclassification" ).autocomplete({source: vendorclassification});	
$( ".uomsname" ).autocomplete({source: uomsname}); 
	
$( ".workscopes" ).autocomplete({source: workscopes}); 
$( ".workscopedes" ).autocomplete({source: workscopedes}); 
$( ".currency" ).autocomplete({source: currency}); 
$( ".currencycode" ).autocomplete({source: currencycode}); 
$( ".currencysymbol" ).autocomplete({source: currencysymbol});
$( ".taxtype" ).autocomplete({source: taxtype});
$( ".percentvalues" ).autocomplete({source: percentvalues});
	
$( ".creditterms" ).autocomplete({source: creditterms}); 
$( ".classification" ).autocomplete({source: classification}); 
$( ".action" ).autocomplete({source: action}); 
$( ".actionattribute" ).autocomplete({source: actionattribute}); 
$( ".jobtitles" ).autocomplete({source: jobtitles}); 
$( ".employeeexpertise" ).autocomplete({source: employeeexpertise}); 
$( ".conditioncode" ).autocomplete({source: conditioncode}); 
$( ".uom" ).autocomplete({source: uom}); 
$( ".itemclassification" ).autocomplete({source: itemclassification}); 

$( ".taxrate" ).autocomplete({source: taxrate}); 
$( ".expenditurecategory" ).autocomplete({source: expenditurecategory}); 
$( ".gatestatus" ).autocomplete({source: gatestatus}); 
$( ".ata" ).autocomplete({source: ata}); 
 } );
