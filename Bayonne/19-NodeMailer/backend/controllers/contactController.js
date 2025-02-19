const {sendEmail} = require("../services/sendgrid");
const { contactValidation } = require("../validators/contactValidator");
exports.sendMessage = async (req, res, next) => {
    try {
        const { error } = contactValidation(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });

        let message = req.body.contact.replaceAll("<", "&lt;").replaceAll(">", "&gt;");

        const userName = req.user.name;
        const userEmail = req.user.email;
        const mailHtml = `
            <h1>${userName}(${userEmail}) said</h1>
            <p>${message}</p>
        `;
        
        const result = await sendEmail(process.env.SENDGRID_CONTACT, "Somebody once", "told me the world is gonna roll me", mailHtml);

        if (result !== true) throw new Exeption(result.message, 500);
        res.status(200).json({ success: true });
    } catch (error) {
        next(error);
    }
}