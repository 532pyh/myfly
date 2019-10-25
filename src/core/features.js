/*
 * Copyright (C) 2016 Bilibili. All Rights Reserved.
 *
 * @author zheng qian <xqq@xqq.im>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import IOController from '../io/io-controller.js';
import {createDefaultConfig} from '../config.js';

class Features {

    static supportMSEH264Playback() {
        return window.MediaSource &&
               window.MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"');
    }

    static supportNetworkStreamIO() {
        let ioctl = new IOController({}, createDefaultConfig());
        let loaderType = ioctl.loaderType;
        ioctl.destroy();
        return loaderType == 'fetch-stream-loader' || loaderType == 'xhr-moz-chunked-loader';
    }

    static getNetworkLoaderTypeName() {
        let ioctl = new IOController({}, createDefaultConfig());
        let loaderType = ioctl.loaderType;
        ioctl.destroy();
        return loaderType;
    }

    static supportNativeMediaPlayback(mimeType) {
        if (Features.videoElement == undefined) {
            Features.videoElement = window.document.createElement('video');
        }
        let canPlay = Features.videoElement.canPlayType(mimeType);
        return canPlay === 'probably' || canPlay == 'maybe';
    }

    static getFeatureList() {
        let features = {
            mseFlvPlayback: false,//与相同flvjs.isSupported()，表示您的浏览器是否可以进行基本播放。
            mseLiveFlvPlayback: false,//指示HTTP FLV实时流是否可以在您的浏览器上工作。
            networkStreamIO: false,//指示网络加载程序是否正在流式传输。
            networkLoaderName: '',//指示网络加载程序类型名称。
            nativeMP4H264Playback: false,//指示您的浏览器是否本身支持H.264 MP4视频文件
            nativeWebmVP8Playback: false,//指示您的浏览器是否本机支持WebM VP8视频文件。
            nativeWebmVP9Playback: false//指示您的浏览器是否本机支持WebM VP9视频文件。
        };

        features.mseFlvPlayback = Features.supportMSEH264Playback();
        features.networkStreamIO = Features.supportNetworkStreamIO();
        features.networkLoaderName = Features.getNetworkLoaderTypeName();
        features.mseLiveFlvPlayback = features.mseFlvPlayback && features.networkStreamIO;
        features.nativeMP4H264Playback = Features.supportNativeMediaPlayback('video/mp4; codecs="avc1.42001E, mp4a.40.2"');
        features.nativeWebmVP8Playback = Features.supportNativeMediaPlayback('video/webm; codecs="vp8.0, vorbis"');
        features.nativeWebmVP9Playback = Features.supportNativeMediaPlayback('video/webm; codecs="vp9"');

        return features;
    }

}

export default Features;