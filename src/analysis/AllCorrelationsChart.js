import React, { Component } from 'react'
import './Analysis.css'
import Chart from "react-apexcharts";
import Analysis from "./Analysis";

class AllCorrelationsChart extends Component {

    constructor(props) {
        super(props);
        this.state = {
            options: {
                chart: {
                    animations: {
                        enabled: false
                    },
                },
                plotOptions: {
                    heatmap: {
                        shadeIntensity: 0.5,
                        colorScale: {
                            ranges: [{
                                from: 0.00,
                                to: 14.99,
                                name: '0 - 14%',
                                color: '#9400D3'
                                },
                                {
                                    from: 15.00,
                                    to: 28.99,
                                    name: '15 - 28%',
                                    color: '#4B0082'
                                },
                                {
                                    from: 29.00,
                                    to: 43.99,
                                    name: '29 - 43%',
                                    color: '#0000FF'
                                },
                                {
                                    from: 44.00,
                                    to: 57.99,
                                    name: '44 - 57%',
                                    color: '#00FF00'
                                },
                                {
                                    from: 58.00,
                                    to: 72.99,
                                    name: '58 - 72%',
                                    color: '#FFFF00'
                                },
                                {
                                    from: 73.00,
                                    to: 86.99,
                                    name: '73 - 86%',
                                    color: '#FF7F00'
                                },
                                {
                                    from: 87.00,
                                    to: 100.00,
                                    name: '87 - 100%',
                                    color: '#FF0000'
                                }
                            ]
                        }
                    }
                },

                xaxis: {
                    labels: {
                        show: false
                    }
                },
                yaxis: {
                    labels: {
                        show: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                title: {
                    text: ''
                }
            },
            series: this.generateSeries(this.props.data),
        }
    }

    render() {
        return (
            <div className="container">
                <h1>Correlations of single gaps</h1>
                <div className="row">
                    <div className="mixed-chart">
                        <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="heatmap"
                        />
                    </div>
                </div>
            </div>
        )
    }

    generateData(index, correlations, indexes) {
        let series = [];

        for (let i = 0; i < correlations[index].length; i ++){
            series.push({
                x: indexes[i],
                y: correlations[index][i]
            });
        }
        return series;
    }

    generateSeries(data){
        let series = [];
        let correlations = Analysis.getCorrelations(data);
        let indexes = Analysis.getNotZeroProbabilities(Analysis.probabilitiesOfGaps(Analysis.divideToLines(data)), Analysis.indexOfZero(Analysis.divideToLines(data)));

        for (let i = 0; i < correlations[0].length; i ++){
            series.push({
                name: indexes[i].toString(),
                data: this.generateData(i, correlations, indexes)
            });
        }
        console.log("series2 "+ series);
        return series;
    }

}

export default AllCorrelationsChart