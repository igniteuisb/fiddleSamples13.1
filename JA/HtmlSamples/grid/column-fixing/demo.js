$(function () {
            // Used to show output in the API Viewer at runtime, 
            // defined in external script 'apiviewer.js'    
            var apiViewer = new $.ig.apiViewer();

            /*----------------- Method & Option Examples -------------------------*/

            $("input[name='initialFixDirection']").click(function () {
                $("#grid2").igGridColumnFixing("destroy");
                $("#grid2").igGrid("destroy");
                createGrid();
            });

            /*----------------- Event Examples -------------------------*/
            // Event: columnFixed
            $("#grid2").on("iggridcolumnfixingcolumnfixed", function (evt, ui) {
                var message = "columnFixed イベントが次の列キーのために発生しました: " + ui.columnIdentifier + "<br/>";
                apiViewer.log(message);
                return;
            });
            // Event: columnUnfixed
            $("#grid2").on("iggridcolumnfixingcolumnunfixed", function (evt, ui) {
                var message = "columnUnfixed イベントが次の列キーのために発生しました: " + ui.columnIdentifier + "<br/>";
                apiViewer.log(message);
                return;
            });
            // Event: columnFixingRefused
            $("#grid2").on("iggridcolumnfixingcolumnfixingrefused", function (evt, ui) {
                var message = "columnFixingRefused イベントが次の列キーのために発生しました: " + ui.columnIdentifier + "<br/>";
                apiViewer.log(message);
                return;
            });

            /*----------------- Instantiation -------------------------*/
            createGrid();
        });

        function createGrid() {
            var initialDirection = $('input:radio[name=initialFixDirection]:checked').val();

            $("#grid2").igGrid({
                columns: [
                    { headerText: "顧客 ID", key: "ID", dataType: "string", width: "150px" },
                    { headerText: "会社名", key: "CompanyName", dataType: "string", width: "130px" },
                    { headerText: "名前", key: "ContactName", dataType: "string", width: "100px" },
                    { headerText: "連絡先", key: "ContactTitle", dataType: "string", width: "160px" },
                    { headerText: "住所", key: "Address", dataType: "string", width: "180px" },
                    { headerText: "市", key: "City", dataType: "string", width: "110px" },
                    { headerText: "国名", key: "Country", dataType: "string", width: "100px" }
                ],
                autoGenerateColumns: false,
                dataSource: nwCustomersWithOrders,
                width: "740px",
                height: "400px",
                features: [
                    {
                        name: "ColumnFixing",
                        fixingDirection: initialDirection,
                        columnSettings: [
                            {
                                columnKey: "CompanyName",
                                isFixed: true,
                                allowFixing: false
                            },
                            {
                                columnKey: "ContactName",
                                isFixed: true
                            },
                            {
                                columnKey: "ContactTitle",
                                allowFixing: false
                            }
                        ]
                    }
                ]
            });
        }