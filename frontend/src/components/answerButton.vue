<template>
    <!-- <button id="label" class="duration-200 w-full h-40 py-2 text-xl rounded-lg bg-background-200 hover:bg-background-300 font-semibold  -->
    <button id="label" class="duration-200 w-full px-2 py-2 mb-3 text-lg text-white rounded-lg bg-foreground-4-100 hover:bg-foreground-4-200 font-semibold 
                ring-1 ring-inset ring-black relative answer-btn md:text-xl
                lg:min-h-[10rem]" 
                :class="{
                    'lg:min-h-[2rem]': label.length==1,
                    'lg:min-h-[5rem]': jenis!==null && jenis==='hafalan',
                    'overflow-y-auto': jenis!==null & jenis==='ekspresi',
                    'lg:max-h-[16rem]': jenis!==null & jenis==='ekspresi',
                    'no-scrollbar': jenis!==null & jenis==='ekspresi'
                        }"
                @click.prevent="choose(label)">
        <div v-if="jenis === 'add'" class="flex justify-center px-4">
            <p>{{label}}.</p>
            <input type="text" name="question" id="question" class="w-full ml-2 text-xl bg-transparent outline-none
                                                    placeholder-stroke-100 border-none" placeholder="Answer">
            <div class="absolute bottom-3 right-3">
                <i v-if="jawaban[noSoal-1]===label" class="fa fa-check pilihan"></i>
            </div>
        </div>
        <div v-else-if="jenis === 'ekspresi'">
            <p>{{label}}</p>
            <div class="absolute bottom-3 right-3">
                <i v-if="jawaban[noSoal-1]!=null && jawaban[noSoal-1].split('|')[0]===label+'x'" class="fa fa-x pilihan"></i>
                <i v-else-if="jawaban[noSoal-1]!=null && jawaban[noSoal-1].split('|')[1]===label+'o'" class="far fa-circle pilihan"></i>
            </div>
        </div>
        <div v-else>
            <p>{{label}}</p>
            <div class="absolute bottom-3 right-3">
                <i v-if="jawaban[noSoal-1]===label" class="fa fa-check pilihan"></i>
            </div>
        </div>
    </button>
</template>

<script>
export default {
    props: {
        "jawaban": { type: Array, default: [], required: true },
        "noSoal": { type: Number, default: 1, required: true },
        "jenis": { type: String, default: '', required: true },
        "aksi": { type: String, default: 'x' },
        "label": { type: String, required: true },
        "warna": { default: "" },
    },
    methods: {
        choose(id){
            if (this.jenis=="ekspresi"){
                if(this.jawaban[this.noSoal-1]==null){
                    if(this.aksi=='x') this.jawaban[this.noSoal-1] = id+'x|'
                    else if(this.aksi=='o') this.jawaban[this.noSoal-1] = '|'+id+'o'
                }else{
                    var temp = this.jawaban[this.noSoal-1].split('|')
                    if(temp[0]==undefined) temp[0]=""
                    if(temp[1]==undefined) temp[1]=""

                    if(temp[0]!='' && (id.substring(0,1)==temp[0].substring(0,1))) this.jawaban[this.noSoal-1] = '|'+temp[1]
                    else if(temp[1]!='' && (id.substring(0,1)==temp[1].substring(0,1))) this.jawaban[this.noSoal-1] = temp[0]+'|'
                    else if(this.aksi=='x' && temp[1]!=id+'o') this.jawaban[this.noSoal-1] = id+'x|'+temp[1]
                    else if(this.aksi=='o' && temp[0]!=id+'x') this.jawaban[this.noSoal-1] = temp[0]+'|'+id+'o'
                }
                // console.log(this.jawaban[this.noSoal-1])
            }
            // else if(this.jenis=="MMPI"){
            //     if (id=="A. +") this.jawaban[this.noSoal-1] = 1
            //     else if (id=="B. -") this.jawaban[this.noSoal-1] = 0
            // }
            // else if(this.jenis=="SDI"){
            //     if (id=="Ya") this.jawaban[this.noSoal-1] = 1
            //     else if (id=="Tidak") this.jawaban[this.noSoal-1] = 0
            // }
            else this.jawaban[this.noSoal-1] = id
            
            this.$emit('setChangeds', true)
        },
    },
    created(){
        
    },
    mounted(){
        // else if(this.jenis=="ekspresi") this.ekspresiStyle()
    }
}
</script>