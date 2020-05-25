import * as consulApi from 'consul';
import { RegistrationDetails } from './registration.details';

class Client {

    readonly registrationDetails: RegistrationDetails;
    readonly healthCheckInterval: number;
    readonly consul: any;

    RegisteredServices = [];

    constructor(registrationDetails: RegistrationDetails, healthCheckInterval: number) {
        this.registrationDetails = registrationDetails;
        this.healthCheckInterval = healthCheckInterval;

        this.consul = consulApi({
            host: process.env.CONSUL_HOST || '127.0.0.1',
            port: process.env.CONSUL_PORT || 8500
        });
    }

    register(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.consul.agent.service.register(this.registrationDetails, (err) => {
                if (err) {
                    reject(err);
                    return;
                }

                this.startHealthCheck().catch(reject);
                this.watch().catch(reject);
                this.watchUnregister().catch(reject);

                resolve();
            });
        });
    }

    watchUnregister(): Promise<any> {
        return new Promise((resolve, reject) => {
            process.on('SIGINT', () => {
                const details = { id: this.registrationDetails.id };

                this.consul.agent.service.deregister(details, (err) => {
                    if (err)
                        reject(err);

                    process.exit();
                });
            });
        });
    }

    startHealthCheck(): Promise<any> {
        return new Promise((resolve, reject) => {
            const serviceId = { id: `service:${this.registrationDetails.id}` };

            setInterval(() => {
                this.consul.agent.check.pass(serviceId, (err) => {
                    if (err)
                        reject(err);
                });
            }, this.healthCheckInterval);
        });
    }

    watch(): Promise<any> {
        const watcher = this.consul.watch({
            method: this.consul.catalog.service.list,
            options: {}
        });

        return new Promise((resolve, reject) => {
            watcher.on('change', (data, res) => {
                Object.keys(data).forEach(serviceName => {
                    this.consul.catalog.service.nodes(serviceName, (err, resp) => {
                        if (err) {
                            reject(err);
                            return;
                        }

                        this.RegisteredServices[serviceName] = resp;
                    });
                });
            });

            watcher.on('error', reject);
        });
    }

    getService(serviceName: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const instances = this.RegisteredServices[serviceName];

            if (!instances) {
                reject('No service found');
            }

            const loadBalancingIndex = Math.floor(Math.random() * instances.length);
            const service = instances[loadBalancingIndex];

            resolve(`http://${service.Address}:${service.ServicePort}`);
        });
    }

    getValueFromStore(key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            this.consul.kv.get(key, (err, res) => {
                if (err || !res) {
                    reject(err);
                    return;
                }

                resolve(res.Value);
            });
        });
    }
}

export { Client };
