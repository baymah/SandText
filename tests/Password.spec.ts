import { UserPassword } from "../src/modules/iam/domain/valueObjects/userPassword";
import { Result } from "../src/shared/core/Result";

// let password: UserPassword|null;
let passwordOrError: Result<UserPassword>|null;

describe ('#Password', () => {

  beforeEach(() => {
    // password = null;
    passwordOrError = null;
  })

  test('Can create an user password', () => {
    passwordOrError = UserPassword.create({value:'awewewA123@'});
    expect(passwordOrError.getValue().value).toBe('awewewA123@');
  });

  test('Should fail to create an invalid user Password', () => {
    passwordOrError = UserPassword.create({value:'awewew90988'});
    expect(passwordOrError?.isSuccess).toBeFalsy();
  });
  //test fort thr password to be more than 8 digit...
})

