<template>
  <div id="app">
    <Navbar />
    <router-view/>
  </div>
</template>

<script>
import firebase from '@/firebase/init'
import Navbar from '@/components/layout/Navbar'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>

</style>
