import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import RegisterUserService from './services/register-user.service';
import { UserByEmail } from './types/user.response';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly registerUserService: RegisterUserService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { email } = createUserDto;

    const emailAlreadyExists = await this.findByEmail(email);

    if (emailAlreadyExists) {
      throw new HttpException(
        'Email already registered',
        HttpStatus.BAD_REQUEST,
      );
    }

    return await this.registerUserService.createUserAccount({ createUserDto });
  }

  private async findByEmail(email: string): Promise<boolean> {
    try {
      await this.findOneByEmail(email);
      return true;
    } catch (error) {
      if (
        error instanceof HttpException &&
        error.getStatus() === HttpStatus.NOT_FOUND
      ) {
        return false;
      }
      throw error;
    }
  }

  async findOneByEmail(email: string): Promise<UserByEmail> {
    const userData = await this.userModel.findOne({ email });
    if (userData === null) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return {
      first_name: userData.first_name,
      roles: userData.roles,
      status: userData.status,
    };
  }
}
