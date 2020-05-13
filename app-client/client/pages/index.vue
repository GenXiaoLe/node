<template>
  <div class="container">
    <div>
      <h1 class="title">
        app-client
      </h1>
      <h2 class="subtitle">
        {{`欢迎${info.nickname}回来，你使用的邮箱是${info.email}`}}
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey"
        >
          GitHub
        </a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      info: {
        nickname: 'xxx',
        email: 'xxx'
      }
    }
  },
  methods: {
    async getInfo() {
      const ret = await this.$http.get('/user/info');

      if (ret.code === -666) {
        this.$alert(
            '登录已过期或未登陆', 
            '请前往登录页面登录', 
            {
                confirmButtonText: 'go to login',
                callback: action => {
                    this.$router.push(`/login?redirect=${this.$route.path}`);
                }
            }
        );
        return;
      }

      if (ret.code === 1) {
        this.info.nickname = ret.data.userInfo.nickname;
        this.info.email = ret.data.userInfo.email;
      }
    }
  },
  mounted() {
    this.getInfo();
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
