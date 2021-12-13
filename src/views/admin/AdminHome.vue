<template>
<n-message-provider>
  <Login/>
</n-message-provider>
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

</style>