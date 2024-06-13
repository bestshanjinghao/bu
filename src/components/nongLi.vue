<template>
    <div>
        用手排的方式去做一个起卦的工具
        <!-- <lunar-full-calendar :events="events" :config="config"></lunar-full-calendar> -->
        <lunar-full-calendar :events="events" ref="calendar" @event-selected="eventSelected" :config="config"
            @day-click="dayClick">
        </lunar-full-calendar>
    </div>
</template>
  
<script>

// index.vue
import { LunarFullCalendar } from "vue-lunar-full-calendar";
import tippy from "tippy.js";    //引入 tippy.js
import 'tippy.js/dist/tippy.css';//引入 tippy.js
import 'tippy.js/themes/light.css';    //引入主题
import 'tippy.js/animations/scale.css';

export default {
    name: 'baGua',
    props: {
        msg: String
    },
    components: {
        LunarFullCalendar
    },
    data() {
        return {
            dataList: [
                { num1: '300', num2: '180', num3: '120', start: '2024-06-01', end: '2024-06-05' },
                { num1: '230', num2: '130', num3: '100', start: '2024-06-10', end: '2024-06-10' },
                { num1: '230', num2: '130', num3: '100', start: '2024-06-11', end: '2024-06-11' },
                { num1: '200', num2: '110', num3: '90', start: '2024-06-25', end: '2024-06-27' },
            ],
            events: [], // 日程数组
            // 相关配置
            config: {
                lunarCalendar: true, // 是否显示农历
                fixedWeekCount: false,// 设置false没有显示5周，不设置则默认显示6周
                firstDay: 1,//设置一周中显示的第一天是哪天，周日是0，周一是1，类推
                aspectRatio: 2.5,// 设置日历单元格宽度与高度的比例
                // height: 600,
                header: {
                    left: 'prev title next today',
                    center: '',
                    right: ''
                    //   right: 'custom, month,agendaWeek,agendaDay'
                },
                // 配置标题年月格式展示
                views: {
                    month: {
                        titleFormat: 'YYYY年MMM'
                    },
                },
                // eventOrder:'index',   // 这个是控制事件排序的功能，意思是 按照字段 事件数据中index来排序
                // eventLimitClick: 'day', //点击今天日列表图
                handleWindowResize: true,
                buttonText: { today: "今天", month: "月", week: "周", day: "日" },
                locale: "zh-cn",
                editable: false, //是否允许修改事件
                selectable: false,
                eventLimit: 4, //事件个数
                allDaySlot: false, //是否显示allDay
                defaultView: "month", //显示默认视图
                eventClick: this.eventClick, //点击事件
                dayClick: this.dayClick, //点击日程表上面某一天
                eventMouseover: this.eventMouseover, // 鼠标放上时候的事件
                customButtons: {
                    prev: { // this overrides the prev button
                        text: "PREV",
                        click: () => {
                            this.prev();
                        }
                    },
                    next: { // this overrides the next button
                        text: "NEXT",
                        click: () => {
                            this.next();
                        }
                    },
                    today: {
                        text: "今天",
                        click: () => {
                            this.today();
                        }
                    }
                }
            }
        }
    },

    methods: {
        eventMouseover(calEvent, jsEvent,) {
            // console.log(calEvent,'进来');
            let content = ""; //content中可以直接设置悬浮框中内容的样式
            content = content + "<div style=''>" + "白班：" + calEvent.bai + "<div>";
            content = content + "<div style=''>" + "夜班：" + calEvent.ye + "<div>";

            tippy(jsEvent.currentTarget, {
                content: content,  //悬浮框展示的内容
                theme: 'tomato',    //自定义主题，//悬浮框主题，默认主题中的light主题（白底黑字）
                allowHTML: true,    //为true的时候，可以识别content中的html
            });
        },
        // 上月按钮事件
        prev() {
            this.$refs.calendar.fireMethod('prev')
            console.log('上月');
        },
        // 下月按钮事件
        next() {
            this.$refs.calendar.fireMethod('next')
            console.log('下月');
        },
        // 点击今天按钮
        today() {
            this.$refs.calendar.fireMethod('today')
            console.log('今天');
        },
        // 点击当天的事件
        dayClick(date) {
            console.log(date, 'date12');
        },
        // 选中事件
        eventSelected(event) {
            console.log(event, 'event');
        },
    }
}

</script>
  
<style lang="scss" scoped>
//  日历自定义样式
/*
/deep/ .fc-state-default {
    background-color: initial;
    background-image: initial;
    border: none;
    // box-shadow: 0 0 0 1px #409EFF;
}

/deep/ .fc-toolbar .fc-left {
    font-size: 12px;
    margin-left: 2px;
}

/deep/ .fc-ltr .fc-basic-view .fc-day-top .fc-day-number {
    float: left;
}

/deep/.fc-ltr .fc-basic-view .fc-day-top .fc-day-cnTerm,
/deep/.fc-ltr .fc-basic-view .fc-day-top .fc-day-cnDate {
    float: right;
}

/deep/.fc-ltr .fc-basic-view .fc-day-top .fc-day-cnTerm {
    color: #F08F00;
}

// 每日任务自定义样式
/deep/ .fc-event,
.fc-event-dot {
    background-color: #409EFF;
    // height: 25px;
    cursor: pointer;
    // line-height: 25px;
    // text-align: center;
    font-size: 12px;
    padding: 2px 5px;
}

/deep/ .fc-event {
    // border-radius: 0;
    border: none;
    // position: absolute;
    // bottom: 3px;
    // width: 13.7%;
}

/deep/ .fc-row .fc-content-skeleton {
    height: 100%;
}

// 去除滚动条
/deep/ .fc-view-container *,
.fc-view-container ::after,
.fc-view-container ::before {
    box-sizing: border-box;
}

/deep/ .fc-row .fc-content-skeleton td,
/deep/ .fc-row .fc-helper-skeleton td {
    color: #666;
}
*/
</style>
  