import { Bind, Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { RolesName } from "src/roles/role.enum";
import { BonusService } from "./bonus.service";
import { Bonus } from "./bonus.entity";
import { Roles } from "src/roles/roles.decorator";
import { RolesGuard } from "src/roles/roles.guard";
import { CreateBonusDTO } from "./dtos/create.bonus.dto";
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('bonuses')
export class BonusController {
    constructor(
        private bonusService: BonusService,
    ) {}

    @Get(':id')
    @Roles(RolesName.ADMIN, RolesName.HR)
    @UseGuards(RolesGuard)
    async getAll(@Param() user: {id: number}): Promise<Bonus[] | null> {
        return await this.bonusService.getAllBonuses(user.id);
    }

    @Post()
    @Roles(RolesName.ADMIN, RolesName.HR)
    @UseGuards(RolesGuard)
    @UseInterceptors(FileInterceptor('document'))
    @Bind(UploadedFile())
    async createBonus(@UploadedFile() document: Express.Multer.File, @Body() createBonusDto: CreateBonusDTO): Promise<Bonus> {
        return await this.bonusService.createNewBonus(document, createBonusDto);
    }
} 