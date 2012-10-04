var countdownUpdateInterval=1000;
var graphUpdateInterval=300000;
var targetDate;


function doBefore() 
{
    $(".countdown-header").text("The bad news is ...");
    $(".countdown-footer").text("Get Back to work!");
}
function doAfter() 
{
	$(".countdown-header").text("The good news is ...");
    $(".countdown-footer").text("You should probably be drinking right now!");
}

function updateDate()
{
	var _currentTime = new Date();
	var _timeDifferenceInSeconds;
	var _prefix = "It's ";
	var _suffix = " before your thesis is due!";
	
	if(targetDate != undefined){
		if(_currentTime < targetDate){
			//We still have time
			_timeDifferenceInSeconds = Math.round((targetDate - _currentTime) / 1000);
			doBefore();
		}else{
			//We've gone past
			timeDifferenceInSeconds = Math.round((_currentTime - targetDate) / 1000);
			doAfter();
			_prefix = "It's been ";
			_suffix = " since you handed in your thesis!"
		}
	}
	if(_timeDifferenceInSeconds != undefined){	
		var _seconds = _timeDifferenceInSeconds % 60;
		var _minutes = Math.floor(_timeDifferenceInSeconds / 60) % 60;
		var _hours = Math.floor(_timeDifferenceInSeconds / (60 * 60)) % 24;
		var _days = Math.floor(_timeDifferenceInSeconds / (60 * 60 * 24));
		
		var _newText =	_prefix +
						_days + ((_days == 1) ? " day " : " days ") +
						_hours + ((_hours == 1) ? " hour " : " hours ") +
						_minutes + ((_minutes == 1) ? " minute " : " minutes ") +
						_seconds + ((_seconds == 1) ? " second " : " seconds ") +
						_suffix;
		
		$(".countdown-clock").text(_newText);
	}
	setTimeout("updateDate()", countdownUpdateInterval);
}

function updateGraph(){
	//We just need to change the source and the image will update
	$(".graph").attr("src", "progress.png?" + new Date().getTime());
	setTimeout("updateGraph()", graphUpdateInterval);
}

function start(date) {
	targetDate = new Date(date);
	updateDate();
	$("#countdown").fadeIn(1000);
	setTimeout("updateGraph()", graphUpdateInterval);
}

$(document).ready(function() {
	start("October 23, 2012 17:00:00");
});