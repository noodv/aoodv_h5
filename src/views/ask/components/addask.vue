<template>
  <div>
    <mt-header title="编辑话题">
      <router-link to="" @click.native="back" slot="left">
        <mt-button class="back-button">返回</mt-button>
      </router-link>
      <!-- <mt-button icon="more" slot="right" @click="bottomPopupVisible=true"></mt-button> -->
    </mt-header>
    <mt-field label="标题" placeholder="（必填）" v-model="formData.subject"></mt-field>
    <mt-field label="分类" placeholder="请选择" type="email" v-model="formData.typeName" readonly @click.native="bottomPopupVisible=true"></mt-field>
    <div class="title">
      <span class="title">内容</span>
    </div>
    <div ref="content" placeholder='请输入' class="content edit" contentEditable='true' v-html="formData.message">
    </div>
    <div class="ebox imagebox" style="display:block;">
      <ul id="imglist2" class="bg-f  p5">
        <li v-if="true" class="webuploader-container">
          <div class="webuploader-pick">
            <a><i class="iconfont icon-tupian bigs"></i></a>
          </div>
          <div id="rt_rt_1drl85l4lp181ejl14rd1fcvpc91" style="position: absolute; top: 0px; left: 0px; width: 50px; height: 44px; overflow: hidden; bottom: auto; right: auto;">
            <input ref="upload" @change="addImg" type="file" name="file" class="webuploader-element-invisible" multiple="multiple" accept="image/*,text/plain,application/msword,application/octet-stream,application/vnd.ms-excel,application/x-shockwave-flash">
            <label style="opacity: 0; width: 100%; height: 100%; display: block; cursor: pointer; background: rgb(255, 255, 255);" @click="onUpload"></label>
          </div>
        </li>
        <li v-else v-for="(item, i) in 5" :key="i" class="webuploader-container">
          <div class="webuploader-pick">
            <a><i class="iconfont icon-tupian bigs"></i></a>
          </div>
        </li>
      </ul>
    </div>

    <mt-button style="width: 100%; margin: 10px auto;" type="primary" @click="addForumPost">发布</mt-button>
    <mt-popup class="sharePopup" v-model="bottomPopupVisible" position="bottom" popup-transition="popup-fade" >
      <mt-picker style="height: 100%;" :slots="slots" valueKey="name" @change="changeType"></mt-picker>
    </mt-popup>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui'
import { addForumPost, getBaseUrl } from '@/api'

export default {
    data() {
      return {
        isAjax: false,
        bottomPopupVisible: false,
        formData: {
          subject: '',
          message: '',
          typeId: '',
          typeName: ''
        },
        slots: [
          {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'center'
          }
        ]
      }
    },
    created() {
      this.load()
    },
    methods: {
      load() {
        this.$store.dispatch('findTechTypeList', this.formData).then(res => {
          this.slots.values = []
          res.rows.forEach(item => {
            this.slots[0].values.push({name: item.name, value: item.fid})
          })
        })
      },
      addImg(event) {
        let inputDOM = this.$refs.upload;
        // 通过DOM取文件数据
        this.fil = inputDOM.files
        let len = this.fil.length
        if(len>4){
          alert('最多可上传4张，您还可以上传'+(4-oldLen)+'张');
          return false;
        }
        for (let i=0; i < this.fil.length; i++) {
          let size = Math.floor(this.fil[i].size / 1024);
          if (size > 5*1024*1024) {
            alert('请选择5M以内的图片！')
            return false
          }
          this.uploadImg('/blogpost/UploadFile' ,this.fil[i])
        }
      },
      uploadImg(url, file) {
        var _this = this
        var fromData = new FormData()
        fromData.append("file", file)
        var oAjax = new XMLHttpRequest()
        oAjax.open('post', `${getBaseUrl() + url}`, true)
        oAjax.send(fromData);
        oAjax.onreadystatechange = function() {
          if (oAjax.readyState == 4) {
            let { code, obj } = JSON.parse(oAjax.response)
            if (code == 200 && oAjax.status >= 200 && oAjax.status < 300 || oAjax.status == 304) {
              _this.$refs.content.innerHTML = _this.$refs.content.innerHTML + `<p><img style='width: 100%;height: 200px;' src="${obj}" /></p>&nbsp;`
            }
          }
        }
      },
      changeType(picker, values) {
        if (values[0] != undefined) {
          this.formData.typeName = values[0].name
          this.formData.fid = values[0].value
          this.bottomPopupVisible = false
        }
      },
      onUpload() {
        this.$refs.upload.click()
      },
      back() {
        this.$router.push({path: '/'})
      },
      addForumPost() {
        this.formData.message = this.$refs.content.innerHTML
        if (this.isAjax) {
          return
        }
        this.isAjax = false
        addForumPost(this.formData).then(res => {
          this.isAjax = false
          this.$router.push({path: '/askview', query: {id: res.obj}})
        }).catch(() => {
          this.isAjax = false
        })
      }
    }
}
</script>

<style scoped>
ul, ol, li {
  list-style: none;
}
body, ul, ol, li, dl, dd, p, h1, h2, h3, h4, h5, h6, form, fieldset, .pr, .pc {
    margin: 0;
    padding: 0;
}
.back {
  font-size: 0.8rem;
  margin-left: 0.3rem;
}
.title {
  height: 1.2rem;
  background-color: #f7f9fc;
  line-height: 1.2rem;
}
.title .title {
  font-size: 0.43rem;
  position: absolute;
  left: 3%;
}
.content {
  width: 97%;
  min-height: 200px;
  padding: 5px 5px;
  font-size: 15px;
}
.sharePopup {
  width: 100%
}

.imagebox .bigs {
  font-size: 45px;
}
em, i {
    font-style: normal;
}

.imagebox ul {
    overflow: hidden;
}
.bg-f {
    background-color: #fff;
}
.p5 {
    padding: 5px;
}
ul, .itemlist {
    overflow: hidden;
}

.ebox.imagebox li {
    float: left;
    position: relative;
    margin: 5px;
    height: 44px;
    overflow: hidden;
}
.webuploader-element-invisible {
    display: none;
}
.edit,  
.edit * {  
    -webkit-user-select: auto;  
    -webkit-user-modify: read-write;  
}
</style>