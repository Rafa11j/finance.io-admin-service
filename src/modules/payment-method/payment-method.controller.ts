import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Body,
  Get,
  Query,
  Param,
  ParseUUIDPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IPaginated } from '@shared/models/paginated';
import { CreatePaymentMethodDto } from './dtos/cretae-payment-method.dto';
import { PaymentMethod } from './entities/payment-method';
import { IPaymentMethodResponse } from './interfaces/payment-method-response';
import { CreatePaymentMethodService } from './services/create-payment-method.service';
import { DeletePaymentMethodService } from './services/delete-payment-method.service';
import { FindAllPaymentMethodService } from './services/find-all-payment-method.service';
import { FindAllPaymentMethodsPaginatedService } from './services/find-all-payment-methods-paginated.service';
import { FindPaymentMethodService } from './services/find-payment-method.service';
import { UpdatePaymentMethodService } from './services/update-payment-method.service';

@ApiTags('payment-methods')
@Controller('payment-methods')
@UseGuards(JwtAuthGuard)
export class PaymentMethodController {
  constructor(
    private readonly createPaymentMethod: CreatePaymentMethodService,
    private readonly findAllPaymentMethod: FindAllPaymentMethodService,
    private readonly findAllPaymentMethodPaginated: FindAllPaymentMethodsPaginatedService,
    private readonly findPaymentMethod: FindPaymentMethodService,
    private readonly updatePaymentMethod: UpdatePaymentMethodService,
    private readonly deletePaymentMethod: DeletePaymentMethodService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async list(@Request() req): Promise<IPaymentMethodResponse[]> {
    return this.findAllPaymentMethod.execute(req.user.id);
  }

  @Get('/paginated')
  @HttpCode(HttpStatus.OK)
  async listPaginated(
    @Request() req,
    @Query('size') size = 20,
    @Query('page') page = 0,
  ): Promise<IPaginated<IPaymentMethodResponse>> {
    return this.findAllPaymentMethodPaginated.execute({
      page,
      size,
      user_id: req.user.id,
    });
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async find(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IPaymentMethodResponse> {
    return this.findPaymentMethod.execute(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Request() req,
    @Body() data: CreatePaymentMethodDto,
  ): Promise<PaymentMethod> {
    return this.createPaymentMethod.execute({
      ...data,
      user_id: req.user.id,
    });
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() data: CreatePaymentMethodDto,
  ): Promise<IPaymentMethodResponse> {
    return this.updatePaymentMethod.execute({
      ...data,
      id,
    });
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.deletePaymentMethod.execute(id);
  }
}
