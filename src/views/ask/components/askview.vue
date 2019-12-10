<template>
  <div>
    <mt-header title="奎松省8人在警车内吸大麻被捕">
      <router-link to="" @click.native="back" slot="left">
        <mt-button class="back-button">返回</mt-button>
      </router-link>
      <!-- <mt-button icon="more" slot="right" @click="bottomPopupVisible=true"></mt-button> -->
    </mt-header>
    <div class="bg-f heads bbw1 p10">
      <h3 style="font-size:18px;">奎松省8人在警车内吸大麻被捕</h3>
      <dl class="itemlist">
        <p class="z desc" style="margin-top:5px;line-height: 16px;">
          <span>查看210</span> &nbsp;
          <span>评论0</span>
        </p>
      </dl>
    </div>

    <div class="bg-f bbw1 p12">
      <div class="userinfo itemlist flexbox">
        <a class="user flex" href="home.php?mod=space&amp;uid=53889&amp;do=profile&amp;mobile=2">
          <span class="avatar" style="float:left; padding-right:10px;">
            <img src="http://www.flw.ph/uc_server/avatar.php?uid=53889&amp;size=big" />
          </span>
          <p class="title">
            菲龙网新闻部3
            <span class="level">Lv.9</span>
          </p>
          <p class="time">2019-12-9 15:35</p>
        </a>
        <a href="home.php?mod=spacecp&amp;ac=follow&amp;op=add&amp;hash=31fbb637&amp;fuid=53889&amp;mobile=2"
          class="dialog linkbt y"
          style="margin-top:10px; height:23px;"
        >+ 关注</a>
      </div>
      <div id="main3x" class="area"></div>
      <div class="display">
        <div class="message">
          <br />
          <br />
          <div align="center">
            <a
              href="forum.php?mod=viewthread&amp;tid=885398&amp;aid=1350892&amp;from=album&amp;page=1&amp;mobile=2"
              class="orange"
            >
              <img
                id="aimg_1350892"
                src="@/assets/cat.jpg"
                alt="D2-Mahindra201511102.jpg"
                title="D2-Mahindra201511102.jpg"
              />
            </a>
          </div>
          <br />
          <br />【菲龙网专讯】奎松省（Quezon）警方表示，当局周一（9日）清晨在Tayabas市的一辆警车内发现8人正在吸食大麻，于是逮捕了18岁的农民及其他7名未成年。
          <br />
          <br />奎松省警方表示，德拉佩尼亚（Jovert de la Peña）和其他7名未成年当时在停放在汽车修理厂的Mahindra警车内吸食干大麻叶。
          <br />
          <br />警方从犯罪嫌疑人手中查获一根小玻璃管，里面装有2.45克大麻叶，香烟纸和吸大麻用具。
          <br />
          <br />据报道，当局在接到附近民众报案后立即前往现场查证。
          <br />
          <br />
        </div>
      </div>
      <div id="main2x" class="area"></div>
      <div id="main2" class="area"></div>
    </div>

    <mt-button style="width: 100%; margin: 10px auto;" type="primary">发布</mt-button>
    <mt-popup
      class="sharePopup"
      v-model="bottomPopupVisible"
      position="bottom"
      popup-transition="popup-fade"
    >
      <mt-picker style="height: 100%;" :slots="slots" @change="changeType"></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui'

export default {
  data () {
    return {
      bottomPopupVisible: false,
      formData: {
        username: '',
        typeId: '',
        phone: ''
      },
      slots: [
        {
          flex: 1,
          values: ['2015-01', '2015-02', '2015-03', '2015-04', '2015-05', '2015-06'],
          className: 'slot1',
          textAlign: 'center'
        }
      ]
    }
  },
  methods: {
    changeType () {
    },
    back() {
      this.$router.push({path: '/'})
    }
  }
}
</script>

<style scoped>
* {
    word-wrap: break-word;
    margin: 0;
    padding: 0;
}

html,
body {
  height: 100%;
  font: 14px/1.6 "Microsoft YaHei", Hei, arial, sans-serif;
  color: #4c4c4c;
  background: #f3f3f3;
}
.sharePopup {
  width: 100%;
}
h3,
.title {
  color: #333;
  font-size: 16px;
  font-weight: 400;
}
.bbw1 {
  border-bottom: 1px solid #ebebeb;
}
.bg-f {
  background-color: #fff;
}
.p10 {
  padding: 10px 10px;
}
.desc,
.time {
  color: #999;
}
.z {
  float: left;
  font-size: 14px;
}
body,
ul,
ol,
li,
dl,
dd,
p,
h1,
h2,
h3,
h4,
h5,
h6,
form,
fieldset,
.pr,
.pc {
  margin: 0;
  padding: 0;
}
ul,
.itemlist {
  margin-top: 3px;
  overflow: hidden;
}

.userinfo.itemlist .user .avatar img {
    width: 48px;
    height: 48px;
}
h3, .title {
    color: #333;
    font-size: 16px;
    font-weight: 400;
}
body, ul, ol, li, dl, dd, p, h1, h2, h3, h4, h5, h6, form, fieldset, .pr, .pc {
    margin: 0;
    padding: 0;
}
a:link, a:visited, a:hover {
    color: #507daf;
    text-decoration: none;
}

.linkbt, .typelist a.curr {
    background-color: #4ebefb;
}
.linkbt {
    background-color: #4c4c4c;
    border-radius: 2px;
    display: inline-block;
    color: #fff!important;
    font-size: 12px;
    padding-right: 5px;
    padding-left: 5px;
    line-height: 22px;
}

.y {
    float: right;
}
.message img {
    max-width: 100%;
}
img, a img {
    border: 0;
    margin: 0;
    padding: 0;
}
.bbw1 {
    border-bottom: 1px solid #ebebeb;
}
.bg-f {
    background-color: #fff;
}
.p12 {
    padding: 12px;
}

.display .message {
    font-size: 15px;
}
.message {
    line-height: 25px;
}
.flexbox {
  display: flex;
}
.linkbt, .typelist a.curr {
    background-color: #4ebefb;
}
.flex {
  flex: 1;
}
.back-button {
  margin-left: 20px;
  color: #ffffff;
}
</style>