$(function () {
            /*----------------- Instantiation -------------------------*/
            var $bulletGraph = $("#bulletgraph");

            $bulletGraph.igBulletGraph({
                height: "600px",
                width: "120px",
                orientation: "vertical",
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
                actualValue: 85,
                targetValue: 77,
                interval: 10,
                transitionDuration: 500
        });


            // Orientation
            $("#orientationButton").click(function () {
                var value = $bulletGraph.igBulletGraph("option", "orientation") == "vertical" ? "horizontal" : "vertical",
                    displayValue = value == "horizontal" ? "Vertical" : "Horizontal",
                    width = $bulletGraph.igBulletGraph("option", "height"),
                    height = $bulletGraph.igBulletGraph("option", "width");
                $bulletGraph.igBulletGraph("option", "orientation", value);
                $bulletGraph.igBulletGraph("option", "width", width);
                $bulletGraph.igBulletGraph("option", "height", height);

                $("#orientationButton").text(displayValue);
            });

            // Scale Inversion
            $("#isScaleInvertedCheckBox").click(function () {
                $bulletGraph.igBulletGraph("option", "isScaleInverted", $(this).is(":checked"));
            });
        });