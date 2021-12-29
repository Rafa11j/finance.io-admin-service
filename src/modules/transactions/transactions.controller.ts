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
import { CreateTransactionDto } from './dtos/create-transaction.dto';
import { Transaction } from './entities/Transaction';
import { IFindTransactionResponse } from './interfaces/find-transaction-response';
import { ITransactionPaginatedResponse } from './interfaces/transaction-paginated-response';
import { CreateTransactionService } from './services/create-transaction.service';
import { DeleteTransactionService } from './services/delete-transaction.service';
import { FindAllTransactionsPaginatedService } from './services/find-all-transactions-paginated.service';
import { FindTransactionService } from './services/find-transaction.service';
import { UpdateTransactionService } from './services/update-transaction.service';

@Controller('transactions')
@ApiTags('transaction')
@UseGuards(JwtAuthGuard)
export class TransactionsController {
  constructor(
    private readonly createTransaction: CreateTransactionService,
    private readonly findAllTransactionsPaginated: FindAllTransactionsPaginatedService,
    private readonly findTransaction: FindTransactionService,
    private readonly updateTransaction: UpdateTransactionService,
    private readonly deleteTransaction: DeleteTransactionService,
  ) {}

  @Get('/paginated')
  @HttpCode(HttpStatus.OK)
  async listPaginated(
    @Request() req,
    @Query('size') size = 20,
    @Query('page') page = 0,
  ): Promise<IPaginated<ITransactionPaginatedResponse>> {
    return this.findAllTransactionsPaginated.execute({
      page,
      size,
      user_id: req.user.id,
    });
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async find(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<IFindTransactionResponse> {
    return this.findTransaction.execute(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Request() req,
    @Body() body: CreateTransactionDto,
  ): Promise<Transaction> {
    return this.createTransaction.execute({
      ...body,
      user_id: req.user.id,
    });
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: CreateTransactionDto,
  ): Promise<Transaction> {
    return this.updateTransaction.execute({
      ...body,
      id,
    });
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.deleteTransaction.execute(id);
  }
}
