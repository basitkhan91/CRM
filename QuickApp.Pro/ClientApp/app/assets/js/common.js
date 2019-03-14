$ = jQuery.noConflict();
var http = getHTTPObject();
var calDiv = '';
/* Ajax Functionality */

var partid = ["", "12345", "456789", "859685", "457851", "623589", "157825", "1122356", "8459565"];
var names = ["", "Shabbir", "Satish", "Meghanadh", "Manoj", "Don", "Roger", "Prasad", "krunal"];
$( "#pscope" ).autocomplete({source: partid});
$( ".pid" ).autocomplete({source: partid});
$( ".names" ).autocomplete({source: names});




function getHTTPObject(){
	var xmlhttp;
	if(window.XMLHttpRequest){ xmlhttp = new XMLHttpRequest(); }
	else if (window.ActiveXObject){ xmlhttp = new ActiveXObject("Microsoft.XMLHTTP"); if (!xmlhttp){ xmlhttp = new ActiveXObject("Msxml2.XMLHTTP"); } }
	return xmlhttp;
}

var testresults;
function checkemail(emailCheck){
	var filter=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i
	if (filter.test(emailCheck)){ testresults=true; }else{ testresults=false; }
	return (testresults);
}

//Trim Function 
function trim(text) { return (text || "").replace(/^\s+|\s+$/g, "" ); }

function keyRestrict(e, choice){
	validchars = '';
	if(choice == 'int') validchars = '1234567890';
	else if(choice == 'dotint') validchars = '1234567890.';
	else if(choice == 'latlong') validchars = '1234567890.-';
	else if(choice == 'phone') validchars = '1234567890. -_()+';
	else if(choice == 'char') validchars = 'abcdefghijklmnopqrstuvwxyz';
	else if(choice == 'charspe') validchars = 'abcdefghijklmnopqrstuvwxyz_.';	
	else if(choice == 'emailchar') validchars = 'abcdefghijklmnopqrstuvwxyz_-.1234567890@';
	else if(choice == 'charnum') validchars = 'abcdefghijklmnopqrstuvwxyz1234567890';
	else if(choice == 'passchar') validchars = 'abcdefghijklmnopqrstuvwxyz_1234567890.';
	else if(choice == 'charspace') validchars = 'abcdefghijklmnopqrstuvwxyz1234567890 ';
	else if(choice == 'vchar') validchars = 'abcdefghijklmnopqrstuvwxyz1234567890 ._-@,#|:;';
	
	var key='', keychar='';
	key = getKeyCode(e);
	if (key == null) return true;
	keychar = String.fromCharCode(key);
	keychar = keychar.toLowerCase();
	validchars = validchars.toLowerCase();
	if (validchars.indexOf(keychar) != -1)	return true;
	if ( key==null || key==0 || key==8 || key==9 || key==13 || key==27 ) return true;
	return false;
}

//function keybutton(e){  if(window.event){ /* IE */ keynum = e.keyCode; } else if(e.which){ /* Netscape/Firefox/Opera */ keynum = e.which; } if(keynum==13){ centerLocator(); } }

function getKeyCode(e){ if (window.event){ return window.event.keyCode; }else if(e){ return e.which; }else{	return null; } }

$(document).ready(function(){
	$('#candidateRegistrationFormButton').click(function(){ candidateRegistration(); });
	$('#employerRegistrationFormButton').click(function(){ employerRegistration(); });
	$('#candidateLoginButton').click(function(){ candidateLogin(); });
	$('#employerLoginButton').click(function(){ employerLogin(); });
	$('#adminLoginButton').click(function(){ adminLogin(); });
	$('#interviewerLoginButton').click(function(){ interviewerLogin(); });
	$('#agentLoginButton').click(function(){ agentLogin(); });
	
	// Admin
	$('#addInterviewerButton').click(function(){ addInterviewer(); });
	$('#updateInterviewerButton').click(function(){ updateInterviewer(); });
	$('#addSkillSetButton').click(function(){ addSkillSet(); });
	$('#updateSkillSetButton').click(function(){ updateSkillSet(); });
	$('#adminCandidateRegisterFormButton').click(function(){ adminCandidateRegistration(); });
	$('#updateAdminCandidateFormButton').click(function(){ updateAdminCandidate(); });
	$('#adminSaveCandidateCreditsFormButton').click(function(){ updateAdminCandidateCredits(); });
	$('#adminCandSchedVerifButton').click(function(){ adminCandidateScheduleVerification(); });
	$('#adminCompleteCandidateFormButton').click(function(){ adminCompleteCandidate(); });
	$('#updateAdminCompleteCandidateFormButton').click(function(){ updateAdminCompleteCandidate(); });
	$('#addLocationButton').click(function(){ addLocation(); });
	$('#updateLocationButton').click(function(){ updateLocation(); });
	$('#addAgentButton').click(function(){ addAgent(); });
	$('#updateAgentButton').click(function(){ updateAgent(); });
	$('#adminEmployerFormButton').click(function(){ addAdminEmployer(); });
	$('#updateAdminEmployerFormButton').click(function(){ updateAdminEmployer(); });
	$('#adminSaveEmployerCreditsFormButton').click(function(){ updateAdminEmployerCredits(); });
	$('#addCouponButton').click(function(){ addCoupon(); });
	$('#updateCouponButton').click(function(){ updateCoupon(); });
	$('#addCreditTypeButton').click(function(){ addCreditType(); });
	$('#editCreditTypeButton').click(function(){ updateCreditType(); });
	$('#updateAdminButton').click(function(){ updateAdmin(); });
	$('#forgotAdminPasswordButton').click(function(){ validateAdminCaptcha(); });
	$('#changeAdminPasswordButton').click(function(){ changeAdminPassword(); });
	
	// Agent
	$('#agentCandidateRegisterFormButton').click(function(){ agentCandidateRegistration(); });
	$('#updateAgentCandidateFormButton').click(function(){ updateAgentCandidate(); });
	$('#agentSaveCandidateCreditsFormButton').click(function(){ updateAgentCandidateCredits(); });
	$('#agentCandSchedVerifButton').click(function(){ agentCandidateScheduleVerification(); });
	$('#addAgentScheduleTimingsButton').click(function(){ addAgentScheduleTimings(); });
	$('#updateAgentScheduleTimingsButton').click(function(){ updateAgentScheduleTimings(); });
	$('#updateAgentIntAppliedCandidateButton').click(function(){ updateAgentInterviewAppliedCan(); });
	$('#updateInterviewerScheduledCandidatesButton').click(function(){ updateInterviewerScheduledCandidates(); });
	$('#agentUpdatePasswordButton').click(function(){ updateAgentPassword(); });
	$('#agentUpdateProfileButton').click(function(){ updateAgentProfile(); });
	$('#forgotAgentPasswordButton').click(function(){ validateAgentCaptcha(); });
	$('#changeAgentPasswordButton').click(function(){ changeAgentPassword(); });
	
	// Interviewer
	$('#updateInterviewerCandidateScheduleButton').click(function(){ updateInterviewerCandidateSchedule(); });
	$('#updateInterviewerCandidatefeedbackButton').click(function(){ updateInterviewerCandidatesfeedback(); });
	$('#updateCandidatefeedbackButton').click(function(){ updateCandidatefeedback(); });
	$('#interviewerUpdatePasswordButton').click(function(){ updateInterviewerPassword(); });
	$('#interviewerUpdateProfileButton').click(function(){ updateInterviewerProfile(); });
	$('#forgotInterviewerPasswordButton').click(function(){ validateInterviewerCaptcha(); });
	$('#changeInterviewerPasswordButton').click(function(){ changeInterviewerPassword(); });
	
	// Candidate
	$('#candidateRegisterFormButton').click(function(){ saveCandidateRegister(); });
	$('#locationZipcodeSearch').click(function(){ centerLocator(); });
	$('#candSchedVerifButton').click(function(){ candidateScheduleVerification(); });
	$('#candidateScheduleVerificationButton').click(function(){ updateCandidateScheduleVerification(); });
	$('#candidateUpdatePasswordButton').click(function(){ updateCandidatePassword(); });
	$('#candidateUpdateProfileButton').click(function(){ updateCandidateProfile(); });
	$('#candidateUpdatePrimarySkillButton').click(function(){ updateCandidatePrimarySkill(); });
	$('#forgotCandidatePasswordButton').click(function(){ validateCandidateCaptcha(); });
	$('#changeCandidatePasswordButton').click(function(){ changeCandidatePassword(); });
	
	// Employer
	$('#employerAddCandidateButton').click(function(){ employerAddCandidate(); });
	$('#employerEditCandidateButton').click(function(){ employerEditCandidate(); });
	$('#employerChangePasswordButton').click(function(){ updateEmployerPassword(); });
	$('#employerUpdateProfileButton').click(function(){ updateEmployerProfile(); });
	$('#updateCompanyInfoButton').click(function(){ updateEmployerCompanyInfo(); });
	$('#forgotEmployerPasswordButton').click(function(){ validateEmployerCaptcha(); });
	$('#changeEmployerPasswordButton').click(function(){ changeEmployerPassword(); });

	$('#verifyCandidateSearchButton').click(function(){ verifyCandidateSearch(); });
	$('#contactusFormButton').click(function(){ saveCandidateRegister(); });
	
	$('.close').click(function(){ $(".notification-box").hide(); $('#eMsg').html(''); $('#sMsg').html(''); });
	$('#resume').on('change', function() { myfile= $( this ).val(); var ext = myfile.split('.').pop(); if(ext!="docx"){ showError('Please provide Word Document with ".docx" Extension'); $('#resume').val('');} });
	
	$('#adminLoginForm').keydown(function(e){ var key = e.which; if(key == 13){ adminLogin(); return false; } });
	$('#interviewerLoginForm').keydown(function(e){ var key = e.which; if(key == 13){ interviewerLogin(); return false; } });
	$('#agentLoginForm').keydown(function(e){ var key = e.which; if(key == 13){ agentLogin(); return false; } });
	$('#candidateLoginForm').keydown(function(e){ var key = e.which; if(key == 13){ candidateLogin(); return false; } });
	$('#employerLoginForm').keydown(function(e){ var key = e.which; if(key == 13){ employerLogin(); return false; } });
	$('#candidateRegistrationForm').keydown(function(e){ var key = e.which; if(key == 13){ candidateRegistration(); return false; } });
	$('#agentCandidateRegistrationForm').keydown(function(e){ var key = e.which; if(key == 13){ agentCandidateRegistration(); return false; } });
	$('#updateAgentCandidateForm').keydown(function(e){ var key = e.which; if(key == 13){ updateAgentCandidate(); return false; } });
	$('#adminCandidateRegistrationForm').keydown(function(e){ var key = e.which; if(key == 13){ adminCandidateRegistration(); return false; } });
	$('#updateAdminCandidateForm').keydown(function(e){ var key = e.which; if(key == 13){ updateAdminCandidate(); return false; } });
	$('#employerRegistrationForm').keydown(function(e){ var key = e.which; if(key == 13){ employerRegistration(); return false; } });
	$('#adminEmployerFormButton').keydown(function(e){ var key = e.which; if(key == 13){ addAdminEmployer(); return false; } });
	$('#updateAdminEmployerFormButton').keydown(function(e){ var key = e.which; if(key == 13){ updateAdminEmployer(); return false; } });
	$('#verifyCandidateSearchForm').keydown(function(e){ var key = e.which; if(key == 13){ verifyCandidateSearch(); return false; } });
	$('#adminCompleteCandidateFormButton').keydown(function(e){ var key = e.which; if(key == 13){ adminCompleteCandidate(); return false; } });
	$('#updateAdminCompleteCandidateFormButton').keydown(function(e){ var key = e.which; if(key == 13){ updateAdminCompleteCandidate(); return false; } });
	$('#addInterviewerForm').keydown(function(e){ var key = e.which; if(key == 13){ addInterviewer(); return false; } });
	$('#updateInterviewerForm').keydown(function(e){ var key = e.which; if(key == 13){ updateInterviewer(); return false; } });
	$('#addSkillSetForm').keydown(function(e){ var key = e.which; if(key == 13){ addSkillSet(); return false; } });
	$('#updateSkillSetForm').keydown(function(e){ var key = e.which; if(key == 13){ updateSkillSet(); return false; } });
	$('#addLocationForm').keydown(function(e){ var key = e.which; if(key == 13){ addLocation(); return false; } });
	$('#updateLocationForm').keydown(function(e){ var key = e.which; if(key == 13){ updateLocation(); return false; } });
	$('#addAgentForm').keydown(function(e){ var key = e.which; if(key == 13){ addAgent(); return false; } });
	$('#updateAgentForm').keydown(function(e){ var key = e.which; if(key == 13){ updateAgent(); return false; } });
	$('#addCouponForm').keydown(function(e){ var key = e.which; if(key == 13){ addCoupon(); return false; } });
	$('#updateCouponForm').keydown(function(e){ var key = e.which; if(key == 13){ updateCoupon(); return false; } });
	
	$('#addCreditTypeForm').keydown(function(e){ var key = e.which; if(key == 13){ addCreditType(); return false; } });
	$('#editCreditTypeForm').keydown(function(e){ var key = e.which; if(key == 13){ updateCreditType(); return false; } });
	
	$('#updateAdminForm').keydown(function(e){ var key = e.which; if(key == 13){ updateAdmin(); return false; } });
	$('#addAgentScheduleTimingsForm').keydown(function(e){ var key = e.which; if(key == 13){ addAgentScheduleTimings(); return false; } });
	$('#updateAgentScheduleTimingsForm').keydown(function(e){ var key = e.which; if(key == 13){ updateAgentScheduleTimings(); return false; } });
	$('#updateAgentIntAppliedCandidateForm').keydown(function(e){ var key = e.which; if(key == 13){ updateAgentInterviewAppliedCan(); return false; } });
	$('#updateInterviewerScheduledCandidatesForm').keydown(function(e){ var key = e.which; if(key == 13){ updateInterviewerScheduledCandidates(); return false; } });
	$('#updateAgentPasswordForm').keydown(function(e){ var key = e.which; if(key == 13){ updateAgentPassword(); return false; } });
	$('#updateAgentProfileForm').keydown(function(e){ var key = e.which; if(key == 13){ updateAgentProfile(); return false; } });
	$('#updateInterviewerCandidateScheduleForm').keydown(function(e){ var key = e.which; if(key == 13){ updateInterviewerCandidateSchedule(); return false; } });
	$('#updateInterviewerCandidatesfeedbackForm').keydown(function(e){ var key = e.which; if(key == 13){ updateInterviewerCandidatesfeedback(); return false; } });
	$('#updateCandidatefeedbackForm').keydown(function(e){ var key = e.which; if(key == 13){ updateCandidatefeedback(); return false; } });
	$('#interviewerUpdatePasswordForm').keydown(function(e){ var key = e.which; if(key == 13){ updateInterviewerPassword(); return false; } });
	$('#interviewerUpdateProfileForm').keydown(function(e){ var key = e.which; if(key == 13){ updateInterviewerProfile(); return false; } });
	$('#candSchedVerForm').keydown(function(e){ var key = e.which; if(key == 13){ candidateScheduleVerification(); return false; } });
	$('#updateCandidateScheduleVerificationForm').keydown(function(e){ var key = e.which; if(key == 13){ updateCandidateScheduleVerification(); return false; } });
	$('#candidateUpdatePasswordForm').keydown(function(e){ var key = e.which; if(key == 13){ updateCandidatePassword(); return false; } });
	$('#updateCandidateProfileForm').keydown(function(e){ var key = e.which; if(key == 13){ updateCandidateProfile(); return false; } });
	$('#candidateRegisterForm').keydown(function(e){ var key = e.which; if(key == 13){ saveCandidateRegister(); return false; } });
	$('#employerAddCandidateForm').keydown(function(e){ var key = e.which; if(key == 13){ employerAddCandidate(); return false; } });
	$('#employerEditCandidateForm').keydown(function(e){ var key = e.which; if(key == 13){ employerEditCandidate(); return false; } });
	$('#employerChangePasswordForm').keydown(function(e){ var key = e.which; if(key == 13){ updateEmployerPassword(); return false; } });
	$('#employerUpdateProfileForm').keydown(function(e){ var key = e.which; if(key == 13){ updateEmployerProfile(); return false; } });
	$('#updateCompanyInfoForm').keydown(function(e){ var key = e.which; if(key == 13){ updateEmployerCompanyInfo(); return false; } });
	$('#changeEmployerPasswordForm').keydown(function(e){ var key = e.which; if(key == 13){ changeEmployerPassword(); return false; } });
	$('#changeCandidatePasswordForm').keydown(function(e){ var key = e.which; if(key == 13){ changeCandidatePassword(); return false; } });
	$('#changeAdminPasswordForm').keydown(function(e){ var key = e.which; if(key == 13){ changeAdminPassword(); return false; } });
	$('#changeInterviewerPasswordForm').keydown(function(e){ var key = e.which; if(key == 13){ changeInterviewerPassword(); return false; } });
	$('#changeAgentPasswordForm').keydown(function(e){ var key = e.which; if(key == 13){ changeAgentPassword(); return false; } });
	$('#forgotAdminPasswordForm').keydown(function(e){ var key = e.which; if(key == 13){ validateAdminCaptcha(); return false; } });
	$('#forgotAgentPasswordForm').keydown(function(e){ var key = e.which; if(key == 13){ validateAgentCaptcha(); return false; } });
	$('#forgotInterviewerPasswordForm').keydown(function(e){ var key = e.which; if(key == 13){ validateInterviewerCaptcha(); return false; } });
	$('#forgotEmployerPasswordForm').keydown(function(e){ var key = e.which; if(key == 13){ validateEmployerCaptcha(); return false; } });
	$('#forgotCandidatePasswordForm').keydown(function(e){ var key = e.which; if(key == 13){ validateCandidateCaptcha(); return false; } });
	
});


function applyCouponCode(){
	url = 'applyCouponCode?couponCode='+$('#couponCode').val();
	http.open("POST", url, true); http.onreadystatechange = serverResponse; http.send(null);
}

function serverResponse(){
	try{
		if(http.readyState == 4 && http.status == 200){ 	 	
			var results = trim(http.responseText);
			console.log(results);
			console.log(results.indexOf('Invalid Coupon Code'));
			if(results.indexOf('Invalid Coupon Code')==-1){
				var res = results.split('|');
				couponId = parseFloat(res[0]);
				couponCode = res[1];
				discountAmount = parseFloat(res[2]);
				
				$('#coupon_id').val(couponId);
				$('#coupon_code').val(couponCode);
				$('#coupon_code_discount_amount').val(discountAmount.toFixed(2));
				
				$('#coupon_code_discount').html(discountAmount.toFixed(2));
				$('#coupon_code_discount_row').removeClass('discount-row');
				
				var amount_per_credit = parseFloat(trim($('#amount_per_credit').val()));
				var total_amount_to_pay;
				var no_of_credits_selected = parseInt(trim($('#no_of_credits_selected').val()));
				var coupon_code_discount_amount = parseFloat(trim($('#coupon_code_discount_amount').val()));
				total_amount_to_pay = (amount_per_credit*no_of_credits_selected)-coupon_code_discount_amount;
				$('#total_amount_to_pay').val(total_amount_to_pay.toFixed(2));
				$('#credit_amount').html('$ '+total_amount_to_pay.toFixed(2));
				$('#total_amount').html('$ '+total_amount_to_pay.toFixed(2));
				
			}else{
				showError(results);
			}
		}
	}catch(e){ }
}

function submitEmployerPayment(){
	try{
		var first_name = trim($('#first_name').val()); var last_name = trim($('#last_name').val());
		var card = trim($('#card').val()); var expiration_month = trim($('#expiration_month').val());
		var expiration_year = trim($('#expiration_year').val()); var cvv_code = trim($('#cvv_code').val());
		var addressLine = trim($('#addressLine').val()); var city = trim($('#city').val());
		var state = trim($('#state').val()); var country = trim($('#country').val());
		var zipcode = trim($('#zipcode').val()); var email_id = trim($('#email_id').val());
		var phone_no = trim($('#phone_no').val()); var amount_to_pay = trim($('#amount_to_pay').val());
		var no_of_credits_selected = trim($('#no_of_credits_selected').val()); var coupon_id = trim($('#coupon_id').val());
		var coupon_code = trim($('#coupon_code').val()); var coupon_code_discount_amount = trim($('#coupon_code_discount_amount').val());
		var total_amount_to_pay = trim($('#total_amount_to_pay').val()); var message = '';
		if(first_name=='undefined' || first_name==''){ message += '<li>Please provide First Name !!\n</li>'; }
		if(last_name=='undefined' || last_name==''){ message += '<li>Please provide Last Name !!\n</li>'; }
		if(card=='undefined' || card==''){ message += '<li>Please provide Card Number !!\n</li>'; }
		if(expiration_month=='undefined' || expiration_month==''){ message += '<li>Please provide Expiry Month !!\n</li>'; }
		if(expiration_year=='undefined' || expiration_year==''){ message += '<li>Please provide Expiry Year !!\n</li>'; }
		if(cvv_code=='undefined' || cvv_code==''){ message += '<li>Please provide CVV2 code !!\n</li>'; }
		if(addressLine=='undefined' || addressLine==''){ message += '<li>Please provide Address !!\n</li>'; }
		if(city=='undefined' || city==''){ message += '<li>Please provide City !!\n</li>'; }
		if(state=='undefined' || state==''){ message += '<li>Please provide State !!\n</li>'; }
		if(country=='undefined' || country==''){ message += '<li>Please Select Country !!\n</li>'; }
		if(zipcode=='undefined' || zipcode==''){ message += '<li>Please provide Zipcode !!\n</li>'; }
		if(email_id=='undefined' || email_id=='' || !checkemail(email_id)){ message += '<li>Please provide Email Id !!\n</li>'; }
		if(phone_no=='undefined' || phone_no==''){ message += '<li>Please provide Phone Number !!\n</li>'; }
		if(amount_to_pay=='undefined' || amount_to_pay==''){ message += '<li>Please provide Amount !!\n</li>'; }
		if(no_of_credits_selected=='undefined' || no_of_credits_selected=='' || no_of_credits_selected=='0'){ message += '<li>Please Select No of Credits !!\n</li>'; }
		if(coupon_id=='undefined' || coupon_id==''){ message += '<li>Please provide Coupon Id !!\n</li>'; }
		if(coupon_id!=null && coupon_id!='undefined' && coupon_id!='' && coupon_id!='0'){
			if(coupon_code==null || coupon_code=='undefined' || coupon_code==''){ message += '<li>Please provide Coupon Code !!\n</li>'; }
			if(coupon_code_discount_amount==null || coupon_code_discount_amount=='undefined' || coupon_code_discount_amount=='' || coupon_code_discount_amount=='0'){ message += '<li>Please provide Discount Amount !!\n</li>'; }
		}
		if(total_amount_to_pay=='undefined' || total_amount_to_pay=='' || total_amount_to_pay=='0'){ message += '<li>Please provide Total Amount !!\n</li>'; }
		if(message!=''){ showError(message); return false;}
		else{
			$('#FirstName').val(first_name); $('#LastName').val(last_name); $('#CardNo').val(card); $('#ExpMonth').val(expiration_month); 
			$('#ExpYear').val(expiration_year); $('#CVV2').val(cvv_code); $('#Address').val(addressLine+', '+city+', '+state+', '+country); 
			$('#Zip').val(zipcode); $('#EMail').val(email_id); $('#Phone').val(phone_no); $('#amount').val(amount_to_pay); 
			$('#noOfCreditsBought').val(no_of_credits_selected); $('#couponId').val(coupon_id); $('#couponCodeValue').val(coupon_code);
			$('#discountAmount').val(coupon_code_discount_amount); $('#Total').val(total_amount_to_pay); 
			submitEmployerEpay();
		}
	}catch(e){ return false; }
}

function submitEmployerEpay(){
	var msg = '';
	try{
		var ePNAccount = trim($('#ePNAccount').val()); var ID = trim($('#ID').val());
		var FirstName = trim($('#FirstName').val()); var LastName = trim($('#LastName').val());
		var CardNo = trim($('#CardNo').val()); var ExpMonth = trim($('#ExpMonth').val());
		var ExpYear = trim($('#ExpYear').val()); var CVV2 = trim($('#CVV2').val());
		var partyId = trim($('#partyId').val()); var partyTypeId = trim($('#partyTypeId').val());
		var priceOfCredit = trim($('#priceOfCredit').val()); var noOfCreditsBought = trim($('#noOfCreditsBought').val());
		var amount = trim($('#amount').val()); var discountAmount = trim($('#discountAmount').val());
		var couponId = trim($('#couponId').val()); var couponCodeValue = trim($('#couponCodeValue').val());
		var Total = trim($('#Total').val()); var Address = trim($('#Address').val());
		var Zip = trim($('#Zip').val()); var EMail = trim($('#EMail').val());
		var Phone = trim($('#Phone').val());
		if(ePNAccount=='undefined' || ePNAccount==''){ msg+='ePNAccount Missing'; return false; }
		if(ID=='undefined' || ID=='' || ID=='0'){ msg+='ID Missing'; return false; }
		if(FirstName=='undefined' || FirstName==''){ msg+='FirstName Missing'; return false; }
		if(LastName=='undefined' || LastName==''){ msg+='LastName Missing'; return false; }
		if(CardNo=='undefined' || CardNo==''){ msg+='CardNo Missing'; return false; }
		if(ExpMonth=='undefined' || ExpMonth==''){ msg+='Exp Month Missing'; return false; }
		if(ExpYear=='undefined' || ExpYear==''){ msg+='Exp Year Missing'; return false; }
		if(CVV2=='undefined' || CVV2==''){ msg+='CVV2 Missing'; return false; }
		if(Total=='undefined' || Total==''){ msg+='Amount Missing'; return false; }
		if(Address=='undefined' || Address==''){ msg+='Address Missing'; return false; }
		if(Zip=='undefined' || Zip==''){ msg+='Zip Missing'; return false; }
		if(EMail=='undefined' || EMail==''){ msg+='EMail Missing'; return false; }
		if(Phone=='undefined' || Phone==''){ msg+='Phone Number Missing'; return false; }
		if(partyId=='undefined' || partyId=='' || partyId=='0'){ msg+='Employer Id Missing'; return false; }
		if(partyTypeId=='undefined' || partyTypeId=='' || partyTypeId=='0'){ msg+='Employer Type Id Missing'; return false; }
		if(priceOfCredit=='undefined' || priceOfCredit=='' || priceOfCredit=='0'){ msg+='Price Of Credit Id Missing'; return false; }
		if(noOfCreditsBought=='undefined' || noOfCreditsBought=='' || noOfCreditsBought=='0'){ msg+='No Of Credits Bought Missing'; return false; }
		if(amount=='undefined' || amount=='' || amount=='0'){ msg+='Amount Missing'; return false; }
		if(couponId=='undefined' || couponId==''){ msg+='Coupon Id Missing'; return false; }
		if(couponId!=null && couponId!='undefined' && couponId!='' && couponId!='0'){
			if(couponCodeValue==null || couponCodeValue=='undefined' || couponCodeValue==''){ msg+='Coupon Code Missing'; return false; }
			if(discountAmount==null || discountAmount=='undefined' || discountAmount=='' || discountAmount=='0'){ msg+='Discount Amount Missing'; return false; }
		}
		if(msg!=''){ showError(msg); return false;}else{ document.frmOrder.submit(); }
	}catch(e){ return false; }
}

function submitCandidatePayment(){
	try{
		var first_name = trim($('#first_name').val()); var last_name = trim($('#last_name').val());
		var card = trim($('#card').val()); var expiration_month = trim($('#expiration_month').val());
		var expiration_year = trim($('#expiration_year').val()); var cvv_code = trim($('#cvv_code').val());
		var addressLine = trim($('#addressLine').val()); var city = trim($('#city').val());
		var state = trim($('#state').val()); var country = trim($('#country').val());
		var zipcode = trim($('#zipcode').val()); var email_id = trim($('#email_id').val());
		var phone_no = trim($('#phone_no').val()); var amount_to_pay = trim($('#amount_to_pay').val());
		var no_of_credits_selected = trim($('#no_of_credits_selected').val()); var coupon_id = trim($('#coupon_id').val());
		var coupon_code = trim($('#coupon_code').val()); var coupon_code_discount_amount = trim($('#coupon_code_discount_amount').val());
		var total_amount_to_pay = trim($('#total_amount_to_pay').val()); var message = '';
		if(first_name=='undefined' || first_name==''){ message += '<li>Please provide First Name !!\n</li>'; }
		if(last_name=='undefined' || last_name==''){ message += '<li>Please provide Last Name !!\n</li>'; }
		if(card=='undefined' || card==''){ message += '<li>Please provide Card Number !!\n</li>'; }
		if(expiration_month=='undefined' || expiration_month==''){ message += '<li>Please provide Expiry Month !!\n</li>'; }
		if(expiration_year=='undefined' || expiration_year==''){ message += '<li>Please provide Expiry Year !!\n</li>'; }
		if(cvv_code=='undefined' || cvv_code==''){ message += '<li>Please provide CVV2 code !!\n</li>'; }
		if(addressLine=='undefined' || addressLine==''){ message += '<li>Please provide Address !!\n</li>'; }
		if(city=='undefined' || city==''){ message += '<li>Please provide City !!\n</li>'; }
		if(state=='undefined' || state==''){ message += '<li>Please provide State !!\n</li>'; }
		if(country=='undefined' || country==''){ message += '<li>Please Select Country !!\n</li>'; }
		if(zipcode=='undefined' || zipcode==''){ message += '<li>Please provide Zipcode !!\n</li>'; }
		if(email_id=='undefined' || email_id=='' || !checkemail(email_id)){ message += '<li>Please provide Email Id !!\n</li>'; }
		if(phone_no=='undefined' || phone_no==''){ message += '<li>Please provide Phone Number !!\n</li>'; }
		if(amount_to_pay=='undefined' || amount_to_pay==''){ message += '<li>Please provide Amount !!\n</li>'; }
		if(no_of_credits_selected=='undefined' || no_of_credits_selected=='' || no_of_credits_selected=='0'){ message += '<li>Please Select No of Credits !!\n</li>'; }
		if(coupon_id=='undefined' || coupon_id==''){ message += '<li>Please provide Coupon Id !!\n</li>'; }
		if(coupon_id!=null && coupon_id!='undefined' && coupon_id!='' && coupon_id!='0'){
			if(coupon_code==null || coupon_code=='undefined' || coupon_code==''){ message += '<li>Please provide Coupon Code !!\n</li>'; }
			if(coupon_code_discount_amount==null || coupon_code_discount_amount=='undefined' || coupon_code_discount_amount=='' || coupon_code_discount_amount=='0'){ message += '<li>Please provide Discount Amount !!\n</li>'; }
		}
		if(total_amount_to_pay=='undefined' || total_amount_to_pay=='' || total_amount_to_pay=='0'){ message += '<li>Please provide Total Amount !!\n</li>'; }
		if(message!=''){ showError(message); return false;}
		else{
			$('#FirstName').val(first_name); $('#LastName').val(last_name); $('#CardNo').val(card); $('#ExpMonth').val(expiration_month); 
			$('#ExpYear').val(expiration_year); $('#CVV2').val(cvv_code); $('#Address').val(addressLine+', '+city+', '+state+', '+country); 
			$('#Zip').val(zipcode); $('#EMail').val(email_id); $('#Phone').val(phone_no); $('#amount').val(amount_to_pay); 
			$('#noOfCreditsBought').val(no_of_credits_selected); $('#couponId').val(coupon_id); $('#couponCodeValue').val(coupon_code);
			$('#discountAmount').val(coupon_code_discount_amount); $('#Total').val(total_amount_to_pay); 
			submitCandidateEpay();
		}
	}catch(e){ return false; }
}

function submitCandidateEpay(){
	var msg = '';
	try{
		var ePNAccount = trim($('#ePNAccount').val()); var ID = trim($('#ID').val());
		var FirstName = trim($('#FirstName').val()); var LastName = trim($('#LastName').val());
		var CardNo = trim($('#CardNo').val()); var ExpMonth = trim($('#ExpMonth').val());
		var ExpYear = trim($('#ExpYear').val()); var CVV2 = trim($('#CVV2').val());
		var partyId = trim($('#partyId').val()); var partyTypeId = trim($('#partyTypeId').val());
		var priceOfCredit = trim($('#priceOfCredit').val()); var noOfCreditsBought = trim($('#noOfCreditsBought').val());
		var amount = trim($('#amount').val()); var discountAmount = trim($('#discountAmount').val());
		var couponId = trim($('#couponId').val()); var couponCodeValue = trim($('#couponCodeValue').val());
		var Total = trim($('#Total').val()); var Address = trim($('#Address').val());
		var Zip = trim($('#Zip').val()); var EMail = trim($('#EMail').val());
		var Phone = trim($('#Phone').val());
		if(ePNAccount=='undefined' || ePNAccount==''){ msg+='ePNAccount Missing'; return false; }
		if(ID=='undefined' || ID=='' || ID=='0'){ msg+='ID Missing'; return false; }
		if(FirstName=='undefined' || FirstName==''){ msg+='FirstName Missing'; return false; }
		if(LastName=='undefined' || LastName==''){ msg+='LastName Missing'; return false; }
		if(CardNo=='undefined' || CardNo==''){ msg+='CardNo Missing'; return false; }
		if(ExpMonth=='undefined' || ExpMonth==''){ msg+='Exp Month Missing'; return false; }
		if(ExpYear=='undefined' || ExpYear==''){ msg+='Exp Year Missing'; return false; }
		if(CVV2=='undefined' || CVV2==''){ msg+='CVV2 Missing'; return false; }
		if(Total=='undefined' || Total==''){ msg+='Amount Missing'; return false; }
		if(Address=='undefined' || Address==''){ msg+='Address Missing'; return false; }
		if(Zip=='undefined' || Zip==''){ msg+='Zip Missing'; return false; }
		if(EMail=='undefined' || EMail==''){ msg+='EMail Missing'; return false; }
		if(Phone=='undefined' || Phone==''){ msg+='Phone Number Missing'; return false; }
		if(partyId=='undefined' || partyId=='' || partyId=='0'){ msg+='Candidate Id Missing'; return false; }
		if(partyTypeId=='undefined' || partyTypeId=='' || partyTypeId=='0'){ msg+='Candidate Type Id Missing'; return false; }
		if(priceOfCredit=='undefined' || priceOfCredit=='' || priceOfCredit=='0'){ msg+='Price Of Credit Id Missing'; return false; }
		if(noOfCreditsBought=='undefined' || noOfCreditsBought=='' || noOfCreditsBought=='0'){ msg+='No Of Credits Bought Missing'; return false; }
		if(amount=='undefined' || amount=='' || amount=='0'){ msg+='Amount Missing'; return false; }
		if(couponId=='undefined' || couponId==''){ msg+='Coupon Id Missing'; return false; }
		if(couponId!=null && couponId!='undefined' && couponId!='' && couponId!='0'){
			if(couponCodeValue==null || couponCodeValue=='undefined' || couponCodeValue==''){ msg+='Coupon Code Missing'; return false; }
			if(discountAmount==null || discountAmount=='undefined' || discountAmount=='' || discountAmount=='0'){ msg+='Discount Amount Missing'; return false; }
		}
		if(msg!=''){ showError(msg); return false;}else{ document.frmOrder.submit(); }
	}catch(e){ return false; }
}

function calculateAmount(){
	try{
		var no_of_credits = trim($('#no_of_credits').val()); 
		var amount_per_credit = parseFloat(trim($('#amount_per_credit').val()));
		var total_amount_to_pay;
		if(no_of_credits==null || no_of_credits=='undefined' || no_of_credits=='' || no_of_credits=='0'){
			$('#no_of_credits_selected').val(0); $('#coupon_code_discount_amount').val(0);
			var no_of_credits_selected = parseInt(trim($('#no_of_credits_selected').val()));
			var coupon_code_discount_amount = parseFloat(trim($('#coupon_code_discount_amount').val()));
			total_amount_to_pay = (amount_per_credit*no_of_credits_selected)-coupon_code_discount_amount;
			$('#total_amount_to_pay').val(total_amount_to_pay.toFixed(2));
			$('#amount_to_pay').val(total_amount_to_pay.toFixed(2));
			$('#credit_amount').html('$ '+total_amount_to_pay.toFixed(2));
			$('#total_amount').html('$ '+total_amount_to_pay.toFixed(2));
		}else{
			$('#no_of_credits_selected').val(no_of_credits); 
			var no_of_credits_selected = parseInt(trim($('#no_of_credits_selected').val()));
			var coupon_code_discount_amount = parseFloat(trim($('#coupon_code_discount_amount').val()));
			total_amount_to_pay = (amount_per_credit*no_of_credits_selected)-coupon_code_discount_amount;
			$('#total_amount_to_pay').val(total_amount_to_pay.toFixed(2));
			$('#amount_to_pay').val(total_amount_to_pay.toFixed(2));
			$('#credit_amount').html('$ '+total_amount_to_pay.toFixed(2));
			$('#total_amount').html('$ '+total_amount_to_pay.toFixed(2));
		}
	}catch(e){ return false; }
}

function calculateCandidateAmount(){
	try{
		var noOfCredits = trim($('#noOfCredits').val()); var amountPerCredit = parseFloat(trim($('#amountPerCredit').val())); var totalAmountToPay;
		if(noOfCredits==null || noOfCredits=='undefined' || noOfCredits=='' || noOfCredits=='0'){
			$('#noOfCreditsSelected').val(0);
			var noOfCreditsSelected = parseInt(trim($('#noOfCreditsSelected').val()));
			totalAmountToPay = (amountPerCredit*noOfCreditsSelected);
			$('#totalAmountToPay').val(totalAmountToPay.toFixed(2));
			$('#creditAmount').html('$ '+totalAmountToPay.toFixed(2));
			$('#totalAmount').html('$ '+totalAmountToPay.toFixed(2));
		}else{
			$('#noOfCreditsSelected').val(noOfCredits); 
			var noOfCreditsSelected = parseInt(trim($('#noOfCreditsSelected').val()));
			totalAmountToPay = (amountPerCredit*noOfCreditsSelected);
			$('#totalAmountToPay').val(totalAmountToPay.toFixed(2));
			$('#creditAmount').html('$ '+totalAmountToPay.toFixed(2));
			$('#totalAmount').html('$ '+totalAmountToPay.toFixed(2));
		}
	}catch(e){ return false; }
}

function captchaInquiryServerResponse(){
	if(http.readyState == 4 && http.status == 200){
		var results = trim(http.responseText);
		if(results == "1" || results == 1){ document.saveInquiry.submit(); }
		else{ showError('<li>Text Entered Does Not Match with Captcha Image</li>'); Recaptcha.reload(); return false; }			
	}
}

function verifyCandidateSearch(){
	try{ 
	if($('#candidateUniqueId').val()==''){ showError('<p>Please Enter Verification Id</P>'); }
	else{ document.verifyCandidateSearchForm.submit(); }
	}catch(e){ return false; }
}

var country = null;
function centerLocator(){
	try{ 
	if($('#locationZipcode').val()==''){ showError('<p>Please Enter Valid Zip Code / Pin Code</P>'); }
	else{
		country = null;
		var searchLat = null, searchLong = null; var locationZipcode = $.trim($('#locationZipcode').val());
		if(isCanadaPostalCode(locationZipcode)){ country = 'CA'; }
		if(isUSPostalCode(locationZipcode)){ country ='US'; }
		if(isIndiaPostalCode(locationZipcode)){ country ='IN'; }
		if(country!=null){
			var geocoder = new google.maps.Geocoder();
			geocoder.geocode({ address: locationZipcode+', '+country }, function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					$('#locationLoader').show();
					mapcenter = results[0].geometry.location;
					searchLat = results[0].geometry.location.lat();
					searchLong = results[0].geometry.location.lng();
					$.ajax({ url: 'locationList?latitude='+searchLat+'&longitude='+searchLong+'&locationZipcode='+locationZipcode, context: document.body }).done(function(data){ $('#locationId').html(data); $('.loading').hide(); }).fail(function(data){ showError(data); $('.loading').hide(); });
				}else{ showError('<p>Please Enter Valid Zip Code/Pin Code</P>'); }
			});
		}else{ showError('<p>Please Enter Valid Zip Code/Pin Code</P>'); }
	}
	}catch(e){ return false; }
}

function isCanadaPostalCode(PostalCode) {
	//var postalCodePattern = /^[ABCEGHJKLMNPRSTVXY]\d[A-Z] \d[A-Z]\d$/gi;
	var postalCodePattern = /^[AaBbCcEeGgHhJjKkLlMmNnPpRrSsTtVvXxYy]\d[A-Za-z](\s)?\d[A-Za-z]\d$/gi;
	return postalCodePattern.test($.trim(PostalCode));
}

function isUSPostalCode(PostalCode) {
	// 5 digits followed b space OR hyphen and then 4 digits
	var postalCodePattern = /^(\d{5}(( |-)\d{4})?)$/gi;
	return postalCodePattern.test($.trim(PostalCode));
}

function isIndiaPostalCode(PostalCode) {
	// 5 digits followed b space OR hyphen and then 4 digits
	var postalCodePattern = /^\d{6}?$/gi;
	return postalCodePattern.test($.trim(PostalCode));
}

function getLocationScheduleTimings(){
	var locationId = $('#locationId').val();
	if(locationId=='undefined' || locationId==''){ showError('<p>Please Select Location </P>'); }
	else{ $('#locationScheduleTimingLoader').show(); $.ajax({ url: 'locationScheduleTimingList?locationId='+locationId, context: document.body }).done(function(data){ $('#locationScheduleTimingId').html(data); $('.loading').hide(); }).fail(function(data){ showError(data); $('.loading').hide(); }); }
}



// Registration

function candidateRegistration(){
	try{
		var errMsg = ''; 
		var candidateFirstName = trim($('#candidateFirstName').val()); var candidateLastName = trim($('#candidateLastName').val()); 
		var candidateEmailId = trim($('#candidateEmailId').val()); var candidatePhoneNo = trim($('#candidatePhoneNo').val()); 
		var candidatePassword = trim($('#candidatePassword').val()); var verifyPassword = trim($('#verifyPassword').val());
		var fskillSetId = trim($('#fskillSetId').val()); var resume = trim($('#resume').val());
		var candidateAddressLine1 = trim($('#candidateAddressLine1').val());
		var candidateCity = trim($('#candidateCity').val()); var candidateState = trim($('#candidateState').val());
		var candidateCountry = trim($('#candidateCountry').val()); var candidateZipcode = trim($('#candidateZipcode').val());
		var candidatePrefferedLocation = trim($('#candidatePrefferedLocation').val()); var candidateExpectedSalary = trim($('#candidateExpectedSalary').val());
		
		if(candidateFirstName=='undefined' || candidateFirstName==''){ errMsg += '<li>Please provide First Name !!\n</li>'; }
		if(candidateLastName=='undefined' || candidateLastName==''){ errMsg += '<li>Please provide Last Name !!\n</li>'; }
		if(candidateEmailId=='undefined' || candidateEmailId=='' || !checkemail(candidateEmailId)){ errMsg += '<li>Please provide Email Id !!\n</li>'; }
		if(candidatePhoneNo=='undefined' || candidatePhoneNo==''){ errMsg += '<li>Please provide Phone No !!\n</li>'; }
		if(candidatePassword=='undefined' || candidatePassword==''){ errMsg += '<li>Please provide Password !!\n</li>'; }
		if(verifyPassword=='undefined' || verifyPassword==''){ errMsg += '<li>Please provide Verify Password !!\n</li>'; }
		if(candidatePassword!=verifyPassword){ errMsg += '<li>Password and Verify Password Should be Same!!\n</li>'; }
		if(fskillSetId=='undefined' || fskillSetId==''){ errMsg += '<li>Please Select Skill Set !!\n</li>'; }
		if(resume=='undefined' || resume==''){ errMsg += '<li>Please Attach Your Ressume !!\n</li>'; }
		var ext = resume.split('.').pop();
		if(ext!="docx"){ showError(errMsg += '<li>Please provide Word Document with ".docx" Extension !!\n</li>'); }
		if(candidateAddressLine1=='undefined' || candidateAddressLine1==''){ errMsg += '<li>Please Provide Address Line 1 !!\n</li>'; }
		if(candidateCity=='undefined' || candidateCity==''){ errMsg += '<li>Please Provide City !!\n</li>'; }
		if(candidateState=='undefined' || candidateState==''){ errMsg += '<li>Please Provide State !!\n</li>'; }
		if(candidateCountry=='undefined' || candidateCountry==''){ errMsg += '<li>Please Provide Country !!\n</li>'; }
		if(candidateZipcode=='undefined' || candidateZipcode==''){ errMsg += '<li>Please Provide Zipcode !!\n</li>'; }
		if(candidatePrefferedLocation=='undefined' || candidatePrefferedLocation==''){ errMsg += '<li>Please Provide Preffered Location !!\n</li>'; }
		if(candidateExpectedSalary=='undefined' || candidateExpectedSalary==''){ errMsg += '<li>Please Provide Expected Salary !!\n</li>'; }
		
		if(errMsg!=''){ showError(errMsg); }
		else{ document.candidateRegistrationForm.submit(); }
	}catch(e){ return false; }
}

function employerRegistration(){
	try{
		var errMsg = ''; 
		var employerFirstName = trim($('#employerFirstName').val()); var employerLastName = trim($('#employerLastName').val()); 
		var employerEmailId = trim($('#employerEmailId').val()); var employerPhoneNo = trim($('#employerPhoneNo').val()); 
		var employerPassword = trim($('#employerPassword').val()); var verifyPassword = trim($('#verifyPassword').val());
		var employerCompanyName = trim($('#employerCompanyName').val()); var employerTitle = trim($('#employerTitle').val());
		var employerAddressLine1 = trim($('#employerAddressLine1').val());
		var employerCity = trim($('#employerCity').val()); var employerState = trim($('#employerState').val());
		var employerCountry = trim($('#employerCountry').val()); var employerZipcode = trim($('#employerZipcode').val());
		
		if(employerFirstName=='undefined' || employerFirstName==''){ errMsg += '<li>Please provide First Name !!\n</li>'; }
		if(employerLastName=='undefined' || employerLastName==''){ errMsg += '<li>Please provide Last Name !!\n</li>'; }
		if(employerEmailId=='undefined' || employerEmailId=='' || !checkemail(employerEmailId)){ errMsg += '<li>Please provide Email Id !!\n</li>'; }
		if(employerPhoneNo=='undefined' || employerPhoneNo==''){ errMsg += '<li>Please provide Phone No !!\n</li>'; }
		if(employerPassword=='undefined' || employerPassword==''){ errMsg += '<li>Please provide Password !!\n</li>'; }
		if(verifyPassword=='undefined' || verifyPassword==''){ errMsg += '<li>Please provide Verify Password !!\n</li>'; }
		if(employerPassword!=verifyPassword){ errMsg += '<li>Password and Verify Password Should be Same!!\n</li>'; }
		if(employerCompanyName=='undefined' || employerCompanyName==''){ errMsg += '<li>Please Provide Company Name !!\n</li>'; }
		if(employerTitle=='undefined' || employerTitle==''){ errMsg += '<li>Please Provide Title !!\n</li>'; }
		if(employerAddressLine1=='undefined' || employerAddressLine1==''){ errMsg += '<li>Please Provide Address Line 1 !!\n</li>'; }
		if(employerCity=='undefined' || employerCity==''){ errMsg += '<li>Please Provide City !!\n</li>'; }
		if(employerState=='undefined' || employerState==''){ errMsg += '<li>Please Provide State !!\n</li>'; }
		if(employerCountry=='undefined' || employerCountry==''){ errMsg += '<li>Please Provide Country !!\n</li>'; }
		if(employerZipcode=='undefined' || employerZipcode==''){ errMsg += '<li>Please Provide Zipcode !!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }
		else{ document.employerRegistrationForm.submit(); }
	}catch(e){ return false; }
}

//Login

function candidateLogin(){
	try{
		var errMsg = ''; var candidateEmailId = trim($('#candidateEmailId').val()); var candidatePassword = trim($('#candidatePassword').val());
		if(candidateEmailId=='undefined' || candidateEmailId=='' || !checkemail(candidateEmailId)){ errMsg += '<li>Please provide Email Id !!\n</li>'; }
		if(candidatePassword=='undefined' || candidatePassword==''){ errMsg += '<li>Please provide Password !!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }else{ document.candidateLoginForm.submit(); }
	}catch(e){ return false; }
}

function employerLogin(){
	try{
		var errMsg = ''; var employerEmailId = trim($('#employerEmailId').val()); var employerPassword = trim($('#employerPassword').val());
		if(employerEmailId=='undefined' || employerEmailId=='' || !checkemail(employerEmailId)){ errMsg += '<li>Please provide Email Id !!\n</li>'; }
		if(employerPassword=='undefined' || employerPassword==''){ errMsg += '<li>Please provide Password !!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }else{ document.employerLoginForm.submit(); }
	}catch(e){ return false; }
}

function adminLogin(){
	try{
		var errMsg = ''; var userEmailId = trim($('#userEmailId').val()); var userPassword = trim($('#userPassword').val());
		if(userEmailId=='undefined' || userEmailId=='' || !checkemail(userEmailId)){ errMsg += '<li>Please provide Email Id !!\n</li>'; }
		if(userPassword=='undefined' || userPassword==''){ errMsg += '<li>Please provide Password !!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }else{ document.adminLoginForm.submit(); }
	}catch(e){ return false; }
}

function interviewerLogin(){
	try{
		var errMsg = ''; var interviewerEmailId = trim($('#interviewerEmailId').val()); var interviewerPassword = trim($('#interviewerPassword').val());
		if(interviewerEmailId=='undefined' || interviewerEmailId=='' || !checkemail(interviewerEmailId)){ errMsg += '<li>Please provide Email Id !!\n</li>'; }
		if(interviewerPassword=='undefined' || interviewerPassword==''){ errMsg += '<li>Please provide Password !!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }else{ document.interviewerLoginForm.submit(); }
	}catch(e){ return false; }
}

function agentLogin(){
	try{
		var errMsg = ''; var agentEmailId = trim($('#agentEmailId').val()); var agentPassword = trim($('#agentPassword').val());
		if(agentEmailId=='undefined' || agentEmailId=='' || !checkemail(agentEmailId)){ errMsg += '<li>Please provide Email Id !!\n</li>'; }
		if(agentPassword=='undefined' || agentPassword==''){ errMsg += '<li>Please provide Password !!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }else{ document.agentLoginForm.submit(); }
	}catch(e){ return false; }
}


// Admin

function addInterviewer(){
	try{
		var errMsg = ''; 
		var interviewerFirstName = trim($('#interviewerFirstName').val()); var interviewerLastName = trim($('#interviewerLastName').val()); 
		var interviewerEmailId = trim($('#interviewerEmailId').val()); var interviewerPhoneNo = trim($('#interviewerPhoneNo').val()); 
		var interviewerPassword = trim($('#interviewerPassword').val()); var interviewerSkillSet1 = trim($('#interviewerSkillSet1').val()); 
		var interviewerSkillSet2 = trim($('#interviewerSkillSet2').val()); var interviewerSkillSet3 = trim($('#interviewerSkillSet3').val()); 
		var resume = trim($('#resume').val());
				
		if(interviewerFirstName=='undefined' || interviewerFirstName==''){ errMsg += '<li>Please provide First Name !!\n</li>'; }
		if(interviewerLastName=='undefined' || interviewerLastName==''){ errMsg += '<li>Please provide Last Name !!\n</li>'; }
		if(interviewerEmailId=='undefined' || interviewerEmailId=='' || !checkemail(interviewerEmailId)){ errMsg += '<li>Please provide Email Id !!\n</li>'; }
		if(interviewerPhoneNo=='undefined' || interviewerPhoneNo==''){ errMsg += '<li>Please provide Phone No !!\n</li>'; }
		if(interviewerPassword=='undefined' || interviewerPassword==''){ errMsg += '<li>Please provide Password !!\n</li>'; }
		if(interviewerSkillSet1=='undefined' || interviewerSkillSet1==''){ errMsg += '<li>Please Select First Skill Set !!\n</li>'; }
		if((interviewerSkillSet1!='undefined' && interviewerSkillSet1!='') && ( (interviewerSkillSet2!='undefined' && interviewerSkillSet2!='') || (interviewerSkillSet3!='undefined' && interviewerSkillSet3!='') ) ){
			if( (interviewerSkillSet2!='undefined' && interviewerSkillSet2!='') && (interviewerSkillSet3!='undefined' && interviewerSkillSet3!='') ){
				if( (interviewerSkillSet1==interviewerSkillSet2) || (interviewerSkillSet1==interviewerSkillSet3) || (interviewerSkillSet2==interviewerSkillSet3)  ){
					errMsg += '<li>Skill Set\'s Cant be same !!\n</li>'; 
				}
			}else if(interviewerSkillSet2!='undefined' && interviewerSkillSet2!=''){
				if(interviewerSkillSet1==interviewerSkillSet2){
					errMsg += '<li>Skill Set\'s Cant be same !!\n</li>'; 
				}
			}else if(interviewerSkillSet3!='undefined' && interviewerSkillSet3!=''){
				if(interviewerSkillSet1==interviewerSkillSet3){
					errMsg += '<li>Skill Set\'s Cant be same !!\n</li>'; 
				}
			}
		}
		if(resume=='undefined' || resume==''){ errMsg += '<li>Please Attach Your Ressume !!\n</li>'; }
		var ext = resume.split('.').pop();
		if(ext!="docx"){ showError(errMsg += '<li>Please provide Word Document with ".docx" Extension !!\n</li>'); }
		if(errMsg!=''){ showError(errMsg); }
		else{ document.addInterviewerForm.submit(); }
	}catch(e){ return false; }
}

function updateInterviewer(){
	try{
		var errMsg = ''; var interviewerId = trim($('#interviewerId').val()); 
		var interviewerFirstName = trim($('#interviewerFirstName').val()); var interviewerLastName = trim($('#interviewerLastName').val()); 
		var interviewerEmailId = trim($('#interviewerEmailId').val()); var interviewerPhoneNo = trim($('#interviewerPhoneNo').val()); 
		var interviewerSkillSet1 = trim($('#interviewerSkillSet1').val()); var interviewerSkillSet2 = trim($('#interviewerSkillSet2').val()); 
		var interviewerSkillSet3 = trim($('#interviewerSkillSet3').val()); var resume = trim($('#resume').val());
		if(interviewerId=='undefined' || interviewerId==''){ errMsg += '<li>Please provide Interviewer Id !!\n</li>'; }
		if(interviewerFirstName=='undefined' || interviewerFirstName==''){ errMsg += '<li>Please provide First Name !!\n</li>'; }
		if(interviewerLastName=='undefined' || interviewerLastName==''){ errMsg += '<li>Please provide Last Name !!\n</li>'; }
		if(interviewerEmailId=='undefined' || interviewerEmailId=='' || !checkemail(interviewerEmailId)){ errMsg += '<li>Please provide Email Id !!\n</li>'; }
		if(interviewerPhoneNo=='undefined' || interviewerPhoneNo==''){ errMsg += '<li>Please provide Phone No !!\n</li>'; }
		if(interviewerSkillSet1=='undefined' || interviewerSkillSet1==''){ errMsg += '<li>Please Select First Skill Set !!\n</li>'; }
		if((interviewerSkillSet1!='undefined' && interviewerSkillSet1!='') && ( (interviewerSkillSet2!='undefined' && interviewerSkillSet2!='') || (interviewerSkillSet3!='undefined' && interviewerSkillSet3!='') ) ){
			if( (interviewerSkillSet2!='undefined' && interviewerSkillSet2!='') && (interviewerSkillSet3!='undefined' && interviewerSkillSet3!='') ){
				if( (interviewerSkillSet1==interviewerSkillSet2) || (interviewerSkillSet1==interviewerSkillSet3) || (interviewerSkillSet2==interviewerSkillSet3)  ){
					errMsg += '<li>Skill Set\'s Cant be same !!\n</li>'; 
				}
			}else if(interviewerSkillSet2!='undefined' && interviewerSkillSet2!=''){
				if(interviewerSkillSet1==interviewerSkillSet2){
					errMsg += '<li>Skill Set\'s Cant be same !!\n</li>'; 
				}
			}else if(interviewerSkillSet3!='undefined' && interviewerSkillSet3!=''){
				if(interviewerSkillSet1==interviewerSkillSet3){
					errMsg += '<li>Skill Set\'s Cant be same !!\n</li>'; 
				}
			}
		}
		if(resume!='undefined' && resume!=''){
			var ext = resume.split('.').pop();
			if(ext!="docx"){ showError(errMsg += '<li>Please provide Word Document with ".docx" Extension !!\n</li>'); }
		}
		if(errMsg!=''){ showError(errMsg); }
		else{ document.updateInterviewerForm.submit(); }
	}catch(e){ return false; }
}

function deleteInterviewer(){
	var errMsg = ''; var uniqueId = trim($('#uniqueId').val()); 
	if(uniqueId=='undefined' || uniqueId==''){ errMsg += '<li>Please provide Interviewer Id !!\n</li>'; }
	if(errMsg!=''){ showError(errMsg); }
	else{ document.deleteInterviewerForm.submit(); }
}


function adminCandidateRegistration(){
	try{
		var errMsg = ''; 
		var candidateFirstName = trim($('#candidateFirstName').val()); var candidateLastName = trim($('#candidateLastName').val()); 
		var candidateEmailId = trim($('#candidateEmailId').val()); var candidatePhoneNo = trim($('#candidatePhoneNo').val()); 
		var candidatePassword = trim($('#candidatePassword').val());
		var fskillSetId = trim($('#fskillSetId').val()); var resume = trim($('#resume').val());
		var candidateAddressLine1 = trim($('#candidateAddressLine1').val());
		var candidateCity = trim($('#candidateCity').val()); var candidateState = trim($('#candidateState').val());
		var candidateCountry = trim($('#candidateCountry').val()); var candidateZipcode = trim($('#candidateZipcode').val());
		var candidatePrefferedLocation = trim($('#candidatePrefferedLocation').val()); var candidateExpectedSalary = trim($('#candidateExpectedSalary').val());
		
		if(candidateFirstName=='undefined' || candidateFirstName==''){ errMsg += '<li>Please provide First Name !!\n</li>'; }
		if(candidateLastName=='undefined' || candidateLastName==''){ errMsg += '<li>Please provide Last Name !!\n</li>'; }
		if(candidateEmailId=='undefined' || candidateEmailId=='' || !checkemail(candidateEmailId)){ errMsg += '<li>Please provide Email Id !!\n</li>'; }
		if(candidatePhoneNo=='undefined' || candidatePhoneNo==''){ errMsg += '<li>Please provide Phone No !!\n</li>'; }
		if(candidatePassword=='undefined' || candidatePassword==''){ errMsg += '<li>Please provide Password !!\n</li>'; }
		if(fskillSetId=='undefined' || fskillSetId==''){ errMsg += '<li>Please Select Skill Set !!\n</li>'; }
		if(resume=='undefined' || resume==''){ errMsg += '<li>Please Attach Your Ressume !!\n</li>'; }
		var ext = resume.split('.').pop();
		if(ext!="docx"){ showError(errMsg += '<li>Please provide Word Document with ".docx" Extension !!\n</li>'); }
		if(candidateAddressLine1=='undefined' || candidateAddressLine1==''){ errMsg += '<li>Please Provide Address Line 1 !!\n</li>'; }
		if(candidateCity=='undefined' || candidateCity==''){ errMsg += '<li>Please Provide City !!\n</li>'; }
		if(candidateState=='undefined' || candidateState==''){ errMsg += '<li>Please Provide State !!\n</li>'; }
		if(candidateCountry=='undefined' || candidateCountry==''){ errMsg += '<li>Please Provide Country !!\n</li>'; }
		if(candidateZipcode=='undefined' || candidateZipcode==''){ errMsg += '<li>Please Provide Zipcode !!\n</li>'; }
		if(candidatePrefferedLocation=='undefined' || candidatePrefferedLocation==''){ errMsg += '<li>Please Provide Preffered Location !!\n</li>'; }
		if(candidateExpectedSalary=='undefined' || candidateExpectedSalary==''){ errMsg += '<li>Please Provide Expected Salary !!\n</li>'; }
		
		if(errMsg!=''){ showError(errMsg); }
		else{ document.adminCandidateRegisterForm.submit(); }
	}catch(e){ return false; }
}

function updateAdminCandidate(){
	try{
		var errMsg = ''; var candidateId = trim($('#candidateId').val());
		var candidateFirstName = trim($('#candidateFirstName').val()); var candidateLastName = trim($('#candidateLastName').val());
		var candidateEmailId = trim($('#candidateEmailId').val()); var candidatePhoneNo = trim($('#candidatePhoneNo').val()); 
		var candidatePassword = trim($('#candidatePassword').val());
		var fskillSetId = trim($('#fskillSetId').val()); var resume = trim($('#resume').val());
		var candidateAddressLine1 = trim($('#candidateAddressLine1').val());
		var candidateCity = trim($('#candidateCity').val()); var candidateState = trim($('#candidateState').val());
		var candidateCountry = trim($('#candidateCountry').val()); var candidateZipcode = trim($('#candidateZipcode').val());
		var candidatePrefferedLocation = trim($('#candidatePrefferedLocation').val()); var candidateExpectedSalary = trim($('#candidateExpectedSalary').val());
		
		if(candidateId=='undefined' || candidateId=='' || candidateId=='0'){ errMsg += '<li>Please provide Candidate Id !!\n</li>'; }
		if(candidateFirstName=='undefined' || candidateFirstName==''){ errMsg += '<li>Please provide First Name !!\n</li>'; }
		if(candidateLastName=='undefined' || candidateLastName==''){ errMsg += '<li>Please provide Last Name !!\n</li>'; }
		if(candidateEmailId=='undefined' || candidateEmailId=='' || !checkemail(candidateEmailId)){ errMsg += '<li>Please provide Email Id !!\n</li>'; }
		if(candidatePhoneNo=='undefined' || candidatePhoneNo==''){ errMsg += '<li>Please provide Phone No !!\n</li>'; }
		if(candidatePassword=='undefined' || candidatePassword==''){ errMsg += '<li>Please provide Password !!\n</li>'; }
		if(fskillSetId=='undefined' || fskillSetId==''){ errMsg += '<li>Please Select Skill Set !!\n</li>'; }
		if(candidateAddressLine1=='undefined' || candidateAddressLine1==''){ errMsg += '<li>Please Provide Address Line 1 !!\n</li>'; }
		if(candidateCity=='undefined' || candidateCity==''){ errMsg += '<li>Please Provide City !!\n</li>'; }
		if(candidateState=='undefined' || candidateState==''){ errMsg += '<li>Please Provide State !!\n</li>'; }
		if(candidateCountry=='undefined' || candidateCountry==''){ errMsg += '<li>Please Provide Country !!\n</li>'; }
		if(candidateZipcode=='undefined' || candidateZipcode==''){ errMsg += '<li>Please Provide Zipcode !!\n</li>'; }
		if(candidatePrefferedLocation=='undefined' || candidatePrefferedLocation==''){ errMsg += '<li>Please Provide Preffered Location !!\n</li>'; }
		if(candidateExpectedSalary=='undefined' || candidateExpectedSalary==''){ errMsg += '<li>Please Provide Expected Salary !!\n</li>'; }
		if(resume!='undefined' && resume!=''){
			var ext = resume.split('.').pop();
			if(ext!="docx"){ showError(errMsg += '<li>Please provide Word Document with ".docx" Extension !!\n</li>'); }
		}
		if(errMsg!=''){ showError(errMsg); }
		else{ document.updateAdminCandidateForm.submit(); }
	}catch(e){ return false; }
}

function updateAdminCandidateCredits(){
	try{
		var errMsg = ''; var candidateId = trim($('#candidateId').val()); var noOfCreditsSelected = trim($('#noOfCreditsSelected').val());
		if(candidateId=='undefined' || candidateId=='' || candidateId=='0'){ errMsg += '<li>Please provide Candidate Id !!\n</li>'; }
		if(noOfCreditsSelected=='undefined' || noOfCreditsSelected=='' || noOfCreditsSelected=='0'){ errMsg += '<li>Please provide No Of Credits !!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }
		else{ document.adminSaveCandidateCreditsForm.submit(); }
	}catch(e){ return false; }
}

function adminCandidateScheduleVerification(){
	try{
		var errMsg = ''; 
		var locationId = trim($('#locationId').val()); var locationScheduleTimingId = trim($('#locationScheduleTimingId').val());
		var candidateEmployerSkillSetMapId = trim($('#candidateEmployerSkillSetMapId').val());
		if(locationId=='undefined' || locationId==''){ errMsg += '<li>Please Select Location !!\n</li>'; }
		if(locationScheduleTimingId=='undefined' || locationScheduleTimingId==''){ errMsg += '<li>Please Select Schedule Timing !!\n</li>'; }
		if(candidateEmployerSkillSetMapId!=null && candidateEmployerSkillSetMapId!='undefined' && candidateEmployerSkillSetMapId!='' && candidateEmployerSkillSetMapId=='0'){ errMsg += '<li>Please Select Employer !!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }
		else{ document.adminCandSchedVerForm.submit(); }
	}catch(e){ return false; }
}


function adminCompleteCandidate(){
	try{
		var errMsg = ''; 
		var candidateFirstName = trim($('#candidateFirstName').val()); var candidateLastName = trim($('#candidateLastName').val());
		var candidateEmailId = trim($('#candidateEmailId').val()); var candidatePhoneNo = trim($('#candidatePhoneNo').val());
		var candidatePassword = trim($('#candidatePassword').val()); var fskillSetId = trim($('#fskillSetId').val());
		var resume = trim($('#resume').val()); var candidateAddressLine1 = trim($('#candidateAddressLine1').val());
		var candidateCity = trim($('#candidateCity').val()); var candidateState = trim($('#candidateState').val());
		var candidateCountry = trim($('#candidateCountry').val()); var candidateZipcode = trim($('#candidateZipcode').val());
		var candidatePrefferedLocation = trim($('#candidatePrefferedLocation').val()); var candidateExpectedSalary = trim($('#candidateExpectedSalary').val());
		var flocationId = trim($('#flocationId').val());
		var scheduleFromTime = $("[name='scheduleFromTime']").datetimepicker('getDate').val(); var scheduleToTime = $("[name='scheduleToTime']").datetimepicker('getDate').val();
		var pickupTime = $("[name='pickupTime']").datetimepicker('getDate').val(); var feedbackTime = $("[name='feedbackTime']").datetimepicker('getDate').val();
		var finterviewerId = trim($('#finterviewerId').val()); var candidatePerformance = trim($('#candidatePerformance').val());
		var candidateFeedback = trim($('#candidateFeedback').val());
		
		if(candidateFirstName=='undefined' || candidateFirstName==''){ errMsg += '<li>Please provide First Name !!\n</li>'; }
		if(candidateLastName=='undefined' || candidateLastName==''){ errMsg += '<li>Please provide Last Name !!\n</li>'; }
		if(candidateEmailId=='undefined' || candidateEmailId=='' || !checkemail(candidateEmailId)){ errMsg += '<li>Please provide Email Id !!\n</li>'; }
		if(candidatePhoneNo=='undefined' || candidatePhoneNo==''){ errMsg += '<li>Please provide Phone No !!\n</li>'; }
		if(candidatePassword=='undefined' || candidatePassword==''){ errMsg += '<li>Please provide Password !!\n</li>'; }
		if(fskillSetId=='undefined' || fskillSetId==''){ errMsg += '<li>Please Select Skill Set !!\n</li>'; }
		if(resume=='undefined' || resume==''){ errMsg += '<li>Please Attach Your Ressume !!\n</li>'; }
		var ext = resume.split('.').pop();
		if(ext!="docx"){ showError(errMsg += '<li>Please provide Word Document with ".docx" Extension !!\n</li>'); }
		if(candidateAddressLine1=='undefined' || candidateAddressLine1==''){ errMsg += '<li>Please Provide Address Line 1 !!\n</li>'; }
		if(candidateCity=='undefined' || candidateCity==''){ errMsg += '<li>Please Provide City !!\n</li>'; }
		if(candidateState=='undefined' || candidateState==''){ errMsg += '<li>Please Provide State !!\n</li>'; }
		if(candidateCountry=='undefined' || candidateCountry==''){ errMsg += '<li>Please Provide Country !!\n</li>'; }
		if(candidateZipcode=='undefined' || candidateZipcode==''){ errMsg += '<li>Please Provide Zipcode !!\n</li>'; }
		if(candidatePrefferedLocation=='undefined' || candidatePrefferedLocation==''){ errMsg += '<li>Please Provide Preffered Location !!\n</li>'; }
		if(candidateExpectedSalary=='undefined' || candidateExpectedSalary==''){ errMsg += '<li>Please Provide Expected Salary !!\n</li>'; }
		if(flocationId=='undefined' || flocationId==''){ errMsg += '<li>Please Select Location !!\n</li>'; }
		if(finterviewerId=='undefined' || finterviewerId==''){ errMsg += '<li>Please Select Interviewer !!\n</li>'; }
		if(candidatePerformance=='undefined' || candidatePerformance==''){ errMsg += '<li>Please Select Candidate Performance !!\n</li>'; }
		if(candidateFeedback=='undefined' || candidateFeedback==''){ errMsg += '<li>Please provide Candidate Feedback !!\n</li>'; }
		if(scheduleFromTime==null || scheduleFromTime==''){ errMsg += '<p>Schedule From Date Should Not be Empty!!</p>'; showError(errMsg); return false; }
		if(scheduleToTime==null || scheduleToTime==''){ errMsg += '<p>Schedule To Date Should Not be Empty!!</p>'; showError(errMsg); return false; }
		if(pickupTime==null || pickupTime==''){ errMsg += '<p>Pickup Time Should Not be Empty!!</p>'; showError(errMsg); return false; }
		if(feedbackTime==null || feedbackTime==''){ errMsg += '<p>Feedback Time Should Not be Empty!!</p>'; showError(errMsg); return false; }
		var fscheduleFromTime = new Date(scheduleFromTime);  var tscheduleToTime = new Date(scheduleToTime);  var fpickupTime = new Date(pickupTime);  var tfeedbackTime = new Date(feedbackTime);
		if(fscheduleFromTime.getTime() >= tscheduleToTime.getTime()){ errMsg = '<p>\'Schedule From Date\' Should Not be Less Than Or Equal to \'Schedule To Date\' !!</p>'; showError(errMsg); return false;}
		if(tscheduleToTime.getTime() >= fpickupTime.getTime()){ errMsg = '<p>\'Schedule To Date\' Should Not be Less Than Or Equal to \'Pickup Time\' !!</p>'; showError(errMsg); return false;}
		if(fpickupTime.getTime() >= tfeedbackTime.getTime()){ errMsg = '<p>\'Pickup Time\' Should Not be Less Than Or Equal to \'Feedback Time\' !!</p>'; showError(errMsg); return false;}
		
		if(errMsg!=''){ showError(errMsg); }
		else{ document.adminCompleteCandidateForm.submit(); }
	}catch(e){ return false; }
}

function updateAdminCompleteCandidate(){
	try{
		var errMsg = ''; var candidateId = trim($('#candidateId').val()); var candidateScheduleTimingId = trim($('#candidateScheduleTimingId').val()); 
		var candidateEmployerSkillSetMapId = trim($('#candidateEmployerSkillSetMapId').val()); var feedbackId = trim($('#feedbackId').val());
		var candidateFirstName = trim($('#candidateFirstName').val()); var candidateLastName = trim($('#candidateLastName').val());
		var candidateEmailId = trim($('#candidateEmailId').val()); var candidatePhoneNo = trim($('#candidatePhoneNo').val());
		var candidatePassword = trim($('#candidatePassword').val()); var fskillSetId = trim($('#fskillSetId').val());
		var resume = trim($('#resume').val()); var candidateAddressLine1 = trim($('#candidateAddressLine1').val());
		var candidateCity = trim($('#candidateCity').val()); var candidateState = trim($('#candidateState').val());
		var candidateCountry = trim($('#candidateCountry').val()); var candidateZipcode = trim($('#candidateZipcode').val());
		var candidatePrefferedLocation = trim($('#candidatePrefferedLocation').val()); var candidateExpectedSalary = trim($('#candidateExpectedSalary').val());
		var flocationId = trim($('#flocationId').val());
		var scheduleFromTime = $("[name='scheduleFromTime']").datetimepicker('getDate').val(); var scheduleToTime = $("[name='scheduleToTime']").datetimepicker('getDate').val();
		var pickupTime = $("[name='pickupTime']").datetimepicker('getDate').val(); var feedbackTime = $("[name='feedbackTime']").datetimepicker('getDate').val();
		var finterviewerId = trim($('#finterviewerId').val()); var candidatePerformance = trim($('#candidatePerformance').val());
		var candidateFeedback = trim($('#candidateFeedback').val());
		
		if(candidateId=='undefined' || candidateId=='' || candidateId=='0'){ errMsg += '<li>Please provide Candidate Id !!\n</li>'; }
		if(candidateScheduleTimingId=='undefined' || candidateScheduleTimingId=='' || candidateScheduleTimingId=='0'){ errMsg += '<li>Please provide Candidate Schedule Timing Id !!\n</li>'; }
		if(candidateEmployerSkillSetMapId=='undefined' || candidateEmployerSkillSetMapId==''){ errMsg += '<li>Please provide Candidate Employer SkillSet Map Id !!\n</li>'; }
		if(feedbackId=='undefined' || feedbackId==''){ errMsg += '<li>Please provide Feedback Id !!\n</li>'; }
		if(candidateFirstName=='undefined' || candidateFirstName==''){ errMsg += '<li>Please provide First Name !!\n</li>'; }
		if(candidateLastName=='undefined' || candidateLastName==''){ errMsg += '<li>Please provide Last Name !!\n</li>'; }
		if(candidateEmailId=='undefined' || candidateEmailId=='' || !checkemail(candidateEmailId)){ errMsg += '<li>Please provide Email Id !!\n</li>'; }
		if(candidatePhoneNo=='undefined' || candidatePhoneNo==''){ errMsg += '<li>Please provide Phone No !!\n</li>'; }
		if(candidatePassword=='undefined' || candidatePassword==''){ errMsg += '<li>Please provide Password !!\n</li>'; }
		if(fskillSetId=='undefined' || fskillSetId==''){ errMsg += '<li>Please Select Skill Set !!\n</li>'; }
		if(candidateAddressLine1=='undefined' || candidateAddressLine1==''){ errMsg += '<li>Please Provide Address Line 1 !!\n</li>'; }
		if(candidateCity=='undefined' || candidateCity==''){ errMsg += '<li>Please Provide City !!\n</li>'; }
		if(candidateState=='undefined' || candidateState==''){ errMsg += '<li>Please Provide State !!\n</li>'; }
		if(candidateCountry=='undefined' || candidateCountry==''){ errMsg += '<li>Please Provide Country !!\n</li>'; }
		if(candidateZipcode=='undefined' || candidateZipcode==''){ errMsg += '<li>Please Provide Zipcode !!\n</li>'; }
		if(candidatePrefferedLocation=='undefined' || candidatePrefferedLocation==''){ errMsg += '<li>Please Provide Preffered Location !!\n</li>'; }
		if(candidateExpectedSalary=='undefined' || candidateExpectedSalary==''){ errMsg += '<li>Please Provide Expected Salary !!\n</li>'; }
		if(flocationId=='undefined' || flocationId==''){ errMsg += '<li>Please Select Location !!\n</li>'; }
		if(finterviewerId=='undefined' || finterviewerId==''){ errMsg += '<li>Please Select Interviewer !!\n</li>'; }
		if(candidatePerformance=='undefined' || candidatePerformance==''){ errMsg += '<li>Please Select Candidate Performance !!\n</li>'; }
		if(candidateFeedback=='undefined' || candidateFeedback==''){ errMsg += '<li>Please provide Candidate Feedback !!\n</li>'; }
		if(scheduleFromTime==null || scheduleFromTime==''){ errMsg += '<p>Schedule From Date Should Not be Empty!!</p>'; showError(errMsg); return false; }
		if(scheduleToTime==null || scheduleToTime==''){ errMsg += '<p>Schedule To Date Should Not be Empty!!</p>'; showError(errMsg); return false; }
		if(pickupTime==null || pickupTime==''){ errMsg += '<p>Pickup Time Should Not be Empty!!</p>'; showError(errMsg); return false; }
		if(feedbackTime==null || feedbackTime==''){ errMsg += '<p>Feedback Time Should Not be Empty!!</p>'; showError(errMsg); return false; }
		var fscheduleFromTime = new Date(scheduleFromTime);  var tscheduleToTime = new Date(scheduleToTime);  var fpickupTime = new Date(pickupTime);  var tfeedbackTime = new Date(feedbackTime);
		if(fscheduleFromTime.getTime() >= tscheduleToTime.getTime()){ errMsg = '<p>\'Schedule From Date\' Should Not be Less Than Or Equal to \'Schedule To Date\' !!</p>'; showError(errMsg); return false;}
		if(tscheduleToTime.getTime() >= fpickupTime.getTime()){ errMsg = '<p>\'Schedule To Date\' Should Not be Less Than Or Equal to \'Pickup Time\' !!</p>'; showError(errMsg); return false;}
		if(fpickupTime.getTime() >= tfeedbackTime.getTime()){ errMsg = '<p>\'Pickup Time\' Should Not be Less Than Or Equal to \'Feedback Time\' !!</p>'; showError(errMsg); return false;}
		if(resume!='undefined' && resume!=''){
			var ext = resume.split('.').pop();
			if(ext!="docx"){ showError(errMsg += '<li>Please provide Word Document with ".docx" Extension !!\n</li>'); }
		}
		if(errMsg!=''){ showError(errMsg); }
		else{ document.updateAdminCompleteCandidateForm.submit(); }
	}catch(e){ return false; }
}

function addSkillSet(){
	try{
		var errMsg = ''; 
		var primarySkillSet = trim($('#primarySkillSet').val()); var skillSetCategory = trim($('#skillSetCategory').val()); 				
		if(primarySkillSet=='undefined' || primarySkillSet==''){ errMsg += '<li>Please provide Primary Skill Set !!\n</li>'; }
		if(skillSetCategory=='undefined' || skillSetCategory==''){ errMsg += '<li>Please Select Skill Set Category !!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }
		else{ document.addSkillSetForm.submit(); }
	}catch(e){ return false; }
}

function updateSkillSet(){
	try{
		var errMsg = ''; var skillSetId = trim($('#skillSetId').val()); 
		var primarySkillSet = trim($('#primarySkillSet').val()); var skillSetCategory = trim($('#skillSetCategory').val()); 				
		if(skillSetId=='undefined' || skillSetId==''){ errMsg += '<li>Please provide Skill Set Id !!\n</li>'; }
		if(primarySkillSet=='undefined' || primarySkillSet==''){ errMsg += '<li>Please provide Primary Skill Set !!\n</li>'; }
		if(skillSetCategory=='undefined' || skillSetCategory==''){ errMsg += '<li>Please Select Skill Set Category !!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }
		else{ document.updateSkillSetForm.submit(); }
	}catch(e){ return false; }
}

function deleteSkillSet(){
	var errMsg = ''; var uniqueId = trim($('#uniqueId').val()); 
	if(uniqueId=='undefined' || uniqueId==''){ errMsg += '<li>Please provide Skill Set Id !!\n</li>'; }
	if(errMsg!=''){ showError(errMsg); }
	else{ document.deleteSkillSetForm.submit(); }
}

function addLocation(){
	try{
		var errMsg = ''; 
		var locationName = trim($('#locationName').val()); var locationBusinessName = trim($('#locationBusinessName').val()); 				
		var locationAddressLine1 = trim($('#locationAddressLine1').val());
		var locationCity = trim($('#locationCity').val()); var locationState = trim($('#locationState').val());
		var locationCountry = trim($('#locationCountry').val()); var locationZipcode = trim($('#locationZipcode').val());
		var locationPhoneNo = trim($('#locationPhoneNo').val()); var locationPrimaryAgentId = parseInt(trim($('#locationPrimaryAgentId').val()), 10);
		var locationSecondaryAgentId = parseInt(trim($('#locationSecondaryAgentId').val()), 10);
		var latitude = parseFloat(trim($('#latitude').val())); var longitude = parseFloat(trim($('#longitude').val())); 
		if(locationName=='undefined' || locationName==''){ errMsg += '<li>Please provide Primary Location Name !!\n</li>'; }
		if(locationBusinessName=='undefined' || locationBusinessName==''){ errMsg += '<li>Please Provide Business Name !!\n</li>'; }
		if(locationAddressLine1=='undefined' || locationAddressLine1==''){ errMsg += '<li>Please Provide Address Line 1 !!\n</li>'; }
		if(locationCity=='undefined' || locationCity==''){ errMsg += '<li>Please Provide City !!\n</li>'; }
		if(locationState=='undefined' || locationState==''){ errMsg += '<li>Please Provide State !!\n</li>'; }
		if(locationCountry=='undefined' || locationCountry==''){ errMsg += '<li>Please Provide Country !!\n</li>'; }
		if(locationZipcode=='undefined' || locationZipcode==''){ errMsg += '<li>Please Provide Zipcode !!\n</li>'; }
		if(locationPhoneNo=='undefined' || locationPhoneNo==''){ errMsg += '<li>Please Provide Phone No !!\n</li>'; }
		if(isNaN(latitude) || latitude==0){ errMsg += '<li>Please Provide Latitude !!\n</li>'; }
		if(isNaN(longitude) || longitude==0){ errMsg += '<li>Please Provide Longitude !!\n</li>'; }
		if(isNaN(locationPrimaryAgentId) || locationPrimaryAgentId==0){ errMsg += '<li>Please Provide Primary Agent Id !!\n</li>'; }
		if(!isNaN(locationPrimaryAgentId)  && locationPrimaryAgentId!=0){
			if(!isNaN(locationSecondaryAgentId) && locationSecondaryAgentId!=0){
				if(locationPrimaryAgentId==locationSecondaryAgentId){
					errMsg += '<li>Location Primary Agent and Secondary Agent Can\'t be same !!\n</li>';
				}
			}
		}
		if(errMsg!=''){ showError(errMsg); }
		else{ document.addLocationForm.submit(); }
	}catch(e){ return false; }
}

function updateLocation(){
	try{
		var errMsg = ''; var locationId = trim($('#locationId').val()); 
		var locationName = trim($('#locationName').val()); var locationBusinessName = trim($('#locationBusinessName').val()); 				
		var locationAddressLine1 = trim($('#locationAddressLine1').val());
		var locationCity = trim($('#locationCity').val()); var locationState = trim($('#locationState').val());
		var locationCountry = trim($('#locationCountry').val()); var locationZipcode = trim($('#locationZipcode').val());
		var locationPhoneNo = trim($('#locationPhoneNo').val()); var locationPrimaryAgentId = parseInt(trim($('#locationPrimaryAgentId').val()), 10);
		var locationSecondaryAgentId = parseInt(trim($('#locationSecondaryAgentId').val()), 10);
		var latitude = parseFloat(trim($('#latitude').val())); var longitude = parseFloat(trim($('#longitude').val())); 
		if(locationId=='undefined' || locationId==''){ errMsg += '<li>Please provide Location Id !!\n</li>'; }
		if(locationName=='undefined' || locationName==''){ errMsg += '<li>Please provide Primary Location Name !!\n</li>'; }
		if(locationBusinessName=='undefined' || locationBusinessName==''){ errMsg += '<li>Please Provide Business Name !!\n</li>'; }
		if(locationAddressLine1=='undefined' || locationAddressLine1==''){ errMsg += '<li>Please Provide Address Line 1 !!\n</li>'; }
		if(locationCity=='undefined' || locationCity==''){ errMsg += '<li>Please Provide City !!\n</li>'; }
		if(locationState=='undefined' || locationState==''){ errMsg += '<li>Please Provide State !!\n</li>'; }
		if(locationCountry=='undefined' || locationCountry==''){ errMsg += '<li>Please Provide Country !!\n</li>'; }
		if(locationZipcode=='undefined' || locationZipcode==''){ errMsg += '<li>Please Provide Zipcode !!\n</li>'; }
		if(locationPhoneNo=='undefined' || locationPhoneNo==''){ errMsg += '<li>Please Provide Phone No !!\n</li>'; }
		if(isNaN(latitude)  || latitude==0){ errMsg += '<li>Please Provide Latitude !!\n</li>'; }
		if(isNaN(longitude)  || longitude==0){ errMsg += '<li>Please Provide Longitude !!\n</li>'; }
		if(isNaN(locationPrimaryAgentId) || locationPrimaryAgentId==0){ errMsg += '<li>Please Provide Primary Agent Id !!\n</li>'; }
		if(!isNaN(locationPrimaryAgentId)  && locationPrimaryAgentId!=0){
			if(!isNaN(locationSecondaryAgentId) && locationSecondaryAgentId!=0){
				if(locationPrimaryAgentId==locationSecondaryAgentId){
					errMsg += '<li>Location Primary Agent and Secondary Agent Can\'t be same !!\n</li>';
				}
			}
		}
		if(errMsg!=''){ showError(errMsg); }
		else{ document.updateLocationForm.submit(); }
	}catch(e){ return false; }
}

function deleteLocation(){
	var errMsg = ''; var uniqueId = trim($('#uniqueId').val()); 
	if(uniqueId=='undefined' || uniqueId==''){ errMsg += '<li>Please provide Location Id !!\n</li>'; }
	if(errMsg!=''){ showError(errMsg); }
	else{ document.deleteLocationForm.submit(); }
}

function addAgent(){
	try{
		var errMsg = ''; 
		var agentFirstName = trim($('#agentFirstName').val()); var agentLastName = trim($('#agentLastName').val()); 				
		var agentEmailId = trim($('#agentEmailId').val()); var agentPhoneNo = trim($('#agentPhoneNo').val());
		var agentPassword = trim($('#agentPassword').val()); var agentMarket1 = trim($('#agentMarket1').val());
		var agentMarket2 = trim($('#agentMarket2').val()); var agentMarket3 = trim($('#agentMarket3').val());
		var agentAddressLine1 = trim($('#agentAddressLine1').val());
		var agentCity = trim($('#agentCity').val()); var agentState = trim($('#agentState').val());
		var agentCountry = trim($('#agentCountry').val()); var agentZipcode = trim($('#agentZipcode').val());
		if(agentFirstName=='undefined' || agentFirstName==''){ errMsg += '<li>Please provide First Name !!\n</li>'; }
		if(agentLastName=='undefined' || agentLastName==''){ errMsg += '<li>Please Provide Last Name !!\n</li>'; }
		if(agentEmailId=='undefined' || agentEmailId=='' || !checkemail(agentEmailId)){ errMsg += '<li>Please Provide Email Id !!\n</li>'; }
		if(agentPhoneNo=='undefined' || agentPhoneNo==''){ errMsg += '<li>Please Provide Phone No !!\n</li>'; }
		if(agentPassword=='undefined' || agentPassword==''){ errMsg += '<li>Please Provide Password !!\n</li>'; }
		if(agentMarket1=='undefined' || agentMarket1==''){ errMsg += '<li>Please Provide Agent Market 1 !!\n</li>'; }
		if((agentMarket1!='undefined' && agentMarket1!='') && ( (agentMarket2!='undefined' && agentMarket2!='') || (agentMarket3!='undefined' && agentMarket3!='') ) ){
			if( (agentMarket2!='undefined' && agentMarket2!='') && (agentMarket3!='undefined' && agentMarket3!='') ){
				if( (agentMarket1==agentMarket2) || (agentMarket1==agentMarket3) || (agentMarket2==agentMarket3)  ){
					errMsg += '<li>Agent Market Cant be same !!\n</li>'; 
				}
			}else if(agentMarket2!='undefined' && agentMarket2!=''){
				if(agentMarket1==agentMarket2){
					errMsg += '<li>Agent Market Cant be same !!\n</li>'; 
				}
			}else if(agentMarket3!='undefined' && agentMarket3!=''){
				if(agentMarket1==agentMarket3){
					errMsg += '<li>Agent Market Cant be same !!\n</li>'; 
				}
			}
		}
		if(agentAddressLine1=='undefined' || agentAddressLine1==''){ errMsg += '<li>Please Provide Address Line 1 !!\n</li>'; }
		if(agentCity=='undefined' || agentCity==''){ errMsg += '<li>Please Provide City !!\n</li>'; }
		if(agentState=='undefined' || agentState==''){ errMsg += '<li>Please Provide State !!\n</li>'; }
		if(agentCountry=='undefined' || agentCountry==''){ errMsg += '<li>Please Provide Country !!\n</li>'; }
		if(agentZipcode=='undefined' || agentZipcode==''){ errMsg += '<li>Please Provide Zipcode !!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }
		else{ document.addAgentForm.submit(); }
	}catch(e){ return false; }
}

function updateAgent(){
	try{
		var errMsg = ''; var agentId = trim($('#agentId').val()); 
		var agentFirstName = trim($('#agentFirstName').val()); var agentLastName = trim($('#agentLastName').val()); 				
		var agentEmailId = trim($('#agentEmailId').val()); var agentPhoneNo = trim($('#agentPhoneNo').val());
		var agentMarket1 = trim($('#agentMarket1').val());
		var agentMarket2 = trim($('#agentMarket2').val()); var agentMarket3 = trim($('#agentMarket3').val());
		var agentAddressLine1 = trim($('#agentAddressLine1').val());
		var agentCity = trim($('#agentCity').val()); var agentState = trim($('#agentState').val());
		var agentCountry = trim($('#agentCountry').val()); var agentZipcode = trim($('#agentZipcode').val());
		if(agentId=='undefined' || agentId==''){ errMsg += '<li>Please provide Agent Id !!\n</li>'; }
		if(agentFirstName=='undefined' || agentFirstName==''){ errMsg += '<li>Please provide First Name !!\n</li>'; }
		if(agentLastName=='undefined' || agentLastName==''){ errMsg += '<li>Please Provide Last Name !!\n</li>'; }
		if(agentEmailId=='undefined' || agentEmailId=='' || !checkemail(agentEmailId)){ errMsg += '<li>Please Provide Email Id !!\n</li>'; }
		if(agentPhoneNo=='undefined' || agentPhoneNo==''){ errMsg += '<li>Please Provide Phone No !!\n</li>'; }
		if(agentMarket1=='undefined' || agentMarket1==''){ errMsg += '<li>Please Provide Agent Market 1 !!\n</li>'; }
		if((agentMarket1!='undefined' && agentMarket1!='') && ( (agentMarket2!='undefined' && agentMarket2!='') || (agentMarket3!='undefined' && agentMarket3!='') ) ){
			if( (agentMarket2!='undefined' && agentMarket2!='') && (agentMarket3!='undefined' && agentMarket3!='') ){
				if( (agentMarket1==agentMarket2) || (agentMarket1==agentMarket3) || (agentMarket2==agentMarket3)  ){
					errMsg += '<li>Agent Market Cant be same !!\n</li>'; 
				}
			}else if(agentMarket2!='undefined' && agentMarket2!=''){
				if(agentMarket1==agentMarket2){
					errMsg += '<li>Agent Market Cant be same !!\n</li>'; 
				}
			}else if(agentMarket3!='undefined' && agentMarket3!=''){
				if(agentMarket1==agentMarket3){
					errMsg += '<li>Agent Market Cant be same !!\n</li>'; 
				}
			}
		}
		if(agentAddressLine1=='undefined' || agentAddressLine1==''){ errMsg += '<li>Please Provide Address Line 1 !!\n</li>'; }
		if(agentCity=='undefined' || agentCity==''){ errMsg += '<li>Please Provide City !!\n</li>'; }
		if(agentState=='undefined' || agentState==''){ errMsg += '<li>Please Provide State !!\n</li>'; }
		if(agentCountry=='undefined' || agentCountry==''){ errMsg += '<li>Please Provide Country !!\n</li>'; }
		if(agentZipcode=='undefined' || agentZipcode==''){ errMsg += '<li>Please Provide Zipcode !!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }
		else{ document.updateAgentForm.submit(); }
	}catch(e){ return false; }
}

function deleteAgent(){
	var errMsg = ''; var uniqueId = trim($('#uniqueId').val()); 
	if(uniqueId=='undefined' || uniqueId==''){ errMsg += '<li>Please provide Agent Id !!\n</li>'; }
	if(errMsg!=''){ showError(errMsg); }
	else{ document.deleteAgentForm.submit(); }
}

function deleteAgentCandidate(){
	var errMsg = ''; var uniqueId = trim($('#uniqueId').val()); 
	if(uniqueId=='undefined' || uniqueId==''){ errMsg += '<li>Please provide Candidate Id !!\n</li>'; }
	if(errMsg!=''){ showError(errMsg); }
	else{ document.deleteAgentCandidateForm.submit(); }
}

function deleteAdminCandidate(){
	var errMsg = ''; var uniqueId = trim($('#uniqueId').val()); 
	if(uniqueId=='undefined' || uniqueId==''){ errMsg += '<li>Please provide Candidate Id !!\n</li>'; }
	if(errMsg!=''){ showError(errMsg); }
	else{ document.deleteAdminCandidateForm.submit(); }
}

function deleteAdminCompleteCandidate(){
	var errMsg = ''; var uniqueId = trim($('#uniqueId').val()); 
	if(uniqueId=='undefined' || uniqueId==''){ errMsg += '<li>Please provide Candidate Id !!\n</li>'; }
	if(errMsg!=''){ showError(errMsg); }
	else{ document.deleteAdminCompleteCandidateForm.submit(); }
}

function addAdminEmployer(){
	try{
		var errMsg = ''; 
		var employerFirstName = trim($('#employerFirstName').val()); var employerLastName = trim($('#employerLastName').val()); 
		var employerEmailId = trim($('#employerEmailId').val()); var employerPhoneNo = trim($('#employerPhoneNo').val()); 
		var employerPassword = trim($('#employerPassword').val());
		var employerCompanyName = trim($('#employerCompanyName').val()); var employerTitle = trim($('#employerTitle').val());
		var employerAddressLine1 = trim($('#employerAddressLine1').val());
		var employerCity = trim($('#employerCity').val()); var employerState = trim($('#employerState').val());
		var employerCountry = trim($('#employerCountry').val()); var employerZipcode = trim($('#employerZipcode').val());
		
		if(employerFirstName=='undefined' || employerFirstName==''){ errMsg += '<li>Please provide First Name !!\n</li>'; }
		if(employerLastName=='undefined' || employerLastName==''){ errMsg += '<li>Please provide Last Name !!\n</li>'; }
		if(employerEmailId=='undefined' || employerEmailId=='' || !checkemail(employerEmailId)){ errMsg += '<li>Please provide Email Id !!\n</li>'; }
		if(employerPhoneNo=='undefined' || employerPhoneNo==''){ errMsg += '<li>Please provide Phone No !!\n</li>'; }
		if(employerPassword=='undefined' || employerPassword==''){ errMsg += '<li>Please provide Password !!\n</li>'; }
		if(employerCompanyName=='undefined' || employerCompanyName==''){ errMsg += '<li>Please Provide Company Name !!\n</li>'; }
		if(employerTitle=='undefined' || employerTitle==''){ errMsg += '<li>Please Provide Title !!\n</li>'; }
		if(employerAddressLine1=='undefined' || employerAddressLine1==''){ errMsg += '<li>Please Provide Address Line 1 !!\n</li>'; }
		if(employerCity=='undefined' || employerCity==''){ errMsg += '<li>Please Provide City !!\n</li>'; }
		if(employerState=='undefined' || employerState==''){ errMsg += '<li>Please Provide State !!\n</li>'; }
		if(employerCountry=='undefined' || employerCountry==''){ errMsg += '<li>Please Provide Country !!\n</li>'; }
		if(employerZipcode=='undefined' || employerZipcode==''){ errMsg += '<li>Please Provide Zipcode !!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }
		else{ document.adminEmployerForm.submit(); }
	}catch(e){ return false; }
}

function updateAdminEmployer(){
	try{
		var errMsg = ''; var employerId = trim($('#employerId').val());
		var employerFirstName = trim($('#employerFirstName').val()); var employerLastName = trim($('#employerLastName').val()); 
		var employerEmailId = trim($('#employerEmailId').val()); var employerPhoneNo = trim($('#employerPhoneNo').val()); 
		var employerPassword = trim($('#employerPassword').val());
		var employerCompanyName = trim($('#employerCompanyName').val()); var employerTitle = trim($('#employerTitle').val());
		var employerAddressLine1 = trim($('#employerAddressLine1').val());
		var employerCity = trim($('#employerCity').val()); var employerState = trim($('#employerState').val());
		var employerCountry = trim($('#employerCountry').val()); var employerZipcode = trim($('#employerZipcode').val());

		if(employerId=='undefined' || employerId==''){ errMsg += '<li>Please provide Employer !!\n</li>'; }
		if(employerFirstName=='undefined' || employerFirstName==''){ errMsg += '<li>Please provide First Name !!\n</li>'; }
		if(employerLastName=='undefined' || employerLastName==''){ errMsg += '<li>Please provide Last Name !!\n</li>'; }
		if(employerEmailId=='undefined' || employerEmailId=='' || !checkemail(employerEmailId)){ errMsg += '<li>Please provide Email Id !!\n</li>'; }
		if(employerPhoneNo=='undefined' || employerPhoneNo==''){ errMsg += '<li>Please provide Phone No !!\n</li>'; }
		if(employerPassword=='undefined' || employerPassword==''){ errMsg += '<li>Please provide Password !!\n</li>'; }
		if(employerCompanyName=='undefined' || employerCompanyName==''){ errMsg += '<li>Please Provide Company Name !!\n</li>'; }
		if(employerTitle=='undefined' || employerTitle==''){ errMsg += '<li>Please Provide Title !!\n</li>'; }
		if(employerAddressLine1=='undefined' || employerAddressLine1==''){ errMsg += '<li>Please Provide Address Line 1 !!\n</li>'; }
		if(employerCity=='undefined' || employerCity==''){ errMsg += '<li>Please Provide City !!\n</li>'; }
		if(employerState=='undefined' || employerState==''){ errMsg += '<li>Please Provide State !!\n</li>'; }
		if(employerCountry=='undefined' || employerCountry==''){ errMsg += '<li>Please Provide Country !!\n</li>'; }
		if(employerZipcode=='undefined' || employerZipcode==''){ errMsg += '<li>Please Provide Zipcode !!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }
		else{ document.updateAdminEmployerForm.submit(); }
	}catch(e){ return false; }
}

function deleteAdminEmployer(){
	var errMsg = ''; var uniqueId = trim($('#uniqueId').val()); 
	if(uniqueId=='undefined' || uniqueId==''){ errMsg += '<li>Please provide Candidate Id !!\n</li>'; }
	if(errMsg!=''){ showError(errMsg); }
	else{ document.deleteAdminEmployerForm.submit(); }
}

function updateAdminEmployerCredits(){
	try{
		var errMsg = ''; var employerId = trim($('#employerId').val()); var noOfCreditsSelected = trim($('#noOfCreditsSelected').val());
		if(employerId=='undefined' || employerId=='' || employerId=='0'){ errMsg += '<li>Please provide Employer Id !!\n</li>'; }
		if(noOfCreditsSelected=='undefined' || noOfCreditsSelected=='' || noOfCreditsSelected=='0'){ errMsg += '<li>Please provide No Of Credits !!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }
		else{ document.adminSaveEmployerCreditsForm.submit(); }
	}catch(e){ return false; }
}

function activateEmployer(){
	var errMsg = ''; var uniqueId = trim($('#uniqueId').val()); 
	if(uniqueId=='undefined' || uniqueId==''){ errMsg += '<li>Please provide Employer Id !!\n</li>'; }
	if(errMsg!=''){ showError(errMsg); }
	else{ document.activateEmployerForm.submit(); }
}

function inActivateEmployer(){
	var errMsg = ''; var uniqueId = trim($('#uniqueId').val()); 
	if(uniqueId=='undefined' || uniqueId==''){ errMsg += '<li>Please provide Employer Id !!\n</li>'; }
	if(errMsg!=''){ showError(errMsg); }
	else{ document.inActivateEmployerForm.submit(); }
}

function addCoupon(){
	try{
		var errMsg = ''; 
		var couponCode = trim($('#couponCode').val()); var couponName = trim($('#couponName').val());
		var discountPercentage = trim($('#discountPercentage').val()); var discountAmount = trim($('#discountAmount').val());
		var sexpiryDate = trim($('#sexpiryDate').val());
		if(couponCode=='undefined' || couponCode==''){ errMsg += '<li>Please Provide Coupon Code !!\n</li>'; }
		if(couponName=='undefined' || couponName==''){ errMsg += '<li>Please Provide Coupon Name !!\n</li>'; }
		if(discountPercentage=='undefined' || discountPercentage==''){ errMsg += '<li>Please Provide Discount Percentage !!\n</li>'; }
		if(!valDisPer(discountPercentage)){ errMsg += '<li>Please Provide Valid Discount Percentage !!\n</li>'; }
		if(discountAmount=='undefined' || discountAmount==''){ errMsg += '<li>Please Provide Discount Amount !!\n</li>'; }
		if(!valDisAmt(discountAmount)){ errMsg += '<li>Please Provide Valid Discount Amount !!\n</li>'; }
		if(sexpiryDate=='undefined' || sexpiryDate==''){ errMsg += '<li>Please Provide Expiry Date !!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }
		else{ document.addCouponForm.submit(); }
	}catch(e){ return false; }
}

function updateCoupon(){
	try{
		var errMsg = ''; var couponId = trim($('#couponId').val()); 
		var couponCode = trim($('#couponCode').val()); var couponName = trim($('#couponName').val());
		var discountPercentage = trim($('#discountPercentage').val()); var discountAmount = trim($('#discountAmount').val());
		var expiryDate = trim($('#expiryDate').val());
		if(couponId=='undefined' || couponId==''){ errMsg += '<li>Please Provide Coupon Id !!\n</li>'; }
		if(couponCode=='undefined' || couponCode==''){ errMsg += '<li>Please Provide Coupon Code !!\n</li>'; }
		if(couponName=='undefined' || couponName==''){ errMsg += '<li>Please Provide Coupon Name !!\n</li>'; }
		if(discountPercentage=='undefined' || discountPercentage==''){ errMsg += '<li>Please Provide Discount Percentage !!\n</li>'; }
		if(!valDisPer(discountPercentage)){ errMsg += '<li>Please Provide Valid Discount Percentage !!\n</li>'; }
		if(discountAmount=='undefined' || discountAmount==''){ errMsg += '<li>Please Provide Discount Amount !!\n</li>'; }
		if(!valDisAmt(discountAmount)){ errMsg += '<li>Please Provide Valid Discount Amount !!\n</li>'; }
		if(expiryDate=='undefined' || expiryDate==''){ errMsg += '<li>Please Provide Expiry Date !!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }
		else{ document.updateCouponForm.submit(); }
	}catch(e){ return false; }
}

function deleteCoupon(){
	var errMsg = ''; var uniqueId = trim($('#uniqueId').val()); 
	if(uniqueId=='undefined' || uniqueId==''){ errMsg += '<li>Please provide Coupon Id !!\n</li>'; }
	if(errMsg!=''){ showError(errMsg); }
	else{ document.deleteCouponForm.submit(); }
}

function addCreditType(){
	try{
		var errMsg = ''; var creditType = trim($('#creditType').val()); var description = trim($('#description').val());
		var amount = trim($('#amount').val());
		if(creditType=='undefined' || creditType==''){ errMsg += '<li>Please Select Credit Type !!\n</li>'; }
		if(description=='undefined' || description==''){ errMsg += '<li>Please Provide Credit Type Description !!\n</li>'; }
		if(amount=='undefined' || amount=='' || amount=='0'){ errMsg += '<li>Please Provide Amount Per Credit !!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }
		else{ document.addCreditTypeForm.submit(); }
	}catch(e){ return false;}	
}

function updateCreditType(){
	try{	
		var errMsg = ''; var creditTypesId =  trim($('#creditTypesId').val()); 
		var description = trim($('#description').val());  var amount = trim($('#amount').val());
		if(creditTypesId=='undefined' || creditTypesId==''){ errMsg += '<li>Please Select Credit Id !!\n</li>'; }
		if(description=='undefined' || description==''){ errMsg += '<li>Please Provide Credit Type Description !!\n</li>'; }
		if(amount=='undefined' || amount=='' || amount=='0'){ errMsg += '<li>Please Provide Amount Per Credit !!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }
		else{ document.editCreditTypeForm.submit(); }
	}catch(e){ return false;}
}

function updateAdmin(){
	try{
		var errMsg = ''; var userId = trim($('#userId').val()); 
		var userFirstName = trim($('#userFirstName').val()); var userLastName = trim($('#userLastName').val());
		var userEmailId = trim($('#userEmailId').val()); var userPhoneNo = trim($('#userPhoneNo').val());
		var userAddressLine1 = trim($('#userAddressLine1').val()); var userAddressLine2 = trim($('#userAddressLine2').val());
		var userCity = trim($('#userCity').val()); var userState = trim($('#userState').val());
		var userCountry = trim($('#userCountry').val()); var userZipcode = trim($('#userZipcode').val());
		var userDesignation = trim($('#userDesignation').val());
		if(userId=='undefined' || userId==''){ errMsg += '<li>Please Provide Admin Id !!\n</li>'; }
		if(userFirstName=='undefined' || userFirstName==''){ errMsg += '<li>Please Provide First Name !!\n</li>'; }
		if(userLastName=='undefined' || userLastName==''){ errMsg += '<li>Please Provide Last Name !!\n</li>'; }
		if(userEmailId=='undefined' || userEmailId=='' || !checkemail(userEmailId)){ errMsg += '<li>Please Provide Email Id !!\n</li>'; }
		if(userPhoneNo=='undefined' || userPhoneNo==''){ errMsg += '<li>Please Provide Phone No !!\n</li>'; }
		if(userAddressLine1=='undefined' || userAddressLine1==''){ errMsg += '<li>Please Provide Address Line 1 !!\n</li>'; }
		if(userAddressLine2=='undefined' || userAddressLine2==''){ errMsg += '<li>Please Provide Address Line 2 !!\n</li>'; }
		if(userCity=='undefined' || userCity==''){ errMsg += '<li>Please Provide City !!\n</li>'; }
		if(userState=='undefined' || userState==''){ errMsg += '<li>Please Provide State !!\n</li>'; }
		if(userCountry=='undefined' || userCountry==''){ errMsg += '<li>Please Provide Country !!\n</li>'; }
		if(userZipcode=='undefined' || userZipcode==''){ errMsg += '<li>Please Provide Zipcode !!\n</li>'; }
		if(userDesignation=='undefined' || userDesignation==''){ errMsg += '<li>Please Provide Designation !!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }
		else{ document.updateAdminForm.submit(); }
	}catch(e){ return false; }
}


// Agent

function agentCandidateRegistration(){
	try{
		var errMsg = ''; 
		var candidateFirstName = trim($('#candidateFirstName').val()); var candidateLastName = trim($('#candidateLastName').val()); 
		var candidateEmailId = trim($('#candidateEmailId').val()); var candidatePhoneNo = trim($('#candidatePhoneNo').val()); 
		var candidatePassword = trim($('#candidatePassword').val());
		var fskillSetId = trim($('#fskillSetId').val()); var resume = trim($('#resume').val());
		var candidateAddressLine1 = trim($('#candidateAddressLine1').val());
		var candidateCity = trim($('#candidateCity').val()); var candidateState = trim($('#candidateState').val());
		var candidateCountry = trim($('#candidateCountry').val()); var candidateZipcode = trim($('#candidateZipcode').val());
		var candidatePrefferedLocation = trim($('#candidatePrefferedLocation').val()); var candidateExpectedSalary = trim($('#candidateExpectedSalary').val());
		
		if(candidateFirstName=='undefined' || candidateFirstName==''){ errMsg += '<li>Please provide First Name !!\n</li>'; }
		if(candidateLastName=='undefined' || candidateLastName==''){ errMsg += '<li>Please provide Last Name !!\n</li>'; }
		if(candidateEmailId=='undefined' || candidateEmailId=='' || !checkemail(candidateEmailId)){ errMsg += '<li>Please provide Email Id !!\n</li>'; }
		if(candidatePhoneNo=='undefined' || candidatePhoneNo==''){ errMsg += '<li>Please provide Phone No !!\n</li>'; }
		if(candidatePassword=='undefined' || candidatePassword==''){ errMsg += '<li>Please provide Password !!\n</li>'; }
		if(fskillSetId=='undefined' || fskillSetId==''){ errMsg += '<li>Please Select Skill Set !!\n</li>'; }
		if(resume=='undefined' || resume==''){ errMsg += '<li>Please Attach Your Ressume !!\n</li>'; }
		var ext = resume.split('.').pop();
		if(ext!="docx"){ showError(errMsg += '<li>Please provide Word Document with ".docx" Extension !!\n</li>'); }
		if(candidateAddressLine1=='undefined' || candidateAddressLine1==''){ errMsg += '<li>Please Provide Address Line 1 !!\n</li>'; }
		if(candidateCity=='undefined' || candidateCity==''){ errMsg += '<li>Please Provide City !!\n</li>'; }
		if(candidateState=='undefined' || candidateState==''){ errMsg += '<li>Please Provide State !!\n</li>'; }
		if(candidateCountry=='undefined' || candidateCountry==''){ errMsg += '<li>Please Provide Country !!\n</li>'; }
		if(candidateZipcode=='undefined' || candidateZipcode==''){ errMsg += '<li>Please Provide Zipcode !!\n</li>'; }
		if(candidatePrefferedLocation=='undefined' || candidatePrefferedLocation==''){ errMsg += '<li>Please Provide Preffered Location !!\n</li>'; }
		if(candidateExpectedSalary=='undefined' || candidateExpectedSalary==''){ errMsg += '<li>Please Provide Expected Salary !!\n</li>'; }
		
		if(errMsg!=''){ showError(errMsg); }
		else{ document.agentCandidateRegisterForm.submit(); }
	}catch(e){ return false; }
}

function updateAgentCandidate(){
	try{
		var errMsg = ''; var candidateId = trim($('#candidateId').val());
		var candidateFirstName = trim($('#candidateFirstName').val()); var candidateLastName = trim($('#candidateLastName').val());
		var candidateEmailId = trim($('#candidateEmailId').val()); var candidatePhoneNo = trim($('#candidatePhoneNo').val()); 
		var candidatePassword = trim($('#candidatePassword').val());
		var fskillSetId = trim($('#fskillSetId').val()); var resume = trim($('#resume').val());
		var candidateAddressLine1 = trim($('#candidateAddressLine1').val());
		var candidateCity = trim($('#candidateCity').val()); var candidateState = trim($('#candidateState').val());
		var candidateCountry = trim($('#candidateCountry').val()); var candidateZipcode = trim($('#candidateZipcode').val());
		var candidatePrefferedLocation = trim($('#candidatePrefferedLocation').val()); var candidateExpectedSalary = trim($('#candidateExpectedSalary').val());
		
		if(candidateId=='undefined' || candidateId=='' || candidateId=='0'){ errMsg += '<li>Please provide Candidate Id !!\n</li>'; }
		if(candidateFirstName=='undefined' || candidateFirstName==''){ errMsg += '<li>Please provide First Name !!\n</li>'; }
		if(candidateLastName=='undefined' || candidateLastName==''){ errMsg += '<li>Please provide Last Name !!\n</li>'; }
		if(candidateEmailId=='undefined' || candidateEmailId=='' || !checkemail(candidateEmailId)){ errMsg += '<li>Please provide Email Id !!\n</li>'; }
		if(candidatePhoneNo=='undefined' || candidatePhoneNo==''){ errMsg += '<li>Please provide Phone No !!\n</li>'; }
		if(candidatePassword=='undefined' || candidatePassword==''){ errMsg += '<li>Please provide Password !!\n</li>'; }
		if(fskillSetId=='undefined' || fskillSetId==''){ errMsg += '<li>Please Select Skill Set !!\n</li>'; }
		if(candidateAddressLine1=='undefined' || candidateAddressLine1==''){ errMsg += '<li>Please Provide Address Line 1 !!\n</li>'; }
		if(candidateCity=='undefined' || candidateCity==''){ errMsg += '<li>Please Provide City !!\n</li>'; }
		if(candidateState=='undefined' || candidateState==''){ errMsg += '<li>Please Provide State !!\n</li>'; }
		if(candidateCountry=='undefined' || candidateCountry==''){ errMsg += '<li>Please Provide Country !!\n</li>'; }
		if(candidateZipcode=='undefined' || candidateZipcode==''){ errMsg += '<li>Please Provide Zipcode !!\n</li>'; }
		if(candidatePrefferedLocation=='undefined' || candidatePrefferedLocation==''){ errMsg += '<li>Please Provide Preffered Location !!\n</li>'; }
		if(candidateExpectedSalary=='undefined' || candidateExpectedSalary==''){ errMsg += '<li>Please Provide Expected Salary !!\n</li>'; }
		if(resume!='undefined' && resume!=''){
			var ext = resume.split('.').pop();
			if(ext!="docx"){ showError(errMsg += '<li>Please provide Word Document with ".docx" Extension !!\n</li>'); }
		}
		if(errMsg!=''){ showError(errMsg); }
		else{ document.updateAgentCandidateForm.submit(); }
	}catch(e){ return false; }
}

function updateAgentCandidateCredits(){
	try{
		var errMsg = ''; var candidateId = trim($('#candidateId').val()); var noOfCreditsSelected = trim($('#noOfCreditsSelected').val());
		if(candidateId=='undefined' || candidateId=='' || candidateId=='0'){ errMsg += '<li>Please provide Candidate Id !!\n</li>'; }
		if(noOfCreditsSelected=='undefined' || noOfCreditsSelected=='' || noOfCreditsSelected=='0'){ errMsg += '<li>Please provide No Of Credits !!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }
		else{ document.agentSaveCandidateCreditsForm.submit(); }
	}catch(e){ return false; }
}

function agentCandidateScheduleVerification(){
	try{
		var errMsg = ''; 
		var locationId = trim($('#locationId').val()); var locationScheduleTimingId = trim($('#locationScheduleTimingId').val());
		var candidateEmployerSkillSetMapId = trim($('#candidateEmployerSkillSetMapId').val());
		if(locationId=='undefined' || locationId==''){ errMsg += '<li>Please Select Location !!\n</li>'; }
		if(locationScheduleTimingId=='undefined' || locationScheduleTimingId==''){ errMsg += '<li>Please Select Schedule Timing !!\n</li>'; }
		if(candidateEmployerSkillSetMapId!=null && candidateEmployerSkillSetMapId!='undefined' && candidateEmployerSkillSetMapId!='' && candidateEmployerSkillSetMapId=='0'){ errMsg += '<li>Please Select Employer !!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }
		else{ document.agentCandSchedVerForm.submit(); }
	}catch(e){ return false; }
}


function addAgentScheduleTimings(){
	try{
		var errMsg = ''; 
		var locationId = trim($('#locationId').val()); 
		if(locationId=='undefined' || locationId==''){ errMsg += '<li>Please provide Location Id !!\n</li>'; }
		var fromDate = $("[name='scheduleFromTime']").datetimepicker('getDate').val(); var toDate = $("[name='scheduleToTime']").datetimepicker('getDate').val();
		var curDate = new Date();
		if(fromDate==null || fromDate==''){ errMsg += '<p>From Date Should Not be Empty!!</p>'; showError(errMsg); return false; }
		if(toDate==null || toDate==''){ errMsg += '<p>To Date Should Not be Empty!!</p>'; showError(errMsg); return false; }
		var fdate = new Date(fromDate);  var tdate = new Date(toDate);
		if(fromDate==null){ errMsg += '<p>From Date Should Not be Empty!!</p>'; }
		if(toDate==null){ errMsg += '<p>To Date Should Not be Empty!!</p>'; }
		if(curDate.getTime() > fdate.getTime()){ errMsg = '<p>\'From Date\' Should Not be Less Than \'Current Date\' !!</p>'; showError(errMsg); return false;}
		if(fdate.getTime() >= tdate.getTime()){ errMsg = '<p>\'From Date\' Should Not be Less Than Or Equal to \'To Date\' !!</p>'; showError(errMsg); return false;}
		if(errMsg!=''){ showError(errMsg); }
		else{ document.addAgentScheduleTimingsForm.submit(); }
	}catch(e){ return false; }
}

function updateAgentScheduleTimings(){
	try{
		var errMsg = ''; var locationScheduleTimingId = trim($('#locationScheduleTimingId').val()); 
		var locationId = trim($('#locationId').val()); 
		var fromDate = $("[name='scheduleFromTime']").datetimepicker('getDate').val(); var toDate = $("[name='scheduleToTime']").datetimepicker('getDate').val();
		var curDate = new Date();
		if(fromDate==null || fromDate==''){ errMsg += '<p>From Date Should Not be Empty!!</p>'; showError(errMsg); return false; }
		if(toDate==null || toDate==''){ errMsg += '<p>To Date Should Not be Empty!!</p>'; showError(errMsg); return false; }
		var fdate = new Date(fromDate);  var tdate = new Date(toDate);
		if(locationScheduleTimingId=='undefined' || locationScheduleTimingId==''){ errMsg += '<li>Please provide Location Schedule Timing Id !!\n</li>'; }
		if(locationId=='undefined' || locationId==''){ errMsg += '<li>Please provide Location Id !!\n</li>'; }
		if(fromDate==null){ errMsg += '<p>From Date Should Not be Empty!!</p>'; }
		if(toDate==null){ errMsg += '<p>To Date Should Not be Empty!!</p>'; }
		if(curDate.getTime() > fdate.getTime()){ errMsg = '<p>\'From Date\' Should Not be Less Than \'Current Date\' !!</p>'; showError(errMsg); return false;}
		if(fdate.getTime() >= tdate.getTime()){ errMsg = '<p>\'From Date\' Should Not be Less Than Or Equal to \'To Date\' !!</p>'; showError(errMsg); return false;}
		if(errMsg!=''){ showError(errMsg); }
		else{ document.updateAgentScheduleTimingsForm.submit(); }
	}catch(e){ return false; }
}

function delAgentSchTimings(){
	try{ var errMsg = ''; var uniqueId = trim($('#uniqueId').val()); 
	if(uniqueId=='undefined' || uniqueId==''){ errMsg += '<li>Please provide Location Schedule Timing Id !!\n</li>'; }
	if(errMsg!=''){ showError(errMsg); }
	else{ document.delAgentSchTimingsForm.submit(); } }catch(e){ return false; }
}

function updateAgentInterviewAppliedCan(){
	try{
		var errMsg = ''; var candidateScheduleTimingId = trim($('#candidateScheduleTimingId').val()); 
		var locationScheduleTimingId = trim($('#locationScheduleTimingId').val());
		if(candidateScheduleTimingId=='undefined' || candidateScheduleTimingId==''){ errMsg += '<li>Please provide Candidate Schedule Timing Id !!\n</li>'; }
		if(locationScheduleTimingId=='undefined' || locationScheduleTimingId==''){ errMsg += '<li>Please provide Location Schedule Timing Id !!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }
		else{ document.updateAgentIntAppliedCandidateForm.submit(); }
	}catch(e){ return false; }
}

function updateInterviewerScheduledCandidates(){
	try{
		var errMsg = ''; var candidateScheduleTimingId = trim($('#candidateScheduleTimingId').val()); 
		var locationScheduleTimingId = trim($('#locationScheduleTimingId').val());
		if(candidateScheduleTimingId=='undefined' || candidateScheduleTimingId==''){ errMsg += '<li>Please provide Candidate Schedule Timing Id !!\n</li>'; }
		if(locationScheduleTimingId=='undefined' || locationScheduleTimingId==''){ errMsg += '<li>Please provide Location Schedule Timing Id !!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }
		else{ document.updateInterviewerScheduledCandidatesForm.submit(); }
	}catch(e){ return false; }
}

function updateAgentPassword(){
	try{
		var errMsg = ''; var currentPassword = trim($('#currentPassword').val()); 
		var agentPassword = trim($('#agentPassword').val()); var retypePassword = trim($('#retypePassword').val());
		if(currentPassword=='undefined' || currentPassword==''){ errMsg += '<li>Please provide Current Password !!\n</li>'; }
		if(agentPassword=='undefined' || agentPassword==''){ errMsg += '<li>Please provide New Password !!\n</li>'; }
		if(retypePassword=='undefined' || retypePassword==''){ errMsg += '<li>Please provide Retype the New Password !!\n</li>'; }
		if(currentPassword==agentPassword){ errMsg += '<li>Current Password Should not be same as New Password !!\n</li>'; }
		if(agentPassword!=retypePassword){ errMsg += '<li>New Password and Retype Password must be same !!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }
		else{ document.updateAgentPasswordForm.submit(); }
	}catch(e){ return false; }
}

function updateAgentProfile(){
	try{
		var errMsg = '';
		var agentFirstName = trim($('#agentFirstName').val()); var agentLastName = trim($('#agentLastName').val()); 				
		var agentPhoneNo = trim($('#agentPhoneNo').val()); var agentMarket1 = trim($('#agentMarket1').val());
		var agentMarket2 = trim($('#agentMarket2').val()); var agentMarket3 = trim($('#agentMarket3').val());
		var agentAddressLine1 = trim($('#agentAddressLine1').val()); var agentAddressLine2 = trim($('#agentAddressLine2').val());
		var agentCity = trim($('#agentCity').val()); var agentState = trim($('#agentState').val());
		var agentCountry = trim($('#agentCountry').val()); var agentZipcode = trim($('#agentZipcode').val());
		if(agentFirstName=='undefined' || agentFirstName==''){ errMsg += '<li>Please provide First Name !!\n</li>'; }
		if(agentLastName=='undefined' || agentLastName==''){ errMsg += '<li>Please Provide Last Name !!\n</li>'; }
		if(agentPhoneNo=='undefined' || agentPhoneNo==''){ errMsg += '<li>Please Provide Phone No !!\n</li>'; }
		if(agentMarket1=='undefined' || agentMarket1==''){ errMsg += '<li>Please Provide Agent Market 1 !!\n</li>'; }
		if((agentMarket1!='undefined' && agentMarket1!='') && ( (agentMarket2!='undefined' && agentMarket2!='') || (agentMarket3!='undefined' && agentMarket3!='') ) ){
			if( (agentMarket2!='undefined' && agentMarket2!='') && (agentMarket3!='undefined' && agentMarket3!='') ){
				if( (agentMarket1==agentMarket2) || (agentMarket1==agentMarket3) || (agentMarket2==agentMarket3)  ){
					errMsg += '<li>Agent Market Cant be same !!\n</li>'; 
				}
			}else if(agentMarket2!='undefined' && agentMarket2!=''){
				if(agentMarket1==agentMarket2){
					errMsg += '<li>Agent Market Cant be same !!\n</li>'; 
				}
			}else if(agentMarket3!='undefined' && agentMarket3!=''){
				if(agentMarket1==agentMarket3){
					errMsg += '<li>Agent Market Cant be same !!\n</li>'; 
				}
			}
		}
		if(agentAddressLine1=='undefined' || agentAddressLine1==''){ errMsg += '<li>Please Provide Address Line 1 !!\n</li>'; }
		if(agentAddressLine2=='undefined' || agentAddressLine2==''){ errMsg += '<li>Please Provide Address Line 2 !!\n</li>'; }
		if(agentCity=='undefined' || agentCity==''){ errMsg += '<li>Please Provide City !!\n</li>'; }
		if(agentState=='undefined' || agentState==''){ errMsg += '<li>Please Provide State !!\n</li>'; }
		if(agentCountry=='undefined' || agentCountry==''){ errMsg += '<li>Please Provide Country !!\n</li>'; }
		if(agentZipcode=='undefined' || agentZipcode==''){ errMsg += '<li>Please Provide Zipcode !!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }
		else{ document.updateAgentProfileForm.submit(); }
	}catch(e){ return false; }
}


// Interviewer

function pickAppliedCandidate(){
	try{ var errMsg = ''; var uniqueId = trim($('#uniqueId').val()); 
	if(uniqueId=='undefined' || uniqueId==''){ errMsg += '<li>Please provide Candidate Schedule Timing Id !!\n</li>'; }
	if(errMsg!=''){ showError(errMsg); }
	else{ document.pickAppliedCandidateForm.submit(); } }catch(e){ return false; }
}

function updateInterviewerCandidateSchedule(){
	try{
		var errMsg = ''; var candidateScheduleTimingId = trim($('#candidateScheduleTimingId').val()); 
		var locationScheduleTimingId = trim($('#locationScheduleTimingId').val());
		if(candidateScheduleTimingId=='undefined' || candidateScheduleTimingId==''){ errMsg += '<li>Please provide Candidate Schedule Timing Id !!\n</li>'; }
		if(locationScheduleTimingId=='undefined' || locationScheduleTimingId==''){ errMsg += '<li>Please provide Location Schedule Timing Id !!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }
		else{ document.updateInterviewerCandidateScheduleForm.submit(); }
	}catch(e){ return false; }
}

function updateInterviewerCandidatesfeedback(){
	try{
		var errMsg = ''; var candidateScheduleTimingId = trim($('#candidateScheduleTimingId').val()); 
		var candidatePerformance = trim($('#candidatePerformance').val()); var candidateFeedback = trim($('#candidateFeedback').val());
		if(candidateScheduleTimingId=='undefined' || candidateScheduleTimingId==''){ errMsg += '<li>Please provide Candidate Schedule Timing Id !!\n</li>'; }
		if(candidatePerformance=='undefined' || candidatePerformance==''){ errMsg += '<li>Please Select Candidate Performance !!\n</li>'; }
		if(candidateFeedback=='undefined' || candidateFeedback==''){ errMsg += '<li>Please provide Candidate Feedback !!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }
		else{ document.updateInterviewerCandidatesfeedbackForm.submit(); }
	}catch(e){ return false; }
}

function updateCandidatefeedback(){
	try{
		var errMsg = ''; var candidateScheduleTimingId = trim($('#candidateScheduleTimingId').val()); 
		var candidatePerformance = trim($('#candidatePerformance').val()); var candidateFeedback = trim($('#candidateFeedback').val());
		if(candidateScheduleTimingId=='undefined' || candidateScheduleTimingId==''){ errMsg += '<li>Please provide Candidate Schedule Timing Id !!\n</li>'; }
		if(candidatePerformance=='undefined' || candidatePerformance==''){ errMsg += '<li>Please Select Candidate Performance !!\n</li>'; }
		if(candidateFeedback=='undefined' || candidateFeedback==''){ errMsg += '<li>Please provide Candidate Feedback !!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }
		else{ document.updateCandidatefeedbackForm.submit(); }
	}catch(e){ return false; }
}

function updateInterviewerPassword(){
	try{
		var errMsg = ''; var currentPassword = trim($('#currentPassword').val()); 
		var interviewerPassword = trim($('#interviewerPassword').val()); var retypePassword = trim($('#retypePassword').val());
		if(currentPassword=='undefined' || currentPassword==''){ errMsg += '<li>Please provide Current Password !!\n</li>'; }
		if(interviewerPassword=='undefined' || interviewerPassword==''){ errMsg += '<li>Please provide New Password !!\n</li>'; }
		if(retypePassword=='undefined' || retypePassword==''){ errMsg += '<li>Please provide Retype the New Password !!\n</li>'; }
		if(currentPassword==interviewerPassword){ errMsg += '<li>Current Password Should not be same as New Password !!\n</li>'; }
		if(interviewerPassword!=retypePassword){ errMsg += '<li>New Password and Retype Password must be same !!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }
		else{ document.interviewerUpdatePasswordForm.submit(); }
	}catch(e){ return false; }
}

function updateInterviewerProfile(){
	try{
		var errMsg = '';
		var interviewerFirstName = trim($('#interviewerFirstName').val()); var interviewerLastName = trim($('#interviewerLastName').val()); 
		var interviewerEmailId = trim($('#interviewerEmailId').val()); var interviewerPhoneNo = trim($('#interviewerPhoneNo').val()); 
		var interviewerSkillSet1 = trim($('#interviewerSkillSet1').val()); var interviewerSkillSet2 = trim($('#interviewerSkillSet2').val()); 
		var interviewerSkillSet3 = trim($('#interviewerSkillSet3').val()); var resume = trim($('#resume').val());
		if(interviewerFirstName=='undefined' || interviewerFirstName==''){ errMsg += '<li>Please provide First Name !!\n</li>'; }
		if(interviewerLastName=='undefined' || interviewerLastName==''){ errMsg += '<li>Please provide Last Name !!\n</li>'; }
		if(interviewerEmailId=='undefined' || interviewerEmailId=='' || !checkemail(interviewerEmailId)){ errMsg += '<li>Please provide Email Id !!\n</li>'; }
		if(interviewerPhoneNo=='undefined' || interviewerPhoneNo==''){ errMsg += '<li>Please provide Phone No !!\n</li>'; }
		if(interviewerSkillSet1=='undefined' || interviewerSkillSet1==''){ errMsg += '<li>Please Select First Skill Set !!\n</li>'; }
		if((interviewerSkillSet1!='undefined' && interviewerSkillSet1!='') && ( (interviewerSkillSet2!='undefined' && interviewerSkillSet2!='') || (interviewerSkillSet3!='undefined' && interviewerSkillSet3!='') ) ){
			if( (interviewerSkillSet2!='undefined' && interviewerSkillSet2!='') && (interviewerSkillSet3!='undefined' && interviewerSkillSet3!='') ){
				if( (interviewerSkillSet1==interviewerSkillSet2) || (interviewerSkillSet1==interviewerSkillSet3) || (interviewerSkillSet2==interviewerSkillSet3)  ){
					errMsg += '<li>Skill Set\'s Cant be same !!\n</li>'; 
				}
			}else if(interviewerSkillSet2!='undefined' && interviewerSkillSet2!=''){
				if(interviewerSkillSet1==interviewerSkillSet2){
					errMsg += '<li>Skill Set\'s Cant be same !!\n</li>'; 
				}
			}else if(interviewerSkillSet3!='undefined' && interviewerSkillSet3!=''){
				if(interviewerSkillSet1==interviewerSkillSet3){
					errMsg += '<li>Skill Set\'s Cant be same !!\n</li>'; 
				}
			}
		}
		if(resume!='undefined' && resume!=''){
			var ext = resume.split('.').pop();
			if(ext!="docx"){ showError(errMsg += '<li>Please provide Word Document with ".docx" Extension !!\n</li>'); }
		}
		if(errMsg!=''){ showError(errMsg); }
		else{ document.interviewerUpdateProfileForm.submit(); }
	}catch(e){ return false; }
}


// Candidate

function candidateScheduleVerification(){
	try{
		var errMsg = ''; 
		var locationId = trim($('#locationId').val()); var locationScheduleTimingId = trim($('#locationScheduleTimingId').val());
		var candidateEmployerSkillSetMapId = trim($('#candidateEmployerSkillSetMapId').val());
		if(locationId=='undefined' || locationId==''){ errMsg += '<li>Please Select Location !!\n</li>'; }
		if(locationScheduleTimingId=='undefined' || locationScheduleTimingId==''){ errMsg += '<li>Please Select Schedule Timing !!\n</li>'; }
		if(candidateEmployerSkillSetMapId!=null && candidateEmployerSkillSetMapId!='undefined' && candidateEmployerSkillSetMapId!='' && candidateEmployerSkillSetMapId=='0'){ errMsg += '<li>Please Select Employer !!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }
		else{ document.candSchedVerForm.submit(); }
	}catch(e){ return false; }
}

function updateCandidateScheduleVerification(){
	try{
		var errMsg = ''; 
		var locationId = trim($('#locationId').val()); var locationScheduleTimingId = trim($('#locationScheduleTimingId').val()); 				
		var candidateScheduleTimingId = trim($('#candidateScheduleTimingId').val()); 
		if(locationId=='undefined' || locationId==''){ errMsg += '<li>Please Select Location !!\n</li>'; }
		if(locationScheduleTimingId=='undefined' || locationScheduleTimingId==''){ errMsg += '<li>Please Select Schedule Timing !!\n</li>'; }
		if(candidateScheduleTimingId=='undefined' || candidateScheduleTimingId==''){ errMsg += '<li>Please Provide Candidate Schedule Timing Id !!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }
		else{ document.updateCandidateScheduleVerificationForm.submit(); }
	}catch(e){ return false; }
}

function updateCandidatePassword(){
	try{
		var errMsg = ''; var currentPassword = trim($('#currentPassword').val()); 
		var candidatePassword = trim($('#candidatePassword').val()); var retypePassword = trim($('#retypePassword').val());
		if(currentPassword=='undefined' || currentPassword==''){ errMsg += '<li>Please provide Current Password !!\n</li>'; }
		if(candidatePassword=='undefined' || candidatePassword==''){ errMsg += '<li>Please provide New Password !!\n</li>'; }
		if(retypePassword=='undefined' || retypePassword==''){ errMsg += '<li>Please provide Retype the New Password !!\n</li>'; }
		if(currentPassword==candidatePassword){ errMsg += '<li>Current Password Should not be same as New Password !!\n</li>'; }
		if(candidatePassword!=retypePassword){ errMsg += '<li>New Password and Retype Password must be same !!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }
		else{ document.candidateUpdatePasswordForm.submit(); }
	}catch(e){ return false; }
}

function updateCandidateProfile(){
	try{
		var errMsg = '';
		var candidateFirstName = trim($('#candidateFirstName').val()); var candidateLastName = trim($('#candidateLastName').val()); 
		var candidatePhoneNo = trim($('#candidatePhoneNo').val()); var resume = trim($('#resume').val());
		var candidateAddressLine1 = trim($('#candidateAddressLine1').val());
		var candidateCity = trim($('#candidateCity').val()); var candidateState = trim($('#candidateState').val());
		var candidateCountry = trim($('#candidateCountry').val()); var candidateZipcode = trim($('#candidateZipcode').val());
		var candidatePrefferedLocation = trim($('#candidatePrefferedLocation').val()); var candidateExpectedSalary = trim($('#candidateExpectedSalary').val());
		
		if(candidateFirstName=='undefined' || candidateFirstName==''){ errMsg += '<li>Please provide First Name !!\n</li>'; }
		if(candidateLastName=='undefined' || candidateLastName==''){ errMsg += '<li>Please provide Last Name !!\n</li>'; }
		if(candidatePhoneNo=='undefined' || candidatePhoneNo==''){ errMsg += '<li>Please provide Phone No !!\n</li>'; }
		if(candidateAddressLine1=='undefined' || candidateAddressLine1==''){ errMsg += '<li>Please Provide Address Line 1 !!\n</li>'; }
		if(candidateCity=='undefined' || candidateCity==''){ errMsg += '<li>Please Provide City !!\n</li>'; }
		if(candidateState=='undefined' || candidateState==''){ errMsg += '<li>Please Provide State !!\n</li>'; }
		if(candidateCountry=='undefined' || candidateCountry==''){ errMsg += '<li>Please Provide Country !!\n</li>'; }
		if(candidateZipcode=='undefined' || candidateZipcode==''){ errMsg += '<li>Please Provide Zipcode !!\n</li>'; }
		if(candidatePrefferedLocation=='undefined' || candidatePrefferedLocation==''){ errMsg += '<li>Please Provide Preffered Location !!\n</li>'; }
		if(candidateExpectedSalary=='undefined' || candidateExpectedSalary==''){ errMsg += '<li>Please Provide Expected Salary !!\n</li>'; }
		if(resume!='undefined' && resume!=''){
			var ext = resume.split('.').pop();
			if(ext!="docx"){ showError(errMsg += '<li>Please provide Word Document with ".docx" Extension !!\n</li>'); }
		}
		if(errMsg!=''){ showError(errMsg); }
		else{ document.updateCandidateProfileForm.submit(); }
	}catch(e){ return false; }
}

function saveCandidateRegister(){
	try{
		var errMsg = ''; var candidateId = trim($('#candidateId').val()); 
		var candidateFirstName = trim($('#candidateFirstName').val()); var candidateLastName = trim($('#candidateLastName').val()); 
		var candidateEmailId = trim($('#candidateEmailId').val()); var candidatePhoneNo = trim($('#candidatePhoneNo').val()); 
		var candidatePassword = trim($('#candidatePassword').val()); var verifyPassword = trim($('#verifyPassword').val());
		var skillSetId = trim($('#skillSetId').val()); var resume = trim($('#resume').val());
		var candidateAddressLine1 = trim($('#candidateAddressLine1').val());
		var candidateCity = trim($('#candidateCity').val()); var candidateState = trim($('#candidateState').val());
		var candidateCountry = trim($('#candidateCountry').val()); var candidateZipcode = trim($('#candidateZipcode').val());
		var candidatePrefferedLocation = trim($('#candidatePrefferedLocation').val()); var candidateExpectedSalary = trim($('#candidateExpectedSalary').val());
		
		if(candidateId=='undefined' || candidateId==''){ errMsg += '<li>Please provide Candidate Id !!\n</li>'; }
		if(candidateFirstName=='undefined' || candidateFirstName==''){ errMsg += '<li>Please provide First Name !!\n</li>'; }
		if(candidateLastName=='undefined' || candidateLastName==''){ errMsg += '<li>Please provide Last Name !!\n</li>'; }
		if(candidateEmailId=='undefined' || candidateEmailId=='' || !checkemail(candidateEmailId)){ errMsg += '<li>Please provide Email Id !!\n</li>'; }
		if(candidatePhoneNo=='undefined' || candidatePhoneNo==''){ errMsg += '<li>Please provide Phone No !!\n</li>'; }
		if(candidatePassword=='undefined' || candidatePassword==''){ errMsg += '<li>Please provide Password !!\n</li>'; }
		if(verifyPassword=='undefined' || verifyPassword==''){ errMsg += '<li>Please provide Verify Password !!\n</li>'; }
		if(candidatePassword!=verifyPassword){ errMsg += '<li>Password and Verify Password Should be Same!!\n</li>'; }
		if(skillSetId=='undefined' || skillSetId==''){ errMsg += '<li>Please Select Skill Set !!\n</li>'; }
		if(resume=='undefined' || resume==''){ errMsg += '<li>Please Attach Your Ressume !!\n</li>'; }
		var ext = resume.split('.').pop();
		if(ext!="docx"){ showError(errMsg += '<li>Please provide Word Document with ".docx" Extension !!\n</li>'); }
		if(candidateAddressLine1=='undefined' || candidateAddressLine1==''){ errMsg += '<li>Please Provide Address Line 1 !!\n</li>'; }
		if(candidateCity=='undefined' || candidateCity==''){ errMsg += '<li>Please Provide City !!\n</li>'; }
		if(candidateState=='undefined' || candidateState==''){ errMsg += '<li>Please Provide State !!\n</li>'; }
		if(candidateCountry=='undefined' || candidateCountry==''){ errMsg += '<li>Please Provide Country !!\n</li>'; }
		if(candidateZipcode=='undefined' || candidateZipcode==''){ errMsg += '<li>Please Provide Zipcode !!\n</li>'; }
		if(candidatePrefferedLocation=='undefined' || candidatePrefferedLocation==''){ errMsg += '<li>Please Provide Preffered Location !!\n</li>'; }
		if(candidateExpectedSalary=='undefined' || candidateExpectedSalary==''){ errMsg += '<li>Please Provide Expected Salary !!\n</li>'; }
		
		if(errMsg!=''){ showError(errMsg); }
		else{ document.candidateRegisterForm.submit(); }
	}catch(e){ return false; }
}


// Employer

function employerAddCandidate(){
	try{
		var errMsg = ''; 
		var candidateFirstName = trim($('#candidateFirstName').val()); var candidateLastName = trim($('#candidateLastName').val()); 
		var candidateEmailId = trim($('#candidateEmailId').val()); var candidatePhoneNo = trim($('#candidatePhoneNo').val()); 
		var fskillSetId = trim($('#fskillSetId').val()); 		
		if(candidateFirstName=='undefined' || candidateFirstName==''){ errMsg += '<li>Please provide First Name !!\n</li>'; }
		if(candidateLastName=='undefined' || candidateLastName==''){ errMsg += '<li>Please provide Last Name !!\n</li>'; }
		if(candidateEmailId=='undefined' || candidateEmailId=='' || !checkemail(candidateEmailId)){ errMsg += '<li>Please provide Email Id !!\n</li>'; }
		if(candidatePhoneNo=='undefined' || candidatePhoneNo==''){ errMsg += '<li>Please provide Phone No !!\n</li>'; }
		if(fskillSetId=='undefined' || fskillSetId==''){ errMsg += '<li>Please Select Skill Set !!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }
		else{ document.employerAddCandidateForm.submit(); }
	}catch(e){ return false; }
}

function employerEditCandidate(){
	try{
		var errMsg = ''; 
		var candidateFirstName = trim($('#candidateFirstName').val()); var candidateLastName = trim($('#candidateLastName').val()); 
		var candidateId = trim($('#candidateId').val()); var candidatePhoneNo = trim($('#candidatePhoneNo').val()); 
		var skillSetId = trim($('#skillSetId').val()); var candidateEmployerSkillSetMapId = trim($('#candidateEmployerSkillSetMapId').val());
		if(candidateEmployerSkillSetMapId=='undefined' || candidateEmployerSkillSetMapId==''){ errMsg += '<li>Please provide Candidate Employer SkillSet Map Id !!\n</li>'; }
		if(candidateFirstName=='undefined' || candidateFirstName==''){ errMsg += '<li>Please provide First Name !!\n</li>'; }
		if(candidateLastName=='undefined' || candidateLastName==''){ errMsg += '<li>Please provide Last Name !!\n</li>'; }
		if(candidateId=='undefined' || candidateId==''){ errMsg += '<li>Please provide Candidate Id !!\n</li>'; }
		if(candidatePhoneNo=='undefined' || candidatePhoneNo==''){ errMsg += '<li>Please provide Phone No !!\n</li>'; }
		if(skillSetId=='undefined' || skillSetId==''){ errMsg += '<li>Please Select Skill Set !!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }
		else{ document.employerEditCandidateForm.submit(); }
	}catch(e){ return false; }
}

function updateEmployerPassword(){
	try{
		var errMsg = ''; var currentPassword = trim($('#currentPassword').val()); 
		var employerPassword = trim($('#employerPassword').val()); var retypePassword = trim($('#retypePassword').val());
		if(currentPassword=='undefined' || currentPassword==''){ errMsg += '<li>Please provide Current Password !!\n</li>'; }
		if(employerPassword=='undefined' || employerPassword==''){ errMsg += '<li>Please provide New Password !!\n</li>'; }
		if(retypePassword=='undefined' || retypePassword==''){ errMsg += '<li>Please provide Retype the New Password !!\n</li>'; }
		if(currentPassword==employerPassword){ errMsg += '<li>Current Password Should not be same as New Password !!\n</li>'; }
		if(employerPassword!=retypePassword){ errMsg += '<li>New Password and Retype Password must be same !!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }
		else{ document.employerChangePasswordForm.submit(); }
	}catch(e){ return false; }
}

function updateEmployerProfile(){
	try{
		var errMsg = '';
		var employerFirstName = trim($('#employerFirstName').val()); var employerLastName = trim($('#employerLastName').val()); 
		var employerEmailId = trim($('#employerEmailId').val()); var employerPhoneNo = trim($('#employerPhoneNo').val());
		if(employerFirstName=='undefined' || employerFirstName==''){ errMsg += '<li>Please provide First Name !!\n</li>'; }
		if(employerLastName=='undefined' || employerLastName==''){ errMsg += '<li>Please provide Last Name !!\n</li>'; }
		if(employerEmailId=='undefined' || employerEmailId=='' || !checkemail(employerEmailId)){ errMsg += '<li>Please Provide Email Id !!\n</li>'; }
		if(employerPhoneNo=='undefined' || employerPhoneNo==''){ errMsg += '<li>Please provide Phone No !!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }
		else{ document.employerUpdateProfileForm.submit(); }
	}catch(e){ return false; }
}

function updateEmployerCompanyInfo(){
	try{
		var errMsg = '';
		var employerCompanyName = trim($('#employerCompanyName').val()); var employerTitle = trim($('#employerTitle').val());
		var employerAddressLine1 = trim($('#employerAddressLine1').val());
		var employerCity = trim($('#employerCity').val()); var employerState = trim($('#employerState').val());
		var employerCountry = trim($('#employerCountry').val()); var employerZipcode = trim($('#employerZipcode').val());
		if(employerCompanyName=='undefined' || employerCompanyName==''){ errMsg += '<li>Please Provide Company Name !!\n</li>'; }
		if(employerTitle=='undefined' || employerTitle==''){ errMsg += '<li>Please Provide Title !!\n</li>'; }
		if(employerAddressLine1=='undefined' || employerAddressLine1==''){ errMsg += '<li>Please Provide Address Line 1 !!\n</li>'; }
		if(employerCity=='undefined' || employerCity==''){ errMsg += '<li>Please Provide City !!\n</li>'; }
		if(employerState=='undefined' || employerState==''){ errMsg += '<li>Please Provide State !!\n</li>'; }
		if(employerCountry=='undefined' || employerCountry==''){ errMsg += '<li>Please Provide Country !!\n</li>'; }
		if(employerZipcode=='undefined' || employerZipcode==''){ errMsg += '<li>Please Provide Zipcode !!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }
		else{ document.updateCompanyInfoForm.submit(); }
	}catch(e){ return false; }
}

function changeEmployerPassword(){
	try{
		var errMsg = '';
		var employerEmailId = trim($('#employerEmailId').val()); var securitycode = trim($('#securitycode').val());
		var employerPassword = trim($('#employerPassword').val()); var retypePassword = trim($('#retypePassword').val());
		if(employerEmailId=='undefined' || employerEmailId=='' || !checkemail(employerEmailId)){ errMsg += '<li>Please provide Email Id !!\n</li>'; }
		if(securitycode=='undefined' || securitycode==''){ errMsg += '<li>Please Provide Security Code !!\n</li>'; }
		if(employerPassword=='undefined' || employerPassword==''){ errMsg += '<li>Please provide Password !!\n</li>'; }
		if(retypePassword=='undefined' || retypePassword==''){ errMsg += '<li>Please provide Confirm New Password !!\n</li>'; }
		if(employerPassword!=retypePassword){ errMsg += '<li>Password and Confirm New Password Should be Same!!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }
		else{ document.changeEmployerPasswordForm.submit(); }
	}catch(e){ return false; }
}

function changeCandidatePassword(){
	try{
		var errMsg = '';
		var candidateEmailId = trim($('#candidateEmailId').val()); var securitycode = trim($('#securitycode').val());
		var candidatePassword = trim($('#candidatePassword').val()); var retypePassword = trim($('#retypePassword').val());
		if(candidateEmailId=='undefined' || candidateEmailId=='' || !checkemail(candidateEmailId)){ errMsg += '<li>Please provide Email Id !!\n</li>'; }
		if(securitycode=='undefined' || securitycode==''){ errMsg += '<li>Please Provide Security Code !!\n</li>'; }
		if(candidatePassword=='undefined' || candidatePassword==''){ errMsg += '<li>Please provide Password !!\n</li>'; }
		if(retypePassword=='undefined' || retypePassword==''){ errMsg += '<li>Please provide Confirm New Password !!\n</li>'; }
		if(candidatePassword!=retypePassword){ errMsg += '<li>Password and Confirm New Password Should be Same!!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }
		else{ document.changeCandidatePasswordForm.submit(); }
	}catch(e){ return false; }
}

function changeAdminPassword(){
	try{
		var errMsg = '';
		var userEmailId = trim($('#userEmailId').val()); var securitycode = trim($('#securitycode').val());
		var userPassword = trim($('#userPassword').val()); var retypePassword = trim($('#retypePassword').val());
		if(userEmailId=='undefined' || userEmailId=='' || !checkemail(userEmailId)){ errMsg += '<li>Please provide Email Id !!\n</li>'; }
		if(securitycode=='undefined' || securitycode==''){ errMsg += '<li>Please Provide Security Code !!\n</li>'; }
		if(userPassword=='undefined' || userPassword==''){ errMsg += '<li>Please provide Password !!\n</li>'; }
		if(retypePassword=='undefined' || retypePassword==''){ errMsg += '<li>Please provide Confirm New Password !!\n</li>'; }
		if(userPassword!=retypePassword){ errMsg += '<li>Password and Confirm New Password Should be Same!!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }
		else{ document.changeAdminPasswordForm.submit(); }
	}catch(e){ return false; }
}

function changeInterviewerPassword(){
	try{
		var errMsg = '';
		var interviewerEmailId = trim($('#interviewerEmailId').val()); var securitycode = trim($('#securitycode').val());
		var interviewerPassword = trim($('#interviewerPassword').val()); var retypePassword = trim($('#retypePassword').val());
		if(interviewerEmailId=='undefined' || interviewerEmailId=='' || !checkemail(interviewerEmailId)){ errMsg += '<li>Please provide Email Id !!\n</li>'; }
		if(securitycode=='undefined' || securitycode==''){ errMsg += '<li>Please Provide Security Code !!\n</li>'; }
		if(interviewerPassword=='undefined' || interviewerPassword==''){ errMsg += '<li>Please provide Password !!\n</li>'; }
		if(retypePassword=='undefined' || retypePassword==''){ errMsg += '<li>Please provide Confirm New Password !!\n</li>'; }
		if(interviewerPassword!=retypePassword){ errMsg += '<li>Password and Confirm New Password Should be Same!!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }
		else{ document.changeInterviewerPasswordForm.submit(); }
	}catch(e){ return false; }
}

function changeAgentPassword(){
	try{
		var errMsg = '';
		var agentEmailId = trim($('#agentEmailId').val()); var securitycode = trim($('#securitycode').val());
		var agentPassword = trim($('#agentPassword').val()); var retypePassword = trim($('#retypePassword').val());
		if(agentEmailId=='undefined' || agentEmailId=='' || !checkemail(agentEmailId)){ errMsg += '<li>Please provide Email Id !!\n</li>'; }
		if(securitycode=='undefined' || securitycode==''){ errMsg += '<li>Please Provide Security Code !!\n</li>'; }
		if(agentPassword=='undefined' || agentPassword==''){ errMsg += '<li>Please provide Password !!\n</li>'; }
		if(retypePassword=='undefined' || retypePassword==''){ errMsg += '<li>Please provide Confirm New Password !!\n</li>'; }
		if(agentPassword!=retypePassword){ errMsg += '<li>Password and Confirm New Password Should be Same!!\n</li>'; }
		if(errMsg!=''){ showError(errMsg); }
		else{ document.changeAgentPasswordForm.submit(); }
	}catch(e){ return false; }
}



function validateEmployerCaptcha(){ var employerEmailId = $('#employerEmailId').val();
	if(employerEmailId!='undefined' && employerEmailId!='' && checkemail(employerEmailId)){
		var capt = $('#recaptcha_response_field').val();
		if(capt!='undefined' && capt!=''){
			url = 'ajaxfiles/validatecaptcha.jsp?id=captcha&recaptcha_response_field='+capt+'&recaptcha_challenge_field='+$('#recaptcha_challenge_field').val();
			http.open("GET", url, true); http.onreadystatechange = captchaEmployerServerResponse; http.send(null);
		}else{ showError('<li>Please Insert text in Captha Field !!</li>'); }
	}else{ showError('<li>Please Provide Email-Id !!</li>'); }
}

function captchaEmployerServerResponse(){
	if(http.readyState == 4 && http.status == 200){	 	
		var results = trim(http.responseText);
		if(results == "1" || results == 1){ document.forgotEmployerPasswordForm.submit(); }
		else{ showError('<li>Text Entered Does Not Match with Captcha Image</li>'); Recaptcha.reload(); }			
	}
}

function validateCandidateCaptcha(){ var candidateEmailId = $('#candidateEmailId').val();
	if(candidateEmailId!='undefined' && candidateEmailId!='' && checkemail(candidateEmailId)){
		var capt = $('#recaptcha_response_field').val();
		if(capt!='undefined' && capt!=''){
			url = 'ajaxfiles/validatecaptcha.jsp?id=captcha&recaptcha_response_field='+capt+'&recaptcha_challenge_field='+$('#recaptcha_challenge_field').val();
			http.open("GET", url, true); http.onreadystatechange = captchaCandidateServerResponse; http.send(null);
		}else{ showError('<li>Please Insert text in Captha Field !!</li>'); }
	}else{ showError('<li>Please Provide Email-Id !!</li>'); }
}

function captchaCandidateServerResponse(){
	if(http.readyState == 4 && http.status == 200){	 	
		var results = trim(http.responseText);
		if(results == "1" || results == 1){ document.forgotCandidatePasswordForm.submit(); }
		else{ showError('<li>Text Entered Does Not Match with Captcha Image</li>'); Recaptcha.reload(); }			
	}
}

function validateAdminCaptcha(){ var userEmailId = $('#userEmailId').val();
	if(userEmailId!='undefined' && userEmailId!='' && checkemail(userEmailId)){
		var capt = $('#recaptcha_response_field').val();
		if(capt!='undefined' && capt!=''){
			url = 'ajaxfiles/validatecaptcha.jsp?id=captcha&recaptcha_response_field='+capt+'&recaptcha_challenge_field='+$('#recaptcha_challenge_field').val();
			http.open("GET", url, true); http.onreadystatechange = captchaAdminServerResponse; http.send(null);
		}else{ showError('<li>Please Insert text in Captha Field !!</li>'); }
	}else{ showError('<li>Please Provide Email-Id !!</li>'); }
}

function captchaAdminServerResponse(){
	if(http.readyState == 4 && http.status == 200){	 	
		var results = trim(http.responseText);
		if(results == "1" || results == 1){ document.forgotAdminPasswordForm.submit(); }
		else{ showError('<li>Text Entered Does Not Match with Captcha Image</li>'); Recaptcha.reload(); }			
	}
}

function validateInterviewerCaptcha(){ var interviewerEmailId = $('#interviewerEmailId').val();
	if(interviewerEmailId!='undefined' && interviewerEmailId!='' && checkemail(interviewerEmailId)){
		var capt = $('#recaptcha_response_field').val();
		if(capt!='undefined' && capt!=''){
			url = 'ajaxfiles/validatecaptcha.jsp?id=captcha&recaptcha_response_field='+capt+'&recaptcha_challenge_field='+$('#recaptcha_challenge_field').val();
			http.open("GET", url, true); http.onreadystatechange = captchaInterviewerServerResponse; http.send(null);
		}else{ showError('<li>Please Insert text in Captha Field !!</li>'); }
	}else{ showError('<li>Please Provide Email-Id !!</li>'); }
}

function captchaInterviewerServerResponse(){
	if(http.readyState == 4 && http.status == 200){	 	
		var results = trim(http.responseText);
		if(results == "1" || results == 1){ document.forgotInterviewerPasswordForm.submit(); }
		else{ showError('<li>Text Entered Does Not Match with Captcha Image</li>'); Recaptcha.reload(); }			
	}
}

function validateAgentCaptcha(){ var agentEmailId = $('#agentEmailId').val();
	if(agentEmailId!='undefined' && agentEmailId!='' && checkemail(agentEmailId)){
		var capt = $('#recaptcha_response_field').val();
		if(capt!='undefined' && capt!=''){
			url = 'ajaxfiles/validatecaptcha.jsp?id=captcha&recaptcha_response_field='+capt+'&recaptcha_challenge_field='+$('#recaptcha_challenge_field').val();
			http.open("GET", url, true); http.onreadystatechange = captchaAgentServerResponse; http.send(null);
		}else{ showError('<li>Please Insert text in Captha Field !!</li>'); }
	}else{ showError('<li>Please Provide Email-Id !!</li>'); }
}

function captchaAgentServerResponse(){
	if(http.readyState == 4 && http.status == 200){	 	
		var results = trim(http.responseText);
		if(results == "1" || results == 1){ document.forgotAgentPasswordForm.submit(); }
		else{ showError('<li>Text Entered Does Not Match with Captcha Image</li>'); Recaptcha.reload(); }			
	}
}


function callAjx(urlNam,id){
	if(urlNam=='vInterviewer'){
		$.ajax({ url: 'viewInterviewer?interviewerId='+id, context: document.body }).done(function(data){ $('#viewinterviewer').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='dInterviewer'){
		$.ajax({ url: 'getInterviewerForDelete?interviewerId='+id, context: document.body }).done(function(data){ $('#deleteinterviewer').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='vSkillSet'){
		$.ajax({ url: 'viewSkillSet?skillSetId='+id, context: document.body }).done(function(data){ $('#viewskillset').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='dSkillSet'){
		$.ajax({ url: 'getSkillSetForDelete?skillSetId='+id, context: document.body }).done(function(data){ $('#deleteskillset').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='vLocation'){
		$.ajax({ url: 'viewLocation?locationId='+id, context: document.body }).done(function(data){ $('#viewlocation').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='dLocation'){
		$.ajax({ url: 'getLocationForDelete?locationId='+id, context: document.body }).done(function(data){ $('#deletelocation').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='vAgent'){
		$.ajax({ url: 'viewAgent?agentId='+id, context: document.body }).done(function(data){ $('#viewagent').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='dAgent'){
		$.ajax({ url: 'getAgentForDelete?agentId='+id, context: document.body }).done(function(data){ $('#deleteagent').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='vEmployer'){
		$.ajax({ url: 'viewEmployer?employerId='+id, context: document.body }).done(function(data){ $('#viewemployer').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='aEmployer'){
		$.ajax({ url: 'getEmployerForActivation?employerId='+id, context: document.body }).done(function(data){ $('#activeemployer').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='iEmployer'){
		$.ajax({ url: 'getEmployerForInActivation?employerId='+id, context: document.body }).done(function(data){ $('#inactiveemployer').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='vCoupon'){
		$.ajax({ url: 'viewCoupon?couponId='+id, context: document.body }).done(function(data){ $('#viewcoupon').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='dCoupon'){
		$.ajax({ url: 'getCouponForDelete?couponId='+id, context: document.body }).done(function(data){ $('#deletecoupon').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='vLocationScheduleTiming'){
		$.ajax({ url: 'viewAgentScheduleTiming?locationScheduleTimingId='+id, context: document.body }).done(function(data){ $('#viewscheduletiming').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='dLocationScheduleTiming'){
		$.ajax({ url: 'getAgentScheduleTimingForDelete?locationScheduleTimingId='+id, context: document.body }).done(function(data){ $('#deletescheduletiming').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='vInterviewAppliedCandidate'){
		$.ajax({ url: 'viewAgentInterviewAppliedCandidates?candidateScheduleTimingId='+id, context: document.body }).done(function(data){ $('#viewinterviewappliedcandidate').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='vInterviewScheduledCandidate'){
		$.ajax({ url: 'viewAgentInterviewerScheduledCandidates?candidateScheduleTimingId='+id, context: document.body }).done(function(data){ $('#viewinterviewscheduledcandidate').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='vInterviewedCandidate'){
		$.ajax({ url: 'viewAgentInterviewedCandidates?candidateScheduleTimingId='+id, context: document.body }).done(function(data){ $('#viewinterviewedcandidate').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='vInterviewedCandidate'){
		$.ajax({ url: 'viewAgentInterviewedCandidates?candidateScheduleTimingId='+id, context: document.body }).done(function(data){ $('#viewinterviewedcandidate').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='vInterviewCandidate'){
		$.ajax({ url: 'viewInterviewerAppliedCandidate?candidateScheduleTimingId='+id, context: document.body }).done(function(data){ $('#viewInterviewCandidate').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='pInterviewCandidate'){
		$.ajax({ url: 'pickInterviewerAppliedCandidate?candidateScheduleTimingId='+id, context: document.body }).done(function(data){ $('#pickInterviewCandidate').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='vInterviewerScheduleCandidates'){
		$.ajax({ url: 'viewInterviewerAppliedCandidate?candidateScheduleTimingId='+id, context: document.body }).done(function(data){ $('#viewScheduleCandidate').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='vInterviewedCandidates'){
		$.ajax({ url: 'viewInterviewerInterviewedCandidate?candidateScheduleTimingId='+id, context: document.body }).done(function(data){ $('#viewInterviewedCandidate').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='cViewScheduledTimeSlot'){
		$.ajax({ url: 'viewCandidateScheduledDetails?candidateScheduleTimingId='+id, context: document.body }).done(function(data){ $('#viewCandidateScheduledDetails').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='cViewScheduledInterviews'){
		$.ajax({ url: 'viewCandidateScheduledInterviews?candidateScheduleTimingId='+id, context: document.body }).done(function(data){ $('#viewInterviewScheduledDetails').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='cViewInterviewFeedback'){
		$.ajax({ url: 'viewCandidateInterviewFeedback?candidateScheduleTimingId='+id, context: document.body }).done(function(data){ $('#viewInterviewFeedback').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='cViewEmployerScheduledInterview'){
		$.ajax({ url: 'viewEmployerScheduledInterview?candidateScheduleTimingId='+id, context: document.body }).done(function(data){ $('#viewEmployerScheduledInterview').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='eViewCandidate'){
		$.ajax({ url: 'viewEmployerCandidateDetails?candidateEmployerSkillSetMapId='+id, context: document.body }).done(function(data){ $('#viewEmployerCandidate').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='eViewAppliedCandidates'){
		$.ajax({ url: 'viewEmployerAppliedCandidateDetails?candidateScheduleTimingId='+id, context: document.body }).done(function(data){ $('#viewEmployerAppliedCandidate').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='eViewScheduledCandidate'){
		$.ajax({ url: 'viewEmployerScheduledCandidateDetails?candidateScheduleTimingId='+id, context: document.body }).done(function(data){ $('#viewemployerScheduledCandidate').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='eViewInterviewedCandidates'){
		$.ajax({ url: 'viewEmployerInterviewedCandidateDetails?candidateScheduleTimingId='+id, context: document.body }).done(function(data){ $('#viewEmployerInterviewedCandidatesfeedback').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='eViewAllCandidates'){
		$.ajax({ url: 'viewEmployerAllCandidateDetails?candidateScheduleTimingId='+id, context: document.body }).done(function(data){ $('#viewEmployerAllCandidates').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='vLocationDetails'){
		$.ajax({ url: 'viewLocationDetails?locationId='+id, context: document.body }).done(function(data){ $('#viewlocationDetails').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='vAdminCandidate'){
		$.ajax({ url: 'viewAdminCandidate?candidateId='+id, context: document.body }).done(function(data){ $('#viewcandidate').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='vAdminCandidateInterviews'){
		$.ajax({ url: 'viewAdminCandidateInterviews?candidateScheduleTimingId='+id, context: document.body }).done(function(data){ $('#viewcandidateInterviews').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='vAdminCompleteCandidate'){
		$.ajax({ url: 'viewAdminCompleteCandidate?candidateScheduleTimingId='+id, context: document.body }).done(function(data){ $('#viewCompleteCandidates').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='vAdminPayment'){
		$.ajax({ url: 'viewAdminPayments?paymentDetailsId='+id, context: document.body }).done(function(data){ $('#viewpayment').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='vCandidatePayment'){
		$.ajax({ url: 'viewCandidatePayments?partyTypeId='+id, context: document.body }).done(function(data){ $('#viewcandidatepayment').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='vEmployerPayment'){
		$.ajax({ url: 'viewEmployerPayments?partyTypeId='+id, context: document.body }).done(function(data){ $('#viewemployerpayment').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='vAgentCandidate'){
		$.ajax({ url: 'viewAgentCandidate?candidateId='+id, context: document.body }).done(function(data){ $('#viewcandidatedetails').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='dAgentCandidate'){
		$.ajax({ url: 'getAgentCandidateForDelete?candidateId='+id, context: document.body }).done(function(data){ $('#deletecandidate').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='dAdminCandidate'){
		$.ajax({ url: 'getAdminCandidateForDelete?candidateId='+id, context: document.body }).done(function(data){ $('#deletecandidate').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='dAdminEmployer'){
		$.ajax({ url: 'getEmployerForDelete?employerId='+id, context: document.body }).done(function(data){ $('#deleteEmployer').html(data); }).fail(function(data){ showError(data); });
	}else if(urlNam=='dAdminCompleteCandidate'){
		$.ajax({ url: 'getAdminCompleteCandidateForDelete?candidateScheduleTimingId='+id, context: document.body }).done(function(data){ $('#deleteCompleteCandidates').html(data); }).fail(function(data){ showError(data); });
	}
}

function searchAjx(urlNam, pageNo){
	if(urlNam=='adminSearchInterviewerAjax'){
		
		var interviewerFirstName = trim($('#interviewerFirstName').val()); var interviewerEmailId = trim($('#interviewerEmailId').val()); var interviewerPhoneNo = trim($('#interviewerPhoneNo').val()); var skillSetId = trim($('#skillSetId').val());
		if( (interviewerFirstName!='undefined' && interviewerFirstName!='') || (interviewerEmailId!='undefined' && interviewerEmailId!='') || (interviewerPhoneNo!='undefined' && interviewerPhoneNo!='') || (skillSetId!='undefined' && skillSetId!='')){
			$.ajax({ url: 'adminInterviewerSearch?interviewerFirstName='+interviewerFirstName+'&interviewerEmailId='+interviewerEmailId+'&interviewerPhoneNo='+interviewerPhoneNo+'&skillSetId='+skillSetId+'&pageNo='+pageNo, context: document.body }).done(function(data){ $('#adminSearchInterviewerAjax').html(data); }).fail(function(data){ showError(data); });
		}else{showError('<li>Please Provide at least one value to Search!!\n</li>'); }
		
	}else if(urlNam=='adminSearchSkillSetAjax'){
		
		var primarySkillSet = $('#primarySkillSet').val(); var skillSetCategory = $('#skillSetCategory').val();
		if( (primarySkillSet!='undefined' && primarySkillSet!='') || (skillSetCategory!='undefined' && skillSetCategory!='') ){
			$.ajax({ url: 'adminSkillSetSearch?primarySkillSet='+primarySkillSet+"&skillSetCategory="+skillSetCategory+'&pageNo='+pageNo, context: document.body }).done(function(data){ $('#adminsearchskillsetajax').html(data); }).fail(function(data){ showError(data); });
		}else{showError('<li>Please Provide at least one value to Search!!\n</li>'); }
		
	}else if(urlNam=='adminSearchLocationAjax'){
		
		var locationName = $('#locationName').val(); var locationBusinessName = $('#locationBusinessName').val();var locationCity = $('#locationCity').val();var locationCountry = $('#locationCountry').val();
		if( (locationName!='undefined' && locationName!='') || (locationBusinessName!='undefined' && locationBusinessName!='') || (locationCity!='undefined' && locationCity!='') || (locationCountry!='undefined' && locationCountry!='')){
			$.ajax({ url: 'adminLocationSearch?locationName='+locationName+'&locationBusinessName='+locationBusinessName+'&locationCity='+locationCity+'&locationCountry='+locationCountry+'&pageNo='+pageNo, context: document.body }).done(function(data){ $('#adminsearchlocationajax').html(data); }).fail(function(data){ showError(data); });
		}else{showError('<li>Please Provide at least one value to Search!!\n</li>'); }
		
	}else if(urlNam=='interviewerAppliedCandidateSearchAjax'){
		
		var skillSetId = $('#skillSetId').val();
		var scheduleFromTime = $('#scheduleFromTime').val(); var scheduleToTime = $('#scheduleToTime').val();
		var fromDate = $("[name='scheduleFromTime']").datetimepicker('getDate').val(); var toDate = $("[name='scheduleToTime']").datetimepicker('getDate').val();
		if(fromDate!=null && toDate!=null){
			var fdate = new Date(fromDate);  var tdate = new Date(toDate);
			if(fdate.getTime() >= tdate.getTime()){ errMsg = '<p>\'From Date\' Should Not be Less Than Or Equal to \'To Date\' !!</p>'; showError(errMsg); return false;}
		}
		if( (skillSetId!='undefined' && skillSetId!='') || (fromDate!='undefined' && fromDate!='') || (toDate!='undefined' && toDate!='') ){
			$.ajax({ url: 'interviewerAppliedCandidatesSearch?skillSetId='+skillSetId+'&scheduleFromTime='+scheduleFromTime+'&scheduleToTime='+scheduleToTime+'&pageNo='+pageNo, context: document.body }).done(function(data){ $('#interviewersearchappliedcandidatesajax').html(data); }).fail(function(data){ showError(data); });
		}else{showError('<li>Please Provide at least one value to Search!!\n</li>'); }
		
	}else if(urlNam=='interviewerScheduledCandidateSearchAjax'){
		
		var skillSetId = $('#skillSetId').val();
		var scheduleFromTime = $('#scheduleFromTime').val(); var scheduleToTime = $('#scheduleToTime').val();
		var fromDate = $("[name='scheduleFromTime']").datetimepicker('getDate').val(); var toDate = $("[name='scheduleToTime']").datetimepicker('getDate').val();
		if(fromDate!=null && toDate!=null){
			var fdate = new Date(fromDate);  var tdate = new Date(toDate);
			if(fdate.getTime() >= tdate.getTime()){ errMsg = '<p>\'From Date\' Should Not be Less Than Or Equal to \'To Date\' !!</p>'; showError(errMsg); return false;}
		}
		if( (skillSetId!='undefined' && skillSetId!='') || (fromDate!='undefined' && fromDate!='') || (toDate!='undefined' && toDate!='') ){
			$.ajax({ url: 'interviewerScheduledCandidatesSearch?skillSetId='+skillSetId+'&scheduleFromTime='+scheduleFromTime+'&scheduleToTime='+scheduleToTime+'&pageNo='+pageNo, context: document.body }).done(function(data){ $('#interviewersearchscheduledcandidatesajax').html(data); }).fail(function(data){ showError(data); });
		}else{showError('<li>Please Provide at least one value to Search!!\n</li>'); }
		
	}else if(urlNam=='interviewerInterviewedCandidateSearchAjax'){
		
		var skillSetId = $('#skillSetId').val();
		var scheduleFromTime = $('#scheduleFromTime').val(); var scheduleToTime = $('#scheduleToTime').val();
		var fromDate = $("[name='scheduleFromTime']").datetimepicker('getDate').val(); var toDate = $("[name='scheduleToTime']").datetimepicker('getDate').val();
		if(fromDate!=null && toDate!=null){
			var fdate = new Date(fromDate);  var tdate = new Date(toDate);
			if(fdate.getTime() >= tdate.getTime()){ errMsg = '<p>\'From Date\' Should Not be Less Than Or Equal to \'To Date\' !!</p>'; showError(errMsg); return false;}
		}
		if( (skillSetId!='undefined' && skillSetId!='') || (fromDate!='undefined' && fromDate!='') || (toDate!='undefined' && toDate!='') ){
			$.ajax({ url: 'interviewerInterviewedCandidatesSearch?skillSetId='+skillSetId+'&scheduleFromTime='+scheduleFromTime+'&scheduleToTime='+scheduleToTime+'&pageNo='+pageNo, context: document.body }).done(function(data){ $('#interviewersearchinterviewedcandidatesajax').html(data); }).fail(function(data){ showError(data); });
		}else{showError('<li>Please Provide at least one value to Search!!\n</li>'); }
		
	}else if(urlNam=='adminSearchAgentAjax'){
		
			var agentEmailId = $('#agentEmailId').val(); var agentPhoneNo = $('#agentPhoneNo').val(); var agentCountry = $('#agentCountry').val();
			if( (agentEmailId!='undefined' && agentEmailId!='') || (agentPhoneNo!='undefined' && agentPhoneNo!='') || (agentCountry!='undefined' && agentCountry!='')){
				$.ajax({ url: 'adminAgentSearch?agentEmailId='+agentEmailId+'&agentPhoneNo='+agentPhoneNo+'&agentCountry='+agentCountry+'&pageNo='+pageNo, context: document.body }).done(function(data){ $('#adminsearchagentajax').html(data); }).fail(function(data){ showError(data); });
			}else{showError('<li>Please Provide at least one value to Search!!\n</li>'); }
			
	}else if(urlNam=='adminSearchCouponAjax'){
		
		var couponCode = $('#couponCode').val(); var couponName = $('#couponName').val();
		var fromDate = $('#fromDate').val(); var toDate = $('#toDate').val();
		var fd = $("[name='fromDate']").datetimepicker('getDate').val(); var td = $("[name='toDate']").datetimepicker('getDate').val();
		if(fd!=null && td!=null){
			var fdate = new Date(fd);  var tdate = new Date(td);
			if(fdate.getTime() >= tdate.getTime()){ errMsg = '<p>\'From Date\' Should Not be Less Than Or Equal to \'To Date\' !!</p>'; showError(errMsg); return false;}
		}
		if( (couponCode!='undefined' && couponCode!='') || (couponName!='undefined' && couponName!='') ||  (fromDate!='undefined' && fromDate!='') || (toDate!='undefined' && toDate!='')){
			$.ajax({ url: 'adminCouponSearch?couponCode='+couponCode+'&couponName='+couponName+'&fromDate='+fromDate+'&toDate='+toDate+'&pageNo='+pageNo, context: document.body }).done(function(data){ $('#adminsearchcouponajax').html(data); }).fail(function(data){ showError(data); });
		}else{showError('<li>Please Provide at least one value to Search!!\n</li>'); }
		
	}else if(urlNam=='adminSearchEmployerAjax'){
		
		var employerFirstName = $('#employerFirstName').val(); var employerEmailId = $('#employerEmailId').val(); var employerPhoneNo = $('#employerPhoneNo').val(); var status = $('#status').val();
		if( (employerFirstName!='undefined' && employerFirstName!='') || (employerEmailId!='undefined' && employerEmailId!='') || (employerPhoneNo!='undefined' && employerPhoneNo!='') || (status!='undefined' && status!='') ){
			$.ajax({ url: 'adminEmployerSearch?employerFirstName='+employerFirstName+'&employerEmailId='+employerEmailId+'&employerPhoneNo='+employerPhoneNo+'&status='+status+'&pageNo='+pageNo, context: document.body }).done(function(data){ $('#adminSearchEmployerAjax').html(data); }).fail(function(data){ showError(data); });
		}else{showError('<li>Please Provide at least one value to Search!!\n</li>'); }
		
	}else if(urlNam=='agentSearchLocationAjax'){
		
		var locationName = $('#locationName').val(); var locationBusinessName = $('#locationBusinessName').val(); var locationCity = $('#locationCity').val(); var locationState = $('#locationState').val();
		if((locationName!='undefined' && locationName !='') || (locationBusinessName!='undefined' && locationBusinessName !='') || (locationCity!='undefined' && locationCity !='') || (locationState!='undefined' && locationState !='')){
			$.ajax({ url: 'agentLocationSearch?locationName='+locationName+ '&locationBusinessName='+locationBusinessName+'&locationCity='+locationCity+'&locationState='+locationState+'&pageNo='+pageNo, context: document.body }).done(function(data){ $('#agentsearchlocationajax').html(data); }).fail(function(data){ showError(data); });
		}else{showError('<li>Please Provide at least one value to Search!!\n</li>'); }
		
	}else if(urlNam=='candidateSearchInterviewFeedbackAjax'){

		var candidatePerformance = $('#candidatePerformance').val(); 
		var scheduleFromTime = $('#scheduleFromTime').val(); var scheduleToTime = $('#scheduleToTime').val();
		var fromDate = $("[name='scheduleFromTime']").datetimepicker('getDate').val(); var toDate = $("[name='scheduleToTime']").datetimepicker('getDate').val();
		if(fromDate!=null && toDate!=null){
			var fdate = new Date(fromDate);  var tdate = new Date(toDate);
			if(fdate.getTime() >= tdate.getTime()){ errMsg = '<p>\'From Date\' Should Not be Less Than Or Equal to \'To Date\' !!</p>'; showError(errMsg); return false;}
		}
		if((candidatePerformance!='undefined' && candidatePerformance!='') || (fromDate!='undefined' && fromDate!='') || (toDate!='undefined' && toDate!='') ){
			$.ajax({ url: 'candidateInterviewFeedbackSearch?candidatePerformance='+candidatePerformance+'&scheduleFromTime='+scheduleFromTime+'&scheduleToTime='+scheduleToTime+'&pageNo='+pageNo, context: document.body }).done(function(data){ $('#candidatesearchinterviewfeedbackajax').html(data); }).fail(function(data){ showError(data); });
		}else{showError('<li>Please Provide at least one value to Search!!\n</li>'); }
		
	}else if(urlNam=='candidateSearchScheduledTimeSlotsAjax'){
		
		var scheduleFromTime = $('#scheduleFromTime').val(); var scheduleToTime = $('#scheduleToTime').val();
		var fromDate = $("[name='scheduleFromTime']").datetimepicker('getDate').val(); var toDate = $("[name='scheduleToTime']").datetimepicker('getDate').val();
		if(fromDate!=null && toDate!=null){
			var fdate = new Date(fromDate);  var tdate = new Date(toDate);
			if(fdate.getTime() >= tdate.getTime()){ errMsg = '<p>\'From Date\' Should Not be Less Than Or Equal to \'To Date\' !!</p>'; showError(errMsg); return false;}
		}
		if( (fromDate!='undefined' && fromDate!='') || (toDate!='undefined' && toDate!='') ){
			$.ajax({ url: 'candidateScheduledTimeSlotsSearch?scheduleFromTime='+scheduleFromTime+'&scheduleToTime='+scheduleToTime+'&pageNo='+pageNo, context: document.body }).done(function(data){ $('#candidatesearchscheduledtimeslotsajax').html(data); }).fail(function(data){ showError(data); });
		}else{showError('<li>Please Provide at least one value to Search!!\n</li>'); }
		
	}else if(urlNam=='candidateSearchScheduledInterviewsAjax'){
		
		var skillSetId = $('#skillSetId').val();
		var scheduleFromTime = $('#scheduleFromTime').val(); var scheduleToTime = $('#scheduleToTime').val();
		var fromDate = $("[name='scheduleFromTime']").datetimepicker('getDate').val(); var toDate = $("[name='scheduleToTime']").datetimepicker('getDate').val();
		if(fromDate!=null && toDate!=null){
			var fdate = new Date(fromDate);  var tdate = new Date(toDate);
			if(fdate.getTime() >= tdate.getTime()){ errMsg = '<p>\'From Date\' Should Not be Less Than Or Equal to \'To Date\' !!</p>'; showError(errMsg); return false;}
		}
		if( (skillSetId!='undefined' && skillSetId!='') || (fromDate!='undefined' && fromDate!='') || (toDate!='undefined' && toDate!='') ){
			$.ajax({ url: 'candidateScheduledInterviewsSearch?skillSetId='+skillSetId+'&scheduleFromTime='+scheduleFromTime+'&scheduleToTime='+scheduleToTime+'&pageNo='+pageNo, context: document.body }).done(function(data){ $('#candidatesearchscheduledinterviewsajax').html(data); }).fail(function(data){ showError(data); });
		}else{showError('<li>Please Provide at least one value to Search!!\n</li>'); }
		
	}else if(urlNam=='candidateSearchEmployerScheduledInterviewAjax'){
		
		var employerName = $('#employerName').val(); var employerTitle = $('#employerTitle').val(); var employerCompanyName = $('#employerCompanyName').val();
		if( (employerName!='undefined' && employerName!='') || (employerTitle!='undefined' && employerTitle!='') || (employerCompanyName!='undefined' && employerCompanyName!='')){
			$.ajax({ url: 'candidateEmployerScheduledInterviewSearch?employerName='+employerName+'&employerTitle='+employerTitle+'&employerCompanyName='+employerCompanyName+'&pageNo='+pageNo, context: document.body }).done(function(data){ $('#candidatesearchemployerscheduledinterviewajax').html(data); }).fail(function(data){ showError(data); });
		}else{showError('<li>Please Provide at least one value to Search!!\n</li>'); }
		
	}else if(urlNam=='employerSearchCandidatesAjax'){
		
		var candidateName = $('#candidateName').val(); var skillSetId = $('#skillSetId').val(); var phoneNo = $('#phoneNo').val(); var emailId = $('#emailId').val();
		if( (candidateName!='undefined' && candidateName!='') || (skillSetId!='undefined' && skillSetId!='') || (phoneNo!='undefined' && phoneNo!='') || (emailId!='undefined' && emailId!='')){
			$.ajax({ url: 'employerCandidatesSearch?candidateName='+candidateName+'&skillSetId='+skillSetId+'&phoneNo='+phoneNo+'&emailId='+emailId+'&pageNo='+pageNo, context: document.body }).done(function(data){ $('#employercandidatesajax').html(data); }).fail(function(data){ showError(data); });
		}else{showError('<li>Please Provide at least one value to Search!!\n</li>'); }
		
	}else if(urlNam=='employerSearchAppliedCandidatesAjax'){
		
		var candidateName = $('#candidateName').val(); var skillSetId = $('#skillSetId').val(); var locationId = $('#locationId').val();
		var scheduleFromTime = $('#scheduleFromTime').val(); var scheduleToTime = $('#scheduleToTime').val();
		var fromDate = $("[name='scheduleFromTime']").datetimepicker('getDate').val(); var toDate = $("[name='scheduleToTime']").datetimepicker('getDate').val();
		if(fromDate!=null && toDate!=null){
			var fdate = new Date(fromDate);  var tdate = new Date(toDate);
			if(fdate.getTime() >= tdate.getTime()){ errMsg = '<p>\'From Date\' Should Not be Less Than Or Equal to \'To Date\' !!</p>'; showError(errMsg); return false;}
		}
		if( (candidateName!='undefined' && candidateName!='') || (skillSetId!='undefined' && skillSetId!='')|| (locationId!='undefined' && locationId!='') || (fromDate!='undefined' && fromDate!='') || (toDate!='undefined' && toDate!='')){
			$.ajax({ url: 'employerAppliedCandidatesSearch?candidateName='+candidateName+'&skillSetId='+skillSetId+'&locationId='+locationId+'&scheduleFromTime='+scheduleFromTime+'&scheduleToTime='+scheduleToTime+'&pageNo='+pageNo, context: document.body }).done(function(data){ $('#employerappliedcandidatesajax').html(data); }).fail(function(data){ showError(data); });
		}else{showError('<li>Please Provide at least one value to Search!!\n</li>'); }
		
	}else if(urlNam=='employerSearchScheduledCandidatesAjax'){
		
		var candidateName = $('#candidateName').val(); var skillSetId = $('#skillSetId').val(); var locationId = $('#locationId').val(); var interviewerName = $('#interviewerName').val();
		var scheduleFromTime = $('#scheduleFromTime').val(); var scheduleToTime = $('#scheduleToTime').val();
		var fromDate = $("[name='scheduleFromTime']").datetimepicker('getDate').val(); var toDate = $("[name='scheduleToTime']").datetimepicker('getDate').val();
		if(fromDate!=null && toDate!=null){
			var fdate = new Date(fromDate);  var tdate = new Date(toDate);
			if(fdate.getTime() >= tdate.getTime()){ errMsg = '<p>\'From Date\' Should Not be Less Than Or Equal to \'To Date\' !!</p>'; showError(errMsg); return false;}
		}
		if( (candidateName!='undefined' && candidateName!='') || (skillSetId!='undefined' && skillSetId!='')|| (locationId!='undefined' && locationId!='') || (interviewerName!='undefined' && interviewerName!='') || (fromDate!='undefined' && fromDate!='') || (toDate!='undefined' && toDate!='')){
			$.ajax({ url: 'employerScheduledCandidatesSearch?candidateName='+candidateName+'&skillSetId='+skillSetId+'&locationId='+locationId+'&interviewerName='+interviewerName+'&scheduleFromTime='+scheduleFromTime+'&scheduleToTime='+scheduleToTime+'&pageNo='+pageNo, context: document.body}).done(function(data){ $('#employerscheduledcandidatesajax').html(data); }).fail(function(data){ showError(data); });
		}else{showError('<li>Please Provide at least one value to Search!!\n</li>'); }
		
	}else if(urlNam=='employerSearchInterviewedCandidatesAjax'){
		
		var candidateName = $('#candidateName').val(); var skillSetId = $('#skillSetId').val(); var candidatePerformance = $('#candidatePerformance').val(); var interviewerName = $('#interviewerName').val();
		var scheduleFromTime = $('#scheduleFromTime').val(); var scheduleToTime = $('#scheduleToTime').val();
		var fromDate = $("[name='scheduleFromTime']").datetimepicker('getDate').val(); var toDate = $("[name='scheduleToTime']").datetimepicker('getDate').val();
		if(fromDate!=null && toDate!=null){
			var fdate = new Date(fromDate);  var tdate = new Date(toDate);
			if(fdate.getTime() >= tdate.getTime()){ errMsg = '<p>\'From Date\' Should Not be Less Than Or Equal to \'To Date\' !!</p>'; showError(errMsg); return false;}
		}
		if( (candidateName!='undefined' && candidateName!='') || (skillSetId!='undefined' && skillSetId!='')|| (candidatePerformance!='undefined' && candidatePerformance!='') || (interviewerName!='undefined' && interviewerName!='') || (fromDate!='undefined' && fromDate!='') || (toDate!='undefined' && toDate!='')){
			$.ajax({ url: 'employerInterviewedCandidatesSearch?candidateName='+candidateName+'&skillSetId='+skillSetId+'&candidatePerformance='+candidatePerformance+'&interviewerName='+interviewerName+'&scheduleFromTime='+scheduleFromTime+'&scheduleToTime='+scheduleToTime+'&pageNo='+pageNo, context: document.body}).done(function(data){ $('#employerinterviewedcandidatesajax').html(data); }).fail(function(data){ showError(data); });
		}else{showError('<li>Please Provide at least one value to Search!!\n</li>'); }
		
	}else if(urlNam=='employerSearchCreditsManagementAjax'){
		
		var scheduleFromTime = $('#scheduleFromTime').val(); var creditsPurchased = $('#creditsPurchased').val(); 
				
		if( (creditsPurchased!='undefined' && creditsPurchased!='') || (scheduleFromTime!='undefined' && scheduleFromTime!='') ){
			$.ajax({ url: 'creditsManagmentSearch?scheduleFromTime='+scheduleFromTime+'&creditsPurchased='+creditsPurchased+'&pageNo='+pageNo, context: document.body}).done(function(data){ $('#employercreditsmanagementajax').html(data); }).fail(function(data){ showError(data); });
		}else{showError('<li>Please Provide at least one value to Search!!\n</li>'); }
		
	}else if(urlNam=='candidateSearchResumesHistoryAjax'){
	
		var uploadFromTime = $('#uploadFromTime').val(); var uploadToTime = $('#uploadToTime').val();
		var fromDate = $("[name='uploadFromTime']").datetimepicker('getDate').val(); var toDate = $("[name='uploadToTime']").datetimepicker('getDate').val();
		if(fromDate!=null && toDate!=null){
			var fdate = new Date(fromDate);  var tdate = new Date(toDate);
			if(fdate.getTime() >= tdate.getTime()){ errMsg = '<p>\'From Date\' Should Not be Less Than Or Equal to \'To Date\' !!</p>'; showError(errMsg); return false;}
		}
		if( (fromDate!='undefined' && fromDate!='') || (toDate!='undefined' && toDate!='')){
			$.ajax({ url: 'candidateResumesHistorySearch?uploadFromTime='+uploadFromTime+'&uploadToTime='+uploadToTime+'&pageNo='+pageNo, context: document.body}).done(function(data){ $('#candidateresumeshistoryajax').html(data); }).fail(function(data){ showError(data); });
		}else{showError('<li>Please Provide at least one value to Search!!\n</li>'); }
	}else if(urlNam=='agentSearchScheduleTimingsAjax'){

		var locationId = $('#locationId').val();  var locationName = $('#locationName').val(); 
		var scheduleFromTime = $('#scheduleFromTime').val(); var scheduleToTime = $('#scheduleToTime').val();
		var fromDate = $("[name='scheduleFromTime']").datetimepicker('getDate').val(); var toDate = $("[name='scheduleToTime']").datetimepicker('getDate').val();
		if(fromDate!=null && toDate!=null){
			var fdate = new Date(fromDate);  var tdate = new Date(toDate);
			if(fdate.getTime() >= tdate.getTime()){ errMsg = '<p>\'From Date\' Should Not be Less Than Or Equal to \'To Date\' !!</p>'; showError(errMsg); return false;}
		}
		if((locationId!='undefined' && locationId!='')  || (locationName!='undefined' && locationName!='') || (fromDate!='undefined' && fromDate!='') || (toDate!='undefined' && toDate!='') ){
			$.ajax({ url: 'agentScheduleTimingsSearch?locationId='+locationId+'&locationName='+locationName+'&scheduleFromTime='+scheduleFromTime+'&scheduleToTime='+scheduleToTime+'&pageNo='+pageNo, context: document.body }).done(function(data){ $('#agentsearchscheduletimingsajax').html(data); }).fail(function(data){ showError(data); });
		}else{showError('<li>Please Provide at least one value to Search!!\n</li>'); }
		
	}else if(urlNam=='agentSearchInterviewAppliedCandidatesAjax'){

		var firstName = $('#firstName').val();  var skillSetId = $('#skillSetId').val(); 
		var scheduleFromTime = $('#scheduleFromTime').val(); var scheduleToTime = $('#scheduleToTime').val();
		var fromDate = $("[name='scheduleFromTime']").datetimepicker('getDate').val(); var toDate = $("[name='scheduleToTime']").datetimepicker('getDate').val();
		if(fromDate!=null && toDate!=null){
			var fdate = new Date(fromDate);  var tdate = new Date(toDate);
			if(fdate.getTime() >= tdate.getTime()){ errMsg = '<p>\'From Date\' Should Not be Less Than Or Equal to \'To Date\' !!</p>'; showError(errMsg); return false;}
		}
		if((firstName!='undefined' && firstName!='')  || (skillSetId!='undefined' && skillSetId!='') || (fromDate!='undefined' && fromDate!='') || (toDate!='undefined' && toDate!='') ){
			$.ajax({ url: 'agentInterviewAppliedCandidatesSearch?firstName='+firstName+'&skillSetId='+skillSetId+'&scheduleFromTime='+scheduleFromTime+'&scheduleToTime='+scheduleToTime+'&pageNo='+pageNo, context: document.body }).done(function(data){ $('#agentsearchinterviewappliedcandidatesajax').html(data); }).fail(function(data){ showError(data); });
		}else{showError('<li>Please Provide at least one value to Search!!\n</li>'); }
		
	}else if(urlNam=='agentSearchInterviewScheduledCandidatesAjax'){

		var candidateName = $('#candidateName').val();  var skillSetId = $('#skillSetId').val(); var interviewerName = $('#interviewerName').val();
		var scheduleFromTime = $('#scheduleFromTime').val(); var scheduleToTime = $('#scheduleToTime').val();
		var fromDate = $("[name='scheduleFromTime']").datetimepicker('getDate').val(); var toDate = $("[name='scheduleToTime']").datetimepicker('getDate').val();
		if(fromDate!=null && toDate!=null){
			var fdate = new Date(fromDate);  var tdate = new Date(toDate);
			if(fdate.getTime() >= tdate.getTime()){ errMsg = '<p>\'From Date\' Should Not be Less Than Or Equal to \'To Date\' !!</p>'; showError(errMsg); return false;}
		}
		if((candidateName!='undefined' && candidateName!='') || (skillSetId!='undefined' && skillSetId!='') || (interviewerName!='undefined' && interviewerName!='') || (fromDate!='undefined' && fromDate!='') || (toDate!='undefined' && toDate!='') ){
			$.ajax({ url: 'agentInterviewerScheduledCandidatesSearch?candidateName='+candidateName+'&skillSetId='+skillSetId+'&interviewerName='+interviewerName+'&scheduleFromTime='+scheduleFromTime+'&scheduleToTime='+scheduleToTime+'&pageNo='+pageNo, context: document.body }).done(function(data){ $('#agentsearchscheduledcandidatesajax').html(data); }).fail(function(data){ showError(data); });
		}else{showError('<li>Please Provide at least one value to Search!!\n</li>'); }
		
	}else if(urlNam=='agentSearchInterviewedCandidatesAjax'){

		var candidateName = $('#candidateName').val();  var skillSetId = $('#skillSetId').val(); var candidatePerformance = $('#candidatePerformance').val(); var interviewerName = $('#interviewerName').val();
		var scheduleFromTime = $('#scheduleFromTime').val(); var scheduleToTime = $('#scheduleToTime').val();
		var fromDate = $("[name='scheduleFromTime']").datetimepicker('getDate').val(); var toDate = $("[name='scheduleToTime']").datetimepicker('getDate').val();
		if(fromDate!=null && toDate!=null){
			var fdate = new Date(fromDate);  var tdate = new Date(toDate);
			if(fdate.getTime() >= tdate.getTime()){ errMsg = '<p>\'From Date\' Should Not be Less Than Or Equal to \'To Date\' !!</p>'; showError(errMsg); return false;}
		}
		if((candidateName!='undefined' && candidateName!='') || (skillSetId!='undefined' && skillSetId!='') || (candidatePerformance!='undefined' && candidatePerformance!='') || (interviewerName!='undefined' && interviewerName!='') || (fromDate!='undefined' && fromDate!='') || (toDate!='undefined' && toDate!='') ){
			$.ajax({ url: 'agentInterviewedCandidatesSearch?candidateName='+candidateName+'&skillSetId='+skillSetId+'&candidatePerformance='+candidatePerformance+'&interviewerName='+interviewerName+'&scheduleFromTime='+scheduleFromTime+'&scheduleToTime='+scheduleToTime+'&pageNo='+pageNo, context: document.body }).done(function(data){ $('#agentsearchinterviedcandidatesajax').html(data); }).fail(function(data){ showError(data); });
		}else{showError('<li>Please Provide at least one value to Search!!\n</li>'); }
		
	}else if(urlNam=='adminSearchCandidateAjax'){

		var skillSetId = $('#skillSetId').val(); var candidateId = $('#candidateId').val(); var candidateFirstName = $('#candidateFirstName').val();  
		var candidateLastName = $('#candidateLastName').val(); var candidateEmailId = $('#candidateEmailId').val(); var candidatePhoneNo = $('#candidatePhoneNo').val(); 
		if((skillSetId!='undefined' && skillSetId!='') || (candidateId!='undefined' && candidateId!='') ||(candidateFirstName!='undefined' && candidateFirstName!='') || (candidateLastName!='undefined' && candidateLastName!='') || (candidateEmailId!='undefined' && candidateEmailId!='') || (candidatePhoneNo!='undefined' && candidatePhoneNo!='') ){
			$.ajax({ url: 'adminCandidateSearch?skillSetId='+skillSetId+'&candidateId='+candidateId+'&candidateFirstName='+candidateFirstName+'&candidateLastName='+candidateLastName+'&candidateEmailId='+candidateEmailId+'&candidatePhoneNo='+candidatePhoneNo+'&pageNo='+pageNo, context: document.body }).done(function(data){ $('#adminSearchCandidateAjax').html(data); }).fail(function(data){ showError(data); });
		}else{showError('<li>Please Provide at least one value to Search!!\n</li>'); }
		
	}else if(urlNam=='adminSearchCandidateInterviewsAjax'){

		var skillSetId = $('#skillSetId').val(); var scheduleFromTime = $('#scheduleFromTime').val(); var scheduleToTime = $('#scheduleToTime').val();  
		var interviewerId = $('#interviewerId').val(); var interviewStatus = $('#interviewStatus').val(); var candidateUniqueId = $('#candidateUniqueId').val(); 
		var locationId = $('#locationId').val(); 
		var fromDate = $("[name='scheduleFromTime']").datetimepicker('getDate').val(); var toDate = $("[name='scheduleToTime']").datetimepicker('getDate').val();
		if(fromDate!=null && toDate!=null){
			var fdate = new Date(fromDate);  var tdate = new Date(toDate);
			if(fdate.getTime() >= tdate.getTime()){ errMsg = '<p>\'From Date\' Should Not be Less Than Or Equal to \'To Date\' !!</p>'; showError(errMsg); return false;}
		}
		if((skillSetId!='undefined' && skillSetId!='') || (scheduleFromTime!='undefined' && scheduleFromTime!='') ||(scheduleToTime!='undefined' && scheduleToTime!='') || (interviewerId!='undefined' && interviewerId!='') || (interviewStatus!='undefined' && interviewStatus!='') || (candidateUniqueId!='undefined' && candidateUniqueId!='')  || (locationId!='undefined' && locationId!='') ){
			$.ajax({ url: 'adminCandidateInterviewsSearch?skillSetId='+skillSetId+'&scheduleFromTime='+scheduleFromTime+'&scheduleToTime='+scheduleToTime+'&interviewerId='+interviewerId+'&interviewStatus='+interviewStatus+'&candidateUniqueId='+candidateUniqueId+'&locationId='+locationId+'&pageNo='+pageNo, context: document.body }).done(function(data){ $('#adminSearchCandidateInterviewsAjax').html(data); }).fail(function(data){ showError(data); });
		}else{showError('<li>Please Provide at least one value to Search!!\n</li>'); }
		
	}else if(urlNam=='adminSearchCompleteCandidateAjax'){
		var candidateId = $('#candidateId').val(); var employerId = $('#employerId').val();
		var skillSetId = $('#skillSetId').val(); var scheduleFromTime = $('#scheduleFromTime').val(); var scheduleToTime = $('#scheduleToTime').val();  
		var interviewerId = $('#interviewerId').val(); var candidateUniqueId = $('#candidateUniqueId').val(); var locationId = $('#locationId').val(); 
		var fromDate = $("[name='scheduleFromTime']").datetimepicker('getDate').val(); var toDate = $("[name='scheduleToTime']").datetimepicker('getDate').val();
		if(fromDate!=null && toDate!=null){
			var fdate = new Date(fromDate);  var tdate = new Date(toDate);
			if(fdate.getTime() >= tdate.getTime()){ errMsg = '<p>\'From Date\' Should Not be Less Than Or Equal to \'To Date\' !!</p>'; showError(errMsg); return false;}
		}
		if((candidateId!='undefined' && candidateId!='') || (employerId!='undefined' && employerId!='') || (skillSetId!='undefined' && skillSetId!='') || (scheduleFromTime!='undefined' && scheduleFromTime!='') ||(scheduleToTime!='undefined' && scheduleToTime!='') || (interviewerId!='undefined' && interviewerId!='') || (candidateUniqueId!='undefined' && candidateUniqueId!='')  || (locationId!='undefined' && locationId!='') ){
			$.ajax({ url: 'adminCompleteCandidateSearch?candidateId='+candidateId+'&employerId='+employerId+'&skillSetId='+skillSetId+'&scheduleFromTime='+scheduleFromTime+'&scheduleToTime='+scheduleToTime+'&interviewerId='+interviewerId+'&candidateUniqueId='+candidateUniqueId+'&locationId='+locationId+'&pageNo='+pageNo, context: document.body }).done(function(data){ $('#adminSearchCompleteCandidateAjax').html(data); }).fail(function(data){ showError(data); });
		}else{showError('<li>Please Provide at least one value to Search!!\n</li>'); }
		
	}else if(urlNam=='adminSearchPaymentDeatilAjax'){
		var partyTypeId = $('#partyTypeId').val();
		var transactionNumber = $('#transactionNumber').val(); var invoiceNumber = $('#invoiceNumber').val(); var paymentDate = $('#paymentDate').val();
		var noOfCreditsBought = $('#noOfCreditsBought').val(); var couponId = $('#couponId').val(); var totalAmount = $('#totalAmount').val();
		var firstName = $('#firstName').val(); var emailId = $('#emailId').val(); var phone = $('#phone').val(); var zip = $('#zip').val(); 
		var fromDate = $('#fromDate').val(); var toDate = $('#toDate').val();
		var fd = $("[name='fromDate']").datetimepicker('getDate').val(); var td = $("[name='toDate']").datetimepicker('getDate').val();
		if(fd!=null && td!=null){
			var fdate = new Date(fd);  var tdate = new Date(td);
			if(fdate.getTime() >= tdate.getTime()){ errMsg = '<p>\'From Date\' Should Not be Less Than Or Equal to \'To Date\' !!</p>'; showError(errMsg); return false;}
		}
		if((partyTypeId!='undefined' && partyTypeId!='') || (transactionNumber!='undefined' && transactionNumber!='') || (invoiceNumber!='undefined' && invoiceNumber!='') || (paymentDate!='undefined' && paymentDate!='') || (noOfCreditsBought!='undefined' && noOfCreditsBought!='') 
			|| (couponId!='undefined' && couponId!='') || (totalAmount!='undefined' && totalAmount!='') || (firstName!='undefined' && firstName!='') 
			|| (emailId!='undefined' && emailId!='') ||  (fromDate!='undefined' && fromDate!='') ||(toDate!='undefined' && toDate!='') 
			|| (phone!='undefined' && phone!='') || (zip!='undefined' && zip!='') ){
			$.ajax({ url: 'adminPaymentDetailSearch?partyTypeId='+partyTypeId+'&transactionNumber='+transactionNumber+'&invoiceNumber='+invoiceNumber+'&paymentDate='+paymentDate+'&noOfCreditsBought='+noOfCreditsBought+'&couponId='+couponId+'&totalAmount='+totalAmount
				+'&firstName='+firstName+'&emailId='+emailId+'&phone='+phone+'&zip='+zip+'&fromDate='+fromDate+'&toDate='+toDate+'&pageNo='+pageNo, context: document.body }).done(function(data){ $('#adminSearchPaymentAjax').html(data); }).fail(function(data){ showError(data); });
		}else{showError('<li>Please Provide at least one value to Search!!\n</li>'); }
		
	}else if(urlNam=='candidateSearchCreditsManagementAjax'){
		
		var scheduleFromTime = $('#scheduleFromTime').val(); var creditsPurchased = $('#creditsPurchased').val(); 
				
		if( (creditsPurchased!='undefined' && creditsPurchased!='') || (scheduleFromTime!='undefined' && scheduleFromTime!='') ){
			$.ajax({ url: 'candidateCreditsManagmentSearch?scheduleFromTime='+scheduleFromTime+'&creditsPurchased='+creditsPurchased+'&pageNo='+pageNo, context: document.body}).done(function(data){ $('#candidatecreditsmanagementajax').html(data); }).fail(function(data){ showError(data); });
		}else{showError('<li>Please Provide at least one value to Search!!\n</li>'); }
		
	}else if(urlNam=='agentSearchCandidateAjax'){

		var skillSetId = $('#skillSetId').val(); var candidateId = $('#candidateId').val(); var candidateFirstName = $('#candidateFirstName').val();  
		var candidateLastName = $('#candidateLastName').val(); var candidateEmailId = $('#candidateEmailId').val(); var candidatePhoneNo = $('#candidatePhoneNo').val(); 
		if((skillSetId!='undefined' && skillSetId!='') || (candidateId!='undefined' && candidateId!='') ||(candidateFirstName!='undefined' && candidateFirstName!='') || (candidateLastName!='undefined' && candidateLastName!='') || (candidateEmailId!='undefined' && candidateEmailId!='') || (candidatePhoneNo!='undefined' && candidatePhoneNo!='') ){
			$.ajax({ url: 'agentCandidateSearch?skillSetId='+skillSetId+'&candidateId='+candidateId+'&candidateFirstName='+candidateFirstName+'&candidateLastName='+candidateLastName+'&candidateEmailId='+candidateEmailId+'&candidatePhoneNo='+candidatePhoneNo+'&pageNo='+pageNo, context: document.body }).done(function(data){ $('#agentSearchCandidateAjax').html(data); }).fail(function(data){ showError(data); });
		}else{showError('<li>Please Provide at least one value to Search!!\n</li>'); }
		
	}
}

function formatDate(fromDate) {
  var fromDateArray = fromDate.split("/");
  var selectedDate = fromDateArray[2] +"-"+ fromDateArray[0] +"-"+ fromDateArray[1];
  return selectedDate;
}

function valDisPer(dp) {
	if(dp.length>5){ return false; }
	var discountPercent = dp.split(".");
	if(discountPercent.length>2){ return false; }
	else if(discountPercent.length>1){
		if(discountPercent[0].length>2){ return false; }
		else if(discountPercent[1].length>2){ return false; }
		else{ return true; }
	}else if(discountPercent[0].length>2){ return false; }
	else{ return true; }
}

function valDisAmt(da) {
	var discountPercent = da.split(".");
	if(discountPercent.length>2){ return false; }
	else if(discountPercent.length>1){ if(discountPercent[1].length>2){ return false; }else{ return true; } }
	else{ return true; }
}

function captchaResumeServerResponse(){
	if(http.readyState == 4 && http.status == 200){
		var results = trim(http.responseText);
		if(results == "1" || results == 1){ document.saveResume.submit();  }
		else{ showError('<li>Text Entered Does Not Match with Captcha Image</li>'); Recaptcha.reload(); return false; }			
	}
}

function showError(message){ try{ $('#eMsg').html(message); $('#failure').addClass('in').show();}catch(e){ alert(e);};}
function showSucess(message){ $('#sMsg').html(message); $('#success').addClass('in').show(); }