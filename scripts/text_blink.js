const PAGE_SCROLL_Y_THRESHOLD = 50;

var banner = document.getElementById("banner");
var bannerDummy = document.getElementById("banner_dummy");

var initialBannerZIndex = banner.style.zIndex;
var initialBannerDummyZIndex = bannerDummy.style.zIndex;




function clamp01(num)
{
	ret = num;

	min = -1;
	max = 1;

	if (num < min)
	{
		ret = min;
	}
	else if (num > max)
	{
		ret = max;
	}

	return ret;
}

window.addEventListener("scroll", function(e)
	{
		var viewPosY = window.pageYOffset;
		
		if (viewPosY >= window.innerHeight - PAGE_SCROLL_Y_THRESHOLD) {
			banner.style.zIndex = "2";
			bannerDummy.style.zIndex = "1";
			
			bannerDummy.style.top = "0";
			
			banner.style.color = "rgb(0, 0, 0)";
		} else {
			banner.style.zIndex = initialBannerZIndex;
			bannerDummy.style.zIndex = initialBannerDummyZIndex;
			
			bannerDummy.style.top = "-" + window.getComputedStyle(banner, null).getPropertyValue("height");
			
			banner.style.color = "rgb(255, 255, 255)";
		}
	}
)


const CHAR_DELAY = 70;
var short1 = document.getElementById("short1");
var msg = short1.innerText;
short1.innerText = "";
var isThingAdded = true;


var letterIndex = 0;
function displayScreenText() {
	
	if (msg[letterIndex] == ' ') {
		short1.innerText += '\xa0'; // space character
	} else {
		short1.innerText += msg[letterIndex];
	}
	
	letterIndex++;
	// SET textFinishedDisplay TO TRUE WHEN THIS FINISHED
	if (letterIndex < msg.length) {
		window.setTimeout(displayScreenText, CHAR_DELAY);
	} else {
		// when the text is complete, this 'else' clause executes
		window.setTimeout(
			function() { document.getElementById("short1_lower").style.visibility = "visible"; },
		800);
		
		addBlinker();
	}
}

function init() {
	window.setTimeout(displayScreenText, 500);
}

function addBlinker() {
	window.setInterval(function() {
		isThingAdded = !isThingAdded;
		if (isThingAdded) {
			short1.innerText = short1.innerText.substr(1).slice(0, -1);
		} else {
			short1.innerText = '\xa0' + short1.innerText + "_";
		}
	}, 500)
}
