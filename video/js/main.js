/*
 *
 * mads - version 2.00.01
 * Copyright (c) 2015, Ninjoe
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * https://en.wikipedia.org/wiki/MIT_License
 * https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html
 *
 */
 var mads = function () {
 	/* Get Tracker */
 	if (typeof custTracker == 'undefined' && typeof rma != 'undefined') {
 		this.custTracker = rma.customize.custTracker;
 	} else if (typeof custTracker != 'undefined') {
 		this.custTracker = custTracker;
 	} else {
 		this.custTracker = [];
 	}

 	/* Unique ID on each initialise */
 	this.id = this.uniqId();

 	/* Tracked tracker */
 	this.tracked = [];

 	/* Body Tag */
 	this.bodyTag = document.getElementsByTagName('body')[0];

 	/* Head Tag */
 	this.headTag = document.getElementsByTagName('head')[0];

 	/* RMA Widget - Content Area */
 	this.contentTag = document.getElementById('rma-widget');

 	/* URL Path */
 	this.path = typeof rma != 'undefined' ? rma.customize.src : '';
 };

 /* Generate unique ID */
 mads.prototype.uniqId = function () { return new Date().getTime(); };

 /* Link Opner */
 mads.prototype.linkOpener = function (url) {

 	if(typeof url != "undefined" && url !=""){
 		if (typeof mraid !== 'undefined') {
 			mraid.open(url);
 		}else{
 			window.open(url);
 		}
 	}
 };

 /* tracker */
 mads.prototype.tracker = function (tt, type, name) {

	/* 
	 * name is used to make sure that particular tracker is tracked for only once
	 * there might have the same type in different location, so it will need the name to differentiate them
	 */
	 name = name || type;

	 if ( typeof this.custTracker != 'undefined' && this.custTracker != '' && this.tracked.indexOf(name) == -1 ) {
	 	for (var i = 0; i < this.custTracker.length; i++) {
	 		var img = document.createElement('img');

	 		/* Insert Macro */
	 		var src = this.custTracker[i].replace('{{type}}', type);
	 		src = src.replace('{{tt}}', tt);
	 		/* */
	 		img.src = src + '&' + this.id;

	 		img.style.display = 'none';
	 		this.bodyTag.appendChild(img);

	 		this.tracked.push(name);
	 	}
	 }
	};

	/* Load JS File */
	mads.prototype.loadJs = function (js, callback) {
		var script = document.createElement('script');
		script.src = js;

		if (typeof callback != 'undefined') {
			script.onload = callback;
		}

		this.headTag.appendChild(script);
	};

	/* Load CSS File */
	mads.prototype.loadCss = function (href) {
		var link = document.createElement('link');
		link.href = href;
		link.setAttribute('type', 'text/css');
		link.setAttribute('rel', 'stylesheet');

		this.headTag.appendChild(link);
	};
	var video;
	var suzuki = function(){
		var _this = this;
		this.sdk = new mads();

		this.sdk.loadCss(this.sdk.path + 'css/owl.carousel.css');
		this.sdk.loadCss(this.sdk.path + 'css/responsive.css');
		this.sdk.loadCss(this.sdk.path + 'css/style.css');
		this.sdk.loadJs(this.sdk.path + 'js/jquery.js', function(){
			_this.parent = $('#rma-widget');
			_this.sdk.loadJs(_this.sdk.path + 'js/owl.carousel.min.js', function(){
				_this.render();
			});
		});	
	}

	suzuki.prototype.isEmpty = function(value){ return typeof value != 'undefined' && $.trim(value) ? false : true; }

	suzuki.prototype.render = function(){
		var _this = this;
		this.parent.append('<div class="image-top"><img class="logo-top" src="'+ _this.sdk.path +'img/logo.png" title="Maruti Suzuki Logo"></img><div>');
		this.parent.append('<div class="owl-carousel" id="carou">' +
			'<div>' +
			'<img  src="'+_this.sdk.path+'img/indroducting-img.png" alt="smartplay"/>  ' + 
			'<div id="player"></div>'+
			'<img  src="'+_this.sdk.path+'img/watch-video-img.png" alt="smartplay"/>  ' +          
			'</div>' +
			'<div>' +
			'<img class="image-1" src="'+_this.sdk.path+'img/f-2.jpg" alt="smartplay"/>  ' +          
			'</div>' +
			'<div >' +
			'<img  src="'+_this.sdk.path+'img/f-3.jpg" alt="smartplay"/>  ' +          
			'</div>' +
			'<div>' +
			'<img  src="'+_this.sdk.path+'img/f-4.jpg" alt="smartplay"/>  ' +          
			'</div>' +
			'<div style="text-align:center">' +
			'<img  src="'+_this.sdk.path+'img/f-5.jpg" alt="smartplay"/>  ' +  
			'<img  src="'+_this.sdk.path+'img/explore-button.png" alt="smartplay"/>  ' +   
			'</div>' +
			'</div>');
		this.parent.append('<div class="image-bottom"><img class="footer" src="'+ _this.sdk.path +'img/footer.png" title="Maruti Suzuki Logo"></img><div>');
		function loadEvent(){
			video = new ytComponent({
				'container' : 'player',
				'width' : '320',
				'height' : '185',
				'videoId' : 'uS5AsURiRwY',
				'autoplay' : false,
				'tracker' : _this.sdk
			});
		}
		_this.sdk.loadJs(_this.sdk.path + 'js/ninjoe.ytComponent.js', loadEvent);
		this.init();
	}

	suzuki.prototype.init = function(){
		$("#carou").owlCarousel({
			slideSpeed : 300,
			paginationSpeed : 400,
			singleItem:true,
			afterAction : callback
		});

		function callback(){
			if(this.owl.currentItem != 0)
				video.player.pauseVideo();
		}
	}

	function onYouTubeIframeAPIReady() {
		video.loadVideo();
	}

	var u = new suzuki();

