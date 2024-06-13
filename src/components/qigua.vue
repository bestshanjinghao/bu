<template>
    <div>
        <!-- 八卦部分结束 -->
        <div style="display: flex;">

            <ul class="zhugua">
                <li v-for="item, index in zhuguaSanwei" :key="index">
                    <p v-if="item == 1" class="iconfont">
                        &#xe601;
                        <span v-if="index == dongyao">x</span>
                    </p>
                    <p v-else class="iconfont">
                        &#xe602;
                        <span v-if="index == dongyao">x</span>
                    </p>
                </li>
            </ul>


            <ul class="hugua">
                <li v-for="item, index in huguaSanwei" :key="index">
                    <p v-if="item == 1" class="iconfont">
                        &#xe601;
                        <span v-if="index == dongyao"></span>
                    </p>
                    <p v-else class="iconfont">
                        &#xe602;
                        <span v-if="index == dongyao"></span>
                    </p>
                </li>
            </ul>

            <ul class="biangua">
                <li v-for="item, index in bianguaSanwei" :key="index">
                    <p v-if="item == 1" class="iconfont">
                        &#xe601;
                        <span v-if="index == dongyao"></span>
                    </p>
                    <p v-else class="iconfont">
                        &#xe602;
                        <span v-if="index == dongyao"></span>
                    </p>
                </li>
            </ul>
        </div>
        <div>报两数×</div>
        <div>
            <span>数字一：</span>
            <el-input v-model="number1" type="number"></el-input>
        </div>
        <div>
            <span>数字二：</span>
            <el-input v-model="number2" type="number"></el-input>
        </div>
        <div>
            <span>当前时：</span>
            <span>{{ shichen }}</span>
        </div>
        <el-button round @click="paipan">排盘</el-button>
        <el-button round @click="reset">重置</el-button>

    </div>
</template>
  
<script>
export default {
    name: 'qiGua',
    props: {
    },
    components: {

    },
    data() {
        return {
            number1: '',
            number2: '',
            shichen: '',
            shangguaSanwei: '',
            xiaguaSanwei: '',
            zhuguaSanwei: '',
            huguaSanwei: '',
            bianguaSanwei: '',
            dongyao: '',
        }
    },

    methods: {
        paipan() {
            this.shichen = window.lunar(new Date()).gzChrono
            // 易瑞 两数取卦 同样的逻辑
            // 07:54 辰时 问
            // 上卦 7 得艮 (如果余0 取坤)
            //     动爻 7+6+5（辰时取5）/6取余0  （动爻0的情况怎么办？）动爻0 取6
            // 下卦 54/8取余6 得坎
            // 得山水蒙

            let list = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
            let xushu = list.indexOf(this.shichen) + 1

            // 乾（☰）、坎（☵）、艮（☶）、震（☳）、巽（☴）、离（☲）、坤（☷）、兑（☱）
            // 乾1☰、兑2☱、离3☲、震4☳、巽5☴、坎6☵、艮7☶、坤8☷
            let baguaGuaxu = { '1': '乾', '2': '兑', '3': '离', '4': '震', '5': '巽', '6': '坎', '7': '艮', '8': '坤' }
            let baguaSanweiList = { '乾': [1, 1, 1], '兑': [0, 1, 1], '离': [1, 0, 1], '震': [0, 0, 1], '巽': [1, 1, 0], '坎': [0, 1, 0], '艮': [1, 0, 0], '坤': [0, 0, 0] }
            // let baguaXushu2 = { '1': [1, 1, 1], '2': [0, 1, 1], '3': [1, 0, 1], '4': [0, 0, 1], '5': [1, 1, 0], '6': [0, 1, 0], '7': [1, 0, 0], '8': [0, 0, 0] }

            let shanggua = baguaGuaxu[this.number1 % 8 ? this.number1 % 8 : 8]
            this.shangguaSanwei = baguaSanweiList[shanggua]

            // 下卦三维
            let xiagua = baguaGuaxu[this.number2 % 8 ? this.number2 % 8 : 8]
            this.xiaguaSanwei = baguaSanweiList[xiagua]

            // 主卦三维
            this.zhuguaSanwei = [...this.shangguaSanwei, ...this.xiaguaSanwei]
            console.log('z', this.zhuguaSanwei);

            this.dongyao = (Number(this.number1) + Number(this.number2) + xushu) % 6 ? (Number(this.number1) + Number(this.number2) + xushu) % 6 : 6
            console.log(this.dongyao);
            this.dongyao = 6 - this.dongyao

            // 互挂三维
            let shanghu = this.zhuguaSanwei.slice(1, 4);
            let xiahu = this.zhuguaSanwei.slice(2, 5);
            this.huguaSanwei = [...shanghu, ...xiahu]

            // 变卦三维
            this.bianguaSanwei = [...this.zhuguaSanwei]
            this.bianguaSanwei[this.dongyao] = this.bianguaSanwei[this.dongyao] == 1 ? 0 : 1
            console.log('b', this.bianguaSanwei);

        },
        reset() {
            this.number1 = ''
            this.number2 = ''
            this.shichen = window.lunar(new Date()).gzChrono
        }
    },
    mounted() {
        this.shichen = window.lunar(new Date()).gzChrono
        console.log(this.shichen);
        // 在这里可以执行一些初始化操作
    }
}

</script>
  
<style lang="scss" scoped>
.iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}
</style>
  