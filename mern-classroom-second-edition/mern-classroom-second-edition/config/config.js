console.log(process.env.MONGODB_URI)
const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: "XYZGHSJ123",

  mongoUri: "mongodb+srv://sa:abcd1234@cluster0.qo3x6fe.mongodb.net/expense-tracker" ||
  // mongoUri: "mongodb+srv://amazona:BVD2510@cluster0.8uvdexv.mongodb.net/amazona?retryWrites=true&w=majority" ||
  process.env.MONGODB_URI ||
    process.env.MONGO_HOST ||
    'mongodb://' + (process.env.IP || 'localhost') + ':' +
    (process.env.MONGO_PORT || '27017') +
    '/mernproject'
}

export default config
