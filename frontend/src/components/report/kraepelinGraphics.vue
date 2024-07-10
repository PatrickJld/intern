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

        <div class="grow text-sm mt-3">
            <canvas :id="id" width="400" height="350"></canvas>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        "data": { type: Object, default: [], required: true },
        "biodata": { type: Object, default: [], required: true },
        "id": { type: String, required: true },
        "print": { type: String, default: 'no', required: true },
    },
    data() {
        return {
            dataGrafik: null,
            bio: null,
            plugin: {
                id: 'custom_canvas',
                beforeDraw: (chart) => {
                    const ctx = chart.canvas.getContext('2d');
                    ctx.save();
                    ctx.globalCompositeOperation = 'destination-over';
                    ctx.fillStyle = 'white';
                    ctx.fillRect(0, 0, chart.width, chart.height);
                    ctx.restore();
                }
            }
        }
    },
    mounted() {
        // console.log(this.id)
        this.bio = this.biodata
        var temp = this.data
        var data = []
        for (let i = 0; i < 50; i++) {
            data.push(temp.ori_datas[i].y)
        }
        // console.log(data)

        this.dataGrafik = data
        const ctx = $('#'+this.id)
        const percentileChart = new Chart(ctx, {
            plugins: [this.plugin],
            type: 'line',
            data: {
                labels: ['1', '2', '3', '4', '5', '6','7','8','9','10'
                        ,'11','12','13','14','15','16','17','18','19','20'
                        ,'21','22','23','24','25','26','27','28','29','30'
                        ,'31','32','33','34','35','36','37','38','39','40'
                        ,'41','42','43','44','45','46','47','48','49','50'],
                datasets: [{
                    label: 'Grafik Hasil Tes Kraepelin',
                    data: this.dataGrafik,
                    backgroundColor: [
                        'red'
                    ],
                    borderColor: [
                        'blue'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    xAxes:{
                        ticks:{
                        color: 'black'
                        },
                        grid: { 
                        color: "#ffffff",
                        }
                    },
                    yAxes: {
                        min: 0,
                        max: 27,
                        beginAtZero: true,
                        ticks:{
                        stepSize: 5,
                        color: 'black'
                        },
                        grid: { color: "#000000" }
                    }
                },
                plugins:{
                    legend: {
                        display: false,
                    },
                    title: {
                        display: true,
                        text: 'Grafik Hasil Tes Kraepelin',
                        color: "black",
                        font: {
                            size: 20
                        }
                    }
                }
            }
        });
    },
}
</script>

<style>

</style>