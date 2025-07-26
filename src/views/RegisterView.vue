<template>
    <CardUI class="register-card">
        <template #title>
            <div class="register-title">
                <h3 class="register-title__text">{{$t('register.title')}}</h3>
            </div>
        </template>
        <div class="register-content">
            <InputUI 
                class="register-input__text" 
                v-model="user.firstName" 
                :label="$t('register.labels.firstName')"
                :error="errors.firstName"
            />
            <InputUI 
                class="register-input__text" 
                v-model="user.lastName" 
                :label="$t('register.labels.lastName')"
                :error="errors.lastName"
            />
            <InputUI 
                class="register-input__text" 
                v-model="user.email" 
                :label="$t('register.labels.email')"
                :error="errors.email"
            />
            <InputUI 
                class="register-input__password" 
                v-model="user.password" 
                :label="$t('register.labels.password')"
                :error="errors.password"
            />
            <InputUI 
                class="register-input__password" 
                v-model="user.confirmPassword" 
                :label="$t('register.labels.confirmPassword')"
                :error="errors.confirmPassword"
            />
        </div>
        <template #actions>
            <div class="login-actions">
                <ButtonUI class="action__btn" @click.stop="handleRegister">{{$t('register.actions.register')}}</ButtonUI>
            </div>
        </template>
    </CardUI>
</template>


<script setup lang="ts">
import ButtonUI from '../ui-kit/src/components/Button.vue';
import InputUI from '../ui-kit/src/components/Input.vue';
import CardUI from '../ui-kit/src/components/Card.vue';
import { reactive, watch } from 'vue';
import {
  validateFirstName,
  validateLastName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from '../utils/validation';
import { register } from '../services/authService';
import {router} from '../router/index';
import type User from '../types/user';

const user = reactive<User>({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
});

const errors = reactive<Record<string, string>>({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
});

watch(() => user.firstName, (val) => {
  errors.firstName = validateFirstName(val);
});

watch(() => user.lastName, (val) => {
  errors.lastName = validateLastName(val);
});

watch(() => user.email, (val) => {
  errors.email = validateEmail(val);
});

watch(() => user.password, (val) => {
  errors.password = validatePassword(val);
  errors.confirmPassword = validateConfirmPassword(val, user.confirmPassword);
});

watch(() => user.confirmPassword, (val) => {
  errors.confirmPassword = validateConfirmPassword(user.password, val);
});

const validate = (): boolean => {
  errors.firstName = validateFirstName(user.firstName);
  errors.lastName = validateLastName(user.lastName);
  errors.email = validateEmail(user.email);
  errors.password = validatePassword(user.password);
  errors.confirmPassword = validateConfirmPassword(user.password, user.confirmPassword);

  return Object.values(errors).every(error => error === '');
};

const handleRegister = async () => {
  if (!validate()) return;

  const response = await register({
    firstname: user.firstName,
    lastname: user.lastName,
    email: user.email,
    password: user.password,
  });

  router.push({ name: 'verify-email', query: { email: response.user.email } });

};
</script>

<style scoped lang="scss">
.register {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;

    &-card {
        width: 30%;
        height: auto;
    }

    &-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        width: 100%;
    }

    &-input {
        &__text, &__password {
            width: 100%;
        }
    }

    &-title {
        width: 100%;
        text-align: center;
    }

}

.action__btn {
    width: 100%;
}
</style>