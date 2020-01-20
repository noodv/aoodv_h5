<template>
  <div class="wrapper">
    <menusearch :isSearching="false" @showmenu="leftPopupVisible=true" @click.native="changeToSearch"></menusearch>
    <div class="tab">
      <mt-navbar v-model="app.selectedModel">
        <mt-tab-item id="1" @click.native="test">首页</mt-tab-item>
        <mt-tab-item id="2" @click.native="test">话题</mt-tab-item>
        <mt-tab-item id="3" @click.native="test">问答</mt-tab-item>
        <mt-tab-item id="4" @click.native="test">博客</mt-tab-item>
        <mt-tab-item id="5" @click.native="test">美食</mt-tab-item>
        <!-- <mt-tab-item id="6">aaa</mt-tab-item> -->
        <!-- <mt-tab-item id="7">房屋</mt-tab-item> -->
      </mt-navbar>
    </div>
    <mt-tab-container v-model="app.selectedModel" swipeable>
      <mt-tab-container-item id="1">
        <home />
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <topic ref="topic"/>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <ask ref="ask"/>
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <blog ref="blog"/>
      </mt-tab-container-item>
      <mt-tab-container-item id="5">
        <food ref="food"/>
      </mt-tab-container-item>
      <!-- <mt-tab-container-item id="6">
        <expert/>
      </mt-tab-container-item> -->
      <!-- <mt-tab-container-item id="7">
        <major />
      </mt-tab-container-item> -->
    </mt-tab-container>
    <mt-popup class="leftPopup" v-model="leftPopupVisible" position="left">
      <ul>
        <li v-for="(item, i) in techTypeList" :key="i" >{{ item.name }}</li>
      </ul>
    </mt-popup>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import food from "@/views/web/food";
import expert from "@/views/web/expert";
import major from "@/views/web/major"
import home from "@/views/home"
import topic from "@/views/topic"
import ask from "@/views/ask";
import blog from "@/views/blog";
import menusearch from "@/components/menusearch"
import { Indicator } from 'mint-ui'

export default {
  components: {
    food,
    expert,
    major,
    topic,
    home,
    menusearch,
    ask,
    blog
  },
  computed:{
    // ...mapGetters({       
    //   user: 'getUserData'
    // }),
    ...mapState(['app'])
  },
  data() {
    return{
      leftPopupVisible: false,
      techTypeList: [],
      formData: {
        value1: '',
        value2: '',
        value3: '',
        value4: '',
        value5: '',
        techTypeId: '',
        topicTitle: '',
        topicContent: '',
        pageNum: 1,
        pageSize: 26,
        totalPages: 0,
        totalRows: 0
      }
    }
  },
  mounted(){
    this.load()
  },
  methods: {
    load() {
      Indicator.open()
      this.$store.dispatch('findTechTypeList', this.formData).then(res => {
        this.techTypeList = res.rows
        this.$nextTick(() => {
          Indicator.close()
        })
      }).catch(() => {
        Indicator.close()
      })
    },
    changeToSearch(){
      // this.$router.push({path:'home/search'});
    },
    test() {
      console.log(this.app.selectedModel)
      if(this.app.selectedModel == 2){
        this.$refs.topic.load()
      } else if(this.app.selectedModel == 3) {
        this.$refs.ask.load()
      } else if(this.app.selectedModel == 4) {
        this.$refs.blog.load()
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.wrapper
  ul
    list-style none
    margin 0 0 
  li
    list-style none
    margin 0 auto 
    margin: 10px -10px;
  // position fixed
  width 100%
  .mint-search
      height initial
  .mint-navbar .mint-tab-item.is-selected
    margin 0
    // position relative
    // .serch
    //   position absolute
    //   top: 0
    //   margin: 0 auto 
  // .tab
    // height 100px
    // width 100%
    // background-color red
    // display flex
    // justify-content center 
    // align-items center 
    // .tab-item
    //   flex:1
    //   background-color blue
  // .router
  //   height 400px
  .leftPopup
    height 80%
    width: 100px
</style>
