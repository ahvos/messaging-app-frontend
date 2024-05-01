import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "8db98c0733964b0a9da023f8fd9b25e3"
const token = "007eJxTYPiy9U8L+3POw9o+6jOZDJKFPlrEGF5VMOwO8I4063wzZb0Cg0VKkqVFsoG5sbGlmUmSQaJlSqKBkXGaRVqKZZKRaaoxq6dhWkMgI0PJkvUMjFAI4nMz5CZm5jlnJOblpeYwMAAAknYf0g=="

export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
export const useClient = createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = "mainChannel";