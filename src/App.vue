<template>
  <div id="app" class="section">
    <!-- Provider content -->
    <main>
      <!-- Provider header -->
      <header class="content">
        <sign-out/>

        <sign-in/>
      </header>

      <!-- Provider filter -->
      <section class="content">
        <issue-search/>
      </section>

      <!-- Provider error -->
      <section class="content">
        <error/>
      </section>

      <!-- Provider filter result -->
      <section class="content">
        <Page />
      </section>
    </main>
  </div>
</template>

<script>
import 'font-awesome/css/font-awesome.css'
import './assets/styles/issuantt.scss'

import SignIn from './components/SignIn.vue'
import SignOut from './components/SignOut.vue'
import IssueSearch from './components//IssueSearch.vue'
import Error from './components//Error.vue'
import Page from './components/Page.vue'

export default {
  name: 'app',
  components: {
    SignIn,
    SignOut,
    IssueSearch,
    Error,
    Page
  }
}
</script>
