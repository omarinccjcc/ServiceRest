var assistedSeeding = true;
var SELECT_SELECTOR = '#schedule-form select';
var GET_UNUSED_COMPETITORS = getCompetitorsForThisRound;


function getSelectSelector(count) {
	return "#id_competitor-" + count + "-competitor";
} 

function disableAssistedSeeding() {
	assistedSeeding = false;
	$("#assisted-seeding").removeAttr("checked");
}
function enableAssistedSeeding() {
	assistedSeeding = true;
	$("#assisted-seeding").attr("checked", "checked");
}
function toggleAssistedSeeding() {
	if (assistedSeeding) {
		disableAssistedSeeding();
	} else {
		enableAssistedSeeding();
	}
}

function getFirstSelect() {
	return $(getSelectSelector(0));

}

function getCompetitorsValue () {
	var first = getFirstSelect();
	var competitors = Array();
	var options = first.find('option[value!=""]');
	var byeId = getByeId();
	var includeBye = false;
	options.each(function(i, el){
		if ($(el).val() == byeId) {
			includeBye = true;
		}
		competitors.push($(el).val());
	});
	if (byeId != null && byeId != "False" && !includeBye) {
		competitors.push(byeId);
	}
	return competitors;
}

/*
 * Returns the name of the scheduling function 
 */
function getScheduling() {
	var page = $("#page");
	 
	if (page.hasClass("round_robin") || page.hasClass("round_robin_ar") || page.hasClass("round_robin_multi")) {
		return "round_robin";
	} else if (page.hasClass("knockout")) {
		return "knockout";
	}
}

function getSchedulingFunction () {
	var scheduleName = getScheduling();
	if (scheduleName == "round_robin") {
		return round_robin;
	} else if (scheduleName == "knockout") {
		return knockout;
	}
	
}

function sortRRcompetitors(competitors)
{
	var bye = getByeId();
	var temp = -1;
	var swap = 0;
	for (var i = 0; i < competitors.length; i++) {
		if (competitors[i] == bye) {
			temp = i;
		}
	}
	if (temp != -1) {
		swap = competitors[0];
		competitors[0] = competitors[temp];
		competitors[temp] = swap;
	}
	return competitors;
}
	

function round_robin(competitors) {
	competitors = sortRRcompetitors(competitors);
	n_comp = competitors.length;
	$('.match_holder select').each(function(i, el){
		var opt = $(el).find('option[value="'+getByeId()+'"]');
		if (opt.length == 0) {
			$(el).append('<option value="'+getByeId()+'">*</option>');
		}
	});
	var i = 0;
	var r = 1;
	var m = 0;
	while (true) {
		var select = $(getSelectSelector(i));
		if (select.length != 1) {
			break;
		}
		i++;
		var cond = (i%2 == 0) ? (m%2 == 1 || (m==0 && r%2==0)) : !(m%2 == 1 || (m==0 && r%2==0));
		var comp = 0;
		if (cond){
			comp = competitors[m]
		} else {
			comp = competitors[n_comp - m - 1]
		}
		select.val(comp);
		if (i%2 == 0){
			m++;
		}
	
		if (i % n_comp == 0) {
			competitors.rotate();
			r++;
			m = 0;
		}
		
		
	}
	$('.match_holder select').each(function(i, el) {
		$(el).attr("oldValue", $(el). val());
	});
	if (getByeId() != "False") {
		sendByeMatchToBottom();
	}
	$('.match_holder select').each(function(i, el) {
		$(el).attr("oldValue", $(el). val());
	});
	removeByeOption();
	return false;
}

function replaceByeSelect() {
	/*
	 * Nel solo round robin la select con il bye rimane invariata e non può essere modificata
	 */
	if (getScheduling() == 'round_robin') {
		$('.match_holder select option[value="' + getByeId() + '"][selected="selected"]').each(function(i, el) {
			$(el).parent().hide();
			$(el).parent().after($(el).text());
		});
	}
}
function removeByeOption() {
	/*
	 * Nel solo round robin l'option con il bye viene tolto via javascript
	 */
	
	if (getScheduling() == 'round_robin') {
		$('.match_holder select option[value="' + getByeId() + '"]').each(function(i, el){
			if (!$(el).attr("selected")) {
				$(el).remove();
			}
		});
	}
}

function swapSelects(s1,s2) {
	$(s1).val($(s2).attr("oldValue"));
	$(s2).val($(s1).attr("oldValue"));
	$(s1).attr("oldValue", $(s1).val());
	$(s2).attr("oldValue", $(s2).val());
}

function swapMatches(m1,m2) {
	if (m1 != m2) {
		selects1 = $(m1).find("select");
		selects2 = $(m2).find("select");
		for (i = 0; i < selects1.length; i++) {
			swapSelects(selects1[i], selects2[i]);
		}
	}
}


function sendByeMatchToBottom(){
	var competitors = getCompetitorsValue();
	for (var i = 1; i < competitors.length; i++) {
		var match_bye = null;
		var last_match = null;
		
		$('.rg_'+i+' .match_holder').each(function(ind,match) {
			if (matchIsBye(match)) {
				match_bye = match;
				var selects = $(match).find("select");
				if (compIsBye(selects[0])) {
					swapSelects(selects[0], selects[1]);
				}
			}
			if (ind == competitors.length / 2-1) {
				last_match = match;
			}
		});
		//Swappo il bye match con l'ultimo
		swapMatches(match_bye,last_match); 	
	}
}

function knockoutByePosition(max, base, depth) {
	if (base == null) {
		base = 0;
	}
	if (depth == null) {
		depth = 0;
	}
	if (depth == max) {
		return new Array(base, base + Math.pow(2, depth));
	}
	else{
		var branch1 = knockoutByePosition(max, base, depth + 1);
		var branch2 = knockoutByePosition(max, base + Math.pow(2, depth), depth + 1);
		return branch1.concat(branch2);
	}
}

function knockout(competitors) {
	var max = Math.ceil(Math.log(competitors.length)/Math.LN2); // numero di round
	var bye_competitors_number = Math.pow(2, max) - competitors.length;
	var bye_competitors_position = knockoutByePosition(max - 2).slice(0, bye_competitors_number);
	bye_competitors_position.sort();
	
	var j = 0;
	var k = 0;
	$('.rg_0 select').each(function(i, el){
		if ((j < bye_competitors_number) && (i == bye_competitors_position[j] * 2 + 1)) {
			j++;
		} else {
			$(el).val(competitors[k]);
			$(el).attr("oldValue", $(el).val());
			k++;
		}
	});
	return false;
}

function _regenerate() {
	disableAssistedSeeding();
	var competitors = getCompetitorsValue();
	competitors.shuffle();
	getSchedulingFunction()(competitors);
	enableAssistedSeeding();
	$('#schedule-form .match_holder').removeClass('same_competitors');
	qualifyWinner();
	
}

function regenerateSchedule() {
	emptySchedule();
	setTimeout('_regenerate()', 300);
	return false;
}

function setOldVal(i, el) {
	$(el).attr("oldValue", $(el).val());
	if ($(el).val() == "") {
		disableAssistedSeeding();
	}
}

function swapSelectValues(select, upperElement) {
	var toVal = $(select).val();
	var fromVal = $(select).attr("oldValue");
	var highlightList = Array();
	var fromEl = Array();
	var toEl = Array();
	if (toVal != "") {
		fromEl = $(upperElement).find("select").filter(function () {return $(this).attr("oldValue") == fromVal});
		toEl = $(upperElement).find("select").filter(function () {return $(this).attr("oldValue") == toVal});
		if (fromVal != "") {
			fromEl.each(function(i,el){
				$(el).val(toVal);
				$(el).attr("oldValue", $(el).val());
				highlightList.push($(el).parent());
			});
		}
		toEl.each(function(i,el){
			$(el).val(fromVal);
			$(el).attr("oldValue", $(el).val());
			highlightList.push($(el).parent());
		});
		$(select).val(toVal);
	}
	$(highlightList).each(function(i,el){
		$(el).effect("highlight", {'color': '#4CC0FF'}, 2000);
	});
	select.attr("oldValue", select.val());
}

/*
 * Used by Configure schedule and Configure phases
 */ 
function initConfigure() {
	/*
	 * Viene salvato il valore corrente della select, in modo
	 * da poterlo utilizzare dopo il change
	 */

	$(SELECT_SELECTOR).each(setOldVal);

	/*
	 * Evidenziare nella tendina di scelta i competitor non ancora inseriti in questo round
	 */
	$(SELECT_SELECTOR).focus(function (ev){
		var sel = ev.target;
		var competitorsAlreadyPlaying = GET_UNUSED_COMPETITORS(sel);
		$(sel).find('option').each(function(i, el) {
			var value = $(el).attr('value');
			if ( value != "" && jQuery.inArray(value, competitorsAlreadyPlaying) == -1 ) {
				$(el).css({"font-weight": "bold", "color": "#000000"});
			} else {
				$(el).css({"font-weight": "", "color": "#666666"});
			}
		});
	});

}

function initSchedule() {

	enableAssistedSeeding();
	initConfigure();

	/*
	 * Quando si cambia un competitor tutto lo schedule viene
	 * aggiornato in modo coerente
	 */
	$(SELECT_SELECTOR).change(function (ev){
		var sel = $(ev.target);
		var fromVal = sel.attr("oldValue");
		var toVal = sel.val();
		if (toVal == "") {
			disableAssistedSeeding();
		}
		if (assistedSeeding) {
			var upperElement = '#schedule-form';
		} else {
			var rg_class = getRoundGrouperClass(sel);
			var upperElement = '#schedule-form .' + rg_class;
		}
		swapSelectValues(sel, upperElement)

		findSameCompetitorsMatch();

		qualifyWinner();

		return false;
	});


	/*
	 * Drag & Drop per scambiare match tra round_grouper
	 */
	var scheduleName = getScheduling();
	var first = $(getSelectSelector(0));
	var rg_class = getRoundGrouperClass(first);
	var round_selector = '.round_grouper';
	if (scheduleName == 'knockout') {
		round_selector += '.' + rg_class;
	}
	$(round_selector).css("cursor", "move");
	$(round_selector).draggable({
		addClasses: false,
		revert: true,
		zIndex: 2700,
		start: function(event, ui) {
			$(event.target).addClass("drag-move");
		},
		stop: function(event, ui) {
			$(event.target).removeClass("drag-move");
		}
	});
	$(round_selector).droppable({
		addClasses: false,
		drop: function(event, ui) {
			swapMatchesBetweenRounds($(this), ui.draggable);
			$(this).find('select').parent().effect("highlight", {'color': '#4CC0FF'}, 2000);
			$(ui.draggable).find('select').parent().effect("highlight", {'color': '#4CC0FF'}, 2000);
			$(event.target).removeClass("drop-over");
			qualifyWinner();
		},
		over: function(event, ui) {
			$(event.target).addClass("drop-over");
		},
		out: function(event, ui) {
			$(event.target).removeClass("drop-over");
			
		}
	});
	$("td.versus a").click(function(ev) {
		var l = $(ev.target);
		var s1 = l.parent().prev().find("select");
		var s2 = l.parent().next().find("select");
		swapSelects(s1, s2);
		return false;
	});

	qualifyWinner();

	replaceByeSelect();
	removeByeOption();
}

function swapMatchesBetweenRounds(round1, round2) {
	var selects1 = $(round1).find('select');
	var selects2 = $(round2).find('select');
	for (i = 0; i < selects1.length; i++) {
		val1 = $(selects1[i]).val();
		$(selects1[i]).val($(selects2[i]).val());
		$(selects2[i]).val(val1);
		$(selects1[i]).attr("oldValue", $(selects1[i]).val());
		$(selects2[i]).attr("oldValue", $(selects2[i]).val());
	}
}

function getCompetitorsForThisRound(select) {
	var rg_class = getRoundGrouperClass(select);
	var competitors = Array();
	$('#schedule-form .' + rg_class + ' select').each(function(i, el){
		var val = $(el).val();
		if (val != "") {
			competitors.push(val);
		}
	});
	return competitors;
}

function getRoundGrouperClass(el) {
	var round_grouper = null;
	if ($(el).hasClass("round_grouper")) {
		round_grouper = $(el);
	} else {
		round_grouper = $(el).parents('.round_grouper');
	}
	return round_grouper.attr("class").match(/rg_\d+/)[0];
}

function emptySchedule() {
	$(SELECT_SELECTOR).each(function(i,el){
		if ($(el).val() != getByeId()) {
			$(el).val("");
			$(el).attr("oldValue", $(el).val());
		}
	});
	disableAssistedSeeding();
	qualifyWinner();
	return false;
}

function setCompetitorsInMatchHolder() {
	$('.match_holder').each(function(i, mh){
		mh.competitors = Array();
		$(mh).find('select').each(function(i, s){
			mh.competitors.push($(s).val());
		})
	})
}
function haveSameCompetitors(mh1, mh2) {
	if (mh1.competitors[0] != "" && mh1.competitors[1] != "" &&
		(mh1.competitors[0] == mh2.competitors[0] && mh1.competitors[1] == mh2.competitors[1] ||
		mh1.competitors[0] == mh2.competitors[1] && mh1.competitors[1] == mh2.competitors[0])) {
		return true;
	} else {
		return false;
	}
}
function findSameCompetitorsMatch() {
	setCompetitorsInMatchHolder();
	var groupClass = '';
	if (getScheduling() == 'knockout') {
		groupClass = '.rg_0';
	}
	var mh_list = $('.match_holder' + groupClass);
	$(mh_list).removeClass("same_competitors");
	for (i = 0; i < mh_list.length; i++) {
		for (j = i + 1; j < mh_list.length; j++) {
			if (haveSameCompetitors(mh_list[i], mh_list[j])) {
				$(mh_list[i]).addClass("same_competitors");
				$(mh_list[j]).addClass("same_competitors");
			}
		}
	}
}

function getByeId(){
	var input = $("input[name='bye_id']");
	if (input.length > 0) {
		return $("input[name='bye_id']").val();
	} else {
		return null;
	}
}

function qualifyWinner() {
	if (getScheduling() == 'knockout') {
		var rg_0_list = $('.match_holder.rg_0');
		var rg_1_list = $('.match_holder.rg_1 .competitorName');
		var i = 0;
		rg_0_list.each(function(i, el) {
			$(rg_1_list[i]).text((qualified(el)));
		});
	}
}

/**
 * 
 * @param matchEl
 * @return qualified competitor's name
 */
function qualified(matchEl) {
	var qualified = "";
	var bye = false;
	$(matchEl).find("select").each(function(i, el) {
		if (compIsBye(el)) {
			bye = true;
		} else {
			qualified = $(el).find('option[value="'+$(el).val()+'"]').text();
		}
	});
	if (bye) {
		return qualified;
	} else {
		return ""
	}
}

function compIsBye(el) {
	if ($(el).val() == "" && getScheduling() == "knockout") {
		return true;
	} else if ($(el).val() == getByeId() && getScheduling() == "round_robin") {
		return true;
	}
	return false;
}

function matchIsBye(matchEl) {
	var bye = false;
	$(matchEl).find("select").each(function(i, el) {
		if (compIsBye(el)) {
			bye = true;
		}
	});
	return bye;
}

/*
 * Utility functions
 */

// shuffle a list in place
// see: http://www.bytemycode.com/snippets/snippet/407/
(function () {
    var swapper =
        function (a,L,e) {
            var r = Math.floor(Math.random()*L);
            var x = a[e];
            a[e] = a[r];
            a[r] = x;
        };
    Array.prototype.shuffle =
        function () {                                                           
            var i,L;
            i = L = this.length;
            while (i--) swapper(this,L,i);
        };
})();

//rotate a list in place

Array.prototype.rotate =
    function () {
		var n = this.length;
		var last = this[n -1];
		for (i = n - 1; i > 0; i--) {
			this[i] = this[i - 1];
		}
		this[1] = last;
    };
