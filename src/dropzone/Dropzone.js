import React, { Component } from "react";
import "./Dropzone.css";

class Dropzone extends Component {

    constructor(props) {
        super(props);
        this.state = { hightlight: false };
        this.fileInputRef = React.createRef();

        this.openFileDialog = this.openFileDialog.bind(this);
        this.onFilesAdded = this.onFilesAdded.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }

    openFileDialog() {
        if (this.props.disabled) return;
        this.fileInputRef.current.click();
    }

    onFilesAdded(evt) {
        if (this.props.disabled) return;
        const files = evt.target.files;
        if (!(files[0].name.substr(files[0].name.length - 4, 4) === ".txt")){
            alert("Wrong file format. Only supported format is \' .txt \'.");
            return;
        }
        if (files[0].size > 1048576){
            alert("The file is too large. File size limit is 1 MB.");
            this.setState({ hightlight: false });
            return;
        }
        if (this.props.onFilesAdded) {
            const array = this.fileListToArray(files);
            this.props.onFilesAdded(array);
        }
    }

    onDragOver(event) {
        event.preventDefault();
        if (this.props.disabed) return;
        this.setState({ hightlight: true });
    }

    onDragLeave(event) {
        this.setState({ hightlight: false });
    }

    onDrop(event) {
        event.preventDefault();
        if (this.props.disabed) return;
        const files = event.dataTransfer.files;
        if (!(files[0].name.substr(files[0].name.length - 4, 4) === ".txt")){
            alert("Wrong file format. Only supported format is \' .txt \'.");
            this.setState({ hightlight: false });
            return;
        }
        if (files[0].size > 1048576){
            alert("The file is too large. File size limit is 1 MB.");
            this.setState({ hightlight: false });
            return;
        }
        if (this.props.onFilesAdded) {
            const array = this.fileListToArray(files);
            this.props.onFilesAdded(array);
        }
        this.setState({ hightlight: false });
    }

    fileListToArray(list) {
        const array = [];
        for (var i = 0; i < list.length; i++) {
            array.push(list.item(i));
        }
        return array;
    }

    render() {
        return (
            <div
                className={`Dropzone ${this.state.hightlight ? "Highlight" : ""}`}
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onDrop={this.onDrop}
                onClick={this.openFileDialog}
                style={{ cursor: this.props.disabled ? "default" : "pointer" }}
            >
                <input
                    ref={this.fileInputRef}
                    className="FileInput"
                    type="file"
                    multiple
                    onChange={this.onFilesAdded}
                />
                <span>Upload File</span>
            </div>
        );
    }
}

export default Dropzone;