// utils
var ua = window.navigator.userAgent;
var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
var isIos = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

// pageControl
var prevIndex = 0;
var mySwiper = null;

// lottie动画
var animation3 = null;
var animation8 = null;
var animation9 = null;
var animation10 = null;


var timeout = 0 // 用来节流
function initData() {
  if (timeout) return
  timeout = setTimeout(() => {
    clearTimeout(timeout)
    timeout = 0
  }, 2000) // 节流
  // 数据请求相关
  const _time = new Date().getTime()
  var dataUrl = '/ares-mobile-gateway/finance/myYearBill.do'
  var cust_no = '0123456789';
  $.ajax({
    type: 'GET',
    url: dataUrl,
    data: {
      cust_no: cust_no,
      _time
    },
    dataType: 'json',
    timeout: 3000,
    success: function (res) {
      const data = res.body
      if (data && data.retCode == 429) {
        // console.log("ssss");
        $(".errModal").attr("class", 'errModal')
        return;
      } else {
        $(".errModal").attr("class", 'errModal errModal--hide')
      }
      if (data && data.retCode == 200) {
        var projectData = data.result[0];
        window.projectData = projectData;
        window.eventBus.dispatch('initPage', projectData)
      }
    },
    error: function (xhr, type) {
      // $(".errModal").attr("class", 'errModal')
    }
  })
}
initData();



// ========= 背景音乐控制 ==========
var bgSoundIsPlaying = false;
var bgSound = new Howl({
  src: ['./assets/sound.mp3', './assets/sound.ogg'],
  loop: true,
  autoplay: true,
  onplay: function () {
    // console.log('开始播放音乐');
    bgSoundIsPlaying = true;
    $('#musicPlayer').addClass('active');
  },
  onpause: function () {
    // console.log('暂停播放');
    bgSoundIsPlaying = false;
  }
})
// 点击音乐按钮判断开关
$('#musicPlayer').on('click', function () {
  if (bgSoundIsPlaying) {
    bgSound.pause();
    $(this).removeClass('active');
  } else {
    bgSound.play();
    $(this).addClass('active');
  }
})


// 网络异常的弹窗关闭按钮
$(".modal__close_btn").on("click", () => {
  initData()
});


// ========== Android svga 优化代码 ============
// svga 背景播放单例
var svgaCanvasA = document.createElement('canvas');
var svgaCanvasB = document.createElement('canvas');
var svgaCanvasC = document.createElement('canvas');

var bgSvgaPlayerA = new SVGA.Player(svgaCanvasA);
var bgSvgaPlayerB = new SVGA.Player(svgaCanvasB);
var bgSvgaPlayerC = new SVGA.Player(svgaCanvasC);

var svgaParser = new SVGA.Parser();

var svgaA = {
  canvas: svgaCanvasA,
  parser: svgaParser,
  player: bgSvgaPlayerA,
  index: 0,
}
var svgaB = {
  canvas: svgaCanvasB,
  parser: svgaParser,
  player: bgSvgaPlayerB,
  index: 1,
}
var svgaC = {
  canvas: svgaCanvasC,
  parser: svgaParser,
  player: bgSvgaPlayerC,
  index: 2,
}
var videoItemMap = {};
var svgaList = [svgaA, svgaB, svgaC]

/**
 * svga 懒加载器
 * @param {Number} pageIndex 下一个页面的 index
 */
var svgaLoader = function (pageIndex, isInit) {
  // console.log(pageIndex, svgaList)

  var curSvga = null;
  var activeSvga = null;
  for (var i=0; i<svgaList.length; i++) {
    var svga = svgaList[i];
    if (svga.index === pageIndex) {
      curSvga = svga
    }
    if (svga.player._videoItem) {
      if (svga.index === pageIndex) {
        svga.player.stepToFrame(0, true)
      } else {
        svga.player.stepToFrame(0)
      }
    }
  }

  var svgaElId = 'svgaBg' + (pageIndex + 1)
  var $svgaEle = $('#' + svgaElId); // 即将滑到的下一个svga容器
  if (isInit) {
    $svgaEle.append(curSvga.canvas);
    if ($svgaEle.attr('svga')) {
      // console.log('src', window.location.origin + $svgaEle.attr('svga'))
      curSvga.index = pageIndex;
      if (!videoItemMap[svgaElId]) {
        curSvga.parser.load(window.location.origin + $svgaEle.attr('svga'), loadedSvga);
      } else {
        loadedSvga(videoItemMap[svgaElId], true);
      }
    }
    return;
  }

  // 找出离下一个 index 最远的，用来填补移动方向的下下页
  (Math.abs(svgaA.index - pageIndex) > 1) && (curSvga = svgaA);
  (Math.abs(svgaB.index - pageIndex) > 1) && (curSvga = svgaB);
  (Math.abs(svgaC.index - pageIndex) > 1) && (curSvga = svgaC);
  if (!curSvga) return;
  $(curSvga.canvas).remove(); // 从原来的页面移除

  // 找出滑动方向上的下下页，和index
  var nextIndex = 0, nextId;
  if (curSvga.index < pageIndex) { // 滑到下一页
    nextIndex = pageIndex + 1;
    nextId = 'svgaBg' + (pageIndex + 2)
    $svgaEl = $('#' + nextId);
    // console.log('下下页', $svgaEl, nextIndex, $svgaEl.length)
  } else { // 滑到上一页
    nextIndex = pageIndex - 1;
    nextId = 'svgaBg' + pageIndex
    $svgaEl = $('#' + nextId);
    // console.log('上上页', $svgaEl, nextIndex)
  }
  if ($svgaEl.length == 0) {
    curSvga.index = nextIndex;
    return;
  };

  curSvga.player.clear();
  $svgaEl.append(curSvga.canvas);
  if ($svgaEl.attr('svga')) {
    if (!videoItemMap[nextId]) {
      curSvga.parser.load(window.location.origin + $svgaEl.attr('svga'), loadedSvga);
    } else {
      loadedSvga(videoItemMap[nextId], false)
    }
  }
  curSvga.index = nextIndex;

  // 加载svga动画
  function loadedSvga(res, cache = true) {
    // console.log('res', res);
    setMatrix(curSvga.canvas, res, $svgaEle);
    setTimeout(function () {
      setMatrix(curSvga.canvas, res);
    }, 100);
    curSvga.player.setVideoItem(res);
    curSvga.player.stepToFrame(0, true);
    if (curSvga.index !== pageIndex) {
      setTimeout(function() {
        curSvga.player.stepToFrame(0);
      }, 500)
    }
    if (cache) {
      videoItemMap[nextId] = res;
    }
  }
}


window.addEventListener('load', function () {
  mySwiper = new Swiper('.swiper-container', {
    direction: 'vertical', // 垂直切换选项
    loop: false, // 循环模式选项
    allowSwipeToNext: false,
    allowSwipeToPrev: true,
    onSlideChangeEnd: function (sp) {
      sp.lockSwipeToPrev()
      sp.lockSwipeToNext()
      setTimeout(function() {
        sp.unlockSwipeToNext()
        sp.unlockSwipeToPrev()
      }, 600)

      if (sp.activeIndex > prevIndex) {
        window.eventBus.dispatch('nextPage', sp);
      } else {
        window.eventBus.dispatch('prevPage', sp);
      }
      prevIndex = sp.activeIndex;

      // svga 动画懒加载
      svgaLoader(sp.activeIndex);

      // lottie 处理
      if (sp.activeIndex === 2) {
        animation3 && animation3.play();
      } else {
        animation3 && animation3.stop();
      }
      if (sp.activeIndex === 7) {
        animation8 && animation8.play();
      } else {
        animation8 && animation8.stop()
      }
      if (sp.activeIndex === 8) {
        animation9 && animation9.play();
      } else {
        animation9 && animation9.stop();
      }
      if (sp.activeIndex === 9) {
        animation10 && animation10.play();
      } else {
        animation10 && animation10.stop();
      }
    },
  })

  svgaLoader(0, true);
  svgaLoader(1, true);
})


// svga动画布局
function setMatrix(canvas, videoItem, $parent, contentMode = 'AspectFit') {
  canvas.style.backgroundColor = 'transparent';
  canvas.width = videoItem.videoSize.width;
  canvas.height = videoItem.videoSize.height;
  var e = !1;
  var t = $parent ? {
    width: $parent.width(),
    height: $parent.height(),
  } : {
    width: canvas.parentNode.clientWidth,
    height: canvas.parentNode.clientHeight,
  };
  var r = videoItem.videoSize;
  if (t.width >= r.width && t.height >= r.height) {
    canvas.width = t.width;
    canvas.height = t.height;
    canvas.style.webkitTransform = canvas.style.transform = '';
    e = !0;
  } else {
    if (canvas.width == r.width && canvas.height == r.height && 'Fill' === contentMode) {
      var i = t.width / r.width,
        n = t.height / r.height,
        o = (r.width * i - r.width) / 2,
        s = (r.height * n - r.height) / 2;
      canvas.style.webkitTransform = canvas.style.transform = "matrix(" + i + ", 0.0, 0.0, " + n + ", " + o + ", " + s + ")";
    } else if ("AspectFit" === contentMode || "AspectFill" === contentMode) {
      var a = r.width / r.height,
        f = t.width / t.height;
      if (a >= f && "AspectFit" === contentMode || a <= f && "AspectFill" === contentMode) {
        var l = t.width / r.width,
          u = (r.width * l - r.width) / 2,
          h = (r.height * l - r.height) / 2 + (t.height - r.height * l) / 2;
        canvas.style.webkitTransform = canvas.style.transform = "matrix(" + l + ", 0.0, 0.0, " + l + ", " + u + ", " + h + ")"
      } else if (a < f && "AspectFit" === contentMode || a > f && "AspectFill" === this._contentMode) {
        var c = t.height / r.height,
          d = (r.width * c - r.width) / 2 + (t.width - r.width * c) / 2,
          p = (r.height * c - r.height) / 2;
        canvas.style.webkitTransform = canvas.style.transform = "matrix(" + c + ", 0.0, 0.0, " + c + ", " + d + ", " + p + ")"
      }
    }
  }
}


// 页面资源懒加载
window.eventBus.addEventListener('nextPage', function (e) {
  var sper = e.target;

  // 下下一个页面
  $page = $('#page' + (sper.activeIndex + 2));
  // 背景图懒加载：如果存在下一个页面，并且背景图没有加载，并且有src自定义属性
  if ($page && $page.css('background-image') == 'none' && $page.attr('src')) {
    $page.css('background-image', 'url("' + window.location.origin + $page.attr('src') + '")');
  }
})

document.addEventListener("visibilitychange", function () {
  if (document.visibilityState == "visible") {
    if (!bgSoundIsPlaying) {
      // console.log("sss");
      bgSound.play();
      $(this).addClass('active');
    }
  }
  if (document.visibilityState == "hidden") {
    if (bgSoundIsPlaying) {
      bgSound.pause();
      $(this).removeClass('active');
    }
  }
})

// 修改过 自定义alert弹窗
window.alert = function (name) {
  $(".alert__content__text").text(name)
  $('.alert').attr('class', 'alert')
}

// 修改过 alert__Btn添加事件
$('.alert__btn').on('click', () => {
  $('.alert').attr('class', 'alert alert--hide')
})