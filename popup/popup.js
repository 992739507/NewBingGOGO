function $(qury) {
	return document.querySelector(qury);
}
$('a#go-to-bing-go-go').href = 'chrome-extension://' + chrome.runtime.id + '/Chat/bing.html';

//----------------------------------------
var url_input = document.querySelector('input#url-input');
var savecookiesButtun = document.querySelector('input#savecookies');
var loadcookiesButtun = document.querySelector('input#loadcookies');
var speak = document.querySelector('p#speak');
var tallSelect = document.querySelector('select#tallSelect');

var expUrl = new RegExp('^(https?://)([-a-zA-z0-9]+\\.)+([-a-zA-z0-9]+)+\\S*$');
var magicUrl;

function loaded() {
	//魔法链接输入框更新事件
	url_input.onchange = function (even) {
		let url = url_input.value;
		magicUrl = url;
		setMagicUrl(url);
		speakString();
	}
}

function speakString() {
	if (!magicUrl) {
		speak.innerHTML = '我没有角角,需要魔法链接才能帮你哦。';
		return;
	}
	if (!expUrl.test(magicUrl)) {
		speak.innerHTML = '魔法链接似乎不太对。';
		return;
	}
	speak.innerHTML = '魔法启动！';
}

getMagicUrl().then((v) => {
	url_input.value = v ? v : '';
	magicUrl = v;
	speakString(v);
	loaded();
});

getChatHubWithMagic().then((chatWithMagic) => {
	if (chatWithMagic == true) {
		tallSelect.selectedIndex = 1;
	} else {
		tallSelect.selectedIndex = 0;	
	}
	tallSelect.onchange = () => {
		switch (tallSelect.selectedIndex) {
			case 0:
				setChatHubWithMagic(false);
				break;
			case 1:
				setChatHubWithMagic(true);
				break;
		}
	}
});


