// Deployment notes: 
// STRIPE_PROD_KEY is the overall api key
// STRIPE_PROD_EP_KEY is the webhook api key, get this from the dashboard

exports.tabulaInstallments = async (request, response) => {
    const req_auth = request.headers['auth'];

    if(process.env.AUTH_KEY !== req_auth){
        return response.status(400).send(`Error`);
    }

    return response.status(200).json({ status: "success" });
};
