/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, { useEffect, useState } from 'react';
import { View, Button, FlatList, Text } from 'react-native';
import BleManager, { BleDevice } from './BLEManager';

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

  return (
    <View>
      <Button
        title={scanning ? "Stop Scan" : "Start Scan"}
        onPress={scanning ? stopScan : startScan}
      />
      <FlatList
        data={devices}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <Text>{item.name} ({item.rssi}dBm)</Text>
        )}
      />
    </View>
  );
}
