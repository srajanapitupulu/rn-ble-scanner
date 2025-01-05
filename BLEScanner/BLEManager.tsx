import { NativeEventEmitter, NativeModules } from 'react-native';

export interface BleScanOptions {
    allowDuplicates?: boolean;
}

export interface BleDevice {
    id: string;
    name: string;
    rssi: number;
}

class BleManager {
    private eventEmitter: NativeEventEmitter;

    constructor() {
        this.eventEmitter = new NativeEventEmitter(NativeModules.BleModule);
    }

    startScan(options: BleScanOptions = {}) {
        NativeModules.BleModule.startScan(options);
    }

    stopScan() {
        NativeModules.BleModule.stopScan();
    }

    onDeviceFound(listener: (device: BleDevice) => void) {
        return this.eventEmitter.addListener('onDeviceFound', listener);
    }

    onScanStart(listener: () => void) {
        return this.eventEmitter.addListener('onScanStart', listener);
    }

    onScanStop(listener: () => void) {
        return this.eventEmitter.addListener('onScanStop', listener);
    }
}

export default new BleManager();