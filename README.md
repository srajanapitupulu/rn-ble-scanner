<!--
    This file contains the README documentation for the rn-ble-scanner project.
    The rn-ble-scanner is a React Native application designed to scan and interact with Bluetooth Low Energy (BLE) devices.
-->
# rn-ble-scanner

Bluetooth Low Energy scanner Native Module build for React Native apps

## About

The rn-ble-scanner is a React Native application designed to scan and interact with Bluetooth Low Energy (BLE) devices.

## Installation and Configuration

1. Clone the repository:
    ```sh
    git clone https://github.com/srajanapitupulu/rn-ble-scanner.git
    cd rn-ble-scanner
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Install pods for iOS:
    ```sh
    cd ios
    pod install
    cd ..
    ```

4. Link the native modules (if not using auto-linking):
    ```sh
    react-native link
    ```

5. Apply necessary fixes:
    - Ensure you have the correct permissions set in your `Info.plist` for iOS:
        ```xml
        <key>NSBluetoothAlwaysUsageDescription</key>
        <string>We use Bluetooth to connect to BLE devices</string>
        <key>NSBluetoothPeripheralUsageDescription</key>
        <string>We use Bluetooth to connect to BLE devices</string>
        ```

## Running the App

1. Start the Metro bundler:
    ```sh
    npm start
    ```

2. Run the app on Android:
    ```sh
    npm run android
    ```

3. Run the app on iOS:
    ```sh
    npm run ios
    ```

## Technologies Used

- React Native: 0.64.0
- React: 17.0.1
- React Native BLE Manager: 7.4.3
- React Navigation: 5.9.4

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

