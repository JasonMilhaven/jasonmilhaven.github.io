

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
//const MSG = "What's this you've said to me, my good friend? Ill have you know I graduated top of my class in conflict resolution, and Ive been involved in numerous friendly discussions, and I have over 300 confirmed friends. I am trained in polite discussions and I'm the top mediator in the entire neighborhood. You are worth more to me than just another target. I hope we will come to have a friendship never before seen on this Earth. Don't you think you might be hurting someone's feelings saying that over the internet? Think about it, my friend. As we speak I am contacting my good friends across the USA and your P.O. box is being traced right now so you better prepare for the greeting cards, friend. The greeting cards that help you with your hate. You should look forward to it, friend. I can be anywhere, anytime for you, and I can calm you in over seven hundred ways, and that's just with my chess set. Not only am I extensively trained in conflict resolution, but I have access to the entire group of my friends and I will use them to their full extent to start our new friendship. If only you could have known what kindness and love your little comment was about to bring you, maybe you would have reached out sooner. But you couldn't, you didn't, and now we get to start a new friendship, you unique person. I will give you gifts and you might have a hard time keeping up. You're finally living, friend.";
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
	//window.setTimeout(displayScreenText, CHAR_DELAY)
	window.setTimeout(displayScreenText, 500);
	
	var linkHome = document.getElementById("link_home");
	var linkServices = document.getElementById("link_services");
	
	linkHome.href = "javascript:smooth_scroll(window.innerHeight * (105/100));";
	linkServices.href = "javascript:smooth_scroll(window.innerHeight * (215/100));";
	
	
	
	
	/*banner.style.zIndex = initialBannerZIndex;
	bannerDummy.style.zIndex = initialBannerDummyZIndex;
	//bannerDummy.style.top = "-" + window.getComputedStyle(banner, null).getPropertyValue("height");		
	banner.style.color = "rgb(255, 255, 255)";*/
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

