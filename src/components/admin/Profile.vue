<template>
<AdminLayout>
    <template #main>
        <div class="main-content">
            <div class="mainWrap">
                <div class="content">
                    <div class="profile">
                        <img class="bannerProfile" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_Q0hNWcgVav3I9XvlTp3ACTXNy3Xitj1r4w&usqp=CAU" alt="">
                        <h1 class="titleContent">Quản lý thông tin của bạn</h1>
                        <h3>Thông tin</h3>
                        <hr>
                        <div class="changeProfile">
                            <div class="profileAvatar">
                                <h3>Hình đại diện</h3>
                                <div class="avatarCover">
                                    <Upload class="avatarUpload" :url="authUser.avatar" />
                                </div>
                            </div>
                            <el-form :model="authUser" status-icon :rules="rules" ref="authUser" class="profileForm demo-ruleForm">
                                <div class="subLabel">
                                    <span>Tên đầy đủ</span>
                                </div>
                                <div class="formInput">
                                    <el-form-item prop="name">
                                        <el-input v-model="authUser.name"></el-input>
                                    </el-form-item>
                                </div>

                                <button class="saveProfile" type="button" @click="handleUpdateInfo('authUser')">Lưu</button>
                            </el-form>
                        </div>

                        <hr>

                        <h3>Đổi mật khẩu</h3>
                        <hr>
                        <div class="changePassword">
                            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
                                <div class="subLabel">
                                    <span>Mật khẩu mới</span>
                                </div>
                                <el-form-item prop="pass">
                                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                                </el-form-item>
                                <div class="subLabel">
                                    <span>Viết lại mật khẩu mới</span>
                                </div>
                                <el-form-item prop="checkPass">
                                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button class="saveProfile" type="primary" @click="submitForm('ruleForm')">Thay đổi</el-button>
                                    <el-button @click="resetForm('ruleForm')">Hủy</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </template>
</AdminLayout>
</template>

<script>
import AdminLayout from "@/layouts/Admin";
import {
    mapMutations,
    mapState
} from "vuex";
import Upload from "@/components/include/UploadAvatar";
import api from '../../api'

export default {
    name: "ProfileVue",
    components: {
        AdminLayout,
        Upload
    },
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Vui lòng điền mật khẩu'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Vui lòng nhập lại mật khẩu'));
            } else if (value !== this.ruleForm.pass) {
                callback(new Error('Mật khẩu không giống'));
            } else {
                callback();
            }
        };
        return {
            avatar: "",
            ruleForm: {
                pass: '',
                checkPass: '',
            },
            rules: {
                name: [{
                        required: true,
                        message: 'Vui lòng nhập họ tên',
                        trigger: 'blur'
                    },
                    {
                        min: 3,
                        max: 20,
                        message: 'Tên khôn được ngắn hơn 3 và dài hơn 20 ký tự',
                        trigger: 'blur'
                    }
                ],
                pass: [{
                    validator: validatePass,
                    trigger: 'blur'
                }],
                checkPass: [{
                    validator: validatePass2,
                    trigger: 'blur'
                }],
            }
        };
    },
    methods: {
        ...mapMutations('auth', [
            'updateAuthUser'
        ]),

        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let data = {
                        password: this.ruleForm.pass,
                        password_confirmation: this.ruleForm.checkPass,
                    }
                    api.updatePassword(data).then(() => {
                        this.$message({
                            type: "success",
                            message: "Cập nhật thành công"
                        })
                    }).catch(error => {
                        console.log(error);
                    })
                } else {
                    console.log('Thất bại');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },

        handleUpdateInfo(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    const frmdata = new FormData();
                    frmdata.append('name', this.authUser.name)
                    if (this.authUser.url != null) {
                        frmdata.append('avatar', this.authUser.url)
                    }else if (this.authUser.url == ''){
                        this.$message.error({
                            message: 'Bạn chưa chọn ảnh'
                        })
                    }

                    api.updateInfo(frmdata).then(() => {
                        api.getAuthUser().then((res) => {
                            this.updateAuthUser(res.data)
                            this.$message({
                                type: "success",
                                message: "Cập nhật thành công"
                            })
                        })
                    })
                }
            })
        },
        resetError() {
            this.rule.name = this.rule.pass = this.rule.checkPass = ""
        }
    },
    computed: {
        ...mapState('auth', [
            'authUser'
        ]),
        ...mapState('profile', [
            'profile'
        ]),
    },
}
</script>

<style lang="scss" scoped>
.main-header {

    .headerWarp {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0 auto;
        max-width: 650px;
        padding: 32px;
        position: relative;

        .infoWarp {
            .info {
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px 0;
            }

            .infoAvatar {
                position: relative;
                margin-right: 16px;

                .avatarCover {
                    position: relative;
                    line-height: 10px;
                    overflow: hidden;
                    white-space: nowrap;

                    img {
                        height: 48px;
                        width: 48px;
                        line-height: 48px;
                        border-radius: 50%;
                    }
                }
            }

            .infoName {
                display: flex;
                align-items: baseline;

                .title {
                    font-size: 24px;
                    font-weight: 500;
                    line-height: 28px;
                    color: #0c3953;
                    margin-right: 10px;

                }

                .subTitle {
                    font-size: 12px;
                    line-height: 20px;
                    color: #5e6c84;
                }
            }
        }
    }
}

.main-content {
    max-width: 900px;
    margin: 0 auto;
    padding: 32px;
    position: relative;

    .mainWrap {
        .profile {
            width: 100%;
            max-width: 530px;
            display: flex;
            flex-direction: column;
            margin: auto;
            text-align: left;
            background-color: white;
            padding: 20px;
            border-radius: 5px;

            .bannerProfile {
                display: block;
                margin: 0 auto 30px;
                width: 100%;
                height: 200px;
                object-fit: cover;
            }

            h1 {
                color: #172b4d;
                font-size: 24px;
                font-weight: 600;
                letter-spacing: -.01em;
                line-height: 28px;
                margin-top: 0px;
                margin-bottom: 10px;
            }

            p {
                color: #5e6c84;
                font-size: 14px;
                line-height: 18px;
                margin-bottom: 8px;
                white-space: pre-line;
            }

            h3 {
                color: #172b4d;
                font-size: 20px;
                letter-spacing: -.008em;
                font-weight: 500;
                line-height: 26px;
                margin-top: 40px;
            }

            hr {
                margin-top: 0;
                margin-bottom: 15px;
            }

            .changeProfile {
                display: flex;
                justify-content: space-between;
                flex-direction: row-reverse;

                .profileAvatar {
                    align-items: center;
                    display: flex;
                    flex-direction: column;
                    margin-right: 4px;
                    margin-top: 16px;

                    h3 {
                        color: #172b4d;
                        font-size: 14px;
                        font-weight: 600;
                        letter-spacing: -.003em;
                        line-height: 16px;
                        margin-top: 0;
                        margin-bottom: 12px;
                    }

                    .avatarCover {
                        border-radius: 50%;
                        cursor: pointer;
                        overflow: hidden;
                        position: relative;

                        .avatarUpload {
                            height: 100px;
                            width: 100px;
                            line-height: 100px;
                        }

                    }

                    .changeAvatar {
                        background: linear-gradient(0deg, rgba(0, 0, 0, .5) 50%, transparent 0);
                        border-radius: 0;
                        border: none;
                        color: #fff;
                        font-size: 16px;
                        font-weight: 400;
                        height: 100%;
                        line-height: 2.5em;
                        margin: 0;
                        position: absolute;
                        text-decoration: underline;
                        top: 0;
                        visibility: hidden;
                        width: 100%;
                        display: inline-block;
                        box-sizing: border-box;
                        -webkit-appearance: none;
                        padding: 6px 12px;
                    }

                    .changeAvatar:hover {
                        visibility: visible;
                    }
                }

                form {
                    display: flex;
                    flex-direction: column;
                    flex: 0 0 355px;

                    .subLabel {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        margin-bottom: 12px;
                        margin-top: 0;

                        span {
                            color: #172b4d;
                            font-size: 14px;
                            font-weight: 600;
                            letter-spacing: -.003em;
                            line-height: 16px;
                            margin-top: 0;
                            padding-top: 16px;
                        }
                    }

                    .formInput {
                        width: 100%;

                        input {
                            outline: none;
                            border: none;
                            box-sizing: border-box;
                            color: #172b4d;
                            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
                            font-size: 14px;
                            line-height: 20px;
                            font-weight: 400;
                            transition-property: background-color, border-color, box-shadow;
                            transition-duration: 85ms;
                            transition-timing-function: ease;
                            border-radius: 3px;
                            padding: 8px 12px;
                            box-shadow: inset 0 0 0 2px #dfe1e6;
                            background-color: #fafbfc;
                            margin-bottom: 0;
                            width: 100%;
                        }
                    }

                    button {
                        margin-top: 40px;
                        margin-right: 0;
                        background-color: #61bd4f;
                        box-shadow: none;
                        border: none;
                        color: #fff;
                        outline: 0;
                        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
                        font-size: 14px;
                        line-height: 20px;
                        font-weight: 400;
                        box-sizing: border-box;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 3px;
                        cursor: pointer;
                        padding: 6px 12px;
                        text-decoration: none;
                        transition-property: background-color, border-color, box-shadow;
                        transition-duration: 85ms;
                        transition-timing-function: ease;
                    }
                }
            }

            .changePassword {
                display: flex;

                form {
                    display: flex;
                    flex-direction: column;
                    flex: 0 0 355px;

                    .subLabel {
                        display: flex;
                        flex-direction: row;
                        justify-content: space-between;
                        margin-bottom: 12px;
                        margin-top: 0;

                        span {
                            color: #172b4d;
                            font-size: 14px;
                            font-weight: 600;
                            letter-spacing: -.003em;
                            line-height: 16px;
                            margin-top: 0;
                            padding-top: 16px;
                        }
                    }

                    .formInput {
                        width: 100%;

                        input {
                            outline: none;
                            border: none;
                            box-sizing: border-box;
                            color: #172b4d;
                            font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
                            font-size: 14px;
                            line-height: 20px;
                            font-weight: 400;
                            transition-property: background-color, border-color, box-shadow;
                            transition-duration: 85ms;
                            transition-timing-function: ease;
                            border-radius: 3px;
                            padding: 8px 12px;
                            box-shadow: inset 0 0 0 2px #dfe1e6;
                            background-color: #fafbfc;
                            width: 100%;
                            margin-bottom: 10px;
                        }
                    }

                    button {
                        font-weight: 400;
                        align-self: flex-start;
                        font-size: 14px;
                        letter-spacing: 0;
                        margin-top: 0;
                        // color: #172b4d;
                        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
                        line-height: 20px;
                        box-sizing: border-box;
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 3px;
                        cursor: pointer;
                        padding: 6px 12px;
                        text-decoration: none;
                        // background-color: rgba(9, 30, 66, .04);
                        box-shadow: none;
                        // border: none;
                        transition-property: background-color, border-color, box-shadow;
                        transition-duration: 85ms;
                        transition-timing-function: ease;
                    }

                    button:hover {
                        background-color: #ecedf0;
                    }
                }

            }
        }
    }
}
</style>
