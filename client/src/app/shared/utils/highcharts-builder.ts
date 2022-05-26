export class HighchartsBuilder {

    constructor() { }

    /**
     * Builds gridOptions for a highcharts component.
     * @param data Required parameter which contains the rowData for the grid.
     * @param dataFields Used to pass in column field information with label, type, and field/name.
     * @param columnDefs Used to pass in pre-defined column definitions for material table.
     * @returns Returns instance of gridOptions.
     */
    public static build(type: string, data: any, rows: any[], columns: any[], title: string = null, baseColor: any) {
        switch (type.toLowerCase()) {
            case 'area':
                return this.buildArea(data, columns, title);

            case 'bar':
                return this.buildBar(data, columns, title);

            case 'bubble':
                return this.buildBubble(data, title);

            case 'bullet':
                return this.buildBullet(data, rows, title);

            case 'column':
                return this.buildColumn(data, columns, title);

            case 'columnrange':
                return this.buildColumnRange(data, columns, title);

            case 'gauge':
                return this.buildGauge(data, title);

            case 'heatmap':
                return this.buildHeatmap(data, rows, columns, title, baseColor);

            case 'line':
                return this.buildLine(data, columns, title);

            case 'pie':
                return this.buildPie(data, title);

            case 'scatter':
                return this.buildScatter(data, title);

            case 'spider':
                return this.buildSpider(data, columns, title);

            case 'sunburst':
                return this.buildSunburst(data, title);

            case 'treemap':
                return this.buildTreeMap(data, title, baseColor);

            case 'worldmap':
                return this.buildWorldMap(data, title);

            case 'boxplot':
                return this.buildBoxPlot(data, rows, columns, title);
        }
    }

    private static buildArea(data: any[], categories: any[], title: string = null) {
        return {
            chart: {
                styledMode: true,
                reflow: true,
                type: 'area',
            },
            credits: {
                enabled: false
            },
            data: {},
            exporting: {
                enabled: false,
                buttons: {
                    contextButton: {
                        menuItems: ['printChart', 'downloadPNG', 'downloadCSV', 'downloadXLS']
                    }
                },
                chartOptions: {
                    title: {
                        text: title
                    }
                }
            },
            legend: {
                shadow: false
            },
            plotOptions: {
                area: {
                    stacking: 'percent'
                }
            },
            series: data,
            title: {
                text: title
            },
            tooltip: {
                shared: true,
            },
            xAxis: {
                categories: categories,
                labels: {},
                title: {}
            },
            yAxis: {
                labels: {},
                title: {},
            },
        };
    }

    private static buildBar(data: any[], columns: any[], title: string = null) {
        return {
            chart: {
                styledMode: true,
                reflow: true,
                type: 'bar',
            },
            credits: {
                enabled: false
            },
            data: {},
            drilldown: {
                series: []
            },
            exporting: {
                enabled: false,
                buttons: {
                    contextButton: {
                        menuItems: ['printChart', 'downloadPNG', 'downloadCSV', 'downloadXLS']
                    }
                },
                chartOptions: {
                    title: {
                        text: title
                    }
                }
            },
            legend: {
                shadow: false
            },
            plotOptions: {
                column: {
                    borderWidth: 0,
                    grouping: true,
                    shadow: false,
                },
                series: {},
            },
            series: data,
            title: {
                text: title
            },
            tooltip: {
                shared: true,
            },
            xAxis: {
                categories: columns,
                labels: {},
                title: {}
            },
            yAxis: {
                labels: {},
                title: {},
            },
        };
    }

    private static buildBubble(data: any, title: string = null) {
        return {
            chart: {
                type: 'bubble',
                styledMode: true,
                zoomType: 'xy',
                reflow: true,
            },
            credits: {
                enabled: false
            },
            data: {},
            exporting: {
                enabled: false,
                buttons: {
                    contextButton: {
                        menuItems: ['printChart', 'downloadPNG', 'downloadCSV', 'downloadXLS']
                    }
                },
                chartOptions: {
                    title: {
                        text: title
                    }
                }
            },
            legend: {},
            series: data,
            title: {
                text: title
            },
            tooltip: {},
            xAxis: {
                labels: {},
                title: {},
            },
            yAxis: {
                labels: {},
                title: {},
            },
        };
    }

    private static buildBullet(data: any[], rows: any[], title: string = null) {
        return {
            chart: {
                styledMode: true,
                inverted: true,
                type: 'bullet'
            },
            credits: {
                enabled: false
            },
            data: {},
            exporting: {
                enabled: false,
                buttons: {
                    contextButton: {
                        menuItems: ['printChart', 'downloadPNG', 'downloadCSV', 'downloadXLS']
                    }
                },
                chartOptions: {
                    title: {
                        text: title
                    }
                }
            },
            legend: {},
            plotOptions: {
                bullet: {
                    groupPadding: 0,
                    targetOptions: {
                        border: 2,
                        height: 4,
                        width: '110%',
                    },
                }
            },
            series: data,
            title: {
                text: title
            },
            tooltip: {
                pointFormat: '<b>{point.y}</b> (with target at {point.target})'
            },
            xAxis: {
                categories: rows
            },
            yAxis: {
                labels: {},
                title: {},
            },
        };
    }

    private static buildColumn(data: any[], categories: any[], title: string = null) {
        return {
            chart: {
                styledMode: true,
                events: {},
                reflow: true,
                type: 'column',
            },
            credits: {
                enabled: false
            },
            data: {},
            drilldown: {
                series: []
            },
            exporting: {
                enabled: false,
                buttons: {
                    contextButton: {
                        menuItems: ['printChart', 'downloadPNG', 'downloadCSV', 'downloadXLS']
                    }
                },
                chartOptions: {
                    title: {
                        text: title
                    }
                }
            },
            legend: {
                shadow: false
            },
            plotOptions: {
                column: {
                    borderWidth: 0,
                    grouping: true,
                    shadow: false,
                },
                series: {},
            },
            series: data,
            title: {
                text: title
            },
            tooltip: {
                shared: true,
            },
            xAxis: {
                categories: categories,
                labels: {},
                title: {}
            },
            yAxis: {
                labels: {},
                title: {},
            },
        };
    }

    private static buildColumnRange(data: any[], categories: any[], title: string = null) {
        return {
            chart: {
                styledMode: true,
                events: {},
                reflow: true,
                type: 'columnrange',
            },
            credits: {
                enabled: false
            },
            data: {},
            exporting: {
                enabled: false,
                buttons: {
                    contextButton: {
                        menuItems: ['printChart', 'downloadPNG', 'downloadCSV', 'downloadXLS']
                    }
                },
                chartOptions: {
                    title: {
                        text: title
                    }
                }
            },
            legend: {
                shadow: false
            },
            plotOptions: {
                columnrange: {
                    borderWidth: 0,
                    grouping: true,
                    shadow: false,
                },
                series: {},
            },
            series: data,
            title: {
                text: title
            },
            tooltip: {
                shared: true,
            },
            xAxis: {
                categories: categories,
                labels: {},
                title: {}
            },
            yAxis: {
                labels: {},
                title: {},
            },
        };
    }

    private static buildGauge(data: any, title: string = null) {
        return {
            chart: {
                styledMode: true,
                height: null,
                reflow: true,
                type: 'solidgauge',
            },
            credits: {
                enabled: false
            },
            data: {},
            exporting: {
                enabled: false
            },
            pane: {
                background: {
                    backgroundColor: 'inherit',
                    innerRadius: '60%',
                    outerRadius: '100%',
                    shape: 'arc'
                },
                center: ['50%', '95%'],
                endAngle: 90,
                size: '170%',
                startAngle: -90,
            },
            plotOptions: {
                solidgauge: {
                    dataLabels: {
                        borderWidth: 0,
                        color: 'inherit',
                        useHTML: true,
                        y: 0,
                    }
                }
            },
            series: data,
            title: {
                text: title
            },
            tooltip: {
                enabled: false
            },
            yAxis: {
                labels: {
                    distance: 10
                },
                lineWidth: 1,
                max: null,
                min: null,
                minorTickInterval: 0.1,
                minorTickWidth: 1,
                minorTickPosition: 'inside',
                plotBands: {
                    className: 'gaugeMarker',
                    label: {},
                    outerRadius: '105%',
                    thickness: '45%',
                    zIndex: 5,
                },
                stops: [
                    [0.1, '#DF5353'], // red
                    [0.5, '#DDDF0D'], // yellow
                    [0.9, '#55BF3B'] // green
                ],
                tickPixelInterval: 60,
                tickWidth: 2,
                tickColor: 'inherit',
                tickPosition: 'inside',
                title: {
                    y: -70,
                },
            },
        };
    }

    private static buildHeatmap(data: any, rows: any[], columns: any[], title: string = null, baseColor: any) {
        return {
            chart: {
                styledMode: true,
                marginLeft: 60,
                reflow: true,
                spacingTop: 10,
                type: 'heatmap',
            },
            colorAxis: {
                min: -1,
                max: 1,
                stops: [
                    [0, '#3060cf'],
                    [0.25, '#3060cf'],
                    [0.5, baseColor],
                    [0.75, '#c4463a'],
                    [0.99, '#c4463a'],
                    [1, baseColor]
                ]
            },
            credits: {
                enabled: false
            },
            data: {},
            exporting: {
                enabled: false,
                buttons: {
                    contextButton: {
                        menuItems: ['printChart', 'downloadPNG', 'downloadCSV', 'downloadXLS']
                    }
                },
                chartOptions: {
                    title: {
                        text: title
                    }
                }
            },
            legend: {
                align: 'right',
                layout: 'vertical',
                margin: 0,
                symbolHeight: 280,
                verticalAlign: 'top',
            },
            plotOptions: {
                heatmap: {
                    dataLabels: {}
                }
            },
            series: [{
                borderWidth: 1,
                borderColor: '#888',
                data: data,
                dataLabels: {
                    enabled: true
                },
                name: 'Category',
            }],
            tooltip: {},
            title: {
                text: title
            },
            xAxis: {
                categories: columns
            },
            yAxis: {
                categories: rows,
                labels: {},
                title: null,
            },
        };
    }

    private static buildBoxPlot(data: any, rows: any[], columns: any[], title: string = null) {
        let row_max = 0;
        if ( rows && rows.length > 0 ) {
            row_max = rows.reduce(function(prev, current) {
                return (prev.value > current.value) ? prev.value : current.value;
            });
        }
        if ( row_max ) {
            if ( typeof row_max === 'object' && 'value' in row_max ) {
                row_max = row_max['value'];
            }
        }
        if ( !row_max ) {
            row_max = 0;
        }
        const data_max = Math.max(...[].concat(...data));
        const max = Math.max(row_max, data_max);
        return {
            chart: {
                styledMode: true,
                marginLeft: 60,
                reflow: true,
                spacingTop: 10,
                type: 'boxplot',
                spacingRight: 70
            },
            credits: {
                enabled: false
            },
            data: {},
            exporting: {
                enabled: true,
                buttons: {
                    contextButton: {
                        menuItems: ['downloadJPEG']
                    }
                },
                chartOptions: {
                    title: {
                        text: title
                    }
                }
            },
            legend: {
                enabled: false
            },
            series: [{
                data: data,
                showInLegend: false
            }],
            tooltip: {
                enabled: false
            },
            title: {
                text: title
            },
            xAxis: {
                categories: columns
            },
            yAxis: {
                title: {
                    text: 'Expression'
                },
                min: -0.5,
                max: max + .5,
                plotLines: rows,
                labels: {},
            },
        };
    }

    private static buildLine(data: any, columns: any[], title: string = null) {
        return {
            chart: {
                styledMode: true,
                reflow: true,
                zoomType: 'x',
            },
            credits: {
                enabled: false
            },
            data: {},
            exporting: {
                enabled: false,
                buttons: {
                    contextButton: {
                        menuItems: ['printChart', 'downloadPNG', 'downloadCSV', 'downloadXLS']
                    }
                },
                chartOptions: {
                    title: {
                        text: title
                    }
                }
            },
            legend: {},
            plotOptions: {
                series: {
                    marker: {
                        enabled: true
                    }
                }
            },
            series: data,
            title: {
                text: title
            },
            tooltip: {},
            xAxis: {
                categories: columns,
                labels: {}
            },
            yAxis: {
                labels: {},
                title: {},
            },
        };
    }

    private static buildPie(data: any, title: string = null) {
        return {
            chart: {
                styledMode: true,
                type: 'pie',
                reflow: true,
            },
            credits: {
                enabled: false
            },
            data: {},
            drilldown: {
                series: []
            },
            exporting: {
                enabled: false,
                buttons: {
                    contextButton: {
                        menuItems: ['printChart', 'downloadPNG', 'downloadCSV', 'downloadXLS']
                    }
                },
                chartOptions: {
                    title: {
                        text: title
                    }
                }
            },
            plotOptions: {
                series: {}
            },
            series: data,
            title: {
                text: title
            },
        };
    }

    private static buildScatter(data: any, title: string = null) {
        return {
            chart: {
                styledMode: true,
                type: 'scatter',
                zoomType: 'xy',
                reflow: true,
            },
            credits: {
                enabled: false
            },
            data: {},
            exporting: {
                enabled: false,
                buttons: {
                    contextButton: {
                        menuItems: ['printChart', 'downloadPNG', 'downloadCSV', 'downloadXLS']
                    }
                },
                chartOptions: {
                    title: {
                        text: title
                    }
                }
            },
            plotOptions: {
                scatter: {
                    marker: {
                        states: {
                            hover: {
                                enabled: true,
                                lineColor: 'rgb(100,100,100)'
                            }
                        }
                    },
                    states: {
                        hover: {
                            marker: {
                                enabled: false
                            }
                        }
                    }
                },
                series: {
                    dataLabels: {}
                }
            },
            series: data,
            title: {
                text: title
            },
            tooltip: {
                formatter: undefined
            },
            xAxis: {
                endOnTick: true,
                labels: {
                    formatter: undefined
                },
                showLastLabel: true,
                startOnTick: true,
                title: {
                    text: undefined
                },
            },
            yAxis: {
                labels: {
                    formatter: undefined
                },
                title: {
                    text: undefined
                },
            },
        };
    }

    private static buildSpider(data: any[], columns: any[], title: string = null) {
        return {
            chart: {
                styledMode: true,
                polar: true,
                type: 'line'
            },
            credits: {
                enabled: false
            },
            data: {},
            exporting: {
                enabled: false,
                buttons: {
                    contextButton: {
                        menuItems: ['printChart', 'downloadPNG', 'downloadCSV', 'downloadXLS']
                    }
                },
                chartOptions: {
                    title: {
                        text: title
                    }
                }
            },
            legend: {
                // align: 'right',
                // verticalAlign: 'top',
                // y: 70,
                // layout: 'vertical'
            },
            pane: {
                size: '80%'
            },
            series: data,
            title: {
                text: title,
            },
            tooltip: {
                pointFormat: '<span style="color:{series.color}">{series.name}: <b>{point.y}</b><br/>',
                shared: true,
            },
            xAxis: {
                categories: columns,
                lineWidth: 0,
                tickmarkPlacement: 'on',
            },
            yAxis: {
                gridLineInterpolation: 'polygon',
                lineWidth: 0,
                min: 0
            },
        };
    }

    private static buildSunburst(data: any[], title: string = null) {
        return {
            chart: {
                styledMode: true,
                reflow: true,
            },
            credits: {
                enabled: false
            },
            data: {},
            defs: {},
            exporting: {
                enabled: false,
                buttons: {
                    contextButton: {
                        menuItems: ['printChart', 'downloadPNG', 'downloadCSV', 'downloadXLS']
                    }
                },
                chartOptions: {
                    title: {
                        text: title
                    }
                }
            },
            plotOptions: {
                series: {
                    marker: {}
                }
            },
            series: [{
                allowDrillToNode: true,
                cursor: 'pointer',
                data: data,
                dataLabels: {
                    filter: {
                        operator: '>',
                        property: 'innerArcLength',
                        value: 16
                    },
                    format: '{point.name}',
                },
                levels: [{
                    level: 1,
                    levelIsConstant: false,
                    dataLabels: {
                        filter: {
                            operator: '>',
                            property: 'outerArcLength',
                            value: 64
                        },
                        rotation: 0
                    }
                }, {
                    colorByPoint: true,
                    level: 2,
                    dataLabels: {
                        rotationMode: 'parallel'
                    }
                }, {
                    level: 3,
                    dataLabels: {
                        rotationMode: 'parallel'
                    }
                }, {
                    level: 4,
                    dataLabels: {
                        rotationMode: 'parallel'
                    }
                }, {
                    level: 5,
                    dataLabels: {
                        rotationMode: 'parallel'
                    }
                }],
                type: 'sunburst',
            }],
            subtitle: {
                text: undefined,
            },
            title: {
                text: title,
            },
            tooltip: {
                headerFormat: ''
            },
        };
    }

    private static buildTreeMap(data: any[], title: string = null, baseColor: any) {
        return {
            chart: {
                styledMode: true,
                reflow: true,
            },
            colorAxis: {
                minColor: baseColor,
            },
            credits: {
                enabled: false
            },
            data: {},
            exporting: {
                enabled: false,
                buttons: {
                    contextButton: {
                        menuItems: ['printChart', 'downloadPNG', 'downloadCSV', 'downloadXLS']
                    }
                },
                chartOptions: {
                    title: {
                        text: title
                    }
                }
            },
            legend: {},
            plotOptions: {},
            series: [{
                type: 'treemap',
                layoutAlgorithm: 'squarified',
                data: data
            }],
            tooltip: {},
            title: {
                text: title
            },
        };
    }

    private static buildWorldMap(data: any[], title: string = null) {
        return {
            chart: {
                styledMode: true,
                reflow: true,
                map: 'world-chart'
            },
            colorAxis: {
                min: 1,
                type: 'logarithmic'
            },
            credits: {
                enabled: false
            },
            data: {},
            exporting: {
                enabled: false,
                buttons: {
                    contextButton: {
                        menuItems: ['printChart', 'downloadPNG', 'downloadCSV', 'downloadXLS']
                    }
                },
                chartOptions: {
                    title: {
                        text: title
                    }
                }
            },
            legend: {},
            mapNavigation: {
                enabled: true,
                buttonOptions: {
                    verticalAlign: 'bottom'
                }
            },
            plotOptions: {},
            series: data,
            tooltip: {},
            title: {
                text: title
            }
        };
    }
}
