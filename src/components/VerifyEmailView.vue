<template>
    <div class="email-validation">
        <CardUI class="email-validation__card">
            <template #title>
                <div class="email-validation__title">
                    <span class="email-validation__title-text">OTP Verification</span>
                </div>
                <p v-if="countdown > 0" class="email-validation__timer-text">
                    You can resend the code in <strong>{{ countdown }}</strong>s
                </p>
            </template>
            <div class="email-validation__placeholder">
                <p>We've sent a verification code to your </p>
                <p>email - {{ email }}</p>
            </div>
            <InputUI placeholder="Enter Verification code" v-model="emailValidationCode" class="email-validation__input"></InputUI>
            <ButtonUI 
                class="email-validation__btn"
                @click="handleSubmit"
                >
                Submit
            </ButtonUI>
            <ButtonUI 
                class="email-validation__btn"
                @click="handleResetCode"
                >
                Resent code
            </ButtonUI>
        </CardUI>
    </div>
</template>

<script setup lang="ts">
import CardUI from '../ui-kit/src/components/Card.vue';
import ButtonUI from '../ui-kit/src/components/Button.vue';
import InputUI from '../ui-kit/src/components/Input.vue';
import {ref, computed, onMounted, onUnmounted} from 'vue';
import { useRoute } from 'vue-router';

const emailValidationCode = ref<string>("");
const route = useRoute();

const countdown = ref(60);
const timer = ref<number | null>(null);

const email = computed(() => route.query.email as string || '');

function startCountdown() {
  countdown.value = 180;
  timer.value = window.setInterval(() => {
    countdown.value--;
    if (countdown.value <= 0) stopCountdown();
  }, 1000);
}

function stopCountdown() {
  if (timer.value !== null) {
    clearInterval(timer.value);
    timer.value = null;
  }
}

const handleSubmit = () => {

}

const handleResetCode = () => {
    stopCountdown();
    startCountdown();
}

onMounted(startCountdown);
onUnmounted(stopCountdown);

</script>

<style scoped lang="scss">
.email-validation {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;

    &__input, &__btn {
        width: 100%;
    }

    &__btn {
        margin-bottom: 10px;
    }

    &__title {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
    }

    &__card {
        width: 30%;
    }

    &__resent {
         margin-top: 20px;
        text-align: center;
    }
}


</style>