<template>
    <div class="h-full w-9/12 m-auto relative mt-0 text-black">
        <div class="flex justify-between mb-5">
            <h1 class="text-white text-3xl text-center font-bold mt-5">{{namaSection}}</h1>
            <!-- <div class="flex justify-center">
                <img src="../assets/logo.png" alt="" class="w-20">
            </div> -->
            <div class="text-center bg-background-400 rounded-full flex justify-center py-2 px-3 mt-1">
                <img src="../assets/logo.png" alt="" class="w-20">
            </div>
        </div>

        <div v-show="isStarted">
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
            
            <div id="soal" class="mb-5 h-full font-semibold" v-if="pertanyaan!=null">
            <!-- <div id="soal" class="hidden" v-if="pertanyaan!=null"> -->
            <!-- <div id="soal" class="" v-if="pertanyaan!=null"> -->
                <ImageQuestion v-if="pertanyaan[noSoal-1]['instruction_type']==2" :label="''" :pertanyaan="this.pertanyaanGambar" 
                            :img="this.urlGambar" />
                <TextQuestion v-else-if="pertanyaan[noSoal-1]['instruction_type']==1" :question="this.pertanyaanTeks" :question2="this.pertanyaanTeks2" :cerita="this.cerita" />
                
                <ImageAnswer ref="imageAnswer" v-if="pertanyaan[noSoal-1]['option_type']==2" :judul="'Pilihan Jawaban :'"  :jawaban = jawaban 
                                :noSoal = noSoal :numberOfChoices = jumChoice :choices = pilihanJawaban :section = section_id @setChanged="setChanged" />
                <TextAnswer ref="textAnswer" v-else-if="pertanyaan[noSoal-1]['option_type']==1 && pertanyaan[noSoal-1]['option_a']=='-'" 
                                :jawaban = jawaban :noSoal = noSoal :jumlahJawaban = jumChoice :maxLength="maxLength" :section="this.section_id" @setChanged="setChanged" />
                <mChoiceAnswer ref="mChoiceAnswer" v-else-if="pertanyaan[noSoal-1]['option_type']==1 && pertanyaan[noSoal-1]['option_a']!='-'" :jenis="jenis" :jawaban = jawaban 
                                :noSoal = noSoal :numberOfChoices = jumChoice :choices = pilihanJawaban @setChanged="setChanged" />        
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
import _Socket from '../utilities/_Socket'

export default {
    components: {
        axios,ImageQuestion, ImageAnswer, TextQuestion, mChoiceAnswer, TextAnswer
    },
    data () {
        return {
            namaSection: "Tes ",
            jenis: '',
            noSoal: 1,
            jumSoal: 5,
            jumChoice: 5,
            durasi: 0,
            menit: 0,
            detik: 0,
            waktu: null,
            countdownTimer: null,
            countdown: 2,
            jawaban: [],
            jawabanTemp: "",
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
            maxLength: 0,
            alphabet: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
            angka: ["1","2","3","4","5","6","7","8","9","10"],
            alias: ["A","B","E","F","D","H","J","G","I","U","M","G","Q","K","L","S","T","R","Q","P","C"],
            changed: false,
            pertanyaanGambar: "",
            urlGambar: "",
            pertanyaanTeks: "",
            pertanyaanTeks2: "",
            cerita: "",
            abjad: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
            alias: [1,2,21,5,8,6,10,7,9,11,12,15,13,14,18,16,17,3,4,20,19],
        }
    },
    methods: {
        async getCurrentTest(exam_session){
            exam_session = await axios.get(this.port+'/exam_session/' + exam_session);
            return exam_session.data.current_test;
        },
        getImg(data){
            var id = data.match(/[-\w]{25,}/);
            // let id = data.split("file/d/")
            // id = id[1].split("/")
            // console.log(data)
            // console.log("https://drive.google.com/uc?export=view&id="+id[0])
            return "https://drive.google.com/uc?export=view&id="+id
        },
        setChanged(state){
            this.changed = state
        },
        mulai(){
            if(!this.section_id || !this.exam_session)this.somethingWrong = true;
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
            // console.log(this.noSoal, this.jumSoal)
            // console.log(this.jawaban)
            // console.log(this.changed)
            if (this.noSoal<this.jumSoal){
                this.urlGambar = ""
                this.noSoal++
                this.jumChoice = this.pertanyaan[this.noSoal-1]["option_num"]
                if(this.noSoal==this.jumSoal) $('#nextBtn').text('Submit')
                
                if(this.changed) this.uploadTempAnswers();
                
                this.progress(true)

                if(this.pertanyaan[this.noSoal-1]['option_type']==1 && this.pertanyaan[this.noSoal-1]['option_a']=='-')
                    this.$refs.textAnswer.resetText(this.jawaban[this.noSoal-1])
            }else{
                var isi = 0
                this.jawaban.forEach(e => { if (e != null) isi++; });
                // isi = this.jumSoal;
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
                this.urlGambar = ""
                this.noSoal--
                this.jumChoice = this.pertanyaan[this.noSoal-1]["option_num"]
                if(this.noSoal<this.jumSoal) $('#nextBtn').text('Selanjutnya')

                this.progress(false)
                
                if(this.pertanyaan[this.noSoal-1]['option_type']==1 && this.pertanyaan[this.noSoal-1]['option_a']=='-')
                    this.$refs.textAnswer.resetText(this.jawaban[this.noSoal-1])
            }
            
            if(this.changed) this.uploadTempAnswers();

            this.gantiPilihanJawaban()
        },
        lompatSoal(idx){
            this.noSoal = idx
            const elements = document.getElementById("progress")
            var width = ((this.noSoal/this.jumSoal)*100)
            elements.style.width = width +'%'
            
            this.jumChoice = this.pertanyaan[this.noSoal-1]["option_num"]
            if (this.noSoal<this.jumSoal) $('#nextBtn').text('Selanjutnya')
            else $('#nextBtn').text('Submit')
            
            if(this.pertanyaan[this.noSoal-1]['option_type']==1 && this.pertanyaan[this.noSoal-1]['option_a']=='-')
                this.$refs.textAnswer.resetText(this.jawaban[this.noSoal-1])

            if(this.changed) this.uploadTempAnswers();

            this.gantiPilihanJawaban()
        },
        gantiPilihanJawaban(){
            let banyak = this.pertanyaan[this.noSoal-1]['option_a'].split(';')
            //jika ada banyak pilihan jawaban, maka akan ditaruh pada kolom option_a dengan format pilihan1;pilihan2;pilihan3;dst
            if (banyak.length>1){
                //maka apabila ternyata pilihannya banyak maka fungsi dibawah akan dijalankan
                let temp = []
                let rujukan = []
                if(this.section_id==78) rujukan = this.angka
                else rujukan = this.alphabet
                for (let i = 0; i < banyak.length; i++) {
                    temp.push(rujukan[i]+". "+banyak[i])
                }
                this.pilihanJawaban = temp
            }else if([73,74].includes(this.section_id)){
                this.pilihanJawaban = [
                    '1. '+this.pertanyaan[this.noSoal-1]['option_a'],
                    '2. '+this.pertanyaan[this.noSoal-1]['option_b'],
                    '3. '+this.pertanyaan[this.noSoal-1]['option_c'],
                    '4. '+this.pertanyaan[this.noSoal-1]['option_d'],
                    '5. '+this.pertanyaan[this.noSoal-1]['option_e'],
                ]
            }else if([9,10,46,48,50,51,67,68,79,80].includes(this.section_id) && this.pertanyaan[this.noSoal-1]['option_type']==2){
                let tempSoal = this.pertanyaan[this.noSoal-1]['instruction']
                let temp = tempSoal.split(";")
                
                this.urlGambar = this.getImg(temp[0])
                
                if(temp.length>1){
                    this.pertanyaanGambar = temp[1]
                }else{ 
                    this.pertanyaanGambar = ""
                }
                let url_opsi = this.pertanyaan[this.noSoal-1]['option_a']
                if(["","-"].includes(url_opsi)) this.pilihanJawaban = ""
                else this.pilihanJawaban = this.getImg(url_opsi)
            }else if([49,52].includes(this.section_id)){
                let tempSoal = this.pertanyaan[this.noSoal-1]['instruction']
                let temp = tempSoal.split(";")
                
                this.urlGambar = this.getImg(temp[0])
                
                if(temp.length>1){
                    this.pertanyaanGambar = temp[1]
                }else{ 
                    this.pertanyaanGambar = ""
                }
                let pertanyaanNow = this.pertanyaan[this.noSoal-1]; 
                this.pilihanJawaban = [
                    pertanyaanNow['option_a']=='A'?"A":'A. '+pertanyaanNow['option_a'],
                    pertanyaanNow['option_b']=='B'?"B":'B. '+pertanyaanNow['option_b'],
                    pertanyaanNow['option_c']=='C'?"C":'C. '+pertanyaanNow['option_c'],
                    pertanyaanNow['option_d']=='D'?"D":'D. '+pertanyaanNow['option_d'],
                    pertanyaanNow['option_e']=='E'?"E":'E. '+pertanyaanNow['option_e'],
                ]
            }
            else if (this.section_id==10 || this.section_id==80){
                this.urlGambar = this.getImg(this.pertanyaan[this.noSoal-1]['instruction'])
                this.pilihanJawaban = [
                    "O", "X"
                ]
            }
            else{
                this.pilihanJawaban = [
                    'A. '+this.pertanyaan[this.noSoal-1]['option_a'],
                    'B. '+this.pertanyaan[this.noSoal-1]['option_b'],
                    'C. '+this.pertanyaan[this.noSoal-1]['option_c'],
                    'D. '+this.pertanyaan[this.noSoal-1]['option_d'],
                    'E. '+this.pertanyaan[this.noSoal-1]['option_e'],
                ]

                if (this.section_id==9){
                    let tempSoal = this.pertanyaan[this.noSoal-1]['instruction']
                    let temp = tempSoal.split(";")
                    
                    this.urlGambar = this.getImg(temp[0])
                    if(temp.length>1){
                        this.pertanyaanGambar = temp[1]
                    }else{ 
                        this.pertanyaanGambar = ""
                    }
                }else if([44,57].includes(this.section_id)){
                    this.urlGambar = this.getImg(this.pertanyaan[this.noSoal-1]['instruction'])
                }
            }

            if(this.pertanyaan[this.noSoal-1]['instruction_type']==1){
                let tempSoal = this.pertanyaan[this.noSoal-1]['instruction']
                let temp = tempSoal.split(";")

                if(temp.length>1){
                    this.cerita = temp[0]
                    this.pertanyaanTeks = temp[1]
                }else{
                    this.cerita = ""
                    let temp2 = tempSoal.split("|")
                    if(temp2.length>1){
                        this.pertanyaanTeks = temp2[0]
                        this.pertanyaanTeks2 = temp2[1]
                    }else{
                        this.pertanyaanTeks = temp[0]
                        this.pertanyaanTeks2 = ""
                    }
                }
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
        submitJawaban(){
            
            $('#spinner-modal').fadeIn("slow");
            for (let i = 0; i < this.jumSoal; i++) {
                this.jawabanFinal[i] = []
                this.jawabanFinal[i]["question_id"] = this.pertanyaan[i]['id']
                if(this.pertanyaan[this.noSoal-1]['option_type']==1 && this.pertanyaan[this.noSoal-1]['option_a']=='-')
                    this.jawabanFinal[i]["answer"] = this.jawaban[i] != undefined ? this.jawaban[i] : '';
                else if (this.jenis=="MMPI" || this.jenis=="Tes MMPI"){
                    let ans = this.jawaban[i]!=undefined ? this.jawaban[i].substring(3,4):''
                    if(ans=="+") this.jawabanFinal[i]["answer"] = 1
                    else if(ans=="-") this.jawabanFinal[i]["answer"] = 0
                    else this.jawabanFinal[i]["answer"] = -1
                }
                else if (this.jenis=="SDI" || this.jenis=="Tes SDI"){
                    let ans = this.jawaban[i]!=undefined ? this.jawaban[i].split(" ")[1]:""
                    ans = ans.toLowerCase();
                    if(ans=="ya" || ans=="y") this.jawabanFinal[i]["answer"] = 1
                    else if(ans=="tidak" || ans=="t") this.jawabanFinal[i]["answer"] = 0
                    else this.jawabanFinal[i]["answer"] = -1
                }
                else if(this.section_id==9 || this.section_id==10 || this.section_id==80){
                    this.jawabanFinal[i]["answer"] = this.jawaban[i]!=undefined ? this.jawaban[i]:''
                }
                else if(this.section_id==79){
                    this.jawabanFinal[i]["answer"] = this.jawaban[i]!=undefined ? this.jawaban[i]:''
                    if(this.jawabanFinal[i]["answer"]=="A") this.jawabanFinal[i]["answer"] = "1"
                    else if(this.jawabanFinal[i]["answer"]=="B") this.jawabanFinal[i]["answer"] = "2"
                    else if(this.jawabanFinal[i]["answer"]=="C") this.jawabanFinal[i]["answer"] = "3"
                    else if(this.jawabanFinal[i]["answer"]=="D") this.jawabanFinal[i]["answer"] = "4"
                }
                else if(this.jumChoice==2){
                    this.jawabanFinal[i]["answer"] = this.jawaban[i]!=undefined ? this.jawaban[i].substring(3,4):''
                }
                else
                    this.jawabanFinal[i]["answer"] = this.jawaban[i]!=null ? this.jawaban[i].substring(0,1):'';
                this.jawabanFinal[i] = Object.assign({}, this.jawabanFinal[i]);
            }

            // console.log(this.jawabanFinal);
            // console.log(this.jawaban);

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
        getMaxLength(){
            let id = this.$cookies.get('current_section').id
            if(id==65) this.maxLength = 3
            else if (id==66) this.maxLength = 2
            else{
                let x = 0;
                this.pertanyaan.forEach(p => {
                    let jawaban = p.answer.split('&')
                    jawaban.forEach(j => {
                        if (j.length>x) x = j.length
                    });
                });
                this.maxLength = x
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
                    if(id==tes)
                        this.namaSection = "TES "+this.abjad[counter]
                    else{
                        counter++
                    }
                    break;
                }
            }
        }
        // this.namaSection = "TES "+this.alias[tes-1]
        axios
        .get(this.port+'/test/'+tes)
        .then(({data}) => {
            this.jenis = data.name
        })

        axios
        .get(this.port+'/question/all?section_id='+this.section_id)
        .then(({data}) => (
            this.pertanyaan = data,
            this.getMaxLength(),
            this.menit = this.pertanyaan[0]["section"]["duration"]==-1?-99:this.pertanyaan[0]["section"]["duration"],
            this.durasi = this.menit,
            this.jumChoice = this.pertanyaan[0]["option_num"],
            this.jumSoal = this.pertanyaan.length,
            // this.jumSoal = 5,
            this.gantiPilihanJawaban(),
            this.jawaban = Array(225),
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

            this.getTempAnswers();
            
            // console.log(this.test_id)
            // console.log(this.email)
            // console.log(this.exam_session)
            // console.log(this.section_id)
            // console.log(this.test_result_id)
        })

        // Build socket
        // const access_token = localStorage.getItem('LS_ACCESS_KEY_VAR').split(' ')[1]
        // const user_key = localStorage.getItem('LS_USER_KEY_VAR')
        // console.log(access_token);
        // console.log(user_key)
        _Socket.connect();
        _Socket.on("test.tick", (data) => {
            // console.log(data)
            if(data.section_id == this.section_id){
                // console.log("socket", socket)
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
            if (event.keyCode==37)
                thi.prevSoal()
            else if (event.keyCode==39)
                thi.nextSoal()
            else if(event.keyCode==65) thi.chooseWithKeyboard('a')
            else if(event.keyCode==66) thi.chooseWithKeyboard('b')
            else if(event.keyCode==67) thi.chooseWithKeyboard('c')
            else if(event.keyCode==68) thi.chooseWithKeyboard('d')
            else if(event.keyCode==69) thi.chooseWithKeyboard('e')
            
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