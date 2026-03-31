import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { useStore } from '../store/useStore';

interface Props {
  size: number;
  strokeWidth: number;
  progress: number; // 0 to 100
  color: string;
}

export default function CircularProgress({ size, strokeWidth, progress, color }: Props) {
  const { theme } = useStore();
  const isDark = theme !== 'light';

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size}>
        <Circle
          stroke="#E2E8F0"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke={color}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          originX={size / 2}
          originY={size / 2}
          rotation="-90"
        />
      </Svg>
      <View style={styles.textContainer}>
        <Text style={[styles.text, isDark && { color: '#F8FAFC' }]}>{Math.round(progress)}%</Text>
        <Text style={[styles.label, isDark && { color: '#94A3B8' }]}>Completed</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  label: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  }
});
