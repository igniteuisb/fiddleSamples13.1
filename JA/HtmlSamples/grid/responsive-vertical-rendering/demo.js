$(function () {
            // Used to show output in the API Viewer at runtime, 
            // defined in external script 'apiviewer.js'    
            var apiViewer = new $.ig.apiViewer();

            var data = [
                    { "columnKey": "CompanyName", "columnHeader": "会社名" },
                    { "columnKey": "ContactName", "columnHeader": "名前" },
                    { "columnKey": "ContactTitle", "columnHeader": "連絡先" },
                    { "columnKey": "Address", "columnHeader": "住所" },
                    { "columnKey": "City", "columnHeader": "市" }
            ];

            $("#gridColumns").igCombo({
                dataSource: data, //JSON Array defined above         
                valueKey: "columnKey",
                textKey: "columnHeader",
                width: "300px"
            });

            $("#igButtonSort").igButton({ labelText: $("#igButtonSort").val() });

            $("#igButtonSort").on({
                click: function (e) {
                    var columnKey = $("#gridColumns").igCombo("value");
                    $('#grid7').igGridSorting('sortColumn', columnKey, 'ascending');
                }
            });

            $('#propertiesEditor').igPercentEditor({
                displayFactor: 1,
                minValue: 20,
                maxValue: 80,
                symbol: "%",
                dataMode: 'sbyte',
                button: 'spin',
                width: 220,
                nullText: "propertiesColumnWidth",
                valueChanged: function (evt, ui) {
                    $('#grid7').igGridResponsive('option', 'propertiesColumnWidth', ui.value);
                }
            });

            $("#grid7").igGrid({
                columns: [
                    { headerText: "顧客 ID", key: "ID", dataType: "number", hidden: true },
                    { headerText: "会社名", key: "CompanyName", dataType: "string" },
                    { headerText: "名前", key: "ContactName", dataType: "string" },
                    { headerText: "連絡先", key: "ContactTitle", dataType: "string" },
                    { headerText: "住所", key: "Address", dataType: "string" },
                    { headerText: "市", key: "City", dataType: "string" },
                    { headerText: "国名", key: "Country", dataType: "string", hidden: true }
                ],
                primaryKey: "ID",
                autoGenerateColumns: false,
                dataSource: nwCustomersWithOrders,
                height: "600px",
                width: "740px",
                features: [
                    {
                        name: "Responsive",
                        enableVerticalRendering: true,
                        windowWidthToRenderVertically: null,
                        propertiesColumnWidth: "40%",
                        valuesColumnWidth: "60%",
                        allowedColumnWidthPerType: {
                            string: 120,
                            number: 50,
                            bool: 50,
                            date: 80,
                            object: 150
                        }
                    },
                    {
                        name: "Paging",
                        type: "local",
                        pageSize: 5
                    },
                    {
                        name: "Sorting",
                        type: "local"
                    },
                    {
                        name: "Selection"
                    }
                ]
            });
        });