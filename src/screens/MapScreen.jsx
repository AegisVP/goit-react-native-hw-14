import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = ({ route: { params } }) => {
  const { geoLocation, locality, pictureName } = params.post;
  const [location, setLocation] = useState({ latitude: geoLocation?.latitude ?? 50.4500079, longitude: geoLocation?.longitude ?? 30.524068 });

  const handleCoordinateChange = e => {
    setLocation(e.nativeEvent.coordinate);
    // TODO: handle change of locality
    // TODO: handle saving the post
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Map Screen</Text>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude: location?.latitude ?? 50.4500079,
          longitude: location?.longitude ?? 30.524068,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        mapType='standard'
        onLongPress={handleCoordinateChange}>
        {!!location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={pictureName}
            description={`${locality ?? 'Somewhere in the world'}`}
            draggable
            onDragEnd={handleCoordinateChange}
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapScreen;
