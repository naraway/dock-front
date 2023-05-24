import {useAtom} from "jotai";
import {useCallback} from "react";
import {Queue} from "queue-typescript";
import {
    HeraldFlowApi,
    HeraldSeekApi,
    KollectionNewsPreferenceCdo,
    News,
    NewsCallback,
    NewsPreferenceCdo, NewsPriority, NewsTarget
} from "@nara-way/herald-core";
import {heraldAtom} from "~/hooks/stores";
import {NatsListener} from "~/hooks/client";
import {IdName, NameValueList} from "@nara-way/accent";
import {HeraldNewsEvent} from "@nara-way/herald-core/dist/@types/models/feature/herald/event";


export const useHerald = () => {
    const [herald] = useAtom(heraldAtom);

    const initialize = useCallback(async (natsServerUrl: string, subject: string) => {
        //
        const {natsListener} = herald;
        natsListener.addServerUrl(natsServerUrl);
        await natsListener.initializeConnection()
            .catch((error) => {
                console.log(error);
            });
        //const subject = 'io.naraway.herald-' + citizenId.replaceAll('@', '').replaceAll(':', '');
        natsListener.subscribeSubject(subject, {callback: newsCallback});
    }, []);

    const newsCallback = (error: any, rawMessage: any) => {
        if (error) {
            alert(JSON.stringify(error));
            return;
        }
        const {natsListener} = herald;
        const heraldMessage: any = natsListener.getJsonEncoder().decode(rawMessage.data);
        let newsEvent = JSON.parse(heraldMessage.payload) as HeraldNewsEvent;
        const news = transformToNews(newsEvent);
        registerDramaNews(news.fromDrama, news);
    }

    const transformToNews = (newsEvent: HeraldNewsEvent) => {
        //
        let news: News = {
            citizenId: newsEvent.citizenId,
            entityVersion: 0,
            fromDrama: newsEvent.fromDrama,
            fromKollectie: newsEvent.fromKollectie,
            fromStageId: newsEvent.fromStageId,
            id: newsEvent.newsId,
            message: newsEvent.message,
            modifiedBy: "",
            modifiedOn: 0,
            newsPriority: newsEvent.newsPriority as NewsPriority,
            newsTarget: newsEvent.newsTarget as NewsTarget,
            occurredTime: 0,
            pavilionId: "",
            read: false,
            readTime: 0,
            registeredBy: "",
            registeredOn: 0,
            // @ts-ignore
            requesterKey: {},
            stageId: "",
            transferTime: 0
        }

        return news;
    }

    const registerDramaNews = (dramaName: string, news: News) => {
        const {dramaChannels, dramaChannelsCallback} = herald.newsCenter;
        if (!dramaChannels.has(dramaName)) {
            alert("Drama is not subscribed:" + dramaName);
            return;
        }
        const dramaChannel = dramaChannels?.get(dramaName);
        dramaChannel?.enqueue(news);
        const callback = dramaChannelsCallback.get(dramaName);
        if (callback) {
            callback(news);
        }
    }

    const subscribeDramaNews = (dramaName: string, callback?: NewsCallback<News>) => {
        //
        const {dramaChannels, dramaChannelsCallback} = herald.newsCenter;
        if (!dramaChannels.has(dramaName)) {
            dramaChannels.set(dramaName, new Queue<News>());
            if (callback) {
                dramaChannelsCallback.set(dramaName, callback);
            }
            console.log("Drama: " + dramaName + " has been registered.");
        }
    }

    const isDramaNewsEmpty = (dramaName: string) => {
        //
        const {dramaChannels} = herald.newsCenter;
        const news = dramaChannels.get(dramaName);
        if (news) {
            return news.length === 0;
        }
        return false;
    }

    const getDramaNews = (dramaName: string) => {
        //
        const {dramaChannels} = herald.newsCenter;
        const dramaNewsQueue = dramaChannels.get(dramaName);
        if (dramaNewsQueue && dramaNewsQueue.length !== 0) {
            return dramaNewsQueue.dequeue();
        }
        return null;
    }

    const getDramaAllNews = (dramaName: string) => {
        //
        const {dramaChannels} = herald.newsCenter;
        const dramaNewsQueue = dramaChannels.get(dramaName);

        if (dramaNewsQueue && dramaNewsQueue.length !== 0) {
            return dramaNewsQueue.toArray();
        }
        return [];
    }

    const clearDramaNews = (dramaName: string) => {
        //
        const {dramaChannels} = herald.newsCenter;
        const dramaNewsQueue = dramaChannels.get(dramaName);
        if (dramaNewsQueue) {
            while (dramaNewsQueue.dequeue() !== null) ;
        }
    }

    const disconnect = async () => {
        //
        await NatsListener.getInstance().disconnect();
    }

    const collectNews = async (citizenId: string, fromKollectie: string) => {
        //
        const queryResult = await HeraldSeekApi.collectNews({citizenId, fromKollectie})
            .catch((error) => {
                alert("Error occurred while retrieving news.");
            });
        return queryResult?.data.queryResult;
    }

    const read = async (citizenId: string, newsIds: string[]) => {
        //
        await HeraldFlowApi.read({citizenId, newsIds})
            .then((value) => {
                if (value.data.requestFailed) {
                    throw new Error("Error occurred while saving data.");
                }
            })
            .catch((e) => {
                throw new Error("Error occurred while saving data.");
            });
    }

    const registerNewsPreference = async (newsPreferenceCdo: NewsPreferenceCdo) => {
        //
        HeraldFlowApi.registerNewsPreference({newsPreferenceCdo})
            .then((value) => {
                if (value.data.requestFailed) {
                    throw new Error('Error occurred while saving NewsPreference.');
                }
            })
            .catch((error) => {
                throw new Error('Error occurred while saving NewsPreference.');
            });
    }

    const registerKollectionNewsPreference = async (kollectionNewsPreferenceCdo: KollectionNewsPreferenceCdo) => {
        //
        HeraldFlowApi.registerKollectionNewsPreference({kollectionNewsPreferenceCdo})
            .then((value) => {
                if (value.data.requestFailed) {
                    throw new Error("Error occurred while saving Kollection News Preference");
                }
            })
            .catch((e) => {
                throw new Error("Error occurred while saving Kollection News Preference");
            });
    }

    const modifyNewsPreference = (newsPreferenceId: string, nameValues: NameValueList) => {
        //
        HeraldFlowApi.modifyNewsPreference({newsPreferenceId, nameValues})
            .then((result) => {
                if (result.data.requestFailed) {
                    throw new Error('Error Occurred while modifying News Preference.');
                }
            })
            .catch((error) => {
                throw new Error('Error Occurred while modifying News Preference.');
            })
    }

    const modifyKollectionNewsPreference = (kollectionNewsPreferenceId: string, nameValues: NameValueList) => {
        //
        HeraldFlowApi.modifyKollectionNewsPreference({kollectionNewsPreferenceId, nameValues})
            .then((result) => {
                if (result.data.requestFailed) {
                    throw new Error('Error Occurred while modifying News Preference.');
                }
            })
            .catch((e) => {
                throw new Error('Error Occurred while modifying News Preference.');
            })
    }

    const findCitizenNewsPreference = async (citizenId: string) => {
        //
        const queryResult = await HeraldSeekApi.findCitizenNewsPreference({citizenId})
            .catch((error)=> {
                throw new Error('Error Occurred while retrieving News Preference.');
            });
        return queryResult?.data.queryResult;
    }

    const findKollectionNewsPreference = async (citizenId: string, kollectionId: string, kollectionName: string) => {
        //
        const kollection = {id: kollectionId, name: kollectionName} as IdName;
        const queryResult = await HeraldSeekApi.findCitizenKollectionNewsPreference({citizenId, kollection})
            .catch((error) => {
                throw new Error('Error Occurred while retrieving News Preference.');
            });
        return queryResult?.data.queryResult;
    }

    return {
        initialize,
        disconnect,
        registerDramaNews,
        subscribeDramaNews,
        isDramaNewsEmpty,
        clearDramaNews,
        getDramaAllNews,
        getDramaNews,
        collectNews,
        registerNewsPreference,
        registerKollectionNewsPreference,
        modifyNewsPreference,
        modifyKollectionNewsPreference,
        read,
        findCitizenNewsPreference,
        findKollectionNewsPreference,
    }
}