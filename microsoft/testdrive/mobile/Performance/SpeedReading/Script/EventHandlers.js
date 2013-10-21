

/* ------------------------------------------------------------------ Event Handlers --- */
function RegisterEventHandlers() {
    window.addEventListener("click", OnClick, false);
}

function OnClick(e) {
    tapX = e.clientX - surfaceCanvas.offsetLeft;
    tapY = e.clientY - surfaceCanvas.offsetTop;

    if (startButtonVisible == true) {
        if (tapX > billboard.startButtonLeft && tapX < (billboard.startButtonLeft + billboard.startButtonWidth) && tapY > billboard.startButtonTop && tapY < (billboard.startButtonTop + billboard.startButtonHeight)) {
            StartButtonClicked();
        }
    }

    if (tryAgainButtonVisible == true) {
        if (tapX > billboard.startButtonLeft && tapX < (billboard.startButtonLeft + billboard.startButtonWidth) && tapY > billboard.startButtonTop && tapY < (billboard.startButtonTop + billboard.startButtonHeight)) {
            TryAgainButtonClicked();
        }
    }

}
