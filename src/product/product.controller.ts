import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UnauthorizedException } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';


@ApiBearerAuth('jwt auth')
@ApiTags('Product - Controller')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto,@Req() req ){
    if(req.user.role == 'admin'){
      return this.productService.create(createProductDto);
    } else{
      throw new UnauthorizedException('Only admin can access this portal')
    }
    
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto,@Req() req) {
    if(req.user.role == 'admin'){
        return this.productService.update(id, updateProductDto);
    } else{
      throw new UnauthorizedException('Only admin can access this portal')
    }
  
  }

  @Delete(':id')
  remove(@Param('id') id: string,@Req() req) {

    if(req.user.role == 'admin'){
      return this.productService.remove(+id);
  } else{
    throw new UnauthorizedException('Only admin can access this portal')
  }
    
  }
}
