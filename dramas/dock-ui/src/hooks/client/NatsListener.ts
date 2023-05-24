import {Codec, connect, JSONCodec, NatsConnection, SubscriptionOptions} from 'nats.ws';


class NatsListener {
    //
    private static instance: NatsListener;
    private natsServers: string[];
    private natsConnection: NatsConnection | undefined;
    private jsonEncoder: Codec<JSON> = JSONCodec();

    constructor() {
        //
        this.natsServers = [];
    }

     getJsonEncoder(): Codec<JSON> {
        //
        return this.jsonEncoder;
    }

    static getInstance() {
        //
        if (!NatsListener.instance) {
            NatsListener.instance = new NatsListener();
        }
        return NatsListener.instance;
    }

    addServerUrl(url: string) {
        //
        if (this.natsServers.indexOf(url) > -1) {
            return;
        }
        this.natsServers.push(url);
    }

    addServerUrls(urls: string[]) {
        //
        for (const url in urls) {
            this.addServerUrl(url);
        }
    }

    async initializeConnection() {
        //
        if (this.natsServers.length === 0) {
            throw new Error('NATS servers are empty');
        }
        this.natsConnection = await connect({servers: this.natsServers});
    }

    async disconnect () {
        //
        if (this.natsConnection) {
            await this.natsConnection.close();
            console.log("NATS Connection closed");
        }
    }

    subscribeSubject(subject: string, subOpts: SubscriptionOptions) : boolean {
        //
        const subscription = this.natsConnection?.subscribe(subject, subOpts)
        return subscription !== null;
    }
}

export default NatsListener;