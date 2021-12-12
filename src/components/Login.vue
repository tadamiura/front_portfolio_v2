<template>
  <n-button>naive-ui</n-button>
</template>

<script>
  import { defineComponent } from 'vue'
  import { NButton } from 'naive-ui'

  export default defineComponent({
    name: 'Login',
    components: {
      NButton
    }
  })
</script>