$(function () {
            // Used to show output in the API Viewer at runtime, 
            // defined in external script 'apiviewer.js'    
            var apiViewer = new $.ig.apiViewer();

            var data = [
                    { "columnKey": "CompanyName", "columnHeader": "Company Name" },
                    { "columnKey": "ContactName", "columnHeader": "Contact Name" },
                    { "columnKey": "ContactTitle", "columnHeader": "Contact Title" },
                    { "columnKey": "Address", "columnHeader": "Address" },
                    { "columnKey": "City", "columnHeader": "City" }
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
                    { headerText: "Customer ID", key: "ID", dataType: "number", hidden: true },
                    { headerText: "Company Name", key: "CompanyName", dataType: "string" },
                    { headerText: "Contact Name", key: "ContactName", dataType: "string" },
                    { headerText: "Contact Title", key: "ContactTitle", dataType: "string" },
                    { headerText: "Address", key: "Address", dataType: "string" },
                    { headerText: "City", key: "City", dataType: "string" },
                    { headerText: "Country", key: "Country", dataType: "string", hidden: true }
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