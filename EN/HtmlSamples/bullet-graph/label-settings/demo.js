$(function () {
            /*----------------- Instantiation -------------------------*/
            var $bulletGraph = $("#bulletgraph");

            $bulletGraph.igBulletGraph({
                height: "150px",
                width: "700px",
                // Gets or sets the interval to use for rendering labels. This defaults to be the same interval as the tickmarks on the scale.
                // labelExtent: 0.2,
                // Gets or sets the interval to use for rendering labels. This defaults to be the same interval as the tickmarks on the scale.
                labelInterval: 5,
                // A value to start adding labels, added to the scale's MinimumValue.
                labelsPostInitial: 0,
                // A value to stop adding labels, subtracted from the scale's MaximumValue.
                labelsPreTerminal: 0,
                // Gets or sets the brush to use for the label font.
                fontBrush: "black",
                font: "20px Segoe UI",
                formatLabel: function (evt, ui) {
                    ui.label = ui.value + " K";
                },
                alignLabel: function (evt, ui) {
                    // center the just the number part according to its tick, instead of centering the whole label
                    ui.offsetX += parseInt(ui.owner.option('font')) / 2 - 1;
                },
                ranges: [
                    {
                        name: 'range1',
                        startValue: 0,
                        endValue: 27
                    },
                    {
                        name: 'range2',
                        startValue: 27,
                        endValue: 29
                    },
                    {
                        name: 'range3',
                        startValue: 29,
                        endValue: 50
                    }
                ],
                maximumValue: 50,
                targetValue: 34,
                actualValue: 38,
                actualValueInnerExtent: 0.46,
                actualValueOuterExtent: 0.54,
                rangeOuterExtent: 0.8,
                transitionDuration: 1000
            });


            // Label Extent
            $("#labelExtentSlider").slider({
                min: 0,
                max: 1,
                step: 0.01,
                value: $bulletGraph.igBulletGraph("option", "labelExtent"),
                slide: function (event, ui) {
                    $bulletGraph.igBulletGraph("option", "labelExtent", ui.value);
                    $("#labelExtentLabel").text(ui.value);
                }
            });

            // Label Interval
            $("#labelIntervalSlider").slider({
                min: 5,
                max: 50,
                value: $bulletGraph.igBulletGraph("option", "labelInterval"),
                slide: function (event, ui) {
                    $bulletGraph.igBulletGraph("option", "labelInterval", ui.value);
                    $("#labelIntervalLabel").text(ui.value);
                }
            });

            // Labels Post Initial
            $("#labelsPostInitialSlider").slider({
                min: 0,
                max: 100,
                value: $bulletGraph.igBulletGraph("option", "labelsPostInitial"),
                slide: function (event, ui) {
                    $bulletGraph.igBulletGraph("option", "labelsPostInitial", ui.value);
                    $("#labelsPostInitialLabel").text(ui.value);
                }
            });

            // Labels Pre Terminal
            $("#labelsPreTerminalSlider").slider({
                min: 0,
                max: 100,
                value: $bulletGraph.igBulletGraph("option", "labelsPreTerminal"),
                slide: function (event, ui) {
                    $bulletGraph.igBulletGraph("option", "labelsPreTerminal", ui.value);
                    $("#labelsPreTerminalLabel").text(ui.value);
                }
            });

            // Font Brush
            $("#fontBrushSelect").change(function () {
                var value = $(this).val();
                $bulletGraph.igBulletGraph("option", "fontBrush", value);
            });

            // Font Size
            $("#fontSizeSelect").change(function () {
                var value = $(this).val() + " Segoe UI";
                $bulletGraph.igBulletGraph("option", "font", value);
            });
        });