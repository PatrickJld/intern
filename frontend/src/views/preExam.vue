<template>
    <div class="h-screen w-9/12 m-auto relative z-10">
        <!-- <div class="flex justify-center mt-3">
            <img src="../assets/logo.png" alt="" class="w-20 mb-5">
        </div> -->
        <div class="mb-3 flex justify-center">
            <div class="text-center bg-background-400 rounded-full flex justify-center py-2 px-3 mt-1 w-32">
                <img src="../assets/logo.png" alt="" class="w-20">
            </div>
        </div>
        <div>
            <button class="bg-foreground-4-100 hover:bg-foreground-4-200 text-white px-3 py-1 rounded-md" @click="this.$router.go(-1)">
                <i class="fa fa-chevron-left mr-2 text-xl"></i>
                <span class="font-bold text-xl">Kembali</span>
            </button>
        </div>

        <div class="text-center w-full h-auto">
            <div class="h-full w-full mt-5 mr-2 inline-block align-top relative
                        md:w-9/12">
                <div class="w-full h-full bg-foreground-3-500 rounded-lg overflow-hidden">
                    <!-- <div class="h-32 w-full bg-no-repeat bg-center" style="background-image: url('https://i.pinimg.com/originals/34/25/ba/3425baae5208366016cecb54cc16da61.jpg');"></div> -->
                    <div class="h-full w-full">
                        <img src="../../../src/assets/banner_cropped.jpeg" alt="">
                    </div>
                    <div class="h-3/4 w-full px-10 py-5 text-black font-bold text-left" v-if="section!=null">
                        <p class="mb-1 text-2xl md:text-3xl">{{namaTes}}</p>
                        <p class="mb-2 font-semibold md:text-lg" v-html="section.instruction"></p>
                        <div class="text-right">
                            <!-- <a href="https://drive.google.com/uc?export=download&id=1IxMggwjWTXpAQtYsN4ITw8XIEDiJ395z"  -->
                            <a href="https://drive.google.com/uc?export=download&id=15SVSr0ujhjaXeD_3KIxrFfzDFS8ZqHcg" 
                                v-show="this.sectionId==85"
                                class="bg-foreground-4-100 hover:bg-foreground-4-200 text-white px-3 py-1 rounded-md cursor-pointer">
                                <span class="font-bold text-xl">Unduh Template</span>
                            </a>
                        </div>
                        <div class="md:flex justify-between items-center mb-2">
                            <div class="flex p-2">
                                <div class="mr-2 text-lg md:text-xl">
                                    <i class="fas fa-file-alt"></i> <br>
                                    <i class="fas fa-clock"></i> <br>
                                    <i class="fa fa-check"></i> <br>
                                </div>
                                <div class="mb-2 text-lg md:text-xl">
                                    <p>{{section.question_num}} Pertanyaan</p>

                                    <p v-if="section.duration!=-1">{{section.duration}} Menit</p>
                                    <p v-else>Tidak ada batas waktu</p>
                                    
                                    <p v-if="section.section_type==2" class="text-xl">Pilihan Ganda (A - {{abjad[section.option_num-1]}})</p>
                                    <p v-else class="mb-5">Esai</p>
                                </div>
                            </div>
                            <img v-if="sectionId==6" src="../assets/gif_deret_bilangan.gif" alt="" class="w-full md:w-2/3 xl:w-1/2">
                            <div v-else-if="urlContoh.length>0" class="w-full md:w-2/3 xl:w-1/2 relative">
                                <div v-if="noContoh>0" class="bg-white rounded-full absolute cursor-pointer px-2 py-1 bg-opacity-0 hover:bg-opacity-75 duration-200" style="top: 42%; left: -8.5%;" @click="noContoh--">
                                    <i class="fa fa-angle-left fa-2xl"></i>
                                </div>
                                <img :src="'./Contoh_Soal/'+this.urlContoh[this.noContoh]+'.gif'" alt="">
                                <div v-if="noContoh<urlContoh.length-1" class="bg-white rounded-full absolute cursor-pointer px-2 py-1 bg-opacity-0 hover:bg-opacity-75 duration-200" style="top: 42%; right: -8.5%;" @click="noContoh++">
                                    <i class="fa fa-angle-right fa-2xl"></i>
                                </div>
                            </div>
                            <!-- <img v-else-if="urlContoh.length>0" :src=`../assets/Contoh_Soal/${}.gif` alt="" class="w-full md:w-2/3 xl:w-1/2"> -->
                        </div>
                        <div class="text-center">
                            <button class="bg-foreground-4-100 hover:bg-foreground-4-200 text-white w-2/3 py-1 rounded-full" @click.prevent="doTest">
                                <i class="fa fa-play mr-2 text-xl"></i>
                                <span class="font-bold text-xl">Mulai</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- <div class="w-full h-screen overflow-hidden">
        <p class="text-2xl font-bold text-white ml-5 my-6">{{judulHalaman}}</p>
        <div class="overflow-auto no-scrollbar h-screen w-full relative px-10">
            <Skippable v-if="this.section!=null" :sectionList="this.section"/>
            <div class="w-1 h-28"></div>
        </div>
    </div> -->
</template>

<script>
import axios from 'axios'

export default {
    components: {
        axios
    },
    data(){
        return{
            judulHalaman: 'Persiapan Tes',
            section: null,
            sectionId: null,
            testId: null,
            namaTes: "",
            abjad: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],
            alias: [1,2,21,5,8,6,10,7,9,11,12,15,13,14,18,16,17,3,4,20,19],
            port: import.meta.env.VITE_BACKEND_URL,
            noContoh: 0,
            urlContoh: []
        }
    },
    methods: {
        async getCurrentTest(exam_session){
            exam_session = await axios.get(this.port+'/exam_session/' + exam_session);
            return exam_session.data.current_test;
        },
        doTest(){
            let age =  7 * 24 * 60 * 60 * 1000;
            this.$cookies.set('start_time', Date.now())
            if(this.sectionId==53)
                this.$router.push({path: '/kraepelin'})
            else if(this.testId==7)
                this.$router.push({path: '/ekspresi'})
            else if(this.testId == 18 || this.testId == 2)
                this.$router.push({path: '/epps'})
            else if(this.testId==20)
                this.$router.push({path: '/gambar'})
            else if(this.testId==21)
                this.$router.push({path: '/hafalan'})
            else if(this.sectionId==69)
                this.$router.push({path: '/hafalanIST'})
            else
                this.$router.push({path: '/test'})
        }
    },
    created(){
        this.$emit('updateJudul', this.judulHalaman)
    },
    async mounted(){
        this.testId = await this.getCurrentTest(this.$cookies.get('data_registrant').exam_session)
        this.sectionId = this.$cookies.get('current_section').id
        axios
        .get(this.port+'/section/'+this.sectionId)
        .then(({data}) => (
            this.section = data
        ))
        
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
                    if(id==this.testId)
                        this.namaTes = "TES "+this.abjad[counter]
                    else{
                        counter++
                    }
                    break;
                }
            }
        }
        // this.namaTes = "TES "+this.alias[this.testId-1]

        if(this.testId==6) this.urlContoh = ["Berhitung1", "Berhitung2"]
        else if(this.testId==8) this.urlContoh = ["Penalaran1", "Penalaran2"]
        else if(this.testId==11) this.urlContoh = ["RuangBidang1", "RuangBidang2", "RuangBidang3", "RuangBidang4", "RuangBidang5"]
        else if(this.testId==12) this.urlContoh = ["DPM"]
        else if(this.testId==13) this.urlContoh = ["Komponen1", "Komponen2"]
        else if(this.testId==14) this.urlContoh = ["Merakit1", "Merakit2"]
        else if(this.testId==15) this.urlContoh = ["PenalaranMekanik1","PenalaranMekanik2","PenalaranMekanik3"]
        else if(this.sectionId==9) this.urlContoh = ["Tintum9"]
        else if(this.sectionId==10) this.urlContoh = ["Tintum101","Tintum102"]
        else if(this.sectionId==67) this.urlContoh = ["IST71", "IST72", "IST73", "IST74"]
        else if(this.sectionId==68) this.urlContoh = ["IST8"]
        else if(this.sectionId==79) this.urlContoh = ["TintumAnak81","TintumAnak82"]
        else if(this.sectionId==80) this.urlContoh = ["TintumAnak9"]
    },
}
</script>

<style>

</style>