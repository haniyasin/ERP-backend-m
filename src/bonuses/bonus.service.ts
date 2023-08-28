import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bonus } from './bonus.entity';
import { CreateBonusDTO } from './dto/create.bonus.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class BonusService {
  constructor(
    @InjectRepository(Bonus)
    private bonusRepository: Repository<Bonus>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAllBonuses(userId: number): Promise<Bonus[]> {
    try {
      const bonuses = await this.bonusRepository.find({ relations: ['user'] });
      return bonuses.filter((bonus) => bonus.user.id == userId);
    } catch (error) {
      throw new Error(`Error when fetching bonuses: ${error}`);
    }
  }

  async createNewBonus(
    document: Express.Multer.File,
    createBonusDto: CreateBonusDTO,
  ): Promise<Bonus> {
    if (!document)
      throw new HttpException('Document is Required!', HttpStatus.BAD_REQUEST);

    const id = createBonusDto.user.id;
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) throw new Error(`User with id ${id} not found`);

    return await this.bonusRepository.save({
      ...createBonusDto,
      user: user,
      document: document?.buffer,
    });
  }
}
