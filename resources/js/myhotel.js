///my hotel

// ---> Global Varialble

var startDate; //timestamp var
var toDate; //timestamp var
var srooms = []; // ??????????????????????? user ?????
var myhotelOB = [];

// --> Global Function

Number.prototype.between = function(a, b) {
  var min = Math.min(a, b),
    max = Math.max(a, b);
  return this >= min && this <= max;
};

function showLoadingImage() {
	$(".thickbox").show();
	$("#main-content").append('<div id="loading-image" style="position: fixed; /* or absolute */ top: 50%;  left: 50%;"><img src="../resources/imgs/ajax-loader.gif" alt="Loading..." /></div>');
}

function showLoadingImageM() {
	$("body").append('<div id="loading-image" style="position: absolute; width: 100%;  top: 50%; bottom: 50%; left: 50%;"><img src="../resources/imgs/ajax-loader.gif" alt="Loading..." /></div>');
}

function showLoadingImageMT() {
	$("body").append('<div id="loading-image" style="position: absolute; width: 100%;  top: 40%; bottom: 50%; left: 40%;"><img src="../../resources/imgs/lg.ajax-spinner-gif.gif" alt="Loading..." /></div>');
}

function hideLoadingImage() {
	$("#loading-image").remove();
	$(".thickbox").hide();
}

function hideLoadingImageM() {
	$("#loading-image").remove();
}

function validateEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	return re.test(email);
}

function toDate(dateStr) {
    var parts = dateStr.split("/");
    return new Date(parts[2], parts[1] - 1, parts[0]);
}

function toDateM(dateStr) {
    var parts = dateStr.split("-");
    return new Date(parts[0], parts[1] - 1, parts[2]);
}

function datetostring(date) {
	var Adate = new Date(date);
	var dd = Adate.getDate();
	var mm = Adate.getMonth()+1; //January is 0!
	var yyyy = Adate.getFullYear();
	if(dd<10) {
		dd = '0'+dd
	} 
	if(mm<10) {
		mm = '0'+mm
	} 
	return dd + "/" + mm + "/" + yyyy;
}

function datetotimestring(date) {
	var Adate = new Date(date);
	var hh = Adate.getHours();
	var mm = Adate.getMinutes();
	var ss = Adate.getSeconds();
	if(hh<10) {
		hh = '0'+hh
	} 
	if(mm<10) {
		mm = '0'+mm
	} 
	if(ss<10) {
		ss = '0'+ss
	} 
	return hh + ":" + mm + ":" + ss;
}

function getParameterByName( name ){
	var regexS = "[\\?&]"+name+"=([^&#]*)", 
	regex = new RegExp( regexS ),
	results = regex.exec( window.location.search );
	if( results == null ){
		return "";
	} else{
		return decodeURIComponent(results[1].replace(/\+/g, " "));
	}
}

function copyToClipboard(value) {
	var $temp = $("<input>");
	$("body").append($temp);
	$temp.val(value).select();
	document.execCommand("copy");
	$temp.remove();
    var x = document.getElementById("snackbar")
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function formatDate(mdate) {
	var today = new Date(mdate);
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!

	var yyyy = today.getFullYear();
	if(dd<10){
		dd='0'+dd;
	} 
	if(mm<10){
		mm='0'+mm;
	} 
	var today = dd+'/'+mm+'/'+yyyy;
	return today;
}

function isSameDate(A,B) {
	var AA = new Date(A);
	var BB = new Date(B);
	if (AA.getFullYear() != BB.getFullYear()) {
		return false;
	} else {
		if (AA.getMonth() != BB.getMonth()) {
			return false;
		} else {
			if (AA.getDate() != BB.getDate()){
				return false;
			} else {
				return true;
			}
		}
	}
}

/*
if (!String.format) {
  String.format = function(format) {
    var args = Array.prototype.slice.call(arguments, 1);
    return format.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] != 'undefined'
        ? args[number] 
        : match
      ;
    });
  };
}
*/

function buildTermialID(terid) {
	var terT = String(terid);
	var cl = terT.length;
	var out = "";
	var i = 0;
	while (i + cl < 3){
		 out =  out.concat("0");
		 i++;
	}
	return out.concat(terT);
}

function buildRouteID(rouid) {
	var rouT = String(rouid);
	var cl = rouT.length;
	var out = "";
	var i = 0;
	while (i + cl < 2){
		 out =  out.concat("0");
		 i++;
	}
	return out.concat(rouT);
}

function buildPrefixRef(terid, rouid) {
	var out = "";
	out = out.concat(buildTermialID(terid));
	out = out.concat(buildRouteID(rouid));
	return out;
}

function nextSeqNo(cno) {
	var cnoS = String(cno + 1);
	var cl = cnoS.length;
	var out = "";
	var i = 0;
	while (i + cl < 10)	{
		 out =  out.concat("0");
		 i++;
	}
	return out.concat(cnoS);
}

function dow2Text(dow){
	if (dow==0){
		return "SUN";
	} else if (dow==1){
		return "MON";
	} else if (dow==2){
		return "TUE";
	} else if (dow==3){
		return "WED";
	} else if (dow==4){
		return "THU";
	} else if (dow==5){
		return "FRI";
	} else if (dow==6){
		return "SAT";
	} else {
		return "ERR";
	}
}

function timeout(milliseconds) {
	var deferred = $.Deferred();
	setTimeout(deferred.resolve, milliseconds);
	return deferred.promise();
}

function pushNoticationUserToken(title, message, sender, token /*, callback */) {
	$.post("https://us-central1-myhotel-4746f.cloudfunctions.net/sendPushNotification", {
		msg: message,
		token: token,
		title: title,
		sender: sender,
		replylink: 'https://myhotel-4746f.firebaseapp.com/tour/front/home.html',
		replyicon: 'resources/imgs/vanOS.png'
	},
	function(data) {
		//console.log(data);
		/* callback(data); */
	})
	.fail(function(response) {
		console.log(response);
		/* callback(response); */
		//alert('มีความผิดพลาดเกิดขึ้น เพื่อแก้ปัญหานี้ ระบบจะทำการรีเฟรชแอพลิเคชั่นใหม่ โปรดรอสักครู่');
		//window.location.reload(true); 
	});
}


function pushNoticationStaffToken(title, message, sender, token, tid /*, callback */) {
	$.post("https://us-central1-myhotel-4746f.cloudfunctions.net/sendPushNotification", {
		msg: message,
		token: token,
		title: title,
		sender: sender,
		replylink: 'https://myhotel-4746f.firebaseapp.com/tour/back/index.html?t=' + tid,
		replyicon: 'resources/imgs/vanOS.png'
	},
	function(data) {
		/* callback(data); */
		//console.log(data);
	})
	.fail(function(response) {
		console.log(response);
		/* callback(response); */
		//alert('มีความผิดพลาดเกิดขึ้น เพื่อแก้ปัญหานี้ ระบบจะทำการรีเฟรชแอพลิเคชั่นใหม่ โปรดรอสักครู่');
		//window.location.reload(true); 
	});
}

function isPhoneNo(input){
	var regExp = /^0[0-9]{8,9}$/i;
	return regExp.test(input);
}

function unique(arrayName){
	var newArray=new Array();
	label:for(var i=0; i<arrayName.length;i++ )	{  
		for(var j=0; j<newArray.length;j++ ){
			if(newArray[j]==arrayName[i]) 
				continue label;
		}
		newArray[newArray.length] = arrayName[i];
	}
	return newArray;
}

function executeAsync(mil, func) {
	setTimeout(func, mil);
}