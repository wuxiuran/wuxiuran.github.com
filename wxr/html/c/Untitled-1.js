// JavaScript Document

(function (a){
	var addcss=false;
	if ( ! addcss)
	{
		var oLink=document.createElement('link');
		oLink.rel='stylesheet';
		oLink.href='rili.css';
		var oHead=document.getElementsByTagName('head')[0];
		oHead.appendChild(oLink);
		addcss=true;	
	}


	a.calendar=function (obj){
		
		var oBox=document.createElement('div');
		var arr=['一','二','三','四','五','六','日'];
		oBox.setAttribute('id','calendar');
		oBox.setAttribute('class','calendar');
		oBox.innerHTML='<a href="javascript:;" class="prev">←</a>'+
		'<a href="javascript:;" class="next">→</a>'+
		'<span>xxxx年xx月</span>'+
		'<ol>'+
			'<li>一</li>'+
			'<li>二</li>'+
			'<li>三</li>'+
			'<li>四</li>'+
			'<li>五</li>'+
			'<li class="week">六</li>'+
			'<li class="week">日</li>'+
		'</ol>'+
		'<ul></ul>';
		var oA=oBox.getElementsByTagName('a');
		obj.parentNode.insertBefore(oBox, obj);
		var oOl=oBox.getElementsByTagName('ol')[0];
		var oSpan=oBox.getElementsByTagName('span')[0];
		var oUl=oBox.getElementsByTagName('ul')[0];
		oBox.style.left=obj.offsetLeft+'px';
		oBox.style.top=obj.offsetTop+obj.offsetHeight+10+'px';
		
		
			
			var oDate=new Date();
			var year=oDate.getFullYear();
			var month=oDate.getMonth();
			
			oSpan.innerHTML=year+'年'+(month+1)+'月';
			
			var oDate=new Date();
			oDate.setDate(1);
			var day=oDate.getDay();
			if(day == 0){
				day=7;
			}
			for (var i=0; i<day-1; i++){
				var oLi=document.createElement('li');
				oUl.appendChild(oLi);
			}
			
			var oDate=new Date();
			oDate.setMonth(oDate.getMonth()+1,1);
			oDate.setDate(0);
			var nDate=oDate.getDate();
			for (var i=0; i<nDate; i++){
				var oLi=document.createElement('li');
				
				oLi.innerHTML=i+1;
				oUl.appendChild(oLi);
			}
			
			var aLi=oUl.children;
			for (var i=0; i<aLi.length; i++){
				if (i%7==5 || i%7==6){
					aLi[i].className='week';
				}
			}
			
			var oDate=new Date();
			var today=oDate.getDate();
			for (var i=0; i<aLi.length; i++){
				if(aLi[i].innerHTML == today){
					aLi[i].innerHTML='今天';
					aLi[i].className='today';
				}
				if(aLi[i].innerHTML < today){
					aLi[i].className='past';
				}
			}
		
		
		obj.onfocus=function (){
			oBox.style.display='block';
		}
		
		obj.onblur=function (){
			oBox.style.display='none';	
		};
	}
})(window)