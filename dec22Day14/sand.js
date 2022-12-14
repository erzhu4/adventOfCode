module.exports = class SandUnit {
    currentPosition;
    previousPostion;
    mapReference;
    config = {};
    hasSettled = false;
    
    constructor(mapReference, startLocation, config){
        this.mapReference = mapReference;
        this.config = config;
        this.currentPosition = [startLocation[0], startLocation[1]];
        this.previousPostion = [startLocation[0], startLocation[1]];
        this.drawSelfOnMap();
    }

    settle(){
        this.hasSettled = true;
    }

    fallOnce(){
        let spaceBelow = this.mapReference[this.currentPosition[0] + 1][this.currentPosition[1]];
        if (spaceBelow == this.config.emptyAirChar){
            this.previousPostion = [this.currentPosition[0], this.currentPosition[1]];
            this.currentPosition = [this.currentPosition[0] + 1, this.currentPosition[1]];
            return;
        }
        let spaceBelowLeft = this.mapReference[this.currentPosition[0] + 1][this.currentPosition[1] - 1];
        if (spaceBelowLeft == this.config.emptyAirChar){
            this.previousPostion = [this.currentPosition[0], this.currentPosition[1]];
            this.currentPosition = [this.currentPosition[0] + 1, this.currentPosition[1] - 1];
            return;
        }

        let spaceBelowRight = this.mapReference[this.currentPosition[0] + 1][this.currentPosition[1] + 1];
        if (spaceBelowRight == this.config.emptyAirChar){
            this.previousPostion = [this.currentPosition[0], this.currentPosition[1]];
            this.currentPosition = [this.currentPosition[0] + 1, this.currentPosition[1] + 1];
            return;
        }
        this.settle();
    }

    drawSelfOnMap(){
        this.mapReference[this.previousPostion[0]][this.previousPostion[1]] = this.config.emptyAirChar;
        if (this.hasSettled){
            this.mapReference[this.currentPosition[0]][this.currentPosition[1]] = this.config.settledSandChar;
        } else {
            this.mapReference[this.currentPosition[0]][this.currentPosition[1]] = this.config.fallingSandChar;
        }
    }

    tick(){
        if (this.currentPosition[0] >= (this.mapReference.length - 1)){
            this.settle();
        } else {
            this.fallOnce();
        }
        this.drawSelfOnMap();
    }
};