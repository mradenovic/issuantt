<template>
  <article class="media">
    <figure class="media-left">
      <p class="image is-64x64">
        <img src="../assets/logo.png">
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <h1 class="content is-medium">Issuantt ({{ version }})</h1>
        <p>
          It's not an ant with an issue!
          It's an easy to use Gantt chart for GitLab and GithHub (and possibly Bitbucket) issues.
        </p>
      </div>
    </div>
  </article>
</template>

<script>
import { version } from '../../package.json'

export default {
  name: 'issuantt-header',
  data () {
    return {
      version: version
    }
  }
}
</script>
