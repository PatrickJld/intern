<template>
    <div class="absolute w-full flex justify-center h-full">
        <div class="w-5/6 h-full">
            <p class="font-bold text-xl">Cari Nama Registrant : </p>
            <input type="text" name="token" id="userToken" class="w-1/2 ml-0.5 mb-3 bg-white ring-1 inset ring-stroke-100 
                        placeholder-stroke mt-1 px-3 py-1.5 rounded-md outline-none" placeholder="Cari registrant disini..."
                        @keyup="cari" v-model="pencarian">
            <div class="overflow-auto w-full h-auto max-h-[30rem] no-scrollbar mt-5 rounded-lg shadow-xl">
                <table class="table-fixed w-full font-semibold">
                    <thead class="bg-foreground-4-100 text-white sticky top-0">
                        <tr>
                            <th class="w-4/12 py-3">E-Mail</th>
                            <th class="w-4/12">Status</th>
                            <th class="w-4/12">Aksi</th>
                        </tr>
                    </thead>
                    <tbody v-if="this.registrantList!=null && this.registrantList.length>0">
                        <tr class="text-center odd:bg-foreground-4-50 even:bg-foreground-4-10" v-for="i in this.registrantList" :key="i">
                            <td>{{i.email}}</td>
                            <td class="py-5">
                                <span v-if="i.status==1"> 
                                    Aktif
                                </span>
                                
                                <span v-if="i.status==0"> 
                                    Dihapus
                                </span>
                            </td>
                            <td class="text-white">
                                <button class="bg-foreground-4-100 hover:bg-foreground-4-200 duration-200 rounded-md h-auto w-1/3 px-5 py-1 mr-1" 
                                    @click="this.$router.push({path: '/admin/registrantDetail', query: {registrant: i.email}})"> 
                                    <i class="fa fa-info-circle mr-2"></i>
                                    <span>Info</span>
                                </button>
                                <!-- <button class="bg-foreground-4-100 hover:bg-foreground-4-200 duration-200 rounded-md h-auto w-1/3 py-1" 
                                    @click="this.$router.push({path: '/'})"> 
                                    <i class="fa fa-trash-alt mr-2"></i>
                                    <span>Hapus</span>
                                </button> -->
                            </td>
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
        <div class="w-1 h-64 relative top-10"></div>
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
            pencarian: "",
            registrantList: null,
            registrantAll: null,
            port: import.meta.env.VITE_BACKEND_URL
        }
    },
    methods: {
        cari(){
            let temp = []
            this.registrantAll.forEach(r => {
                if (r.email.includes(this.pencarian))
                    temp.push(r)
            });
            this.registrantList = temp
        }
    },
    created() {
        this.$emit('updateHeader', 'Pendaftar')
        this.$emit('updateMenu', 'registrant')
    },
    mounted(){
        axios
        .get(this.port+'/registrant/all')
        .then(({data}) => (
            this.registrantAll = data,
            this.registrantList = data
        ))
        
    }
}
</script>

<style>

</style>