import { signalStoreFeature, withState, withHooks, patchState } from '@ngrx/signals';

export type PageVisibilityState = { isPageVisible: boolean };

export function withPageVisibility() {
  return signalStoreFeature(
    withState<PageVisibilityState>({ isPageVisible: !document.hidden }),
    withHooks((store) => {
      function handleVisibilityChange() {
        patchState(store, { isPageVisible: !document.hidden });
      }

      return {
        onInit() {
          document.addEventListener('visibilitychange', handleVisibilityChange);
        },
        onDestroy() {
          document.removeEventListener('visibilitychange', handleVisibilityChange);
        },
      };
    })
  );
}
