<template>
    <td class="px-1 border border-stroke-100">
        <input type="text" v-model="inputValue" :name="nama" :id="nama"
            class="w-full px-3 py-1 my-1 rounded-xl bg-transparent placeholder-stroke-100 text-center outline-none" 
            :placeholder="placeHolder" autocomplete="off"/>
    </td>
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