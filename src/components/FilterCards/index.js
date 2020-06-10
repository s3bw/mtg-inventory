import React from "react";

import classNames from "classnames";

import { Form } from "tabler-react";


class FilterCards extends React.Component {
    state = {
        filters: []
    }

    handleChange = (e) => {
        var filters = this.state.filters
        var value = e.target.value

        const exists = filters.includes(value)

        // If the filter is already present
        // remove it (toggle)
        if (exists) {
            filters = filters.filter((filter) => {return filter !== value})
            this.setState({
                filters: filters
            })

        } else {
            filters.push(value)
            this.setState({
                filters: filters,
            })
        }
        this.props.onChange(filters)
    }

    render() {
        return (
            <div>
            <h4>Filter</h4>
            <Form.SelectGroup pills>
                <label className={{"selectgroup-item": true}}>
                    <input type="checkbox" className={"selectgroup-input"}
                        onClick={this.handleChange} name="green" value="G"
                    />
                    <span className={"selectgroup-button ms ms-g"}/>
                </label>

                <label className={{"selectgroup-item": true}}>
                    <input type="checkbox" className={"selectgroup-input"}
                        onClick={this.handleChange} name="red" value="R"/>
                    <span className={"selectgroup-button ms ms-r"}/>
                </label>

                <label className={{"selectgroup-item": true}}>
                    <input type="checkbox" className={"selectgroup-input"}
                        onClick={this.handleChange} name="black" value="B"/>
                    <span className={"selectgroup-button ms ms-b"}/>
                </label>

                <label className={{"selectgroup-item": true}}>
                    <input type="checkbox" className={"selectgroup-input"}
                        onClick={this.handleChange} name="white" value="W"/>
                    <span className={"selectgroup-button ms ms-w"}/>
                </label>

                <label className={{"selectgroup-item": true}}>
                    <input type="checkbox" className={"selectgroup-input"}
                    onClick={this.handleChange} name="blue" value="U"/>
                    <span className={"selectgroup-button ms ms-u"}/>
                </label>
            </Form.SelectGroup>
            </div>
        )
    }
}

export default FilterCards;
