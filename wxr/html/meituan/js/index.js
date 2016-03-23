// JavaScript Document
var zns={};

zns.public={};

zns.public.searchBox=function (){
	var oSel=$('#header_search');
	var oOpt=$('#header_search option');
	var oNow=$('#header_search option:selected');
	var oB=$('.header_searchbox_sel_a1_b');
	var oSpan=oB.children('span');
	
	oSpan.eq(0).html(oNow.text());
	
	oSel.change(function (){
		var oNow=$('#header_search option:selected');
		oSpan.eq(0).html(oNow.text());
	});
	
	oSpan.each(function(index) {
		oSpan.eq(index).click(function (){
			oSpan.eq(0).html(oNow.text());
		});
	});
};

zns.public.clientTotop=function (){
	var oGo=$('.j_to_top');
	var oWin=$(window);
	var oDoc=$(document);
	var timer=null;
	var userScroll=false;
	var bFlag=false;
	
	oWin.scroll(function (){
		if(userScroll){
			clearInterval(timer);
			bFlag=false;
		}
		userScroll=true;
	});
	
	oGo.click(function (){
		if(bFlag){
			return;
		}
		bFlag=true;
		var n=0;
		var start=oDoc.scrollTop();
		var dis=0-start;
		var count=Math.floor(1000/30);
		clearInterval(timer);
		timer=setInterval(function (){
			userScroll=false;
			n++;
			oDoc.scrollTop(start+dis*(n/count));
			if(n == count){
				clearInterval(timer);
				bFlag=false;
			}
		},30)
		
	});
};

zns.public.client=function (){
	var oStart=$('#j_lb_box_start');
	var oEnd=$('#j_lb_box_end');
	var oClose=$('#j_lb_box_close');
	oStart.click(function (){
		oStart.stop().animate({'left':-115+'px'},{
			'easing':'easeInOutExpo',
			'complete':function (){
				oEnd.stop().animate({'left':0+'px'},{'easing':'easeInOutExpo'});
			}
		});
	});
	oClose.click(function (){
		oEnd.stop().animate({'left':-oEnd.width()+'px'},{
			'easing':'easeInOutExpo',
			'complete':function (){
				oStart.stop().animate({'left':0+'px'},{'easing':'easeInOutExpo'});
			}
		})
	});
};


zns.public.topBanner=function (){
	var oClose=$('#header_topbanner_closed');
	var oHB=$('#header_topbanner');
	oClose.click(function (){
		oHB.hide();
	});
	
};

zns.index={};

zns.index.banner=function (){
	var oUl=$('#nav_center_banner');
	var aLi=$('.j_nav_center_list');
	oUl.css('width', 2*(aLi.outerWidth()*aLi.length)+'px');
	oUl.html(oUl.html()+oUl.html());
	var oToL=$('.nav_center_bottom_toleft');
	var oToR=$('.nav_center_bottom_toright');
	var aLi=$('.j_nav_center_list');
	var oSpan=$('.nav_center_bottom_toright_word');
	var oDiv=$('#nav_center_bottom');
	var iNow=aLi.length/2;
	var iNowNumber=1;
	var bFlag=false;
	var timer=null;
	var timer2=null;
	oUl.css({'left':-(aLi.outerWidth()*iNow)+'px'});
	oSpan.html(iNowNumber+'/'+aLi.length/2);
	
	oToL.click(function (){
		if(bFlag){
			return;
		}
		bFlag=true;
		toL();
	});
	
	oToR.click(function (){
		if(bFlag){
			return;
		}
		bFlag=true;
		toR();
	});
	
	
	oDiv.mouseenter(function (){
		clearInterval(timer);
		clearTimeout(timer2);
		oToR.stop().animate({'opacity':0.5});
		oToL.stop().animate({'opacity':0.5});
		
		oToR.mouseenter(function (){
			oToR.stop().animate({'opacity':1});
		});
		
		oToR.mouseleave(function (){
			oToR.stop().animate({'opacity':0.5});
		});
		
		oToL.mouseenter(function (){
			oToL.stop().animate({'opacity':1});
		});
		
		oToL.mouseleave(function (){
			oToL.stop().animate({'opacity':0.5});
		});
	});
	
	oDiv.mouseleave(function (){
		timer=setInterval(function (){
			toR();
		},4000);
		timer2=setTimeout(function (){
			oToR.stop().animate({'opacity':0});
			oToL.stop().animate({'opacity':0});
		},2000)
	});
	
	timer=setInterval(function (){
		toR();
	},4000);
	
	function toL(){
		iNow--;
		
		iNowNumber--;
		if(iNowNumber <= 0){
			iNowNumber=6;
		}
		oSpan.html(iNowNumber+'/'+aLi.length/2);
		
		oUl.stop().animate({'left':-(aLi.outerWidth()*iNow)+'px'},{'duration':125,'complete':function (){
				if(iNow == 1){
					iNow=aLi.length/2+1;
					oUl.css({'left':-(aLi.outerWidth()*iNow)+'px'});
				}
				bFlag=false;
			}
		});
	}
	
	function toR(){
		iNow++;
		iNowNumber++;
		if(iNowNumber >= 7){
			iNowNumber=1;
		}
		oSpan.html(iNowNumber+'/'+aLi.length/2);
		
		oUl.stop().animate({'left': -(aLi.outerWidth()*iNow)+'px'},{'duration':125,'complete':function (){
				if(iNow == aLi.length-1){
					
					iNow=aLi.length/2-1;
					oUl.css({'left':-(aLi.outerWidth()*iNow)+'px'});
				}
				bFlag=false;
			}
		});
	};
};

zns.index.leftNav=function (){
	var arr=['美食','酒店','电影','KTV','休闲娱乐','周边游','生活服务','购物','丽人'];
	var json={'美食':'<dl class="nav_left_hide_box">'+
							'<dt>'+
								'<a href="#">'+
									'美食'+
								'</a>'+
							'</dt>'+
							'<dd>'+
								'<a href="#">甜点饮品</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">火锅</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">其他美食</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">日韩料理</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">西餐</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">小吃快餐</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">自助餐</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">咖啡酒吧茶馆</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">烧烤烤肉</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">川湘菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">江浙菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">粤港菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">西北菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">京菜鲁菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">云贵菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">东南亚菜</a>'+
							'</dd>'+
						'</dl>'+
						
						'<dl class="nav_left_hide_box">'+
							'<dt>'+
								'<a href="#">'+
									
								'</a>'+
							'</dt>'+
							
							'<dd>'+
								'<a href="#">西餐</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">小吃快餐</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">自助餐</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">咖啡酒吧茶馆</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">烧烤烤肉</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">川湘菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">江浙菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">粤港菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">西北菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">京菜鲁菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">云贵菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">东南亚菜</a>'+
							'</dd>'+
						'</dl>','酒店':'<dl class="nav_left_hide_box">'+
							'<dt>'+
								'<a href="#">'+
									'酒店'+
								'</a>'+
							'</dt>'+
							'<dd>'+
								'<a href="#">经济型酒店</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">豪华型酒店</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">主题酒店</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">度假酒店/度假村</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">公寓型酒店</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">客栈</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">青年旅社</a>'+
							'</dd>'+
						'</dl>','电影':'<dl class="nav_left_hide_box">'+
							'<dt>'+
								'<a href="#">'+
									'当前热映'+
								'</a>'+
							'</dt>'+
							'<dd>'+
								'<a href="#">老炮儿</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">神探夏洛克</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">星球大战：原力觉...</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">唐人街探案</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">寻龙诀</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">一念天堂</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">小门神</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">恶棍天使</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">一切都好</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">万万没想到</a>'+
							'</dd>'+
							
						'</dl>'+
						
						'<dl class="nav_left_hide_box">'+
							'<dt>'+
								'<a href="#">'+
									'热门影院'+
								'</a>'+
							'</dt>'+
							
							'<dd>'+
								'<a href="#">幸福蓝海国际</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">嘉美国际影城</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">金逸影城</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">中影国际影城</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">大地影院</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">沃美影城</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">橙天嘉禾影城</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">紫光影城</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">保利国际影城</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">世茂国际影城</a>'+
							'</dd>'+
							
						'</dl>','休闲娱乐':'<dl class="nav_left_hide_box">'+
							'<dt>'+
								'<a href="#">'+
									'休闲娱乐'+
								'</a>'+
							'</dt>'+
							'<dd>'+
								'<a href="#">KTV</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">其他娱乐</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">温泉</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">演出赛事</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">桌游/电玩</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">运动健身</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">4D/5D电影</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">足疗按摩</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">洗浴/汗蒸</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">温泉</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">DIY手工</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">真人CS</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">密室逃脱</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">酒吧/咖啡</a>'+
							'</dd>'+
						'</dl>','周边游':'<dl class="nav_left_hide_box">'+
							'<dt>'+
								'<a href="#">'+
									'周边游'+
								'</a>'+
							'</dt>'+
							'<dd>'+
								'<a href="#">景点</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">主题公园</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">水上乐园</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">动植物园</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">海洋馆</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">展览馆</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">游船</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">高空观景</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">温泉</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">真人CS</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">单车出租</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">漂流</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">农家乐</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">其他游玩</a>'+
							'</dd>'+
							
						'</dl>'+
						
						'<dl class="nav_left_hide_box">'+
							'<dt>'+
								'<a href="#">'+
									'旅游'+
								'</a>'+
							'</dt>'+
							'<dd>'+
								'<a href="#">境外游</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">景点门票</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">国内游</a>'+
							'</dd>'+
							
						'</dl>','生活服务':'<dl class="nav_left_hide_box">'+
							'<dt>'+
								'<a href="#">'+
									'生活服务'+
								'</a>'+
							'</dt>'+
							'<dd>'+
								'<a href="#">甜点饮品</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">火锅</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">其他美食</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">日韩料理</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">西餐</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">小吃快餐</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">自助餐</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">咖啡酒吧茶馆</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">烧烤烤肉</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">川湘菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">江浙菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">粤港菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">西北菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">京菜鲁菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">云贵菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">东南亚菜</a>'+
							'</dd>'+
						'</dl>'+
						
						'<dl class="nav_left_hide_box">'+
							'<dt>'+
								'<a href="#">'+
									
								'</a>'+
							'</dt>'+
							
							'<dd>'+
								'<a href="#">西餐</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">小吃快餐</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">自助餐</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">咖啡酒吧茶馆</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">烧烤烤肉</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">川湘菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">江浙菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">粤港菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">西北菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">京菜鲁菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">云贵菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">东南亚菜</a>'+
							'</dd>'+
						'</dl>','购物':'<dl class="nav_left_hide_box">'+
							'<dt>'+
								'<a href="#">'+
									'购物'+
								'</a>'+
							'</dt>'+
							'<dd>'+
								'<a href="#">甜点饮品</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">火锅</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">其他美食</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">日韩料理</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">西餐</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">小吃快餐</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">自助餐</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">咖啡酒吧茶馆</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">烧烤烤肉</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">川湘菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">江浙菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">粤港菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">西北菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">京菜鲁菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">云贵菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">东南亚菜</a>'+
							'</dd>'+
						'</dl>'+
						
						'<dl class="nav_left_hide_box">'+
							'<dt>'+
								'<a href="#">'+
									
								'</a>'+
							'</dt>'+
							
							'<dd>'+
								'<a href="#">西餐</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">小吃快餐</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">自助餐</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">咖啡酒吧茶馆</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">烧烤烤肉</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">川湘菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">江浙菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">粤港菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">西北菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">京菜鲁菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">云贵菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">东南亚菜</a>'+
							'</dd>'+
						'</dl>','丽人':'<dl class="nav_left_hide_box">'+
							'<dt>'+
								'<a href="#">'+
									'丽人'+
								'</a>'+
							'</dt>'+
							'<dd>'+
								'<a href="#">甜点饮品</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">火锅</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">其他美食</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">日韩料理</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">西餐</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">小吃快餐</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">自助餐</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">咖啡酒吧茶馆</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">烧烤烤肉</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">川湘菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">江浙菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">粤港菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">西北菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">京菜鲁菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">云贵菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">东南亚菜</a>'+
							'</dd>'+
						'</dl>'+
						
						'<dl class="nav_left_hide_box">'+
							'<dt>'+
								'<a href="#">'+
									
								'</a>'+
							'</dt>'+
							
							'<dd>'+
								'<a href="#">西餐</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">小吃快餐</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">自助餐</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">咖啡酒吧茶馆</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">烧烤烤肉</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">川湘菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">江浙菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">粤港菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">西北菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">京菜鲁菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">云贵菜</a>'+
							'</dd>'+
							
							'<dd>'+
								'<a href="#">东南亚菜</a>'+
							'</dd>'+
						'</dl>'};
	var aLi=$('.j_nav_left');
	var oBox=$('.j_nav_left_hide');
	var	oFa=$('.j_nav_left_pos_father');
	aLi.each(function (index){
		var timer=null;
		aLi.eq(index).attr('data_navKey',arr[index]);
		aLi.eq(index).mouseenter(function (){
			var obj=$(this);
			var name=obj.attr('data_navKey')
			clearTimeout(timer);
			timer=setTimeout(function (){
				if(name in json){
					oBox.show();
					oBox.html(json[name]);
					var aDl=oBox.children('dl');
					oBox.css('width',aDl.length*aDl.width()+'px');
				}
				else{
					oBox.hide();
				}
			},100);
			
		});
		
		aLi.eq(index).mouseleave(function (){
			clearTimeout(timer);
		});
		
		oFa.mouseleave(function (){
			clearTimeout(timer);
			timer=setTimeout(function (){
				oBox.hide();
			},100);
		});
	});
	
	
	
};



















