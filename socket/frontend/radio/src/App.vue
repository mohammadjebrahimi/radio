<script  setup>
import { onMounted, ref } from 'vue';

var socket1 = io('http://127.0.0.1:3000');


const domVideo = ref(null)
const pauseVideo = (video) => {
  video.pause()
  return true
}

const fetchStartTime = async () => {
  const response = await fetch("http://127.0.0.1:3000/start")
  const startTime = await response.json()
  return startTime;
}
const playVideoOnTime = ({ video, start, count }) => {
  setTimeout(() => {

    const ts = timesync.create({
      server: socket1,
      interval: 64000
    });

    let tsCount = 0


    ts.send = function (socket, data, timeout) {
      return new Promise(function (resolve, reject) {
        var timeoutFn = setTimeout(reject, timeout);
        socket.emit('timesync', data, function () {
          clearTimeout(timeoutFn);
          resolve();
        });
      });
    };

    socket1.on('timesync', function (data) {
      ts.receive(null, data);
    });


    ts.on('change', function (o) {
      if (tsCount >= count) {
        ts.destroy()
      } else if (start - ts.now() > 0) {
        setTimeout(() => {
          video.play()
        }, Math.floor(start - ts.now()))
      }
      tsCount++
    });
  }, 3000)


}
onMounted(async () => {
  pauseVideo(domVideo.value)
  playVideoOnTime({ video: domVideo.value, start: await fetchStartTime(), count: 2000 })
});

</script>

<template>
  <video ref="domVideo" style="opacity: 1;" controls autoplay muted>
    <source src="http://localhost:3000/music/a.mp3" type="audio/mp3" />
  </video>
</template>

<style></style>
