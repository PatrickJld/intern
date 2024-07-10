<template>
    <!-- <div class="h-full w-9/12 m-auto relative mt-3 text-black">
        <div class="flex justify-between mb-7">
            <h1 class="text-white text-3xl text-center font-bold mt-2">{{namaSection}}</h1>
            <div class="flex justify-center">
                <img src="../assets/logo.png" alt="" class="w-20">
            </div>
        </div> -->
    <div class="h-full w-9/12 m-auto relative mt-0 text-black">
        <div class="flex justify-between mb-5">
            <h1 class="text-white text-3xl text-center font-bold mt-5">{{namaSection}}</h1>
            <div class="text-center bg-background-400 rounded-full flex justify-center py-2 px-3 mt-1">
                <img src="../assets/logo.png" alt="" class="w-20">
            </div>
        </div>

        <div v-show="isStarted && this.instruksi!=null">
            <div class="rounded-lg bg-foreground-4-100 text-white ring-1 ring-inset ring-stroke-100
                        p-5 mt-5 mb-2 font-semibold text-lg" v-html="instruksi">
            </div>
            
            <button class="bg-foreground-4-100 hover:bg-foreground-4-200 text-white px-3 py-2 rounded-md" @click="this.$router.go(-1)">
                <i class="fa fa-chevron-left mr-2 text-xl"></i>
                <span class="font-bold text-xl">Kembali</span>
            </button>
            <form name="gambarForm" class="flex justify-center">
                <label for="gambar" class="border-dashed border-4 border-gray-400 border-inset rounded-md w-auto min-w-[20rem] 
                            h-auto min-h-[20rem] my-3 flex justify-center items-center text-center 
                            font-semibold text-xl">
                    <img v-if="url!=null" :src="url" alt="" class="h-auto w-auto">
                    <p v-else>Upload gambar anda (klik disini)</p>
                </label>
                <input type="file" name="gambar" id="gambar" class="hidden" @change="imageChange">
            </form>
            <div class="flex justify-center">
                <button class="bg-foreground-4-100 hover:bg-foreground-4-200 text-white duration-200 rounded-full w-1/2 py-2 font-bold text-xl" @click.prevent="submitJawaban">
                    <span id="nextBtn">Submit</span>
                    <i class="fa fa-chevron-right ml-3"></i>
                </button>
            </div>
        </div>

        <!-- Transparent Overlay -->
        <div id="bg" v-show="!isStarted" class="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-foreground-4-100 bg-opacity-60 z-40"></div>

        <!-- Countdown -->
        <div id="klikAnywhere" v-show="!isStarted" class="fixed inset-x-0 w-full h-full flex justify-center items-center top-0 text-white text-center text-5xl font-bold z-50"
            @click.prevent="mulai">
            Klik dimanapun untuk memulai
        </div>

        <!-- Something Went Wrong -->
        <div id="bgSomethingWrong" v-show="somethingWrong" class="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-red-100 bg-opacity-60 z-40"></div>
        <div id="somethingWrong" v-show="somethingWrong" class="fixed inset-x-0 w-full h-full flex justify-center items-center top-0 text-white text-center text-5xl font-bold z-50">
            Something Went Wrong. Please refresh or login again.
        </div>

        <div id="spinner-modal" class="fixed top-0 left-0 w-screen h-screen flex items-center bg-foreground-3-500 bg-opacity-70 justify-center z-20" style="display: none">
            <i class="fas fa-spinner animate-spin fa-7x inline-block text-foreground-4-100"></i>
        </div>
    </div>
</template>
<script>
import axios from 'axios'
import ImageQuestion from '../components/views/imageQuestion.vue'
import ImageAnswer from '../components/views/imageAnswer.vue'
import TextQuestion from '../components/views/textQuestion.vue'
import TextAnswer from '../components/views/textAnswer.vue'
import mChoiceAnswer from '../components/views/mChoiceAnswer.vue'

export default {
    components: {
        axios,ImageQuestion, ImageAnswer, TextQuestion, mChoiceAnswer, TextAnswer
    },
    data () {
        return {
            namaSection: 'Tes P',
            section_id: null,
            test_id: null,
            email: null,
            exam_session: null,
            test_result_id: null,
            port: import.meta.env.VITE_BACKEND_URL,
            isStarted: false,
            somethingWrong: false,
            instruksi: null,
            imageReady: false,
            url: null,
            image: null,
            abjad: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
            alias: [1,2,21,5,8,6,10,7,9,11,12,15,13,14,18,16,17,3,4,20,19],
        }
    },
    methods: {
        mulai(){
            this.isStarted = true
        },
        imageChange(e){
            var input = e.target;
            if (input.files) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.url = e.target.result;
                }
                this.image=input.files[0];
                reader.readAsDataURL(input.files[0]);
            }
        },
        submitJawaban(){
            $('#spinner-modal').fadeIn("slow");
            let formData = new FormData()
            formData.append('test_result_id', this.test_result_id)
            formData.append('section_id', this.section_id)
            formData.append('exam_session', this.exam_session)
            formData.append('question_id', this.pertanyaan[0].id)

            var fileGambar = document.forms['gambarForm']['gambar'].files[0]
            
            if (fileGambar){
                fileGambar.originalname = fileGambar.name

                formData.append('gambar', fileGambar)

                axios.post(this.port+'/section_result/create',{
                    "test_result_id": this.test_result_id,
                    "section_id": this.section_id,
                    "exam_session": this.exam_session,
                    "start_date": parseInt(this.$cookies.get("start_time")),
                    "finish_date": Date.now()
                })
                .then((response) => {
                    axios.post(this.port+'/question_result/uploadimage', formData)
                    .then((response) => {
                        this.$cookies.remove('current_section')
                        this.$cookies.remove("start_time")
                        $('#spinner-modal').fadeOut("slow")
                        Swal.fire(
                            'Submitted!',
                            'Task Successfully Submitted.',
                            'success'
                        )
                        .then(function(){
                            window.location = '/section'
                        })
                    })
                }).catch( error => { 
                    console.log('error: ' + error) 
                });
            }else{
                $('#spinner-modal').fadeOut("slow")
                Swal.fire(
                    'Error!',
                    'Gambar belum dimasukkan.',
                    'error'
                )
                .then(function(){})
            }
        }
    },

    created () {
        
    },

    beforeDestroy() {
        clearInterval(this.waktu)
    },

    mounted(){
        this.section_id = this.$cookies.get('current_section').id;
        let tes = this.$cookies.get('data_registrant').test
        let test_list = []
        for (let i = 0; i < tes.length; i++) {
            test_list.push(tes[i][0])
        }

        let counter = 0
        for (let i = 0; i < this.alias.length; i++) {
            const id = this.alias[i];
            for (let j = 0; j < test_list.length; j++) {
                const tempTest = test_list[j];
                if(tempTest==id){
                    if(id==20)
                        this.namaSection = "TES "+this.abjad[counter]
                    else{
                        counter++
                    }
                    break;
                }
            }
        }

        axios
        .get(this.port+'/question/all?section_id='+this.section_id)
        .then(({data}) => (
            this.pertanyaan = data
        ))

        axios
        .get(this.port+'/section/'+this.section_id)
        .then(({data}) => {
            let datas = this.$cookies.get("data_registrant")
            this.instruksi = data.instruction
            this.test_id = data.test_id
            let tests = datas.test;
            for (let i = 0; i < tests.length; i++) {
                if (tests[i][0]==this.test_id)
                    this.test_result_id = tests[i][1]
            }
            this.email = datas.email;
            this.exam_session = datas.exam_session;
        })
        
        // if(!this.section_id || !this.exam_session) this.somethingWrong = true;
    }
}
    
</script>

<style>

</style>