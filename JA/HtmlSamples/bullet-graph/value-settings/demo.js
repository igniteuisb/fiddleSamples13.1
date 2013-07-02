$(function () {
            /*----------------- Instantiation -------------------------*/
            var $bulletGraph = $("#bulletgraph");

            $bulletGraph.igBulletGraph({
                width: "600px",
                height: "120px",
                transitionDuration: 1000,
                ranges: [
                    {
                        name: 'bad',
                        startValue: 0,
                        endValue: 50
                    },
                    {
                        name: 'acceptable',
                        startValue: 50,
                        endValue: 80
                    },
                    {
                        name: 'good',
                        startValue: 80,
                        endValue: 100
                    }
                ],
                minimumValue: 0,
                maximumValue: 100,

                actualValue: 80,
                actualValueBrush: 'black',
                actualValueOutline: 'transparent',
                actualValueInnerExtent: 0.5,
                actualValueOuterExtent: 0.65,

                targetValue: 90,
                targetValueBreadth: 4,
                targetValueStrokeThickness: 0,
                targetValueBrush: 'black',
                targetValueOutline: 'transparent'
            });


            // Logic for property switches

            // Minimum Value
            $("#minimumValueSlider").slider({
                min: 0,
                max: 100,
                value: $bulletGraph.igBulletGraph("option", "minimumValue"),
                slide: function (event, ui) {
                    $bulletGraph.igBulletGraph("option", "minimumValue", ui.value);
                    $("#minimumValueLabel").text(ui.value);
                }
            });

            // Maximum Value
            $("#maximumValueSlider").slider({
                min: 0,
                max: 100,
                value: $bulletGraph.igBulletGraph("option", "maximumValue"),
                slide: function (event, ui) {
                    $bulletGraph.igBulletGraph("option", "maximumValue", ui.value);
                    $("#maximumValueLabel").text(ui.value);
                }
            });

            // Actual Value
            $("#actualValueSlider").slider({
                min: 0,
                max: 100,
                value: $bulletGraph.igBulletGraph("option", "actualValue"),
                slide: function (event, ui) {
                    $bulletGraph.igBulletGraph("option", "actualValue", ui.value);
                    $("#actualValueLabel").text(ui.value);
                }
            });

            // Actual Value Brush
            $("#actualValueBrushSelect").change(function () {
                var value = $(this).val();
                $bulletGraph.igBulletGraph("option", "actualValueBrush", value);
            });

            // Actual Value Inner Extent
            $("#actualValueInnerExtentSlider").slider({
                min: 0,
                max: 1,
                step: 0.01,
                value: $bulletGraph.igBulletGraph("option", "actualValueInnerExtent"),
                slide: function (event, ui) {
                    $bulletGraph.igBulletGraph("option", "actualValueInnerExtent", ui.value);
                    $("#actualValueInnerExtentLabel").text(ui.value);
                }
            });

            // Actual Value Outer Extent
            $("#actualValueOuterExtentSlider").slider({
                min: 0,
                max: 1,
                step: 0.01,
                value: $bulletGraph.igBulletGraph("option", "actualValueOuterExtent"),
                slide: function (event, ui) {
                    $bulletGraph.igBulletGraph("option", "actualValueOuterExtent", ui.value);
                    $("#actualValueOuterExtentLabel").text(ui.value);
                }
            });

            // Target Value
            $("#targetValueSlider").slider({
                min: 0,
                max: 100,
                value: $bulletGraph.igBulletGraph("option", "targetValue"),
                slide: function (event, ui) {
                    $bulletGraph.igBulletGraph("option", "targetValue", ui.value);
                    $("#targetValueLabel").text(ui.value);
                }
            });

            // Target Value
            $("#targetValueBreadthSlider").slider({
                min: 0,
                max: 20,
                value: $bulletGraph.igBulletGraph("option", "targetValueBreadth"),
                slide: function (event, ui) {
                    $bulletGraph.igBulletGraph("option", "targetValueBreadth", ui.value);
                    $("#targetValueBreadthLabel").text(ui.value);
                }
            });

            // Target Value Brush
            $("#targetValueBrushSelect").change(function () {
                var value = $(this).val();
                $bulletGraph.igBulletGraph("option", "targetValueBrush", value);
            });
        });