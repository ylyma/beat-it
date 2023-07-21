import { View, Text, SliderComponent } from 'react-native'
import React from 'react'
import Slider from '@react-native-community/slider'
import styles from './styles'
import { useTheme } from '@react-navigation/native'

type SliderProps = {
    value: number,
    minimumValue: number,
    maximumValue: number,
    onSlidingComplete: any,
}

const CustomSlider = (props: SliderProps) => {
    const colors = useTheme().colors
    return (
        <Slider
            style={styles.progressBar}
            thumbTintColor={colors.secondary}
            minimumTrackTintColor={colors.fourth}
            {...props}
        />
    )
}

export default CustomSlider