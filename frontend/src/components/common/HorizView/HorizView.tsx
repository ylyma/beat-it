import { Text, StyleSheet, View, Image, ImageSourcePropType } from 'react-native'
import React, { Component } from 'react'
import styles from '../../Audio/styles'

type HorizProps = {
    image_src: ImageSourcePropType,
    caption: string
}

// to abstract away the repeated code in the Home and Audio components
const HorizView = (props: HorizProps) => {
    // console.log(props.image_src)
    return (
        <View>
            <Image
                style={styles.playlist}
                source={props.image_src}
            />
            <Text style={styles.caption}>
                {props.caption}
            </Text>
        </View>
    )
}


export default HorizView