<template>
    <div class="login__layout">
        <el-form ref="form" :rules="rules" :model="form" label-width="100px">
            <el-form-item prop="email" label="邮箱：">
                <el-input v-model="form.email" placeholder="请输入邮箱"></el-input>
            </el-form-item>
            <el-form-item prop="nickname" label="昵称：">
                <el-input v-model="form.nickname"  placeholder="请输入昵称"></el-input>
            </el-form-item>
            <el-form-item prop="captcha" label="验证码：" class="login__captcha-box">
                <el-input v-model="form.captcha"  placeholder="请输入验证码" class="login__captcha-input"></el-input>
                <img :src="captcha" alt="" @click="getCatpcha" />
            </el-form-item>
            <el-form-item prop="passwd" label="密码：">
                <el-input v-model="form.passwd"  type="password" placeholder="请输入密码"></el-input>
            </el-form-item>
            <el-form-item prop="repasswd" label="确认密码：">
                <el-input v-model="form.repasswd"  type="password" placeholder="请再次输入密码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="submit">注册</el-button>
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
                nickname: 'xiaole',
                captcha: '',
                passwd: '799383929',
                repasswd: '799383929'
            },
            rules: {
                email: [
                    { required: true, message: '请输入邮箱', trigger: 'blur' },
                    { type: 'email', message: '请输入正确邮箱', trigger: 'change' }
                ],
                nickname: [
                    { required: true, message: '请输入昵称', trigger: 'blur' }
                ],
                captcha: [
                    { required: true, message: '请输入验证码', trigger: 'change' }
                ],
                passwd: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                repasswd: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    { validator: (rule, value, callback) => {
                        if (value !== this.form.passwd) {
                            callback(new Error('两次输入密码不一致!'));
                        }
                        callback();
                    } }
                ],
            }
        }
    },
    methods: {
        getCatpcha() {
            this.captcha = 'api/captcha?_t=' + new Date().getTime();
        },
        async submit() {
            const data = {
                email: this.form.email,
                nickname: this.form.nickname,
                captcha: this.form.captcha,
                passwd: md5(this.form.passwd)
            }

            const ret = await this.$http.post('/user/register', data);
              
            if (ret.code === -1) {
                return this.$message({
                    showClose: true,
                    message: ret.message,
                    type: 'error'
                });
            }

            if (ret.code === 1) {
                this.$alert(
                    '注册成功', 
                    '请前往登录页面登录', 
                    {
                        confirmButtonText: 'go to login',
                        callback: action => {
                            this.$router.push('/login');
                        }
                    }
                );
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