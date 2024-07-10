<template>
    <div class="z-10">
        <div class="w-9/12 h-full m-auto text-white relative mt-3 flex flex-col flex-grow pb-3 overflow-hidden">
            <div class="bg-foreground-3-500 w-full h-full rounded-xl text-black overflow-y-auto no-scrollbar py-5 px-5">
                <h1 class="text-3xl font-bold mb-2">Jawaban Tes {{this.section}}</h1>
                <div class="overflow-auto w-full h-auto max-h-[30rem] no-scrollbar mt-5 rounded-lg shadow-xl mb-10">
                    <table class="table-fixed w-full font-semibold">
                        <thead class="bg-foreground-4-100 text-white sticky top-0">
                            <tr>
                                <th class="w-2/12 py-2">No.</th>
                                <th class="w-8/12">Jawaban</th>
                                <th class="w-2/12">Hasil</th>
                                <th class="w-2/12">Skor</th>
                            </tr>
                        </thead>
                        <tbody v-if="this.dataJawaban!=null && this.question!=null">
                            <tr class="text-center odd:bg-foreground-4-50 even:bg-foreground-4-10" v-for="(i, idx) in this.dataJawaban" :key="idx">
                                <td>{{idx+1}}</td>
                                <td>{{tampilJawaban(i.answer, i.question_id)}}</td>
                                <!-- <td>{{i.answer==""?"-":i.answer.toUpperCase()}}</td> -->
                                <td>{{i.status_correct==0?"Salah":"Benar"}}</td>
                                <td>{{i.status_correct}}</td>
                            </tr>
                        </tbody>
                        <tbody v-else>
                            <tr class="text-center bg-foreground-4-50 text-xl">
                                <td colspan="3" class="py-5">Belum ada data tersedia</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
            <div class="h-32"></div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    components: {
        axios
    },
    data(){
        return{
            dataJawaban: null,
            email: this.$route.query.registrant,
            section_id: this.$route.query.section,
            section: null,
            question: null,
            port: import.meta.env.VITE_BACKEND_URL
        }
    },
    methods: {
        tampilJawaban(jawaban, id){
            let pertanyaan = this.question.find(x => x.id === id)
            if(pertanyaan.option_type==2) return jawaban.toUpperCase();
            else{
                if(pertanyaan.option_a!="-"){
                    let pilihan = ""
                    if(jawaban.toUpperCase()=="A") pilihan = ". "+pertanyaan.option_a;
                    else if(jawaban.toUpperCase()=="B") pilihan = ". "+pertanyaan.option_b;
                    else if(jawaban.toUpperCase()=="C") pilihan = ". "+pertanyaan.option_c;
                    else if(jawaban.toUpperCase()=="D") pilihan = ". "+pertanyaan.option_d;
                    else if(jawaban.toUpperCase()=="E") pilihan = ". "+pertanyaan.option_e;
                    return jawaban.toUpperCase()+pilihan;
                } 
                else return jawaban;

            }

            // return jawaban
        },
    },
    mounted() {
        axios
        .get(this.port+"/question_result/getbysection/"+this.section_id+"?email="+this.email)
        .then(({data}) => (
            this.dataJawaban = data
        ))

        
        axios
        .get(this.port+"/question/all?section_id="+this.section_id)
        .then(({data}) => (
            this.question = data
        ))
    },
    created(){
        this.$emit('updateHeader', 'Detail Jawaban')
    }
}
</script>

<style>

</style>