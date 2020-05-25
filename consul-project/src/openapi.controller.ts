import { Controller, Get } from '@nestjs/common';
import { OpenAPIObject } from '@nestjs/swagger';
import { OpenAPIDocumentation } from './main';

@Controller('documentation')
export class OpenAPIController {

    @Get()
    getOpenAPIDocumentation(): OpenAPIObject {
        return OpenAPIDocumentation;
    }
}
