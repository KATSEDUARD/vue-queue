<template>
    <div style="width: 100%">
        <div id="indication" ref="indication">&nbsp;</div>
    </div>
</template>

<script>
import { fromEvent } from "rxjs";
import { throttleTime, tap } from "rxjs/operators";

export default {
    name: "ScrollIndicator",
    methods: {
        getScrollWidth() {
            const doc = document.documentElement;
            const winScroll = doc.scrollTop;
            const height = doc.scrollHeight - doc.clientHeight;

            return (winScroll / height) * 100;
        },
        setScroll() {
            this.$refs["indication"].style.width = this.getScrollWidth() + "%";
        }
    },
    created() {
        fromEvent(window, "scroll").pipe(throttleTime(20), tap(this.setScroll)).subscribe();
    }
};
</script>

<style scoped>
#indication {
    position: fixed;
    width: 5px;
    height: 7px;
    background-color: #81e8a2;
    left: 0;
    right: 0;
    top: 64px;
    z-index: 2;
}
</style>
