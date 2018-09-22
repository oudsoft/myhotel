//jquery.simpleGraphRoom.plugin.js
//ท่อนนี้เป็น plugin สำหรับแสดงกราฟ
//ข้อมูล input data = [roomname, {start, to, rsts, cname, ctel, cgid},...] , ....

 (function($){
    $.fn.simpleGraphRoom = function(data, settings){
         config = {
            'hday': 30,
            'hrow': 50,
			'leftRef': 100
        };
        if ( settings ){$.extend(config, settings);}

		gdata = data;
		load = new Array(config.hday+1);

		var init = function(self) {
			var graph = createRoomGraph(self);
			//console.log(JSON.stringify(graph));
			//console.log($(graph).html());
			//$(self).append(graph);
			$(self).html($(graph).html());
			return self;
		}

		init(this);

		return this;
	};

	$.fn.emptyTableGraph = function(me){
		table = $("");
		$(me).append(table)
		return me;
	};

	var config 
	var gdata;
	var load;
	var table;

	function createRoomGraph(me) {
		var divbox = $("<div id='graphBox'></div>");
		table = $("<table id='grapRoom' class='gridFram'></table>");
		for (var i = 0; i < gdata.length; i++) {
			var tr = $("<tr class='rowH'></tr>");
			clearLoad();
			fillLoadFor(i);
			//var rangeOB = createBookingRange(load);
			var rangeOB = createBookingNormalRange(load);
			for (var j = 0; j < rangeOB.length; j++) {
				var td;
				if (j != 0) {
					//console.log(JSON.stringify(gdata[i][j]));
					var roomid = "";
					var loadid = "";
					var st = rangeOB[j].st;
					var to = rangeOB[j].to;
					var sts = rangeOB[j].lsts;
					if (sts == 0) {
						//td = $("<td class='black' colspan='" + (to-st) + "'><div class='green'>" + (st+1) + " - " + (to+1) + "</div></td>");
						td = $("<td class='black'><div class='green'></div></td>");
					} else if (sts == 1){
						//td = $("<td class='black' colspan='" + (to-st) + "'><div class='red'>" + (st+1) + " - " + (to+1) + "</div></td>");
						// var litem = gdata[i].find(item => (item.start === st) && (item.to === to));
						// if (litem){ console.log(litem.roomid); }
						 var result = $.grep(gdata[i], function(e){ return (st >= e.start) && (st <= e.to); });
						 if (result.length > 0) {
							roomid = result[0].roomid;
							loadid = result[0].loadid;
 							td = $("<td class='black'><div class='yellow' onmouseover='boxlink(this, \"" + roomid +"\", \"" + loadid + "\")' id='" + loadid + j + "' onclick='showme(this, \"" + roomid +"\", \"" + loadid + "\")'> </div></td>");
						} else {
							td = $("<td class='black'><div class='yellow'> </div></td>");
						}
					} else if (sts == 2){
						//td = $("<td class='black' colspan='" + (to-st) + "'><div class='red'>" + (st+1) + " - " + (to+1) + "</div></td>");
						 var result = $.grep(gdata[i], function(e){ return (st >= e.start) && (st <= e.to); });
						 if (result.length > 0) {
							roomid = result[0].roomid;
							loadid = result[0].loadid;
 							td = $("<td class='black'><div class='red' onmouseover='boxlink(this, \"" + roomid +"\", \"" + loadid + "\")' id='" + loadid + j  +"' onclick='showme(this, \"" + roomid +"\", \"" + loadid + "\")'> </div></td>");
						} else {
							td = $("<td class='black'><div class='red'> </div></td>");
						}
					} else {
						td = $("<td class='black'><div class='silver'> </div></td>");
					}
				} else {
					var ob = gdata[i][j];
					var num = ob.roomnum;
					var name = ob.roomname;
					var rid = ob.roomid;
					//" + JSON.stringify(ob) + "
 					td = $("<td class='black'></td>");
					var button = $("<input type='button' value='" +   name + "' onclick='openRoomDesc(\"" +  rid + "\")'/>");
					td.append(button);
				}
				tr.append(td);
			}
			table.append(tr);
		}

		tr = createDateFooter();
		table.append(tr);
		tr = createMonthFooter();
		table.append(tr);
		divbox.append(table);
		$(me).append(divbox);
		return me;
	}

	function clearLoad() {
		for (var i=0; i < load.length; i++) {
			load[i] = 0;
		}		
	}

	function fillLoadFor(j) {
		for (var k=1; k < gdata[j].length; k++) {
			//console.log(gdata[j][k].start);
			//console.log(gdata[j][k].to);
			var st = gdata[j][k].start;
			var to = gdata[j][k].to;
			for (var l=st; l<= config.hday; l++) {
				if (l <= to) {
					load[l] = gdata[j][k].lsts;
				} else {
					load[l] =0;
				}
			}
		}
		load[0] = gdata[j][0];
	}

	function createBookingRange(ld) {
		var temp = [];
		var t = 0;
		var s = ld[t];
		var c = 0;
		var ob;
		for (var i=1; i < ld.length; i++) {
			if (i < ld.length-1) {
				if (ld[i] == s) {
					c++;
				} else {
					ob = {st: t, to: i-1, sts: s}
					temp.push(ob);

					c = 0;
					t = i;
					s = ld[t];
				}
			} else {
				ob = {st: t, to: i, sts: s}
				temp.push(ob);
			}
		}
		return temp;
	}

 	function createBookingNormalRange(ld) {
		var temp = [];
 		var ob;
		for (var i=0; i < ld.length; i++) {
			if (i != 0) {
				ob = {st: i, to: i+1, lsts: ld[i]}
				temp.push(ob);
			} else {
				temp[0] = ld[0];
			}
 		}
		return temp;
	}

	function createDateFooter() {
		var beginD = new Date();
		//var beginDay = beginD.getDate() + '/' 	+ (beginD.getMonth() + 1) + '/' 	+ (beginD.getFullYear());
		//var endD = new Date(beginD.getTime() + (30*86400000));
		//var endDay = endD.getDate() + '/' 	+ (endD.getMonth() + 1) + '/' 	+ (endD.getFullYear());
		//console.log(beginDay);
		//console.log(endDay);
		var tr = $("<tr class='rowH'></tr>");
		var td = $("<td class='black'><div class='upright'>วันที่</div></td>");
		tr.append(td);
		for (j = 1; j < config.hday+1; j++) {
			var endD = new Date(beginD.getTime() + (j*86400000));
			td = $("<td class='black'><div class='upright'>" + (endD.getDate()) + "</div></td>");
			tr.append(td);
		}
		return tr;
	}

	function createMonthFooter() {
		var monthNames = ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'];
		var tr = $("<tr class='rowH'></tr>");
		var td = $("<td class='black'><div class='upright'>เดือน/ปี</div></td>");
		var c = 0;
		tr.append(td);
		var beginD = new Date();
		var m = beginD.getMonth();
		for (j = 1; j < config.hday+2; j++) {
			var endD = new Date(beginD.getTime() + (j*86400000));
			if(endD.getDate() != 1) {
				c++;
			} else {

				td = $("<td class='black' colspan='" + c + "'><div class='upright'><b>" + monthNames[m] + " " + endD.getFullYear() + "</b></div></td>");
				tr.append(td);
				c = 0;
			}
		}
		m = endD.getMonth();
		td = $("<td class='black' colspan='" + c + "'><div class='upright'><b>" + monthNames[m] + " " + endD.getFullYear() + "</b></div></td>");
		tr.append(td);
		return tr;
	}

})(jQuery);


