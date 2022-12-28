const gameplayElementsContainer = document.getElementById("gameplay-elements-container");
const homeElementsContainer = document.getElementById("home-elements-container");
const homeButton = document.getElementById("home-button");

const menuContainer = document.getElementById("menu-container");

const playButton = document.getElementById("play-button");
const howToPlayButton = document.getElementById("how-to-play-button");
const aboutButton = document.getElementById("about-button");
const settingsButton = document.getElementById("settings-button");
const playTextContainer = document.getElementById("play-text-container");
const howToPlayTextContainer = document.getElementById("how-to-play-text-container");
const settingsTextContainer = document.getElementById("settings-text-container");
const aboutTextContainer = document.getElementById("about-text-container");

const highScoreText = document.getElementById("high-score-text");
highScoreText.textContent = "HIGH SCORE: " + localStorage.getItem("highscore");

const gameplayContainer = document.getElementById("gameplay-container");

const twoCountryButton = document.getElementsByClassName("two-country-button");
const countryOneButton = document.getElementById("country-1-button");
const buttonOneSpan = document.getElementById("button-1-span");
const countryOrText = document.getElementById("country-or-text");
const countryTwoButton = document.getElementById("country-2-button");
const buttonTwoSpan = document.getElementById("button-2-span");

const streakBox = document.getElementById("streak-box");

const lifeOne = document.getElementById("life-1");
const lifeTwo = document.getElementById("life-2");
const lifeThree = document.getElementById("life-3");

const timerBar = document.getElementById("timer-bar");

const popup = document.getElementById("popup");
const popupBackground = document.getElementById("popup-background");
const popupMainMessage = document.getElementById("popup-main-message");
const popupExplainMessageOne = document.getElementById("popup-explain-message-1");
const popupExplainMessageTwo = document.getElementById("popup-explain-message-2");
const popupExplainMessageThree = document.getElementById("popup-explain-message-3");
const popupButton = document.getElementById("popup-button");

const settingsPopup = document.getElementById("settings-popup");
const flagOnyModeCheckbox = document.getElementById("flag-only-switch");
const isAudioEnabledCheckbox = document.getElementById("audio-switch");

//flagOnyModeCheckbox.checked = false;
//isAudioEnabledCheckbox.checked = false;

//Setup variables
let correct = 0;
let country1;
let country2;
let life = 3;
/*
 |LEVEL	|STREAK	|RANGE	|COLOR 	|
 |	0	|0-3	|50		|#FFFFFF|
 |	1	|4-7	|30		|#FFF0AA|
 |	2	|8-11	|20		|#FFD88C|
 |	3	|12-15	|15		|#FF9151|
 |	4	|16-19	|10		|#D83324|
 |	5	|20+	|5		|#991A1E|
*/
let streak = 0;
let range = 50;

let flagOnlyMode = 0;
let isAudioEnabled = 0;

const roundTime = 5;
let timer = "";



if(isAudioEnabledCheckbox.checked == true) {
	isAudioEnabled = 1;
}
if(flagOnyModeCheckbox.checked == true) {
	flagOnlyMode = 1;
}

setFontSize();

const correctNoise = new Audio("sounds/correct.mp3");
const incorrectNoise = new Audio("sounds/incorrect.mp3");
const whooshNoise = new Audio("sounds/whoosh.mp3");

let countryListArr = "";
let countryListSortedArr = new Array(195);

setCountryListString();

menuContainer.style.opacity = "1";

function newGame() {
	closePopup();
	popupButton.onclick = nextRound;
	life = 3;
	lifeThree.classList.remove("life-container-empty");
	lifeTwo.classList.remove("life-container-empty");
	lifeOne.classList.remove("life-container-empty");
	streak = 0;
	setLevel();
	nextRound();
}

function nextRound() {
	buttonOneSpan.style.transition = "0s";
	buttonOneSpan.style.transform = "scale(0)";
	countryOrText.style.transition = "0s";
	countryOrText.style.transform = "scale(0)";
	buttonTwoSpan.style.transition = "0s";
	buttonTwoSpan.style.transform = "scale(0)";
	
	
	
	streakBox.textContent = streak;
	let tempArr = getRandomCountries(range);
	country1 = tempArr[0];
	country2 = tempArr[1];
	setTextContent(country1, country2);
	
	if(country1.rank < country2.rank) {
		correct = 1;
	} else {
		correct = 2;
	}
	
	closePopup();
	
	setTimeout( function(){buttonOneSpan.style.transition = "1s";}, 100);
	setTimeout( function(){buttonOneSpan.style.transform = "scale(1)";}, 100);
	setTimeout( function(){if(isAudioEnabled == 1) { whooshNoise.play(); };}, 100);
	setTimeout( function(){countryOrText.style.transition = "1s";}, 800);
	setTimeout( function(){countryOrText.style.transform = "scale(1)";}, 800);
	setTimeout( function(){if(isAudioEnabled == 1) { whooshNoise.play(); };}, 800);
	setTimeout( function(){buttonTwoSpan.style.transition = "1s";}, 1500);
	setTimeout( function(){buttonTwoSpan.style.transform = "scale(1)";}, 1500);
	setTimeout( function(){if(isAudioEnabled == 1) { whooshNoise.play(); };}, 1500);
	//setTimeout( function(){startTimer();}, 2000);
	
}

function startTimer() {
	//timerBar.style.width = "66.6%";
	//setTimeout( function(){timerBar.style.width = "33.3%";}, (1000*roundTime / 3));
	//setTimeout( function(){timerBar.style.width = "0%";}, (1000*roundTime / 3) * 2);
	//timer = setTimeout(function(){ checkAnswer(0)}, (1000*roundTime)+325);
}

//Returns an array with two random countries within maxRankDifference places of each other on the ranking scale
function getRandomCountries1(maxRankDifference) {
	let temp1 = Math.floor(Math.random() * 195);
	
	let temp2 = -1;
	
	while(temp2 < 0 || temp2 > 194 || temp1 == temp2) {
		temp2 = Math.floor(Math.random() * (maxRankDifference+1));
		temp2 = temp1 - Math.floor(maxRankDifference/2) + temp2;
	}
	
	return new Array(countryListSortedArr[temp1],countryListSortedArr[temp2]);
}

function getRandomCountries(maxRankDistance) {
	let temp1 = Math.floor(Math.random() * 195);
	
	let temp2 = -1;
	
	while(temp2 < 0 || temp2 > 194 || temp1 == temp2) {
		temp2 = Math.floor(Math.random() * (11 - 1) + 1);
		sign = Math.floor(Math.random() * (2 - 0));
		if(sign == 0) {
			temp2 = temp1 - maxRankDistance + temp2;
		} else {
			temp2 = temp1 + maxRankDistance - temp2;
		}
	}
	
	return new Array(countryListSortedArr[temp1],countryListSortedArr[temp2]);
}

function setTextContent() {
	if(flagOnlyMode == 0) {
		buttonOneSpan.textContent = country1.name;
		buttonTwoSpan.textContent = country2.name;
	} else {
		buttonOneSpan.textContent = country1.flag;
		buttonTwoSpan.textContent = country2.flag;
	}
	
}

function checkAnswer(buttonClicked) {
	clearTimeout(timer);
	let isCorrect = buttonClicked == correct;
	
	let main = "";
	let mainColor = "";
	let explain1 = "";
	let explain2 = "";
	let explain3 = "";
	let button = "";
	
	if(isCorrect) {
		popupButton.onclick = function(){ nextRound() };
		timerBar.style.width = "100%";
		timerBar.style.backgroundColor = "green%";
		if(isAudioEnabled == 1) { correctNoise.play(); }
		main = "CORRECT!";
		mainColor = "green";
		button = "NEXT ROUND";
		streak++;
		setLevel();
	} else if(life>1) {
		popupButton.onclick = function(){ nextRound() };
		if(isAudioEnabled == 1) { incorrectNoise.play(); }
		main = "INCORRECT";
		mainColor = "red";
		button = "NEXT ROUND";
		removeLife();
		setLevel();
	} else {
		popupButton.onclick = function(){ newGame() };
		if(parseInt(streak) > localStorage.getItem("highscore")) {
			localStorage.setItem("highscore",streak);
		}
		if(isAudioEnabled == 1) { incorrectNoise.play(); }
		main = "INCORRECT";
		mainColor = "red";
		if(streak == 1) {
			explain2 = "YOUR STREAK ENDED AT " + streak + " COUNTRY";
		} else { explain2 = "YOUR STREAK ENDED AT " + streak + " COUNTRIES"; }
		
		explain3 = getGameoverMessage();
		button = "TRY AGAIN";
		popupButton.onclick = newGame;
		removeLife();
	}
	
	if(button == "NEXT ROUND") {
			if(correct==1) {
			let diff = getSizeDifference(country1.size, country2.size);
			explain2 = country1.name.toUpperCase() + " IS  ~" + diff + " TIMES LARGER THAN " + country2.name.toUpperCase() + "";
			
		} else {
			let diff = getSizeDifference(country2.size, country1.size);
			explain2 = country2.name.toUpperCase() + " IS  ~" + diff + " TIMES LARGER THAN " + country1.name.toUpperCase() + "";
		}
	} else {
		if(correct==1) {
			let diff = getSizeDifference(country1.size, country2.size);
			explain1 = country1.name.toUpperCase() + " IS  ~" + diff + " TIMES LARGER THAN " + country2.name.toUpperCase() + "";
			
		} else {
			let diff = getSizeDifference(country2.size, country1.size);
			explain1 = country2.name.toUpperCase() + " IS  ~" + diff + " TIMES LARGER THAN " + country1.name.toUpperCase() + "";
		}
	}
	
	
	
	openPopup(main, mainColor, explain1, explain2, explain3, button);
}

//Returns the ratio in size of the two countries
function getSizeDifference(larger, smaller) {
	let temp = larger / smaller;
	temp *= 1000;
	temp = Math.round(temp);
	temp /= 1000;
	
	return temp;
}

//Returns a randomized message based on the streak upon gameover
function getGameoverMessage() {
	
	let rand = Math.floor(Math.random() * 4)+1;
	let message = "";
	
	if(streak == 0) {
		message = "WOW ... THAT'S JUST SAD"
	} else if(streak <=3) {
		if(rand == 1) {
			message = "YOU CAN DO BETTER";
		} else if(rand == 2) {
			message = "HIT THE BOOKS";
		} else {
			message = "AT LEAST YOU TRIED";
		}
	} else if(streak <=7) {
		if(rand == 1) {
			message = "YOU'RE GETTING THERE";
		} else if(rand == 2) {
			message = "NOT TOO SHABBY";
		} else {
			message = "YA DONE GOOD";
		}
	} else if(streak <=11) {
		if(rand == 1) {
			message = "WELL DONE!";
		} else if(rand == 2) {
			message = "NICELY DONE!";
		} else {
			message = "GOOD JOB. CAN YOU DO BETTER?";
		}
	} else if(streak <=15) {
		if(rand == 1) {
			message = "YOU'RE GETTING BETTER";
		} else if(rand == 2) {
			message = "NOTHING TO FROWN AT";
		} else {
			message = "VERY WELL DONE!";
		}
	} else if(streak <=19) {
		if(rand == 1) {
			message = "VERY IMPRESSIVE";
		} else if(rand == 2) {
			message = "NOW THAT'S A STREAK";
		} else {
			message = "YOU'RE GETTING TOO GOOD AT THIS";
		}
	} else {
		message = "THE STUFF OF LEGENDS"
	}
	return message;
}

/* Range, streak, and text color as player gets more correct
 |LEVEL	|STREAK	|RANGE	|COLOR 	|
 |	0	|0-3	|50		|#FFFFFF|
 |	1	|4-7	|30		|#FFF0AA|
 |	2	|8-11	|20		|#FFD88C|
 |	3	|12-15	|15		|#FF9151|
 |	4	|16-19	|10		|#D83324|
 |	5	|20+	|5		|#991A1E|
*/
function setLevel() {
	if(streak <= 3) {
		range = 50;
		streakBox.style.color = "#FFFFFF";
	}
	else if(streak >= 4 && streak <= 7) {
		range = 30;
		streakBox.style.color = "#FFF0AA";
	}
	else if(streak >= 8 && streak <= 11) {
		range = 20;
		streakBox.style.color = "#FFD88C";
	}
	else if(streak >= 12 && streak <= 15) {
		range = 15;
		streakBox.style.color = "#FF9151";
	}
	else if(streak >= 16 && streak <= 19) {
		range = 10;
		streakBox.style.color = "#D83324";
	}
	else if(streak >= 20) {
		range = 5;
		streakBox.style.color = "#991A1E";
	}
}

function removeLife() {
	if(life == 3) {
		lifeThree.classList.add("life-container-empty");
	} else if(life==2) {
		lifeTwo.classList.add("life-container-empty");
	} else if(life==1) {
		lifeOne.classList.add("life-container-empty");
	}
	
	life--;
}

function openPopup(main, mainColor, explain1, explain2, explain3, button) {
	popupMainMessage.textContent = main;
	popupMainMessage.style.color = mainColor;
	popupExplainMessageOne.textContent = explain1;
	popupExplainMessageTwo.textContent = explain2;
	popupExplainMessageThree.textContent = explain3;
	popupButton.textContent = button;
	popup.classList.add("popup-enabled");
	popupBackground.style.visibility = "visible";
	
	if(main == "ABOUT" || main == "HOW TO PLAY") {
		popupButton.onclick = function(){ closePopup() };
	}
}

function closePopup() {
	popup.classList.remove("popup-enabled");
	//popupButtonYes.style.transition = "0s";
	//popupButtonNo.style.transition = "0s";
	popupBackground.style.visibility = "hidden";
}

function openSettingsPopup() {
	settingsPopup.classList.add("popup-enabled");
	popupBackground.style.visibility = "visible";
}

function closeSettingsPopup() {
	settingsPopup.classList.remove("popup-enabled");
	popupBackground.style.visibility = "hidden";
}

function toggleFlagOnlyMode() {
	
	if(flagOnlyMode == 0) {
		flagOnlyMode = 1;
	} else { flagOnlyMode = 0; }
	
	setFontSize();
	setTextContent();

}

function toggleIsAudioEnabled() {
	if(isAudioEnabled == 0) {
		isAudioEnabled = 1;
	} else { isAudioEnabled = 0; }
}

function setFontSize() {
	if(flagOnlyMode == 1) {
		twoCountryButton[0].style.fontSize = "6em";
		twoCountryButton[1].style.fontSize = "6em";
	} else { 
		twoCountryButton[0].style.fontSize = "2em";
		twoCountryButton[1].style.fontSize = "2em";
	}
}

function home() {
	
	gameplayElementsContainer.classList.add("hidden");
	//homeButton.classList.add("hidden");
	
	homeElementsContainer.classList.remove("hidden");
	howToPlayButton.classList.remove("hidden");
	aboutButton.classList.remove("hidden");
	settingsButton.classList.remove("hidden");
	
	clearTimeout(timer);
	setTimeout(function(){clearTimeout(timer)},4000);
}

function play() {
	homeElementsContainer.classList.add("hidden");
	howToPlayButton.classList.add("hidden");
	aboutButton.classList.add("hidden");
	settingsButton.classList.add("hidden");
	
	gameplayElementsContainer.classList.remove("hidden");
	homeButton.classList.remove("hidden");
	
	newGame();
}

function clickHome() {
	highScoreText.textContent = "HIGH SCORE: " + localStorage.getItem("highscore");
	playButton.onclick = clickPlay;
	menuContainer.style.opacity= "0";
	gameplayContainer.style.opacity= "0";
	countryOrText.style.transform = "scale(0)";
	
	setTimeout(function(){gameplayContainer.style.display= "none";},500);
	setTimeout(function(){menuContainer.style.display= "flex";},500);
	
	setTimeout(function(){menuContainer.style.opacity= "1";},600);
}

function clickBegin() {
	playButton.onclick = "";
	buttonOneSpan.textContent = "";
	buttonTwoSpan.textContent = "";
	menuContainer.style.opacity= "0";
	setTimeout(function(){menuContainer.style.display= "none";},500);
	setTimeout(function(){gameplayContainer.style.display= "flex";},700);
	setTimeout(function(){gameplayContainer.style.opacity= "1";},800);
	setTimeout(function(){newGame();},2000);
	
}

function clickReset() {
	localStorage.setItem("highscore","0");
	highScoreText.textContent = "HIGH SCORE: 0";
}

function clickPlay() {
	howToPlayTextContainer.style.display = "none";
	settingsTextContainer.style.display = "none";
	aboutTextContainer.style.display = "none";
	
	playTextContainer.style.display = "inline";
	
	howToPlayButton.classList.add("menu-button");
	howToPlayButton.classList.remove("menu-button-pressed");
	aboutButton.classList.add("menu-button");
	aboutButton.classList.remove("menu-button-pressed");
	settingsButton.classList.add("menu-button");
	settingsButton.classList.remove("menu-button-pressed");
	
	playButton.classList.add("menu-button-pressed");
	playButton.classList.remove("menu-button");
}

function clickHowToPlay() {
	playTextContainer.style.display = "none";
	settingsTextContainer.style.display = "none";
	aboutTextContainer.style.display = "none";
	
	howToPlayTextContainer.style.display = "inline";
	
	playButton.classList.add("menu-button");
	playButton.classList.remove("menu-button-pressed");
	aboutButton.classList.add("menu-button");
	aboutButton.classList.remove("menu-button-pressed");
	settingsButton.classList.add("menu-button");
	settingsButton.classList.remove("menu-button-pressed");
	
	howToPlayButton.classList.add("menu-button-pressed");
	howToPlayButton.classList.remove("menu-button");
}

function clickSettings() {
	playTextContainer.style.display = "none";
	howToPlayTextContainer.style.display = "none";
	aboutTextContainer.style.display = "none";
	
	settingsTextContainer.style.display = "inline";
	
	playButton.classList.add("menu-button");
	playButton.classList.remove("menu-button-pressed");
	aboutButton.classList.add("menu-button");
	aboutButton.classList.remove("menu-button-pressed");
	howToPlayButton.classList.add("menu-button");
	howToPlayButton.classList.remove("menu-button-pressed");
	
	settingsButton.classList.add("menu-button-pressed");
	settingsButton.classList.remove("menu-button");
}

function clickAbout() {
	playTextContainer.style.display = "none";
	howToPlayTextContainer.style.display = "none";
	settingsTextContainer.style.display = "none";
	
	aboutTextContainer.style.display = "inline";
	
	playButton.classList.add("menu-button");
	playButton.classList.remove("menu-button-pressed");
	howToPlayButton.classList.add("menu-button");
	howToPlayButton.classList.remove("menu-button-pressed");
	settingsButton.classList.add("menu-button");
	settingsButton.classList.remove("menu-button-pressed");
	
	aboutButton.classList.add("menu-button-pressed");
	aboutButton.classList.remove("menu-button");
}

function setCountryListString() {
	let countryListRaw = "1,Russia,17098246,🇷🇺,2,Canada,9984670,🇨🇦,3,China,9596961,🇨🇳,4,United States,9525067,🇺🇸,5,Brazil,8515767,🇧🇷,6,Australia,7692024,🇦🇺,7,India,3287263,🇮🇳,8,Argentina,2780400,🇦🇷,9,Kazakhstan,2724900,🇰🇿,10,Algeria,2381741,🇩🇿,11,DR Congo,2344858,🇨🇩,12,Saudi Arabia,2149690,🇸🇦,13,Mexico,1964375,🇲🇽,14,Indonesia,1904569,🇮🇩,15,Sudan,1861484,🇸🇩,16,Libya,1759540,🇱🇾,17,Iran,1648195,🇮🇷,18,Mongolia,1564110,🇲🇳,19,Peru,1285216,🇵🇪,20,Chad,1284000,🇹🇩,21,Niger,1267000,🇳🇪,22,Angola,1246700,🇦🇴,23,Mali,1240192,🇲🇱,24,South Africa,1221037,🇿🇦,25,Colombia,1141748,🇨🇴,26,Ethiopia,1104300,🇪🇹,27,Bolivia,1098581,🇧🇴,28,Mauritania,1030700,🇲🇷,29,Egypt,1002450,🇪🇬,30,Tanzania,945087,🇹🇿,31,Nigeria,923768,🇳🇬,32,Venezuela,916445,🇻🇪,33,Pakistan,881913,🇵🇰,34,Namibia,825615,🇳🇦,35,Mozambique,801590,🇲🇿,36,Turkey,783562,🇹🇷,37,Chile,756102,🇨🇱,38,Zambia,752612,🇿🇲,39,Myanmar,676578,🇲🇲,40,Afghanistan,652867,🇦🇫,41,South Sudan,644329,🇸🇸,42,France,640679,🇫🇷,43,Somalia,637657,🇸🇴,44,Central African Republic,622984,🇨🇫,45,Ukraine,603550,🇺🇦,46,Madagascar,587041,🇲🇬,47,Botswana,581730,🇧🇼,48,Kenya,580367,🇰🇪,49,Yemen,555000,🇾🇪,50,Thailand,513120,🇹🇭,51,Spain,505992,🇪🇸,52,Turkmenistan,488100,🇹🇲,53,Cameroon,475442,🇨🇲,54,Papua New Guinea,462840,🇵🇬,55,Sweden,450295,🇸🇪,56,Uzbekistan,447400,🇺🇿,57,Morocco,446550,🇲🇦,58,Iraq,438317,🇮🇶,59,Paraguay,406752,🇵🇾,60,Zimbabwe,390757,🇿🇼,61,Norway,385207,🇳🇴,62,Japan,377976,🇯🇵,63,Germany,357114,🇩🇪,64,Congo,342000,🇨🇬,65,Finland,338425,🇫🇮,66,Vietnam,331212,🇻🇳,67,Malaysia,330803,🇲🇾,68,Ivory Coast,322463,🇨🇮,69,Poland,312696,🇵🇱,70,Oman,309500,🇴🇲,71,Italy,301339,🇮🇹,72,Philippines,300000,🇵🇭,73,Ecuador,276841,🇪🇨,74,Burkina Faso,274222,🇧🇫,75,New Zealand,270467,🇳🇿,76,Gabon,267668,🇬🇦,77,Guinea,245857,🇬🇳,78,United Kingdom,242495,🇬🇧,79,Uganda,241550,🇺🇬,80,Ghana,238533,🇬🇭,81,Romania,238397,🇷🇴,82,Laos,236800,🇱🇦,83,Guyana,214969,🇬🇾,84,Belarus,207600,🇧🇾,85,Kyrgyzstan,199951,🇰🇬,86,Senegal,196722,🇸🇳,87,Syria,185180,🇸🇾,88,Cambodia,181035,🇰🇭,89,Uruguay,176215,🇺🇾,90,Suriname,163820,🇸🇷,91,Tunisia,163610,🇹🇳,92,Bangladesh,148460,🇧🇩,93,Nepal,147516,🇳🇵,94,Tajikistan,143100,🇹🇯,95,Greece,131957,🇬🇷,96,Nicaragua,130373,🇳🇮,97,Eritrea,125000,🇪🇷,98,North Korea,120540,🇰🇵,99,Malawi,118484,🇲🇼,100,Benin,114763,🇧🇯,101,Honduras,112492,🇭🇳,102,Liberia,111369,🇱🇷,103,Bulgaria,111002,🇧🇬,104,Cuba,109884,🇨🇺,105,Guatemala,108889,🇬🇹,106,Iceland,103000,🇮🇸,107,South Korea,100210,🇰🇷,108,Hungary,93028,🇭🇺,109,Portugal,92226,🇵🇹,110,Jordan,89342,🇯🇴,111,Serbia,88361,🇷🇸,112,Azerbaijan,86600,🇦🇿,113,Austria,83871,🇦🇹,114,United Arab Emirates,83600,🇦🇪,115,Czech Republic,78871,🇨🇿,116,Panama,75417,🇵🇦,117,Sierra Leone,71740,🇸🇱,118,Ireland,70273,🇮🇪,119,Georgia,69700,🇬🇪,120,Sri Lanka,65610,🇱🇰,121,Lithuania,65300,🇱🇹,122,Latvia,64559,🇱🇻,123,Togo,56785,🇹🇬,124,Croatia,56594,🇭🇷,125,Bosnia and Herzegovina,51209,🇧🇦,126,Costa Rica,51100,🇨🇷,127,Slovakia,49037,🇸🇰,128,Dominican Republic,48671,🇩🇴,129,Estonia,45227,🇪🇪,130,Denmark,43094,🇩🇰,131,Netherlands,41850,🇳🇱,132,Switzerland,41284,🇨🇭,133,Bhutan,38394,🇧🇹,134,Guinea-Bissau,36125,🇬🇼,135,Moldova,33846,🇲🇩,136,Belgium,30528,🇧🇪,137,Lesotho,30355,🇱🇸,138,Armenia,29743,🇦🇲,139,Solomon Islands,28896,🇸🇧,140,Albania,28748,🇦🇱,141,Equatorial Guinea,28051,🇬🇶,142,Burundi,27834,🇧🇮,143,Haiti,27750,🇭🇹,144,Rwanda,26338,🇷🇼,145,North Macedonia,25713,🇲🇰,146,Djibouti,23200,🇩🇯,147,Belize,22966,🇧🇿,148,El Salvador,21041,🇸🇻,149,Israel,20770,🇮🇱,150,Slovenia,20273,🇸🇮,151,Fiji,18272,🇫🇯,152,Kuwait,17818,🇰🇼,153,Eswatini,17364,🇸🇿,154,Timor-Leste,14919,🇹🇱,155,The Bahamas,13943,🇧🇸,156,Montenegro,13812,🇲🇪,157,Vanuatu,12189,🇻🇺,158,Qatar,11586,🇶🇦,159,The Gambia,11295,🇬🇲,160,Jamaica,10991,🇯🇲,161,Lebanon,10452,🇱🇧,162,Cyprus,9251,🇨🇾,163,Palestinian Territory,6020,🇵🇸,164,Brunei,5765,🇧🇳,165,Trinidad and Tobago,5130,🇹🇹,166,Cape Verde,4033,🇨🇻,167,Samoa,2842,🇼🇸,168,Luxembourg,2586,🇱🇺,169,Mauritius,2040,🇲🇺,170,Comoros,1862,🇰🇲,171,São Tomé and Príncipe,964,🇸🇹,172,Kiribati,811,🇰🇮,173,Bahrain,786,🇧🇭,174,Dominica,751,🇩🇲,175,Tonga,747,🇹🇴,176,Singapore,728,🇸🇬,177,Micronesia,702,🇫🇲,178,Saint Lucia,616,🇱🇨,179,Andorra,468,🇦🇩,180,Palau,459,🇵🇼,181,Seychelles,452,🇸🇨,182,Antigua and Barbuda,442,🇦🇬,183,Barbados,430,🇧🇧,184,Saint Vincent and the Grenadines,389,🇻🇨,185,Grenada,344,🇬🇩,186,Malta,316,🇲🇹,187,Maldives,300,🇲🇻,188,Saint Kitts and Nevis,261,🇰🇳,189,Marshall Islands,181,🇲🇭,190,Liechtenstein,160,🇱🇮,191,San Marino,61,🇸🇲,192,Tuvalu,26,🇹🇻,193,Nauru,21,🇳🇷,194,Monaco,2.02,🇲🇨,195,Vatican City,0.51,🇻🇦"

	countryListArr = countryListRaw.split(",");
	
	for(let i = 0; i <= countryListArr.length; i+=4) {
		let temp = {name:countryListArr[i+1], size:parseInt(countryListArr[i+2]), rank:parseInt(countryListArr[i]), flag:countryListArr[i+3]};
		countryListSortedArr[i/4] = temp;
	}
}