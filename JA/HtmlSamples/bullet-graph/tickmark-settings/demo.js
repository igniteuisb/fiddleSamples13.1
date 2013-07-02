$(function () {
            /*----------------- Instantiation -------------------------*/
            var $bulletGraph = $("#bulletgraph");

            $bulletGraph.igBulletGraph({
                height: "150px",
                width: "700px",
                // The interval to use for the ticks.
                interval: 10,
                // Gets or sets the position at which to start rendering the major tickmarks as a value from 0 to 1, measured from the front/bottom of the gauge.
                // Values further from zero than 1 can be used to make this extend further than the normal size of the gauge.
                tickStartExtent: 0.02,
                // Gets or sets the position at which to stop rendering the major tickmarks as a value from 0 to 1, measured from the front/bottom of the gauge.
                // Values further from zero than 1 can be used to make this extend further than the normal size of the gauge.
                tickEndExtent: 0.2,
                // A value to start adding tickmarks, added to the scale's MinimumValue.
                ticksPostInitial: 0,
                // A value to stop adding tickmarks, subtracted from the scale's MaximumValue.
                ticksPreTerminal: 0,
                // Gets or sets the stroke thickness to use when rendering ticks.
                tickStrokeThickness: 2,
                // Gets or sets the brush to use for the major tickmarks.
                tickBrush: "black",
                // Gets or sets the number of minor tickmarks to place between major tickmarks.
                minorTickCount: 3,
                // Gets or sets the position at which to start rendering the minor tickmarks as a value from 0 to 1, measured from the front/bottom of the gauge.
                // Values further from zero than 1 can be used to make this extend further than the normal size of the gauge.
                minorTickStartExtent: 0.06,
                // Gets or sets the position at which to stop rendering the minor tickmarks as a value from 0 to 1, measured from the front/bottom of the gauge.
                // Values further from zero than 1 can be used to make this extend further than the normal size of the gauge.
                minorTickEndExtent: 0.2,
                // Gets or sets the stroke thickness to use when rendering minor ticks.
                minorTickStrokeThickness: 1,
                // Gets or sets the brush to use for the minor tickmarks.
                minorTickBrush: "black",
                ranges: [
                    {
                        name: 'range1',
                        startValue: 0,
                        endValue: 50
                    },
                    {
                        name: 'range2',
                        startValue: 50,
                        endValue: 80
                    },
                    {
                        name: 'range3',
                        startValue: 80,
                        endValue: 100
                    }
                ],
                targetValue: 90,
                labelInterval: 10,
                actualValue: 80,
                transitionDuration: 1000
            });

            // Ticks Interval
            $("#intervalSlider").slider({
                min: 1,
                max: 100,
                value: $bulletGraph.igBulletGraph("option", "interval"),
                slide: function (event, ui) {
                    $bulletGraph.igBulletGraph("option", "interval", ui.value);
                    $("#intervalLabel").text(ui.value);
                }
            });

            // Minor Tick Count
            $("#minorTickCountSlider").slider({
                min: 0,
                max: 10,
                value: $bulletGraph.igBulletGraph("option", "minorTickCount"),
                slide: function (event, ui) {
                    $bulletGraph.igBulletGraph("option", "minorTickCount", ui.value);
                    $("#minorTickCountLabel").text(ui.value);
                }
            });

            // Tick Start Extent
            $("#tickStartExtentSlider").slider({
                min: 0,
                max: 1,
                step: 0.01,
                value: $bulletGraph.igBulletGraph("option", "tickStartExtent"),
                slide: function (event, ui) {
                    $bulletGraph.igBulletGraph("option", "tickStartExtent", ui.value);
                    $("#tickStartExtentLabel").text(ui.value);
                }
            });

            // Tick End Extent
            $("#tickEndExtentSlider").slider({
                min: 0,
                max: 1,
                step: 0.01,
                value: $bulletGraph.igBulletGraph("option", "tickEndExtent"),
                slide: function (event, ui) {
                    $bulletGraph.igBulletGraph("option", "tickEndExtent", ui.value);
                    $("#tickEndExtentLabel").text(ui.value);
                }
            });


            // Minor Tick Start Extent
            $("#minorTickStartExtentSlider").slider({
                min: 0,
                max: 1,
                step: 0.01,
                value: $bulletGraph.igBulletGraph("option", "minorTickStartExtent"),
                slide: function (event, ui) {
                    $bulletGraph.igBulletGraph("option", "minorTickStartExtent", ui.value);
                    $("#minorTickStartExtentLabel").text(ui.value);
                }
            });

            // Minor Tick End Extent
            $("#minorTickEndExtentSlider").slider({
                min: 0,
                max: 1,
                step: 0.01,
                value: $bulletGraph.igBulletGraph("option", "minorTickEndExtent"),
                slide: function (event, ui) {
                    $bulletGraph.igBulletGraph("option", "minorTickEndExtent", ui.value);
                    $("#minorTickEndExtentLabel").text(ui.value);
                }
            });

            // Ticks Post Initial
            $("#ticksPostInitialSlider").slider({
                min: 0,
                max: 100,
                value: $bulletGraph.igBulletGraph("option", "ticksPostInitial"),
                slide: function (event, ui) {
                    $bulletGraph.igBulletGraph("option", "ticksPostInitial", ui.value);
                    $("#ticksPostInitialLabel").text(ui.value);
                }
            });

            // Ticks Post Initial
            $("#ticksPreTerminalSlider").slider({
                min: 0,
                max: 100,
                value: $bulletGraph.igBulletGraph("option", "ticksPreTerminal"),
                slide: function (event, ui) {
                    $bulletGraph.igBulletGraph("option", "ticksPreTerminal", ui.value);
                    $("#ticksPreTerminalLabel").text(ui.value);
                }
            });

            // Tick Brush
            $("#tickBrushSelect").change(function () {
                var value = $(this).val();
                $bulletGraph.igBulletGraph("option", "tickBrush", value);
                $("#tickBrushLabel").text(value);
            });

            // Tick Brush
            $("#minorTickBrushSelect").change(function () {
                var value = $(this).val();
                $bulletGraph.igBulletGraph("option", "minorTickBrush", value);
                $("#minorTickBrushLabel").text(value);
            });

            // Tick Stroke Thickness
            $("#tickStrokeThicknessSlider").slider({
                min: 1,
                max: 10,
                value: $bulletGraph.igBulletGraph("option", "tickStrokeThickness"),
                slide: function (event, ui) {
                    $bulletGraph.igBulletGraph("option", "tickStrokeThickness", ui.value);
                    $("#tickStrokeThicknessLabel").text(ui.value);
                }
            });

            // Minor Tick Stroke Thickness
            $("#minorTickStrokeThicknessSlider").slider({
                min: 1,
                max: 10,
                value: $bulletGraph.igBulletGraph("option", "minorTickStrokeThickness"),
                slide: function (event, ui) {
                    $bulletGraph.igBulletGraph("option", "minorTickStrokeThickness", ui.value);
                    $("#minorTickStrokeThicknessLabel").text(ui.value);
                }
            });
        });