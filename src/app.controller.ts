import { Controller, Get, SetMetadata } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiExcludeController()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @SetMetadata('allowAnonymous', true)
  getHello(): string {
    return this.appService.getHello();
  }
}
