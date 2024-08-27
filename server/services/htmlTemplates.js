
export const HtmlTemplates = {
  AccountVerification: function (token) {
    return `
    <div style="background-color: #1a1a1a; color: #f5f5f5; font-family: Arial, sans-serif; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #252525; border-radius: 8px; padding: 30px; text-align: center;">
        <h1 style="color: #ffffff;">Verify Your Account</h1>
        <p style="font-size: 16px; line-height: 1.5; color: #d3d3d3;">
          Thank you for registering with us! Please verify your account by clicking the button below.
        </p>
        <a href="http://localhost:5173/verifyaccount?accountid=${token}" 
           style="display: inline-block; margin-top: 20px; padding: 15px 25px; font-size: 16px; color: #ffffff; background-color: #4caf50; border-radius: 5px; text-decoration: none;">
          Verify Account
        </a>
        <p style="margin-top: 30px; font-size: 14px; color: #a0a0a0;">
          If you did not create an account, no further action is required.
        </p>
        <p style="margin-top: 30px; font-size: 14px; color: #d3d3d3;">
          If this request was not made by you, please click the button below to report this incident.
        </p>
        <a href="http://localhost:5173/report?token=${token}" 
           style="display: inline-block; margin-top: 10px; padding: 10px 20px; font-size: 14px; color: #ffffff; background-color: #f44336; border-radius: 5px; text-decoration: none;">
          Report
        </a>
        <p style="margin-top: 30px; font-size: 12px; color: #606060;">
          &copy; ${new Date().getFullYear()} AMILE. All rights reserved.
        </p>
      </div>
    </div>`;
  },
  ResetPasswordLink: function (token) {
    return `
    <div style="background-color: #1a1a1a; color: #f5f5f5; font-family: Arial, sans-serif; padding: 20px;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #252525; border-radius: 8px; padding: 30px; text-align: center;">
        <h1 style="color: #ffffff;">Reset Your Account Password</h1>
        <p style="font-size: 16px; line-height: 1.5; color: #d3d3d3;">
          You have requested to reset your password. Please click the button below to proceed with resetting your password.
        </p>
        <a href="http://localhost:5173/resetpassword?token=${token}" 
           style="display: inline-block; margin-top: 20px; padding: 15px 25px; font-size: 16px; color: #ffffff; background-color: #4caf50; border-radius: 5px; text-decoration: none;">
          Reset Password
        </a>
        <p style="margin-top: 30px; font-size: 14px; color: #a0a0a0;">
          If you did not request a password reset, no further action is required.
        </p>
        <p style="margin-top: 30px; font-size: 14px; color: #d3d3d3;">
          If you believe this request was made in error, please click the button below to report it.
        </p>
        <a href="http://localhost:5173/report?token=${token}" 
           style="display: inline-block; margin-top: 10px; padding: 10px 20px; font-size: 14px; color: #ffffff; background-color: #f44336; border-radius: 5px; text-decoration: none;">
          Report Incident
        </a>
        <p style="margin-top: 30px; font-size: 12px; color: #606060;">
          &copy; ${new Date().getFullYear()} AMILE. All rights reserved.
        </p>
      </div>
    </div>`;
}

};
