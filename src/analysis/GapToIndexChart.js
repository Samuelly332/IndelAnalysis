import React, { Component } from 'react'
import './Analysis.css'
import Chart from "react-apexcharts";
import Analysis from "./Analysis";

class GapToIndexChart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    id: "line"
                },
                xaxis: {
                    categories: Analysis.getIndexes(Analysis.divideToLines(this.props.data), Analysis.indexOfZero(Analysis.divideToLines(this.props.data))),
                    labels: {
                        show: false
                    }
                }
            },
            series: [
                {
                    name: "Probability of gap",
                    data: Analysis.probabilitiesOfGaps(Analysis.divideToLines(this.props.data))
                }
            ]
        };
    }

    render() {
        return (
            <div className="container">
                <h1>Probability of gap on a specific index</h1>
                <div className="row">
                    <div className="mixed-chart">
                        <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="line"
                        />
                    </div>
                </div>
            </div>
        )
    }

}

export default GapToIndexChart