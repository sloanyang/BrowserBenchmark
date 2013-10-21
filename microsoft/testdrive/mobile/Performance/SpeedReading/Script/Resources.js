

/* --------------------------------------------------------------- Resource Loading --- */


var imgBackground;
var imgTile;
var imgTileFlipped;
var imgChar;
var imgCharBase;
var imgCharFlipped;
var imgCharSpinning;
var imgBillboardBackground;
var imgBillboardReflection;
var imgStartButton;
var imgStartButtonHover;
var imgTryAgainButton;
var imgTryAgainButtonHover;
var imgTitle;
var currentAlpha;



function LoadResources() {

    DisplayLoadingText();

    cResourcesLoaded = 0;
    cResourcesToLoad = 7;

    imgTile = new Image();
    imgTile.onload = ResourceLoadComplete;
    imgTile.src = "Images/TileImageStrip.png";

    imgTileFlipped = new Image();
    imgTileFlipped.onload = ResourceLoadComplete;
    imgTileFlipped.src = "Images/TileImageStripFlipped.png";

    imgCharBase = new Image();
    imgCharBase.onload = ResourceLoadComplete;
    imgCharBase.src = "Images/CharacterImageStrip.png";

    imgCharFlipped = new Image();
    imgCharFlipped.onload = ResourceLoadComplete;
    imgCharFlipped.src = "Images/CharacterImageStripFlipped.png";

    imgCharSpinning = new Image();
    imgCharSpinning.onload = ResourceLoadComplete;
    imgCharSpinning.src = "Images/CharacterImageStripSpinning.png";

    imgBillboardBackground = new Image();
    imgBillboardBackground.onload = ResourceLoadComplete;
    imgBillboardBackground.src = "Images/BillboardBackground.png";

    /*
    imgBillboardReflection = new Image();
    imgBillboardReflection.onload = ResourceLoadComplete;
    imgBillboardReflection.src = "Images/BillboardReflection.png";
    */

    imgStartButton = new Image();
    imgStartButton.onload = ResourceLoadComplete;
    imgStartButton.src = "Images/ButtonStart.png";

}



function WaitForResourceLoad() {
    if (resourceLoadCompleted == true) {
        currentAlpha = 0;
        HideLoadingText();
    }
    else {
        setTimeout(WaitForResourceLoad, SINGLE_CYCLE);
    }
}



function ResourceLoadComplete() {
    cResourcesLoaded++;
    if (cResourcesLoaded == cResourcesToLoad) {
        resourceLoadCompleted = true;
    }
}
var resourceLoadCompleted = false;



function DisplayLoadingText() {
    surface.save();
    surface.translate(surfaceWidth / 2, surfaceHeight / 2);
    surface.fillStyle = 'rgb(0,0,0)';
    surface.fillRect(0, 0, surfaceWidth, surfaceHeight);
    surface.font = "16pt Verdana";
    surface.fillStyle = 'rgba(0,0,0,0.3)';
    surface.textAlign = "center";
    surface.fillText("Loading Images...", 100, 100);
    surface.restore();
    WaitForResourceLoad();
}



function HideLoadingText() {
    if (currentAlpha < 0) { // jweberTBD
        surface.fillStyle = 'rgba(255,255,255, ' + currentAlpha + ')';
        surface.fillRect(0, 0, surfaceWidth, surfaceHeight);
        currentAlpha = currentAlpha + .01;
        setTimeout(HideLoadingText, SINGLE_CYCLE);
    }
    else {
        currentAlpha = 1;
        setTimeout(DisplayInitialBlankBillboard, 15);
    }
}
