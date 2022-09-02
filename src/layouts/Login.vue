<template>
<div id="layoutLogin">
    <div class="card">
        <div class="logo">
            <img src="https://technext.github.io/dashtreme/assets/images/logo-icon.png" alt="">
        </div>
        <div id="login" v-if="change">
            <el-form :model="form" :rules="rules" ref="form" label-width="120px" class="demo-form">
                <div class="card-title">Sign In</div>
                <div class="form-group">
                    <el-form-item prop="email" class="form-input">
                        <el-input placeholder="Nhập email" v-model="form.email" suffix-icon="el-icon-user-solid"></el-input>
                    </el-form-item>
                </div>
                <div class="form-group">
                    <el-form-item prop="pass" class="form-input">
                        <el-input type="password" v-model="form.pass" suffix-icon="el-icon-lock" autocomplete="off" placeholder="Nhập mật khẩu"></el-input>
                    </el-form-item>
                </div>
                <div class="form-button">
                    <el-form-item>
                        <el-button type="primary" @click="submitForm(form)">Đăng nhập</el-button>
                    </el-form-item>
                </div>
                <div class="card-footer">
                    <p class="text-warning">Bạn chưa có tài khoản? <span @click="resetChange(false)"> Tạo tài khoản</span></p>
                </div>
            </el-form>
        </div>
        <div id="register" v-else>
            <el-form :model="form" :rules="rules" ref="form" label-width="120px" class="demo-form">
                <div class="card-title">Sign Up</div>
                <div class="form-group">
                    <el-form-item class="form-input" prop="name">
                        <el-input placeholder="Nhập tên" v-model="form.name" suffix-icon="el-icon-user-solid"></el-input>
                    </el-form-item>
                </div>
                <div class="form-group">
                    <el-form-item prop="email" class="form-input">
                        <el-input placeholder="Nhập email" v-model="form.email" suffix-icon="el-icon-message"></el-input>
                    </el-form-item>
                </div>
                <div class="form-group">
                    <el-form-item prop="pass" class="form-input">
                        <el-input type="password" v-model="form.pass" suffix-icon="el-icon-lock" autocomplete="off" placeholder="Nhập mật khẩu"></el-input>
                    </el-form-item>
                </div>
                <div class="form-group">
                    <el-form-item class="form-input" prop="checkPass">
                        <el-input type="password" v-model="form.checkPass" suffix-icon="el-icon-lock" autocomplete="off" placeholder="Nhập lại mật khẩu"></el-input>
                    </el-form-item>
                </div>
                <div class="form-button">
                    <el-form-item>
                        <el-button type="primary" @click="createAcc(form)">Tạo tài khoản</el-button>
                    </el-form-item>
                </div>
                <div class="card-footer">
                    <p class="text-warning">Bạn đã có tài khoản? <span @click="resetChange(true)"> Đăng nhập</span></p>
                </div>
            </el-form>
        </div>

    </div>
</div>
</template>

<script>
import {
    mapMutations,
    mapState
} from 'vuex'
import api from '../api'

export default {
    name: 'LayoutLogin',
    computed: {
        ...mapState('auth', ['user']),
    },
    data() {
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Vui lòng nhập lại mật khẩu'));
            } else if (value !== this.form.pass) {
                callback(new Error('Two inputs don\'t match!'));
            } else {
                callback();
            }
        };
        return {
            change: true,
            form: {
                name: '',
                email: '',
                pass: '',
                checkPass: ''
            },
            rules: {
                name: [{
                        required: true,
                        message: 'Vui lòng nhập tên',
                        trigger: 'blur'
                    },
                    {
                        min: 2,
                        max: 20,
                        message: 'Tên không được ngắn hơn 2 hoặc dài hơn 20 ký tự',
                        trigger: 'blur'
                    }
                ],
                email: [{
                        required: true,
                        message: 'Vui lòng nhập email',
                        trigger: 'blur'
                    },
                    {
                        type: 'email',
                        message: 'Email chưa đúng định dạng',
                        trigger: ['blur', 'change']
                    }
                ],
                pass: [{
                        required: true,
                        message: 'Vui lòng nhập mật khẩu'
                    },
                    {
                        min: 6,
                        max: 20,
                        message: 'Mật khẩu không được ngắn hơn 6 hoặc dài hơn 20 ký tự'
                    }
                ],
                checkPass: [{
                    validator: validatePass2,
                }, ]
            }
        }
    },

    methods: {
        resetChange(ative) {
            this.change = ative
        },
        resetValue() {
            this.form.name = this.form.email = this.form.pass = this.form.checkPass = ''
        },
        ...mapMutations('auth', ['updateAccessToken', 'updateStatusLogin', 'updateUserLogin']),
        submitForm(formName) {
            let data = {
                'email': formName.email,
                'password': formName.pass
            }
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    api.login(data)
                        .then((res) => {
                            // login thành công
                            this.updateAccessToken(res.data.access_token);
                            this.updateStatusLogin(true);
                            this.$router.push({
                                name: "home"
                            })
                            this.$message.success({
                                message: 'Đăng nhập thành công.',
                            });
                            api.getUserLogin().then((res) => {
                                this.updateUserLogin(res.data);
                            })
                        })
                        .catch(() => {
                            this.$message.error({
                                message: 'Đăng nhập thất bại!',
                            });
                        })
                    this.resetValue()
                } else {
                    this.$message.error({
                        message: 'Đăng nhập thất bại.',
                    });
                }
            })
        },
        createAcc(formName) {
            let data = {
                'name': formName.name,
                'email': formName.email,
                'password': formName.pass
            }
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    api.register(data).then(() => {
                        this.$message({
                            message: 'Tạo tài khoản thành công.',
                            type: 'success'
                        });
                        this.resetValue()
                    }).catch(() => {
                        this.$message.error({
                            message: 'Thêm mới tài khoản thất bại!',
                        });
                    })
                } else {
                    this.$message.error({
                        message: 'Thêm mới tài khoản thất bại.',
                    });
                }
            })
        }
    },
    
}
</script>

<style lang="scss" scoped>
#layoutLogin {
    padding-top: 6%;
    border: none;
    background-image: url(https://technext.github.io/dashtreme/assets/images/bg-themes/1.png);
    height: 90vh;

    .form-input::v-deep {
        .el-form-item__content {
            margin: 0 !important;

            .el-input {
                .el-input__inner {

                    border: 0px solid #e5eaef;
                    background-color: rgba(255, 255, 255, 0.2);
                    color: #fff !important;
                }
            }

        }
    }

    .form-button::v-deep {
        .el-form-item {
            .el-form-item__content {
                margin: 0 !important;
                text-align: center;
            }
        }

    }

    .card {
        margin: auto;
        width: 25rem;
        padding: 15px;
        box-shadow: 0 2px 10px;
        border: none;
        background-color: rgba(0, 0, 0, .2);

        .card-title {
            margin-bottom: 0.75rem;
            font-weight: 600;
            font-size: 16px;
            color: #ffffff;
            text-align: center;
            text-transform: uppercase !important;
            padding: 10px 0px;
        }

        .card-footer {
            padding: 0.75rem 1.25rem;
            text-align: center;
            background-color: rgba(0, 0, 0, 0);
            border-top: 1px solid rgba(255, 255, 255, 0.12);

            .text-warning {
                color: #ff8800 !important;
            }

            span {
                text-decoration: none;
                color: #fff;
                cursor: pointer;
            }
        }

        .logo {
            text-align: center;
        }
    }
}
</style>
