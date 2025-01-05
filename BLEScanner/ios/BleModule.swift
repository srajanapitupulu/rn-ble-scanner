//
//  BleModule.swift
//  BLEScanner
//
//  Created by srajanapitupulu on 05/01/25.
//


import Foundation
import CoreBluetooth
import React

@objc(BleModule)
class BleModule: RCTEventEmitter, CBCentralManagerDelegate {
  func centralManagerDidUpdateState(_ central: CBCentralManager) {
    
  }

  private var centralManager: CBCentralManager?
  private var hasListeners = false
  
  override init() {
      super.init()
      centralManager = CBCentralManager(delegate: self, queue: nil)
  }
  
  @objc
  override static func requiresMainQueueSetup() -> Bool {
      return true
  }
  
  override func supportedEvents() -> [String]! {
      return ["onScanStart", "onScanStop", "onDeviceFound"]
  }
  
  @objc(startScan:)
  func startScan(options: NSDictionary) -> Void {
      centralManager?.scanForPeripherals(withServices: nil, options: nil)
      sendEvent(withName: "onScanStart", body: nil)
  }
  
  @objc(stopScan)
  func stopScan() -> Void {
      centralManager?.stopScan()
      sendEvent(withName: "onScanStop", body: nil)
  }
  
  func centralManager(_ central: CBCentralManager, didDiscover peripheral: CBPeripheral, advertisementData: [String : Any], rssi RSSI: NSNumber) {
      let device = [
          "id": peripheral.identifier.uuidString,
          "name": peripheral.name ?? "Unknown",
          "rssi": RSSI
      ] as [String : Any]
      sendEvent(withName: "onDeviceFound", body: device)
  }
}
