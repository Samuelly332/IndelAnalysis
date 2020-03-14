import React, { Component } from 'react'
import './Analysis.css'
import ReactApexChart from "react-apexcharts";
import Dropdown from "react-dropdown";
import Analysis from "./Analysis";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "rc-tooltip/assets/bootstrap.css";

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
class SingleGapToAllCorrelations extends Component {



    constructor (props) {
        super(props)
        this.state = {
            selected: '',
            options: {
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded'
                    },
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    show: true,
                    width: 2,
                    colors: ['transparent']
                },

                fill: {
                    opacity: 1
                },
            },
            series: [{
                name: 'Expected Correlation',
                data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
            }, {
                name: 'Real Correlation',
                data: [76, 85, 10, 9, 87, 10, 91, 11, 94]
            } ],


            sliderValues: [40, 60],

        }
        this._onSelect = this._onSelect.bind(this)
        this.resultChart = "";

    }

    handleChange = sliderValues => {
        this.setState({ sliderValues });
    };
    _onSelect (option) {
        console.log('You selected ', option.label);
        this.setState({selected: option});
        this.generateSeries(this.props.data, option);
        console.log("ddd "+ this.state.series);

    }

    generateSeries(data, option){
        console.log("option: " + option.value);
        let series = [];

        let correlations = Analysis.getCorrelations(data);
        let expectedCorrelations = Analysis.getExpectedCorrelations(data);
        let indexes = Analysis.getRealIndexes(Analysis.getNotZeroProbabilities(Analysis.probabilitiesOfGaps(Analysis.divideToLines(data)), Analysis.indexOfZero(Analysis.divideToLines(data)), Analysis.indexOfZero(Analysis.divideToLines(data))));
        console.log("data: " + correlations[option.value]);
        console.log("name "+ indexes.indexOf(option.value).toString());
            series.push({
                name: 'Expected Correlation in %',
                data: expectedCorrelations[option.value]
            });
            series.push({
            name: 'Real Correlation in %',
            data: correlations[option.value]
        });

            console.log("series "+ series);
        this.setState({series: series,});
        this.setState({xaxis: {categories: indexes}});
        let options = {options: {
            plotOptions: {
                bar: {
                    horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded'
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                    width: 2,
                    colors: ['transparent']
            },
                xaxis: {
                    categories: indexes,
                },

            fill: {
                opacity: 1
            },

        }};
        this.resultChart = <div id="chart">
            <ReactApexChart options={options} series={series} type="bar" height="350" />
        </div>;
    }


    render () {
        const defaultOption = this.state.selected;
        let options = Analysis.getNotZeroProbabilities(Analysis.probabilitiesOfGaps(Analysis.divideToLines(this.props.data)), Analysis.indexOfZero(Analysis.divideToLines(this.props.data)));
        const { sliderValues } = this.state;

        return (
            <div className="singleToAllChart">
                <h1>Single gap to all gap correlations</h1>
                <h3>Select a gap</h3>
                <Dropdown options={options} onChange={this._onSelect} value={defaultOption} placeholder="Click Here to Select" />
                <h3>Customize threshold</h3>
                <div className="slider">
                    {sliderValues[0]} - {sliderValues[1]}
                    <Range min={0} max={100} onChange={this.handleChange} defaultValue={sliderValues} tipFormatter={value => `${value}`}/>
                </div>
                {this.resultChart}
            </div>
        )
    }

}

export default SingleGapToAllCorrelations