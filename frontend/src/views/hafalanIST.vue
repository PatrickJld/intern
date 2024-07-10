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
        
        <div v-show="state==1">
            <div class="text-lg font-bold flex justify-center">
                <p v-if="menit!=-99">Sisa Waktu : {{('00'+menit).slice(-2)}}:{{('00'+detik).slice(-2)}}</p>
            </div>
            <div class="rounded-lg bg-foreground-4-100 text-white ring-1 ring-inset ring-stroke-100
                        p-5 my-2 font-semibold md:text-lg">
                Disediakan waktu 3 menit untuk menghafalkan kata-kata.
                Pada persoalan berikutnya, terdapat sejumlah pertanyaan mengenai kata-kata yang anda hafalkan.
                Tugas anda adalah menjawab soal sesuai dengan yang anda hafalkan.
            </div>
            <div class="w-full ring-2 ring-inset ring-black py-3 rounded-md text-sm md:text-lg flex justify-center mb-3">
                <div class="flex gap-2 mx-2">
                    <div class="font-semibold">
                        <p>Bunga</p>
                        <p>Perkakas</p>
                        <p>Burung</p>
                        <p>Kesenian</p>
                        <p>Binatang</p>
                    </div>
                    <div class="font-semibold">
                        <p>:</p>
                        <p>:</p>
                        <p>:</p>
                        <p>:</p>
                        <p>:</p>
                    </div>
                    <div>
                        <p>Soka - Larat - Flamboyan - Yasmin - Dahlia</p>
                        <p>Wajan - Jarum - Kikir - Cangkul - Palu</p>
                        <p>Itik - Elang - Walet - Terkukur - Nuri</p>
                        <p>Quintet - Arca - Opera - Gamelan - Ukiran</p>
                        <p>Musang - Rusa - Beruang - Zebra - Harimau</p>
                    </div>
                </div>
            </div>
            <div class="flex justify-center mb-5">
                <!-- <img src="http://24.media.tumblr.com/tumblr_lq6exy9MTt1qk78leo1_400.gif" alt=""> -->
                <img src="../assets/gif_hafalan_ist.gif" alt="" class="w-full md:w-1/2 xl:w-1/2">
            </div>
            <!-- <div class="flex justify-end">
                <button class="bg-foreground-4-100 hover:bg-foreground-4-200 text-white duration-200 rounded-full px-5 py-2 font-bold text-xl" @click.prevent="mulai()">
                    <span id="nextBtn">Mulai</span>
                    <i class="fa fa-chevron-right ml-3"></i>
                </button>
            </div> -->
        </div>
            
        <div v-show="state==2">
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
            
            <div id="soal" class="mb-10 h-full font-semibold" v-if="state==2 && pertanyaan!=null && pilihanJawaban!=null && pilihanJawaban.length>0">
                <TextQuestion :question="pertanyaan[noSoal-1]['instruction']" />
                <div class="md:flex md:gap-3 w-full">
                    <div v-for="(i,idx) in this.pilihanJawaban" :key="idx" class="w-full">
                        <AnswerButton :jenis="''" :jawaban = jawaban :noSoal = noSoal :label="this.pilihanJawaban[idx]" @setChangeds="setChanged" />
                    </div>
                </div>
            </div>

            <div class="flex justify-between mb-5">
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

        <!-- Transparent Overlay -->
        <div id="bg" v-show="state==0" class="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-foreground-4-100 bg-opacity-60 z-40"></div>

        <!-- Countdown -->
        <div id="klikAnywhere" v-show="state==0" class="fixed inset-x-0 w-full h-full flex justify-center items-center top-0 text-white text-center text-5xl font-bold z-50"
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
            namaSection: 'Tes T',
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
            pertanyaan: null,
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
                // this.jumSoal = this.pertanyaan.length
                this.state = 1
                this.gantiPilihanJawaban()

                // Create Section Ongoing to indicate Ongoing Section
                axios.post(this.port+'/section_ongoing/create',{
                    "section_id": parseInt(this.section_id)+1000,
                    "exam_session_id": this.exam_session,
                    "start_status": 1,
                    "start_time": Date.now(),
                    "duration": 3,
                })
                .then((response) => {
                    
                }).catch( error => { 
                    console.log('error: ' + error) 
                });
            }
        },
        nextSoal(){
            // console.log(this.jawaban)
            if (this.noSoal<this.jumSoal){
                this.noSoal++
                if(this.noSoal==this.jumSoal) $('#nextBtn').text('Submit')

                if(this.changed) this.uploadTempAnswers();

                this.progress(true)
            }
            else{
                var isi = 0
                this.jawaban.forEach(e => { if (e != null) isi++; });
                if(isi!=this.jumSoal){
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
            this.gantiPilihanJawaban()
        },
        prevSoal(){
            if (this.noSoal>1){
                this.noSoal--
                if(this.noSoal<this.jumSoal) $('#nextBtn').text('Selanjutnya')

                this.progress(false)
            }

            if(this.changed) this.uploadTempAnswers();

            this.gantiPilihanJawaban()
        },
        lompatSoal(idx){
            this.noSoal = idx
            const elements = document.getElementById("progress")
            var width = ((this.noSoal/this.jumSoal)*100)
            elements.style.width = width +'%'
            
            if (this.noSoal<this.jumSoal) $('#nextBtn').text('Selanjutnya')
            else $('#nextBtn').text('Submit')

            if(this.changed) this.uploadTempAnswers();

            this.gantiPilihanJawaban()
        },
        gantiPilihanJawaban(){
            this.pilihanJawaban = []
            if(this.state==2){
                this.pilihanJawaban = [
                    'A. '+this.pertanyaan[this.noSoal-1]['option_a'],
                    'B. '+this.pertanyaan[this.noSoal-1]['option_b'],
                    'C. '+this.pertanyaan[this.noSoal-1]['option_c'],
                    'D. '+this.pertanyaan[this.noSoal-1]['option_d'],
                    'E. '+this.pertanyaan[this.noSoal-1]['option_e'],
                ]
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
                this.jawabanFinal[i]["question_id"] = this.pertanyaan[i]['id']
                this.jawabanFinal[i]["answer"] = this.jawaban[i]!=null ? this.jawaban[i].substring(0,1):'';
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
        
    },

    beforeDestroy() {
        clearInterval(this.waktu)
    },

    async mounted(){
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
                    if(id==17)
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
        .then(({data}) => {
            this.pertanyaan = data
            this.menit = 3
            this.durasi = this.menit;
            this.jawaban = []
            this.gantiPilihanJawaban()
            this.jumSoal = this.pertanyaan.length
        })

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


        // Build socket
        // const access_token = localStorage.getItem('LS_ACCESS_KEY_VAR').split(' ')[1]
        // const user_key = localStorage.getItem('LS_USER_KEY_VAR')
        // console.log(access_token);
        // console.log(user_key)
        _Socket.connect();
        _Socket.on("test.tick", (data) => {
            // console.log("socket", socket)
            // console.log(data);
            if(data.section_id == parseInt(this.section_id)+1000 && this.state == 0){
                this.state = 1
                this.gantiPilihanJawaban()
            }
            else if(data.section_id == this.section_id && this.state == 0){
                this.state = 2
                this.getTempAnswers();
                this.noSoal = 1
                this.gantiPilihanJawaban()
                this.progress(true)
            }

            this.durasi = data.total_duration;
            var minutes = Math.floor(data.countdown / 60);
            var seconds = data.countdown - minutes * 60;

            this.menit = (new Array(2+1).join('0')+minutes).slice(-2);
            this.detik = (new Array(2+1).join('0')+seconds).slice(-2);

            // If State is Finished
            if(data.countdown <= 0){
                if(this.state == 1){
                    axios.post(this.port+'/section_ongoing/create',{
                        "section_id": this.section_id,
                        "exam_session_id": this.exam_session,
                        "start_status": 1,
                        "start_time": Date.now(),
                        "duration": 3,
                    })
                    .then((response) => {
                        this.state = 2
                        this.noSoal = 1
                        this.gantiPilihanJawaban()
                        this.progress(true)
                    }).catch( error => { 
                        console.log('error: ' + error) 
                    });
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