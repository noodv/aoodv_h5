<template>
   <div class="wrapper">
      <mt-header title="登录">
        <router-link to="/" slot="left">
          <mt-button icon="back" @click="back"></mt-button>
        </router-link>
        <mt-button icon="more" slot="right" @click="bottomPopupVisible=true"></mt-button>
      </mt-header>
      <div class="login">
          <div class="username">
              <input type="text" v-model="username" placeholder="帐号">
          </div>
          <div class="password">
              <input v-model="password" type="password" placeholder="密码">
          </div>
          <!-- <mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
          <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field> -->
          <button class="login-button" @click="login">登录</button>
      </div>
      <mt-popup class="sharePopup" v-model="bottomPopupVisible" position="bottom" popup-transition="popup-fade" >
        <mt-picker style="height: 100%;" :slots="slots" valueKey="name" @change="changeType"></mt-picker>
      </mt-popup>
   </div>
</template>

<script>
import { requestLogin } from "../api";
import { mapActions } from "vuex";
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      username: "",
      password: "",
      bottomPopupVisible: false,
      slots: [
        {
          flex: 1,
          values: [{name: '密码登录', value: 2}, { name: '验证码登录', value: 1}],
          className: 'slot1',
          textAlign: 'center'
        }
      ]
    }
  },
  methods: {
    back() {
      // this.$router.go("-1")
      this.$router.push({path:'/'});
    },
    ...mapActions(
      [
        'setUserData','setUserInfo'
      ]
    ),
    changeType(picker, values) {
      if(values[0].value == 1) {
        this.$router.push({path: '/account/login'})
      } else {
        this.$router.push({path: '/account/pwdlogin'})
      }
    },
    login() {                  //登录操作
      if (!this.username || !this.password) {
        Toast({
                message: '请填写完整',
                iconClass: 'icon icon-error',
                position: 'top',
        });
        return;
      }
      let data = {
        username: this.username,
        password: this.password
      };
      this.$store.dispatch("setLoadingState", true); //设置loading状态

      requestLogin(data).then(res => {
        if(res == "notFound"){
            Toast({
                message: '登陆失败',
                iconClass: 'icon icon-error'
                });
            this.$store.dispatch("setLoadingState", false)   
        }else{
            this.setUserInfo(data);
            this.setUserData(res);
            this.$router.replace("/home");
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.sharePopup
  width 100%

.wrapper {
    background-color: white;
    .login {
        width: 8rem;
        margin: 0 auto;

        .username, .password {
            margin: 0.3rem;
            border-bottom: 1px solid #e6eaf2;
            height: 1.6667rem;
            line-height: 1.6667rem;
            color: #99a4bf;
            &>label {
                font-size: 0.45rem;
            }

            &>input {
                border: 0;
                background-color: white;
                width: 5.5rem;
                height: 0.7rem;
                outline: none;
                font-size: 0.40rem;
            }
        }

        // input
        // background-color white
        .login-button {
            width: 7.4rem;
            height: 1rem;
            margin: 0.3rem;
            border-radius: 0.2rem;
            background-color: #2ab868;
            border: 0;
            outline: none;
            font-size: 0.45rem;
            color: white;
        }
    }
    video{
      width 10rem
      height 8rem 
    }

}
</style>
