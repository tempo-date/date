import { useObserve, useUnmountOnce } from "@legendapp/state/react";
import { useEffect, useState } from "react";
import { useConsumeState } from "../provider/hook";

export const useSyncUpdates = (broadcastTag?: string) => {
  const state$ = useConsumeState();

  const [channel] = useState(() => {
    if (!broadcastTag) return null;

    return new BroadcastChannel(broadcastTag);
  });

  const shouldDisableSyncing = (channel: BroadcastChannel | null): channel is null => {
    return channel === null || !(channel instanceof BroadcastChannel);
  };

  const dispose = useObserve(state$.date, ({ onCleanup, cancel, value }) => {
    if (shouldDisableSyncing(channel)) {
      onCleanup?.();

      return undefined;
    }

    channel.postMessage(value);

    onCleanup = channel.close;

    channel.onmessageerror = (event) => {
      event.preventDefault();

      cancel = true;

      onCleanup?.();
    };
  });

  useUnmountOnce(dispose);

  useEffect(() => {
    if (shouldDisableSyncing(channel)) return undefined;

    const handleMessage = (event: MessageEvent) => {
      event.preventDefault();

      state$.date.set(event.data);
    };

    channel.addEventListener("message", handleMessage);

    return () => {
      channel.removeEventListener("message", handleMessage);
    };
  }, [channel, state$.date]);
};
