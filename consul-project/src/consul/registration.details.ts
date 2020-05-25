import * as uuid from 'uuid';

class RegistrationDetails {

    readonly name: string;
    readonly address: string;
    readonly port: number;
    readonly id: string;
    readonly tags: string[];

    readonly check = {
        ttl: '10s',
        deregister_critical_service_after: '1m'
    };

    constructor(name: string, host: string, port: number, tags: string[]) {
        this.name = name;
        this.address = host;
        this.port = port;
        this.tags = tags;
        this.id = `${name}-${uuid.v4()}`;
    }
}

export { RegistrationDetails };
