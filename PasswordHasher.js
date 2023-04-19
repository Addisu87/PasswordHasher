class PasswordHasher {
  constructor(salt = "S3Cr3t", hashing_func = (text) => text) {
    this.salt = salt;
    this.hashing_func = hashing_func;
  }

  encrypt(cleartext) {
    const saltedText = `${cleartext}${this.salt}`;
    const hashedText = this.hashing_func(saltedText);
    return hashedText;
  }

  verify(cleartext, secret) {
    return this.encrypt(cleartext) === secret;
  }
}

class User {
  constructor(username, password, passwordHasher = new PasswordHasher("test")) {
    this.username = username;
    this.password = passwordHasher.encrypt(password);
    this.passwordHasher = passwordHasher;
  }

  authenticate(password) {
    const isPasswordValid = this.passwordHasher.verify(password, this.password);
    return isPasswordValid ? this : null;
  }
}

const newUser = new User("Addisu", "password87");

const authUser = User.authenticate("password87");
if (authUser != null) {
  console.log(`User ${authUser.username} is authenticated`);
} else {
  console.log("Invalid username or password");
}
