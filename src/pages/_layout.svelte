<!-- routify:options preload="proximity" -->

<script lang="ts">
  import { url } from '@roxi/routify';
</script>

<header>
  <h1><a class="no-default" href={$url('/')}>Bahn Alaaaarm</a></h1>
</header>

<slot />

<style lang="scss">
  header {
    padding: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--bg-sec);
  }
  a {
    text-decoration: none;
  }
</style>
