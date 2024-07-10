<template>
    <div class="h-full w-9/12 m-auto relative mt-3">
        <div class="flex justify-between mb-2">
            <h1 class="text-xl font-bold">Add New Question</h1>
            <p class="text-xl font-bold">Tes 1</p>
        </div>

        <div id="soal">
            <form action="" enctype="multipart/form-data">
                <!-- <ImageQuestion :label="'Pola Terpisah :'" :jenis="'add'" :urlSoal="urlSoal" @updateUrl="updateUrlSoal" /> -->
                <TextQuestion :jenis="'add'" @updateQuestion="updateQuestion" />
                <!-- <ImageAnswer :judul="'Pilihan Jawaban :'" :jenis="'add'" :urlJawaban="urlJawaban" :jawaban = jawaban 
                            :noSoal = noSoal :numberOfChoices = 5 :choices = pilihanJawaban @updateUrl="updateUrlJawaban" /> -->
                <mChoiceAnswer :jenis="'add'" :jawaban = jawaban :noSoal = noSoal :numberOfChoices = 4 :choices = pilihanJawaban />
            </form>
        </div>
        
        <div class="text-right mt-10">
            <button class="bg-foreground-3-100 hover:bg-foreground-3-300 duration-200 rounded-full px-5 py-1 font-bold text-xl" @click.prevent="submit">
                <span id="nextBtn">Submit</span>
                <i class="fa fa-chevron-right ml-3"></i>
            </button>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Radiobutton from '../../components/radiobutton.vue'
import ImageQuestion from '../../components/views/imageQuestion.vue'
import ImageAnswer from '../../components/views/imageAnswer.vue'
import TextQuestion from '../../components/views/textQuestion.vue'
import mChoiceAnswer from '../../components/views/mChoiceAnswer.vue'
export default {
    components: {
        Radiobutton, ImageQuestion, ImageAnswer, TextQuestion, mChoiceAnswer, axios
    },
    data () {
        return {
            judulHalaman: 'Add Question',
            noSoal: 21,
            jawaban: [],
            numberOfChoices: 5,
            pilihanJawaban: ['A','B','C','D','E'],
            urlSoal: null,
            urlJawaban: null,
            question: ''
        }
    },
    methods: {
        soalChange(e){
            var input = e.target;
            if (input.files) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.urlSoal = e.target.result;
                }
                this.image=input.files[0];
                reader.readAsDataURL(input.files[0]);
            }
        },
        jawabanChange(e){
            var input = e.target;
            if (input.files) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.urlJawaban = e.target.result;
                }
                this.image=input.files[0];
                reader.readAsDataURL(input.files[0]);
            }
        },
        updateUrlSoal(url){
            this.urlSoal = url
        },
        updateUrlJawaban(url){
            this.urlJawaban = url
        },
        updateQuestion(question){
            this.question = question
        },
        submit(){

        },
        a(){
            alert(this.question)
        }
    },
    created(){
        this.$emit('updateHeader', this.judulHalaman)
    }
}
</script>

<style>

</style>