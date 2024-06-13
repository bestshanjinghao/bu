
<template>
    <div>
        <div>{{ luna }}</div>
        <!-- <button @click="toggleWeekends">toggle weekends</button> -->
        <FullCalendar :options="calendarOptions">
            <template v-slot:eventContent='arg'>
                <b>{{ arg.event.title }}</b>
            </template>
        </FullCalendar>

    </div>
</template>

<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

export default {
    name: "riLi",
    components: {
        FullCalendar // make the <FullCalendar> tag available
    },
    data() {
        return {
            calendarOptions: {
                plugins: [dayGridPlugin, interactionPlugin],
                initialView: 'dayGridMonth',
                weekends: true, // initial value
            },
            luna:
                window.lunar(new Date()),
            arg: {
                event: {
                    title: '标题'
                }
            }
        }
    },
    methods: {
    }
}
</script>