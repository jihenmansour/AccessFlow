import { mailtrapClient, sender } from "./mailtrap.config.js";
import { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } from "./emailTemplates.js";

export const sendVerificationEmail = async (email, verificationToken) => {
 const recipient = [{email}];

 try {
   const response = await mailtrapClient.send({
    from: sender,
    to: recipient,
    subject: "Verify your email",
    html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken),
    category: "Email Verification"
   }) 

   console.log(`Email sent successfully ${response}`)
 } catch (error) {
   console.error(`Error sending verification email: ${error}`);
   throw new Error (`Error sending verification email: ${error}`);
 }
}

export const sendWelcomeEmail = async (email, name) => {
 const recipient = [{email}];

  try {
    
    const response = await mailtrapClient.send({
      from: sender,
      to: recipient,
      template_uuid: "b2b5b790-afaf-446a-b348-348a86edca75",
      template_variables: {
        "company_info_name": "AccessFlow",
        "name": name
      }
    })

    console.log(`Welcome email sent successfully: ${response}`)
  } catch (error) {
    console.error(`Error sending verification email: ${error}`) 
   throw new Error (`Error sending verification email: ${error}`)
  }
}


export const sendResetPasswordEmail = async (email, resetURL) => {
  const recipient = [{email}];
 
  try {
    const response = await mailtrapClient.send({
     from: sender,
     to: recipient,
     subject: "Reset your password",
     html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
     category: "Password Reset"
    }) 
 
    console.log(`Email sent successfully ${response}`)
  } catch (error) {
    console.error(`Error sending password reset email: ${error}`);
    throw new Error (`Error sending password reset email: ${error}`);
  }
 }

 export const sendSuccessResetEmail = async(email) => {
  const recipient = [{email}];

  try {
    
    const response = await mailtrapClient.send({
     from: sender,
     to: recipient,
     subject: "Password reset successful",
     html:PASSWORD_RESET_SUCCESS_TEMPLATE,
     category: "Password Reset"
    })

    console.log(`Email sent successfully ${response}`)
  } catch (error) {
    console.error(`Error sending password reset email: ${error}`);
    throw new Error (`Error sending password reset email: ${error}`);
  }
 }