import dotenv from 'dotenv';

dotenv.config();

const data = {
    mongo_uri: process.env.MONGO_URI,
};

export default data