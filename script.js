var buttonContainer = null;
var buttonCategories = [];
var mainIsOn = true;


$(document).ready(function() {
	requestState();
	
	buttonContainer = $("#button-container");
	$('.category').each(function(i, category) {
		buttonCategories.push($(category));
	});
	buttonCategories.splice(0, 1); // Remove main category (first)
});

function setState(buttonName, state) {
	buttonName = "#" + buttonName;
	
	if (state == "1")
	{
		$(buttonName + "On").addClass("selected");
		$(buttonName + "Off").removeClass("selected");
	}
	else
	{
		$(buttonName + "Off").addClass("selected");
		$(buttonName + "On").removeClass("selected");
	}
	
	checkMainCategory();
}

function requestState() {
	$.get("state", function(data) {
		setState("main", data.charAt(0));
		setState("livingR", data.charAt(1));
		setState("bathR", data.charAt(2));
		setState("kitchen", data.charAt(3));
		setState("bedR", data.charAt(4));
		
		setTimeout(requestState, 1000);
	}, "text").fail(function() {
		console.log("Request failed.");
		setTimeout(requestState, 1000);
	});
}
function submitState(room, state) {
	$.get("submit?room=" + room + "&state=" + state, function(data) {
		console.log("Submitted new state of " + room + ", sent " + state);
		setState(room, state);
	}, "text");
}

function checkMainCategory() {
	var mainShouldBeOn = $("#mainOn").hasClass("selected");
	
	if (mainShouldBeOn != mainIsOn)
	{
		mainIsOn = mainShouldBeOn;
		
		if (mainIsOn)
		{
			for (var i = 0; i < buttonCategories.length; i++)
				buttonCategories[i].appendTo(buttonContainer);
		}
		else
		{
			for (var i = 0; i < buttonCategories.length; i++)
				buttonCategories[i].detach();
		}
	}
}
