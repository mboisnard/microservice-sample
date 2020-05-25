import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { Client } from './main';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {

  @Get()
  @ApiOperation({ summary: 'Just get a simple hello world' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Hello World'})
  helloWorld(): string {
    return 'Hello World !';
  }

  @Get('lb/:serviceName')
  @ApiOperation({ summary: 'Get instance url for registered service in Consul Services' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Service found' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Service not found' })
  clientSideServiceDiscovery(@Param('serviceName') serviceName: string): Promise<string | HttpException> {
    return Client.getService(serviceName)
        .catch(() => Promise.reject(new HttpException('Service Not Found', HttpStatus.NOT_FOUND)));
  }

  @Get('keystore/:key')
  @ApiOperation({ summary: 'Get value for registered key in Consul keystore' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Value found for current key' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Key not found' })
  getValueFromKeystore(@Param('key') key: string): Promise<string | HttpException> {
    return Client.getValue(key)
        .then(value => JSON.stringify(value))
        .catch(() => Promise.reject(new HttpException('Key Not Found', HttpStatus.NOT_FOUND)));
  }

}
