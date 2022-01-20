import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { IPaginated } from '@shared/models/paginated';
import { CreateAccountDto } from './dtos/create-account.dto';
import { TransferAccountDto } from './dtos/transfer-account.dto';
import { AccountResponse } from './interfaces/account-response';
import { CreateAccountService } from './services/create-account.service';
import { DeleteAccountService } from './services/delete-account.service';
import { FindAccountService } from './services/find-account.service';
import { FindAllAccountsPaginatedService } from './services/find-all-accounts-paginated.service';
import { FindAllAccountsService } from './services/find-all-accounts.service';
import { TransferToAnotherAccountService } from './services/transfer-to-another-account.service';
import { UpdateAccountService } from './services/update-account.service';

@Controller('accounts')
@ApiTags('account')
@UseGuards(JwtAuthGuard)
export class AccountController {
  constructor(
    private readonly createAccount: CreateAccountService,
    private readonly findAllAccounts: FindAllAccountsService,
    private readonly updateAccount: UpdateAccountService,
    private readonly findAllPaginated: FindAllAccountsPaginatedService,
    private readonly findAccount: FindAccountService,
    private readonly deleteAccount: DeleteAccountService,
    private readonly transferToAnotherAccount: TransferToAnotherAccountService,
  ) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async listAll(@Request() req): Promise<AccountResponse[]> {
    return this.findAllAccounts.execute(req.user.id);
  }

  @Get('/paginated')
  @HttpCode(HttpStatus.OK)
  async listPaginated(
    @Request() req,
    @Query('size') size = 20,
    @Query('page') page = 0,
  ): Promise<IPaginated<AccountResponse>> {
    return this.findAllPaginated.execute({
      page,
      size,
      user_id: req.user.id,
    });
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async find(@Param('id', ParseUUIDPipe) id: string): Promise<AccountResponse> {
    return this.findAccount.execute(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Request() req,
    @Body() body: CreateAccountDto,
  ): Promise<AccountResponse> {
    return this.createAccount.execute({
      ...body,
      user_id: req.user.id,
    });
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: CreateAccountDto,
  ): Promise<AccountResponse> {
    return this.updateAccount.execute({
      ...body,
      id,
    });
  }

  @Patch('/:id/transfer/:destination_id')
  @HttpCode(HttpStatus.OK)
  async transfer(
    @Param('id', ParseUUIDPipe) id: string,
    @Param('destination_id', ParseUUIDPipe) destinationId: string,
    @Body() { value }: TransferAccountDto,
  ): Promise<AccountResponse> {
    return this.transferToAnotherAccount.execute({
      current_account_id: id,
      account_destination_id: destinationId,
      value,
    });
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delte(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.deleteAccount.execute(id);
  }
}
