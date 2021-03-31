import React from 'react';
import { View } from 'react-native';

export function calculateTotalIcons(start: number, stop: number, step: number) {
  return Math.floor((stop - start) / step);
}

export function renderIcon(icon: any) {
  if (React.isValidElement(icon)) {
    return icon;
  }
  if (typeof icon === 'object' && icon !== null) {
    return <View style={icon} />;
  }
  return null;
}
