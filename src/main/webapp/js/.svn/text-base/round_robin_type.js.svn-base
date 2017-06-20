

function toggleSelect() {
        if ($("input[name='scheduling_function']:checked").val() == 'round_robin_multi') {
            $("#id_robin_times").removeAttr('disabled');
        } else {
            $("#id_robin_times").attr('disabled', 'disabled');
        }
    }
	
function updateTotalRounds() {
        var times = 1;
        if ($("input[name='scheduling_function']:checked").val() == 'round_robin_ar') {
            times = 2;
        } else if ($("input[name='scheduling_function']:checked").val() == 'round_robin_multi') {
            times = $("#id_robin_times").val();
        }
        var baseRounds = $(".round_grouper").length;
		if (baseRounds > 0) {
	        $("#total-rounds").text(baseRounds * times);
		} else {
			$("#total-rounds").parent().hide();
		}
    }
	;
	
$(document).ready(function(){
        toggleSelect();
        updateTotalRounds();
        
        $("input[name='scheduling_function']").change(function() {
            toggleSelect();
            updateTotalRounds();
        });
        $("select[name='robin_times']").change(updateTotalRounds);
    });
