$(function () {
  mainInit();
  $(document).on('click', 'a[href="#"]', function (e) { e.preventDefault() })
})

function mainInit() {
  gnb_menu();
  top_menu();
  visual();
  project();
  family();
}

//메뉴
function gnb_menu(){
  let $header = $('#header .bg');
  let $gnbli = $('#header .nav .gnb >li');
  let $subul = $('#header .nav .gnb >li ul');
  let $totalmenu = $('#header .top-menu .total-menu');
  let isopen = false;

  $subul.hide();
  $gnbli.hover(function(){
    $gnbli.removeClass('on');
    $(this).addClass('on')
    $subul.show();
    $header.stop().animate({height:200}, 100);
  })
  $header.on('mouseleave' , function() {
    $gnbli.removeClass('on');
    $subul.hide();
    $header.stop().animate({height:0}, 300);
})
$totalmenu.on('click',function(){
  if(!isopen){
    $subul.show();
    $header.stop().animate({height:200}, 300);
  } else {
    $subul.hide();
    $header.stop().animate({height:0}, 300);
  }
  isopen = !isopen;
})

}

function top_menu() {
  $('#header .top-menu li.lang').on('click', function () {
    $('#header .top-menu li.lang ul').slideToggle();
  })
}

function visual() {
  let arrBg = [];
  let $productImg = $('#visual .product img');
  let $modelImg = $('#visual .model img');
  let $text = $('#visual .visual-text li');
  let $paging = $('#visual .paging li');
  arrBg[0] = 'radial-gradient(circle, rgba(255,253,227,1) 30%, rgba(243,236,182,1) 100%)';
  arrBg[1] = 'radial-gradient(circle, rgba(255,237,231,1) 30%, rgba(240,210,200,1) 100%)';
  arrBg[2] = 'radial-gradient(circle, rgba(235,228,255,1) 30%, rgba(213,198,255,1) 100%)';

  $text.hide().first().show();

  $paging.on('click', function () {
    let cnt = $(this).index();
    $('#visual').css({ background: arrBg[cnt] });
    $productImg.attr('src', 'images/product' + cnt + '.png');
    $modelImg.hide().fadeIn(500);
    $modelImg.attr('src', 'images/model' + cnt + '.png');
    $text.animate({ right: -600 }, 200).fadeOut(100)
    $text.eq(cnt).animate({ right: 0 }).fadeIn(100)

    $paging.removeClass('on');
    $(this).addClass('on')
  })
}
function project() {
  let $prev = $('.main .project .btn-wrap .prev');
  let $next = $('.main .project .btn-wrap .next');
  let $projectUl = $('.main .project .project-list')
  let $projectLi = $('.main .project .project-list li')
  let cnt = 0, size = $projectLi.length, timer = null, interval = 4000, first = '', last = '', w = $projectLi.width() + 30;

  last = $('.main .project .project-list li:last');
  $projectUl.prepend(last).css({ marginLeft: '-=' + w });

  timer = setInterval(make, interval);
  function make() {
    cnt++;
    if (cnt > size - 1) {
      cnt = 0
    }
    $projectUl.animate({ marginLeft: '-=' + w }, 400, function () {
      first = $('.main .project .project-list li:first');
      $projectUl.append(first).css({ marginLeft: '+=' + w })
    })
  }

  $prev.on('click', function () {
    cnt--;
    if (cnt < 0) {
      cnt = size - 1;
    }
    $projectUl.animate({ marginLeft: '+=' + w }, 400, function () {
      last = $('.main .project .project-list li:last');
      $projectUl.prepend(last).css({ marginLeft: '-=' + w })
    })
    clearInterval(timer);
    timer = setInterval(make, interval);
  })
  $next.on('click', function () {
    cnt++;
    if (cnt > size - 1) {
      cnt = 0;
    }
    $projectUl.animate({ marginLeft: '-=' + w }, 400, function () {
      first = $('.main .project .project-list li:first');
      $projectUl.append(first).css({ marginLeft: '+=' + w })
    })
    clearInterval(timer);
    timer = setInterval(make, interval);
  })
}

function family() {
  ;(function(){
    let get = (target) => {
      return document.querySelector(target);
    }
    const $title = get('#footer .f-right .family .title');
    const $list = get('#footer .f-right .family ul');
    
    $title.addEventListener('click', function (e) {
      isopen = $list.classList.contains('on');
      $list.classList.toggle('on');
    })
  })()
}