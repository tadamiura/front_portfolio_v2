<template>
<div class="admin-home">
  <n-message-provider>
    <Login/>
  </n-message-provider>
</div>
</template>
<script>
import { defineComponent } from "vue";
import Login from "./../../components/Login.vue";
import { NMessageProvider } from 'naive-ui'


export default defineComponent({
components: {
  Login,
  NMessageProvider
},
});
</script>
<style>
.admin-home {
  padding: 8rem 0;
  background-image: url('./../../assets/register_img.jpg');
  background-size: cover;
}
</style>