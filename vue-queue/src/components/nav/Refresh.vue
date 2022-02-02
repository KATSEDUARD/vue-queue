<template>
    <div class="container" v-bind:class="{ active: $store.state.showRefresh }">
        <div id="refresh" ref="refresh" />
        <div id="point" />
    </div>
</template>

<script>
import { fromEvent, iif, of, pipe } from "rxjs";
import { finalize, mergeMap, takeUntil, takeWhile, repeat, map, tap, exhaustMap } from "rxjs/operators";

export default {
    name: "Refresh",
    methods: {
        setRefreshPos(y) {
            return (this.$refs["refresh"].style.top = `${y}px`);
        },
        resetRefresh() {
            this.setRefreshPos(80);
        },
        moveDot(y) {
            return of(y).pipe(tap(this.setRefreshPos));
        }
    },
    updated() {
        if (this.$store.state.showRefresh) {
            const takeUntilMouseUpOrRefresh$ = pipe(
                takeUntil(fromEvent(document, "mouseup")),
                takeWhile((y) => y < 250)
            );

            fromEvent(document, "mousedown")
                .pipe(
                    mergeMap(() => fromEvent(document, "mousemove")),
                    map((e) => e.clientY),
                    takeUntilMouseUpOrRefresh$,
                    finalize(this.resetRefresh),
                    exhaustMap((y) => iif(() => y < 245, this.moveDot(y))),
                    finalize(() => {
                        this.$store.state.showRefresh = false;
                        console.log("refreshed");
                        window.location.reload();
                    }),
                    repeat()
                )
                .subscribe();
        }
    }
};
</script>

<style scoped>
.container {
    width: 100%;
    height: 300px;
    position: fixed;
    left: calc((100% - 1280px) / 2);
    transform: translateY(-300px);
    opacity: 0;
    transition: 400ms all;
}
.container.active {
    opacity: 1;
    transform: translateY(0);
}
#refresh {
    position: absolute;
    left: calc((100% - 45px) / 2);
    top: 80px;
    width: 45px;
    height: 45px;
    background: #4c855f;
    border-radius: 50%;
    box-shadow: 0 0 20px 40px white;
    z-index: 20;
}
#point {
    position: absolute;
    width: 25px;
    height: 25px;
    background: #81e8a2;
    border-radius: 50%;
    left: calc((100% - 25px) / 2);
    top: 245px;
    box-shadow: 0 0 20px 40px black;
    z-index: 10;
}
</style>
