import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IStatisticsResponse } from './interfaces/statistcs-response';
import { DashboarStatisticsService } from './services/dashboard-statistcs.service';

@Controller('dashboard')
@ApiTags('account')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly statistcService: DashboarStatisticsService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async listAll(@Request() req): Promise<IStatisticsResponse> {
    return this.statistcService.execute(req.user.id);
  }
}
