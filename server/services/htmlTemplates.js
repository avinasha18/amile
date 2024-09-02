
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
},
CompanyAccountVerification: function (token) {
  return `
  <div style="background-color: #1a1a1a; color: #f5f5f5; font-family: Arial, sans-serif; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #252525; border-radius: 8px; padding: 30px; text-align: center;">
      <h1 style="color: #ffffff;">Verify Your Account</h1>
      <p style="font-size: 16px; line-height: 1.5; color: #d3d3d3;">
        Thank you for registering with us! Please verify your account by clicking the button below.
      </p>
      <a href="http://localhost:5173/verifycompanyaccount?token=${token}" 
         style="display: inline-block; margin-top: 20px; padding: 15px 25px; font-size: 16px; color: #ffffff; background-color: #4caf50; border-radius: 5px; text-decoration: none;">
        Verify Account
      </a>
      <p style="margin-top: 30px; font-size: 14px; color: #a0a0a0;">
        If you did not create an account, no further action is required.
      </p>
      <p style="margin-top: 30px; font-size: 14px; color: #d3d3d3;">
        If this request was not made by you, please click the button below to report this incident.
      </p>
      <a href="http://localhost:5173/companyreport?token=${token}" 
         style="display: inline-block; margin-top: 10px; padding: 10px 20px; font-size: 14px; color: #ffffff; background-color: #f44336; border-radius: 5px; text-decoration: none;">
        Report
      </a>
      <p style="margin-top: 30px; font-size: 12px; color: #606060;">
        &copy; ${new Date().getFullYear()} AMILE. All rights reserved.
      </p>
    </div>
  </div>`;
},
CompanyResetPasswordLink: function (token) {
  return `
  <div style="background-color: #1a1a1a; color: #f5f5f5; font-family: Arial, sans-serif; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #252525; border-radius: 8px; padding: 30px; text-align: center;">
      <h1 style="color: #ffffff;">Reset Your Account Password</h1>
      <p style="font-size: 16px; line-height: 1.5; color: #d3d3d3;">
        You have requested to reset your password. Please click the button below to proceed with resetting your password.
      </p>
      <a href="http://localhost:5173/companyresetpassword?token=${token}" 
         style="display: inline-block; margin-top: 20px; padding: 15px 25px; font-size: 16px; color: #ffffff; background-color: #4caf50; border-radius: 5px; text-decoration: none;">
        Reset Password
      </a>
      <p style="margin-top: 30px; font-size: 14px; color: #a0a0a0;">
        If you did not request a password reset, no further action is required.
      </p>
      <p style="margin-top: 30px; font-size: 14px; color: #d3d3d3;">
        If you believe this request was made in error, please click the button below to report it.
      </p>
      <a href="http://localhost:5173/companyreport?token=${token}" 
         style="display: inline-block; margin-top: 10px; padding: 10px 20px; font-size: 14px; color: #ffffff; background-color: #f44336; border-radius: 5px; text-decoration: none;">
        Report Incident
      </a>
      <p style="margin-top: 30px; font-size: 12px; color: #606060;">
        &copy; ${new Date().getFullYear()} AMILE. All rights reserved.
      </p>
    </div>
  </div>`;
},
appliedInternship: function (ApplicantName='Applicant', InternshipTitle, CompanyName) {
  return (
      `<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <div style="background-color: #fff; padding: 20px; border-radius: 5px; max-width: 600px; margin: auto;">
              <h2 style="color: #007bff; text-align: center;">Thank You for Applying!</h2>
              <p>Dear ${ApplicantName},</p>
              <p>We are pleased to inform you that we have received your application for the <strong>${InternshipTitle}</strong> position at ${CompanyName}.</p>
              <p>Our recruitment team is currently reviewing all applications, and we will contact you shortly with the next steps.</p>
              <p>Thank you for your interest in joining our team. We appreciate the time and effort you put into your application.</p>
              <p>Best regards,</p>
              <p><strong>${CompanyName} Team</strong></p>
          </div>
      </div>`
  );
},
rejectedInternship: function (ApplicantName, InternshipTitle, CompanyName) {
  return (
      `<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <div style="background-color: #fff; padding: 20px; border-radius: 5px; max-width: 600px; margin: auto;">
              <h2 style="color: #d9534f; text-align: center;">Thank You for Applying</h2>
              <p>Dear ${ApplicantName},</p>
              <p>We appreciate your interest in the <strong>${InternshipTitle}</strong> position at ${CompanyName}.</p>
              <p>After careful consideration, we regret to inform you that we will not be moving forward with your application at this time.</p>
              <p>We encourage you to apply for future opportunities that match your skills and interests. Thank you for your time and effort.</p>
              <p>Best regards,</p>
              <p><strong>${CompanyName} Team</strong></p>
          </div>
      </div>`
  );
},
acceptedInternship: function (ApplicantName, InternshipTitle, CompanyName) {
  return (
      `<div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
          <div style="background-color: #fff; padding: 20px; border-radius: 5px; max-width: 600px; margin: auto;">
              <h2 style="color: #5cb85c; text-align: center;">Congratulations!</h2>
              <p>Dear ${ApplicantName},</p>
              <p>We are excited to inform you that you have been accepted for the <strong>${InternshipTitle}</strong> position at ${CompanyName}.</p>
              <p>We were impressed with your qualifications and are eager to have you join our team.</p>
              <p>Our HR department will be in touch with you shortly to discuss the next steps and provide you with more information about your start date and onboarding process.</p>
              <p>Welcome to the ${CompanyName} family!</p>
              <p>Best regards,</p>
              <p><strong>${CompanyName} Team</strong></p>
          </div>
      </div>`
  );
}



};
