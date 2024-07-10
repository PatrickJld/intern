<template>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
        <div>
            <div id="carouselFirst" class="carousel carousel-slider center mt-10 rounded-lg">
                <div class="carousel-fixed-item center clearfix px-5">
                    <a id="carousel-prev" class="prev btn waves-effect blue white-text left">
                        <i class="fas fa-angle-left mr-2"></i>
                        <span>prev</span>
                    </a>
                    
                    <div class="text-xl inline-block center">
                    </div>
                    <a id="carousel-next" class="next btn waves-effect blue white-text right">
                        <span>next</span>
                        <i class="fas fa-angle-right ml-2"></i>
                    </a>
                </div>
                <div class="carousel-item even:bg-foreground-4-200 odd:bg-foreground-4-100 white-text h-96 text-center relative" v-for="(section, idx) in this.sectionList" :key="idx">
                    <div class="text-3xl mt-5 w-auto mb-2 md:text-4xl">
                        <i class="fas fa-file-alt mr-2"></i>
                        <span>Persoalan {{idx+1}}</span>
                    </div>
                    <div class="border-t-4 border-white w-1/2 inline-block"></div>
                    <br>
                    <div class="w-auto inline-block mt-3">
                        <div class="p-2 flex content relative">
                            <div class="text-xl mr-3 md:text-2xl">
                                <i class="fas fa-file-alt"></i> <br>
                                <i class="fas fa-clock"></i> <br>
                                <i class="fa fa-check"></i> <br>
                            </div>
                            <div class="text-xl text-left md:text-2xl">
                                <div>{{section.question_num}} Pertanyaan</div>

                                <div v-if="section.duration!=-1">{{section.duration}} Menit</div>
                                <div v-else>Tidak ada batas waktu</div>

                                <div v-if="section.section_type==2 && section.option_num>1">Pilihan Ganda (A - {{alphabet[section.option_num-1]}})</div>
                                <div v-else>Esai</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="text-xl mt-3 px-10 text-center">
                        <div v-if="section.id<this.now" class="w-full ring-2 ring-inset ring-white duration-300 px-5 py-2.5 rounded-full cursor-pointer inline-block
                                                                md:w-1/3">
                            <span>Persoalan sudah selesai</span>
                            <i class="fa fa-check ml-5"></i>
                        </div>

                        <button v-if="section.id==this.now" class="w-full ring-2 ring-inset ring-white hover:bg-primary-200 hover:text-primary-900 hover:ring-primary-900 
                                    duration-300 px-5 py-2.5 rounded-full cursor-pointer
                                    md:w-1/3"
                                    @click="kePreExam(section.id)">
                            <span>Kerjakan persoalan ini</span>
                            <i class="fa fa-feather ml-5"></i>
                        </button>
                                    
                        <div v-if="section.id>this.now" class="w-full md:w-1/2 ring-2 ring-inset ring-white duration-300 px-5 py-2.5 rounded-full cursor-pointer inline-block">
                            <span>Selesaikan persoalan sebelumnya dahulu</span>
                            <i class="fa fa-lock ml-5"></i>
                        </div>
                    </div>
                </div>
            </div>
        <!-- <div class="carousel">
            <a class="carousel-item">
                <div class="w-64 h-64 bg-primary-800 text-white p-2 rounded-xl">
                    <div class="mb-1">
                    <i class="fas fa-file-alt mr-2"></i>
                    <span class="text-lg font-bold">Tes 1</span>
                    </div>
                    <hr class="mb-1">
                    <div class="p-2 flex content relative">
                        <div class="mr-2 inline-block">
                            <i class="fas fa-file-alt"></i> <br>
                            <i class="fas fa-clock"></i> <br>
                            <i class="fa fa-check"></i> <br>
                        </div>
                        <div>
                            <p>20 Questions</p>
                            <p>6 Minutes</p>
                            <p>Multiple Choices (A - E)</p>
                        </div>
                    </div>
                    <div class="text-center mt-2">
                        <button class="bg-primary-500 px-3 py-2 rounded-full">
                                        <i class="fa fa-check mr-2"></i>
                                        <span>Sudah Selesai</span>
                                        </button>
                    </div>
                </div>
            </a>

            <a class="carousel-item">
                <div class="w-64 h-64 bg-primary-800 text-white p-2 rounded-xl">
                    <div class="mb-1">
                    <i class="fas fa-file-alt mr-2"></i>
                    <span class="text-lg font-bold">Tes 2</span>
                    </div>
                    <hr class="mb-1">
                    <div class="p-2 flex content relative">
                        <div class="mr-2 inline-block">
                            <i class="fas fa-file-alt"></i> <br>
                            <i class="fas fa-clock"></i> <br>
                            <i class="fa fa-check"></i> <br>
                        </div>
                        <div>
                            <p>20 Questions</p>
                            <p>6 Minutes</p>
                            <p>Multiple Choices (A - E)</p>
                        </div>
                    </div>
                    
                </div>
            </a>

            <a class="carousel-item" v-for="i in 5" :key="i">
                <div class="w-64 h-64 bg-primary-800 text-white p-2 rounded-xl">
                    <div class="mb-1">
                    <i class="fas fa-file-alt mr-2"></i>
                    <span class="text-lg font-bold">Tes {{i+2}}</span>
                    </div>
                    <hr class="mb-1">
                    <div class="p-2 flex content relative">
                        <div class="mr-2 inline-block">
                            <i class="fas fa-file-alt"></i> <br>
                            <i class="fas fa-clock"></i> <br>
                            <i class="fa fa-check"></i> <br>
                        </div>
                        <div>
                            <p>20 Questions</p>
                            <p>6 Minutes</p>
                            <p>Multiple Choices (A - E)</p>
                        </div>
                    </div>
                    <div class="text-center mt-2">
                        <button class="bg-primary-300 px-3 py-2 rounded-full">
                                        <i class="fa fa-lock mr-2"></i>
                                        <span>Kerjakan Tes Sebelumnya Terlebih Dahulu</span>
                        </button>
                    </div>
                </div>
            </a>
        </div>    -->
    </div>
</template>

<script>
export default {
    props: {
        "sectionList": { type: Array, default: [], required: true },
        "now": { type: Number, default: 0, required: true },
    },
    data() {
        return {
            alphabet: ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
        }
    },
    methods: {
        persoalanSekarang(){
            let idx = 0;
            for (let i = 0; i < this.sectionList.length; i++) {
                if (this.sectionList[i].id == this.now){
                    idx = i
                }
            }
            let instance = M.Carousel.getInstance($('.carousel.carousel-slider'))
            instance.set(idx)
        },
        kePreExam(id){
            this.$cookies.set('current_section', {"id": id})
            this.$router.push({path: '/preExam'})
        }
    },
    mounted() {
        $('.carousel.carousel-slider').carousel({
            fullWidth: true,
            indicators: true
        });

        $('.next').click(function(e){
                e.preventDefault();
                e.stopPropagation();
                $('.carousel').carousel('next');
        });

        $('.prev').click(function(e){
                e.preventDefault();
                e.stopPropagation();
                $('.carousel').carousel('prev');
        });

        this.persoalanSekarang()
    },
};
</script>

<style>

</style>