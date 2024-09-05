import { Types } from 'mongoose';
import { IUserRepository, SignupResponse } from '../../repositories';
import { Contractor } from '../../entities/contractorEntity';
import { hashPassword } from '../../utils';
import { generateToken, generateRefreshToken } from '../../services';





export class ContractorSignupUseCase {

  constructor(
    private userRepository: IUserRepository,

  ) { }

  async execute(
    username: string,
    email: string,
    password: string
  ): Promise<SignupResponse> {



    if (!username || !email || !password) {
      throw new Error("Invalid input");
    }

    const existingEmail = await this.userRepository.findByEmail(email);


    if (existingEmail) {

      throw new Error("User Email already registered");

    }

    const hashedPassword = await hashPassword(password);

    console.log(hashedPassword, "hashedPassword");

    const contractor = new Contractor({
      _id: new Types.ObjectId(),
      username,
      email,
      phone: null,
      profileImg: null,
      password: hashedPassword,
      isBlocked: false,
    });


    const savedUser = await this.userRepository.save(contractor);
    console.log(savedUser, "savedUser")
    const token = generateToken((savedUser._id as string).toString())
    console.log(token, "token")
    const refreshtoken = generateRefreshToken((savedUser._id as string).toString())
    console.log(refreshtoken, "refreshtoken")

    return {
      savedUser,
      refreshtoken,
      token
    };

  }

}
