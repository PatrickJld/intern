<template>
    <!-- <div class="h-full w-full md:w-9/12 m-auto relative mt-3 text-black">
        <div class="flex justify-between mb-7">
            <h1 class="text-white text-3xl text-center font-bold mt-2">{{namaSection}}</h1>
            <div class="flex justify-center">
                <img src="../assets/logo.png" alt="" class="w-20">
            </div>
        </div> -->
    <div class="h-full w-full md:w-9/12 m-auto relative mt-0 text-black">
        <div class="flex justify-between mb-5">
            <h1 class="text-white text-3xl text-center font-bold mt-5">{{namaSection}}</h1>
            <div class="text-center bg-background-400 rounded-full flex justify-center py-2 px-3 mt-1">
                <img src="../assets/logo.png" alt="" class="w-20">
            </div>
        </div>

        <div v-show="state>0 && state<3" class="mb-2">
            <div class="mt-5 font-semibold md:text-lg flex gap-1 mx-1">
                <div class="w-1/5 ring-2 ring-inset ring-black p-2 rounded-md" v-for="p in pedoman" :key="p">
                    <div class="flex justify-between" v-for="i in p" :key="i"><span>{{i[0]}}</span><span>{{i[1]}}</span></div>
                </div>
            </div>
        </div>
        <div class="w-11/12 mx-5 md:w-full md:mx-0">
            <div v-show="state==1">
                <div class="rounded-lg bg-foreground-4-100 text-white ring-1 ring-inset ring-stroke-100
                            p-5 mt-5 mb-2 font-semibold md:text-lg">
                    Terdapat 5 kotak di bagian atas, yaitu Kotak Rokok, Penerbangan, Juru Bayar, Nomor Telepon, dan Buku Gudang.
                    disetiap kotak sudah terdapat nama anggota beserta kodenya. 
                    Di setiap nomor soal sudah terdapat namanya apa. 
                    Tugas Anda adalah mencari kodenya berapa. 
                </div>
                <div class="rounded-lg bg-foreground-4-100 text-white ring-1 ring-inset ring-stroke-100
                            p-5 mb-2 font-semibold md:text-lg text-center">
                            Kita ke contoh no. 1. di situ ada sabun, kodenya berapa? kodenya 2B. Cari tombol jawaban yang berisikan 2B, lalu tekan.
                </div>
                <div class="flex justify-center">
                    <!-- <img src="https://media1.giphy.com/media/LXHJRRjnviw7e/giphy.gif" alt=""> -->
                    <img src="../assets/gif_hafalan.gif" alt="" class="w-3/4 md:w-1/2 xl:w-1/3">
                </div>
                <div class="flex justify-end">
                    <button class="bg-foreground-4-100 hover:bg-foreground-4-200 text-white duration-200 rounded-full px-5 py-2 font-bold text-xl" @click.prevent="mulai()">
                        <span id="nextBtn">Mulai</span>
                        <i class="fa fa-chevron-right ml-3"></i>
                    </button>
                </div>
            </div>

            <div v-show="state==3">
                <div class="rounded-lg bg-foreground-4-100 text-white ring-1 ring-inset ring-stroke-100
                            p-5 mt-5 mb-2 font-semibold md:text-lg mt-20">
                            Cara mengerjakannya sama seperti tadi, hanya kotak yang di atas sekarang dihilangkan. Silahkan dikerjakan seingatnya saja.
                </div>
                <div class="flex justify-center mb-3">
                    <!-- <img src="https://media1.giphy.com/media/LXHJRRjnviw7e/giphy.gif" alt=""> -->
                    <img src="../assets/gif_hafalan_2.gif" alt="" class="w-3/4 md:w-1/2 xl:w-1/3">
                </div>
                <div class="flex justify-end">
                    <button class="bg-foreground-4-100 hover:bg-foreground-4-200 text-white duration-200 rounded-full px-5 py-2 font-bold text-xl" @click.prevent="mulai2()">
                        <span id="nextBtn">Mulai</span>
                        <i class="fa fa-chevron-right ml-3"></i>
                    </button>
                </div>
            </div>
                
            <div v-show="state==2 || state==4">
                <div class="flex justify-between items-center text-lg font-bold mb-5 relative">
                    <p v-if="menit!=-99">Sisa Waktu : {{('00'+menit).slice(-2)}}:{{('00'+detik).slice(-2)}}</p>
                    <p v-else></p>
                    <button id="btnDaftarSoal" class="bg-foreground-4-100 hover:bg-foreground-4-200 text-white duration-200 rounded-full px-5 py-1 font-bold">
                        <i class="fa fa-th-large mr-3" id="btnDaftarSoal2"></i>
                        <span id="btnDaftarSoal3">Daftar Soal</span>
                    </button>
                </div>
                
                <div v-show="tampilDaftarSoal" class="relative z-10" id="daftarSoal">
                    <div class="absolute bg-foreground-4-100 h-auto w-3/4 max-h-96 pl-3 py-2 overflow-auto no-scrollbar rounded-lg right-0 -top-14
                                md:w-1/2 xl:w-1/4">
                        <div class="font-bold text-white text-lg mb-2">
                            <i class="fa fa-th-large mr-3"></i>
                            <span>Daftar Soal</span>
                        </div>
                        <div v-for="i in jumSoal" :key="i" class="inline-block">
                            <button v-if="i == noSoal" id="btnNoSoal" class="bg-yellow-200 rounded-lg w-10 h-10 mr-3 mb-3 font-bold" @click.prevent="lompatSoal(i)">
                                {{i}}
                            </button>
                            <button v-else-if="jawaban[i-1]!=null" id="btnNoSoal" class="bg-foreground-4-200 ring-2 ring-inset ring-gray-500 text-white hover:bg-foreground-4-200 duration-200 rounded-lg w-10 h-10 mr-3 mb-3 font-bold" @click.prevent="lompatSoal(i)">
                                {{i}}
                            </button>
                            <button v-else id="btnNoSoal" class="bg-background-400 hover:bg-background-300 duration-200 rounded-lg w-10 h-10 mr-3 mb-3 font-bold" @click.prevent="lompatSoal(i)">
                                {{i}}
                            </button>
                        </div>
                    </div>
                </div>

                <div class="relative w-full mb-2">
                    <div class="h-8 bg-foreground-4-100 ring-1 ring-inset ring-black rounded-lg overflow-x-hidden">
                        <div class="h-8 bg-primary-300 ring-1 ring-inset ring-black" id="progress" style="width: 0px;"></div>
                    </div>
                    <div class="w-full text-center absolute top-0">
                        <p class="text-center py-1 text-white font-bold">Pertanyaan {{noSoal}}/{{jumSoal}}</p> 
                    </div>
                </div>
                
                <div id="soal" class="mb-10 h-full font-semibold" v-if="state==2 && pertanyaan1!=null && pilihanJawaban!=null && pilihanJawaban.length>0">
                    <TextQuestion :question="pertanyaan1[noSoal-1]['instruction']" :jenis="'hafalan'" />
                    <div class="flex gap-3 w-full">
                        <div v-for="(i,idx) in this.pilihanJawaban" :key="idx" class="w-full">
                            <AnswerButton :jenis="'hafalan'" :jawaban = jawaban :noSoal = noSoal :label="this.pilihanJawaban[idx]" @setChangeds="setChanged" />
                        </div>
                    </div>
                </div>

                <div id="soal" class="mb-10 h-full font-semibold" v-if="state==4 && pertanyaan2!=null && pilihanJawaban!=null && pilihanJawaban.length>0">
                    <TextQuestion :question="pertanyaan2[noSoal-1]['instruction']" :jenis="'hafalan'" />
                    <div class="flex gap-3 w-full mb-2">
                        <div v-for="idx in this.pilihanJawaban.length/2" :key="idx" class="w-full">
                            <AnswerButton :jenis="'hafalan'" :jawaban = jawaban :noSoal = noSoal :label="this.pilihanJawaban[idx-1]" @setChangeds="setChanged" />
                        </div>
                    </div>
                    <div class="flex gap-3 w-full">
                        <div v-for="idx in this.pilihanJawaban.length/2" :key="idx" class="w-full">
                            <AnswerButton :jenis="'hafalan'" :jawaban = jawaban :noSoal = noSoal :label="this.pilihanJawaban[idx-1+(this.pilihanJawaban.length/2)]" @setChangeds="setChanged" />
                        </div>
                    </div>
                </div>

                <div class="flex justify-between">
                    <button class="bg-foreground-4-100 hover:bg-foreground-4-200 text-white duration-200 rounded-full px-5 py-1 font-bold text-xl" @click.prevent="prevSoal">
                        <i class="fa fa-chevron-left mr-3"></i>
                        <span>Sebelumnya</span>
                    </button>
                    <button class="bg-foreground-4-100 hover:bg-foreground-4-200 text-white duration-200 rounded-full px-5 py-1 font-bold text-xl" @click.prevent="nextSoal">
                        <span id="nextBtn">Selanjutnya</span>
                        <i class="fa fa-chevron-right ml-3"></i>
                    </button>
                </div>
            </div>
        </div>

        <!-- Transparent Overlay -->
        <div id="bg" v-show="state==0" class="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-foreground-4-100 bg-opacity-60 z-40"></div>

        <!-- Countdown -->
        <div id="klikAnywhere" v-show="state==0" class="fixed inset-x-0 w-full h-full flex justify-center items-center top-0 text-white text-center text-5xl font-bold z-50"
            @click.prevent="this.state = 1">
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
        <div class="w-2 h-10"></div>
    </div>
</template>
<script>
import axios from 'axios'
import TextQuestion from '../components/views/textQuestion.vue'
import AnswerButton from '../components/answerButton.vue'
import _Socket from '../utilities/_Socket'

export default {
    components: {
        axios, TextQuestion, AnswerButton
    },
    data () {
        return {
            namaSection: 'Tes C',
            jenis: '',
            noSoal: 1,
            jumSoal: 0,
            jumChoice: 0,
            durasi: 0,
            menit: 0,
            detik: 0,
            waktu: null,
            jawaban: [],
            jawabanFinal: [],
            pertanyaan1: null,
            pertanyaan2: null,
            pilihanJawaban: null,
            section_id: null,
            test_id: null,
            email: null,
            exam_session: null,
            test_result_id: null,
            port: import.meta.env.VITE_BACKEND_URL,
            somethingWrong: false,
            state: 0,
            tampilDaftarSoal: false,
            pedoman: [],
            changed: false,
            abjad: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
            alias: [1,2,21,5,8,6,10,7,9,11,12,15,13,14,18,16,17,3,4,20,19],
        }
    },
    methods: {
        async getCurrentTest(exam_session){
            exam_session = await axios.get(this.port+'/exam_session/' + exam_session);
            return exam_session.data.current_test;
        },
        setChanged(state){
            this.changed = state
        },
        mulai(){
            if(!this.section_id || !this.exam_session) this.somethingWrong = true;
            else{
                this.jumSoal = this.pertanyaan1.length
                this.state = 2
                this.gantiPilihanJawaban()
                this.progress(true)

                // Create Section Ongoing to indicate Ongoing Section
                axios.post(this.port+'/section_ongoing/create',{
                    "section_id": this.section_id,
                    "exam_session_id": this.exam_session,
                    "start_status": 1,
                    "start_time": Date.now(),
                    "duration": this.durasi,
                })
                .then((response) => {
                    
                }).catch( error => { 
                    console.log('error: ' + error) 
                });
            }
        },
        async mulai2(){
            if(!this.section_id || !this.exam_session) this.somethingWrong = true;
            else{
                this.jawaban = []
                this.jumSoal = this.pertanyaan2.length
                this.state = 4
                this.noSoal = 1
                this.gantiPilihanJawaban()
                document.getElementById("progress").style.width = ((1/this.jumSoal)*100)/5 +'%'
                this.progress(true)

                axios.post(this.port+'/section_ongoing/create',{
                    "section_id": parseInt(this.section_id)+1,
                    "exam_session_id": this.exam_session,
                    "start_status": 1,
                    "start_time": Date.now(),
                    "duration": this.durasi,
                })
                .then((response) => {
                    
                }).catch( error => { 
                    console.log('error: ' + error) 
                });
            }
        },
        nextSoal(){
            // console.log(this.changed)
            // console.log(this.jawaban)
            if (this.noSoal<this.jumSoal){
                this.noSoal++
                if(this.noSoal==this.jumSoal) $('#nextBtn').text('Submit')

                if(this.state > 3 && this.changed) this.uploadTempAnswers();

                this.progress(true)
            }else{
                var isi = 0
                this.jawaban.forEach(e => { if (e != null) isi++; });
                // isi = this.jumSoal;
                if(isi!=this.jumSoal){
                    let pesan = ""
                    if (this.state==2){
                        pesan = "Tetap Lanjut"
                    }else if (this.state==4){
                        pesan = "Tetap Submit"
                    }
                    Swal.fire({
                        title: 'Ada Pertanyaan yang Belum Dijawab!',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: pesan
                    }).then((result) => {
                        if (result.isConfirmed) {
                            if (this.state==2){
                                this.state = 3
                            }else if (this.state==4){
                                clearInterval(this.waktu)
                                this.submitJawaban()
                            }
                        }
                    });
                }else{
                    if (this.state==2){
                        clearInterval(this.waktu)
                        this.state = 3
                    }else if (this.state==4){
                        clearInterval(this.waktu)
                        this.submitJawaban()
                    }
                }
                
            }
            this.gantiPilihanJawaban()
        },
        prevSoal(){
            if (this.noSoal>1){
                this.noSoal--
                if(this.noSoal<this.jumSoal) $('#nextBtn').text('Selanjutnya')

                this.progress(false)
            }

            if(this.state > 3 && this.changed) this.uploadTempAnswers();

            this.gantiPilihanJawaban()
        },
        lompatSoal(idx){
            this.noSoal = idx
            const elements = document.getElementById("progress")
            var width = ((this.noSoal/this.jumSoal)*100)
            elements.style.width = width +'%'
            
            if (this.noSoal<this.jumSoal) $('#nextBtn').text('Selanjutnya')
            else $('#nextBtn').text('Submit')

            if(this.state > 3 && this.changed) this.uploadTempAnswers();

            this.gantiPilihanJawaban()
        },
        gantiPilihanJawaban(){
            this.pilihanJawaban = []
            if(this.state==2){
                this.pilihanJawaban = [
                    this.pertanyaan1[this.noSoal-1]['option_a'],
                    this.pertanyaan1[this.noSoal-1]['option_b'],
                    this.pertanyaan1[this.noSoal-1]['option_c']
                ]
            } else if(this.state==4){
                let pilihans = this.pertanyaan2[this.noSoal-1]['option_a'].split(';')
                let res = []
                pilihans.forEach(pil => {
                    res.push(pil)
                });
                this.pilihanJawaban = res
            }
            this.jumChoice = this.pilihanJawaban.length
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
        submitJawaban(){
            $('#spinner-modal').fadeIn("slow");
            for (let i = 0; i < this.jumSoal; i++) {
                this.jawabanFinal[i] = []
                this.jawabanFinal[i]["question_id"] = this.pertanyaan2[i]['id']
                
                this.jawabanFinal[i]["answer"] = this.jawaban[i] != undefined ? this.jawaban[i] : '';

                this.jawabanFinal[i] = Object.assign({}, this.jawabanFinal[i]);
            }

            let formData = {
                exam_session: this.exam_session,
                section_id: this.section_id,
                data: this.jawabanFinal
            }

            axios.post(this.port+'/section_result/create',{
                "test_result_id": this.test_result_id,
                "section_id": this.section_id,
                "exam_session": this.exam_session,
                "start_date": parseInt(this.$cookies.get("start_time")),
                "finish_date": Date.now()
            })
            .then((response) => {
                axios.post(this.port+'/question_result/createmultiple',formData)
                .then((response) => {
                    axios.post(this.port+'/test_result/calculateresult',{
                        test_id: this.test_id,
                        email: this.email
                    })
                    .then((response) => {
                        axios.post(this.port+'/section_ongoing/stopSection',{
                            section_id: this.section_id+1,
                            exam_session: this.exam_session
                        })
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
                        // .catch( error => 
                        //     console.log('error: ' + error) 
                        // })
                    })
                })
            }).catch( error => { 
                console.log('error: ' + error) 
            });
        },
        chooseWithKeyboard(pilihan){
            let komponen = null
            if(this.pertanyaan[this.noSoal-1]['option_type']==2){
                komponen = this.$refs.imageAnswer
            }else if(this.pertanyaan[this.noSoal-1]['option_type']==1 && this.pertanyaan[this.noSoal-1]['option_a']!='-'){
                komponen = this.$refs.mChoiceAnswer
            }
            
            if(komponen){
                if(pilihan=='a') komponen.keyChoose(pilihan)
                else if(pilihan=='b'&&this.jumChoice>=2) komponen.keyChoose(pilihan)
                else if(pilihan=='c'&&this.jumChoice>=3) komponen.keyChoose(pilihan)
                else if(pilihan=='d'&&this.jumChoice>=4) komponen.keyChoose(pilihan)
                else if(pilihan=='e'&&this.jumChoice==5) komponen.keyChoose(pilihan)
            }
        },
        splitQuestion(questionList, state){
            let q1 = []
            let q2 = []
            questionList.forEach(question => {
                if(question.option_num==3)
                    q1.push(question)
                else
                    q2.push(question)
            });

            if(state == 1)
                this.pertanyaan1 = q1
            else
                this.pertanyaan2 = q2

            // console.log("Pertanyaan 1")
            // console.log(this.pertanyaan1)
            // console.log("Pertanyaan 2")
            // console.log(this.pertanyaan2)
        },
        uploadTempAnswers(){
            this.jawabanTemp = "";
            for (let i = 0; i < this.jumSoal; i++) {
                this.jawabanTemp += this.jawaban[i]!=null ? this.jawaban[i] : "";
                this.jawabanTemp += ";";
            }

            axios.post(this.port+'/section_ongoing/updateTempAnswers',{
                "section_id": this.section_id+1,
                "exam_session": this.exam_session,
                "temp_answers": this.jawabanTemp,
            })
            .then((response) => {
                this.changed = false;
            }).catch( error => { 
                console.log('error: ' + error) 
            });
        },
        getTempAnswers(){
            axios.get(this.port+'/section_ongoing/getbysection/'+(this.section_id+1)+'?exam_session_id='+this.exam_session)
            .then((data) => {
                if(data && data.data){
                    data = data.data.filter((obj) => {
                        return obj.start_status == 1;
                    })[0];
                    
                    let temp = data.temp_answers.split(";");
                    let temp_answers = [];
                    for(let i = 0; i < temp.length; i++){
                        temp_answers[i] = temp[i] ;
                    }

                    this.jawaban = temp_answers
                }
            }).catch( error => { 
                console.log('error: ' + error) 
            });
        }
    },

    created () {
        
    },

    beforeDestroy() {
        clearInterval(this.waktu)
    },

    async mounted(){
        this.pedoman = [
            [
                ["Escort","703"],
                ["Kansas","618"],
                ["Kresta","610"],
                ["Menara","721"],
                ["Pompa","624"]
            ],
            [
                ["Barat","MG"],
                ["Pusat","AJ"],
                ["Selatan","NX"],
                ["Timur","VK"],
                ["Utara","LP"]
            ],
            [
                ["Buku","9H"],
                ["Kain","6D"],
                ["Listrik","7C"],
                ["Sabun","2B"],
                ["Topi","3F"]
            ],
            [
                ["Adi","23"],
                ["Gatot","13"],
                ["Yani","17"],
                ["Surya","28"],
                ["Tan","19"]
            ],
            [
                ["Kawat","Q40"],
                ["Kunci","T54"],
                ["Paku","R42"],
                ["Pipa","E57"],
                ["Cat","Y36"]
            ]
        ]

        this.section_id = this.$cookies.get('current_section').id;
        let tes = await this.getCurrentTest(this.$cookies.get('data_registrant').exam_session)
        let nama_tes = ""
        
        let tes2 = this.$cookies.get('data_registrant').test
        let datas = this.$cookies.get("data_registrant");
        this.email = datas.email;
        this.exam_session = datas.exam_session;
        this.test_id = await this.getCurrentTest(this.exam_session);
        let test_list = []
        for (let i = 0; i < tes2.length; i++) {
            test_list.push(tes2[i][0])
        }

        let counter = 0
        for (let i = 0; i < this.alias.length; i++) {
            const id = this.alias[i];
            for (let j = 0; j < test_list.length; j++) {
                const tempTest = test_list[j];
                if(tempTest==id){
                    if(id==21)
                        this.namaSection = "TES "+this.abjad[counter]
                    else{
                        counter++
                    }
                    break;
                }
            }
        }
        
        axios
        .get(this.port+'/test/'+tes)
        .then(({data}) => {
            nama_tes = data.name.split(" ")
            nama_tes.splice(0,1)
            this.jenis = nama_tes.join(" ")
        })

        axios
               .get(this.port+'/question/all?section_id='+this.section_id)
        .then(({data}) => (
            this.splitQuestion(data,1),
            this.menit = 3,
            this.durasi = this.menit,
            this.jawaban = []
        ))
        
        axios
        .get(this.port+'/question/all?section_id='+(parseInt(this.section_id)+1))
        .then(({data}) => (
            this.splitQuestion(data,2),
            this.menit = 3,
            this.durasi = this.menit,
            this.jawaban = []
        ))

        axios
        .get(this.port+'/section/'+this.section_id)
        .then(({data}) => {
            let datas = this.$cookies.get("data_registrant")
            this.test_id = data.test_id
            let tests = datas.test;
            for (let i = 0; i < tests.length; i++) {
                if (tests[i][0]==this.test_id)
                    this.test_result_id = tests[i][1]
            }
            this.email = datas.email;
            this.exam_session = datas.exam_session;

            // Find Current State is First Section or Second
            axios
            .get(this.port+'/section_ongoing/getbytest/'+tes+'?exam_session_id='+this.exam_session)
            .then(({data}) => {
                if(data && data.length > 0){
                    if(data[0].start_status == 2 && !data[1]){
                        this.state = 3
                    }
                }
            })
        })



        // Build socket
        // const access_token = localStorage.getItem('LS_ACCESS_KEY_VAR').split(' ')[1]
        // const user_key = localStorage.getItem('LS_USER_KEY_VAR')
        // console.log(access_token);
        // console.log(user_key)
        _Socket.connect();
        _Socket.on("test.tick", (data) => {
            // console.log("socket", socket)
            // console.log(data);
            this.isStarted = true
            if(data.section_id == this.section_id && this.state == 0){
                this.jumSoal = this.pertanyaan1.length
                this.state = 2
                this.gantiPilihanJawaban()
                this.progress(true)
            }
            else if(data.section_id == this.section_id+1 && this.state == 0){
                this.jumSoal = this.pertanyaan2.length
                this.state = 4
                this.getTempAnswers();
                this.gantiPilihanJawaban()
                document.getElementById("progress").style.width = ((1/this.jumSoal)*100)/5 +'%'
                this.progress(true)
            }

            this.duarsi = data.total_duration;
            var minutes = Math.floor(data.countdown / 60);
            var seconds = data.countdown - minutes * 60;

            this.menit = (new Array(2+1).join('0')+minutes).slice(-2);
            this.detik = (new Array(2+1).join('0')+seconds).slice(-2);
            if(data.countdown <= 0){
                if(this.state == 2){
                    this.state = 3
                }else{
                    Swal.fire({
                        title: 'Waktu Habis...',
                        icon: 'warning',
                        confirmButtonColor: '#3085d6',
                        confirmButtonText: 'Kembali ke Dashboard',
                        allowOutsideClick: false,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.submitJawaban()
                        }
                    });
                }
            }
        });


        let thi = this
        $('body').keydown(function(event) {
            if (event.keyCode==37)
                thi.prevSoal()
            else if (event.keyCode==39)
                thi.nextSoal()
            // else if(event.keyCode==65) thi.chooseWithKeyboard('a')
            // else if(event.keyCode==66) thi.chooseWithKeyboard('b')
            // else if(event.keyCode==67) thi.chooseWithKeyboard('c')
            // else if(event.keyCode==68) thi.chooseWithKeyboard('d')
            // else if(event.keyCode==69) thi.chooseWithKeyboard('e')
            
            thi.tampilDaftarSoal = false
        });
        
        $('body').click(function(e) {
            var target = $(e.target)
            if(!target.is('#btnNoSoal') && !target.is('#btnDaftarSoal') && !target.is('#btnDaftarSoal2') && !target.is('#btnDaftarSoal3') && !target.is('#daftarSoal')) {
                thi.tampilDaftarSoal = false
            }else{
                thi.tampilDaftarSoal = true
            }
        });
    }
}
    
</script>

<style>

</style>