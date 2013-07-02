$(function () {
            /*----------------- Instantiation -------------------------*/
            var $bulletGraph = $("#bulletgraph"),
                range = {
                    name: 'range',
                    startValue: 0,
                    endValue: 100,
                    innerStartExtent: 0.2,
                    outerStartExtent: 0.95,
                    innerEndExtent: 0.2,
                    outerEndExtent: 0.95,
                    strokeThickness: 2
                };
            $bulletGraph.igBulletGraph({
                width: "750px",
                height: "150px",
                ranges: [
                    range
                ],
                targetValue: 90,
                actualValue: 80,
                transitionDuration: 1000
        });


            // Start Value
            $("#startValueSlider").slider({
                min: 0,
                max: 100,
                value: range.startValue, //$bulletGraph.igBulletGraph("option", "range"),
                slide: function (event, ui) {
                    range.startValue = ui.value;
                    $bulletGraph.igBulletGraph("option", "ranges", [range]);
                    $("#startValueLabel").text(ui.value);
                }
            });

            // End Value
            $("#endValueSlider").slider({
                min: 0,
                max: 100,
                value: range.endValue, //$bulletGraph.igBulletGraph("option", "range"),
                slide: function (event, ui) {
                    range.endValue = ui.value;
                    $bulletGraph.igBulletGraph("option", "ranges", [range]);
                    $("#endValueLabel").text(ui.value);
                }
            });

            // Inner Start Extent
            $("#innerStartExtentSlider").slider({
                min: 0,
                max: 1,
                step: 0.01,
                value: range.innerStartExtent, //$bulletGraph.igBulletGraph("option", "range"),
                slide: function (event, ui) {
                    range.innerStartExtent = ui.value;
                    $bulletGraph.igBulletGraph("option", "ranges", [range]);
                    $("#innerStartExtentLabel").text(ui.value);
                }
            });

            // Outer Start Extent
            $("#outerStartExtentSlider").slider({
                min: 0,
                max: 1,
                step: 0.01,
                value: range.outerStartExtent, //$bulletGraph.igBulletGraph("option", "range"),
                slide: function (event, ui) {
                    range.outerStartExtent = ui.value;
                    $bulletGraph.igBulletGraph("option", "ranges", [range]);
                    $("#outerStartExtentLabel").text(ui.value);
                }
            });

            // Inner End Extent
            $("#innerEndExtentSlider").slider({
                min: 0,
                max: 1,
                step: 0.01,
                value: range.innerEndExtent, //$bulletGraph.igBulletGraph("option", "range"),
                slide: function (event, ui) {
                    range.innerEndExtent = ui.value;
                    $bulletGraph.igBulletGraph("option", "ranges", [range]);
                    $("#innerEndExtentLabel").text(ui.value);
                }
            });

            // Outer End Extent
            $("#outerEndExtentSlider").slider({
                min: 0,
                max: 1,
                step: 0.01,
                value: range.outerEndExtent, //$bulletGraph.igBulletGraph("option", "range"),
                slide: function (event, ui) {
                    range.outerEndExtent = ui.value;
                    $bulletGraph.igBulletGraph("option", "ranges", [range]);
                    $("#outerEndExtentLabel").text(ui.value);
                }
            });

            // Outer End Extent
            $("#strokeThicknessSlider").slider({
                min: 0,
                max: 10,
                value: range.strokeThickness, //$bulletGraph.igBulletGraph("option", "range"),
                slide: function (event, ui) {
                    range.strokeThickness = ui.value;
                    $bulletGraph.igBulletGraph("option", "ranges", [range]);
                    $("#strokeThicknessLabel").text(ui.value);
                }
            });

            // Brush
            $("#brushSelect").change(function () {
                range.brush = $(this).val();;
                $bulletGraph.igBulletGraph("option", "ranges", [range]);
            });

            // Outline
            $("#outlineSelect").change(function () {
                range.outline = $(this).val();;
                $bulletGraph.igBulletGraph("option", "ranges", [range]);
            });
        });