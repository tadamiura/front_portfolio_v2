<template>
<n-card title="Se connecter" size="huge" hoverable=true>
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
        size="large"
        placeholder="Votre adresse email"
      />
     </n-form-item>
     <n-form-item path="password" label="Mot de passe">
      <n-input
        type="password"
        v-model:value="formData.password"
        show-password-on="click"
        size="large"
        placeholder="Votre mot de passe"
      />
     </n-form-item>
     <n-form-item>
      <n-button
        :loading="loading"
        @click="handleValidateClick"
        type="success" 
        size="medium"
       >
        Valider
      </n-button>
     </n-form-item>
  </n-form>
</n-card>
</template>

<script>
  import { defineComponent , ref } from 'vue'
  import { NButton, NInput, NForm, NFormItem, NCard, useMessage } from 'naive-ui'
  import axios from 'axios'

  export default defineComponent({
    name: 'Login',
    components: {
      NButton,
      NInput,
      NForm,
      NFormItem,
      NCard
    },
    
    setup() {
      const formRef = ref(null)
      const message = useMessage()
      const formData = ref({
        email: '',
        password: ''
      })
      const isLoading = ref(false)
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
        loading: isLoading,
        handleValidateClick (e, data) {
        e.preventDefault()
        isLoading.value = true
        formRef.value.validate((errors) => {
          if (!errors) {
            axios.post('http://localhost:3000/api/auth', formData.value)
            .then(res => res.headers['x-access-token'])
            .then( data => { 
              localStorage.clear()
              localStorage.setItem('x-access-token', data)
              message.success('Connecté(e)')
              isLoading.value = false
            })
            .catch(err => {
              localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
              message.error("Le nom de l'utilisateur ou le mot de passe est incorrect")
              isLoading.value = false
            })
          } else {
            console.log(errors)
            message.error('Les champs requis ne sont pas tous complétés')
            isLoading.value = false
          }
        })
      }

      }
    }
  })
</script>

<style lang="scss" scoped>
  .n-card {
    max-width: 30rem;
    margin: 0 auto;
    background-color: rgba(255, 255, 255, .88);
  }
</style>