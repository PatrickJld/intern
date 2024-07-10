<template>
    <!-- <div class="h-full w-9/12 m-auto relative mt-3 overflow-hidden">
        <div class="flex justify-between mb-7">
            <h1 class="text-white text-3xl text-center font-bold mt-2">{{namaTes}}</h1>
            <div class="flex justify-center">
                <img src="../assets/logo.png" alt="" class="w-20">
            </div>
        </div> -->
    <div class="h-full w-9/12 m-auto relative mt-0 text-black overflow-hidden">
        <div class="flex justify-between mb-5">
            <h1 class="text-white text-3xl text-center font-bold mt-5">{{namaTes}}</h1>
            <div class="text-center bg-background-400 rounded-full flex justify-center py-2 px-3 mt-1">
                <img src="../assets/logo.png" alt="" class="w-20">
            </div>
        </div>

        <div v-show="isStarted">
            <div class="flex justify-between items-center text-lg font-bold mb-5 relative">
                <p>Sisa Waktu : {{('00'+menit).slice(-2)}}:{{('00'+detik).slice(-2)}}</p>
                <button id="btnDaftarSoal" class="bg-foreground-4-100 hover:bg-foreground-4-200 text-white duration-200 rounded-full px-5 py-1 font-bold">
                    <i class="fa fa-th-large mr-3" id="btnDaftarSoal2"></i>
                    <span id="btnDaftarSoal3">Daftar Soal</span>
                </button>
            </div>

            <div v-show="tampilDaftarSoal" class="relative z-10" id="daftarSoal">
                <div class="absolute bg-foreground-4-100 h-auto w-3/4 max-h-96 pl-3 py-2 overflow-auto no-scrollbar rounded-lg right-0 -top-14
                            md:w-1/2 xl:w-1/4">
                    <div class="font-bold text-lg mb-2 text-white">
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
                <div class="h-8 bg-foreground-4-100 ring-1 ring-inset ring-black rounded-xl overflow-x-hidden">
                    <div class="h-8 bg-foreground-3-300 ring-1 ring-inset ring-black" id="progress" style="width: 0px;"></div>
                </div>    
                <div class="w-full text-center absolute top-0">
                    <p class="text-center py-1 text-white font-bold">Pertanyaan {{noSoal}}/{{jumSoal}}</p> 
                </div>
            </div>

            <div class="rounded-lg bg-foreground-4-100 ring-1 ring-inset ring-stroke-100
                        p-3 my-5 flex justify-center items-center text-lg text-white font-bold md:text-xl">
                Klik lah tanda O dan pilihlah pernyataan mana yang baik. Klik lah tanda X dan pilihlah pernyataan yang jelek. Jadi nanti di tiap nomer akan ada 2 jawaban, yaitu satu lingkaran dan satu silang.
            </div>

            <div id="soal" class="" v-if="pertanyaan!=null">
            <!-- <div id="soal" class=""> -->
                <!-- <TextQuestion :question="pertanyaan[noSoal-1]['instruction']" /> -->
                <!-- <TextQuestion :question="this.pertanyaanTeks" :cerita="this.cerita" :jenis="'ekspresi'"/> -->
                <div class="w-full text-center mt-5 py-2">
                    <div class="inline-block w-full">
                        <div class="w-full mb-2" v-if="this.aksi=='x'">
                            <button class="py-2 px-10 bg-foreground-4-100 text-white rounded-lg mr-3 font-bold text-xl" @click.prevent="this.aksi='x'">X</button>
                            <button class="py-2 px-10 bg-background-200 ring-2 ring-inset ring-stroke-100 rounded-lg mr-3 font-bold text-xl" @click.prevent="this.aksi='o'">O</button>
                        </div>
                        <div class="w-full mb-2" v-else>
                            <button class="py-2 px-10 bg-background-200 ring-2 ring-inset ring-stroke-100 rounded-lg mr-3 font-bold text-xl" @click.prevent="this.aksi='x'">X</button>
                            <button class="py-2 px-10 bg-foreground-4-100 text-white rounded-lg mr-3 font-bold text-xl" @click.prevent="this.aksi='o'">O</button>
                        </div>
                    </div>
                </div>
                <div class="w-full mt-3">
                    <div class="w-full md:flex gap-3">
                        <AnswerButton :jenis="'ekspresi'" :jawaban = jawaban :noSoal = noSoal :label="'A. '+this.pertanyaan[noSoal-1]['option_a']" :aksi= aksi @setChangeds="setChanged"/>
                        <AnswerButton :jenis="'ekspresi'" :jawaban = jawaban :noSoal = noSoal :label="'B. '+this.pertanyaan[noSoal-1]['option_b']" :aksi= aksi @setChangeds="setChanged"/>
                        <AnswerButton :jenis="'ekspresi'" :jawaban = jawaban :noSoal = noSoal :label="'C. '+this.pertanyaan[noSoal-1]['option_c']" :aksi= aksi @setChangeds="setChanged"/>
                    </div>
                </div>

                <div class="flex justify-between mt-2 mb-5">
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
import TextQuestion from '../components/views/textQuestion.vue'
import AnswerButton from '../components/answerButton.vue'
import _Socket from '../utilities/_Socket'


export default {
    components: {
        axios, TextQuestion, AnswerButton
    },
    data () {
        return {
            namaTes: 'Tes J',
            judulHalaman: '',
            noSoal: 1,
            jumSoal: 19,
            durasi: 0,
            menit: 1,
            detik: 0,
            waktu: null,
            aksi: 'x',
            jawaban: [],
            jawabanFinal: [],
            pertanyaan: null,
            pilihanJawaban: null,
            section_id: null,
            test_id: null,
            email: null,
            exam_session: null,
            test_result_id: null,
            port: import.meta.env.VITE_BACKEND_URL,
            isStarted: false,
            somethingWrong: false,
            tampilDaftarSoal: false,
            changed: false,
            pertanyaanTeks: "",
            cerita: "",
            abjad: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
            alias: [1,2,21,5,8,6,10,7,9,11,12,15,13,14,18,16,17,3,4,20,19],
        }
    },
    methods: {
        setChanged(state){
            this.changed = state
        },
        mulai(){if(!this.section_id || !this.exam_session)this.somethingWrong = true;
            else{
                this.isStarted = true
                
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
        nextSoal(){
            console.log(this.jawaban)
            if (this.noSoal<this.jumSoal){
                this.noSoal++
                if(this.noSoal==this.jumSoal) $('#nextBtn').text('Submit')
                
                if(this.changed) this.uploadTempAnswers();

                this.gantiPertanyaan();
                this.progress(true);
            }else{
                var isi = 0
                this.jawaban.forEach(e => { if (e != null) isi++; });
                // isi = this.jumSoal;
                if(isi!=19){
                    Swal.fire({
                        title: 'Ada Pertanyaan yang Belum Dijawab!',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Tetap Submit'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            clearInterval(this.waktu)
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
                            clearInterval(this.waktu)
                            this.submitJawaban()
                        }
                    });
                }
            }
        },
        prevSoal(){
            if (this.noSoal>1){
                this.noSoal--
                if(this.noSoal<this.jumSoal) $('#nextBtn').text('Selanjutnya')
                
                this.progress(false)
            }

            if(this.changed) this.uploadTempAnswers();

            this.gantiPertanyaan();
        },
        lompatSoal(idx){
            this.noSoal = idx
            const elements = document.getElementById("progress")
            var width = ((this.noSoal/this.jumSoal)*100)
            elements.style.width = width +'%'
            
            if (this.noSoal<this.jumSoal) $('#nextBtn').text('Selanjutnya')
            else $('#nextBtn').text('Submit')

            if(this.changed) this.uploadTempAnswers();

            this.gantiPertanyaan();
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
                this.jawabanFinal[i]["question_id"] = this.pertanyaan[i]['id']
                if(this.jawaban[i]==undefined) this.jawabanFinal[i]["answer"] = ''
                else{
                    var temp = this.jawaban[i].split('|')
                    var salah = temp[0]==null ? '' : temp[0].substring(0,1)
                    var benar = temp[1]==null ? '' : temp[1].substring(0,1)
                    this.jawabanFinal[i]["answer"] = benar+"&"+salah
                    this.jawabanFinal[i]["answer"] = this.jawabanFinal[i]["answer"].toLowerCase()
                }
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
                            section_id: this.section_id,
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
                    // .catch( error => 
                    //     console.log('error: ' + error) 
                    // })
                })
            }).catch( error => { 
                console.log('error: ' + error) 
            });
        },
        uploadTempAnswers(){
            this.jawabanTemp = "";
            for (let i = 0; i < this.jumSoal; i++) {
                this.jawabanTemp += this.jawaban[i]!=null ? this.jawaban[i] : "";
                this.jawabanTemp += ";";
            }

            axios.post(this.port+'/section_ongoing/updateTempAnswers',{
                "section_id": this.section_id,
                "exam_session": this.exam_session,
                "temp_answers": this.jawabanTemp,
            })
            .then((response) => {
                this.changed = false;
            }).catch( error => { 
                console.log('error: ' + error) 
            });
        },
        gantiPertanyaan(){
            let tempSoal = this.pertanyaan[this.noSoal-1]['instruction']
            let temp = tempSoal.split(";")

            if(temp.length>1){
                this.cerita = temp[0]
                this.pertanyaanTeks = temp[1]
            }else{ 
                this.cerita = ""
                this.pertanyaanTeks = temp[0]
            }
        },
        getTempAnswers(){
            axios.get(this.port+'/section_ongoing/getbysection/'+this.section_id+'?exam_session_id='+this.exam_session)
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
        this.$emit('updateJudul', this.judulHalaman)
    },

    beforeDestroy() {
        // clearInterval(this.waktu)
        // clearInterval(this.countdownTimer)
    },

    mounted(){
        this.section_id = this.$cookies.get('current_section').id;
        // let tes = this.$cookies.get('current_test').id;
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
                    if(id==7)
                        this.namaTes = "TES "+this.abjad[counter]
                    else{
                        counter++
                    }
                    break;
                }
            }
        }

        let datas = this.$cookies.get("data_registrant");
        this.email = datas.email;
        this.exam_session = datas.exam_session;

        axios
        .get(this.port+'/question/all?section_id='+this.section_id)
        .then(({data}) => (
            this.pertanyaan = data,
            this.menit = this.pertanyaan[0]["section"]["duration"],
            this.durasi = this.menit,
            this.jawaban = Array(19),
            this.progress(true)
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
        })

        this.getTempAnswers();

        // Build socket
        // const access_token = localStorage.getItem('LS_ACCESS_KEY_VAR').split(' ')[1]
        // const user_key = localStorage.getItem('LS_USER_KEY_VAR')
        // console.log(access_token);
        // console.log(user_key)

        _Socket.connect();
        _Socket.on("test.tick", (data) => {
            if(data.section_id == this.section_id){
                this.isStarted = true
                this.duarsi = data.total_duration;
                var minutes = Math.floor(data.countdown / 60);
                var seconds = data.countdown - minutes * 60;

                this.menit = (new Array(2+1).join('0')+minutes).slice(-2);
                this.detik = (new Array(2+1).join('0')+seconds).slice(-2);
                if(data.countdown <= 0){
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
            if (event.keyCode==37||event.keyCode==65)
                thi.prevSoal()
            else if (event.keyCode==39||event.keyCode==68)
                thi.nextSoal()
                
            // if (!$('#daftarSoal').hasClass('hidden')) $('#daftarSoal').addClass("hidden")
            thi.tampilDaftarSoal = false
        });
        
        $('body').click(function(e) {
            var target = $(e.target)
            if(!target.is('#btnNoSoal') && !target.is('#btnDaftarSoal') && !target.is('#btnDaftarSoal2') && !target.is('#btnDaftarSoal3') && !target.is('#daftarSoal')) {
                // if (!$('#daftarSoal').hasClass('hidden')) $('#daftarSoal').addClass("hidden")
                thi.tampilDaftarSoal = false
            }else{
                // if ($('#daftarSoal').hasClass('hidden')) $('#daftarSoal').removeClass("hidden")
                thi.tampilDaftarSoal = true
            }
        });
    }
}
    
</script>

<style>

</style>