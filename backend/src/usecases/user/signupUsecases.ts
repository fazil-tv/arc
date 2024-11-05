
import { IUserRepository } from '../../repositories';
import { User } from '../../entities';
import { hashPassword } from '../../utils';
import { userSignupResponse } from '../../repositories';
import { Types } from 'mongoose';


export class SignupUseCase {
  

  constructor(
    private userRepository: IUserRepository,

  ) {}

  async execute(
    username: string,
    email: string,
    password: string
  ): Promise<userSignupResponse> {



    if (!username || !email || !password) {
      throw new Error("Invalid input");
    }

    const existingEmail = await this.userRepository.findByEmail(email);


    if (existingEmail) {
      throw new Error("User Email already registered");
    }

    const hashedPassword = await hashPassword(password);

    console.log(hashedPassword, "hashedPassword");

    const user = new User({
      _id:new Types.ObjectId(),
      username,
      email,
      phone: null,
      profileImg: null,
      password: hashedPassword,
      isBlocked: false,
      otp: undefined
    });


    const savedUser = await this.userRepository.save(user);
    console.log(savedUser,"savedUser")
  
    return {
      savedUser,
    };

  }

}
