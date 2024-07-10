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
        <div class="flex mt-2" v-if="this.bio!=null">
            <div class="flex">
                <div class="font-bold text-sm">
                    <p>Nama</p>
                    <p>Jenis Kelamin (L/P)</p>
                </div>
                <div class="ml-2 text-sm">
                    <p>: {{this.bio[0].email}}</p>
                    <p>: {{this.bio[0].jenis_kelamin}}</p>
                </div>
            </div>
            
            <div class="flex ml-3">
                <div class="font-bold text-sm">
                    <p>Pendidikan</p>
                    <p>Jurusan</p>
                </div>
                <div class="ml-3 text-sm">
                    <p>: {{this.bio[0].pendidikan}}</p>
                    <p>: {{this.bio[0].jurusan.toUpperCase()}}</p>
                </div>
            </div>
        </div>
        
        <div class="grow text-sm mt-3" v-if="arrTabel!=null">
            <div v-if="print==='no'">
                <table class="table-fixed border-collapse border-2 border-black w-full mb-2 divide-y-2 divide-black">
                    <tr>
                        <th class="font-bold w-1/4 border-black border-r-2">Panker</th>
                        <td class="w-1/8 px-2">{{this.arrTabel.panker.val}}</td>
                        <td class="w-1/8 font-bold border-black border-r-2">{{this.arrTabel.panker.analisis}}</td>

                        <th class="font-bold w-1/4 border-black border-r-2">Janker</th>
                        <td class="w-1/8 px-2">{{this.arrTabel.janker.val}}</td>
                        <td class="w-1/8 font-bold">({{this.arrTabel.janker.analisis}})</td>
                    </tr>
                    <tr>
                        <th class="font-bold w-1/4 border-black border-r-2">Hanker</th>
                        <td class="w-1/8 px-2">{{this.arrTabel.hanker.val}}</td>
                        <td class="w-1/8 font-bold border-black border-r-2">({{this.arrTabel.hanker.analisis}})</td>

                        <th class="font-bold w-1/4 border-black border-r-2">Tianker</th>
                        <td class="w-1/8 px-2">{{this.arrTabel.tianker.val}}</td>
                        <td class="w-1/8 font-bold">({{this.arrTabel.tianker.analisis}})</td>
                    </tr>
                </table>
            </div>

            <div v-else-if="print==='yes'">
                <table class="table-fixed border-collapse border-2 border-black w-full mb-2 divide-y-2 divide-black">
                    <tr>
                        <th class="font-bold w-1/4 border-black border-r-2"><span class="relative bottom-2">Panker</span></th>
                        <td class="w-1/8 px-2"><span class="relative bottom-2">{{this.arrTabel.panker.val}}</span></td>
                        <td class="w-1/8 font-bold border-black border-r-2"><span class="relative bottom-2">{{this.arrTabel.panker.analisis}}</span></td>

                        <th class="font-bold w-1/4 border-black border-r-2"><span class="relative bottom-2">Janker</span></th>
                        <td class="w-1/8 px-2"><span class="relative bottom-2">{{this.arrTabel.janker.val}}</span></td>
                        <td class="w-1/8 font-bold"><span class="relative bottom-2">({{this.arrTabel.janker.analisis}})</span></td>
                    </tr>
                    <tr>
                        <th class="font-bold w-1/4 border-black border-r-2"><span class="relative bottom-2">Hanker</span></th>
                        <td class="w-1/8 px-2"><span class="relative bottom-2">{{this.arrTabel.hanker.val}}</span></td>
                        <td class="w-1/8 font-bold border-black border-r-2"><span class="relative bottom-2">({{this.arrTabel.hanker.analisis}})</span></td>

                        <th class="font-bold w-1/4 border-black border-r-2"><span class="relative bottom-2">Tianker</span></th>
                        <td class="w-1/8 px-2"><span class="relative bottom-2">{{this.arrTabel.tianker.val}}</span></td>
                        <td class="w-1/8 font-bold"><span class="relative bottom-2">({{this.arrTabel.tianker.analisis}})</span></td>
                    </tr>
                </table>
            </div>
            

            <h1 class="font-bold mb-2">Perhitungan Regresi Linear</h1>
            <div v-if="print==='no'">
                <table class="table-fixed border-collapse border-2 border-black w-full mb-2 divide-y-2 divide-black">
                    <tr>
                        <th class="font-bold w-1/4 border-black border-r-2">N</th>
                        <td class="w-1/4 px-2 border-black border-r-2">50</td>

                        <th class="font-bold w-1/4 border-black border-r-2">(&sum;x)²</th>
                        <td class="w-1/4 px-2 ">{{this.arrTabel.pow_sum_x}}</td>
                    </tr>
                    <tr>
                        <th class="font-bold w-1/4 border-black border-r-2">&sum;x</th>
                        <td class="w-1/4 px-2 border-black border-r-2">{{this.arrTabel.sum_x}}</td>

                        <th class="font-bold w-1/4 border-black border-r-2">a</th>
                        <td class="w-1/4 px-2">{{this.arrTabel.a}}</td>
                    </tr>
                    <tr>
                        <th class="font-bold w-1/4 border-black border-r-2">&sum;y</th>
                        <td class="w-1/4 px-2 border-black border-r-2">{{this.arrTabel.sum_y}}</td>

                        <th class="font-bold w-1/4 border-black border-r-2">b</th>
                        <td class="w-1/4 px-2">{{this.arrTabel.b}}</td>
                    </tr>
                    <tr>
                        <th class="font-bold w-1/4 border-black border-r-2">&sum;xy</th>
                        <td class="w-1/4 border-black border-r-2 px-2">{{this.arrTabel.sum_xy}}</td>

                        <th class="font-bold w-1/4 border-black border-r-2">X</th>
                        <td class="w-1/4 px-2">{{this.arrTabel.x}}</td>
                    </tr>
                    <tr>
                        <th class="font-bold w-1/4 border-black border-r-2">&sum;x²</th>
                        <td class="w-1/4 border-black border-r-2 px-2">{{this.arrTabel.sum_pow_x}}</td>

                        <th class="font-bold w-1/4 border-black border-r-2">Y</th>
                        <td class="w-1/4 px-2">{{this.arrTabel.y}}</td>
                    </tr>
                    <tr>
                        <th class="font-bold w-1/4 border-black border-r-2"><span class="relative bottom-2"></span>(&sum;x)(&sum;y)</th>
                        <td class="w-1/4 border-black border-r-2 px-2"><span class="relative bottom-2"></span>{{this.arrTabel.sum_x_sum_y}}</td>
                    </tr>
                </table>
            </div>

            <div v-else-if="print==='yes'">
                <table class="table-fixed border-collapse border-2 border-black w-full mb-2 divide-y-2 divide-black">
                    <tr>
                        <th class="font-bold w-1/4 border-black border-r-2"><span class="relative bottom-2">N</span></th>
                        <td class="w-1/4 px-2 border-black border-r-2"><span class="relative bottom-2">50</span></td>

                        <th class="font-bold w-1/4 border-black border-r-2"><span class="relative bottom-2">(sum x)²</span></th>
                        <td class="w-1/4 px-2"><span class="relative bottom-2">{{this.arrTabel.pow_sum_x}}</span></td>
                    </tr>
                    <tr>
                        <th class="font-bold w-1/4 border-black border-r-2"><span class="relative bottom-2">sum x</span></th>
                        <td class="w-1/4 px-2 border-black border-r-2"><span class="relative bottom-2">{{this.arrTabel.sum_x}}</span></td>

                        <th class="font-bold w-1/4 border-black border-r-2"><span class="relative bottom-2">a</span></th>
                        <td class="w-1/4 px-2"><span class="relative bottom-2">{{this.arrTabel.a}}</span></td>
                    </tr>
                    <tr>
                        <th class="font-bold w-1/4 border-black border-r-2"><span class="relative bottom-2">sum y</span></th>
                        <td class="w-1/4 px-2 border-black border-r-2"><span class="relative bottom-2">{{this.arrTabel.sum_y}}</span></td>

                        <th class="font-bold w-1/4 border-black border-r-2"><span class="relative bottom-2">b</span></th>
                        <td class="w-1/4 px-2"><span class="relative bottom-2">{{this.arrTabel.b}}</span></td>
                    </tr>
                    <tr>
                        <th class="font-bold w-1/4 border-black border-r-2"><span class="relative bottom-2">sum xy</span></th>
                        <td class="w-1/4 border-black border-r-2 px-2"><span class="relative bottom-2">{{this.arrTabel.sum_xy}}</span></td>

                        <th class="font-bold w-1/4 border-black border-r-2"><span class="relative bottom-2">X</span></th>
                        <td class="w-1/4 px-2"><span class="relative bottom-2">{{this.arrTabel.x}}</span></td>
                    </tr>
                    <tr>
                        <th class="font-bold w-1/4 border-black border-r-2"><span class="relative bottom-2">sum x²</span></th>
                        <td class="w-1/4 border-black border-r-2 px-2"><span class="relative bottom-2">{{this.arrTabel.sum_pow_x}}</span></td>

                        <th class="font-bold w-1/4 border-black border-r-2"><span class="relative bottom-2">Y</span></th>
                        <td class="w-1/4 px-2"><span class="relative bottom-2">{{this.arrTabel.y}}</span></td>
                    </tr>
                    <tr>
                        <th class="font-bold w-1/4 border-black border-r-2"><span class="relative bottom-2">(sum x)(sum y)</span></th>
                        <td class="w-1/4 border-black border-r-2 px-2"><span class="relative bottom-2">{{this.arrTabel.sum_x_sum_y}}</span></td>
                    </tr>
                </table>
            </div>
            
            <div class="flex gap-2" v-if="print==='no'">
                <table class="table-fixed border-collapse border-2 border-black w-1/5">
                    <thead class="bg-primary-900 text-white">
                        <tr>
                            <th class="font-bold w-1/12">x</th>
                            <th class="font-bold w-1/12">y</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y-2 divide-black">
                        <tr class="text-center" v-for="idx in 10" :key="idx">
                            <td class="border-black border-r-2 text-xs font-bold">{{this.arrTabel.ori_datas[idx-1].x}}</td>
                            <td class="text-xs">{{this.arrTabel.ori_datas[idx-1].y}}</td>
                        </tr>
                    </tbody>
                </table>
                <table class="table-fixed border-collapse border-2 border-black w-1/5">
                    <thead class="bg-primary-900 text-white">
                        <tr>
                            <th class="font-bold w-1/12">x</th>
                            <th class="font-bold w-1/12">y</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y-2 divide-black">
                        <tr class="text-center" v-for="idx in 10" :key="idx">
                            <td class="border-black border-r-2 text-xs font-bold">{{this.arrTabel.ori_datas[idx+9].x}}</td>
                            <td class="text-xs">{{this.arrTabel.ori_datas[idx+9].y}}</td>
                        </tr>
                    </tbody>
                </table>
                
                <table class="table-fixed border-collapse border-2 border-black w-1/5">
                    <thead class="bg-primary-900 text-white">
                        <tr>
                            <th class="font-bold w-1/12">x</th>
                            <th class="font-bold w-1/12">y</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y-2 divide-black">
                        <tr class="text-center" v-for="idx in 10" :key="idx">
                            <td class="border-black border-r-2 text-xs font-bold">{{this.arrTabel.ori_datas[idx+19].x}}</td>
                            <td class="text-xs">{{this.arrTabel.ori_datas[idx+19].y}}</td>
                        </tr>
                    </tbody>
                </table>
                
                <table class="table-fixed border-collapse border-2 border-black w-1/5">
                    <thead class="bg-primary-900 text-white">
                        <tr>
                            <th class="font-bold w-1/12">x</th>
                            <th class="font-bold w-1/12">y</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y-2 divide-black">
                        <tr class="text-center" v-for="idx in 10" :key="idx">
                            <td class="border-black border-r-2 text-xs font-bold">{{this.arrTabel.ori_datas[idx+29].x}}</td>
                            <td class="text-xs">{{this.arrTabel.ori_datas[idx+29].y}}</td>
                        </tr>
                    </tbody>
                </table>
                
                <table class="table-fixed border-collapse border-2 border-black w-1/5">
                    <thead class="bg-primary-900 text-white">
                        <tr>
                            <th class="font-bold w-1/12">x</th>
                            <th class="font-bold w-1/12">y</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y-2 divide-black">
                        <tr class="text-center" v-for="idx in 10" :key="idx">
                            <td class="border-black border-r-2 text-xs font-bold">{{this.arrTabel.ori_datas[idx+39].x}}</td>
                            <td class="text-xs">{{this.arrTabel.ori_datas[idx+39].y}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="flex gap-2" v-else-if="print==='yes'">
                <table class="table-fixed border-collapse border-2 border-black w-1/5">
                    <thead class="bg-primary-900 text-white">
                        <tr>
                            <th class="font-bold w-1/12"><span class="relative bottom-2">x</span></th>
                            <th class="font-bold w-1/12"><span class="relative bottom-2">y</span></th>
                        </tr>
                    </thead>
                    <tbody class="divide-y-2 divide-black">
                        <tr class="text-center" v-for="idx in 10" :key="idx">
                            <td class="border-black border-r-2 text-xs font-bold"><span class="relative bottom-2">{{this.arrTabel.ori_datas[idx-1].x}}</span></td>
                            <td class="text-xs"><span class="relative bottom-2">{{this.arrTabel.ori_datas[idx-1].y}}</span></td>
                        </tr>
                    </tbody>
                </table>
                <table class="table-fixed border-collapse border-2 border-black w-1/5">
                    <thead class="bg-primary-900 text-white">
                        <tr>
                            <th class="font-bold w-1/12"><span class="relative bottom-2">x</span></th>
                            <th class="font-bold w-1/12"><span class="relative bottom-2">y</span></th>
                        </tr>
                    </thead>
                    <tbody class="divide-y-2 divide-black">
                        <tr class="text-center" v-for="idx in 10" :key="idx">
                            <td class="border-black border-r-2 text-xs font-bold"><span class="relative bottom-2">{{this.arrTabel.ori_datas[idx+9].x}}</span></td>
                            <td class="text-xs"><span class="relative bottom-2">{{this.arrTabel.ori_datas[idx+9].y}}</span></td>
                        </tr>
                    </tbody>
                </table>
                
                <table class="table-fixed border-collapse border-2 border-black w-1/5">
                    <thead class="bg-primary-900 text-white">
                        <tr>
                            <th class="font-bold w-1/12"><span class="relative bottom-2">x</span></th>
                            <th class="font-bold w-1/12"><span class="relative bottom-2">y</span></th>
                        </tr>
                    </thead>
                    <tbody class="divide-y-2 divide-black">
                        <tr class="text-center" v-for="idx in 10" :key="idx">
                            <td class="border-black border-r-2 text-xs font-bold"><span class="relative bottom-2">{{this.arrTabel.ori_datas[idx+19].x}}</span></td>
                            <td class="text-xs"><span class="relative bottom-2">{{this.arrTabel.ori_datas[idx+19].y}}</span></td>
                        </tr>
                    </tbody>
                </table>
                
                <table class="table-fixed border-collapse border-2 border-black w-1/5">
                    <thead class="bg-primary-900 text-white">
                        <tr>
                            <th class="font-bold w-1/12"><span class="relative bottom-2">x</span></th>
                            <th class="font-bold w-1/12"><span class="relative bottom-2">y</span></th>
                        </tr>
                    </thead>
                    <tbody class="divide-y-2 divide-black">
                        <tr class="text-center" v-for="idx in 10" :key="idx">
                            <td class="border-black border-r-2 text-xs font-bold"><span class="relative bottom-2">{{this.arrTabel.ori_datas[idx+29].x}}</span></td>
                            <td class="text-xs"><span class="relative bottom-2">{{this.arrTabel.ori_datas[idx+29].y}}</span></td>
                        </tr>
                    </tbody>
                </table>
                
                <table class="table-fixed border-collapse border-2 border-black w-1/5">
                    <thead class="bg-primary-900 text-white">
                        <tr>
                            <th class="font-bold w-1/12"><span class="relative bottom-2">x</span></th>
                            <th class="font-bold w-1/12"><span class="relative bottom-2">y</span></th>
                        </tr>
                    </thead>
                    <tbody class="divide-y-2 divide-black">
                        <tr class="text-center" v-for="idx in 10" :key="idx">
                            <td class="border-black border-r-2 text-xs font-bold"><span class="relative bottom-2">{{this.arrTabel.ori_datas[idx+39].x}}</span></td>
                            <td class="text-xs"><span class="relative bottom-2">{{this.arrTabel.ori_datas[idx+39].y}}</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        "data": { type: Object, default: [], required: true },
        "biodata": { type: Object, default: [], required: true },
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
        this.bio = this.biodata
        // console.log(this.bio)
        // console.log(this.arrTabel)
    },
}
</script>

<style>

</style>