<template>
    <router-link :to="router_link">
        <v-btn class="transparent" elevation="10" outlined color="white">
            <slot></slot>
        </v-btn>
    </router-link>    
</template>
  
<script>
  export default {
    name: 'ButtonHeader',
    props: {
        router_link: {
          type: String,
          required: true
        }
    }
  };
</script>