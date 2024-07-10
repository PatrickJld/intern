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
        <div class="flex my-2">
            <div class="flex">
                <div class="font-bold text-sm">
                    <p class="mb-2">Nama</p>
                    <p class="mb-2">Jenis Kelamin (L/P)</p>
                    <p>Pendidikan</p>
                </div>
                <div class="ml-2 text-sm">
                    <p class="mb-2">: {{this.nama}}</p>
                    <p class="mb-2">: {{this.jk}}</p>
                    <p>: {{this.pendidikan}}</p>
                </div>
            </div>
        </div>

        <hr v-if="print=='yes'" style="border-top: 2px solid black; margin-top: 10px;">
        <hr v-else style="border-top: 2px solid black;">

        <div class="grow text-sm mt-3" v-if="arrData!=null">
            <div class="flex">
                <div class="font-bold text-sm">
                    <p class="mb-2">Berhitung</p>
                    <p class="mb-2">Ekspresi</p>
                    <p class="mb-2">Penalaran</p>
                    <p class="mb-2">Pemahaman</p>
                    <p class="mb-2">Ruang Bidang</p>
                    <p class="mb-2">DPM</p>
                    <p class="mb-2">Komponen</p>
                    <p class="mb-2">Merakit</p>
                    <p class="mb-2">Penalaran Mekanik</p>
                </div>
                <div class="ml-2 text-sm">
                    <div class="mb-2" v-for="i in arrData" :key="i">
                        <p v-if="i.id!=-1">: Benar <span class="font-bold">({{i.num_correct}})</span> 
                                            Norma <span class="font-bold">({{i.norma}})</span></p>
                        <p v-else>: -</p>
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
        "print": { type: String, default: 'no', required: true },
        "nama": { type: String, default: '', required: true },
        "jk": { type: String, default: '', required: true },
        "pendidikan": { type: String, default: '', required: true },
    },
    data() {
        return {
            arrData: null
        }
    },
    mounted() {
        var temp = this.data
        var ctr = 0
        var arrTemp = []
        temp.forEach(t => {
            let hasil = t.hasil[0]
            if(hasil==null){
                arrTemp[ctr] = {
                    "num_correct": '-',
                    "norma": '-',
                    "id": t.id
                }
            }else{
                arrTemp[ctr] = {
                    "num_correct": hasil.num_correct,
                    "norma": hasil.norma,
                    "id": t.id
                }
            }
            ctr++
        });

        let validId = [6,7,8,9,11,12,13,14,15]
        let validArr = []
        for (let i = 0; i < validId.length; i++) {
            validArr.push({
                "num_correct": 0,
                "norma": '-',
                "id": -1
            })
        }

        for (let i = 0; i < validId.length; i++) {
            for (let j = 0; j < arrTemp.length; j++) {
                const x = arrTemp[j]
                if(x.id==validId[i])
                    validArr[i] = {
                        "num_correct": x.num_correct,
                        "norma": x.norma,
                        "id": x.id
                    }
            }
        }
        
        // console.log(arrTemp)
        this.arrData = validArr
        // console.log(this.arrData)
    },
}
</script>

<style>

</style>