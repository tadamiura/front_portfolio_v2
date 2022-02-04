<template>
  <n-form :label-width="80" :model="formData" :rules="rules" ref="formRef">
    <n-form-item path="gender" label="Sexe">
      <n-space vertical>
        <n-radio-group
          v-model:value="formData.gender"
          name="radiobuttongroup1"
          size="medium"
        >
          <n-radio-button value="M" name="gender"> Masculin </n-radio-button>
          <n-radio-button value="F" name="gender"> Féminin </n-radio-button>
          <n-radio-button value="O" name="gender"> Autre </n-radio-button>
        </n-radio-group>
      </n-space>
    </n-form-item>
    <n-form-item path="lastname" label="Nom">
      <n-input
        type="text"
        v-model:value="formData.lastname"
        size="large"
        placeholder="Votre nom"
      />
    </n-form-item>
    <n-form-item path="firstname" label="Prénom">
      <n-input
        type="text"
        v-model:value="formData.firstname"
        size="large"
        placeholder="Votre prénom"
      />
    </n-form-item>
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
        @input="handlePasswordInput"
      />
    </n-form-item>
    <n-form-item path="passwordCheck" label="Confirmez votre mot de passe">
      <n-input
        type="password"
        v-model:value="formData.passwordCheck"
        show-password-on="click"
        size="large"
        placeholder="Votre mot de passe"
        ref="passwordCheck"
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
</template>

<script>
import { defineComponent, ref } from "vue";
import router from "./../router/index";
import { useStore } from "vuex";

import {
  NButton,
  NInput,
  NForm,
  NFormItem,
  NCard,
  NTabs,
  NTabPane,
  useMessage,
  NSpace,
  NRadioGroup,
  NRadioButton,
} from "naive-ui";

export default defineComponent({
  name: "SignUp",
  components: {
    NButton,
    NInput,
    NForm,
    NFormItem,
    NCard,
    NTabs,
    NTabPane,
    NSpace,
    NRadioGroup,
    NRadioButton,
  },

  setup() {
    const store = useStore();
    const formRef = ref(null);
    const message = useMessage();
    const formData = ref({
      gender: "",
      lastname: "",
      firstname: "",
      email: "",
      password: "",
      passwordCheck: "",
    })
    function validatePasswordStartWith (rule, value) {
      return (
        formData.value.password &&
        formData.value.password.startsWith(value) &&
        formData.value.password.length >= value.length
      )
    }
    function validatePasswordSame (rule, value) {
      return value === formData.value.password
    }
    const loadingRef = ref(false);
    return {
      formRef,
      formData,
      rules: {
        gender: {
          required: true,
          message: "Veuillez renseigner votre genre",
          trigger: "blur",
        },
        lastname: {
          required: true,
          message: "Veuillez renseigner votre nom",
          trigger: "blur",
        },
        firstname: {
          required: true,
          message: "Veuillez renseigner votre prénom",
          trigger: "blur",
        },
        email: {
          required: true,
          message: "Veuillez renseigner le nom d'utilisateur",
          trigger: "blur",
        },
        password: {
          required: true,
          message: "Veuillez renseigner le mot de passe",
          trigger: "blur",
        },
        passwordCheck: [
          {
            required: true,
            message: "Veuillez confirmer le mot de passe",
            trigger: "blur"
          },
          {
            validator: validatePasswordStartWith,
            message: 'Les mots de passe doivent être les mêmes',
            trigger: 'input'
          },
          {
            validator: validatePasswordSame,
            message: 'Les mots de passe doivent être les mêmes',
            trigger: ['blur', 'password-input']
          }
        ],
        
      },
      loading: loadingRef,
      handlePasswordInput () {
        if (formData.value.passwordCheck) {
          passwordCheck.value.validate({ trigger: 'password-input' })
        }
      },
      handleValidateClick(e) {
        e.preventDefault();
        loadingRef.value = true;
        formRef.value.validate((errors) => {
          if (formData.value.password !== formData.value.passwordCheck) {
            message.error("Les mots de passes ne sont pas identiques");
            loadingRef.value = false;
          } else {
            if (!errors) {
              store.dispatch("trySignUp", formData.value).then(() => {
                if (store.getters.isLoggedIn) {
                  message.success("Connecté(e)");
                  loadingRef.value = false;
                  router.push("/");
                } else {
                  message.error(
                    "L'utilisateur est déjà existant",
                    store.getters.errors
                  );
                  loadingRef.value = false;
                }
              });
            } else {
              console.log(errors);
              message.error("Les champs requis ne sont pas tous complétés");
              loadingRef.value = false;
            }
          }
        });
      },
    };
  },
});
</script>

<style lang="scss" scoped>
.n-card {
  max-width: 30rem;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.88);
}
</style>