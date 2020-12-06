

const PAGE_SCROLL_Y_THRESHOLD = 50;
const SCROLL_MOD = 40; //20.0; // how fast the scroll links go

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


const CHAR_DELAY = 60;
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

var currentScroll;
function smooth_scroll(to, current)
{
	current = current || window.pageYOffset;
	
	v = SCROLL_MOD * clamp01(to - current)
	newY = current + v;
	window.scrollTo(0, newY);
	
	if (Math.abs(current - to) > SCROLL_MOD && newY - window.pageYOffset <= SCROLL_MOD * 2)
	{
		clearTimeout(currentScroll);
		currentScroll = setTimeout(
			function()
			{
				smooth_scroll(to, newY)
			},
			SCROLL_MOD
		)
	}
}

function init() {
	window.setTimeout(displayScreenText, 500);
	
	/*var linkHome = document.getElementById("link_home");
	var linkServices = document.getElementById("link_services");
	
	linkHome.href = "javascript:smooth_scroll(window.innerHeight * (105/100));";
	linkServices.href = "javascript:smooth_scroll(window.innerHeight * (215/100));";*/
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

