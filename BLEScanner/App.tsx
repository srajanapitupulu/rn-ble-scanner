/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Button, FlatList, Text, TouchableOpacity } from 'react-native';
import BleManager, { BleDevice } from './BLEManager';

/**
 * The main component of the BLE Scanner application.
 * 
 * This component manages the state of discovered BLE devices and the scanning process.
 * It provides a button to start and stop scanning for BLE devices and displays the list of found devices.
 * 
 * @component
 * @returns {JSX.Element} The rendered component.
 * 
 * @example
 * // Usage example:
 * import App from './App';
 * 
 * function Main() {
 *   return <App />;
 * }
 * 
 * @typedef {Object} BleDevice
 * @property {string} id - The unique identifier of the BLE device.
 * @property {string} name - The name of the BLE device.
 * @property {number} rssi - The signal strength of the BLE device.
 * 
 * @function startScan
 * Clears the current list of devices, sets the scanning state to true, and starts scanning for BLE devices.
 * 
 * @function stopScan
 * Sets the scanning state to false and stops scanning for BLE devices.
 * 
 * @hook useEffect
 * Sets up a subscription to listen for found BLE devices and updates the state when a device is found.
 * Cleans up the subscription when the component is unmounted.
 * 
 * @hook useState
 * Manages the state of the discovered BLE devices and the scanning state.
 */
export default function App() {
  const [devices, setDevices] = useState<BleDevice[]>([]);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    const subscription = BleManager.onDeviceFound((device) => {
      setDevices(prev => [...prev, device]);
    });

    return () => subscription.remove();
  }, []);

  const startScan = () => {
    setDevices([]);
    setScanning(true);
    BleManager.startScan();
  };

  const stopScan = () => {
    setScanning(false);
    BleManager.stopScan();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fcfcfc',
      justifyContent: 'center',
      alignItems: 'center',
    },
    circleButtonContainer: {
      width: 100,
      height: 100,
      borderRadius: 50,
      overflow: 'hidden',
      borderWidth: 3,
      borderColor: '#779ad1',
      backgroundColor: '#265299',
    },
    flatList: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
    },
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.circleButtonContainer, { justifyContent: 'center', alignItems: 'center' }]}
        onPress={scanning ? stopScan : startScan}
      >
        <Text style={{ color: '#FFFFFF', fontWeight: '600', textAlign: 'center' }}>
          {scanning ? 'Stop Scan' : 'Start Scan'}
        </Text>
      </TouchableOpacity>
      <FlatList
        data={devices}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text>{item.name} ({item.rssi}dBm)</Text>
        )}
        style={styles.flatList}
      />
    </View>
  );
}
