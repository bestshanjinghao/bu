<template>
    <div>
        <!-- 八卦部分 给八卦渲染颜色 -->
        <div style="display: flex;">

            <ul class="zhugua">
                <li>[主]</li>
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
                <li>[互]</li>
                <li v-for="item, index in huguaSanwei" :key="index">
                    <p v-if="item == 1" class="iconfont">
                        &#xe601;
                    </p>
                    <p v-else class="iconfont">
                        &#xe602;
                    </p>
                </li>
            </ul>

            <ul class="biangua">
                <li>[变]</li>
                <li v-for="item, index in bianguaSanwei" :key="index">
                    <p v-if="item == 1" class="iconfont">
                        &#xe601;
                    </p>
                    <p v-else class="iconfont">
                        &#xe602;
                    </p>
                </li>
            </ul>
        </div>
        <!-- 初始设置 -->
        <div>报两数</div>
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
            // 乾金 兑金 离火 震木 巽木 坎水 艮土 坤土
            // let baguaGuaxu = { '1': '乾', '2': '兑', '3': '离', '4': '震', '5': '巽', '6': '坎', '7': '艮', '8': '坤' }
            // let baguaSanweiList = { '乾': [1, 1, 1], '兑': [0, 1, 1], '离': [1, 0, 1], '震': [0, 0, 1], '巽': [1, 1, 0], '坎': [0, 1, 0], '艮': [1, 0, 0], '坤': [0, 0, 0] }
            // let baguaXushu2 = { '1': [1, 1, 1], '2': [0, 1, 1], '3': [1, 0, 1], '4': [0, 0, 1], '5': [1, 1, 0], '6': [0, 1, 0], '7': [1, 0, 0], '8': [0, 0, 0] }
            let baguaList = [
                {
                    xuhao: '1',
                    name: '乾',
                    wuxing: '金',
                    color: 'gold',
                    sanwei: [1, 1, 1],
                    length: 0,
                },
                {
                    xuhao: '2',
                    name: '兑',
                    wuxing: '金',
                    color: 'gold',
                    sanwei: [0, 1, 1],
                    length: 1,
                },
                {
                    xuhao: '3',
                    name: '离',
                    wuxing: '火',
                    color: 'red',
                    sanwei: [1, 0, 1],
                    length: 2,
                },
                {
                    xuhao: '4',
                    name: '震',
                    wuxing: '木',
                    color: 'green',
                    sanwei: [0, 0, 1],
                    length: 3,
                },
                {
                    xuhao: '5',
                    name: '巽',
                    wuxing: '木',
                    color: 'green',
                    sanwei: [1, 1, 0],
                    length: 4,
                },
                {
                    xuhao: '6',
                    name: '坎',
                    wuxing: '水',
                    color: 'black',
                    sanwei: [0, 1, 0],
                    length: 5,
                },
                {
                    xuhao: '7',
                    name: '艮',
                    wuxing: '土',
                    color: 'brown',
                    sanwei: [1, 0, 0],
                    length: 6,
                },
                {
                    xuhao: '8',
                    name: '坤',
                    wuxing: '土',
                    color: 'brown',
                    sanwei: [0, 0, 0],
                    length: 7,
                },
            ]
            // 上卦三维
            // 取到八卦的序号
            // 将序号和shiyanlist中的数据做对比
            // 如果对比成功
            // 返回当前的index
            // 取出这个对象
            let shanggua = baguaList[(this.number1 % 8 ? this.number1 % 8 : 8) - 1]
            this.shangguaSanwei = shanggua.sanwei

            // 下卦三维
            let xiagua = baguaList[(this.number2 % 8 ? this.number2 % 8 : 8) - 1]
            this.xiaguaSanwei = xiagua.sanwei

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
  