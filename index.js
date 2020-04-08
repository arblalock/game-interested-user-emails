const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB, {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

const emailSchema = new mongoose.Schema({
    email: String
  }, { collection: 'InterestedUserEmails' });

var emailUser = mongoose.model('email', emailSchema);

exports.interestedUserEmails = async (request, response) => {
    if (request.method !== "POST") {
        return response.status(400).send(`Error`);
    }
    const req_auth = request.headers['auth'];
    if(process.env.AUTH_KEY !== req_auth){
        return response.status(400).send(`Error`);
    }

    var emailPatt = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
    const emailStr = request.body.email;
    const emailValid = emailPatt.test(emailStr)
    if(emailValid === true){
        try{
            const result = await emailUser.findOne({ email: emailStr }).exec();
            if(result){
                return response.status(200).json({ status: "success" });
            }
        }
        catch(err){
            return response.status(400).send(`Error`);
        }
        const newEmail = new emailUser({ email: emailStr })
        try{
            await newEmail.save();
            return response.status(200).json({ status: "success" });
        }catch(err) {
            return response.status(400).send(`Error`);
        }
        
    }else{
        return response.status(400).send(`Error`);
    }
    
};

