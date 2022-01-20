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
import {
  IIncomesCategoryResponse,
  IStatisticsResponse,
} from './interfaces/statistcs-response';
import { DashboarCategoryGraphService } from './services/dashboard-category-graph.service';
import { DashboarStatisticsService } from './services/dashboard-statistcs.service';

@Controller('dashboard')
@ApiTags('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(
    private readonly statistcService: DashboarStatisticsService,
    private readonly categoryGraph: DashboarCategoryGraphService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async listAll(@Request() req): Promise<IStatisticsResponse> {
    return this.statistcService.execute(req.user.id);
  }

  @Get('/categories-graph')
  @HttpCode(HttpStatus.OK)
  async getCategoriesGraph(@Request() req): Promise<IIncomesCategoryResponse> {
    return this.categoryGraph.execute(req.user.id);
  }
}
