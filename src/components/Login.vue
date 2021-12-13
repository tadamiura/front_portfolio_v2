<template>
  <n-form 
    :label-width="80"
    :model="formValue"
    :rules="rules"
    :size="size"
    ref="formRef"
  >
    <n-form-item path="email" label="Adresse email">
      <n-input
        type="email"
        v-model:value="formValue.email"
        placeholder="Votre adresse email"
      />
     </n-form-item>
     <n-form-item path="password" label="Mot de passe">
      <n-input
        type="password"
        v-model:value="formValue.password"
        show-password-on="mousedown"
        placeholder="Votre mot de passe"
      />
     </n-form-item>
     <n-form-item>
      <n-button
        @click="handleValidateClick"
        type="success" 
        size="medium"
       >
        Valider
      </n-button>
     </n-form-item>
  </n-form>

</template>

<script>
  import { defineComponent , ref } from 'vue'
  import { NButton, NInput, NForm, NFormItem, useMessage } from 'naive-ui'

  export default defineComponent({
    name: 'Login',
    components: {
      NButton,
      NInput,
      NForm,
      NFormItem
    },
    setup() {
      const formRef = ref(null)
      const message = useMessage()

      return {
        formRef,
        formValue: ref({
          email: '',
          password: ''
        }),
        rules: {
          email: {
            required: true,
            message: "Veuillez renseigner le nom d'utilisateur",
            trigger: 'blur'
          },
          password: {
            required: true,
            message: "Veuillez renseigner le mot de passe",
            trigger: 'blur'
          }
        },
        handleValidateClick (e) {
        e.preventDefault()
        formRef.value.validate((errors) => {
          if (!errors) {
            
            message.success('Valid')
          } else {
            console.log(errors)
            message.error('Le nom d’utilisateur ou le mot de passe ne correspondent pas. Réessayez.')
          }
        })
      }

      }
    }
  })
</script>