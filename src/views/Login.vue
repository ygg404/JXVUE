<template>
  <v-app id="inspire">    
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center> 
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar dark color="blue-grey lighten-1">
                <v-toolbar-title>登录</v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field prepend-icon="person" name="login" label="账号" type="text" v-model="userAccount" color="blue-grey darken-1"></v-text-field>
                  <v-text-field id="password" prepend-icon="lock" name="password" label="密码" type="password" v-model="password" color="blue-grey darken-1"></v-text-field>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-grey darken-1" @click="login" dark>登录</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
  import store from '@/store.js'
  export default {
    data: () => ({
      userAccount:'',
      password:''
    }),
    methods:{
      login:function(){
        axios({
          method: "POST",
          url: "auth/",
          data: {
            userAccount: this.userAccount,
            password: this.password
          }
        }).then(response => {
           if(response.status === 200){
            if(typeof(Storage) !== "undefined"){
                localStorage.setItem("userAccount",this.userAccount)
                localStorage.setItem("userPassWork",this.password)
              }else{
                this.$cookieStore.setCookie('userAccount',this.userAccount,1000)
                this.$cookieStore.setCookie('userPasswork',this.password,1000)
              }
              sessionStorage.token = response.data.token
              this.$router.replace({path: "/"})
          }
        })
      },
  },
  created(){
    if(typeof(Storage) !== "undefined"){
      this.userAccount = localStorage.getItem('userAccount'),
      this.password = localStorage.getItem('userPassWork')
    }else{
      this.userAccount = this.$cookieStore.getCookie('userAccount'),
      this.password = this.$cookieStore.getCookie('userPasswork')
    }
  }
}
</script>
