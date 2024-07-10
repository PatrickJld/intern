<template>
    <div class="w-full text-center mt-5">
        <div v-if="jumlahJawaban==1">
            <input v-if="needValidate" type="text" name="" id="answer" class="text-center text-white rounded-lg bg-foreground-4-100 ring-1 ring-inset ring-stroke-100
                px-5 py-2 w-full text-lg outline-none placeholder-gray-300" placeholder="Jawab Di Sini" @keypress="validasi($event)" autocomplete="off">
            <input v-else type="text" name="" id="answer" class="text-center text-white rounded-lg bg-foreground-4-100 ring-1 ring-inset ring-stroke-100
                px-5 py-2 w-full text-lg outline-none placeholder-gray-300" placeholder="Jawab Di Sini" @keyup="noValidation" autocomplete="off">
        </div>
        <div v-if="jumlahJawaban==2" class="flex gap-2 justify-center">
            <input v-if="needValidate" type="text" name="" id="answer" class="text-center text-white rounded-lg bg-foreground-4-100 ring-1 ring-inset ring-black
            px-5 py-2 w-full text-lg outline-none placeholder-gray-300" placeholder="Jawaban pertama" @keypress="validasi($event)" autocomplete="off">
            <input v-else type="text" name="" id="answer" class="text-center text-white rounded-lg bg-foreground-4-100 ring-1 ring-inset ring-black
            px-5 py-2 w-full text-lg outline-none placeholder-gray-300" placeholder="Jawaban pertama" @keyup="noValidation" autocomplete="off">
            
            <input v-if="needValidate" type="text" name="" id="answer2" class="text-center text-white rounded-lg bg-foreground-4-100 ring-1 ring-inset ring-black
            px-5 py-2 w-full text-lg outline-none placeholder-gray-300" placeholder="Jawaban kedua" @keypress="validasi2($event)" autocomplete="off">
            <input v-else type="text" name="" id="answer2" class="text-center text-white rounded-lg bg-foreground-4-100 ring-1 ring-inset ring-black
            px-5 py-2 w-full text-lg outline-none placeholder-gray-300" placeholder="Jawaban kedua" @keyup="noValidation" autocomplete="off">
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            needValidate: false
        }
    },
    props: {
        "jawaban": { type: Array, default: [], required: true },
        "noSoal": { type: Number, default: 1, required: true },
        "jumlahJawaban": { type: Number, default: 1, required: true },
        "maxLength": { type: Number, default: 1, required: true },
        "section": { type: Number, default:-1, required: true }
    },
    methods: {
        validasi(evt){
            if($('#answer').val().length+1>this.maxLength){
                evt.preventDefault();
            }else{
                evt = (evt) ? evt : window.event;
                var charCode = (evt.which) ? evt.which : evt.keyCode;
                if ((charCode > 31 && (charCode < 45 || charCode > 57)) && charCode !== 46) {
                    evt.preventDefault();
                } else {
                    this.ngisi(String.fromCharCode(charCode),1);
                    return true;
                }
            }
        },
        validasi2(evt){
            if($('#answer2').val().length+1>this.maxLength){
                evt.preventDefault();
            }else{
                evt = (evt) ? evt : window.event;
                var charCode = (evt.which) ? evt.which : evt.keyCode;
                if ((charCode > 31 && (charCode < 45 || charCode > 57)) && charCode !== 46) {
                    evt.preventDefault();
                } else {
                    this.ngisi(String.fromCharCode(charCode),2);
                    return true;
                }
            }
        },
        ngisi(added, from){
            let text1 = $('#answer').val()
            let text2 = $('#answer2').val()
            
            if(from==1) text1 = text1+added;
            else if(from==2) text2 = text2+added;
            if(this.jumlahJawaban>1)
                this.jawaban[this.noSoal-1] = text1 + '&' + text2
            else
                this.jawaban[this.noSoal-1] = text1

            this.$emit('setChanged', true)
        },
        noValidation(){
            if(this.jumlahJawaban>1)
                this.jawaban[this.noSoal-1] = $('#answer').val() + '&' + $('#answer2').val()
            else
                this.jawaban[this.noSoal-1] = $('#answer').val()
            this.$emit('setChanged', true)
        },
        resetText(answer){
            if(this.jumlahJawaban>1){
                if(answer!=null){
                    var temp = answer.split("&")
                    $('#answer').val(temp[0])
                    $('#answer2').val(temp[1])
                }else{
                    $('#answer').val("")
                    $('#answer2').val("")
                }
            }
            else
                $('#answer').val(answer)
            
            let tb = document.getElementById('answer');
            tb.focus()
            if(answer!=undefined){
                let tempz = answer.toString()
                const length = tempz.length;
                tb.setSelectionRange(length, length);
                tb.focus()
            }
        },
    },
    mounted() {
        if(this.section==5 || this.section==6 || this.section==58 || this.section==65 || this.section==66 || this.section==76 || this.section==77) this.needValidate = true
        // console.log(this.maxLength)
    },
}
</script>

<style>

</style>