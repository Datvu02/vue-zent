<template>
    <LayoutLogin>
    </LayoutLogin>
</template>

<script>
import LayoutLogin from '../../layouts/Login.vue'

export default({
    name: 'RegisterAcc',
    component: [
        LayoutLogin,
    ],
    data() {
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please input the password'));
            } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('Please input the password again'));
            } else if (value !== this.ruleForm.pass) {
                callback(new Error('Two inputs don\'t match!'));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                name: '',
                email: '',
                pass: '',
                checkPass: '',
            },
            
            rules: {
                name: [
                    { required: true, message: 'Please input Activity name', trigger: 'blur' },
                    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
                ],
                pass: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                alert('submit!');
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
})
</script>
