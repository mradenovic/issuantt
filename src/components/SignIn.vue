<template>
<!-- SignIn Header -->
  <nav class="level" v-if="!user">
    <!-- Left side -->
    <div class="level-left">
      <div class="level-item" v-for="p of providers" :key="p">
        <div>
          <button class="button is-rounded is-info" :class="{'is-inverted': p !== provider}" @click="setProvider(p)">
            <i :class="['fa fa-' + p]"></i>
          </button>
        </div>
      </div>

      <div class="level-item">
        <input placeholder="Private token" class="input" tabindex="2" v-model="providerToken" v-on:keyup.enter="signIn">
      </div>

      <div class="level-item">
        <input placeholder="Custom address" class="input" tabindex="1" v-model="providerURL" v-on:keyup.enter="signIn" v-bind:disabled="provider != 'gitlab'">
      </div>
    </div>

    <!-- Right side -->
    <div class="level-right">
      <p class="level-item"><a class="button is-info" @click="signIn">Sign In</a></p>
    </div>
  </nav>
</template>

<script>
import Provider from '../mixins/Provider'

export default {
  name: 'sign-in',
  mixins: [
    Provider
  ],
  props: {
    providers: {
      type: Array,
      required: true
    }
  }
}
</script>
