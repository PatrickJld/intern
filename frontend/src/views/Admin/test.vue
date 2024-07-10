<template>
    <div class="w-full flex justify-center h-auto">
        <div class="w-5/6 h-full">
            <div class="flex">
                <label class="text-xl font-bold w-32">Nama Tes : </label>
                <select name="" id="testCombobox" class="text-black text-lg rounded-xl py-1 px-2 w-10/12 outline-none shadow-xl cursor-pointer"
                    @change="gantiTes($event)">
                    <option v-for="i in test" :key="i" v-bind:value="i.id">{{i.name}}</option>
                </select>
            </div>

            <h1 class="font-bold text-4xl mt-5">Persoalan</h1>

            <div class="flex justify-end">
                <button class="bg-foreground-4-100 text-white hover:bg-foreground-4-200
                                duration-200 rounded-md px-10 py-2 mt-2 h-auto w-auto shadow-xl" 
                    id="btnCreateSection" @click="openModalCreate">
                    <i class="fa fa-feather fa-lg mr-2"></i>   
                    <span>Buat Persoalan Baru</span>
                </button>
            </div>
            <div class="overflow-auto w-full h-auto max-h-[30rem] no-scrollbar mt-5 rounded-lg shadow-xl">
                <table class="table-fixed w-full font-semibold">
                    <thead class="bg-foreground-4-100 text-white sticky top-0">
                        <tr>
                            <th class="w-1/12 py-3">Persoalan</th>
                            <th class="w-3/12">Instruksi</th>
                            <th class="w-2/12">Durasi</th>
                            <th class="w-2/12">Tipe Jawaban</th>
                            <th class="w-2/12">Tipe Pertanyaan</th>
                            <th class="w-2/12">Jumlah Jawaban</th>
                            <th class="w-3/12">Aksi</th>
                        </tr>
                    </thead>
                    <tbody v-if="this.sectionList!=null && this.sectionList.length>0">
                        <tr class="text-center odd:bg-foreground-4-50 even:bg-foreground-4-10" v-for="i in this.sectionList" :key="i">
                            <td>{{i.section_number}}</td>
                            <td class="text-justify overflow-hidden overflow-ellipsis instruksi py-2" v-html="i.instruction"></td>
                            <td>{{i.duration}} Menit</td>
                            <td>
                                <span v-if="i.question_type==1">Teks</span>
                                <span v-else-if="i.question_type==2">Gambar</span>
                            </td>
                            <td>
                                <span v-if="i.section_type==1">Esai</span>
                                <span v-else-if="i.section_type==2">Pilihan Ganda</span>
                            </td>
                            <td>{{i.option_num}}</td>
                            <td class="text-white">
                                <button class="bg-foreground-4-100 hover:bg-foreground-4-200 duration-200 rounded-md h-auto w-auto px-5 py-1 mr-1" 
                                    @click.prevent="gantiSection(i)"> 
                                    <i class="fa fa-info-circle mr-2"></i>
                                    <span>Detail</span>
                                </button>
                                <button class="bg-foreground-4-100 hover:bg-foreground-4-200 duration-200 rounded-md h-auto w-auto px-5 py-1 mr-1" 
                                    @click="openModal(i)"> 
                                    <i class="fa fa-refresh mr-2"></i>
                                    <span>Perbarui</span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                    <tbody v-else>
                        <tr class="text-center bg-foreground-4-50 text-xl">
                            <td colspan="7" class="py-5">Belum ada data tersedia</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div>
                <h1 class="font-bold text-4xl mt-10">Pertanyaan</h1>

                <div class="flex justify-end gap-2">
                        <!-- @click="this.$router.push({path: '/admin/question/add'})" -->
                    <button class="bg-foreground-4-100 text-white hover:bg-foreground-4-200
                                duration-200 rounded-md px-10 py-2 mt-2 h-auto w-auto shadow-xl" 
                        @click="openModalQuestion">
                        <i class="fa fa-feather fa-lg mr-2"></i>   
                        <span>Buat Pertanyaan Baru</span>
                    </button>
                    <button v-if="!this.sResList.includes(this.section_id)" class="bg-foreground-4-100 text-white hover:bg-red-500
                                duration-200 rounded-md px-10 py-2 mt-2 h-auto w-auto shadow-xl" 
                        @click="resetQuestion">
                        <i class="fa fa-exclamation-circle fa-lg mr-2"></i>   
                        <span>Hapus Semua Pertanyaan</span>
                    </button>
                </div>

                <div class="overflow-auto w-full h-auto max-h-[30rem] no-scrollbar mt-5 rounded-lg shadow-xl">
                    <table class="table-fixed w-full font-semibold">
                        <thead class="bg-foreground-4-100 text-white sticky top-0">
                            <tr>
                                <th class="w-1/12 py-3">No</th>
                                <th class="w-4/12">Pertanyaan</th>
                                <th class="w-3/12">Pilihan Jawaban</th>
                                <th class="w-1/12">Kunci Jawaban</th>
                                <th class="w-3/12">Aksi</th>
                            </tr>
                        </thead>
                        <tbody v-if="this.questionList!=null && this.questionList.length>0">
                            <tr class="text-center odd:bg-foreground-4-50 even:bg-foreground-4-10" v-for="(i,idx) in this.questionList" :key="idx">
                                <td>{{idx+1}}</td>
                                <td><span class="text-justify overflow-hidden overflow-ellipsis instruksi">{{i.instruction}}</span></td>
                                <td class="py-2">{{optionToString(i)}}</td>
                                <td>{{i.answer}}</td>
                                <td>
                                    <button class="bg-foreground-4-100 hover:bg-foreground-4-200 duration-200 rounded-md text-white
                                                    h-auto w-auto text-base px-5 py-1 mr-1" 
                                        @click="openModalUpdateQuestion(i)"> 
                                        <i class="fa fa-refresh mr-2"></i>
                                        <span>Perbarui</span>
                                    </button>
                                    <button v-if="!this.qResList.includes(i.id)" class="bg-foreground-4-100 hover:bg-red-600 duration-200 rounded-md text-white
                                                    h-auto w-auto text-base px-5 py-1 mr-1" 
                                        @click="hapusPertanyaan(i.id)"> 
                                        <i class="fa fa-trash mr-2"></i>
                                        <span>Hapus</span>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                        
                        <tbody v-else>
                            <tr class="text-center bg-foreground-4-50 text-xl">
                                <td colspan="5" class="py-5">Belum ada data tersedia</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="w-1 h-64 relative top-10"></div>
        </div>
        
        <!-- Transparent Overlay -->
        <div id="bg" class="fixed top-0 left-0 w-screen h-screen bg-primary-1000 bg-opacity-60 hidden" @click="closeModals"></div>

        <!-- Create New Section Modal -->
        <div id="modalSection" class="fixed left-1/4 bg-foreground-4-200 text-primary-1000 rounded-lg hidden" style="top: 5%; width: 50%; height: 90%;">
            <div class="bg-primary-300 h-12 rounded-t-lg px-5 py-2 flex items-center">
                <p class="font-bold text-lg inline-block relative" style="width: 96%">{{headerModal}}</p>
                <button id="closeNewSection" class="relative inline-block" @click="closeModal">
                    <i class="fa fa-times fa-lg"></i>
                </button>
            </div>

            <div class="text-white p-5 h-5/6 relative">
                <p>Instruksi :</p>
                <Editor
                    v-model="this.instruksi"
                    api-key="no-api-key"
                    :init="{
                        height: 300,
                        menubar: false,
                        plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar:
                        'undo redo | formatselect | bold italic backcolor | \
                        alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help'
                    }"
                />
                <!-- <textarea name="" id="" v-model="this.instruksi"
                    class="rounded-lg py-2 px-3 w-full h-24 my-2 bg-primary-600 outline-none placeholder-gray-300 resize-none"></textarea> -->
                <div class="flex">
                    <div class="w-1/3">
                        <p class="mt-4 mb-3">Durasi</p>
                        <p class="mb-3">Tipe Pertanyaan</p>
                        <p class="mb-4">Tipe Jawaban</p>
                        <p class="non-essay">Jumlah Pilihan Jawaban</p>
                    </div>
                    <div>
                        <p class="mt-4 mb-3">:</p>
                        <p class="mb-3">:</p>
                        <p class="mb-4">:</p>
                        <p class="non-essay">:</p>
                    </div>
                    <div class="grow ml-2">
                        <div>
                            <input type="number" name="duration" id="duration" placeholder="0-9" v-model="this.durasi"
                                class="rounded-lg py-2 px-3 w-9/12 my-2 bg-primary-600 outline-none placeholder-gray-300">
                            <label for="duration"> Menit</label><br>
                        </div>
                        <div class="flex gap-2 mb-2">
                            <input type="radio" :value="'1'" :name="'Question_Type'" id="question_text" v-model="this.tipePertanyaan" class="w-5 h-5 mr-2" />
                            <label for="question_text" class="mr-2">Teks</label>
                            <input type="radio" :value="'2'" :name="'Question_Type'" id="question_image" v-model="this.tipePertanyaan" class="w-5 h-5 mr-2" />
                            <label for="question_image" class="mr-2">Gambar</label>
                        </div>
                        <div class="flex gap-2">
                            <input type="radio" :value="'1'" :name="'Answer_Type'" v-model="this.tipeJawaban" id="text_answer" class="w-5 h-5 mr-2" @change="non_essay=false" />
                            <label for="text_answer" class="mr-2">Teks</label>
                            <input type="radio" :value="'2'" :name="'Answer_Type'" v-model="this.tipeJawaban" id="multiple_choice" class="w-5 h-5 mr-2" @change="non_essay=true" />
                            <label for="multiple_choice" class="mr-2">Pilihan Ganda</label>
                            <!-- <Radio :values="'2'" v-model="this.tipeJawaban" :names="'Answer_Type'" :id="'answer_image'" :label="'Gambar'" @change="non_essay=true"/> -->
                        </div>
                        <div class="flex non-essay">
                            <input type="number" v-model="this.jumJawaban" name="option_number" id="option_number" placeholder="2-5"
                                class="rounded-lg py-2 px-3 w-9/12 my-2 bg-primary-600 outline-none placeholder-gray-300">
                        </div>
                    </div>
                </div>
                

                <button id="submit_new_section" class="absolute bottom-0 right-0 mr-5 rounded-lg px-10 py-2 bg-sky-300 text-primary-1000 hover:text-white 
                                                        hover:bg-primary-700 duration-300 ring-2 ring-inset ring-sky-300 hover:ring-primary-200"
                                                        @click.prevent="createSection">
                                                        {{this.statusAdd?"Buat":"Perbarui"}}</button>

            </div>
        </div>

        <!-- Create New Question (w/ Excel) Modal -->
        <form id="modalQuestion" class="fixed left-1/3 bg-foreground-4-200 text-primary-1000 rounded-lg top-1/4 hidden" style="width: 40%; height: 50%;" enctype="multipart/form-data" 
            @submit.prevent="createQuestion">
            <div class="bg-primary-300 h-12 rounded-t-lg px-5 py-2 flex items-center">
                <p class="font-bold text-lg inline-block relative" style="width: 96%">Buat Pertanyaan Baru</p>
                <button id="closeNewQuestion" class="relative inline-block" @click="closeModalQuestion">
                    <i class="fa fa-times fa-lg"></i>
                </button>
            </div>

            <div class="text-white p-5 h-5/6 relative">
                <p v-if="this.test!=null" class="text-xl font-bold mb-2">Tes {{this.test[this.test_id-1].name}}, Persoalan {{this.persoalan}}</p>
                <div class="flex">
                    <div class="w-1/3">
                        <p class="mt-4 mb-9">File Excel</p>
                        <!-- <p class="mb-3">Nama Sheet</p> -->
                    </div>
                    <div>
                        <p class="mt-4 mb-9">:</p>
                        <!-- <p>:</p> -->
                    </div>
                    <div class="grow ml-2">
                        <input type="file" name="question_file" id="question_file"
                                class="rounded-lg py-2 px-1 w-9/12 my-2">
                        <!-- <input type="text" v-model="this.nama_sheet" name="sheet_name" id="sheet_name"
                                class="rounded-lg py-2 px-3 w-9/12 my-2 bg-primary-600 outline-none placeholder-gray-300"> -->
                    </div>
                </div>
                

                <button id="submit_new_question" class="absolute bottom-0 right-0 mr-5 rounded-lg px-10 py-2 bg-sky-300 text-primary-1000 hover:text-white 
                                                        hover:bg-primary-700 duration-300 ring-2 ring-inset ring-sky-300 hover:ring-primary-200">
                                                        Buat</button>

            </div>
        </form>

        <!-- Update Question Modal -->
        <form id="modalUpdateQuestion" class="fixed left-1/4 bg-foreground-4-200 text-primary-1000 rounded-lg overflow-y-scroll pb-10 hidden" style="top: 5%; width: 50%; height: 90%;"
            @submit.prevent="updateQuestion">
            <div class="bg-primary-300 h-12 rounded-t-lg px-5 py-2 flex items-center">
                <p class="font-bold text-lg inline-block relative" style="width: 96%">Perbarui Pertanyaan</p>
                <button id="closeUpdateQuestion" class="relative inline-block" @click="closeModalUpdateQuestion">
                    <i class="fa fa-times fa-lg"></i>
                </button>
            </div>

            <div class="text-white p-5 h-5/6 relative">
                <p>Pertanyaan :</p>
                <textarea name="" id="" v-model="this.pertanyaan"
                    class="rounded-lg py-2 px-3 w-full h-24 my-2 bg-primary-600 outline-none placeholder-gray-300 resize-none"></textarea>
                <div class="flex">
                    <div class="w-1/3">
                        <p class="mt-4 mb-5">Jumlah Opsi:</p>
                        <p class="mb-6">Opsi A</p>
                        <p class="mb-6">Opsi B</p>
                        <p class="mb-6">Opsi C</p>
                        <p class="mb-6">Opsi D</p>
                        <p class="mb-6">Opsi E</p>
                        <p class="mb-4">Jawaban</p>
                        <p class="mb-2">Jenis Opsi</p>
                        <p>Jenis Instruksi</p>
                    </div>
                    <div>
                        <p class="mt-4 mb-5">:</p>
                        <p v-for="i in 5" :key="i" class="mb-6">:</p>
                        <p class="mb-4">:</p>
                        <p class="mb-2">:</p>
                        <p>:</p>
                    </div>
                    <div class="grow ml-2">
                        <div>
                            <input type="number" name="num_option" id="num_option" placeholder="0-9" v-model="this.num_option"
                                class="rounded-lg py-2 px-3 w-9/12 mt-2 bg-primary-600 outline-none placeholder-gray-300">
                        </div>
                        <div>
                            <input type="text" name="opsiA" id="opsiA" v-model="this.opsi[0]"
                                class="rounded-lg py-2 px-3 w-9/12 mt-2 bg-primary-600 outline-none placeholder-gray-300">
                        </div>
                        <div>
                            <input type="text" name="opsiB" id="opsiB" v-model="this.opsi[1]"
                                class="rounded-lg py-2 px-3 w-9/12 mt-2 bg-primary-600 outline-none placeholder-gray-300">
                        </div>
                        <div>
                            <input type="text" name="opsiC" id="opsiC" v-model="this.opsi[2]"
                                class="rounded-lg py-2 px-3 w-9/12 mt-2 bg-primary-600 outline-none placeholder-gray-300">
                        </div>
                        <div>
                            <input type="text" name="opsiD" id="opsiD" v-model="this.opsi[3]"
                                class="rounded-lg py-2 px-3 w-9/12 mt-2 bg-primary-600 outline-none placeholder-gray-300">
                        </div>
                        <div>
                            <input type="text" name="opsiE" id="opsiE" v-model="this.opsi[4]"
                                class="rounded-lg py-2 px-3 w-9/12 mt-2 bg-primary-600 outline-none placeholder-gray-300">
                        </div>
                        <div>
                            <input type="text" name="jawaban" id="jawaban" v-model="this.jawaban"
                                class="rounded-lg py-2 px-3 w-9/12 mt-2 bg-primary-600 outline-none placeholder-gray-300">
                        </div>
                        <div class="flex gap-2 my-2">
                            <input type="radio" :value="1" :name="'Option_Type'" id="option_text" v-model="this.tipeOpsi" class="w-5 h-5 mr-2" />
                            <label for="option_text" class="mr-2">Teks</label>
                            <input type="radio" :value="2" :name="'Option_Type'" id="option_image" v-model="this.tipeOpsi" class="w-5 h-5 mr-2" />
                            <label for="option_image" class="mr-2">Gambar</label>
                        </div>
                        <div class="flex gap-2">
                            <input type="radio" :value="1" :name="'Instruction_Type'" v-model="this.tipeInstruksi" id="instruction_text" class="w-5 h-5 mr-2" />
                            <label for="instruction_text" class="mr-2">Teks</label>
                            <input type="radio" :value="2" :name="'Instruction_Type'" v-model="this.tipeInstruksi" id="instruction_image" class="w-5 h-5 mr-2" />
                            <label for="instruction_image" class="mr-2">Gambar</label>
                        </div>
                    </div>
                </div>

                <button id="submit_update_question" class="absolute -bottom-10 right-0 mr-5 rounded-lg px-10 py-2 bg-sky-300 text-primary-1000 hover:text-white 
                                                        hover:bg-primary-700 duration-300 ring-2 ring-inset ring-sky-300 hover:ring-primary-200">
                                                        Perbarui</button>

            </div>
        </form>
    </div>
</template>
<script>
import Radio from '../../components/radiobutton.vue'
import axios from 'axios'
import Editor from '@tinymce/tinymce-vue'

export default {
    components: {
        Radio, axios, Editor
    },
    data() {
        return {
            testList: [],
            sectionList: null,
            questionList: null,
            sResList: [],
            qResList: [],
            test: null,
            question_id: 0,
            instruksi: "",
            durasi: "",
            tipePertanyaan: 0,
            tipeJawaban: 0,
            jumJawaban: "",
            statusAdd: true,
            test_id: null,
            section_number: null,
            section_id: null,
            persoalan: "",
            sheet_name: "",
            pertanyaan: "",
            opsi: ["","","","",""],
            jawaban: "",
            num_option: "",
            tipeInstruksi: 0,
            tipeOpsi: 0,
            headerModal: "Create A New Section",
            alphabet: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
            angka: ["1","2","3","4","5","6","7","8","9","10"],
            port: import.meta.env.VITE_BACKEND_URL
        }
    },
    created() {
        this.$emit('updateHeader', 'Tes')
        this.$emit('updateMenu', 'test')
    },
    methods: {
        openModal(data){
            this.instruksi = data.instruction
            this.durasi = data.duration
            this.tipePertanyaan = data.section_type
            this.tipeJawaban = data.question_type
            this.jumJawaban = data.option_num
            this.section_number = data.section_number
            this.section_id = data.id
            this.statusAdd = false
            this.headerModal = "Perbarui Persoalan";
            $('#modalSection').fadeIn("slow");
            $('#bg').fadeIn("slow");
        },
        openModalCreate(){
            this.instruksi =  ""
            this.durasi =  ""
            this.tipePertanyaan =  0
            this.tipeJawaban =  0
            this.jumJawaban = ""
            this.section_number = null
            // this.section_id = null
            this.section_number = this.sectionList[this.sectionList.length-1].section_number + 1
            this.statusAdd = true
            this.headerModal = "Buat Persoalan Baru";
            $('#modalSection').fadeIn("slow");
            $('#bg').fadeIn("slow");
        },
        openModalQuestion(){
            if (this.section_id!=null || this.persoalan!=""){
                this.nama_sheet = ""
                $('#modalQuestion').fadeIn("slow");
                $('#bg').fadeIn("slow");
            }
        },
        openModalUpdateQuestion(question){
            if (this.section_id!=null){
                this.question_id = question.id
                this.pertanyaan = question.instruction
                this.opsi = [question.option_a,question.option_b,question.option_c,question.option_d,question.option_e],
                this.jawaban = question.answer
                this.num_option = question.option_num
                this.tipeInstruksi = question.instruction_type
                this.tipeOpsi = question.option_type
                $('#modalUpdateQuestion').fadeIn("slow");
                $('#bg').fadeIn("slow");
            }
        },
        closeModals(){
            $('#modalSection').fadeOut("fast");
            $('#modalQuestion').fadeOut("fast");
            $('#modalUpdateQuestion').fadeOut("fast");
            $('#bg').fadeOut("slow");
        },
        closeModal(){
            $('#modalSection').fadeOut("fast");
            $('#bg').fadeOut("slow");
        },
        closeModalQuestion(){
            $('#modalQuestion').fadeOut("fast");
            $('#bg').fadeOut("slow");
        },
        closeModalUpdateQuestion(){
            $('#modalUpdateQuestion').fadeOut("fast");
            $('#bg').fadeOut("slow");
        },
        gantiSection(section){
            this.section_id = section.id
            this.persoalan = section.section_number
            this.qResList = []
            this.sResList = []
            axios
            .get(this.port+'/question/all?section_id='+this.section_id)
            .then(({data}) => (
                this.questionList = data
            ))

            axios
            .get(this.port+'/question_result/getbysection/'+this.section_id)
            .then(({data}) => {
                let temp = []
                data.forEach(question => {
                    let id = question.question_id
                    if(!temp.includes(id))
                        temp.push(id)                
                });
                this.qResList = temp
            })

            axios
            .get(this.port+'/section_result/getbysection/'+this.section_id)
            .then(({data}) => {
                let temp = []
                data.forEach(sec => {
                    let id = sec.section_id
                    if(!temp.includes(id))
                        temp.push(id)                
                });
                this.sResList = temp
            })
        },
        dataInit(){
            for (let i = 0; i < this.test.length; i++) {
                this.testList[i] = this.test[i].name
            }

            this.test_id = this.test[0].id
            axios
            .get(this.port+'/section/all/'+this.test_id)
            .then(({data}) => (
                this.sectionList = data,
                this.gantiSection(this.sectionList[0])
                // axios
                // .get(this.port+'/question/all?section_id='+this.sectionList[0].id)
                // .then(({data}) => (
                //     this.questionList = data
                // ))
            ))
        },
        gantiTes(event){
            this.questionList = null
            this.test_id = event.target.value
            axios
            .get(this.port+'/section/all/'+this.test_id)
            .then(({data}) => (
                this.sectionList = data,
                this.section_id = this.sectionList[0].id,
                axios
                .get(this.port+'/question/all?section_id='+this.sectionList[0].id)
                .then(({data}) => (
                    this.questionList = data
                ))
            ))
        },
        optionToString(question){
            var hasil = ""
            let banyak = question['option_a'].split(';')
            //jika ada banyak pilihan jawaban, maka akan ditaruh pada kolom option_a dengan format pilihan1;pilihan2;pilihan3;dst
            let rujukan = []
            if([51,73,74,78,79].includes(this.section_id)) rujukan = this.angka
            else rujukan = this.alphabet

            if (banyak.length>1){
                //maka apabila ternyata pilihannya banyak maka fungsi dibawah akan dijalankan
                hasil+=rujukan[0]+". "+banyak[0]
                for (let i = 1; i < banyak.length; i++) {
                    hasil+=", "+rujukan[i]+". "+banyak[i]
                }
            }else{
                if(question.option_num>=1) hasil += rujukan[0]+". "+question.option_a
                if(question.option_num>=2) hasil += ", "+rujukan[1]+". "+question.option_b
                if(question.option_num>=3) hasil += ", "+rujukan[2]+". "+question.option_c
                if(question.option_num>=4) hasil += ", "+rujukan[3]+". "+question.option_d
                if(question.option_num>=5) hasil += ", "+rujukan[4]+". "+question.option_e
            }
            

            return hasil
        },
        createSection(){
            if(this.instruksi=="" || this.durasi=="" ||this.tipePertanyaan==null||this.tipeJawaban==null|| parseInt(this.jumJawaban)<0)
                Swal.fire({
                    title: 'Mohon Isi Semua Field!',
                    icon: 'warning',
                    confirmButtonText: 'Kembali'
                });
            else{
                if (this.statusAdd){
                    // console.log("create")
                    axios.post(this.port+'/section/create',{
                        "test_id": this.test_id,
                        "section_number": this.section_number,
                        "instruction": this.instruksi,
                        "duration": parseInt(this.durasi),
                        "section_type": this.tipePertanyaan,
                        "question_type": this.tipeJawaban,
                        "option_num": parseInt(this.jumJawaban)
                    })
                    .then((response) => {
                        if (response.status==200){
                            let thi = this
                            axios
                            .get(this.port+'/section/all/'+this.test_id)
                            .then(({data}) => (
                                this.sectionList = data,
                                Swal.fire(
                                    'Created!',
                                    'Persoalan Baru Berhasil Dibuat!',
                                    'success'
                                )
                                .then(function(){
                                    $('#modalSession').fadeOut("fast")
                                    $('#bg').fadeOut("slow")
                                    thi.closeModal()
                                })
                            ))
                        }else{
                            throw response
                        }
                    }).catch( error => {
                        $('#spinner-modal').fadeOut("slow");
                        Swal.fire(
                            'Warning!',
                            error.response.data,
                            'warning'
                        )
                    });
                }else{
                    // console.log("update")
                    axios.post(this.port+'/section/update',{
                        "updating_id": this.section_id,
                        "test_id": this.test_id,
                        "section_number": this.section_number,
                        "instruction": this.instruksi,
                        "duration": parseInt(this.durasi),
                        "section_type": this.tipePertanyaan,
                        "question_type": this.tipeJawaban,
                        "option_num": parseInt(this.jumJawaban)
                    })
                    .then((response) => {
                        let thi = this
                        axios
                        .get(this.port+'/section/all/'+this.test_id)
                        .then(({data}) => (
                            this.sectionList = data,
                            Swal.fire(
                                'Updated!',
                                'Persoalan Berhasil Diperbarui!',
                                'success'
                            )
                            .then(function(){
                                $('#modalSession').fadeOut("fast")
                                $('#bg').fadeOut("slow")
                                thi.closeModal()
                            })
                        ))
                    }).catch( error => {
                        $('#spinner-modal').fadeOut("slow");
                        Swal.fire(
                            'Warning!',
                            error.response.data,
                            'warning'
                        )
                    });
                }
            }
        },
        createQuestion(e){
            if (this.section_id!=null){
                if(e.target[1].files.length<=0)
                    Swal.fire({
                        title: 'Mohon Isi Semua Field!',
                        icon: 'warning',
                        confirmButtonText: 'Kembali'
                    });
                else{
                    let file = e.target[1].files[0]
                    if (file!=undefined)
                        file.originalname = file.name
                    let extension = file.originalname.split('.')[1]
                    
                    if(!['xls','xlsx'].includes(extension))
                        Swal.fire({
                            title: 'Hanya dapat mengupload file dengan ekstensi .xls atau .xlsx !',
                            icon: 'warning',
                            confirmButtonText: 'Kembali'
                        });
                    else {
                        let formData = new FormData()
                        formData.append('section_id',this.section_id)
                        formData.append('excel',file)
                        axios.post(this.port+'/question/createFromExcel',formData, {headers: {
                            'Content-Type': 'multipart/form-data',
                        }})
                        .then((response) => {
                            if (response.status==200){
                                let thi = this
                                axios
                                .get(this.port+'/question/all?section_id='+this.section_id)
                                .then(({data}) => (
                                    this.questionList = data,
                                    Swal.fire(
                                        'Created!',
                                        'Pertanyaan Berhasil Dibuat!',
                                        'success'
                                    )
                                    .then(function(){
                                        $('#modalSession').fadeOut("fast")
                                        $('#bg').fadeOut("slow")
                                        thi.closeModalQuestion()
                                    })
                                ))
                            }else{
                                throw response
                            }
                        }).catch( error => {
                            $('#spinner-modal').fadeOut("slow");
                            Swal.fire(
                                'Warning!',
                                error.response.data,
                                'warning'
                            )
                        });
                    }
                }
            }
        },
        updateQuestion(){
            if(this.pertanyaan=="" || this.jawaban=="" ||this.num_option=="")
                Swal.fire({
                    title: 'Mohon Isi Semua Field!',
                    icon: 'warning',
                    confirmButtonText: 'Kembali'
                });
            else{
                axios.post(this.port+'/question/update',{
                    "updating_id": this.question_id,
                    "question": this.pertanyaan,
                    "option_num": parseInt(this.num_option),
                    "section_id": this.section_id,
                    "option_a": this.opsi[0],
                    "option_b": this.opsi[1],
                    "option_c": this.opsi[2],
                    "option_d": this.opsi[3],
                    "option_e": this.opsi[4],
                    "answer": this.jawaban,
                    "option_type": this.tipeOpsi,
                    "question_type": this.tipeInstruksi
                })
                .then((response) => {
                    if (response.status==200){
                        let thi = this
                        axios
                        .get(this.port+'/question/all?section_id='+this.section_id)
                        .then(({data}) => (
                            this.questionList = data,
                            Swal.fire(
                                'Sukses!',
                                'Pertanyaan Baru Berhasil Diperbarui!',
                                'success'
                            )
                            .then(function(){
                                thi.closeModalUpdateQuestion()
                            })
                        ))
                    }else{
                        throw response
                    }
                }).catch( error => {
                    $('#spinner-modal').fadeOut("slow");
                    Swal.fire(
                        'Warning!',
                        error.response.data,
                        'warning'
                    )
                });
            }
        },
        resetQuestion(){
            if (this.questionList!=null){
                Swal.fire({
                    title: 'Yakin mereset semua pertanyaan?',
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Ya',
                    cancelButtonText: 'Batal'
                }).then((result) => {
                    if (result.isConfirmed) {
                        $('#spinner-modal').fadeIn("slow");
                        axios.delete(this.port+'/question/deletebysection/'+this.section_id)
                        .then((response) => {
                            axios
                            .get(this.port+'/question/all?section_id='+this.section_id)
                            .then(({data}) => (
                                this.questionList = data,
                                $('#spinner-modal').fadeOut("slow"),
                                Swal.fire({
                                    title: 'Sukses mereset pertanyaan!',
                                    icon: 'success',
                                    confirmButtonColor: '#3085d6',
                                    confirmButtonText: 'Tutup',
                                })
                            ))
                        })
                    }
                });
            }
        },
        hapusPertanyaan(question){
            Swal.fire({
                title: 'Yakin menghapus pertanyaan ini?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Ya',
                cancelButtonText: 'Batal'
            }).then((result) => {
                if (result.isConfirmed) {
                    $('#spinner-modal').fadeIn("slow");
                    axios.delete(this.port+'/question/deletebyid/'+question)
                    .then((response) => {
                        axios
                        .get(this.port+'/question/all?section_id='+this.section_id)
                        .then(({data}) => (
                            this.questionList = data,
                            $('#spinner-modal').fadeOut("slow"),
                            Swal.fire({
                                title: 'Sukses menghapus pertanyaan!',
                                icon: 'success',
                                confirmButtonColor: '#3085d6',
                                confirmButtonText: 'Tutup',
                            })
                        ))
                    })
                }
            });
        }
    },
    mounted(){
        axios
        .get(this.port+'/test/all')
        .then(({data}) => (
            this.test = data,
            this.dataInit()
        ))
    }
}
</script>

<style>
    .instruksi{
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
</style>