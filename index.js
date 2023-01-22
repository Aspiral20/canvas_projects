if (LSProject) {
  switch (LSProject) {
    case "web_editor":

      window.onload = function () {     // transparent refresh
        let replayTransparent = sessionStorage.getItem("replayTransparent");
        if (replayTransparent) {
          sessionStorage.removeItem('replayTransparent');

          replayBody(colorBackground)

          console.log('Session removed!')
        }
      }

      let canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d');

      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      const localStorageColorKey = 'color'
      const colorBackground = 'transparent'

      let currentFill;

      const sizeCursorKey = 'cursor_size'

      const LCReplayTimeoutKey = 'refresh_speed'
      const replayTimeout = parseInt(localStorage.getItem(LCReplayTimeoutKey))

      const localStorageKey = 'coords'
      let prevCoords = []
      let coords = []
      let stopReplay = false;   //todo stop when replay


      const createArc = (e) => {
        context.arc(e.clientX, e.clientY, parseInt(localStorage.getItem(sizeCursorKey)), 0, Math.PI * 2)
        context.fill()
      }
      let isMouseDown = false;
      canvas.addEventListener('mousedown', () => {
        isMouseDown = true;
      })
      canvas.addEventListener('mouseup', () => {
        isMouseDown = false;
        context.beginPath()
        coords.push('mouseup')
      })

      const renderCursor = (e) => {
        context.lineTo(e.clientX, e.clientY)
        context.stroke();

        context.beginPath()
        createArc(e)

        context.beginPath()
        context.moveTo(e.clientX, e.clientY)
      }

      const startPaint = function (e) {
        if (isMouseDown) {
          coords.push([e.clientX, e.clientY])

          renderCursor(e)
        }
      }

      canvas.addEventListener('mousemove', startPaint)

      const save = () => {
        localStorage.setItem(localStorageKey, JSON.stringify(coords))
      }

      const saveAllPaints = () => {
        const allCoords = prevCoords.concat(coords)

        localStorage.setItem(localStorageKey, JSON.stringify(allCoords))
      }

      const saveFromLocalstorage = () => {
        const LS = JSON.parse(localStorage.getItem(localStorageKey))
        if (LS.length) {
          coords = LS
        }
      }

      const replay = () => {
        let timer = setInterval(() => {
          if (!coords.length) {
            clearInterval(timer)
            context.beginPath();
            return;
          }
          let crd = coords.shift(),
            e = {   //luam din localstorage coordonatele
              clientX: crd["0"],
              clientY: crd["1"]
            };

          renderCursor(e)
        }, replayTimeout);
      }

      const replayBody = (color) => {
        coords = JSON.parse(localStorage.getItem(localStorageKey))

        clear(color)
        replay()

        prevCoords = JSON.parse(localStorage.getItem(localStorageKey))  // for shift + s
      }

      const clear = (color = 'white') => {
        if (color !== 'transparent') {
          Object.prototype.screenWasCleared = true
        }

        context.fillStyle = color
        context.fillOpacity = '1'
        context.fillRect(0, 0, canvas.width, canvas.height)

        context.beginPath()
        currentFill = localStorage.getItem(localStorageColorKey)
        context.fillStyle = currentFill
      }

      const clearCoords = () => {
        coords = [];
        prevCoords = [];
        localStorage.setItem(localStorageKey, JSON.stringify([]))
      }

      const clearAll = () => {
        clear()

        clearCoords()
      }

      let prevKey;
      document.addEventListener('keydown', (e) => {
        // FOR SAVE - s
        if (e.keyCode === 83) {

          // FOR SAVE FROM LOCALSTORAGE
          if (prevKey && (prevKey.keyCode === 18)) {    // alt + s
            saveFromLocalstorage()
            console.log('Saved from LocalStorage!')
          } else if (prevKey && (prevKey.keyCode === 16)) {   // shift + s
            saveAllPaints()
            console.log('Saved previous and current paint!')
          } else {
            save()
            console.log('Saved!')
          }
        }
        // FOR REPLAY - r
        if (e.keyCode === 82) {
          if (prevKey && (prevKey.keyCode === 16)) {  // shift + r

            sessionStorage.setItem("replayTransparent", "true")     // pentru transparent reload
            location.reload()

            console.log(`Replaying...(${colorBackground})`)
          } else {
            console.log('Replaying...')
            replayBody('white')
          }
        }
        // FOR CLEAR - c
        if (e.keyCode === 67) {

          if (prevKey && (prevKey.keyCode === 16)) {  // shift + c
            clearAll()
            console.log('Cleared screen and saves!')
          } else if (prevKey && (prevKey.keyCode === 18)) {   //alt + c
            clearCoords()

            console.log('Cleared saves!')
          } else {
            clear()
            console.log('Cleared screen!')
          }
        }
        prevKey = e
      })
      break;
    case "glitch":

      break;
    default:
      throw new Error(`Invalid Project! ${LSProject}`)
  }
} else {
  throw new Error(`LSProject: ${LSProject}`)
}

