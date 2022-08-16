import { UserEmail } from "../src/modules/iam/domain/valueObjects/userEmail";
import { Result } from "../src/shared/core/Result";

let emailAddress: UserEmail|null;
let emailAddressOrError: Result<UserEmail>|null;

describe ('#EmailAddress', () => {

  beforeEach(() => {
    emailAddress = null;
    emailAddressOrError = null;
  })

  test('Can create an email address', () => {
    emailAddressOrError = UserEmail.create('segunoladipupo@gmail.com');
    expect(emailAddressOrError.isSuccess).toBeTruthy();
    emailAddress = emailAddressOrError.getValue();
    expect(emailAddress.value).toBe('segunoladipupo@gmail.com');
  });

  test('Should fail to create an invalid email address', () => {
    emailAddressOrError = UserEmail.create('segunoladipupo');
    expect(emailAddressOrError.isSuccess).toBeFalsy();
  });

})

