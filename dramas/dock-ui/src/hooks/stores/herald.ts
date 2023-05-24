import { atom } from 'jotai';
import { News, NewsCallback, NewsCenter } from "@nara-way/herald-core";
import {Queue} from "queue-typescript";
import NatsListener from "~/hooks/client/NatsListener";

const load = () => {
    //
    const newsCenter = <NewsCenter>{ dramaChannels: new Map<string, Queue<News>>(), dramaChannelsCallback: new Map<string, NewsCallback<any>>() };
    const natsListener = NatsListener.getInstance();

    return { newsCenter: newsCenter, natsListener: natsListener};
}

const heraldContextAtom = atom(load());

export const heraldAtom = atom(
    (get) => ({
        newsCenter: get(heraldContextAtom).newsCenter,
        natsListener: get(heraldContextAtom).natsListener,
    }),
)
