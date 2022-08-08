<template>
  <div id="adminLayout">
        <el-container>
            <el-header>
                <div class="logo">
                    <slot name="logo"></slot>
                </div>
                <div class="dropHeader">
                    <el-dropdown>
                        <span class="avatar">
                          <img :src="url" alt="">
                        </span>
                        <el-dropdown-menu class="menu">
                            <el-dropdown-item>Thông tin tài khoản</el-dropdown-item>
                            <!-- <el-dropdown-item>Đổi mật khẩu</el-dropdown-item> -->
                            <!-- <el-dropdown-item>Cấu hình</el-dropdown-item> -->
                            <el-dropdown-item divided><div @click="ative('login')"><b>Đăng xuất</b></div></el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>
            </el-header>
            <el-main>
                <slot name="content"></slot>
            </el-main>
        </el-container>
  </div>
</template>
<script>
export default {
    name: "adminLayout",
    data() {
        return {
            url: "data:image/jpeg;base64,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"
        }
    },
    methods: {
        ative(value) {
            this.$router.push({
                path: `/${value}`
            })
        }
    }
}
</script>

<style lang="scss" scoped>
#adminLayout{
    background-image: url(https://technext.github.io/dashtreme/assets/images/bg-themes/1.png);
    height: 100vh;
    .el-header{
        padding: 0px 15px;
        z-index: 999;
        height: 60px;
        background-color: rgba(0,0,0,.2);
        display: flex;
        .logo {
            width: 95%;
            line-height: 25px;
            color: white;
            text-align: center;
        }
        .dropHeader {
            margin: 0 20px 0 30px;
            text-align: right;
            .el-dropdown {
                height: 60px;
                span {
                    img {
                        width: 40px;
                        border-radius: 50%;
                        margin-top: 10px;
                    }
                }
            }
        }
    }
}
</style>
