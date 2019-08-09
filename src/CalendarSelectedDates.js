import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View } from "react-native";

import styles from "./Calendar.style.js";

class CalendarHeader extends Component {
  static propTypes = {
    calendarHeaderFormat: PropTypes.string.isRequired,
    calendarHeaderContainerStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number
    ]),
    calendarHeaderStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number
    ]),
    datesForWeek: PropTypes.array.isRequired,
    allowHeaderTextScaling: PropTypes.bool
  };

  shouldComponentUpdate(nextProps) {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps);
  }

  formatRangeToHeader = () => {
    const sortedArray  = this.props.selectedRange.sort((a, b) => a.valueOf() - b.valueOf());
    const shorterDisplayArray = [];
    sortedArray.forEach((date, i) => {
      if (i < sortedArray.length - 1) {
        if (date.isSame(sortedArray[i+1], 'year')) {
          return shorterDisplayArray.push(date.format('Do MMM'));
        }
      }
      return shorterDisplayArray.push(date.format('Do MMM YYYY'));
    });
    return shorterDisplayArray.join(', ');
  };

  render() {
    const headerText = this.formatRangeToHeader();
    return (
      <View style={this.props.calendarHeaderContainerStyle}>
        <Text
          style={[
            styles.calendarHeader,
            { fontSize: this.props.fontSize },
            this.props.calendarHeaderStyle
          ]}
          allowFontScaling={this.props.allowHeaderTextScaling}
          numberOfLines={1}
        >
          {headerText}
        </Text>
      </View>
    );
  }
}

export default CalendarHeader;
