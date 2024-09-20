import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { User } from "src/user/entities/user.entity";
import { UserService } from "src/user/user.service";

import * as bcrypt from "bcrypt"

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){

    constructor(private readonly userservice:UserService){
        super({
            usernameField:'email',
        })
    }

    async validate(email:string,password:string){

    let user:User = await this.userservice.findbyemail(email);

     if(!user)throw new UnauthorizedException('User not found')

        const newpassword = await bcrypt.compare(password,user.password)

        if(newpassword)return user;

        if(!newpassword)throw new UnauthorizedException('Password is incorrect')
   
    }

}