const bcrypt = require('bcryptjs');

class User {
  constructor() {
    this.users = [];
    this.currentId = 1;
  }

  // Find user by email
  findByEmail(email) {
    return this.users.find(user => user.email === email);
  }

  // Find user by ID
  findById(id) {
    return this.users.find(user => user.id === parseInt(id));
  }

  // Create new user
  async create(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    
    const newUser = {
      id: this.currentId++,
      name: userData.name,
      email: userData.email,
      password: hashedPassword,
      createdAt: new Date()
    };
    
    this.users.push(newUser);
    
    // Remove password from returned object
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  // Validate password
  async validatePassword(email, password) {
    const user = this.findByEmail(email);
    if (!user) return null;
    
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return null;
    
    const { password: pwd, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

module.exports = new User();