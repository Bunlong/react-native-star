import React from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  PanResponder
} from 'react-native';
import { renderIcon } from './utils';

interface Props {
  index: number;
  readOnly: boolean;
  percent: number;
  icon: string | object | JSX.Element;
  emptyIcon: string | object | JSX.Element;
  onStart?: (index: number, event: any, gesture: any) => void;
  onMouseMove?: (index: number, event: any) => void;
  onTouchEnd?: (index: number, event: any) => void;
  onTouchMove?: (index: number, event: any) => void;
}

class Icon extends React.PureComponent<Props> {
  render() {
    const {
      // readOnly,
      onStart,
      index,
      // onMouseMove,
      // onTouchEnd,
      percent,
      emptyIcon,
      icon,
    } = this.props;
    const showbgIcon = percent < 100;
    const styles = StyleSheet.create({
      bgIconContainerStyle: showbgIcon ? {} : { /* visibility: 'hidden' */ } as ViewStyle,
      iconContainerStyle: {
        flexDirection: 'row', // display: 'inline-block',
        position: 'absolute',
        overflow: 'hidden',
        top: 0,
        ['left']: 0,
        width: `${percent}%`,
      },
      style: {
        // cursor: !readOnly ? 'pointer' : 'inherit',
        flexDirection: 'row', // display: 'inline-block',
        position: 'relative',
        marginLeft: 5,
      },
    });

    // function handleMouseClick(event: any) {
    //   if (onClick) {
    //     event.preventDefault();
    //     onClick(index, event);
    //   }
    // }

    // function handleMouseMove(event: any) {
    //   if (onMouseMove) {
    //     onMouseMove(index, event);
    //   }
    // }

    // function handleTouchEnd(event: any) {
    //   if (onTouchEnd) {
    //     onTouchEnd(index, event);
    //   }
    // }

    const panResponder = PanResponder.create( {
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: ( event, gesture ) => {
        if (onStart) {
          onStart(index, event, gesture);
        }
      },
      // onPanResponderMove: ( event, gesture ) => {
      //   // onTouchMove
      //   console.log('22222222222222222222');
      // },
      // onPanResponderRelease: () => {
      //   // onTouchEnd
      //   console.log('33333333333333333333');
      // }
    });

    return (
      <View
        style={
          index === 0
            ? Object.assign({}, styles.style, { marginLeft: 0 })
            : styles.style
        }
        {...panResponder.panHandlers}
      >
        <View style={styles.bgIconContainerStyle}>{renderIcon(emptyIcon)}</View>
        <View style={styles.iconContainerStyle}>{renderIcon(icon)}</View>
      </View>
    );
  }
}

export default Icon;
