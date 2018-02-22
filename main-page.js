const fromObject = require("data/observable").fromObject;
var accService = require("nativescript-accelerometer");

var page;
var _tilting;

var pageData = fromObject({
    xData: 0.0,
    yData: 0.0,
    zData: 0.0
});

exports.unloaded= function(){
    accService.stopAccelerometerUpdates();
    clearTimeout(_tilting);

    console.log("unloaded");
}

exports.loaded= function(args){
  page = args.object;

  page.bindingContext = pageData;

    _tilting = setTimeout(function() {
        accService.startAccelerometerUpdates(function(data) {
            pageData.xData = (data.x).toFixed(5);
            pageData.yData = (data.y).toFixed(5);
            pageData.zData = (data.z).toFixed(5);

        },{ sensorDelay: "normal" })
    }, 300);

    console.log("page loaded");
}

