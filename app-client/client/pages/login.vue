<template>
    <div class="login__layout">
        <el-form ref="form" :rules="rules" :model="form" label-width="110px">
            <el-form-item prop="email" label="邮箱：">
                <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="captcha" label="验证码：" class="login__captcha-box">
                <el-input v-model="form.captcha"  placeholder="请输入验证码" class="login__captcha-input"></el-input>
                <img :src="captcha" alt="" @click="getCatpcha" />
            </el-form-item>
            <el-form-item prop="emailCaptcha" label="邮箱验证码：" class="login__captcha-box">
                <el-input v-model="form.emailCaptcha"  placeholder="请输入邮箱验证码" class="login__captcha-input"></el-input>
                <el-button @click="sendEmail" :disabled="this.send.timer < 11" style="width: 100px;" type="primary">{{sendEmailText}}</el-button>
            </el-form-item>
            <el-form-item prop="passwd" label="密码：">
                <el-input v-model="form.passwd"  type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="submit" type="primary">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import md5 from 'md5';
export default {
    layout: 'login',
    data() {
        return {
            captcha: 'api/captcha?_t=' + new Date().getTime(),
            form: {
                email: '799383929@qq.com',
                passwd: '799383929',
                emailCaptcha: '',
                captcha: ''
            },
            rules: {
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { type: 'email', message: '请输入正确邮箱', trigger: 'change' }
                ],
                captcha: [
                    { required: true, message: '请输入验证码', trigger: 'change' }
                ],
                emailCaptcha: [
                    { required: true, message: '请输入邮箱验证码', trigger: 'change' }
                ],
                passwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
            },
            send: {
                timer: 11
            }
        }
    },
    computed: {
        sendEmailText() {
            if (this.send.timer >= 11) return '发送邮件';
            return `${this.send.timer}s后发送`;
        },
    },
    methods: {
        async sendEmail() {
            let timer = setInterval(() => {
                if (this.send.timer <= 0) {
                    this.send.timer = 11;
                    clearInterval(timer);
                    return;
                }

                this.send.timer--;
            }, 1000);

            let ret = await this.$http.get(`/emailCaptcha?email=${this.form.email}`);
            
            if (ret.code === 1) {
                this.$message({
                    message: ret.data.message,
                    type: 'success'
                });
            }
        },
        getCatpcha() {
            this.captcha = 'api/captcha?_t=' + new Date().getTime();
        },
        async submit() {
            const data = {
                email: this.form.email,
                captcha: this.form.captcha,
                emailCaptcha: this.form.emailCaptcha,
                passwd: md5(this.form.passwd)
            }

            const ret = await this.$http.post('/user/login', data);
              
            if (ret.code === -1) {
                return this.$message({
                    message: ret.message,
                    type: 'error'
                });
            }

            if (ret.code === 1) {
                const data = ret.data;
                this.$message({
                    message: data.message,
                    type: 'success'
                });
                localStorage.setItem('token', data.userInfo.token);
                
                setTimeout(_ => {
                    this.$router.push('/');
                }, 500)
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .login__layout {
        width: 400px;
        margin: 0 auto;
        .login__captcha-box {
            position: relative;
            .login__captcha-input {
                width: 180px;
            }
            img {
                position: absolute;
                right: 0;
            }
        }
    }
</style>