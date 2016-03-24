var wxr={};


function getByClass(oParent,sClass){
	if(oParent.getElementsByClassName)
	{
		return oParent.getElementsByClassName(sClass);
	}else{
		var aChild=oParent.getElementsByTagName('*');
		var arr=[];
		var reg=new RegExp('\\b'+sClass+'\\b');
		for(var i=0; i<aChild.length; i++)
		{
			if(reg.test(aChild[i].className))
			{
				arr.push(aChild[i]);	
			}
		}
		return arr;	
	}
}




wxr.index={};
wxr.index.loadpage=function (){
	var oBox=document.getElementById('p_box');
	var oF=document.getElementById('father');
	var oSid=document.getElementById('sidebar');
	var aLi=oSid.getElementsByTagName('li');
	var aSpan=getByClass(oSid,'sidebar_word');
	var oBox3d=document.getElementById('box_3d');
	var oLeft=document.querySelector('.box_3d_left');
	var oRight=document.querySelector('.box_3d_right');
	var oLface=document.querySelector('.box_3d_left-face');
	var oRface=document.querySelector('.box_3d_right-face');
	var oTop=document.querySelector('.box_3d_top');
	var oBottom=document.querySelector('.box_3d_bottom');
	var oAlist=document.querySelector('.box_3d_audiolist');
	var oClose=document.getElementById('box_3d_audiolist_close');
	
	
	
	var aDiv=oBox.children;
	var H=oF.offsetHeight;
	
	var iNow=1;
	
	var bDown='';
	var nNow=0;
	var timer=null;
	
	function closeFn(ev){
		
		oBox3d.addEventListener('click', openFn, false);
		oAlist.style.opacity=0;
		
		function bbb(){
			
			oAlist.style.display='none';
			
			timer=setTimeout(function (){
				
			oBox3d.style.animation='5s d3 linear infinite';
			oBox3d.style.transform='perspective(800px) translateX(0px) translateY(0px) rotateY(-60deg) rotateX(30deg)';
			oLeft.style.transform='translateX(-100px) translateY(0px) rotateY(90deg) rotateX(0deg)';
			oRface.style.transform='translateX(100px) translateY(0px) rotateY(-90deg) rotateX(0deg)';
			oTop.style.transform='translateZ(100px) translateX(0px) translateY(0px) rotateY(0deg) rotateX(0deg)';
			oBottom.style.transform='translateZ(-100px) translateX(0px) translateY(0px) rotateY(0deg) rotateX(0deg)';
			oLface.style.transform='translateX(0px) translateY(100px) rotateY(0deg) rotateX(90deg)';
			oRight.style.transform='translateX(0px) translateY(-100px) rotateY(0deg) rotateX(-90deg)';	
			
			timer=null;
			},0);
			
			oAlist.removeEventListener('transitionend', bbb, false);
		}
		
		oAlist.addEventListener('transitionend', bbb, false);
		ev.cancelBubble=true;
	}
	
	
	
	 function openFn(){
		 
		
		this.style.animation='none';
		setTimeout(function (){
			oBox3d.style.transform='perspective(800px) translateX(400px) translateY(-320px) rotateY(0deg) rotateX(0deg)';
		},0);
		
		function aaa(){
			
			
			oLeft.style.transform='translateX(200px) translateY(-200px) rotateY(0deg) rotateX(0deg)';
			oRface.style.transform='translateX(200px) translateY(0px) rotateY(0deg) rotateX(0deg)';
			oTop.style.transform='translateZ(0px) translateX(200px) translateY(200px) rotateY(0deg) rotateX(0deg)';
			oBottom.style.transform='translateZ(0px) translateX(0px) translateY(0px) rotateY(0deg) rotateX(0deg)';
			oLface.style.transform='translateX(0px) translateY(200px) rotateY(0deg) rotateX(0deg)';
			oRight.style.transform='translateX(0px) translateY(-200px) rotateY(0deg) rotateX(0deg)';
			
			function ccc(){
				oAlist.style.display='block';
				setTimeout(function (){
					oAlist.style.opacity=1;
					
				},0);
				
				oRight.removeEventListener('transitionend', ccc,false);
			}
			
			oRight.addEventListener('transitionend', ccc,false);
			
			oBox3d.removeEventListener('transitionend',aaa,false);
		}
		
		
		
		oBox3d.addEventListener('transitionend',aaa,false);
		
		oBox3d.removeEventListener('click', openFn, false);
			
	}
	
	
	
	
	oClose.addEventListener('click', closeFn, false);
	oBox3d.addEventListener('click', openFn, false);
	
	
	function toScroll(bDown)
	{
		
		
		for(var i=0; i<aLi.length; i++)
		{
			aLi[i].className='';	
		}
		aLi[iNow].className='on_now';
		
		oBox.style.transform='translate(0,-'+H*iNow+'px)';
		//oF.style.backgroundPositionY='-'+document.documentElement.clientWidth/1024*1536/aDiv.length*iNow+'px';	
		nNow=iNow;
		oBox.bDown=bDown;
		oBox.addEventListener('transitionend',move,false);	
		
	}
	
	for(var i=0; i<aLi.length; i++)
	{
		aLi[i].index=i;	
	}

//运动结束后
	function move(ev){
		oBox.removeEventListener('transitionend',move,false);
		console.log(oBox.bDown);
		if(oBox.bDown==true){
			iNow++;
		}else{
			iNow--;	
		}
	}

	oBox.addEventListener('transitionend',move,false);
	
	for(var i=0; i<aDiv.length; i++)
	{
		aDiv[i].style.height=H+'px';
	}
	
//封装	
	function addWheel(obj,fn)
	{
		
		if (window.navigator.userAgent.toLowerCase().indexOf('firefox') != -1)
		{
			
			obj.addEventListener('DOMMouseScroll', _wheel, false);
		}
		else
		{
			
			obj.onmousewheel=_wheel;
		}
		
		function _wheel(ev){
			
			
			if(ev.wheelDelta)
			{
				var down=ev.wheelDelta > 0 ? false : true;
			}
			else
			{
				var down=ev.detail > 0 ? true : false;	
			}
			fn(down);
			
			ev.preventDefault && ev.preventDefault();
			return false;
		}
	}	

//调用	

addWheel(oBox, function (bDown){
	
	if(bDown)
	{
		if(nNow==5)return;
		if(iNow<nNow)
		{
			iNow=nNow+1	
		}
		
		if(iNow >= aLi.length-1)
		{
			iNow=aLi.length-1;
		}	
		
		
		console.log(iNow);
		toScroll(bDown);
		
		
	}
	else
	{
		if(nNow==0)return;
		if(iNow>nNow)
		{
			iNow=nNow-1	
		}
		
		if(iNow <= 0)
		{
			iNow=0;	
		}	
		console.log(iNow);
		toScroll(bDown);
	}	
});	


	
	
	
	



















	
	
	for(var i=0; i<aLi.length; i++){
		(function (index){
			aLi[i].addEventListener('click',function (){
				iNow=index;
				console.log(iNow);
				if(iNow==nNow){
					iNow++;
					return;
				}
				toScroll();
			
			},false);	
			aLi[i].addEventListener('mouseover',function (){
				
				for(var i=0; i<aLi.length; i++)
				{
					aSpan[i].style.opacity=0;	
				}
				aSpan[index].style.opacity=1;
				
			},false);
		})(i);
			aLi[i].addEventListener('mouseout',function (){
				for(var i=0; i<aLi.length; i++)
				{
					aSpan[i].style.opacity=0;	
				}
			},false);
			
	}
	
	oBox.style.height=H*aDiv.length+'px';	
};

wxr.index.page4=function (){
	var oExSonBox=document.getElementById('experiencesonbox');
	var aExSon=oExSonBox.children;
	var eW=aExSon[0].offsetWidth;
	var oExBtnBox=document.getElementById('ex_btnbox');
	var aExBtn=oExBtnBox.getElementsByTagName('li');
	
	oExSonBox.style.width=aExSon.length*eW+'px';
	
	var iNow=0;
	var toLeft=document.getElementById('experienceleft');
	var toRight=document.getElementById('experienceright');
	
	for(var i=0; i<aExBtn.length; i++)
	{
		(function (index){
			aExBtn[i].addEventListener('click', function (){
				iNow=index;
				oExSonBox.style.transform='translateX(-'+index*eW+'px)';
			}, false);	
		})(i);
	}
	toLeft.addEventListener('click',function (){
		iNow--;
		if(iNow <= 0)iNow=0;
		oExSonBox.style.transform='translateX(-'+iNow*eW+'px)';	
	}, false);
	
	toRight.addEventListener('click',function (){
		iNow++;
		if(iNow >= aExBtn.length)iNow=aExBtn.length-1;
		oExSonBox.style.transform='translateX(-'+iNow*eW+'px)';	
	}, false);
	
};

wxr.index.page5=function (){
	var oUl=document.getElementById('about_me_demobox');
	var aLi=oUl.getElementsByTagName('li');	
	var oLeft=document.getElementById('about_me_demobox_left');
	var oRight=document.getElementById('about_me_demobox_right');
	
	
	var arr=[];
	
	for(var i=0; i<aLi.length; i++)
	{
		arr[i]=aLi[i].className;	
	}
	
	oRight.addEventListener('click', function (){
		arr.unshift(arr.pop());
		for(var i=0; i<aLi.length; i++)
		{
			aLi[i].className=arr[i];
		}	
	}, false);
	
	oLeft.addEventListener('click', function (){
		arr.push(arr.shift());
		for(var i=0; i<aLi.length; i++)
		{
			aLi[i].className=arr[i];
		}	
	}, false);
};

wxr.index.music=function (){
	var oBox=document.getElementById('box_3d_audiolist');
	var aDiv=document.querySelectorAll('.box_3d_audiolist_song');
	var oA=document.getElementById('a1');
	var oMes=document.querySelector('.message_song');
	var aP=oMes.getElementsByTagName('p');
	var oPlayS=document.querySelector('.play_status');
	var aS=oPlayS.children;
	
	var playStatus=0;
	var arr=['山崎将义 - One More Time, One More Chance.mp3','陈奕迅 - 圣诞结.mp3','老虎欧巴 - 斗战胜佛.mp3','Linkin Park - Roads Untraveled.mp3','泽野弘之 - Aliez.mp3'];
	var sArr=[' One More Time, One More Chance','圣诞结','斗战胜佛','Roads Untraveled','Aliez'];
	var pArr=['山崎将义','陈奕迅','老虎欧巴','Linkin Park','泽野弘之'];
	var status=['您已开启顺序播放模式','您已开启单曲循环模式','您已开启随机播放模式'];
	
	var iNow=0;
	
	oA.src='mp3/'+arr[iNow];
	aP[0].innerHTML=sArr[iNow];
	aP[1].innerHTML=pArr[iNow];
	
	for(var i=0; i<aS.length; i++)
	{
		(function (index){
			aS[i].addEventListener('click', function (ev){
				playStatus=index;	
				alert(status[index]);
				ev.cancelBubble=true;
			}, false);	
		})(i)
		
	}
	
	function rnd(n,m)
	{
		return Math.floor(Math.random()*(m-n)+n);	
	}
	
	oA.addEventListener('ended',function (){
		switch (playStatus)
		{
			case 0:
				iNow++;
				tab();
				break;
			case 1:
				tab();
				break;
			case 2:
				iNow=rnd(0,aDiv.length);
				tab();
				break;
		}	
	}, false);
	
	
	
	for(var i=0; i<aDiv.length; i++)
	{
		(function (index){
			aDiv[i].addEventListener('click',function (ev){
				iNow=index;
				tab();
				ev.cancelBubble=true;
			}, false);		
		})(i)
			
	};
	
	function tab()
	{
		oA.src='mp3/'+arr[iNow];
		oA.play();
		for(var i=0; i<aDiv.length; i++)
		{
			aDiv[i].className='box_3d_audiolist_song';
		}
		aDiv[iNow].className='box_3d_audiolist_song on';	
		aP[0].innerHTML=sArr[iNow];
		aP[1].innerHTML=pArr[iNow];
	}
	
};

















