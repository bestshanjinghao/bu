<template>
    <div>
        用手排的方式去做一个起卦的工具
        <button @click="getLunarHour">获取时辰</button>
        <div>{{ lunarHour }}</div>
    </div>
</template>
  
<script>
// import dayjs from 'dayjs';
import { Solar } from 'lunar-calendar';


export default {
    name: 'baGua',
    props: {
        msg: String
    },
    data() {
        return {
            lunarHour: ''
        };
    },
    methods: {
        getLunarHour() {
            const data = new Date()
            const solar = Solar.fromDate(data);
            console.log('solar', solar);
            const lunar = solar.getLunar();
            this.lunarHour = lunar.hour;
            console.log('农历时辰：', this.lunarHour);
        },
    }
}

</script>
  
<style scoped></style>
  