import { TractorStatus } from './enums'

export const tractorRunning = 'green'
export const tractorIdling = 'orange'
export const tractorStopped = 'grey'

export const getVehicleColor = (status) => {
  switch (status) {
    case TractorStatus.STOPPED:
      return tractorStopped
    case TractorStatus.IDLING:
      return tractorIdling
    case TractorStatus.RUNNING:
      return tractorRunning
    default:
      return 'black'
  }
}
