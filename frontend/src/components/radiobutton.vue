<template>
    <div>
        <input type="radio" :value="values" :name="names" v-model="inputValue" :checked="isChecked" :id="id" class="w-5 h-5 mr-2" 
            @change="$emit('change', $event.target.value)" />
        <label :for="id" class="mr-2">{{ label }}</label>
    </div>
</template>

<script>
export default {
    model: {
        prop: 'modelValue',
        event: 'change'
    },
    props: {
        "label": { type: String, default: "", required:true },
        "modelValue": { default: "" },
        "values": { type: String, default: undefined },
        "names": { type: String, default: "" },
        "id": { type: String, default: "" }
    },
    computed: {
        isChecked() {
            return this.modelValue == this.values
        },
        inputValue: {
            get() {
                return this.modelValue
            },
            set(value) {
                this.$emit('update:modelValue', value)
            }
        },
    }
}
</script>