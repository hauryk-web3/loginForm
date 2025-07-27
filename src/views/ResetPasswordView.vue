<template>
  <CardUI class="reset-password__card">
    <template #title>
      <div class="reset-password__title">
        <h3 class="reset-password__title-text">{{ $t('resetPassword.title') }}</h3>
      </div>
    </template>
    <CardUI class="reset-password__hint">
      <p>{{ $t('resetPassword.hint') }}</p>
    </CardUI>
    <InputUI
      class="reset-password__input"
      v-model="newPassword"
      :label="$t('resetPassword.labels.createNewPassword')"
    ></InputUI>
    <InputUI
      class="reset-password__input"
      v-model="confirmPassword"
      :label="$t('resetPassword.labels.confirmYourPassword')"
    ></InputUI>
    <template #actions>
      <ButtonUI class="reset-password__btn" @click.stop="handleResetPassword">
        {{ $t('resetPassword.actions.change') }}
      </ButtonUI>
    </template>
  </CardUI>
</template>

<script setup lang="ts">
import CardUI from '../ui-kit/src/components/Card.vue';
import ButtonUI from '../ui-kit/src/components/Button.vue';
import InputUI from '../ui-kit/src/components/Input.vue';
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const token = computed(() => route.query.token as string);

const newPassword = ref<string>('');
const confirmPassword = ref<string>('');

const handleResetPassword = () => {
  //
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
