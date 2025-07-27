<template>
    <CardUI class="login-card">
        <template #title>
            <div class="login-title">
                <h3 class="login-title__text">{{ $t('login.title') }}</h3>
            </div>
        </template>
        <div class="login-content">
            <InputUI
                class="login-input__text"
                v-model="user.email"
                :label="$t('login.labels.username')"
            />
            <InputUI
                class="login-input__password"
                v-model="user.password"
                :label="$t('login.labels.password')"
            />
            <span @click="handleForgotPassword" class="login-text">{{ $t('login.forgotPassword') }}</span>
        </div>
        <template #actions>
            <div class="login-actions">
                <ButtonUI class="action__btn" @click.stop="handleLogin">{{ $t('login.actions.login') }}</ButtonUI>
                <span class="action__text">{{ $t('login.actions.orSignUpUsing') }}</span>
                <div class="action__icons">
                    <Github class="w-6 h-6 text-gray-600" />
                    <span>{{ $t('login.actions.yandex') }}</span>
                    <span>{{ $t('login.actions.google') }}</span>
                </div>
            </div>
        </template>
    </CardUI>
</template>


<script setup lang="ts">
import ButtonUI from '../ui-kit/src/components/Button.vue';
import InputUI from '../ui-kit/src/components/Input.vue';
import CardUI from '../ui-kit/src/components/Card.vue';
import { reactive } from 'vue';
import { Github, AlignVerticalSpaceAround } from 'lucide-vue-next'
import { useRoute } from 'vue-router';
import {router} from '../router/index';


const route = useRoute();

interface User {
    email: string;
    password: string;
}

const user = reactive<User>({
    email: '',
    password: '',
});

const handleLogin = () => {
    
}

const handleForgotPassword = () => {
//   router.push({ name: 'verify-email', query: { email: response.user.email } });
}
</script>

<style scoped lang="scss">
.login {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;

    &-card {
        width: 30%;
        height: auto;
    }
}

.login-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.login-text {
    width: 100%;
    text-align: center;
    text-decoration: none;
    transition: text-decoration 0.2s ease;
    &:hover {
        text-decoration: underline;
        cursor: pointer;
    }
}

.login-input__text {
    width: 100%;
}

.login-input__password {
    width: 100%;
}


.login-title {
    width: 100%;
    text-align: center;
}

.login-actions {
    width: 100%;
    gap: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.action__btn {
    width: 100%;
}

.action__text {
    font-size: 14px;
}

.action__icons {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
}

</style>