import { computed } from '@angular/core';
import { signalStoreFeature, withState, withComputed, withMethods, patchState } from '@ngrx/signals';

export type AutoScrollState = { autoScroll: boolean };

export function withAutoScroll() {
    return signalStoreFeature(
        withState<AutoScrollState>({ autoScroll: true }),
        withComputed(({ autoScroll }) => ({
            isAutoScrollEnabled: computed(() => autoScroll()),
        })),
        withMethods((store) => ({
            enableAutoScroll(isTimeoutSet: boolean = true) {
                if (isTimeoutSet) {
                    setTimeout(() => {
                        patchState(store, { autoScroll: true });
                    }, 200);
                } else {
                    patchState(store, { autoScroll: true });
                }
            },
            disableAutoScroll() {
                patchState(store, { autoScroll: false });
            }
        }))
    );
}