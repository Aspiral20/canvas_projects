const replaySpeedContainer = document.getElementsByClassName('replay_speed_container')[0]
const replaySpeedNumber = document.getElementsByClassName('replay_speed_number')[0]
const replaySpeedChange = document.getElementsByClassName('replay_speed_change')[0]
const approveReplaySpeed = document.getElementsByClassName('approve_replay_speed')[0]

const LSRefreshSpeedKey = 'refresh_speed'
const initialSpeed = 1

getLSSpeed = parseInt(localStorage.getItem(LSRefreshSpeedKey))
if (LSProject) {
  if (LSProject === 'web_editor') {

    if (getLSSpeed) {

      replaySpeedChange.value = getLSSpeed
      replaySpeedChange.innerHTML = getLSSpeed.toString()
      replaySpeedNumber.innerHTML = getLSSpeed.toString()

      const replaySpeedSize = () => {
        approveReplaySpeed.addEventListener("click", (e) => {
          e.preventDefault()

          localStorage.setItem(LSRefreshSpeedKey, replaySpeedChange.value.toString())
          replaySpeedNumber.innerHTML = replaySpeedChange.value.toString()
        })
        replaySpeedChange.addEventListener("change", (e) => {
          e.preventDefault()

          localStorage.setItem(LSRefreshSpeedKey, replaySpeedChange.value.toString())
          replaySpeedNumber.innerHTML = replaySpeedChange.value.toString()
        })
      }
      replaySpeedSize()

    } else {
      replaySpeedNumber.innerHTML = initialSpeed.toString()
      replaySpeedChange.innerHTML = initialSpeed.toString()
      localStorage.setItem(LSRefreshSpeedKey, initialSpeed.toString())
    }
  } else {
    style(replaySpeedContainer, {
      display: 'none'
    })
  }
} else {
  throw new Error(`LSProject: ${LSProject}`)
}
