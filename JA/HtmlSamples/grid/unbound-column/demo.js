$(function () {

            // Used to show output in the API Viewer at runtime, 
            // defined in external script 'apiviewer.js'           
            var apiViewer = new $.ig.apiViewer();

            var _isDataBound = false;

            /*----------------- Method & Option Examples -------------------------*/
            $("#getUnboundValues").igButton({ labelText: $("#getUnboundValues").val() });
            $("#getUnboundValues").click(function (e) {
                var columnText = $("#columnText").val();
                var column = $('#grid').igGrid("columnByText", $.trim(columnText));
                var unboundValues = $('#grid').igGrid('getUnboundValues', column.key);
                message = "列のバインドされていない値: " + unboundValues;
                apiViewer.log(message);
            });

            $("#getUnboundColumnByKey").igButton({ labelText: $("#getUnboundColumnByKey").val() });
            $("#getUnboundColumnByKey").click(function (e) {
                var columnText = $("#columnText").val();
                var column = $('#grid').igGrid("columnByText", $.trim(columnText));
                var unboundColumn = $('#grid').igGrid('getUnboundColumnByKey', column.key);

                var message = "列の数式関数: " + unboundColumn.formula;
                apiViewer.log(message);
                message = "列の形式: " + unboundColumn.format;
                apiViewer.log(message);
                message = "列のテンプレート: " + unboundColumn.template;
                apiViewer.log(message);
                message = "列の dataType: " + unboundColumn.dataType;
                apiViewer.log(message);
            });

            $("#setUnboundValues").igButton({ labelText: $("#setUnboundValues").val() });
            $("#setUnboundValues").click(function (e) {
                var i, vals = [], boolVals = [];

                for (i = 0; i < 10; i++) {
                    vals.push(new Date());
                    boolVals.push(false);
                }
                $('#grid').igGrid('setUnboundValues', 'PromotionExpDate', vals);
                $('#grid').igGrid('setUnboundValues', 'IsPromotion', boolVals);
                return;
            });

            /*----------------- Event Examples -------------------------*/

            $("#grid").on("iggridupdatingdatadirty", function (event, ui) {
                $("#grid").igGrid("saveChanges");
                return false;
            });

            $("#grid").on("iggridcellclick", function (event, ui) {
                var cell = $('#grid').igGrid("cellAt", ui.colIndex, ui.rowIndex);

                if (ui.colKey == "Total") {
                    apiViewer.log("すべてのセル テキスト: " + $(cell).text());
                }
            });

            $("#grid").on("iggriddatabound", function (event, ui) {

                if (_isDataBound === false) {
                    _isDataBound = true;
                } else {
                    return;
                }

                var i, grid = ui.owner,
                       ds = grid.dataSource,
                       data = ds.data(),
                       dataLength = data.length;

                for (i = 0; i < dataLength; i++) {
                    if (data[i]["UnitPrice"] * data[i]["UnitsInStock"] < 1000) {
                        data[i]["IsPromotion"] = true;
                    }
                    else {
                        data[i]["IsPromotion"] = false;
                    }
                }
            });

            $("#grid").on("iggridupdatingeditrowended", function (event, ui) {
                var unitPrice = ui.values['UnitPrice'];
                var unitsInStock = ui.values['UnitsInStock'];
                var totalValue = (unitPrice * unitsInStock) || ui.values["Total"];
                $("#grid").igGridUpdating("setCellValue", ui.rowID, "Total", totalValue);

                if (totalValue < 1000) {
                    $("#grid").igGridUpdating("setCellValue", ui.rowID, "IsPromotion", true);
                }
                else {
                    $("#grid").igGridUpdating("setCellValue", ui.rowID, "IsPromotion", false);
                }
            });

            /*----------------- Instantiation -------------------------*/
            $("#grid").igGrid({
                primaryKey: "ProductID",
                width: '100%',
                height: '600px',
                autoGenerateColumns: false,
                autoCommit: true,
                dataSourceType: 'json',
                responseDataKey: "results",
                columns: [
                    { headerText: "製品 ID", key: "ProductID", dataType: "number" },
                    { headerText: "製品名", key: "ProductName", dataType: "string" },
                    { headerText: "在庫数:", key: "UnitsInStock", dataType: "number" },
                    { headerText: "単価", key: "UnitPrice", dataType: "number", format: "currency" },
                    {
                        headerText: "プロモーション期限", key: "PromotionExpDate", dataType: "date", unbound: true,
                        unboundValues: [new Date('4/24/2012'), new Date('8/24/2012'), new Date('6/24/2012'), new Date('7/24/2012'), new Date('9/24/2012'), new Date('10/24/2012'), new Date('11/24/2012')]
                    },
                    { headerText: "プロモーション", key: "IsPromotion", dataType: "bool", unbound: true, format: "checkbox" },
                    {
                        headerText: "合計", key: "Total", dataType: "number", unbound: true,
                        formula: function CalculateTotal(data, grid) { return data["UnitPrice"] * data["UnitsInStock"]; }, template: "Total: ${Total}"
                    }
                ],

                tabIndex: 1,
                features:
                [
                    {
                        name: 'Filtering',
                        mode: 'advanced'
                    },
                    {
                        name: 'MultiColumnHeaders'
                    },
                    {
                        name: 'Sorting',
                        type: "local"
                    },
                    {
                        name: "Summaries"
                    },
                    {
                        name: "ColumnMoving",
                    },
                    {
                        name: "GroupBy",
                        type: "local"
                    },
                    {
                        name: 'Paging',
                        type: "local",
                        pageSizeList: [5, 10, 25, 50],
                        pageSize: 10
                    },
                    {
                        name: "Hiding"
                    },
                    {
                        name: "Updating",
                        editMode: 'row',
                        enableAddRow: false,
                        enableDeleteRow: true,
                        columnSettings: [
                            {
                                columnKey: "Total",
                                editorType: 'numeric',
                                readOnly: true
                            },
                            {
                                columnKey: "IsPromotion",
                                editorType: 'bool',
                                readOnly: true
                            }
                        ]
                    },
                    {
                        name: "Selection",
                        mode: "row",
                        multipleSelection: true
                    }
                ],
                dataSource: northwindProducts
            });
        });