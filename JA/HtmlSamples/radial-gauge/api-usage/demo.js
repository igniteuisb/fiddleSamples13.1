$(function () {

            // Used to show output in the API Viewer at runtime, 
            // defined in external script 'apiviewer.js'    
            var apiViewer = new $.ig.apiViewer();

            /*----------------- Method & Option Examples -------------------------*/
            
            // process events of buttons

            $("#selectValue").change(function (e) {
                $("#needleValue").val($(this).val());
            });

            $("#changeNeedleValue").on({
                click: function (e) {
                    var needleValue = $("#needleValue").val();

                    var minimumValue = 0;
                    var maximumValue = 100;

                    if (needleValue >= minimumValue && needleValue <= maximumValue) {
                        $("#radialGauge").igRadialGauge("option", "value", needleValue);
                    }
                    else if (needleValue < minimumValue) {
                        $("#radialGauge").igRadialGauge("option", "value", 0);
                        $("#needleValue").val(0);
                    }
                    else if (needleValue > maximumValue) {
                        $("#radialGauge").igRadialGauge("option", "value", 100);
                        $("#needleValue").val(100);
                    };
                }
            });
                  
            var prevValue = null;
            $("#getNeedleValue").on({
                click: function (e) {
                    var needleValue = $("#radialGauge").igRadialGauge("option", "value");
                    if (prevValue == null || prevValue != needleValue) {
                        apiViewer.log("現在の針値: " + needleValue);
                        prevValue = needleValue;
                    }
                }
            });
                      
            /*----------------- Instantiation -------------------------*/

            $("#radialGauge").igRadialGauge({
                height: "500px",
                transitionDuration: "1500",
                width: "500px"                
            });

            function isAndroid() {
                return navigator.userAgent.match(/Android/i) ? true : false;
            }

            $("#radialGauge").igRadialGauge("option", "value", 0);
            $("#needleValue").val(0);

            window.onload = function () {
                if (!isAndroid())
                    document.getElementById("selectValue").style.border = "none";
            };
        });