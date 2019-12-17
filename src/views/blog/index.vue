<template>
  <div class="wrapper">
    <div class="popular">
      <span class="popular-title"></span>
    </div>
    <div class="courses">
      <ul>
        <li v-for="(item, i) in blogPostList" :key="i" class="course" @click="onToDetail(item)">
          <div v-if="item.firstImage" class="course-image">
            <img :src="item.firstImage" alt="">
          </div>
          <div class="course-detail">
            <span class="course-title">{{item.subject}}</span>
            <star :size="24" :score="item.title" class="star"></star>
            <span class="starlevel">{{item.title}}</span>
            <span class="learnnumber">{{item.title}}人学过</span>
            <span class="mainmessage">{{ item.simplMessage }}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { Indicator } from 'mint-ui'
import star from '@/components/star/star'
import { findAppBlogPostList } from '@/api'
import axios from 'axios'

export default {
  components:{
    star
  },
  computed:{
    ...mapState(['app'])
  },
  mounted(){
    this.load()
  },
  data(){
    return{
      blogPostList: [],
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
  created() {
  },
  methods:{
    load() {
      Indicator.open()
      findAppBlogPostList(this.formData).then(res => {
        res.rows.forEach((item) => {
          this.blogPostList.push(item)
        })
        this.$nextTick(() => {
          Indicator.close()
        })
      }).catch(() => {
        Indicator.close()
      })
      // 激活向下滚动查询
      this.scroll(this.blogPostList)
    },
    onToDetail(course) {
      this.$router.push({path:"/blogview" , query:{id:course.id}})
    },
    scroll(list) {
      let isLoading = false
      window.onscroll = () => {
        if (this.app.selectedModel !== '4') return
        // 距离底部200px时加载一次
        // let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight <= -1600
        let bottomOfWindow = (window.innerHeight + document.documentElement.scrollTop) > (document.documentElement.scrollHeight - 500)
        if (bottomOfWindow && isLoading == false) {
          isLoading = true
          this.formData.pageSize = 5
          this.formData.dataLength = list.length
          this.$store.dispatch("findBlogNexts", this.formData).then(res => {
            if (res.obj == undefined) {
              return
            }
            res.obj.forEach((item) => {
              list.push(item)
            })
          })
          isLoading = false
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  background-color #f2f4f7
  margin-bottom 1.28rem
  .mint-tab-container
    .mint-swipe
      height 4.2667rem
      .mint-swipe-items-wrap
        height 4.2667rem
        .image
          width 10rem
          height 4.2667rem
  .courses
    padding 0.3333rem
    margin-top 0.2rem
    background-color white
    &>ul
      padding 0
      margin-bottom 1rem
      .title
        display block
        font-size 0.3rem
        text-align center
        position relative 
        color #81929a
        &:before
          content ''
          position absolute
          top: 47%;
          left: 39%;
          width 0.35rem
          height 0.02rem
          background-color #8b8f97
        &:after
          content ''
          position absolute
          top: 47%;
          right: 39%;
          width 0.35rem
          height 0.02rem
          background-color #8b8f97
      .head
        display block
        font-size 0.6rem
        text-align center
      .course
        list-style-type none
        margin-top 0.2rem
        width 9.4rem
        height 2.5rem
        &:active
          background-color #f2f4f7
        .course-image
          display inline-block
          &>img
            width 2.1rem
            height 2.1rem
            vertical-align top
            border-radius 0.3rem
        .course-detail
          vertical-align: top;
          display inline-block
          margin-left 0.3333rem
          width 6.3333rem
          height 2.4rem
          color #8b8f97
          font-size 0.3rem
          position relative
          .course-title
            display block
            color black 
            font-size 0.45rem
          .star
            display inline-block
            margin-top 0.1111rem
            margin-bottom 0.1111rem
          .mainmessage
            position absolute
            bottom 0.32rem
            display block 
            height 0.9111rem
            // white-space inherit
            // overflow hidden
            // text-overflow ellipsis 
            text-overflow: -o-ellipsis-lastline
            overflow: hidden
            text-overflow: ellipsis
            display: -webkit-box
            -webkit-line-clamp: 2
            -webkit-box-orient: vertical
            font-size 0.35rem
</style>
