<template>
  <AdminLayout>
      <template #logo>
          <h2>Dashboard</h2>
      </template>
      <template #content>
          <router-view/>
      </template>
  </AdminLayout>
</template>

<script>
import AdminLayout from '../layouts/Admin.vue'

export default {
    name: 'homeView',
    components: {
        AdminLayout
    },
}
</script>

<style lang='scss' scoped>
 
</style>