<template>
    <div class="rounded-lg text-white bg-foreground-4-100 ring-1 ring-inset ring-black" v-if="this.choices!==''">
        <div class="mb-5">
            <div class="flex">
                <!-- <p class="text-lg font-bold my-2 mx-3">{{judul}}</p> -->
                <div v-if="jenis === 'add'" class="mt-2">
                    <input type="file" name="imgJawaban" id="" class="mb-2" @change="jawabanChange"> <br>
                </div>
            </div>
            <div class="text-center h-auto py-2 px-2">
                <img v-if="jenis === 'add'" :src="urlJawaban" class="inline-block h-full" alt="" id="imgJawaban">
                <!-- <img v-else src="../../assets/jawaban1.png" alt="" id="imgJawaban" class="inline-block h-full"> -->
                <img v-else :src="this.choices" alt="" id="imgJawaban" class="inline-block max-h-32">
            </div>
        </div>
    </div>

    <div class="w-full text-center">
        <div class="flex gap-3 w-full" v-if="this.pilihan.length>0">
            <!-- <AnswerButton :jenis="jenis" :jawaban = jawaban :noSoal = noSoal :label="choices[0]" />
            <AnswerButton :jenis="jenis" :jawaban = jawaban :noSoal = noSoal :label="choices[1]" />
            <AnswerButton v-if="numberOfChoices>2" :jenis="jenis" :jawaban = jawaban :noSoal = noSoal :label="choices[2]" />
            <AnswerButton v-if="numberOfChoices>3" :jenis="jenis" :jawaban = jawaban :noSoal = noSoal :label="choices[3]" />
            <AnswerButton v-if="numberOfChoices>4" :jenis="jenis" :jawaban = jawaban :noSoal = noSoal :label="choices[4]" /> -->
            <AnswerButton :jenis="jenis" :jawaban = jawaban :noSoal = noSoal :label="this.pilihan[0]" @setChangeds="setChangeds" />
            <AnswerButton :jenis="jenis" :jawaban = jawaban :noSoal = noSoal :label="this.pilihan[1]" @setChangeds="setChangeds" />
            <AnswerButton v-if="numberOfChoices>2" :jenis="jenis" :jawaban = jawaban :noSoal = noSoal :label="this.pilihan[2]" @setChangeds="setChangeds" />
            <AnswerButton v-if="numberOfChoices>3" :jenis="jenis" :jawaban = jawaban :noSoal = noSoal :label="this.pilihan[3]" @setChangeds="setChangeds" />
            <AnswerButton v-if="numberOfChoices>4" :jenis="jenis" :jawaban = jawaban :noSoal = noSoal :label="this.pilihan[4]" @setChangeds="setChangeds" />
        </div>
    </div>
</template>

<script>
import AnswerButton from '../answerButton.vue'
export default {
    components: {
        AnswerButton
    },
    emits: ["updateUrl"],
    props: {
        "judul": { type: String, default: '' },
        "jawaban": { type: Array, default: [], required: true },
        "noSoal": { type: Number, default: 1, required: true },
        "numberOfChoices": { type: Number, default: 4, required: true },
        "choices": { type: String, default: '' },
        "jenis": { type: String, default: "" },
        "urlJawaban": { type: String, default: "" },
        "section": { type: Number, default:-1, required: true }
    },
    data() {
        return{
            url: this.urlJawaban,
            pilihan: []
        }
    },
    emits: ["setChanged"],
    methods: {
        setChangeds(){
            this.$emit('setChanged', true)
        },
        choose(id){
            this.jawaban[this.noSoal-1] = id
        },
        jawabanChange(e){
            var input = e.target;
            if (input.files) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.url = e.target.result;
                }
                this.image=input.files[0];
                reader.readAsDataURL(input.files[0]);
                
                var updatedUrl = URL.createObjectURL(this.image);
                this.$emit('updateUrl', updatedUrl)
            }
        },
    },
    mounted(){
        if([79, 51].includes(this.section)){
            this.pilihan=[
                "1","2","3","4","5"
            ]
        }else if([9, 46, 48, 49, 50, 67, 68].includes(this.section))
            this.pilihan=[
                "A","B","C","D","E"
            ]
    },
}
</script>

<style>

</style>