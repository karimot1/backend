const nodemailer = require("nodemailer")

const sendMail = async(FullName,Email)=>{
    const contactTemplate = `<div>
      <div>
      <h2 style="color: #00a859;">Welcome to Stackplus Technology</h2>
    </div>
    <ul>
      <li>Name: ${FullName}</li>
      <li>Email: ${Email}</li>
    </ul>
    <div>
      <p>
        Dear ${FullName},
      </p>
      <p>
        Welcome to our community! We are thrilled to have you on board.
      </p>
      <p>
        With your new account, you can explore all the features our website has to offer.
      </p>
      <p>
        If you have any questions or need assistance, feel free to contact us.
      </p>
    </div>
    <p style="color: #00a859;"><i>Stackplus Technology</i></p>
  </div>
`;

const transporter = nodemailer.createTransport({
    service:"Gmail",
    auth:{
        user: "akanmuadebola84@gmail.com",
        password:"Asha22bi22"
    }
});

const mailOptions ={
    from:"akanmuadebola84@gmail.com",
    to:Email,
    subject:"welcom to hellod wworld community",
    html:contactTemplate,
    text:"welcom to hellod wworld community"
};

try {
    transporter.sendMail(mailOptions)
    console.log("Email send Successful");
    // res.statue(200).send({message:"Email send Successful"})
} catch (error) {
    console.log("internal server error",error)
    // res.statue(500).send({message:"internal server error"})
}
}

module.exports = sendMail