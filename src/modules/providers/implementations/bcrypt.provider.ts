import { Injectable } from '@nestjs/common';
import { IHashProvider } from '@providers/models/hash-provider';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashProvider implements IHashProvider {
  async hash(payload: string): Promise<string> {
    return bcrypt.hash(payload, 8);
  }

  async compare(payload: string, hash: string): Promise<boolean> {
    return bcrypt.compare(payload, hash);
  }
}
