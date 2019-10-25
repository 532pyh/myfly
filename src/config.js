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

export const defaultConfig = {
    enableWorker: false,//启用分离的线程进行转换（暂时不稳定）
    enableStashBuffer: true,//启用IO隐藏缓冲区。如果您需要实时（最小延迟）来进行实时流播放，则设置为false，但是如果网络抖动，则可能会停顿。
    stashInitialSize: undefined,//指示IO暂存缓冲区的初始大小。默认值为384KB。指出合适的尺寸可以改善视频负载/搜索时间。
    isLive: false,//指示数据源是否为实时流
    lazyLoad: true,//如果有足够的数据可播放，则中止http连接。
    lazyLoadMaxDuration: 3 * 60,//指示要保留多少秒的数据lazyLoad。
    lazyLoadRecoverDuration: 30,//指示lazyLoad恢复时间边界，以秒为单位。
    deferLoadAfterSourceOpen: true,//在MediaSource sourceopen事件触发后加载。在Chrome上，在后台打开的标签页可能不会触发sourceopen事件，除非切换到该标签页。

    // autoCleanupSourceBuffer: default as false, leave unspecified//对SourceBuffer进行自动清理
    autoCleanupMaxBackwardDuration: 3 * 60,//当向后缓冲区持续时间超过此值（以秒为单位）时，请对SourceBuffer进行自动清除
    autoCleanupMinBackwardDuration: 2 * 60,//指示进行自动清除时为反向缓冲区保留的持续时间（以秒为单位）。

    statisticsInfoReportInterval: 600,

    fixAudioTimestampGap: true,//当检测到较大的音频时间戳间隙时，请填充无声音频帧，以避免A / V不同步。

    accurateSeek: false,//精确搜索任何帧，不限于视频IDR帧，但可能会慢一些。可用的Chrome > 50，FireFox和Safari。
    seekType: 'range',  // [range, param, custom]//	'range'使用范围请求进行搜索，或'param'在url中添加参数以指示请求范围。
    seekParamStart: 'bstart',//指示的搜索起始参数名称 seekType = 'param'
    seekParamEnd: 'bend',//指示的搜索结束参数名称 seekType = 'param'
    rangeLoadZeroStart: false,//Range: bytes=0-如果使用范围搜索，则发送首次负载
    customSeekHandler: undefined,//指示自定义搜索处理程序
    reuseRedirectedURL: false,//重复使用301/302重定向的url进行子序列请求，例如搜索，重新连接等。
    // referrerPolicy: leave as unspecified

    headers: undefined,//指示将添加到请求的其他标头
    customLoader: undefined//指示使用FetchStreamLoader时的推荐人策略
};

export function createDefaultConfig() {
    return Object.assign({}, defaultConfig);
}