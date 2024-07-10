<template>
    <div class="mb-2 rounded-lg bg-foreground-4-100 ring-1 ring-inset ring-black">
        <p class="text-lg text-white font-bold my-2 mx-3 md:w-1/12">{{label}}</p>
        <div class="text-center h-auto py-2 w-full flex justify-center items-center">
            <div class="w-full py-1 mx-5">
                <div v-if="this.pertanyaan!==''" class="flex text-white w-full">
                    <div class="w-1/2 flex justify-center">
                        <img :src="img" alt="" id="imgSoal" class="inline-block max-h-[30rem]">
                    </div>
                    <div class="w-1/2">
                        <p>{{this.pertanyaan}}</p>
                    </div>
                </div>
                <img v-else :src="img" alt="" id="imgSoal" class="inline-block max-h-48">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        "label": { type: String, default: "" },
        "jenis": { type: String, default: "" },
        "pertanyaan": {type: String, default: ""},
        "img": {type: String, default: ""}
    },
    // emits: ["updateUrl"],
    data() {
        return{
            url: this.urlSoal,
        }
    },
    methods: {
        soalChange(e){
            var input = e.target;
            if (input.files) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.url = e.target.result;
                }
                
                this.image=input.files[0];
                var updatedUrl = URL.createObjectURL(this.image);

                reader.readAsDataURL(input.files[0]);
                this.$emit('updateUrl', updatedUrl)
            }
        },
    },
    mounted() {

    },
}
</script>