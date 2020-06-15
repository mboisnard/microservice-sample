import * as os from 'os';
import * as config from '../../package.json';

import { RegistrationDetails } from './registration.details';
import { Client } from './client';

class Consul {

    readonly name = (config as any).name;
    readonly host = os.hostname();
    readonly port = Number(process.env.APPLICATION_PORT) || 3000;
    readonly healthCheckInterval = Number(process.env.CONSUL_HEALTH_CHECK) || 5000;
    readonly tags = [
        'swagger_path=/documentation',
        `swagger_version=3.0.0`,
        `swagger_title=ESGI Consul Application`,
        'traefik.enable=true',
        'traefik.frontend.entryPoints=http',
        'traefik.frontend.rule=PathPrefixStrip:/toto/'
    ];

    readonly registrationDetails: RegistrationDetails;
    readonly client: Client;

    constructor() {
        this.registrationDetails = new RegistrationDetails(this.name, this.host, this.port, this.tags);
        this.client = new Client(this.registrationDetails, this.healthCheckInterval);
    }

    async register(): Promise<any> {
        return this.client.register();
    }

    async getService(serviceName: string): Promise<string> {
        return this.client.getService(serviceName);
    }

    async getValue(key: string): Promise<any> {
        return this.client.getValueFromStore(key);
    }
}

export { Consul as ConsulClient };
