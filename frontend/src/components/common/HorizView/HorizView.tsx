import { Text, StyleSheet, View, Image, ImageSourcePropType } from 'react-native'
import React, { Component } from 'react'
import styles from '../../Audio/styles'
import { useTheme } from '@react-navigation/native';

type HorizProps = {
    image_src: ImageSourcePropType,
    caption: string
}

// to abstract away the repeated code in the Home and Audio components
const HorizView = (props: HorizProps) => {
    const colors = useTheme().colors;
    return (
        <View>
            <Image
                style={styles.playlist}
                source={props.image_src}
            />
            <Text style={[styles.caption, { color: colors.text }]}>
                {props.caption}
            </Text>
        </View>
    )
}


export default HorizView