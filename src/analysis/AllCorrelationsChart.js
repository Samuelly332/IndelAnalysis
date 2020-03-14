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
                    }
                },
                plotOptions: {
                    heatmap: {
                        shadeIntensity: 0.5,
                        colorScale: {
                            ranges: [{
                                from: 0.00,
                                to: 25.99,
                                name: '0 - 25%',
                                color: '#00A100'
                            },
                                {
                                    from: 26.00,
                                    to: 50.99,
                                    name: '26 - 50%',
                                    color: '#128FD9'
                                },
                                {
                                    from: 51.00,
                                    to: 75.99,
                                    name: '51 - 75%',
                                    color: '#FFB200'
                                },
                                {
                                    from: 76.00,
                                    to: 100.00,
                                    name: '76 - 100%',
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
                            width= "1360"
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