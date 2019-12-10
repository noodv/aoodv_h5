<template>
  <div class="tab">
    <mt-tabbar  v-show="isShowTabbar" fixed>
      <mt-tab-item id="首页" class="tabbar-item" @click.native="changeToMain">
        <i slot="icon" class="icon iconfont icon-shouye" :style="maincolor"></i>
        首页
      </mt-tab-item>
      <mt-tab-item id="分类" class="tabbar-item" @click.native="changeToClass">
        <i slot="icon" class="icon iconfont icon-leimupinleifenleileibie2" :style="classifycolor"></i>
        分类
      </mt-tab-item>
      <mt-tab-item class="tabbar-item" @click.native="showCard">
        <i class="iconfont icon-tableedit fs-35"></i>
      </mt-tab-item>
      <mt-tab-item id="我的学习" class="tabbar-item" @click.native="changeToLearn">
        <i slot="icon" class="icon iconfont icon-icon" :style="learncolor"></i>
        我的学习
      </mt-tab-item>
      <mt-tab-item id="账号" class="tabbar-item" @click.native="changeToMy">
        <i slot="icon" class="icon iconfont icon-icon_account" :style="mycolor"></i>
        账号
      </mt-tab-item>
    </mt-tabbar>
    <mt-popup class="sharePopup" v-model="popupVisible" position="bottom">
      <div class="popcontainer">
        <div class="edit-card" style="background-color: #5ad4a1" @click="onToAddtopic">话题</div>
        <div class="edit-card" style="background-color: #ffb300" @click="onToAddAsk">问答</div>
        <div class="edit-card" style="background-color: #91b9eb" @click="onToAddBlog">博客</div>
      </div>
    </mt-popup>
  </div>
  
</template>

<script>
import { mapState } from 'vuex'
import { getToken } from '@/common/js/utils'

const iconColor = "color: #cdcdcd"
const iconColorActive ="color: #3c4a55"

export default {  
    data(){
      return{
        popupVisible: false,
        maincolor: iconColorActive,
        classifycolor: iconColor,
        learncolor: iconColor,
        mycolor: iconColor,
      }
    },
   	computed: {
       ...mapState({
        loginFlag: state => state.user.loginFlag
      }),
      isShowTabbar () {
        let routeLength = this.$route.path.split('/').length;
        // let home = this.$route.path.split('/')[1];
        return routeLength > 2  ? false : true;
      }
    }, 
    methods:{
      changeToMain(){
        this.$router.push({path:'/index'});
        this.maincolor = iconColorActive;
        this.classifycolor = iconColor;
        this.learncolor = iconColor;
        this.mycolor = iconColor;
      },
      changeToClass(){
        this.$router.push({path:'/classify'});
        this.maincolor = iconColor;
        this.classifycolor = iconColorActive;
        this.learncolor = iconColor;
        this.mycolor = iconColor;        
      },
      changeToLearn() {
        this.$router.push({path:'/mystudy'});       
        this.maincolor = iconColor;
        this.classifycolor = iconColor;
        this.learncolor = iconColorActive;
        this.mycolor = iconColor;   
      },
      changeToMy(){
        this.$router.push({path:'/account'});      
        this.maincolor = iconColor;
        this.classifycolor = iconColor;
        this.learncolor = iconColor;
        this.mycolor = iconColorActive;    
      },
      onToAddtopic() {
        this.$router.push({path:'/addtopic'})
        this.popupVisible = false
        this.maincolor = iconColor;
        this.classifycolor = iconColor;
        this.learncolor = iconColor;
        this.mycolor = iconColor
      },
      onToAddBlog() {
        this.$router.push({path:'/addblog'})
        this.popupVisible = false
        this.maincolor = iconColor;
        this.classifycolor = iconColor;
        this.learncolor = iconColor;
        this.mycolor = iconColor
      },
      onToAddAsk() {
        this.$router.push({path:'/addask'})
        this.popupVisible = false
        this.maincolor = iconColor;
        this.classifycolor = iconColor;
        this.learncolor = iconColor;
        this.mycolor = iconColor
      },
      showCard() {
        console.log('aaaaaaaaaaaaaaaaa', this.loginFlag)
        if (!this.loginFlag) {
          // 如果用户没有登录，则跳转登录页面
          this.$router.push({path:'/account/login'})
          return
        }
        this.popupVisible = true
      }
    }
}
</script>

<style lang="stylus" scoped>
.tab
  .tabbar-item
    display: inline-block
    .icon 
      font-size: 25px
  .mint-tabbar 
    height: 8%
  .mint-tab-item
    vertical-align center
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
  .fs-35
    font-size: 35px

.sharePopup
  width 100%

.popcontainer
  display flex
  flex-wrap wrap 
  line-height: 70px
  text-align: center
  font-size: 16px;

.popcontainer
  .edit-card
    margin 20px 20px
    width 70px
    height 70px

</style>

