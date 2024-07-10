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
            <h1 class="font-bold">Hasil Tes IST</h1>
            <div class="flex">
                <div class="font-bold text-sm">
                    <p>Nama :</p>
                </div>
                <div class="ml-3 text-sm">
                    <p>{{this.nama}}</p>
                </div>
            </div>
        </div>
        
        <div class="grow text-sm mt-2" v-if="arrTabel!=null">
            <div v-if="print==='no'">
                <div class="flex justify-center">
                    <table class="table-fixed border-y-[1px] border-l-[1px] border-black w-full">
                        <thead class="bg-primary-900 text-white">
                            <tr>
                                <th class="font-bold w-1/4">Aspek</th>
                                <th class="font-bold w-1/4">RW</th>
                                <th class="font-bold w-1/4">SW</th>
                                <th class="font-bold w-1/4">Kategori</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y-[1px] divide-black">
                            <tr class="text-center" v-for="(i, idx) in arrTabel" :key="idx">
                                <td class="border-black border-r-[0.5px] text-xs p-0">{{this.aspek[idx]}}</td>
                                <td class="border-black border-r-[0.5px] text-xs p-0">{{i.RW}}</td>
                                <td class="border-black border-r-[0.5px] text-xs p-0">{{i.SW}}</td>
                                <td class="border-black border-r-[0.5px] text-xs p-0">{{i.kategori}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="flex gap-2 justify-end mt-3">
                    <div class="font-bold">
                        <p>Jumlah RW</p>
                        <p>Jumlah SW</p>
                        <p>IQ</p>
                        <p>Dominasi</p>
                    </div>
                    <div class="font-bold">
                        <p v-for="i in 4" :key="i">:</p>
                    </div>
                    <div>
                        <p>{{this.data.jumlah_RW}}</p>
                        <p>{{this.data.jumlah_SW}}</p>
                        <p>{{this.data.IQ.IQ}} <span class="font-bold italic">({{this.data.IQ.kategori}})</span></p>
                        <p>{{this.data.dominasi}}</p>
                    </div>
                </div>
            </div>

            <div v-if="print==='yes'">
                <div class="flex justify-center">
                    <table class="table-fixed border-y-[1px] border-l-[1px] border-black w-full">
                        <thead class="bg-primary-900 text-white">
                            <tr>
                                <th class="font-bold w-1/4"><span class="relative bottom-2">Aspek</span></th>
                                <th class="font-bold w-1/4"><span class="relative bottom-2">RW</span></th>
                                <th class="font-bold w-1/4"><span class="relative bottom-2">SW</span></th>
                                <th class="font-bold w-1/4"><span class="relative bottom-2">Kategori</span></th>
                            </tr>
                        </thead>
                        <tbody class="divide-y-[1px] divide-black">
                            <tr class="text-center" v-for="(i, idx) in arrTabel" :key="idx">
                                <td class="border-black border-r-[0.5px] text-xs p-0"><span class="relative bottom-2">{{this.aspek[idx]}}</span></td>
                                <td class="border-black border-r-[0.5px] text-xs p-0"><span class="relative bottom-2">{{i.RW}}</span></td>
                                <td class="border-black border-r-[0.5px] text-xs p-0"><span class="relative bottom-2">{{i.SW}}</span></td>
                                <td class="border-black border-r-[0.5px] text-xs p-0"><span class="relative bottom-2">{{i.kategori}}</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="flex gap-2 justify-end mt-3">
                    <div class="font-bold">
                        <p>Jumlah RW</p>
                        <p>Jumlah SW</p>
                        <p>IQ</p>
                        <p>Dominasi</p>
                    </div>
                    <div class="font-bold">
                        <p v-for="i in 4" :key="i">:</p>
                    </div>
                    <div>
                        <p>{{this.data.jumlah_RW}}</p>
                        <p>{{this.data.jumlah_SW}}</p>
                        <p>{{this.data.IQ.IQ}} <span class="font-bold italic">({{this.data.IQ.kategori}})</span></p>
                        <p>{{this.data.dominasi}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
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
            hasil: null,
            bio: null,
            aspek: ["SE","WA","AN","GE","ME","RA","ZR","FA","WU"]
        }
    },
    mounted() {
        this.arrTabel = []
        this.arrTabel.push(this.data.SE)
        this.arrTabel.push(this.data.WA)
        this.arrTabel.push(this.data.AN)
        this.arrTabel.push(this.data.GE)
        this.arrTabel.push(this.data.ME)
        this.arrTabel.push(this.data.RA)
        this.arrTabel.push(this.data.ZR)
        this.arrTabel.push(this.data.FA)
        this.arrTabel.push(this.data.WU)
    },
}
</script>

<style>

</style>