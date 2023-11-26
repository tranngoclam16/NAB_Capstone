import mongoose from 'mongoose'
import crypto from 'crypto'
    
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    // match : [/[a-zA-Z]/, 'Name must not contain special characters.'],
    required: 'Name is required'
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    match: [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please fill a valid email address'],
    required: 'Email is required'
  },
  hashed_password: {
    type: String,
    required: "Password is required"
  },
  salt: String,
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  educator: {
    type: Boolean,
    default: false
  },
})

UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password
    this.salt = this.makeSalt()
    this.hashed_password = this.encryptPassword(password)
  })
  .get(function() {
    return this._password
  })

UserSchema.path('hashed_password').validate(function(v) {
  // if (this.name && this.name.length < 8) {
  //   this.invalidate('name', 'Name must be at least 8 characters.')
  // }
  if (this._password && this._password.length == 0) {
    this.invalidate('password', 'Password must be at least 8 characters.')
  }
  if (this._password && !this._password.match(/[a-z]/g)) {
    this.invalidate('password', 'Password must have at least one lowercase letter.')
  }
  if (this._password && !this._password.match(/[A-Z]/g)) {
    this.invalidate('password', 'Password must have at least one uppercase letter.')
  }
  if (this._password && !this._password.match(/[0-9]/g)) {
    this.invalidate('password', 'Password must have at least one number letter.')
  }
  if (this.isNew && !this._password) {
    this.invalidate('password', 'Password is required')
  }
}, null)

// UserSchema.path('email').validate(function(v) {
//   if (validator.check(v).isEmail()) {
//     this.invalidate('email', 'Please fill a valid email address.');
//   }
// }, null);

UserSchema.path('name').validate(function(v) {
  // if (this.name && this.name.length < 8) {
  //   this.invalidate('name', 'Name must be at least 8 characters.')
  // }
  if (this.name && !this.name.match(/[a-zA-Z]/g)) {
    this.invalidate('name', 'Name must not contain special characters.')
  }
  if (this.name && this.name.match(/[0-9]/g)) {
    this.invalidate('name', 'Name must not contain number.')
  }
}, null)

UserSchema.methods = {
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password
  },
  encryptPassword: function(password) {
    if (!password) return ''
    try {
      return crypto
        .createHmac('sha1', this.salt)
        .update(password)
        .digest('hex')
    } catch (err) {
      return ''
    }
  },
  makeSalt: function() {
    return Math.round((new Date().valueOf() * Math.random())) + ''
  }
}

export default mongoose.model('User', UserSchema)
