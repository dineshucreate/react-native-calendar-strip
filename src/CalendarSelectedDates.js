import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import Moment from "moment";

import styles from "./Calendar.style.js";

class CalendarHeader extends Component {
  static propTypes = {
    calendarHeaderFormat: PropTypes.string.isRequired,
    calendarHeaderContainerStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.number
    ]),
    calendarSelectedDatesStyle: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array,
      PropTypes.number
    ]),
    datesForWeek: PropTypes.array.isRequired,
    allowHeaderTextScaling: PropTypes.bool
  };

  shouldComponentUpdate(nextProps) {
    return JSON.stringify(this.props) !== JSON.stringify(nextProps);
  }

  //Function that formats the calendar header
  //It also formats the month section if the week is in between months
  formatCalendarHeader(datesForWeek, calendarHeaderFormat) {
    if (!datesForWeek || datesForWeek.length === 0) {
      return "";
    }

    let firstDay = datesForWeek[0];
    let lastDay = datesForWeek[datesForWeek.length - 1];
    let monthFormatting = "";
    //Parsing the month part of the user defined formating
    if ((calendarHeaderFormat.match(/Mo/g) || []).length > 0) {
      monthFormatting = "Mo";
    } else {
      if ((calendarHeaderFormat.match(/M/g) || []).length > 0) {
        for (
          let i = (calendarHeaderFormat.match(/M/g) || []).length;
          i > 0;
          i--
        ) {
          monthFormatting += "M";
        }
      }
    }

    if (firstDay.month() === lastDay.month()) {
      return firstDay.format(calendarHeaderFormat);
    } else if (firstDay.year() !== lastDay.year()) {
      return `${firstDay.format(calendarHeaderFormat)} / ${lastDay.format(
        calendarHeaderFormat
      )}`;
    }

    return `${
      monthFormatting.length > 1 ? firstDay.format(monthFormatting) : ""
      } ${monthFormatting.length > 1 ? "/" : ""} ${lastDay.format(
      calendarHeaderFormat
    )}`;
  }

  formatRangeToHeader = () => {
    const sortedArray  = this.props.selectedRange.sort((a, b) => a.valueOf() - b.valueOf());
    const shorterDisplayArray = [];
    sortedArray.forEach((date, i) => {
      if (i < sortedArray.length - 1) {
        if (date.isSame(sortedArray[i+1], 'year')) {
          console.log(date, sortedArray[i+1])
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
            this.props.calendarSelectedDatesStyle
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
