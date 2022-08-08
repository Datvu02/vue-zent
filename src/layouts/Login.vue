<template>
    <div id="layoutLogin">
        <div class="login" v-if="change">

        </div>
        <div id="register" v-else>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
                <el-form-item
                    prop="email"
                    label="Email"
                    :rules="[
                    { required: true, message: 'Please input email address', trigger: 'blur' },
                    { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
                    ]"
                >
                    <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>
                <el-form-item label="Activity email" prop="name">
                    <el-input v-model="ruleForm.name"></el-input>
                </el-form-item>
                <el-form-item label="Password" prop="pass">
                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="Confirm" prop="checkPass">
                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">Create</el-button>
                    <el-button @click="resetForm('ruleForm')">Reset</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'LayoutLogin',
        data() {
            return {
                change: false,
            }
        }
    }
</script>

<style scoped>
#layoutLogin {
    margin-bottom: 25px;
    border: none;
    background-color: rgba(0,0,0,.2);
}
</style>