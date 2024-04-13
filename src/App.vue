<script setup lang="ts">
import ApplicationBar from "./components/shared/ApplicationBar.vue";
import Aside from "./components/shared/Aside.vue";
import FswTable from "./components/FswTable.vue";
</script>

<template>
  <v-layout class="rounded rounded-md">
    <ApplicationBar />

    <Aside />

    <v-main class="d-flex pe-0 pb-0" >
      <v-row no-gutters>
        <v-col cols="12">
          <fsw-table />
        </v-col>
      </v-row>
    </v-main>
  </v-layout>
</template>

<style scoped>

</style>
