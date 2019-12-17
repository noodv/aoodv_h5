<template>
  <div class="wrapper">
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in imgs" :key="item.id" class="item" > 
        <img :src="item" class="image" @click="changeToCoursedetails(item)">
      </mt-swipe-item>
    </mt-swipe>
    <div class="courses">
      <ul v-for="(item, i) in 3" :key="i" class="recommend">
        <span class="head">fdsafdsafdsaf</span>
        <li v-for="(item, i) in blogPostList" :key="i" class="course-detail" @click="changeToCoursedetails(course)">
          <img :src="item.firstImage" alt="">
          <span class="title">{{item.subject}}</span>
          <div class="relevent">
            <star :size="24" :score="item.starLevel" class="star"></star>
            <span class="starlevel">{{item.starLevel}}</span>
            <span class="learnnumber">{{item.learnNumber}}人学过</span>
            <span class="newprice">￥{{item.newPrice}}</span>
            <span class="oldprice" v-if="item.oldPrice">￥{{item.oldPrice}}</span>
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

export default {
  components:{
    star,
  },
  computed:{
    // ...mapGetters({       
    //   user: 'getUserData'
    // }),
    ...mapState(['app'])
  },
  mounted(){
    this.load()
    // this.scroll(this.blogPostList)
  },
  data() {
    return{
      blogPostList: {},
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
      },
      imgs: [
        'http://www.flw.ph/data/attachment/forum/201910/16/143910dj4iyangnjjxiiga.jpg',
        'http://www.flw.ph/data/attachment/common/cf/093945da212r2kykgzbxee.jpg',
        'http://www.flw.ph/data/attachment/forum/201910/16/143911b2w58ii2luw25234.png',
        'http://www.flw.ph/data/attachment/forum/201912/02/152154leu6de99fqf3njf4.jpg',
        'http://www.flw.ph/data/attachment/forum/201910/16/143910g0zndr2n9zbx4k0b.jpg'
      ]
    }
  },
  methods: {
    changeToCoursedetails(course){
      this.$router.push({path:"/home/coursedetails" , query:{id:course.id}})
      // this.$router.push({name:"Coursedetails" , params:{id:course.id}})
    },
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
    },
    changeToCoursedetails(course) {
      this.$router.push({path:"/home/coursedetails" , query:{id:course.id}})
    },
    scroll(list) {
      let isLoading = false
      window.onscroll = () => {
        if (this.app.selectedModel !== '5') return
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
  // overflow scroll
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
    .recommend
      margin 0
      padding 0
      .head
        display block
        font-size 0.47rem
        margin 0.42667rem
        margin-bottom 0
        font-weight 600
      .course-detail
        list-style-type none
        width 4.224rem
        height 5.12rem
        display inline-block
        margin-top 0.42667rem
        margin 0.384rem
        vertical-align: middle
        &:active
          background-color #f2f4f7
        &>img 
          width 4.224rem
          height 2.56rem
        // .title
        .title
          font-size #333440
        .relevent
          .star
            display inline-block
          .starlevel
          .learnnumber
            font-size 0.29867rem
            color #a6abb3
          .newprice 
            font-size 0.46933rem
            color #ff4400
          .oldprice
            position relative
            display inline-block
            font-size 0.34134rem
            color #a6abb3
            &:after
              position absolute
              top 50%
              right -5%
              content ''
              width 1.2667rem
              height 0.04267rem
              background-color #a6abb3
      
</style>
