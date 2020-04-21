import React, { Component } from 'react'
import './Analysis.css'
import GapToIndexChart from "./GapToIndexChart";
import AllCorrelationsChart from "./AllCorrelationsChart";
import SingleGapToAllCorrelations from "./SingleGapToAllCorrelations";
import AllCorrelationsChartBaW from "./AllCorrelationsChartBaW";

class Analysis extends Component {

    render() {
        return (
            <div className="Analysis">
                <div className="Overview">
                    <h1>Overview</h1>
                    <div className="Overview-data">
                    <p><b>Number of all characters in the file: </b>{this.countChars(Analysis.divideToLines(this.props.data))}</p>
                    <p><b>Number of amino acids in the file: </b>{(this.countChars(Analysis.divideToLines(this.props.data))) - (this.countGaps(Analysis.divideToLines(this.props.data)))}</p>

                    <p><b>Number of gaps in the file: </b>{this.countGaps(Analysis.divideToLines(this.props.data))}</p>

                    <p><b>Number of sequences: </b>{(Analysis.divideToLines(this.props.data)).length}</p>

                    <p><b>Average length of sequence: </b>{(this.countChars(Analysis.divideToLines(this.props.data)) / Analysis.divideToLines(this.props.data).length).toFixed(2)}</p>

                    <p><b>Average number of gaps in one sequence: </b>{this.averageGaps(Analysis.divideToLines(this.props.data).length, this.countGaps(Analysis.divideToLines(this.props.data)))}</p>
                    </div>
                </div>
                <GapToIndexChart data={this.props.data}/>
                <AllCorrelationsChart data={this.props.data}/>
                <SingleGapToAllCorrelations data={this.props.data}/>

            </div>
        )
    }

    countChars(data){
        let result = 0;
        for (let i = 0; i < data.length; i++){
            result += data[i].length;
        }
        return result;
    }

    static divideToLines(data){
        let result = data.split("\n");
        for (let i = 0 ; i < result.length; i++){
            let lengthOfLine = result[i].length;
            while (result[i].charAt(lengthOfLine - 2) === "-" || result[i].charAt(lengthOfLine - 2) === " " ){
                result[i] = result[i].substr(0, lengthOfLine - 2);
                lengthOfLine--;
            }
        }
        return result;
    }

    static getRealIndexes(gapIndexes, indexOfZero){
        console.log("gapIndexes "+ gapIndexes);
        console.log("zero "+ indexOfZero);
        let result = [];
        let index = 0;

        for (let i = 0; i < gapIndexes.length; i ++){
            result[index] = gapIndexes[i] + indexOfZero;
            if (gapIndexes[i] > 0){
                result[index]--;
            }
            index++;
        }
        return result;
    }

    static getNotZeroProbabilities(probabilities, indexOfZero){
        console.log("zeeerrooo "+ indexOfZero);
    let zeroIndex = indexOfZero;
    let buffer = [];
    let counter = 0;
    let length = 0;
    for (let i = 0; i < probabilities.length; i++){
       buffer[i] = 0;
    }
    for (let i = 0; i < indexOfZero; i++){
        if (probabilities[i] != 0.00){

            buffer[counter] = ((i - zeroIndex));
            counter++;
        }
    }

    for (let i = indexOfZero; i < probabilities.length; i++){
        if (probabilities[i] != 0.00){

            buffer[counter] = i - zeroIndex +1;
            counter++;
        }
    }

    for (let i = 0; i < buffer.length; i++){
        if (buffer[i] == 0){
            length = i;
            break;
        }
    }

    let result = [];
    for (let i = 0; i < length; i++){
        result[i] = buffer[i];
    }
    return result;

    }

    static probabilitiesOfGaps(array){
    let probabilities = [];
    let numberOfRecords = array.length;
    let maxLength = 0;
    for (let i = 0; i < array.length; i++){
        if ( array[i].length > maxLength){
            maxLength = array[i].length;
        }
    }
    for(let i = 0; i < maxLength; i++) {
        let gaps = 0;
        for (let j = 0; j < array.length; j++){
            if (array[j].charAt(i) === null || array[j].charAt(i) === undefined){
                break;
            }
            if(array[j].charAt(i) === "-"){
                gaps = gaps +1;
            }
        }
        probabilities[i] = ((gaps/numberOfRecords)*100).toFixed(2);
    }
    return probabilities;
    }

    static indexOfZero(array) {
        let indexes = [];
        for (let i = 0; i < array.length; i++) {
            indexes[i] = array[i].indexOf('M');
        }

        let mostFrequent = 1;
        let counter = 0;
        let item;

        for (let i = 0; i < indexes.length; i++) {
            for (let j = i; j < indexes.length; j++) {
                if (indexes[i] === indexes[j])
                    counter++;
                if (mostFrequent < counter) {
                    mostFrequent = counter;
                    item = indexes[i];
                }
            }

            counter = 0;
        }

        console.log(item + " ( " + mostFrequent + " times ) ");
        return item;
    }

    countGaps(arr){
    let counter = 0;
    for (let i = 0; i < arr.length; i ++){
        for (let j = 0; j < arr[i].length; j ++){
            if (arr[i].charAt(j) === '-'){
                counter++;
            }
        }
    }
    return counter;
    }

    averageGaps (sequences, gaps){
        return (gaps / sequences).toFixed(2);
    }

    static getIndexes(array, indexOfZero){
        let maxLength = 0;
        let result = [];
        for (let i = 0; i < array.length; i++){
            if ( array[i].length > maxLength){
                maxLength = array[i].length;
            }
        }

        for (let i = 0; i < maxLength; i++){

            if (i === indexOfZero){
                indexOfZero--;
            }
            result[i] = i - indexOfZero;
        }
        return result;
    }

    static getCorrelations(data){
        let arr = Analysis.divideToLines(data);
        let notZeroProbabilitiesRealIndexes = Analysis.getRealIndexes(Analysis.getNotZeroProbabilities(Analysis.probabilitiesOfGaps(arr), Analysis.indexOfZero(arr)),Analysis.indexOfZero(arr));
        let correlationProbabilities = [];

        for (let i = 0; i < notZeroProbabilitiesRealIndexes.length; i++) {
            correlationProbabilities[i] = [];
            for (let j = 0; j < notZeroProbabilitiesRealIndexes.length; j++) {
                correlationProbabilities[i][j] = 0;
            }
        }
        for (let i = 0; i < notZeroProbabilitiesRealIndexes.length; i++) {
            for (let j = 0; j < notZeroProbabilitiesRealIndexes.length; j++) {
                let match = 0;
                let count = 0;
                for (let k = 0; k < arr.length; k++) {
                    if (arr[k].charAt(notZeroProbabilitiesRealIndexes[i]) === "-") {
                        count++;
                    }
                    if (arr[k].charAt(notZeroProbabilitiesRealIndexes[i]) === "-" && arr[k].charAt(notZeroProbabilitiesRealIndexes[i]) === arr[k].charAt(notZeroProbabilitiesRealIndexes[j])) {

                        match++;
                    }
                }

                correlationProbabilities[i][j] = ((match / count) * 100).toFixed(2);
            }
        }
        return correlationProbabilities;
    }

    static getExpectedCorrelations(data){
        let arr = Analysis.divideToLines(data);
        let probabilities = Analysis.probabilitiesOfGaps(arr);
        let notZeroProbabilitiesRealIndexes = Analysis.getRealIndexes(Analysis.getNotZeroProbabilities(Analysis.probabilitiesOfGaps(arr), Analysis.indexOfZero(arr)),Analysis.indexOfZero(arr));
        let correlationProbabilities = [];

        for (let i = 0; i < notZeroProbabilitiesRealIndexes.length; i++) {
            correlationProbabilities[i] = [];
            for (let j = 0; j < notZeroProbabilitiesRealIndexes.length; j++) {
                correlationProbabilities[i][j] = 0;
            }
        }
        for (let i = 0; i < notZeroProbabilitiesRealIndexes.length; i++) {
            for (let j = 0; j < notZeroProbabilitiesRealIndexes.length; j++) {
                correlationProbabilities[i][j] = ((probabilities[notZeroProbabilitiesRealIndexes[i]] * probabilities[notZeroProbabilitiesRealIndexes[j]]) / 100).toFixed(2);
            }
        }
        return correlationProbabilities;
    }

}

export default Analysis