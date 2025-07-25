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
                <p>email - {{ userEmail }}</p>
            </div>
            <div class="otp-inputs">
            <input
                v-for="(digit, index) in otp"
                :key="index"
                type="text"
                inputmode="numeric"
                maxlength="1"
                class="otp-input"
                v-model="otp[index]"
                ref="inputs"
                @input="onInput(index)"
                @keydown.backspace="onBackspace(index)"
            />
            </div>
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
import {ref, computed, onMounted, onUnmounted} from 'vue';
import { useRoute } from 'vue-router';
import { verify } from '../services/authService';
import {router} from '../router/index';

const route = useRoute();

const countdown = ref(60);
const timer = ref<number | null>(null);

const userEmail = computed(() => route.query.email as string || '');

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

const handleResetCode = () => {
    stopCountdown();
    startCountdown();
}


const otp = ref<string[]>(Array(6).fill(''));
const inputs = ref<HTMLInputElement[]>([]);

function onInput(index: number) {
  const current = inputs.value[index];
  if (current.value.length > 1) {
    current.value = current.value.slice(0, 1);
  }

  if (current.value && index < otp.value.length - 1) {
    inputs.value[index + 1]?.focus();
  }
}

function onBackspace(index: number) {
  if (otp.value[index] === '' && index > 0) {
    inputs.value[index - 1]?.focus();
  }
}

const getOtpValue = computed(() => otp.value.join(''));

const handleSubmit = async () => {
  const code = getOtpValue.value;
  
  await verify({
    email: userEmail.value,
    code: code,
  })
  
  router.push({ name: 'login' });
};

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

.otp-inputs {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 20px;
}

.otp-input {
  width: 40px;
  height: 50px;
  font-size: 24px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #3b82f6;
  }
}

</style>