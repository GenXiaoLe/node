<template>
    <div>
        <header><Logo /></header>
        <nuxt />
    </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
export default {
    components: {
        Logo
    }
}
</script>

<style lang="scss" scoped>
    header {
        width: 200px;
        margin: 0 auto;
        margin-top: 50px;
        margin-bottom: 50px;
    }
</style>