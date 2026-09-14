import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponse } from './dto/auth-response.type';
import { SignupInput } from './dto/signup.input';
import { LoginInput } from './dto/login.input';
import { UserType } from '../users/dto/user.type';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  signup(@Args('signupInput') signupInput: SignupInput) {
    return this.authService.signup(signupInput);
  }

  @Mutation(() => AuthResponse)
  login(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }

  // This query is protected! You MUST pass the JWT in the headers.
  @Query(() => UserType)
  @UseGuards(GqlAuthGuard)
  me(@CurrentUser() user: any) {
    return user; 
  }
}
