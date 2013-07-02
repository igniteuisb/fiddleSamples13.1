$(function () {
            $("#map").igMap({
                width: "700px",
                verticalZoomable: true,
                horizontalZoomable: true,
                backgroundContent: {
                    type: "openStreet"
                },
                series: [{
                    type: "geographicHighDensityScatter",
                    name: "australiaMap",
                    dataSource: placeData,
                    latitudeMemberPath: "lat",
                    longitudeMemberPath: "lon",
                    mouseOverEnabled: true,
                    showTooltip: true,
                    tooltipTemplate: "cityTemplate",
                    progressiveLoad: true,
                    progressiveLoadStatusChanged: function (evt, ui) {
                        alert("here");
                    }
                }],
                windowResponse: "immediate",
                windowRect: {
                    left: 0.27,
                    top: 0.20,
                    height: 0.45,
                    width: 0.45
                }
            });

            // Resolution
             $("#resolutionSlider").slider({
                min: 0,
                max: 10,
                value: 0,
                slide: function (event, ui) {
                  $("#map").igMap("option", "series", [{ name: "australiaMap", resolution: ui.value}]);
                  $("#resolutionLabel").text(ui.value);
                }
            });
      
           // Minimum Heat Value
           $("#minimumHeatValueSlider").slider({
                min: 0,
                max: 100,
                value: 0,
                slide: function (event, ui) {
                  $("#map").igMap("option", "series", [{ name: "australiaMap", minimumHeat: ui.value}]);
                  $("#minimumHeatValueLabel").text(ui.value);
                }
            });

           // Maximum Heat Value
           $("#maximumHeatValueSlider").slider({
                min: 0,
                max: 100,
                value: 50,
                slide: function (event, ui) {
                  $("#map").igMap("option", "series", [{ name: "australiaMap", maximumHeat: ui.value}]);
                  $("#maximumHeatValueLabel").text(ui.value);
                }
            });

           // Point Extent
           $("#pointExtentSlider").slider({
                min: 0,
                max: 20,
                value: 1,
                slide: function (event, ui) {
                  $("#map").igMap("option", "series", [{ name: "australiaMap", pointExtent: ui.value}]);
                  $("#pointExtentLabel").text(ui.value);
                }
            });

           // Heat Minimum Color
           $("#minimumHeatColorDropDown").on({
                change: function (e) {
                    var minColor = $(this).val();
                    $("#map").igMap("option", "series", [{ name: "australiaMap", heatMinimumColor: minColor}]);
                }
            });

           // Heat Maximum Color
           $("#maximumHeatColorDropDown").on({
                change: function (e) {
                    var maxColor = $(this).val();
                    $("#map").igMap("option", "series", [{ name: "australiaMap", heatMaximumColor: maxColor}]);
                }
            });

           // Enable Mouse Over
           $("#enableMouseOverCheckBox").click(function (e) {
                var enableMouseOverSeries = $("#enableMouseOverCheckBox").is(":checked") ? true : false;
                 $("#map").igMap("option", "series", [{ name: "australiaMap", mouseOverEnabled: enableMouseOverSeries}]);
           });
            
           // Use Brute Force
           $("#useBruteForceCheckBox").click(function (e) {
               var useBruteForceSeries = $("#useBruteForceCheckBox").is(":checked") ? true : false;
               $("#map").igMap("option", "series", [{ name: "australiaMap", useBruteForce: useBruteForceSeries }]);
            });

           // Progress Bar 
           $(function () { $("#seriesLoadingProgressBar").progressbar({ value: 37 }); });
            
           // Generate Data Button
           $("#generateDataButton").click(function (e) {
               $("#map").igMap("option", "series", [{ name: "australiaMap", dataSource: null }]);
               $("#map").igMap("option", "series", [{ name: "australiaMap", dataSource: placeData }]);
           });

           // Zoom into Australia 
           var zoom = $("#map").igMap("getZoomFromGeographic", { top: (-45), left: (110), width: 50, height: 40 });
           $("#map").igMap("option", "windowRect", zoom);
        });