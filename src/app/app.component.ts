import { Component, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './shared/ui/footer/footer.component';
import { HeaderComponent } from './shared/ui/header/header.component';
import { AmplifyAuthenticatorModule, AuthenticatorService } from '@aws-amplify/ui-angular';
import { Amplify } from 'aws-amplify';
import awsExports from '../aws-exports';
import { signUp, signIn, confirmSignIn } from 'aws-amplify/auth';
import { SignUpParameters } from './core/auth/signup.type';
import { RecaptchaV3Module, ReCaptchaV3Service } from 'ng-recaptcha';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FooterComponent, HeaderComponent, AmplifyAuthenticatorModule, RecaptchaV3Module],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(
    public authenticator: AuthenticatorService,
    protected recaptchaV3Service: ReCaptchaV3Service,
    private router: Router,
  ) {
    Amplify.configure(awsExports);
  }

  title = 'demo-amplify-blog-app';
  flag = false;

  services = {
    handleSignUp: async (formData: Record<string, any>) => {
      let { username, password, email, name, bio } = formData as SignUpParameters;
      return await signUp({
        username,
        password,
        options: {
          userAttributes: {
            email,
            name,
            updated_at: new Date().toISOString(),
            'custom:bio': bio
          },
          // optional
          autoSignIn: true // or SignInOptions e.g { authFlowType: "USER_SRP_AUTH" }
        }
      });
    },

    handleSignIn: async (formData: Record<string, any>) => {
      try {
        const { username, password } = formData;
        let signInOutput = await signIn({
          username,
          password,
          options: {
            authFlowType: 'CUSTOM_WITH_SRP'
          }
        });

        if (signInOutput.nextStep.signInStep === 'CONFIRM_SIGN_IN_WITH_CUSTOM_CHALLENGE') {
          const challengeResponse = await firstValueFrom(this.recaptchaV3Service.execute('login'));
          signInOutput = await this.handleRecaptchaConfirmSignIn(challengeResponse);
        }

        console.log('Sign In Success', signInOutput);
        return signInOutput;

      } catch (e) {
        console.log('Sign In Failed', e);
        this.flag = true;
        throw e;
      }
    }
  };

  protected async handleRecaptchaConfirmSignIn(event: any) {
    try {
      const confirmSignInOutput = await confirmSignIn({ challengeResponse: event });
      console.log('Confirm Sign In Success', confirmSignInOutput);
      return confirmSignInOutput;
    } catch (e) {
      console.log('Confirm Sign In Failed', e);
      this.flag = true;
      throw e;
    }
  }

  formFields = {
    signUp: {
      username: {
        order: 1,
        label: 'Username',
        placeholder: 'Enter your login username',
        isRequired: true,
      },
      email: {
        order: 2,
        label: 'Email',
        placeholder: 'Enter your email',
        isRequired: true,
      },
      name: {
        order: 3,
        label: 'Name',
        placeholder: 'Enter your name',
        isRequired: true,
      },
      bio: {
        order: 4,
        label: 'Bio',
        placeholder: 'Enter your bio',
      },
      password: {
        order: 5,
        label: 'Password',
        placeholder: 'Enter your password',
        isRequired: true,
      },
      confirmPassword: {
        order: 6,
        label: 'Confirm Password',
        placeholder: 'Confirm your password',
        isRequired: true,
      }
    }
  };
}
