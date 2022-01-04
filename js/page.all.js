// ========== 页面1
window.eventBus.addEventListener('initPage', function (event) {
  // console.log('初始化页面1', event.target)
})

// 开启我的年度账单
$('#page_btnStart').on('click', () => {
  if(!$("#checkbox__agree").prop("checked")) {
    alert("请先同意成都银行使用相关数据生成年度账单")
    return
  }
  // console.log('开始')
  mySwiper.unlockSwipeToNext();
  mySwiper.slideTo(1, 300, false)
  var $page = $('#page3');
  if ($page && $page.css('background-image') == 'none' && $page.attr('src')) {
    $page.css('background-image', 'url("' + window.location.origin + $page.attr('src') + '")');
  }
  window.svgaLoader(2, true);
  if (svgaB.index === 1 && svgaB.player._videoItem) {
    svgaB.player.stepToFrame(0, true)
  }
  // 12.31修改过
  if (!animation3) {
    animation3 = bodymovin.loadAnimation({
      container: document.getElementById('riceLottie'), // Required
      path: './assets/p3/rice.json', // Required
      renderer: 'svg', // Required
      loop: true, // Optional
      autoplay: true, // Optional
      name: "水稻动画", // Name for future reference. Optional.
    })
  }
})

$("#checkbox__agree__text").on("click", () => {
  // console.log($("#checkbox__agree").prop("checked"));
  $("#checkbox__agree").prop("checked", !$("#checkbox__agree").prop("checked"))
})

// ============ 页面10
window.eventBus.addEventListener("initPage", e => {
  $(".page10__content").html(`
    <p class="page__title">
      <span class="showTime1">成都银行一直陪伴您</span><br>
    </p>
    <p class="page__title--small">
      <span class="showTime2">体会这一年的悲欢喜乐</span><br>
      <span class="showTime3">新的一年新的方向</span><br>
      <span class="showTime4">继续伴您成长</span><br>
      <span class="showTime5">您的2021关键词：</span><br>
      <span class="showTime6 page__title--small--red">${e.target.cust_grp_clsfc}</span>
      </p>
    `)
})

window.eventBus.addEventListener('nextPage', function (e) {
  var sper = e.target;

  if (sper.activeIndex === 8) {
    if (!animation10) {
      animation10 = bodymovin.loadAnimation({
        container: document.getElementById('page10__lottie'), // Required
        path: './assets/p10/bg.json', // Required
        renderer: 'svg', // Required
        loop: true, // Optional
        autoplay: true, // Optional
        name: "page10__lottie", // Name for future reference. Optional.
      })
    }
  }
})
// ========= 页面12
$(".button.restart").on("click", () => {
  window.location.reload()
})

let shareTimer = -1, debunceTime = 2000
$(".button.share").on("click", () => {
  const target = $(".page12--pic")
  const _target = target.clone(true).appendTo("body")
  _target.attr("class", "page12--pic--clone")
  html2canvas(_target).then(function (canvas) {
    if (shareTimer !== -1) {
      clearTimeout(shareTimer)
      shareTimer = setTimeout(() => {
        shareTimer = -1
      }, debunceTime)
      return
    }
    shareTimer = setTimeout(() => {
      shareTimer = -1
    }, debunceTime)
    var imgUri = canvas.toDataURL("image/jpeg", 0.5); // 获取生成的图片的url
    // console.log(imgUri);
    _target.remove()
    // TODO 分享链接
  });
})
// ========= 页面11
window.eventBus.addEventListener("initPage", e => {
  $(".page12--pic .tags2021").html(e.target.cust_grp_clsfc)
});

window.eventBus.addEventListener('nextPage', e => {
  if (e.target.activeIndex === 9) {
    $banner = $('#page11Banner');
    if (!$banner.attr('src')) {
      $banner.attr('src', window.location.origin + $banner.data('src'))
    }
  }
})

$(".checkbox-item").on("click", (e) => {
  const isChecked = e.target.className.includes("checkbox-item--checked")
  if ($(".checkbox-item--checked").length >= 3 && !isChecked) {
    alert("最多选择3个愿望哦~")
    return
  }
  e.target.className = isChecked ? "checkbox-item" : "checkbox-item checkbox-item--checked"
})
$(".myTargetBtn").on("click", e => {
  $(".modal__checkbox.modal--hide").attr("class", "modal__checkbox")
})
$(".modal__checkbox__mask").on("click", () => {
  const checkedList = $(".checkbox-item--checked")
  const targetList = $(".target__line")
  const tagList = $(".tags2022__tag")
  for (let index = 0; index < targetList.length; index++) {
    const el = checkedList[index];
    targetList[index].innerHTML = el?.innerHTML || ""
    tagList[index].innerHTML = el?.innerHTML || ""
  }
  $(".modal__checkbox").attr("class", "modal__checkbox modal--hide")
})
$(".page11__banner").on("click",() => {
  window.location.href = "https://mobile.ibank.bocd.com.cn/ares-web-pmobile/page/index.html#page/42/23/P4223.html"
})

// =========== 页面2
window.eventBus.addEventListener("initPage", e => {
  let title = ''
  if (e.target.cum_bank_outls_tms >= 5)
    title = `<p class="page__title">
      <span class="showTime1">${e.target.first_bank_outls_name}网点</span><br>
    </p>
    <p class="page__title--small">
      <span class="showTime2">是你首次办理业务的网点</span><br>
      <span class="showTime3">2021您一共到网点<span class="page__title--small--red">${e.target.cum_bank_outls_tms}</span>次</span><br>
    </p>
    `
  else if (e.target.cum_bank_outls_tms >= 1 && e.target.cum_bank_outls_tms < 5)
    title = `<p class="page__title">
          <span class="showTime1">${e.target.first_login_app_dt}</span><br/>
          <span class="showTime2">是您今年首次</span><br/>
          <span class="showTime3">打开APP的时间</span>
        </p>
        <p class="page__title--small">
          <span class="showTime4">全年登陆了成都银行APP<span class="page__title--small--red">${e.target.year_login_app_tms}</span>次</span><br>
          <span class="showTime5">不知不觉</span><br>
          <span class="showTime6">成都银行陪伴您度过了<span class="page__title--small--red">${e.target.cust_crt_days}</span>天</span>
        </p>`
  else
    title = `<p class="page__title">
          <span class="showTime1">成都银行陪伴您这一年</span><br/>
        </p>
        <p class="page__title--small">
          <span class="showTime2">是喜悦、是快乐</span><br>
          <span class="showTime3">我们一直在您身边</span><br>
        </p>`
  $(".page2__content").html(`
        ${title}
        <dv class="page__desc">
          <p>第一部以"法典"命名的法律</p>
          <p>社会生活的百科全书</p>
          <p>体现了人民为中心的发展思想</p>
          <p>是实现人民美好生活向往的重要制度保障</p>
        </dv>
      `)
})

// ======== 页面3
window.eventBus.addEventListener('initPage', function (e) {
  const title = (() => {
    if(e.target.salary_arrive_acct_tms > 0) return `<p class="page__title--small page3__titlee--samll">
      <span class="showTime2">今年共到账薪资<span class="page__title--small--red">${e.target.salary_arrive_acct_tms}</span>次</span><br>
      <span class="showTime3">薪资总收入<span class="page__title--small--red">${e.target.salary_arrive_acct_amt}</span>元</span><br>
      </p>`
    else if(e.target.latst_login_dt && e.target.latst_login_tm) return `<p class="page__title--small page3__title--samll">
      <span class="showTime2"><span class="page__title--small--red">${e.target.latst_login_dt}</span>您睡的很晚</span><br>
      <span class="showTime3"><span class="page__title--small--red">${e.target.latst_login_tm}</span>您还在使用<span class="page__title--small--red">${e.target.latst_use_func}</span>功能</span>
    </p>`
    else return`<p class="page__title--small page3__title--samll">
      <span class="showTime2">寒来暑往秋收冬藏</span><br/>
      <span class="showTime3">所有收获和好运</span><br/>
      <span class="showTime4">都是您努力和善良的累积</span><br/>
      <span class="showTime5">成都银行陪伴您热爱这个世界</span>
    </p>`
  })()
  $(".page3__content").html(`
    <p class="page__title page3__title">
      <span class="showTime1">2021年</span>
    </p>
    ${title}
    <div class="page__desc page3__desc">
      <p>伟大人物的逝去</p>
      <p>值得我们缅怀</p>
      <p>每一粒稻米</p>
      <p>都值得我们去珍惜</p>
    </div>
  `)
})

// =========== 页面5
window.eventBus.addEventListener('initPage', function (e) {
  const isShowRank = e.target.prft_rank > 50,
        isInvest = e.target.invest_fin_prft_total_amt > 0
  const title = isInvest ?
    `<p class="page__title--small page5__title--small">
      <span class="showTime2">全年投资理财收益<span class="page__title--small--red">${e.target.invest_fin_prft_total_amt}</span>元</span><br>
      ${isShowRank ? `<span class='showTime3'>超越了<span class="page__title--small--red">${e.target.prft_rank}%</span>的用户</span>` : ""}
    </p>`
    :
    `<p class="page__title--small page5__title--small">
      <span class="showTime2">我知道您在为自己努力拼搏</span><br>
      <span class="showTime3">成都银行为您的每一分财产保驾护航</span><br>
    </p>`
  $(".page5__content").html(`
  <p class="page__title page5__title">
  2021年
  </p>
    ${title}
    ${isInvest ? '<div class="page5__foot">投资包含存款与理财</div>' : ''}
    <div class="page5__desc page__desc">
      <p>疫情的阴霾挥散不去 坚强的抗疫者啊</p>
      <p>我们相信黎明就在前方</p>
    </div>
  `)
})
// =========== 页面6
window.eventBus.addEventListener('initPage', function(e) {
  $(".page6__content").html(`<p class="page__title page6__title">
      <span class="showTime1">2021年</span> 
    </p>
    <p class="page__title--small page6__title--small">
      <span class="showTime2">超过${e.target.user_sum}万+客户在成都银行</span><br>
      <span class="showTime3">进行了投资</span><br>
      <span class="showTime4">总收益<span class="page__title--small--red">${e.target.user_total_prft}</span>亿元</span> 
    </p>
    <div class="page6__foot">投资包含存款与理财</div>
    <div class="page__desc">
      <p>我们抉择过</p>
      <p>努力过</p>
      <p>一代又一代的人</p>
      <p>向着未来仰望天空</p>
    </div>
  `)
})
// ========== 页面4
window.eventBus.addEventListener('initPage', function (e) {
  let title = ''
  if (e.target.tran_cnt > 0) {
    title = `<p class="page__title page4__title">
    <span class="showTime1">这一年的您</span><br>
    </p>
    <p class="page__title--small">
      <span class="showTime2">共转账<span class="page__title--small--red">${e.target.tran_cnt}</span>次</span><br>
      <span class="showTime3">其中最大的一笔是<span class="page__title--small--red">${e.target.tran_max_amt}</span>元</span><br>
    </p>`
  }
  else if (e.target.use_func_cnt > 0) {
    title = `<p class="page__title page4__title">
        <span class="showTime1">这一年的您</span><br>
      </p>
      <p class="page__title--small">
        <span class="showTime2">使用了成都银行<span class="page__title--small--red">${e.target.use_func_cnt}</span>个功能</span><br>
        <span class="showTime3"><span class="page__title--small--red">${e.target.often_use_func}</span>是您常用的功能</span><br>
      </p>`
  }
  else {
    title = `<p class="page__title page4__title">
        <span class="showTime1">这一年的您</span><br>
      </p>
      <p class="page__title--small">
        <span class="showTime2">交织着幸运和活力</span><br>
        <span class="showTime3">成都银行怀抱着感恩的心</span><br>
        <span class="showTime4">期盼您能够实现更多的梦想</span><br>
      </p>`
  }
  $(".page4__content").html(`
    ${title}
    <div class="page4__desc page__desc">
      <p>我们一起祈愿</p>
      <p>山河无恙，举世皆安</p>
    </div>
  `)
})
// ========== 页面7
window.eventBus.addEventListener("initPage", e => {
  // buy_hos_loan_flag // 是否置业 1是 0否
  // rgl_txn_cnt       // 多少笔定期
  const buyHosLoanFlag = e.target.buy_hos_loan_flag == 1 ? `
    <p class="page__title">
      <span class="showTime1">2021年</span><br>
      <span class="showTime2">您有了自己的一个家</span><br>
      <span class="showTime3">温馨且幸福</span>
    </p>
  ` : ""
  const rglTxnCntStartTime = e.target.buy_hos_loan_flag == 1 ? 4 : 1
  const rglTxnCnt = e.target.rgl_txn_cnt > 0 ? `
  <p class="page__title">
    <span class="showTime${rglTxnCntStartTime}">2021年</span><br>
  </p>
  <p class="page__title--small">
  <span class="showTime${rglTxnCntStartTime + 1}">全年您一共存了<span class="page__title--small--red">${e.target.rgl_txn_cnt}</span>笔定期</span><br>
    <span class="showTime${rglTxnCntStartTime + 2}">年复一年，给自己一个小目标</span><br>
    <span class="showTime${rglTxnCntStartTime + 3}">成都银行始终伴随你左右</span>
  </p>
  ` :
  `<p class="page__title--small" style="margin-top: 60px">  
    <span class="showTime${rglTxnCntStartTime}">继续努力，给自己定一个小目标</span><br>
    <span class="showTime${rglTxnCntStartTime + 1}">成都银行始终伴随你左右</span>
  </p>`
  $('.page7__content').html(`
  ${
    e.target.buy_hos_loan_flag == 1 ? 
    buyHosLoanFlag :
    rglTxnCnt
  }
  <div class="page__desc">
    <p>为这伟大时刻欢呼</p>
    <p>奋斗百年路</p>
    <p>启航新征程</p>
  </div>
  `)
})
// ======== 页面8 
window.eventBus.addEventListener("initPage", e => {
  let title = ''
  if (e.target.year_end_total_ast > 0) {
    title = `<p class="page__title">
      <span class="showTime1">这一年</span><br>
    </p>
    <p class="page__title--small">
      <span class="showTime2">您的年末总资产<span class="page__title--small--red">${e.target.year_end_total_ast}</span>元</span><br>
      <span class="showTime3"><span class="page__title--small--red">${e.target.ast_most_month}</span>月您的存款金额是全年最多</span><br>
      <span class="showTime4">达到了<span class="page__title--small--red">${e.target.ast_most_amt}</span>元</span>
    </p>`
  } else {
    title = `<p class="page__title">
    <span class="showTime1">生活是勤劳的结晶</span><br>
  </p>
  <p class="page__title--small">
    <span class="showTime2">我们一次又一次的证明自己</span><br>
    <span class="showTime3">为着未来迎难而上</span>
  </p>`
  }
  $(".page8__content").html(`
  ${title}
<div class="page__desc page8__desc">
  <p>夏天</p>
  <p>奥运会场</p>
  <p>运动的汗水是努力的证明</p>
  <p>我们也在为自己努力</p>
</div>
`)
})



window.eventBus.addEventListener('nextPage', function (e) {
  var sper = e.target;

  if (sper.activeIndex === 7) {
    if (!animation8) {
      animation8 = bodymovin.loadAnimation({
        container: document.getElementById('page8__lottie'), // Required
        path: './assets/p8/bg.json', // Required
        renderer: 'svg', // Required
        loop: true, // Optional
        autoplay: true, // Optional
        name: "page8__lottie", // Name for future reference. Optional.
      })
    }
  }
})
// ========== 页面9
window.eventBus.addEventListener("initPage", e => {
  let title = ""
  if (e.target.pay_cnt > 0 && e.target.consm_total_amt > 0) {
    title = `<p class="page__title">
      <span class="showTime1">一年的您</span><br>
    </p>
    <p class="page__title--small">
      <span class="showTime2">支付了<span class="page__title--small--red">${e.target.pay_cnt}</span>笔</span><br>
      <span class="showTime3">消费了<span class="page__title--small--red">${e.target.consm_total_amt}</span>元</span><br>
      <span class="showTime4">消费金额超越了成都银行全行<span class="page__title--small--red">${e.target.consm_amt_rank}%</span>的人</span><br>
    </p>`
  } else {
    title = `<p class="page__title">
    <span class="showTime1">期待过、盼望过</span><br>
  </p>
  <p class="page__title--small">
    <span class="showTime2">我们的梦想都将实现</span><br>
    <span class="showTime3">成都银行一直在默默守护您</span><br>
    <span class="showTime4">征服大海征服宇宙</span><br>
  </p>`
  }
  $('.page9__content').html(`
  ${title}
  <div class="page__desc">
    <p>我们从来不止步于此</p>
    <p>向往着星辰大海</p>
    <p>蔚蓝是我们前进的方向</p>
  </div>
  `)
})


window.eventBus.addEventListener('nextPage', function (e) {
  var sper = e.target;
  // 12.31修改过
  if (sper.activeIndex === 7) {
    if (!animation9) {
      animation9 = bodymovin.loadAnimation({
        container: document.getElementById('flamesLottie'), // Required
        path: './assets/p9/flames.json', // Required
        renderer: 'svg', // Required
        loop: true, // Optional
        autoplay: true, // Optional
        name: "flames", // Name for future reference. Optional.
      })
    }

    var $page9Rocket = $('#page9Rocket');
    if ($page9Rocket.css('background-image') == 'none') {
      $page9Rocket.css('background-image', 'url("' + window.location.origin + '/assets/p9/huojian.png")')
    }
  }
})