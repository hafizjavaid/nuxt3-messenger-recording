<template>
    <!-- @vue-expect-error -->
    <CldUploadWidget v-slot="{ open }" :uploadPreset="uploadPreset" :options="{ maxFiles: 1 }"
        :onUpload="(result: any) => { console.log(result); emits('onChange', result.info.secure_url) }">

        <p v-if="label" @click="open" class="font-semibold cursor-pointer text-gray-900 dark:text-neutral-100 text-sm">
            {{ label }}
        </p>
        <Icon v-else @click="open" name="heroicons:photo" size="30" class="text-primary cursor-pointer" />
    </CldUploadWidget>

</template>

<script setup lang="ts">

const { public: { uploadPreset } } = useRuntimeConfig();

const props = defineProps<{
    label?: string
}>();

const emits = defineEmits(['onChange']);



</script>

<style scoped></style>