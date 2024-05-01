import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "8db98c0733964b0a9da023f8fd9b25e3"
const token = "007eJxTYNCTDfzxbL+muVjS/Qgj8+7y2D/HCpdGPpSZ0u5zijvAfr0Cg0VKkqVFsoG5sbGlmUmSQaJlSqKBkXGaRVqKZZKRaarxiZNGaQ2BjAz/1mxmZGSAQBCfgyE3MTPPOSMxj4EBAJ7/IRk="

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "mainChan";