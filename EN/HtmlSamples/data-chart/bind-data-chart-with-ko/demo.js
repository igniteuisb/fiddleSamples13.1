$(function () {
            var dynamicModel,
                overallProfit = 0,
                MTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                MONTHS = ["January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"];
                
            // KO related functionallity starts here
            function generateData() {
                var num = 12, data = [], curr = 10, rand1, rand2, rand3;
                overallProfit = 0;
                for (var i = 0; i < num; i++) {
                    if (Math.random() > .5) {
                        curr += Math.random() * 2.0;
                    } else {
                        curr -= Math.random() * 2.0;
                    }
                    rand1 = Math.random() * 50.0;
                    rand2 = Math.random() * 40.0;
                    rand3 = rand1 - rand2;
                    overallProfit += rand3;
                    data[i] = {
                        index: ko.observable(i),
                        month: ko.observable(MTHS[i]),
                        revenue: ko.observable(rand1),
                        expenses: ko.observable(rand2),
                        profit: ko.observable(rand3)
                    };
                }
                return data;
            }

            function ViewModel(data) {
                var self = this,
                    currSelectedChartValue = $("#slider1").data("slider")
                        ? $("#slider1").slider("value")
                        : 3;
                this.data = data;
                this.chartThickness = 2;
                this.transitionDuration = 1000;
                this.chartIntervalX = 1;
                this.revenueColor = "#a4ba29";
                this.expensesColor = "#d3404b";
                this.profitColor = "#216EDD";
                this.outlineColor = "black";
                this.currentIndex = ko.observable(currSelectedChartValue);
                this.yearProfit = ko.observable(overallProfit*1000000);
                this.formatMonth = function (value) {
                    return MTHS[value];
                }
                this.currentMonth = ko.computed({
                    read: function () {
                        return this.data[this.currentIndex()].month();
                    },
                    write: function (value) {
                        this.data[this.currentIndex()].month(value);
                    },
                    owner: this
                });
                this.currentRevenue = ko.computed({
                    read: function () {
                        return this.data[this.currentIndex()].revenue();
                    },
                    write: function (value) {
                        this.data[this.currentIndex()].revenue(value);
                    },
                    owner: this
                });
                this.currentExpenses = ko.computed({
                    read: function () {
                        return this.data[this.currentIndex()].expenses();
                    },
                    write: function (value) {
                        this.data[this.currentIndex()].expenses(value);
                    },
                    owner: this
                });
                this.currentProfit = ko.computed({
                    read: function () {
                        var currentItem = this.data[this.currentIndex()],
                            newProfit = currentItem.revenue() - currentItem.expenses(),
                            mil = 1000000;
                        this.yearProfit((this.yearProfit()/mil - currentItem.profit() + newProfit)*mil);
                        this.data[this.currentIndex()].profit(newProfit);
                        return newProfit;
                    },
                    write: function (value) {
                        var currentItem = this.data[this.currentIndex()],
                            mil = 1000000,
                            tempRevenue = currentItem.expenses() + value;
                        this.yearProfit((this.yearProfit()/mil - currentItem.profit() + value)*mil);
                        currentItem.profit(value);

                        if (tempRevenue <= 50 && tempRevenue >= 0) {
                            currentItem.revenue(tempRevenue);
                            animateChartBorder("polarSplineChartRevenue");
                        } else {
                            tempRevenue = (tempRevenue > 50) ? 50 : 0;
                            currentItem.revenue(tempRevenue);
                            currentItem.expenses(tempRevenue - value);
                            animateChartBorder("polarSplineChartExpenses");

                        }
                    },
                    owner: this
                });
            }
            dynamicModel = new ViewModel(generateData());
            ko.applyBindings(dynamicModel);
            // KO related functionallity ends here

            $(".number-container").html(MONTHS[dynamicModel.currentIndex()]);
            $("#slider1").slider({
                range: "max", min: 0, max: 11, value: dynamicModel.currentIndex(), slide: slideHandler
            });
            $("#slider2").slider({
                range: "max", min: 0, max: 11, value: dynamicModel.currentIndex(), slide: slideHandler
            });
            function slideHandler(event, ui) {
                $("#slider1").slider("value", ui.value);
                $("#slider2").slider("value", ui.value);
                $(".number-container").fadeOut(200, function () {
                    $(".number-container").html(MONTHS[ui.value]).fadeIn(200);
                });
                dynamicModel.currentIndex(ui.value);
            }
            $(".btn-refresh").click(function (e) {
                dynamicModel = new ViewModel(generateData());
                ko.applyBindings(dynamicModel);
            });
            $(".windows-button").click(function (e) {
                var animTimeout = 1000,
                    wind1 = $(".window-container-1"),
                    wind2 = $(".window-container-2");
                if (wind1.css("display") === "none") {
                    wind2.fadeOut(animTimeout);
                    wind1.fadeIn(animTimeout);
                    $("#loadHidden").css("display", "block");
                    $("#loadInitial").css("display", "none");
                } else {
                    wind1.fadeOut(animTimeout);
                    wind2.fadeIn(animTimeout);
                    $("#loadHidden").css("display", "none");
                    $("#loadInitial").css("display", "block");
                }
            });
            $(".main-container").on("igtexteditortextchanged", "#ed-month", animateMonth);
            $(".main-container").on("ignumericeditortextchanged", "#ed-revenue", animateRevenue);
            $(".main-container").on("ignumericeditortextchanged", "#ed-expenses", animateExpenses);
            $(".main-container").on("ignumericeditortextchanged", "#ed-profit", animateProfit);
            function animateMonth() {
                animateChartBorder("lineChart"); animateChartBorder("barColumnChart");
                animateChartBorder("rangeChart"); animateChartBorder("waterfallChart");
            }
            function animateRevenue() {

                animateChartBorder("polarSplineChartRevenue"); animateChartBorder("polarSplineChartProfit");
            }
            function animateExpenses() {
                animateAllThree();
                animateChartBorder("polarSplineChartExpenses");
                animateChartBorder("polarSplineChartProfit");
            }
            function animateProfit() {
                animateAllThree();
                animateChartBorder("polarSplineChartProfit");
            }
            function animateAllThree() {
                animateChartBorder("lineChart"); animateChartBorder("barColumnChart");
                animateChartBorder("rangeChart"); animateChartBorder("waterfallChart");
                animateChartBorder("bubbleChart");
            }
            function animateChartBorder(id) {
                id = "#" + id + "_chart_container";
                $(id).stop().animate({ borderColor: '#FA0000' }, 1000, function () {
                    $(id).stop().animate({ borderColor: '#B1B1B1' }, 1000);
                });
            }
        });