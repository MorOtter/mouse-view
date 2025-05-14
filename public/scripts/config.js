
// configure changable data
export const config = {
    trialLength: 5, // minutes for each trial
    advisorAccuracy : 100, // int representing percentage of the time advisor is correct
    packetTimeOnScreen : 10000000, // seconds it takes for each packet to navigate to the centre
    censoring: false, // option of censoring some data points
    sizeOfMouseViewWindow: "100%", // int for pixels or string for percentage of screen around mouse visible
    mouseViewOverlayAlpha: 0, // transparency of rest of the screen 0-1 with 1 = opaque
    deviationInPixelsOfEdgeOfFilter: 0, // how much pixel allowance for the edge of the cursor circle
}
