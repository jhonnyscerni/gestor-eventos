import { FrequenciaService } from './../../../service/frequencia.service';
import { Component, VERSION, OnInit, ViewChild } from '@angular/core';

// import { ZXingScannerComponent } from './modules/zxing-scanner/zxing-scanner.module';

import { Result } from '@zxing/library';
import { ZXingScannerComponent } from '@zxing/ngx-scanner/app/modules/zxing-scanner/zxing-scanner.module';

@Component({
    selector: 'app-leitor-qrcode',
    templateUrl: './leitor-qrcode.component.html',
    styleUrls: ['./leitor-qrcode.component.css']
})
export class LeitorQrcodeComponent implements OnInit {

    ngVersion = VERSION.full;

    @ViewChild('scanner')
    scanner: ZXingScannerComponent;

    hasCameras = false;
    qrResultString: string;
    qrResult: Result;
    scannerEnabled = true;

    availableDevices: MediaDeviceInfo[];
    selectedDevice: MediaDeviceInfo;


    constructor(
        private frequenciaService: FrequenciaService,
    ) { }

    ngOnInit() {

        this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
            this.hasCameras = true;

            // selects the devices's back camera by default
            // for (const device of devices) {
            //     if (/back|rear|environment/gi.test(device.label)) {
            //         this.scanner.changeDevice(device);
            //         this.selectedDevice = device;
            //         break;
            //     }
            // }
        });

        this.scanner.scanComplete.subscribe((result: Result) => {
            this.qrResult = result;
        });
    }

    displayCameras(cameras: MediaDeviceInfo[]) {
        console.log('Devices: ', cameras);
        this.availableDevices = cameras;
    }

    handleQrCodeResult(resultString: string) {
        this.frequenciaService.presenca(resultString).subscribe(frequencia => {

            console.log('Result: ', resultString);
            this.qrResultString = resultString;
            console.log(frequencia);
        });
    }


    onDeviceSelectChange(selectedValue: string) {
        console.log('Selection changed: ', selectedValue);
        this.selectedDevice = this.scanner.getDeviceById(selectedValue);
    }
}
