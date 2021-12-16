<template>
  <n-form 
    :label-width="80"
    :model="formData"
    :rules="rules"
    ref="formRef"
  >
    <n-form-item path="email" label="Adresse email">
      <n-input
        type="email"
        v-model:value="formData.email"
        placeholder="Votre adresse email"
      />
     </n-form-item>
     <n-form-item path="password" label="Mot de passe">
      <n-input
        type="password"
        v-model:value="formData.password"
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
  import axios from 'axios'

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
      const formData = ref({
        email: '',
        password: ''
      })
      return {
        formRef,
        formData,
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
        handleValidateClick (e, data) {
        e.preventDefault()
        formRef.value.validate((errors) => {
          if (!errors) {
            axios.post('http://localhost:3000/api/auth', formData.value)
            .then(res => res.headers['x-access-token'])
            .then( data => { 
              localStorage.clear()
              localStorage.setItem('x-access-token', data)
              message.success('Connecté(e)')
            })
            .catch(err => {
              localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
              message.error("Le nom de l'utilisateur ou le mot de passe est incorrect")
            })
          } else {
            console.log(errors)
            message.error('Les champs requis ne sont pas tous complétés')
          }
        })
      }

      }
    }
  })
</script>