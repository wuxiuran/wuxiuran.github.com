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
	
	oBox3d.addEventListener('click', function (){
		
		this.style.animation='none';
		setTimeout(function (){
			oBox3d.style.transform='perspective(800px) translateX(400px) translateY(-200px) rotateY(0deg) rotateX(0deg)';
		},0);
		
		
		
		oBox3d.addEventListener('transitionend',function (){
			
			
			oLeft.style.transform='translateX(200px) translateY(-200px) rotateY(0deg) rotateX(0deg)';
			oRface.style.transform='translateX(200px) translateY(0px) rotateY(0deg) rotateX(0deg)';
			oTop.style.transform='translateZ(0px) translateX(200px) translateY(200px) rotateY(0deg) rotateX(0deg)';
			oBottom.style.transform='translateZ(0px) translateX(0px) translateY(0px) rotateY(0deg) rotateX(0deg)';
			oLface.style.transform='translateX(0px) translateY(200px) rotateY(0deg) rotateX(0deg)';
			oRight.style.transform='translateX(0px) translateY(-200px) rotateY(0deg) rotateX(0deg)';
			
			oLeft.style.opacity=1;
			oRface.style.opacity=1;
			oTop.style.opacity=1;
			oBottom.style.opacity=1;
			oLface.style.opacity=1;
			oRight.style.opacity=1;
			
			oRight.addEventListener('transitionend',function (){
				oAlist.style.display='block';
				setTimeout(function (){
					oAlist.style.opacity=1;
				},0);
			},false);
		},false);
		
			
	}, false);
	
	
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






