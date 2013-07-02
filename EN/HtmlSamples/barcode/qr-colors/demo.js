$(function () {
            $("#barcode").igQRCodeBarcode({
                height: "300px",
                width: "300px",
                data: "http://www.infragistics.com/products/jquery/"
            });

            $("#backingBrush").change(function () {
                var val = $("#backingBrush").val().toLowerCase();
                $("#barcode").igQRCodeBarcode("option", "backingBrush", val);
            });

            $("#backingOutline").change(function () {
                var val = $("#backingOutline").val().toLowerCase();
                $("#barcode").igQRCodeBarcode("option", "backingOutline", val);
                $("#backingStrokeThickness").slider().css("background",val);
            });

            $("#barBrush").change(function () {
                var val = $("#barBrush").val().toLowerCase();
                $("#barcode").igQRCodeBarcode("option", "barBrush", val); 
            });

            $("#backingStrokeThickness").slider({
                min: 0,
                max: 10, 
                value: 10,
                step: 1,

                slide: function (event, ui) {
                    if (ui.value == 0) {
                        $("#barcode").igQRCodeBarcode("option", "backingStrokeThickness", 0.01);
                        //alert("0");
                    } else {
                        $("#barcode").igQRCodeBarcode("option", "backingStrokeThickness", ui.value);
                    }
                    
                }
            });
        });