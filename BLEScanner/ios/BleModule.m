//
//  BleModule.m
//  BLEScanner
//
//  Created by srajanapitupulu on 05/01/25.
//


#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(BleModule, RCTEventEmitter)
RCT_EXTERN_METHOD(startScan:(NSDictionary *)options)
RCT_EXTERN_METHOD(stopScan)
@end
