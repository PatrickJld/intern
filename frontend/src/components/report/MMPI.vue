<template>
    <div class="flex items-center w-full bg-foreground-4-100 px-4 py-2">
        <!-- <img src="../../assets/logo.png" alt="" class="w-14 h-10"> -->
        <div class="text-center bg-background-400 rounded-xl flex items-center px-1 h-12">
            <img src="../../assets/logo.png" alt="" class="w-14 h-10">
        </div>
        <div class="text-white text-center w-full relative bottom-2" v-if="print==='yes'">
            <p class="font-bold text-sm">PT. Adiputro Wirasejati</p>
            <div class="text-xs">
                <p>Jl. Raya Balearjosari no. 35, Malang, Jawa Timur - Indonesia 65126</p>
                <p>+62 (0) 341 491 139 | Adiputrogroup.com</p>
            </div>
        </div>
        <div class="text-white text-center w-full" v-if="print==='no'">
            <p class="font-bold text-sm">PT. Adiputro Wirasejati</p>
            <div class="text-[0.6rem]">
                <p>Jl. Raya Balearjosari no. 35, Malang, Jawa Timur - Indonesia 65126</p>
                <p>+62 (0) 341 491 139 | Adiputrogroup.com</p>
            </div>
        </div>
    </div>

    <div class="px-2 py-1">
        <div class="flex justify-between items-center relative" :class="{'bottom-2': print==='yes'}">
            <!-- <div class="flex w-1/2">
                <div class="font-bold text-xs">
                    <p>Nama :</p>
                </div>
                <div class="ml-2 text-xs">
                    <p>{{this.nama}}</p>
                </div>
            </div> -->
            
            <h1 class="font-bold">Hasil Jawaban Tes MMPI</h1>
            <div class="flex">
                <div class="font-bold text-sm">
                    <p>Nama :</p>
                </div>
                <div class="ml-3 text-sm">
                    <p>{{this.nama}}</p>
                </div>
            </div>
        </div>
        
        <div class="grow mt-1" v-if="arrTabel!=null">
            <div v-if="print==='no'">
                <div class="flex gap-2">
                    <table class="table-fixed border-collapse border-y-[1px] border-l-[1px] border-black w-1/3">
                        <tbody v-for="idx in 4" :key="idx" class="border-black border-b-[1px]">
                            <tr class="text-center">
                                <td class="border-black border-r-[0.5px] text-[0.45rem] font-bold p-0">{{this.arrTabel[idx-1].numbers[0]}}</td>
                                <td class="border-black border-r-[0.5px] text-[0.45rem] p-0">{{this.arrTabel[idx-1].answers[0]==1?"+":"-"}}</td>
                                <td class="border-black border-r-[0.5px] text-[0.45rem] p-0">{{this.arrTabel[idx-1].correct_data[0]}}</td>
                                <td class="border-black border-r-[1px] text-[0.45rem] p-0 w-10" :rowspan="arrTabel[idx-1].answers.length">
                                    <p class="font-bold">{{arrTabel[idx-1].jenis}}</p>
                                    <p>{{arrTabel[idx-1].sum_correct}}</p>
                                    <p>{{arrTabel[idx-1].keterangan}}</p>
                                </td>
                            </tr>
                            <tr class="text-center" v-for="i in arrTabel[idx-1].answers.length-1" :key="i">
                                <td class="border-black border-r-[0.5px] text-[0.45rem] font-bold p-0">{{this.arrTabel[idx-1].numbers[i]}}</td>
                                <td class="border-black border-r-[0.5px] text-[0.45rem] p-0">{{this.arrTabel[idx-1].answers[i]==1?"+":"-"}}</td>
                                <td class="border-black border-r-[0.5px] text-[0.45rem] p-0">{{this.arrTabel[idx-1].correct_data[i]}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="table-fixed border-collapse border-y-[1px] border-l-[1px] border-black w-1/3">
                        <tbody v-for="idx in [5,6,7]" :key="idx" class="border-black border-b-[1px]">
                            <tr class="text-center">
                                <td class="border-black border-r-[0.5px] text-[0.45rem] font-bold p-0">{{this.arrTabel[idx-1].numbers[0]}}</td>
                                <td class="border-black border-r-[0.5px] text-[0.45rem] p-0">{{this.arrTabel[idx-1].answers[0]==1?"+":"-"}}</td>
                                <td class="border-black border-r-[0.5px] text-[0.45rem] p-0">{{this.arrTabel[idx-1].correct_data[0]}}</td>
                                <td class="border-black border-r-[1px] text-[0.45rem] p-0 w-10" :rowspan="arrTabel[idx-1].answers.length">
                                    <p class="font-bold">{{arrTabel[idx-1].jenis}}</p>
                                    <p>{{arrTabel[idx-1].sum_correct}}</p>
                                    <p>{{arrTabel[idx-1].keterangan}}</p>
                                </td>
                            </tr>
                            <tr class="text-center" v-for="i in arrTabel[idx-1].answers.length-1" :key="i">
                                <td class="border-black border-r-[0.5px] text-[0.45rem] font-bold p-0">{{this.arrTabel[idx-1].numbers[i]}}</td>
                                <td class="border-black border-r-[0.5px] text-[0.45rem] p-0">{{this.arrTabel[idx-1].answers[i]==1?"+":"-"}}</td>
                                <td class="border-black border-r-[0.5px] text-[0.45rem] p-0">{{this.arrTabel[idx-1].correct_data[i]}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <table class="table-fixed border-collapse border-y-[1px] border-l-[1px] border-black w-1/3">
                        <tbody v-for="idx in [8,9]" :key="idx" class="border-black border-b-[1px]">
                            <tr class="text-center">
                                <td class="border-black border-r-[0.5px] text-[0.45rem] font-bold p-0">{{this.arrTabel[idx-1].numbers[0]}}</td>
                                <td class="border-black border-r-[0.5px] text-[0.45rem] p-0">{{this.arrTabel[idx-1].answers[0]==1?"+":"-"}}</td>
                                <td class="border-black border-r-[0.5px] text-[0.45rem] p-0">{{this.arrTabel[idx-1].correct_data[0]}}</td>
                                <td class="border-black border-r-[1px] text-[0.45rem] p-0 w-10" :rowspan="arrTabel[idx-1].answers.length">
                                    <p class="font-bold">{{arrTabel[idx-1].jenis}}</p>
                                    <p>{{arrTabel[idx-1].sum_correct}}</p>
                                    <p>{{arrTabel[idx-1].keterangan}}</p>
                                </td>
                            </tr>
                            <tr class="text-center" v-for="i in arrTabel[idx-1].answers.length-1" :key="i">
                                <td class="border-black border-r-[0.5px] text-[0.45rem] font-bold p-0">{{this.arrTabel[idx-1].numbers[i]}}</td>
                                <td class="border-black border-r-[0.5px] text-[0.45rem] p-0">{{this.arrTabel[idx-1].answers[i]==1?"+":"-"}}</td>
                                <td class="border-black border-r-[0.5px] text-[0.45rem] p-0">{{this.arrTabel[idx-1].correct_data[i]}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- <div class="flex gap-0.5 mb-2">
                    <table class="table-fixed border-collapse border-2 border-black w-1/3" v-for="idx in 3" :key="idx">
                        <thead class="bg-primary-900 text-white">
                            <tr>
                                <th class="font-bold" colspan="3"></th>
                            </tr>
                            <tr>
                                <th class="font-bold w-1/3">No.</th>
                                <th class="font-bold w-1/3">Jawab</th>
                                <th class="font-bold w-1/3">Hasil</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y-2 divide-black">
                            <tr class="text-center" v-for="i in arrTabel[idx-1].answers.length" :key="i">
                                <td class="border-black border-r-2 text-xs font-bold">{{this.arrTabel[idx-1].numbers[i-1]}}</td>
                                <td class="border-black border-r-2 text-xs">{{this.arrTabel[idx-1].answers[i-1]==1?"+":"-"}}</td>
                                <td class="border-black border-r-2 text-xs">{{this.arrTabel[idx-1].correct_data[i-1]}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div> -->
                
                <!-- <p class="font-bold">{{this.arrTabel[4].jenis}} ({{this.arrTabel[4].sum_correct}} - {{this.arrTabel[4].keterangan}})</p>
                <div class="flex gap-0.5">
                    <table class="table-fixed border-collapse border-2 border-black w-1/3" v-for="idx in 3" :key="idx">
                        <thead class="bg-primary-900 text-white">
                            <tr>
                                <th class="font-bold w-1/3">No.</th>
                                <th class="font-bold w-1/3">Jawab</th>
                                <th class="font-bold w-1/3">Hasil</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y-2 divide-black">
                            <tr class="text-center" v-for="i in 11" :key="i">
                                <td class="border-black border-r-2 text-xs font-bold" v-if="this.arrTabel[4].answers[((idx-1)*11)+(i-1)]!=undefined">{{this.arrTabel[4].numbers[((idx-1)*11)+(i-1)]}}</td>
                                <td class="border-black border-r-2 text-xs" v-if="this.arrTabel[4].answers[((idx-1)*11)+(i-1)]!=undefined">{{this.arrTabel[4].answers[((idx-1)*11)+(i-1)]==1?"+":"-"}}</td>
                                <td class="border-black border-r-2 text-xs" v-if="this.arrTabel[4].answers[((idx-1)*11)+(i-1)]!=undefined">{{this.arrTabel[4].correct_data[((idx-1)*11)+(i-1)]}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div> -->
            </div>      

            <div v-if="print==='yes'">
                <div class="flex gap-2">
                    <table class="table-fixed border-collapse border-y-[0.5px] border-l-[0.5px] border-black w-1/3">
                        <tbody v-for="idx in 4" :key="idx" class="border-black border-b-[1px]">
                            <tr class="text-center">
                                <td class="border-black border-r-[0.5px] text-[0.5rem] p-0"><span class="relative bottom-1.5">{{this.arrTabel[idx-1].numbers[0]}}</span></td>
                                <td class="border-black border-r-[0.5px] text-[0.5rem] p-0"><span class="relative bottom-1.5">{{this.arrTabel[idx-1].answers[0]==1?"+":"-"}}</span></td>
                                <td class="border-black border-r-[0.5px] text-[0.5rem] p-0"><span class="relative bottom-1.5">{{this.arrTabel[idx-1].correct_data[0]}}</span></td>
                                <td class="border-black border-r-[1px] text-[0.6rem] p-0 w-14" :rowspan="arrTabel[idx-1].answers.length">
                                    <p class="font-bold">{{arrTabel[idx-1].jenis}}</p>
                                    <p>{{arrTabel[idx-1].sum_correct}}</p>
                                    <p>{{arrTabel[idx-1].keterangan}}</p>
                                </td>
                            </tr>
                            <tr class="text-center" v-for="i in arrTabel[idx-1].answers.length-1" :key="i">
                                <td class="border-black border-r-[0.5px] text-[0.5rem] p-0"><span class="relative bottom-1.5">{{this.arrTabel[idx-1].numbers[i]}}</span></td>
                                <td class="border-black border-r-[0.5px] text-[0.5rem] p-0"><span class="relative bottom-1.5">{{this.arrTabel[idx-1].answers[i]==1?"+":"-"}}</span></td>
                                <td class="border-black border-r-[0.5px] text-[0.5rem] p-0"><span class="relative bottom-1.5">{{this.arrTabel[idx-1].correct_data[i]}}</span></td>
                            </tr>
                        </tbody>
                    </table>

                    <table class="table-fixed border-collapse border-y-[0.5px] border-l-[0.5px] border-black w-1/3">
                        <tbody v-for="idx in [5,6,7]" :key="idx" class="border-black border-b-[1px]">
                            <tr class="text-center">
                                <td class="border-black border-r-[0.5px] text-[0.5rem] p-0"><span class="relative bottom-1.5">{{this.arrTabel[idx-1].numbers[0]}}</span></td>
                                <td class="border-black border-r-[0.5px] text-[0.5rem] p-0"><span class="relative bottom-1.5">{{this.arrTabel[idx-1].answers[0]==1?"+":"-"}}</span></td>
                                <td class="border-black border-r-[0.5px] text-[0.5rem] p-0"><span class="relative bottom-1.5">{{this.arrTabel[idx-1].correct_data[0]}}</span></td>
                                <td class="border-black border-r-[1px] text-[0.6rem] p-0 w-14" :rowspan="arrTabel[idx-1].answers.length">
                                    <p class="font-bold">{{arrTabel[idx-1].jenis}}</p>
                                    <p>{{arrTabel[idx-1].sum_correct}}</p>
                                    <p>{{arrTabel[idx-1].keterangan}}</p>
                                </td>
                            </tr>
                            <tr class="text-center" v-for="i in arrTabel[idx-1].answers.length-1" :key="i">
                                <td class="border-black border-r-[0.5px] text-[0.5rem] p-0"><span class="relative bottom-1.5">{{this.arrTabel[idx-1].numbers[i]}}</span></td>
                                <td class="border-black border-r-[0.5px] text-[0.5rem] p-0"><span class="relative bottom-1.5">{{this.arrTabel[idx-1].answers[i]==1?"+":"-"}}</span></td>
                                <td class="border-black border-r-[0.5px] text-[0.5rem] p-0"><span class="relative bottom-1.5">{{this.arrTabel[idx-1].correct_data[i]}}</span></td>
                            </tr>
                        </tbody>
                    </table>

                    <table class="table-fixed border-collapse border-y-[0.5px] border-l-[0.5px] border-black w-1/3">
                        <tbody v-for="idx in [8,9]" :key="idx" class="border-black border-b-[1px]">
                            <tr class="text-center">
                                <td class="border-black border-r-[0.5px] text-[0.5rem] p-0"><span class="relative bottom-1.5">{{this.arrTabel[idx-1].numbers[0]}}</span></td>
                                <td class="border-black border-r-[0.5px] text-[0.5rem] p-0"><span class="relative bottom-1.5">{{this.arrTabel[idx-1].answers[0]==1?"+":"-"}}</span></td>
                                <td class="border-black border-r-[0.5px] text-[0.5rem] p-0"><span class="relative bottom-1.5">{{this.arrTabel[idx-1].correct_data[0]}}</span></td>
                                <td class="border-black border-r-[1px] text-[0.6rem] p-0 w-14" :rowspan="arrTabel[idx-1].answers.length">
                                    <p class="font-bold">{{arrTabel[idx-1].jenis}}</p>
                                    <p>{{arrTabel[idx-1].sum_correct}}</p>
                                    <p>{{arrTabel[idx-1].keterangan}}</p>
                                </td>
                            </tr>
                            <tr class="text-center" v-for="i in arrTabel[idx-1].answers.length-1" :key="i">
                                <td class="border-black border-r-[0.5px] text-[0.5rem] p-0"><span class="relative bottom-1.5">{{this.arrTabel[idx-1].numbers[i]}}</span></td>
                                <td class="border-black border-r-[0.5px] text-[0.5rem] p-0"><span class="relative bottom-1.5">{{this.arrTabel[idx-1].answers[i]==1?"+":"-"}}</span></td>
                                <td class="border-black border-r-[0.5px] text-[0.5rem] p-0"><span class="relative bottom-1.5">{{this.arrTabel[idx-1].correct_data[i]}}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <!-- <div class="flex gap-0.5 mb-2">
                    <table class="table-fixed border-collapse border-2 border-black w-1/3" v-for="idx in 3" :key="idx">
                        <thead class="bg-primary-900 text-white">
                            <tr>
                                <th class="font-bold" colspan="3">
                                    <span class="relative bottom-2">{{arrTabel[idx-1].jenis}} ({{arrTabel[idx-1].sum_correct}} - {{arrTabel[idx-1].keterangan}})</span>
                                </th>
                            </tr>
                            <tr>
                                <th class="font-bold w-1/3"><span class="relative bottom-2">No.</span></th>
                                <th class="font-bold w-1/3"><span class="relative bottom-2">Jawab</span></th>
                                <th class="font-bold w-1/3"><span class="relative bottom-2">Hasil</span></th>
                            </tr>
                        </thead>
                        <tbody class="divide-y-2 divide-black">
                            <tr class="text-center" v-for="i in arrTabel[idx-1].answers.length" :key="i">
                                <td class="border-black border-r-2 text-xs font-bold">
                                    <span class="relative bottom-2">{{this.arrTabel[idx-1].numbers[i-1]}}</span>
                                </td>
                                <td class="border-black border-r-2 text-xs">
                                    <span class="relative bottom-2">{{this.arrTabel[idx-1].answers[i-1]==1?"+":"-"}}</span>
                                </td>
                                <td class="border-black border-r-2 text-xs">
                                <span class="relative bottom-2">{{this.arrTabel[idx-1].correct_data[i-1]}}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div> -->
                
                <!-- <p class="font-bold mb-3">{{this.arrTabel[4].jenis}} ({{this.arrTabel[4].sum_correct}} - {{this.arrTabel[4].keterangan}})</p>
                <div class="flex gap-0.5">
                    <table class="table-fixed border-collapse border-2 border-black w-1/3" v-for="idx in 3" :key="idx">
                        <thead class="bg-primary-900 text-white">
                            <tr>
                                <th class="font-bold w-1/3"><span class="relative bottom-2">No.</span></th>
                                <th class="font-bold w-1/3"><span class="relative bottom-2">Jawab</span></th>
                                <th class="font-bold w-1/3"><span class="relative bottom-2">Hasil</span></th>
                            </tr>
                        </thead>
                        <tbody class="divide-y-2 divide-black">
                            <tr class="text-center" v-for="i in 11" :key="i">
                                <td class="border-black border-r-2 text-xs font-bold" v-if="this.arrTabel[4].answers[((idx-1)*11)+(i-1)]!=undefined">
                                    <span class="relative bottom-2">{{this.arrTabel[4].numbers[((idx-1)*11)+(i-1)]}}</span>
                                </td>
                                <td class="border-black border-r-2 text-xs" v-if="this.arrTabel[4].answers[((idx-1)*11)+(i-1)]!=undefined">
                                    <span class="relative bottom-2">{{this.arrTabel[4].answers[((idx-1)*11)+(i-1)]==1?"+":"-"}}</span>
                                </td>
                                <td class="border-black border-r-2 text-xs" v-if="this.arrTabel[4].answers[((idx-1)*11)+(i-1)]!=undefined">
                                    <span class="relative bottom-2">{{this.arrTabel[4].correct_data[((idx-1)*11)+(i-1)]}}</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div> -->
            </div>
        </div>
    </div>
    
    <!-- <div class="text-xs mb-2">
        <div class="w-full">
            
        </div>
    </div> -->
</template>

<script>
export default {
    props: {
        "data": { type: Object, default: [], required: true },
        "nama": { type: String, default: "", required: true },
        "print": { type: String, default: 'no', required: true },
    },
    data() {
        return {
            arrTabel: null,
            bio: null
        }
    },
    mounted() {
        this.arrTabel = this.data
        // this.bio = this.biodata
        // console.log(this.bio)
        // console.log(this.arrTabel)
    },
}
</script>

<style>

</style>