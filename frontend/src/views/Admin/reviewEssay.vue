<template>
    <div class="absolute top-24 w-full text-center">
        <div class="inline-block w-9/12 mb-2">
            <div class="flex gap-2 justify-end text-white">
                <button class="bg-primary-700 hover:bg-primary-900 duration-200 rounded-md px-5 h-8 w-20 text-base" @click.prevent="prevSoal">Prev</button>
                <button id="nextBtn" class="bg-primary-700 hover:bg-primary-900 duration-200 rounded-md px-5 h-8 w-20 text-base" @click.prevent="nextSoal">Next</button>
            </div>
        </div>

        <div class="relative w-9/12 mb-2 opacity-95 inline-block text-white">
            <div class="h-8 bg-foreground-4-100 ring-2 ring-inset ring-primary-400 rounded-xl"></div>    
            <div class="h-8 bg-primary-300 rounded-md absolute top-0" id="progress" style="width: 0px;"></div>
            <div class="w-full text-center absolute top-0">
                <p class="text-center py-1">Soal {{noSoal}}/{{jumSoal}}</p> 
            </div>
        </div>
        <div class="bg-foreground-4-100 text-xl rounded-xl h-auto w-9/12 px-3 py-3 mb-3 opacity-95 inline-block text-white" v-if="this.pertanyaan!=null">
            <p class="font-bold text-left mb-3 text-xl">Question:</p>
            <p class="text-lg">{{this.pertanyaan[noSoal-1].instruction}}</p>
        </div>
        <div class="bg-foreground-4-100 rounded-xl h-auto w-9/12 px-3 py-3 opacity-95 inline-block text-white" v-if="this.jawaban!=null">
            <p class="font-bold text-left mb-3 text-xl">Answer:</p>
            <p class="text-lg">{{this.jawaban[noSoal-1].answer}}</p>
        </div>
        <div class="inline-block w-9/12 mt-3">
            <p class="text-left text-xl font-bold mb-2 ml-3">Skor :</p>
            <button v-for="i in 3" :key="i" class="bg-primary-800 text-white text-3xl ring-4 ring-inset ring-primary-800 hover:ring-primary-200
                            duration-200 rounded-full h-auto w-auto px-20 py-3 mr-5 relative" 
                @click.prevent="hasil[noSoal-1]=i-1"> 
                <span>{{i-1}}</span>
                <i v-if="hasil[noSoal-1]===i-1" class="far fa-dot-circle fa-xs absolute right-5 top-1/2"></i>
            </button>
        </div>
        <div class="h-32"></div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    components: {
        axios
    },
    data() {
        return {
            noSoal: 1,
            jumSoal: 5,
            hasil: [],
            email: "",
            test_result_id: "",
            section_id: "",
            pertanyaan: null,
            jawaban: null,
            section_result: null,
            port: import.meta.env.VITE_BACKEND_URL
        }
    },
    methods: {
        nextSoal(){
            // console.log(this.jawaban)
            if (this.noSoal<this.jumSoal){
                this.noSoal++
                this.jumChoice = this.pertanyaan[this.noSoal-1]["option_num"]

                this.progress(true)
            }else{
                var isi = 0
                this.hasil.forEach(e => { if (e != null) isi++; });
                // isi = this.jumSoal;
                if(isi!=this.jumSoal){
                    Swal.fire({
                        title: 'Ada Jawaban yang Belum Dinilai!',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Tetap Submit'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.submitJawaban()
                        }
                    });
                }else{
                    Swal.fire({
                        title: 'Submit This Task?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.submitJawaban()
                        }
                    });
                }
            }
        },
        prevSoal(){
            if (this.noSoal>1){
                this.noSoal--
                this.jumChoice = this.pertanyaan[this.noSoal-1]["option_num"]
                this.progress(false)
            }
        },
        progress(maju){
            const elements = document.getElementById("progress")
            var interval = setInterval(frame, 50)
            var ctr = 0
            var tambahan = ((1/this.jumSoal)*100)/5
            function frame() {
                if(maju){
                    var width = parseFloat(elements.style.width.replace(/px/,""))+tambahan
                }else{
                    var width = parseFloat(elements.style.width.replace(/px/,""))-tambahan
                }

                if (ctr == 5) {
                    clearInterval(interval)
                } else {
                    elements.style.width = width +'%'
                }
                ctr++
            }
        },
        async submitJawaban(){
            let num_correct = 0
            for (let i = 0; i < this.hasil.length; i++) {
                num_correct+=this.hasil[i]
            }
            
            for (let i = 0; i < this.jawaban.length; i++) {
                await axios.post(this.port+'/question_result/update',{
                    "updating_id": this.jawaban[i].id,
                    "section_result_id": this.section_result[0].id,
                    "question_id": this.jawaban[i].question_id,
                    "answer": this.jawaban[i].answer,
                    "status_correct": this.hasil[i]
                })
                .then((response) => {
                    
                }).catch( error => { 
                    console.log('error: ' + error) 
                });
            }

            axios.post(this.port+'/section_result/update',{
                "updating_id": this.section_result[0].id,
                "test_result_id": this.test_result_id,
                "section_id": this.section_id,
                "exam_session": this.section_result[0].exam_session,
                "start_date": this.section_result[0].start_date,
                "finish_date": this.section_result[0].finish_date,
                "num_correct": num_correct
            })
            .then((response) => {
                axios.post(this.port+'/test_result/calculateresult',{
                    test_id: this.test_id,
                    email: this.email
                })
                .then((response) => {
                    this.$cookies.remove('current_registrant')
                    let email2 = this.email
                    Swal.fire(
                        'Submitted!',
                        'Task Successfully Submitted.',
                        'success'
                    )
                    .then(function(){
                        window.location = '/admin/registrantDetail?registrant='+email2
                    })
                })
                }).catch( error => { 
                console.log('error: ' + error) 
            });
        },
    },
    created(){
        this.$emit('updateHeader', 'Review Essay')
    },
    mounted() {
        let data = this.$cookies.get("current_registrant")
        this.email = data.email
        this.section_id = data.section_id
        this.test_id = data.test_id
        this.test_result_id = data.test_result_id

        axios
        .get(this.port+'/question/all?section_id='+this.section_id)
        .then(({data}) => (
            this.pertanyaan = data,
            this.jumSoal = this.pertanyaan.length,
            this.progress(true)
            // console.log(this.pertanyaan)
        ))

        axios
        .get(this.port+`/question_result/getbysection/${this.section_id}?email=${this.email}`)
        .then(({data}) => (
            this.jawaban = data
            // console.log(this.jawaban)
        ))

        axios
        .get(this.port+`/section_result/getbysection/${this.section_id}?email=${this.email}`)
        .then(({data}) => (
            this.section_result = data
            // console.log(this.section_result)
        ))

        let thi = this
        $('body').keydown(function(event) {
            if (event.keyCode==37)
                thi.prevSoal()
            else if (event.keyCode==39)
                thi.nextSoal()
        });
    },
}
</script>

<style>

</style>