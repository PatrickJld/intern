<template>
    <input :type="type" v-model="inputValue" :name="nama" :id="nama"
        class="w-full px-4 py-2 my-1 rounded-lg outline-none bg-background-400 ring-1 ring-inset ring-stroke-100 placeholder-stroke-100" 
        :placeholder="placeHolder" autocomplete="off" :readonly="readonly"/>
</template>

<script>
export default {
    props: [
        "type", "modelValue", "placeHolder", "nama", "readonly"
    ],
    computed: {
        inputValue: {
            get() {
                return this.modelValue
            },
            set(value) {
                this.$emit('update:modelValue', value)
            }
        },
        // na,aValue: {
        //     get() {
        //         return this.nama
        //     },
        //     set(value) {
        //         this.$emit('update:nama', value)
        //     }
        // }
    }
}
</script>

<style>
    /* Chrome, Safari, Edge, Opera */
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    /* Firefox */
    input[type=number] {
        -moz-appearance: textfield;
    }
</style>