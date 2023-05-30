import React, { ReactElement, useState } from 'react';
import Container from '../common/Container';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Image, ScrollView, Text, View } from 'react-native';
import styles from './styles';
import SearchBar from '../common/SearchBar';
import HorizView from '../common/HorizView/HorizView';

const HomeComponent: () => ReactElement = () => {
    return (
        <Container>
            <ScrollView style={styles.vertScroll}>
                <View style={styles.topContainer}>
                    <View style={styles.searchRow}>
                        <SearchBar
                            style={styles.searchBar}
                            icon={<Ionicons name="search" />}
                            iconPosition="left"
                            placeholder="Search"
                        />
                        <Image
                            style={styles.userIcon}
                            source={require('../../assets/images/placeholderuser.png')}
                        />
                    </View>
                    <Text style={styles.title}>Hi, [User]!</Text>
                </View>
                <Text style={styles.subtitle}>Recent Videos</Text>

                <ScrollView style={styles.scroll} horizontal>

                    <HorizView image_src={require('../../assets/images/videoplaceholder.png')} caption='sample1.mov' />
                    <HorizView image_src={require('../../assets/images/videoplaceholder.png')} caption='sample2.mov' />
                    <HorizView image_src={require('../../assets/images/videoplaceholder.png')} caption='sample3.mov' />

                </ScrollView>
                <Text style={styles.subtitle}>Favourite Videos</Text>
                <ScrollView style={styles.scroll} horizontal>
                    <HorizView image_src={require('../../assets/images/videoplaceholder.png')} caption='sample1.mov' />
                    <HorizView image_src={require('../../assets/images/videoplaceholder.png')} caption='sample2.mov' />
                    <HorizView image_src={require('../../assets/images/videoplaceholder.png')} caption='sample3.mov' />


                </ScrollView>
            </ScrollView>
        </Container>

    );
};

export default HomeComponent;
