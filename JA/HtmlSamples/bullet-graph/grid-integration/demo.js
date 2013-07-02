$(function () {
var data = [
            { month: "1 月", min: 0, max: 750, value: 555, target: 550, ranges: [{ start: 0, end: 500 }, { start: 500, end: 640 }, { start: 640, end: 750 }] },
            { month: "2 月", min: 0, max: 750, value: 670, target: 620, ranges: [{ start: 0, end: 333 }, { start: 333, end: 567 }, { start: 567, end: 750 }] },
            { month: "3 月", min: 0, max: 750, value: 670, target: 700, ranges: [{ start: 0, end: 320 }, { start: 320, end: 567 }, { start: 567, end: 750 }] },
            { month: "4 月", min: 0, max: 750, value: 610, target: 666, ranges: [{ start: 0, end: 320 }, { start: 320, end: 567 }, { start: 567, end: 750 }] }
        ];

        $(function () {

            $("#grid").igGrid({
                //width: 400,
                columns: [
                    { headerText: "月", key: "month", dataType: "string", width: 150 },
                    { headerText: "値", key: "value", dataType: "number", width: 90 },
                    { headerText: "グラフ", key: "graph", width: 470 }
                ],
                rowTemplate: "<tr><td>${month}</td><td>${value}</td><td><div class='bullet-graph'></div></td></tr>",
                dataSource: data,
                autoGenerateColumns: false,
                rowsRendered: function (evt, ui) {
                    $(".bullet-graph").each(function (i) {
                        var item = data[i];
                        $(this).igBulletGraph({
                            height: "80px",
                            width: "450px",
                            minimumValue: item.min,
                            maximumValue: item.max,
                            targetValue: item.target,
                            actualValue: item.value,
                            interval: 150,
                            minorTickCount: 4,
                            ranges: $.map(item.ranges, function (el, index) {
                                return {
                                    name: item.month + index,
                                    startValue: el.start,
                                    endValue: el.end
                                };
                            }),
                            transitionDuration: 1200
                        });
                    });
                },
                features: [
                    {
                        name: "Updating",
                        enableAddRow: false,
                        editMode: "cell",
                        enableDeleteRow: false,
                        showReadonlyEditors: false,
                        enableDataDirtyException: false,
                        columnSettings: [
                            {
                                columnKey: "value",
                                editorType: "numeric",
                                validation: true,
                                editorOptions: { minValue: 0, maxValue: 750, required: true }
                            },
                            {
                                columnKey: "month",
                                readOnly: true
                            },
                            {
                                columnKey: "graph",
                                readOnly: true
                            }
                        ],
                        editCellEnded: function (evt, ui) {
                            $(".bullet-graph").eq(ui.rowID).igBulletGraph("option", "actualValue", ui.value);
                        }
                    }],
                caption: "エネルギー源"
            });
        });});