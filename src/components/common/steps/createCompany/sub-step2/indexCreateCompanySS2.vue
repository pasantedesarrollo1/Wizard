<template>
    <div>
        <form>
            <label>Carga tu logo aqui</label> <br>
            <input type="file" class="border border-black px-2 py-1 rounded w-full"/>
        </form>
        <br>
        <companyDomain />
    </div>
</template>

<script setup lang="ts">
import companyDomain from "@/components/common/steps/createCompany/sub-step2/components/companyDomain.vue"
</script>

<style scoped>

</style>