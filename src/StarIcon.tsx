import React from 'react';
import { View } from 'react-native';
import Icon from './Icon';

interface Props {
  id: number;
  style: any;
  className: any;
  tabIndex: number;
  totalIcons: number;
  value: number;
  placeholderValue: number;
  readOnly: boolean;
  quiet: boolean;
  fraction: number;
  icon: (string | object | JSX.Element)[] | string | object | JSX.Element;
  emptyIcon: (string | object | JSX.Element)[] | string | object | JSX.Element;
  placeholderIcon:
    | (string | object | JSX.Element)[]
    | string
    | object
    | JSX.Element;
  onClick: (index: number, event: any) => void;
  onHover: (index?: number, event?: any) => void;
}

interface State {
  displayValue: number;
  interacting: boolean;
}

class StarIcon extends React.PureComponent<Props, State> {
  state = {
    displayValue: this.props.value,
    interacting: false,
    value: this.props.value,
  } as State;

  constructor(props: any) {
    super(props);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.iconClick = this.iconClick.bind(this);
    this.iconMouseMove = this.iconMouseMove.bind(this);
    this.iconEnd = this.iconEnd.bind(this);
  }

  onMouseLeave() {
    this.setState({
      displayValue: this.props.value,
      interacting: false,
    });
  }

  calculateHoverPercentage(event: any, gesture: any) {
    const clientX = gesture.x0;
    const delta = clientX - event.nativeEvent.locationX;
    return delta < 0 ? 0 : delta / event.nativeEvent.pageX;
  }

  calculateDisplayValue(iconIndex: number, event: any, gesture: any) {
    const percentage = this.calculateHoverPercentage(event, gesture);
    const fraction =
      Math.ceil((percentage % 1) * this.props.fraction) / this.props.fraction;
    const precision = 10 ** 3;
    const displayValue =
      iconIndex +
      (Math.floor(percentage) + Math.floor(fraction * precision) / precision);
    return displayValue > 0
      ? displayValue > this.props.totalIcons
        ? this.props.totalIcons
        : displayValue
      : 1 / this.props.fraction;
  }

  iconClick(iconIndex: number, event: any, gesture: any) {
    const value = this.calculateDisplayValue(iconIndex, event, gesture);
    this.props.onClick(value, event);
  }

  iconMouseMove(iconIndex: number, event: any, gesture: any) {
    const value = this.calculateDisplayValue(iconIndex, event, gesture);
    this.setState({
      interacting: !this.props.readOnly,
      displayValue: value,
    });
  }

  iconEnd(iconIndex: number, event: any, gesture: any) {
    if (!this.props.quiet) {
      this.iconClick(iconIndex, event, gesture);
      event.preventDefault();
    }
    this.onMouseLeave();
  }

  static getDerivedStateFromProps(nextProps: any, prevState: any) {
    if (nextProps.value !== prevState.value) {
      return { displayValue: nextProps.value, value: nextProps.value };
    }
    return null;
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    if (prevState.interacting && !this.state.interacting) {
      return this.props.onHover();
    }

    if (this.state.interacting && prevProps.value == this.props.value) {
      this.props.onHover(this.state.displayValue);
    }
  }

  render() {
    const {
      style,
      readOnly,
      totalIcons,
      emptyIcon,
      placeholderValue,
      value,
      placeholderIcon,
      icon,
      quiet,
    } = this.props;
    const { interacting, displayValue } = this.state;
    const icons = [] as any;
    const empty = [].concat(emptyIcon as any);
    const shouldDisplayPlaceholder =
      placeholderValue !== 0 && value === 0 && !interacting;
    const placeholder = [].concat(placeholderIcon as any);
    const full = [].concat(icon as any);

    let renderedValue;
    if (shouldDisplayPlaceholder) {
      renderedValue = placeholderValue;
    } else {
      renderedValue = quiet ? value : displayValue;
    }

    const flooredRenderedValue = Math.floor(renderedValue);

    for (let i = 0; i < totalIcons; i++) {
      let percent;
      if (i - flooredRenderedValue < 0) {
        percent = 100;
      } else if (i - flooredRenderedValue === 0) {
        percent = (renderedValue - i) * 100;
      } else {
        percent = 0;
      }
      icons.push(
        <Icon
          key={i}
          index={i}
          readOnly={readOnly}
          emptyIcon={empty[i % empty.length]}
          icon={
            shouldDisplayPlaceholder
              ? placeholder[i % full.length]
              : full[i % full.length]
          }
          percent={percent}
          {...(!readOnly && {
            onStart: this.iconClick,
            // onMouseMove: this.iconMouseMove,
            // onTouchMove: this.iconMouseMove,
            // onTouchEnd: this.iconEnd,
          })}
        />,
      );
    }

    return (
      <View
        style={{
          ...style,
          flexDirection: 'row', // display: 'inline-block',
          outline: 'none',
        }}
      >
        {icons}
      </View>
    );
  }
}

export default StarIcon;
