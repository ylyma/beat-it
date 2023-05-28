import React, {ReactElement} from 'react';
import Container from '../common/Container';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Image, ScrollView, Text, View} from 'react-native';
import styles from './styles';
import SearchBar from '../common/SearchBar';

const HomeComponent: () => ReactElement = () => {
  return (
    <View style={styles.wrapper}>
      <Container style={styles.topContainer}>
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
      </Container>
      <Text style={styles.subtitle}>Recent Videos</Text>
      <ScrollView style={styles.scroll} horizontal>
        <View>
          <Image
            style={styles.video}
            source={require('../../assets/images/videoplaceholder.png')}
          />
          <Text style={styles.caption}>sample1.mov</Text>
        </View>

        <View>
          <Image
            style={styles.video}
            source={require('../../assets/images/videoplaceholder.png')}
          />
          <Text style={styles.caption}>sample2.mov</Text>
        </View>

        <View>
          <Image
            style={styles.video}
            source={require('../../assets/images/videoplaceholder.png')}
          />
          <Text style={styles.caption}>sample3.mov</Text>
        </View>
      </ScrollView>
      <Text style={styles.subtitle}>Favourite Videos</Text>
      <ScrollView style={styles.scroll} horizontal>
        <View>
          <Image
            style={styles.video}
            source={require('../../assets/images/videoplaceholder.png')}
          />
          <Text style={styles.caption}>sample1.mov</Text>
        </View>

        <View>
          <Image
            style={styles.video}
            source={require('../../assets/images/videoplaceholder.png')}
          />
          <Text style={styles.caption}>sample2.mov</Text>
        </View>

        <View>
          <Image
            style={styles.video}
            source={require('../../assets/images/videoplaceholder.png')}
          />
          <Text style={styles.caption}>sample3.mov</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeComponent;
