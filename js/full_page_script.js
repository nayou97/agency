$(document).ready(function(){
	fullset();
});
function fullset(){
	var pageindex = $("#fullpage > .fullsection").size(); //fullpage 안에 섹션이(.fullsection) 몇개인지 확인하기
	for(var i=1;i<=pageindex;i++){
		$("#fullpage > .quick > ul").append("<li></li>");
	}
	$("#fullpage .quick ul :first-child").addClass("on"); //일단 화면이 로드 되었을때는 퀵버튼에 1번째에 불이 들어오게
	//마우스 휠 이벤트
	$(window).bind("mousewheel", function(event){
		if ( $('.consult-db-form .form-wrapper').hasClass('active') === false ) { // 상담 cta form이 열려있을때는 스크롤이벤트 비활성화
				
			var page = $(".quick ul li.on");
			//alert(page.index()+1);  // 현재 on 되어있는 페이지 번호
			if($("body").find("#fullpage:animated").length >= 1) return false;
			//마우스 휠을 위로
			if(event.originalEvent.wheelDelta >= 0) {
				var before=page.index();
				if(page.index() >= 0) page.prev().addClass("on").siblings(".on").removeClass("on");//퀵버튼옮기기
				var pagelength=0;
				for(var i=1; i<(before); i++)
				{
					pagelength += $(".full"+i).height();
				}
				if(page.index() > 0){ //첫번째 페이지가 아닐때 (index는 0부터 시작임)
					page=page.index()-1;
					$("#fullpage").animate({"top": -pagelength + "px"}, 500, "swing", function() {
						$('.fullsection').eq(page).addClass('viewing').siblings('.fullsection').removeClass('viewing');
						headerFooterColorChange();
					});
				}else{
					return false;
				}	
			}else{ // 마우스 휠을 아래로	
				var nextPage=parseInt(page.index()+1); //다음페이지번호
				var lastPageNum=parseInt($(".quick ul li").size()); //마지막 페이지번호
				//현재페이지번호 <= (마지막 페이지 번호 - 1)
				//이럴때 퀵버튼옮기기
				if(page.index() <= $(".quick ul li").size()-1){ 
					page.next().addClass("on").siblings(".on").removeClass("on");
				}
				
				if(nextPage < lastPageNum){ //마지막 페이지가 아닐때만 animate !
					var pagelength=0;
					for(var i = 1; i<(nextPage+1); i++){ 
						//총 페이지 길이 구하기
						//ex) 현재 1번페이지에서 2번페이지로 내려갈때는 1번페이지 길이 + 2번페이지 길이가 더해짐
						pagelength += $(".full"+i).height();
					}
					$("#fullpage").animate({"top": -pagelength + "px"}, 500, "swing", function(){
						$('.fullsection').eq(nextPage).addClass('viewing').siblings('.fullsection').removeClass('viewing');	
						headerFooterColorChange();
					});
				}
				else{ // 현재 마지막 페이지 일때는
					// alert("마지막 페이지 입니다!");
					return false;
				};		
				
			}
		}
	});
	$(window).resize(function(){ 
		//페이지가 100%이기때문에 브라우저가 resize 될때마다 스크롤 위치가 그대로 남아있는것을 방지하기 위해
		var resizeindex = $(".quick ul li.on").index()+1;
		
		var pagelength=0;
		for(var i = 1; i<resizeindex; i++){ 
			//총 페이지 길이 구하기
			//ex) 현재 1번페이지에서 2번페이지로 내려갈때는 1번페이지 길이 + 2번페이지 길이가 더해짐
			pagelength += $(".full"+i).height();
		}

		$("#fullpage").animate({"top": -pagelength + "px"},0);
	});
}
function headerFooterColorChange() {
	// 헤더 색상 변경
	var headerTheme = $('.fullsection.viewing').attr('data-header-theme');
	if (headerTheme === 'dark') {
		$('header').addClass('dark-theme');
		$('h1.logo img').attr('src', './images/logo_dark.png');
	} else {
		$('header').removeClass('dark-theme');
		$('h1.logo img').attr('src', './images/logo.png');
	}

	// 푸터 색상 변경
	var footerTheme_1 = $('.fullsection.viewing').attr('data-footer-theme-1');
	var footerTheme_2 = $('.fullsection.viewing').attr('data-footer-theme-2');
	var footerTheme_3 = $('.fullsection.viewing').attr('data-footer-theme-3');
	var footerTheme_4 = $('.fullsection.viewing').attr('data-footer-theme-4');

	if (footerTheme_1 === 'dark') $('.foot-c-1').addClass('dark-theme');
	else $('.foot-c-1').removeClass('dark-theme');
	if (footerTheme_2 === 'white') $('.foot-c-2').addClass('white-theme');
	else $('.foot-c-2').removeClass('white-theme');
	if (footerTheme_3 === 'white') $('.foot-c-3').addClass('white-theme');
	else $('.foot-c-3').removeClass('white-theme');
	if (footerTheme_4 === 'dark') $('footer .copyright').addClass('dark-theme');
	else $('footer .copyright').removeClass('dark-theme');
}