import { MongoClient } from 'mongodb'
const connectMongoDB = () => MongoClient.connect(process.env.MONGODB)

exports.interestedUserEmails = async (request, response) => {
    if (request.method !== "POST") {
        return response.status(400).send(`Error`);
    }
    const req_auth = request.headers['auth'];
    if(process.env.AUTH_KEY !== req_auth){
        return response.status(400).send(`Error`);
    }

    var emailPatt = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)

    const emailValid = emailPatt.test(request.body.email)
    if(emailValid === true){
        return response.status(200).json({ status: "success" });
    }else{
        return response.status(400).send(`Error`);
    }
    
};

