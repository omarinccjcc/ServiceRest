/* REGENERATE SCHEDULE FUNCIONS */

var hasBeenEmptyValue = false;
function getCompetitors()
{
	var competitors = new Array();
	for (var i = 0; i < parseInt($(".real-form #id_form-TOTAL_FORMS").val()); i++)
	{	
		competitors[i] = new Array()
		competitors[i][0] = $(".real-form #id_form-"+i+"-id").val() 
		competitors[i][1] = $(".real-form .rname-"+i).val() 
	}
	return competitors
}

function setValue(el,value)
{
	$(el).val(value)
}

function getCompetitorSelectors()
{
	var selectors = new Array()
	$(".groups-configuration fieldset").each(function (i, el) {
		$(el).find("select").each(function(j, el){
			selectors.push(el)
		})
	})
	return selectors
}

function _regenerate() {
	hasBeenEmptyValue = true;
	var competitors = getCompetitors();
	selectors = getCompetitorSelectors()
	competitors.shuffle();
	for (var k = 0; k < competitors.length; k++){
		temp_val = competitors[k][0]
		setValue(selectors[k], temp_val)
		setOldVal(k,temp_val)
	}
	hasBeenEmptyValue = false;
	marshalData()
}





/*--------------------------------------------*/

function getGroupsNumber() {
	return $(".groups-configuration fieldset").length;
}

function changeGroupsNumber(n) {
	if (n > getGroupsNumber()) {
		var old_groups_selector = $(".groups-configuration fieldset");
		var new_groups = new Array();
		var new_groups_count = 0;
		for (var i = getGroupsNumber(); i < n; i++) {
			var cl = "";
			if (i % 2 == 0) cl = "table-right";
			$(".groups-configuration ").append(fieldsetElement(i, 'new_group ' + cl, GROUP_NAMES[i], " "));
			new_groups_count++;
		}
		var new_groups_selector = $(".groups-configuration fieldset.new_group");
		var c_per_group =Math.floor(getCompetitors().length/getGroupsNumber());
		for (var j = 0; j < c_per_group *new_groups_count; j++)	{
			old_groups =  getGroupsElementNumber(old_groups_selector, null);
			new_groups =  getGroupsElementNumber(new_groups_selector, null);
			old_groups.sort(function(a,b){return a[0] - b[0]});
			new_groups.sort(function(a,b){return a[0] - b[0]});
            el = $(old_groups[old_groups.length-1][1]).find("ul li:last-child");
			$(new_groups[0][1]).find("ul").append(el);
			$(el).effect("highlight", {'color': '#4CC0FF'}, 2000);
		}
		initDragAndDrop();
	} else if (n < getGroupsNumber()) {
		var first_fieldset = $(".groups-configuration fieldset:first-child");
		for (var i = getGroupsNumber(); i > n; i--) {
			last_child = $(".groups-configuration fieldset:last-child");
			last_child.find("ul li").each(function(t,el){
				groupsElNumber =  getGroupsElementNumber(null,last_child);
				groupsElNumber.sort(function(a,b){return a[0] - b[0]});
				$(groupsElNumber[0][1]).find("ul").append(el);
				$(el).effect("highlight", {'color': '#4CC0FF'}, 2000);
			});
			last_child.remove();
		}
	}
}

function getGroupsElementNumber(selector, to_exclude){
	var groups = new Array();
	if (selector == null) {
		selector = $(".groups-configuration fieldset");
	}
	selector.each(function(i, el){
		if (!(to_exclude != null && $(el).attr("id") == to_exclude.attr("id"))) {
			var count = 0;
			groups[i] = new Array();
			$(el).find("select").each(function(j, el) {
				count = j;
			});
			groups[i][0] = count + 1;
			groups[i][1] = el;
		}
	});
	return groups;
}
	
function updateVariables() {
	$(".groups-configuration fieldset").each(function(i, el) {
		if ($(el).find("li") == null  || $(el).find("li").length < 2) {
			$(el).addClass("not-enough");
		} else {
			$(el).removeClass("not-enough");
		}
        $(el).find("legend span:last-child").text("(" + $(el).find("li").length + " " + $("#competitor-name").text() + ")");
	});
	marshalData();
}

function marshalData() {
	$(".groups-configuration fieldset").each(function (i, el) {
		$(el).find("select").each(function(j, el) {
			var competitor_id = $(el).val();
			var input_el_id = $(".real-form input[value='"+competitor_id+"'][id$='-id']").attr("id");
			if (typeof input_el_id != 'undefined') {
				var base_input_id = input_el_id.substring(0, input_el_id.length - 2);
				var group_input_id = base_input_id + "group_order";
				$('#' + group_input_id).val(i);
				var tie_breaker_input_id = base_input_id + "tie_breaker";
				$('#' + tie_breaker_input_id).val(j);
			}
		});
	});
}

function unmarshalData() {
	var competitors_n = $(".real-form input#id_form-TOTAL_FORMS").val();
	var groups = Array();
    for (i = 0; i < $("#id_groups_number").val(); i++) {
        groups.push(Array());
    }
	var competitors = Array({"value": "", "text": "----", "tie_break": 0});
	for (var i = 0; i < competitors_n; i++) {
		var competitor_id = $(".real-form input#id_form-"+i+"-id").val();
		var competitor_name = $(".real-form input#.rname-"+i).val();
		var tie_break = $(".real-form input#id_form-"+i+"-tie_breaker").val();
		var group_order = $(".real-form input#id_form-"+i+"-group_order").val();
		competitor = {"value": competitor_id, "text": competitor_name, 'tie_break': tie_break};
		groups[group_order].push(competitor);
		competitors.push(competitor);
	}
	for (var i = 0; i < groups.length; i++) {
		var group = groups[i];
		group.sort(function(a, b) {
			return a.tie_break > b.tie_break;
		});
		var cl = "";
		if (i % 2 == 0) {
			cl = "table-right"
		};
		var content = '';
		for (var j = 0; j < group.length; j++) {
			var competitor = group[j];
			content += '<li><select>';
			for (var k = 0; k < competitors.length; k++) {
				var comp = competitors[k];
				content += '<option value="'+ comp.value +'"';
				if (comp.value == competitor.value) {
					content += ' selected="selected"';
				}
				content += '>'+ comp.text +'</option>';
			}
			content += '</select></li>';
		}
		var fieldset_str = fieldsetElement(i, cl, GROUP_NAMES[i], content);
		$(".groups-configuration").append(fieldset_str);
	}
}

function hiddenInput(name, value) {
	return '<input name="' + name + '" value="' + value + '" type="hidden" />';
}

function fieldsetElement(id, cssClass, name, content) {
	var warning_str = $('#not-enough-message').text();
	return '<fieldset id="g_' + id + '" class="span5 ' + cssClass + '"><legend><span class="group-name">' + name + '</span> <span></span></legend><div class="warning hide">' + warning_str + '</div><ul class="unstyled">' + content + '</ul></fieldset>';
}

function initDragAndDrop() {
	$("fieldset ul").sortable({
		connectWith: 'fieldset ul',
		placeholder: 'select-placeholder',
		forcePlaceholderSize: true,
		update: updateVariables
	}).disableSelection();
}

$(document).ready(function(){
	SELECT_SELECTOR = '.groups-configuration fieldset select';
	GET_UNUSED_COMPETITORS = function (sel) {
		var competitors = Array();
		$(SELECT_SELECTOR).each(function(i, el){
			var val = $(el).val();
			if (val != "") {
				competitors.push(val);
			}
		});
		return competitors;
	}
	GROUP_NAMES = Array();
	$('ul#group-names li').each(function(i, el){
		GROUP_NAMES.push($(el).text());
	});

	unmarshalData();

	initDragAndDrop();

	initConfigure();
	$(SELECT_SELECTOR).change(function (ev) {
		swapSelectValues($(ev.target), ".groups-configuration");
		updateVariables();
	});
	$('#id_groups_number').change(function(ev) {
		changeGroupsNumber($(ev.target).val());
		updateVariables();
	});
    updateVariables();
	$("#empty-schedule").click(emptySchedule);
	$("#regenerate").click(function() {
		return regenerateSchedule();
	});
});

