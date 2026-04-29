import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI environment variable is not set');
}

// Cache the connection across hot reloads in dev
declare global {
  // eslint-disable-next-line no-var
  var _mongooseConn: Promise<typeof mongoose> | undefined;
}

async function connectDB(): Promise<typeof mongoose> {
  if (global._mongooseConn) {
    console.log('Using cached MongoDB connection');
    return global._mongooseConn;
  }
  
  console.log('Connecting to MongoDB...');
  global._mongooseConn = mongoose.connect(MONGODB_URI, {
    bufferCommands: false,
  }).then((m) => {
    console.log('MongoDB Connected successfully');
    return m;
  }).catch((err) => {
    console.error('MongoDB connection error:', err);
    global._mongooseConn = undefined;
    throw err;
  });

  return global._mongooseConn;
}

export default connectDB;
