<template>
    <h1 class="text-black text-2xl font-bold mt-7">Tes Belum Diselesaikan</h1>
    <div class="w-auto h-auto mt-2">
        <div class="h-56 w-60 mb-2 mr-2 inline-block align-top relative overflow-hidden cursor-pointer" v-for="(tes, i) in this.testList" :key="i">
            <div class="w-full h-full bg-white ring-1 ring-inset ring-stroke-200 rounded-lg overflow-hidden" @click="keSection(tes)">
                <!-- <div class="h-1/3 w-full bg-no-repeat bg-center" style="background-image: url('https://i.pinimg.com/originals/34/25/ba/3425baae5208366016cecb54cc16da61.jpg');"></div> -->
                <!-- <div class="h-1/3 w-full">
                    <img src="../../../src/assets/banner.jpeg" alt="">
                </div> -->
                <div class="h-full w-full px-5 py-2 text-black flex items-center justify-center" v-if="tes.id!=19">
                    <div class="text-3xl">
                        <i class="fas fa-file-alt mr-2"></i>
                        <span class="font-bold">{{tes.nama}}</span>
                    </div>
                    <!-- <div class="flex">
                        <div class="mr-2 inline-block">
                            <i class="fas fa-question-circle"></i> <br>
                            <i class="fas fa-clock"></i> <br>
                            <i class="fa fa-check"></i> <br>
                        </div>
                        <div>
                            <p>{{section.question_num}} Pertanyaan</p>

                            <p v-if="section.duration!=-1">{{section.duration}} Menit</p>
                            <p v-else>Tidak ada batas waktu</p>
                            
                            <p v-if="section.section_type==1" class="mb-6">Esai</p>
                            <p v-else-if="section.option_num==5">Pilihan Ganda (A - E)</p>
                            <p v-else-if="section.option_num==4">Pilihan Ganda (A - D)</p>
                            <p v-else-if="section.option_num==3">Pilihan Ganda (A - C)</p>
                            <p v-else-if="section.option_num==2">Pilihan Ganda (Benar/Salah)</p>
                        </div>
                    </div> -->
                </div>
                <div class="h-2/3 w-full px-5 py-2 text-black flex items-center justify-center" v-else>
                    <div class="text-3xl">
                        <i class="fas fa-file-alt mr-2"></i>
                        <span class="font-bold">{{tes.nama}}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="h-56 w-60 mb-2 mr-2 inline-block align-top relative overflow-hidden cursor-pointer">
            <div class="w-full h-full bg-white ring-1 ring-inset ring-stroke-200 rounded-lg overflow-hidden" @click="openModal">
                <!-- <div class="h-1/3 w-full bg-no-repeat bg-center" style="background-image: url('https://i.pinimg.com/originals/34/25/ba/3425baae5208366016cecb54cc16da61.jpg');"></div> -->
                <!-- <div class="h-1/3 w-full">
                    <img src="../../../src/assets/banner.jpeg" alt="">
                </div> -->
                <div class="h-full w-full px-5 py-2 text-black flex items-center justify-center">
                    <div class="flex items-center">
                        <i class="fas fa-file-alt mr-2 text-3xl"></i>
                        <span class="font-bold text-2xl text-center">Upload Kertas Buram</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Transparent Overlay -->
        <div id="bg" class="fixed top-0 left-0 w-screen h-screen bg-primary-1000 bg-opacity-60 hidden" @click="closeModal"></div>

        <!-- Create Upload Buram Modal -->
        <form id="modalBuram" name="formBuram" class="fixed left-1/4 bg-foreground-4-200 text-primary-1000 rounded-lg hidden" style="width: 50%; height: 80%; top: 10%" enctype="multipart/form-data" 
            @submit.prevent="uploadBuram">
            <div class="bg-primary-300 h-12 rounded-t-lg px-5 py-2 flex items-center">
                <p class="font-bold text-lg inline-block relative" style="width: 96%">Upload Kertas Buram</p>
                <button id="closeNewQuestion" class="relative inline-block" @click="closeModal">
                    <i class="fa fa-times fa-lg"></i>
                </button>
            </div>

            <div class="text-white p-5 h-5/6 relative">
                <div class="flex justify-center gap-2 h-full">
                    <div class="w-1/2">
                        <label for="gambar" class="rounded-md h-1/2 min-h-[20rem] my-3 flex justify-center items-center text-center 
                                    font-semibold text-xl"
                                    :class="{
                                        'border-dashed border-4 border-gray-400 border-inset': url1==null
                                    }">
                            <img v-if="url1!=null" :src="url1" alt="" class="h-auto w-auto max-h-full max-w-full">
                            <div v-else>
                                <p class="mb-2">Upload kertas buram anda</p>
                                <p>(Klik disini)</p>
                            </div>
                        </label>
                        <button class="bg-sky-300 text-primary-1000 hover:text-white hover:bg-primary-600 duration-300 text-white px-2 py-1 w-full rounded-md" @click="this.url1=null">
                            <i class="fa fa-trash-alt mr-2 text-xl"></i>
                            <span class="font-bold text-xl">Hapus</span>
                        </button>
                        <input type="file" name="gambar" id="gambar" class="hidden" @change="imageChange">
                    </div>

                    <div class="w-1/2">
                        <label for="gambar2" class="rounded-md h-1/2 min-h-[20rem] my-3 flex justify-center items-center text-center 
                                    font-semibold text-xl"
                                    :class="{
                                        'border-dashed border-4 border-gray-400 border-inset': url2==null
                                    }">
                            <img v-if="url2!=null" :src="url2" alt="" class="h-auto w-auto max-h-full max-w-full">
                            <div v-else>
                                <p>Upload kertas buram anda</p>
                                <p class="mb-2">(Opsional)</p>
                                <p>(Klik disini)</p>
                            </div>
                        </label>
                        <button class="bg-sky-300 text-primary-1000 hover:text-white hover:bg-primary-600 duration-300
                                        text-white px-2 py-1 w-full rounded-md" @click="this.url2=null">
                            <i class="fa fa-trash-alt mr-2 text-xl"></i>
                            <span class="font-bold text-xl">Hapus</span>
                        </button>
                        <input type="file" name="gambar2" id="gambar2" class="hidden" @change="imageChange2">
                    </div>
                </div>

                <button id="submit_new_question" class="absolute bottom-0 right-0 mr-5 rounded-lg px-10 py-2 bg-sky-300 text-primary-1000 hover:text-white hover:bg-primary-600 duration-300">
                                                        Upload</button>

            </div>
        </form>
        
        <div id="spinner-modal" class="fixed top-0 left-0 w-screen h-screen flex items-center bg-foreground-3-500 bg-opacity-70 justify-center z-20" style="display: none">
            <i class="fas fa-spinner animate-spin fa-7x inline-block text-foreground-4-100"></i>
        </div>
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
            abjad: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
            url1: null,
            url2: null,
            port: import.meta.env.VITE_BACKEND_URL
        }
    },
    props: {
        "testList": { type: Array, default: [], required: true },
    },
    methods: {
        keSection(tes){
            if(tes.id!=19){
                axios.post('/exam_session/updateCurrentTest',{
                    "id": this.$cookies.get('data_registrant').exam_session,
                    "test_id": tes.id
                }).then((response) => {
                    this.$router.push({path: '/section'})
                }).catch( error => { 
                    console.log('error: ' + error) 
                });
            }else{
                this.$router.push({path: '/biodata'})
            }
        },
        openModal(){
            $('#modalBuram').fadeIn("slow");
            $('#bg').fadeIn("slow");
        },
        closeModal(){
            $('#modalBuram').fadeOut("fast");
            $('#bg').fadeOut("slow");
        },
        imageChange(e){
            var input = e.target;
            if (input.files) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.url1 = e.target.result;
                }
                this.image=input.files[0];
                reader.readAsDataURL(input.files[0]);
            }
        },
        imageChange2(e){
            var input = e.target;
            if (input.files) {
                var reader = new FileReader();
                reader.onload = (e) => {
                    this.url2 = e.target.result;
                }
                this.image=input.files[0];
                reader.readAsDataURL(input.files[0]);
            }
        },
        uploadBuram(e){
            let gambar1 = document.forms['formBuram']['gambar'].files[0]
            let gambar2 = document.forms['formBuram']['gambar2'].files[0]

            if (gambar1 == undefined && gambar2 == undefined)
                Swal.fire({
                    title: 'Mohon Upload Minimal 1 Gambar!',
                    icon: 'warning',
                    confirmButtonText: 'Kembali'
                });
            else{
                let formData = new FormData()
                formData.append("email", this.$cookies.get('data_registrant').email)
                
                if(gambar1!=undefined)                        
                    formData.append("buram", gambar1)

                if(gambar2!=undefined)
                    formData.append("buram", gambar2)

                $('#spinner-modal').fadeIn("slow");
            
                let data_result = null
                axios.post(this.port+'/test/uploadBuram', formData)
                .then((response) => {
                    if (response.status==200){
                        Swal.fire(
                            'Sukses!',
                            'Kertas Buram berhasil diupload.',
                            'success'
                        )
                        .then(function(){
                            $('#spinner-modal').fadeOut("slow");
                        })
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
        // createQuestion(e){
        //     if (this.section_id!=null){
        //         if(e.target[1].files.length<=0)
        //             Swal.fire({
        //                 title: 'Mohon Isi Semua Field!',
        //                 icon: 'warning',
        //                 confirmButtonText: 'Kembali'
        //             });
        //         else{
        //             let file = e.target[1].files[0]
        //             if (file!=undefined)
        //                 file.originalname = file.name
        //             let extension = file.originalname.split('.')[1]
                    
        //             if(!['png','jpg','jpeg'].includes(extension))
        //                 Swal.fire({
        //                     title: 'Hanya dapat mengupload file dengan ekstensi .png, .jpg, atau .jpeg !',
        //                     icon: 'warning',
        //                     confirmButtonText: 'Kembali'
        //                 });

        //             let formData = new FormData()
        //             formData.append('section_id',this.test_id)
        //             formData.append('excel',file)
        //             axios.post(this.port+'/question/createFromExcel',formData, {headers: {
        //                 'Content-Type': 'multipart/form-data',
        //             }})
        //             .then((response) => {
        //                 if (response.status==200){
        //                     let thi = this
        //                     Swal.fire(
        //                         'Created!',
        //                         'Pertanyaan Berhasil Dibuat!',
        //                         'success'
        //                     )
        //                     .then(function(){
        //                         $('#modalSession').fadeOut("fast")
        //                         $('#bg').fadeOut("slow")
        //                         thi.closeModal()
        //                     })
        //                 }else{
        //                     throw response
        //                 }
        //             }).catch( error => {
        //                 $('#spinner-modal').fadeOut("slow");
        //                 Swal.fire(
        //                     'Warning!',
        //                     error.response.data,
        //                     'warning'
        //                 )
        //             });
        //         }
        //     }
        // },
    },
}
</script>

<style>

</style>