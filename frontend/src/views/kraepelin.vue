<template>
    <!-- <div class="h-full w-11/12 md:w-9/12 m-auto relative mt-3 overflow-hidden">
        <div class="flex justify-between mb-7">
            <h1 class="text-white text-3xl text-center font-bold mt-2">{{namaTes}}</h1>
            <div class="flex justify-center">
                <img src="../assets/logo.png" alt="" class="w-20">
            </div>
        </div> -->
    <div class="h-full w-11/12 md:w-9/12 m-auto relative mt-0 text-black">
        <div class="flex justify-between mb-5">
            <h1 class="text-white text-3xl text-center font-bold mt-5">{{namaTes}}</h1>
            <div class="text-center bg-background-400 rounded-full flex justify-center py-2 px-3 mt-1">
                <img src="../assets/logo.png" alt="" class="w-20">
            </div>
        </div>

        <form v-if="this.dataKraepelin==null" class="bg-foreground-3-500 w-full h-full rounded-xl text-black overflow-y-auto no-scrollbar py-5 px-5"
            @submit.prevent="submitKraepelinData">
            <h1 class="text-3xl font-bold mb-2">Biodata</h1>
            <div class="mb-5 mt-3 md:flex gap-10">
                <div class="md:w-1/2 mb-5">
                    <div class="flex gap-3">
                        <div class="text-right">
                            <p class="mb-8 mt-1">PENDIDIKAN TERAKHIR :</p>
                            <p>JENIS KELAMIN :</p>
                        </div>
                        <div class="grow">
                            <select name="pendidikan" id="pendidikanCombobox" class="text-black text-lg rounded-xl py-1 px-2 outline-none shadow-xl mb-5 w-full">
                                <option value="smea">SMEA</option>
                                <option value="stm-smk">STM/SMK</option>
                                <option value="sma">SMA</option>
                                <option value="sarjana muda">SARJANA MUDA (D3)</option>
                                <option value="sarjana">SARJANA (S1)</option>
                            </select>
                            <select name="jk" id="jkCombobox" class="text-black text-lg rounded-xl py-1 px-2 outline-none shadow-xl cursor-pointer block w-full">
                                <option value="l">LAKI-LAKI</option>
                                <option value="p">PEREMPUAN</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="md:w-1/2">
                    <div class="flex gap-3">
                        <div class="text-right">
                            <p class="mb-8 mt-1 ml-24">JURUSAN :</p>
                        </div>
                        <div class="grow">
                            <select name="jurusan" id="jurusanCombobox" class="grow text-black text-lg rounded-xl py-1 px-2 outline-none shadow-xl cursor-pointer w-full">
                                <option value="ipa">IPA</option>
                                <option value="ips">IPS</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div class="text-right">
                <button type="submit" class="bg-foreground-4-100 text-white hover:bg-foreground-4-200 duration-200 rounded-full text-lg font-bold px-10 py-2">
                    Submit dan mulai
                </button>
            </div>
        </form>
        <div v-else id="soal" v-show="isStarted==2">
            <div class="rounded-lg bg-foreground-4-100 text-white ring-1 ring-inset ring-stroke-100
                        p-5 my-5 flex justify-center items-center text-xl font-bold">
                Untuk menjawab dapat menekan angka pada keyboard ataupun menekan tombol yang tersedia.
            </div>
            <div class="flex justify-between text-lg font-bold mb-2 relative z-10">
                <p>Sisa Waktu : {{('00'+detik).slice(-2)}} Detik</p>
                
                <!-- <p class="text-center py-1">Kolom {{kolom>jumKolom ? jumKolom : kolom}}/{{jumKolom}}</p>  -->
                <p class="text-center py-1">{{kolom>jumKolom ? jumKolom : kolom}}</p> 
            </div>

            <div class="bg-foreground-4-100 py-10 rounded-lg">
                <div class="text-center font-bold mb-5 text-white" v-if="pertanyaan!=null">
                    <p class="text-5xl mb-2" v-if="currentRow<28">{{pertanyaan[27-currentRow]}} + {{pertanyaan[28-currentRow]}} = ...</p>
                    <p class="text-5xl mb-2" v-else>Kolom Berikutnya...</p>
                    <p v-if="currentRow<27">Berikutnya: {{pertanyaan[26-currentRow]}} + {{pertanyaan[27-currentRow]}} = ...</p>
                    <p v-else>Berikutnya: -</p>
                </div>
                <div class="h-full pt-2 font-bold mt-10">
                    <div class="flex gap-5 justify-center">
                        <div>
                            <div v-for="i in 3" :key="i" class="mb-5">
                                <button v-for="j in 3" :key="j" class="px-10 py-1 bg-background-200 ring-1 ring-inset ring-stroke-100 text-xl mr-5 rounded-lg font-bold
                                                                hover:bg-background-300 duration-200" @click.prevent="jawabTombol">{{j+((i-1)*3)}}</button>
                            </div>
                            <div class="text-center">
                                <button class="px-10 py-1 bg-background-200 ring-1 ring-inset ring-stroke-100 text-xl mr-5 rounded-lg font-bold
                                            hover:bg-background-300 duration-200" @click.prevent="jawabTombol">0</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Transparent Overlay -->
        <div id="bg" v-show="isStarted==1" class="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-foreground-4-100 bg-opacity-60 z-40"></div>

        <!-- Countdown -->
        <div id="klikAnywhere" v-show="isStarted==1" class="fixed inset-x-0 w-full h-full flex justify-center items-center text-center top-0 text-white text-5xl font-bold z-50"
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
import AnswerButton from '../components/answerButton.vue'
import Radio from '../components/radiobutton.vue'

export default {
    components: {
        axios, AnswerButton, Radio
    },
    data () {
        return {
            namaTes: "Tes D",
            judulHalaman: '',
            kolom: 1,
            current_kolom: 1,
            jumKolom: 50,
            detik: 15,
            waktu: null,
            row1: [],
            row2: [],
            row3: [],
            currentRow: 1,
            timer: null,
            jawaban: [],
            jawabanFinal: [],
            pertanyaanFull: null,
            pertanyaan: null,
            dataQuestion: null,
            pilihanJawaban: null,
            section_id: 53,
            test_result_id: null,
            exam_session: null,
            num_correct: 0,
            email: null,
            section_result_id: null,
            dataKraepelin: null,
            port: import.meta.env.VITE_BACKEND_URL,
            isStarted: 0,
            somethingWrong: false,
            abjad: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
            alias: [1,2,21,5,8,6,10,7,9,11,12,15,13,14,18,16,17,3,4,20,19],
        }
    },
    methods: {
        gotData(data){
            if(data!=undefined){
                this.section_result_id = data[0].section_result_id
                this.isStarted = 1
            }
        },
        mulai(){
            this.isStarted = 2

            this.waktu = setInterval(() => {
                if (this.pertanyaanFull && this.dataKraepelin){
                    this.detik--
                    if (this.detik<=0){
                        this.detik = 15
                        this.reset()
                    }
                }
            }, 1000);
        },
        submitKraepelinData(e){
            let pendidikan = e.target["pendidikan"].value
            let jurusan = e.target["jurusan"].value
            let jk = e.target["jk"].value
            
            $('#spinner-modal').fadeIn("slow");

            axios.post(this.port+'/section_result/create',{
                "test_result_id": this.test_result_id,
                "section_id": this.section_id,
                "exam_session": this.exam_session,
                "start_date": parseInt(this.$cookies.get("start_time")),
                "finish_date": Date.now()
            })
            .then((dataResponse) => {
                this.section_result_id = dataResponse.data.id
                axios.post(this.port+'/kreapelin_data/create',{
                    "section_result_id": this.section_result_id,
                    "email": this.email,
                    "pendidikan": pendidikan,
                    "jurusan": jurusan,
                    "jenis_kelamin": jk
                })
                .then((response) => {
                    $('#spinner-modal').fadeOut("slow"),
                    this.isStarted = 1
                    this.dataKraepelin = response.data,
                    document.getElementById("klikAnywhere").classList.remove("hidden"),
                    document.getElementById("bg").classList.remove("hidden")
                    // console.log(this.dataKraepelin)
                }).catch( error => { 
                    console.log('error: ' + error) 
                });
            }).catch( error => { 
                console.log('error: ' + error) 
            });

            
        },
        nextSoal(value){
            if(value!=="" && this.currentRow<28 && this.kolom<=this.jumKolom){
                this.jawaban[this.kolom-1][this.currentRow-1] = value
                this.currentRow += 1
            }
            if(this.current_kolom>this.kolom){
                this.resetNext()
            }
        },
        ngisi(event){
            var isi = event.target.value
            event.target.value = isi.substring(0,1)
            this.nextSoal(event.target.value)
        },
        resetNext(){
            let selisih = this.current_kolom - this.kolom
            for (let i = 0; i < selisih; i++) {
                for (let j = this.jawaban[this.kolom-1].length; j < 27; j++) {
                    this.jawaban[this.kolom-1][j]=-1
                }
                this.kolom++
                this.jawaban.push([])
            }

            this.currentRow = 1
            this.pertanyaan = this.pertanyaanFull[this.kolom-1]
            // console.log(this.jawaban)
        },
        reset(){
            this.current_kolom++
            if(this.current_kolom > this.jumKolom){
                this.submitJawaban()
            }
        },
        jawabTombol(event){
            this.nextSoal(parseInt(event.target.innerText))
        },

        submitJawaban(){
            clearInterval(this.waktu)
            // this.jawaban.push([3,1,9,1,0,4,7,1,1,4,1])
            // this.jawaban.push([1,9,7,7,8,2,3,4,8])
            // this.jawaban.push([0,0,2,2,1,4,9,0,4,2,2,3])
            // this.jawaban.push([1,0,6,0,6,5,2,8,8,2,5,5,1])
            // this.jawaban.push([4,4,7,5,8,2,6,0,2,4,2,2,1])

            // this.jawaban.push([8,8,0,0,5,3,7,7,1,2,4,6,5,6])
            // this.jawaban.push([2,8,7,2,1,1,0,3,5,1,8,5,6,6])
            // this.jawaban.push([2,0,6,4,1,8,6,7,8,6,9,8,8,2])
            // this.jawaban.push([7,5,8,7,4,7,5,0,8,4,2,3,0,8,3])
            // this.jawaban.push([8,2,0,5,1,5,4,5,3,5])

            // this.jawaban.push([9,0,0,8,1,7,3,2,3,3,6,2,1])
            // this.jawaban.push([6,7,4,2,8,8,9,5,9,4,6,8])
            // this.jawaban.push([4,8,5,7,3,6,7,2,0,8,9,0,8,5])
            // this.jawaban.push([8,7,9,9,4,6,2,1,6,2,8,0,2,5,0])
            // this.jawaban.push([3,7,0,0,9,2,4,8,3,5,3,7,6,6])

            // this.jawaban.push([9,1,6,8,9,0,3,0,2,9,5,2,5,0,2])
            // this.jawaban.push([0,9,4,0,8,0,3,3,1,9,6,3,9,1])
            // this.jawaban.push([7,2,1,4,8,1,9,4,5,1,9,6,5,6])
            // this.jawaban.push([3,8,8,3,0,6,1,3,0,2,9,8,7,0,2])
            // this.jawaban.push([9,6,4,8,7,9,0,0,4,0,7,0,5,6,3])

            // this.jawaban.push([7,9,1,0,3,0,5,8,4,9,5,2,7,7,4])
            // this.jawaban.push([3,6,1,7,0,4,3,8,8,0,3,6,9])
            // this.jawaban.push([8,3,0,0,0,7,4,4,8,4,3,5,8,7,5])
            // this.jawaban.push([3,6,1,3,5,4,6,4,1,5,3,1,2,6])
            // this.jawaban.push([9,0,0,3,7,5,9,1,3,0,5,9,0,2,8,1,0])

            // this.jawaban.push([9,9,5,5,4,9,5,4,4,4,4,4,8])
            // this.jawaban.push([3,0,1,2,3,3,1,8,4,0,6,5,8,0])
            // this.jawaban.push([2,1,1,3,2,3,4,9,1,8,3,7,4,3])
            // this.jawaban.push([6,5,7,2,0,7,2,2,9,2,6,3,1,4])
            // this.jawaban.push([1,1,5,0,5,0,6,3,4,8,7,3,5,1,1,1])

            // this.jawaban.push([1,0,3,4,5,3,6,7,8,1,2,8,8,6,7])
            // this.jawaban.push([0,6,2,9,4,4,7,0,8,2,4,4,4,5,1])
            // this.jawaban.push([5,6,1,8,3,5,8,0,2,2,1,5,8,4,5])
            // this.jawaban.push([5,2,6,8,3,4,2,3,8,0,8,4,6,4])
            // this.jawaban.push([4,5,3,3,6,0,5,3,6,7,6,8,8,1])
            
            // this.jawaban.push([6,1,2,6,6,2,6,4,0,3,2,5,3,8])
            // this.jawaban.push([3,5,9,5,2,1,0,1,5,4,7,5,1,7,4])
            // this.jawaban.push([5,4,7,9,9,7,8,7,9,1,5,8,3,9])
            // this.jawaban.push([8,1,8,2,2,0,0,9,7,6,4,6,1,1])
            // this.jawaban.push([1,7,0,1,6,1,0,8,2,0,3,5,5,9])

            // this.jawaban.push([7,2,3,9,7,3,2,2,2,6,7,3,0,0,4,0])
            // this.jawaban.push([7,4,2,7,1,1,5,3,3,9,2,0,1,9,8,7])
            // this.jawaban.push([5,0,5,0,7,3,5,2,2,8,3,5,0,5,6,5])
            // this.jawaban.push([7,6,7,2,4,2,9,7,9,3,3,6,5,6])
            // this.jawaban.push([1,9,5,1,5,4,2,7,1,7,6,4,8,4,5])

            // this.jawaban.push([9,2,8,6,5,7,3,4,8,5,7,9,6,8,9,9])
            // this.jawaban.push([1,6,6,3,3,0,9,6,0,0,0,5,1,0,0])
            // this.jawaban.push([6,6,6,9,7,7,0,9,3,4,1,0,3,7])
            // this.jawaban.push([7,8,1,4,2,8,0,7,4,9,2,8,6,2,6])
            // this.jawaban.push([8,2,4,5,3,1,1,8,6,9,4,3,8,2,1,5])

//             this.jawaban.push([3,1,9,1,0,4,7,1,1,4,1,8,4,0,9,2,3,4,1,5,2,0])
//             this.jawaban.push([1,9,7,7,8,2,3,4,8,6,0,1,4,1,7,8,9,9,8,4])
//             this.jawaban.push([0,0,2,2,1,4,9,0,4,2,2,3,2,6,3,2,0,7])
//             this.jawaban.push([1,0,6,0,6,5,2,8,8,2,5,5,1,2,6,5,3,8])
//             this.jawaban.push([4,4,7,5,8,2,6,0,2,4,2,2,1,8,3,0])

//             this.jawaban.push([8,8,0,0,5,3,7,7,1,2,4,6,5,6,6,8,5,0,5])
//             this.jawaban.push([2,8,7,2,1,1,0,3,5,1,8,5,6,6,9,9,7,4])
//             this.jawaban.push([2,0,6,4,1,8,6,7,8,6,9,8,8,2,4,6,5,6])
//             this.jawaban.push([7,5,8,7,4,7,5,0,8,4,2,3,0,8,3,6,0])
//             this.jawaban.push([8,2,0,5,1,5,4,5,3,5,4,9,9,5,9,2,8,5,7])

//             this.jawaban.push([9,0,0,8,1,7,3,2,3,3,6,2,1,8,6,9,7,2])
//             this.jawaban.push([6,7,4,2,8,8,9,5,9,4,6,8,2,6,5,9,5])
//             this.jawaban.push([4,8,5,7,3,6,7,2,0,8,9,0,8,5,9,9,1,4,4,7])
//             this.jawaban.push([8,7,9,9,4,6,2,1,6,2,8,0,2,5,0,5,1,7])
//             this.jawaban.push([3,7,2,0,9,2,4,8,3,5,3,7,6,6,3])
// //31 36
//             this.jawaban.push([9,1,6,8,9,0,3,0,2,9,5,2,5,0,2,4,7,8,2])
//             this.jawaban.push([0,9,4,0,8,0,3,3,1,9,6,3,9,1,3,4,3,3])
//             this.jawaban.push([7,2,1,4,8,1,9,4,5,1,9,6,5,6,8,2,2,2])
//             this.jawaban.push([3,8,8,3,0,6,1,3,0,2,9,8,7,0,2,3,0,0,0])
//             this.jawaban.push([9,6,4,8,7,9,0,0,4,0,7,0,5,6,3,5,4])

//             this.jawaban.push([7,9,1,0,3,0,5,8,4,9,5,2,7,7,4,3,9,9])
//             this.jawaban.push([3,6,1,7,0,4,3,8,8,0,3,6,9,6,2,9,5,0])
//             this.jawaban.push([8,3,0,0,0,7,4,4,8,4,1,5,8,7,5,1])
//             this.jawaban.push([3,6,1,3,5,4,6,4,1,5,3,1,2,6,6])
//             this.jawaban.push([9,0,0,3,7,5,9,1,3,0,5,9,0,2,8,1,0,5,6])

//             this.jawaban.push([9,9,5,5,4,9,5,4,4,4,4,4,8,2])
//             this.jawaban.push([3,0,1,2,3,3,1,8,4,0,6,5,8])
//             this.jawaban.push([2,1,1,3,2,3,4,9,1,8,3,7,4,3,6,1,7,0])
//             this.jawaban.push([6,5,7,2,0,7,2,2,9,2,6,3,1,4,0,9,1,7])
//             this.jawaban.push([1,1,5,0,5,0,6,3,4,8,7,3,5,1,1,1,0,4])

//             this.jawaban.push([1,0,3,4,5,3,6,7,8,1,2,8,8,8,7,6,5])
//             this.jawaban.push([0,6,2,9,4,4,7,0,8,2,4,4,4,5,1,1])
//             this.jawaban.push([5,6,1,8,3,5,8,0,2,2,1,5,8,4,5,4])
//             this.jawaban.push([5,2,6,8,3,4,2,3,8,0,8,4,6,4,7,3,2,4])
//             this.jawaban.push([4,5,3,3,6,0,5,3,6,7,6,8,8,1,5,1,5,8])

//             this.jawaban.push([6,1,2,6,0,2,6,4,0,3,2,5,3,8,5,4,5,7])
//             this.jawaban.push([3,5,9,5,2,1,0,1,5,4,7,5,1,7,4,7,2])
//             this.jawaban.push([5,4,7,9,9,7,8,7,9,1,5,8,3,9,4,0,0,6,6,8])
//             this.jawaban.push([8,1,8,2,2,0,0,9,7,6,4,6,1,1,6,8,1])
//             this.jawaban.push([1,7,0,1,6,1,0,8,2,0,3,5,5,9,2,7,7,6,6])

//             this.jawaban.push([7,2,3,9,7,3,2,2,2,6,7,3,0,0,4,0,2,2,8])
//             this.jawaban.push([7,4,2,7,1,1,5,3,3,9,2,0,1,9,8,7,5,6,6])
//             this.jawaban.push([5,0,5,0,7,3,5,2,2,8,3,5,0,5,6,5,4,6,4])
//             this.jawaban.push([7,6,7,2,4,2,9,7,9,3,3,6,5,6,4,4,7,4,1,9])
//             this.jawaban.push([1,9,5,1,5,4,2,7,1,7,6,4,8,4,5,7,7,4,6])

//             this.jawaban.push([9,2,8,6,5,7,3,4,8,5,7,9,6,8,9,9,7,9])
//             this.jawaban.push([1,6,6,3,3,0,9,6,0,0,0,5,1,0,0,1,4,8])
//             this.jawaban.push([6,6,6,9,7,7,0,9,3,4,1,0,3,7,7,5,2,7,6,8])
//             this.jawaban.push([7,8,1,4,2,8,0,7,4,9,2,8,6,2,6,9,4,8,4])
//             this.jawaban.push([8,4,4,5,3,1,1,8,6,9,4,3,8,2,1,5,7,2])

            for (let i = this.kolom-1; i < this.jumKolom; i++) {
                this.jawaban.push([])
                for (let j = this.jawaban[i].length; j < 27; j++) {
                    this.jawaban[i][j]=-1
                }
            }

            for (let i = 0; i < this.jumKolom; i++) {
                for (let j = this.jawaban[i].length; j < 27; j++) {
                    this.jawaban[i][j]=-1
                }
            }

            for (let i = 0; i < this.jumKolom; i++) {
                this.jawabanFinal[i] = []
                this.jawabanFinal[i]["question_id"] = this.dataQuestion[i]['id']
                this.jawabanFinal[i]["answer"] = this.jawaban[i]
                this.jawabanFinal[i] = Object.assign({}, this.jawabanFinal[i])
            }

            let formData = {
                exam_session: this.exam_session,
                section_id: this.section_id,
                data: this.jawabanFinal
            }

            let x = {
                "updating_id": this.section_result_id,
                "test_result_id": this.test_result_id,
                "section_id": this.section_id,
                "exam_session": this.exam_session,
                "num_correct": this.num_correct,
                "start_date": parseInt(this.$cookies.get("start_time")),
                "finish_date": Date.now()
            }

            // console.log(x)
            // console.log(formData)

            axios.post(this.port+'/section_result/update',{
                "updating_id": this.section_result_id,
                "test_result_id": this.test_result_id,
                "section_id": this.section_id,
                "exam_session": this.exam_session,
                "num_correct": this.num_correct,
                "start_date": parseInt(this.$cookies.get("start_time")),
                "finish_date": Date.now()
            })
            .then((response) => {
                axios.post(this.port+'/question_result/createmultiple',formData)
                .then((response) => {
                    axios.post(this.port+'/test_result/calculateresult',{
                        test_id: 5,
                        email: this.email
                    })
                    .then((response) => {
                        this.$cookies.remove('current_section')
                        this.$cookies.remove("start_time")
                        Swal.fire(
                            'Submitted!',
                            'Task Successfully Submitted.',
                            'success'
                        )
                        .then(function(){
                            window.location = '/section'
                        })
                    })
                    // .catch( error => 
                    //     console.log('error: ' + error) 
                    // })
                })
            }).catch( error => { 
                console.log('error: ' + error) 
            });
        }
    },

    created () {
        this.$emit('updateJudul', this.judulHalaman)
    },

    beforeDestroy() {
        // clearInterval(this.waktu)
        // clearInterval(this.countdownTimer)
    },

    mounted(){
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
                    if(id==5)
                        this.namaTes = "TES "+this.abjad[counter]
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
            this.pertanyaanFull = [],
            this.dataQuestion = data,
            data.forEach(d => {
                this.pertanyaanFull.push(d.instruction.split(','))
            }),
            this.pertanyaan = this.pertanyaanFull[this.kolom-1],
            this.jawaban.push([])
        ))

        let datas = this.$cookies.get("data_registrant")
        this.email = datas.email;
        this.exam_session = datas.exam_session;
        let tests = datas.test;
        
        for (let i = 0; i < tests.length; i++) {
            if (tests[i][0]==5)
                this.test_result_id = tests[i][1]
        }

        axios
        .get(this.port+'/kreapelin_data/getbyemail/'+this.email)
        .then(({data}) => (
            this.dataKraepelin = data,
            this.gotData(data)
        ))

        let thi = this
        $('body').keydown(function(event) {
            if ([48,96].includes(event.keyCode)) thi.nextSoal(0)
            // if ([48,96].includes(event.keyCode)) thi.submitJawaban()
            else if ([49,97].includes(event.keyCode)) thi.nextSoal(1)
            else if ([50,98].includes(event.keyCode)) thi.nextSoal(2)
            else if ([51,99].includes(event.keyCode)) thi.nextSoal(3)
            else if ([52,100].includes(event.keyCode)) thi.nextSoal(4)
            else if ([53,101].includes(event.keyCode)) thi.nextSoal(5)
            else if ([54,102].includes(event.keyCode)) thi.nextSoal(6)
            else if ([55,103].includes(event.keyCode)) thi.nextSoal(7)
            else if ([56,104].includes(event.keyCode)) thi.nextSoal(8)
            else if ([57,105].includes(event.keyCode)) thi.nextSoal(9)
            // else if (event.keyCode==39||event.keyCode==68)
            //     thi.submitJawaban()
                // if(thi.kolom>=thi.jumKolom){
                //     for (let i = thi.jawaban[thi.kolom-1].length; i < 27; i++) {
                //         thi.jawaban[thi.kolom-1][i]=-1
                //     }
                //     thi.submitJawaban()
                // }
                // else{
                //     thi.detik = 60
                //     thi.reset()
                // }
            
        });
    }
}
    
</script>

<style>

</style>