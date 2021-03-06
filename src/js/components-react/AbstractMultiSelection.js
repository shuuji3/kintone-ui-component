import React from 'react';
import PropTypes from 'prop-types';

export default class AbstractMultiSelection extends React.Component {
    static propTypes = {
        items: PropTypes.array,
        value: PropTypes.array,
        isVisible: PropTypes.bool,
        isDisabled: PropTypes.bool,
        onClick: PropTypes.func,
        onChange: PropTypes.func,
    }

    static defaultProps = {
        onChange: f => f,
        onClick: f => f
    };

    state = {
        value: this.props.value,
        items: this.props.items
    };

    componentWillReceiveProps(nextProps) {
        const newValue = nextProps.value || this.state.value;
        const newItems = nextProps.items || this.state.items;
        this.setState({
            value: newValue,
            items: newItems
        });
    }

    _getValue() {
        return this.state.value;
    }

    _setValue(value) {
        if (!this.props.items) {
            return;
        }

        this.setState({value: value});
    }

    _setDisabledItem(value, isDisabled) {
        if (!this.props.items) {
            return;
        }
        this.setState(prevState => {
            const newItems = [...prevState.items];

            newItems.forEach((item, i) => {
                if (item.value === value) {
                    newItems[i].isDisabled = isDisabled;
                }
            });
            return {items: newItems};
        });
    }

    _getItems() {
        return this.props.items;
    }

    _getItem(index) {
        return this.props.items[index];
    }

    _hasDuplicatedItems() {
        const unique = {};
        let isUnique = true;
        if (this.props.items) {
            this.props.items.forEach((val, i) => {
                if (typeof (unique[val.value]) !== 'undefined') {
                    isUnique = false;
                }
                unique[val.value] = 0;
            });
        }

        return isUnique;
    }
    _hasValidValue() {
        let validValues = [];
        this.props.items.forEach((item) => {
            validValues.push(item.value);
        });

        if(this.props.value === undefined) {
            return true;
        }

        if(this.state.value instanceof Array) {
            return this.state.value.every(val => validValues.indexOf(val) >= 0 );
        }

        return false;
    }
}