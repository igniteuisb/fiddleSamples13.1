$(function () {
            $("#radialgauge").igRadialGauge({
                height: "500px",
                width: "500px",
                transitionDuration: "1500"
            });

            var isDragging = false;
            // Start the needle drag only on a mousedown on the needle
            document.getElementById("radialgauge").addEventListener("mousedown", function (e) {
                isDragging = true;
            });

            // Drag the needle to the new point only if the point being dragged to is inside the needle
            document.getElementById("radialgauge").addEventListener("mousemove", function (e) {
                dragNeedle(e);
            });

            // Drag the needle to the final new point only if the point being dragged to is inside the needle
            document.getElementById("radialgauge").addEventListener("mouseup", function (e) {
                dragNeedle(e);
                isDragging = false;
            });

            // Function that performs the needle drag to the new point
            function dragNeedle(e) {
                var minimumValue = 0;
                var maximumValue = 100;

                var startValue = minimumValue <= maximumValue ? minimumValue : maximumValue;
                var endValue = minimumValue > maximumValue ? minimumValue : maximumValue;

                var pointX = e.pageX - $("#radialgauge").offset().left;
                var pointY = e.pageY - $("#radialgauge").offset().top;
                var value = $("#radialgauge").igRadialGauge("getValueForPoint", pointX, pointY);

                var isClickPointValid = true;
                if (!isMobile())
                    isClickPointValid = $("#radialgauge").igRadialGauge("needleContainsPoint", pointX, pointY);

                if (value >= startValue && value <= endValue && isDragging.toString() == "true"
                    && value && !isNaN(value) && isClickPointValid.toString() == "true")
                    $("#radialgauge").igRadialGauge("option", "value", value);
            }

            // Check if the sample is being used in the following mobile devices
            function isMobile() {
                return navigator.userAgent.match(/Android/i) ||
						navigator.userAgent.match(/iPhone|iPad|iPod/i) ||
						navigator.userAgent.match(/IEMobile/i) ||
						navigator.userAgent.match(/BlackBerry/i) ||
						navigator.userAgent.match(/Opera Mini/i) ||
						navigator.userAgent.match(/webOS/i) ||
						navigator.userAgent.match(/Windows Phone/i) ||
						navigator.userAgent.match(/ZuneWP7/i) ? true : false;
            }
        });

        // Transiton Duration Slider
        $("#transitionDurationSlider").slider({
            min: 0,
            max: 5,
            step: 0.01,
            value: 2,
            slide: function (event, ui) {
                $("#radialgauge").igRadialGauge("option", "transitionDuration", ui.value * 1000);
                $("#transitionDurationLabel").text(ui.value);
            }
        });