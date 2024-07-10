<template>
    <textarea v-model="inputValue" :name="nama" 
        class="w-full px-3 py-1 mb-1 rounded-xl outline-none bg-background-400 placeholder-stroke-100 resize-none" 
        :placeholder="placeHolder"/>
</template>

<script>
export default {
    props: ['modelValue', 'placeHolder', 'nama'],
    computed: {
        inputValue: {
            get() {
                return this.modelValue
            },
            set(value) {
                this.$emit('update:modelValue', value)
            }
        }
    }
}
</script>

<style>

</style>