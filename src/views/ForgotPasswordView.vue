<template>
  <CardUI class="reset-password__card">
    <template #title>
      <div class="reset-password__title">
        <h3 class="reset-password__title-text">{{ $t('forgotPassword.title') }}</h3>
      </div>
    </template>
    <InputUI
      class="reset-password__input"
      v-model="email"
      :label="$t('forgotPassword.labels.enterEmailAddress')"
    ></InputUI>
    <template #actions>
      <ButtonUI class="reset-password__btn" @click.stop="handleContinue">
        {{ $t('forgotPassword.actions.continue') }}
      </ButtonUI>
    </template>
  </CardUI>
</template>

<script setup lang="ts">
import CardUI from '../ui-kit/src/components/Card.vue';
import ButtonUI from '../ui-kit/src/components/Button.vue';
import InputUI from '../ui-kit/src/components/Input.vue';
import { ref, computed } from 'vue';
import { api } from '../api/services';

const email = ref<string>('');

const handleContinue = async () => {
  const result = await api.auth.forgotPassword({ email: email.value });

  alert('Link to reset password goes to mail');
};
</script>

<style scoped lang="scss">
.reset-password {
  &__card {
    width: 30%;
    height: auto;
  }

  &__title {
  }
}
</style>
