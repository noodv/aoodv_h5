<template>
  <div class="wrapper">
    <div class="courses">
      <ul>
        <li v-for="(item, i) in forumPostList" :key="i" class="course" @click="onToDetail(item)">
          <div class="course-detail">
            <span class="course-title">{{item.simplSubject}}</span>
            <span class="learnnumber">45人看过</span>
            <span class="mainmessage">{{item.simplMessage}}</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import star from '@/components/star/star'
import { findAppForumPostList } from '@/api'
export default {
  components:{
    star
  },
  mounted(){
    findAppForumPostList(this.formData).then(res => {
      res.rows.forEach((item) => {
        this.forumPostList.push(item)
      })
    }),
    this.scroll(this.forumPostList)
  },
  data() {
    return{
        forumPostList:[],
        total: 0,
        formData: {
          pageNum: 1,
          pageSize: 15,
        }
    }
  },
  methods:{
    onToDetail(course){
      this.$router.push({path:"/blogview" , query:{id:course.id}})
    },
    scroll(list) {
      let isLoading = false
      window.onscroll = () => {
        if (this.app.selectedModel !== '2') return
        // 距离底部200px时加载一次
        // let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight <= -1600
        let bottomOfWindow = (window.innerHeight + document.documentElement.scrollTop) > (document.documentElement.scrollHeight - 500)
        if (bottomOfWindow && isLoading == false) {
          isLoading = true
          this.formData.pageSize = 5
          this.formData.dataLength = list.length
          this.$store.dispatch("findNexts", this.formData).then(res => {
            res.obj.forEach((item) => {
              list.push(item)
            })
            isLoading = false
          })
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
        margin-top 0.1rem
        width 9.4rem
        height 2rem
        &:active
          background-color #f2f4f7
        .course-image
          display inline-block
          &>img
            width 4.2222rem
            height 2.4684rem
            vertical-align top
            border-radius 0.3rem
        .course-detail
          vertical-align: top;
          display inline-block
          margin-left 0.3333rem
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

