export interface EmailData {
  employee: string;
  projectName: string;
  role: string;
  startDate: string;
  endDate: string;
  user_id: string;
  technical_manager_name: string;
  business_manager_name: string;
}
export const confirmStaffEmail = (emailData: EmailData): string => {
  const {
    employee,
    projectName,
    role,
    startDate,
    endDate,
    user_id,
    technical_manager_name,
    business_manager_name,
  } = emailData;
  return `
      <!DOCTYPE html>
      <html lang="en">
          <head>
              <meta charset="utf-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="description" content="">
              <meta name="viewport" content="width=device-width, initial-scale=1">
              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link href="https://fonts.googleapis.com/css2?family=Work+Sans&display=swap" rel="stylesheet">
          </head>
      
          <body style="margin: auto; font-family: sans-serif;">
            <div class="main" style="background-color: #FDF5F2; max-width: 650px; min-height: 535px; border-radius: 8px; padding-bottom: 20px; margin: auto;">
    
              <div style="background-color: #DD5928; height: 200px; padding-top: 40px; border-radius: 8px 8px 0 0;
                background-image: url('https://arms-enterprise-assets.s3.eu-west-1.amazonaws.com/assets/template-header.png');
                background-size: 100% 100%;"
                >
    
                <div style="background-color: #ffffff;border-radius: 8px;  margin: auto; text-align: center;  margin: 0px 25px;">
                  <div class="header2" style="max-width: 600px;padding: 30px 0;border-bottom: 1px solid rgb(192, 189, 195);">
                    <img src="https://arms-enterprise-assets.s3.eu-west-1.amazonaws.com/assets/amalitech-logo.png" alt="Amalitech-logo" style="width: 50%";> 
                  </div>
                  <div style=" padding: 0px 10px;" >
                      <p style="font-family: 'work-sans', sans-serif;font-style: normal;font-weight: 400;font-size: 16px;padding: 5px 0 15px;color: #474d66;;margin: auto;text-align: start;">
                      Dear ${employee}!
                      </p>   
                      <p style="font-family: 'work-sans', sans-serif;font-style: normal;font-weight: 400;font-size: 16px;padding: 5px 0 15px;color: #474d66; margin: auto;text-align: start;">
                      We are pleased to confirm your participation in the upcoming project, ${projectName}. You have been assigned the role of ${role}, and your start date is ${startDate} with an expected end date of ${endDate}.
                      </p>
                      <p style="font-family: 'work-sans', sans-serif;font-style: normal;font-weight: 400;font-size: 16px;padding: 5px 0 15px;color: #474d66; margin: auto;text-align: start;">
                      Please take some time to review the project details and ensure you are prepared to contribute effectively to the project team.
                      </p>
                      <p style="font-family: 'work-sans', sans-serif;font-style: normal;font-weight: 400;font-size: 16px;padding: 5px 0 15px;color: #474d66; margin: auto;text-align: start;">
                      You can view the project details and your role/responsibilities by clicking on the link below.
                      </p>
                      <p style="padding-bottom:24px">
                        <a target="_blank" href="https://armsent-test.amalitech-dev.net/view-employee/${user_id}/personal/projects" cursor:="" pointer="">
                          <button type="button" style="font-family: 'work-sans',sans-serif;font-weight: 400;font-size: 16px;
                            padding: 8px 24px; background-color: #DD5928; color: white; border-radius: 8px; border-style: none;">
                                View project details
                          </button> 
                        </a>
                      </p>
                      <p style="font-family: 'work-sans', sans-serif;font-style: normal;font-weight: 400;font-size: 16px;padding: 5px 0 15px;color: #474d66; margin: auto;text-align: start;">
                      If you have any questions or concerns, please do not hesitate to reach out to ${business_manager_name} and ${technical_manager_name}. We look forward to working with you on this exciting project.
                      </p>
                      <p style="font-family: 'work-sans', sans-serif;font-style: normal;font-weight: 400;font-size: 16px;padding: 5px 0 15px;color: #474d66;margin: auto;text-align: start;">
                          Best regards, <br>
                          Staffing Committee <br>
                      </p>  
                  </div>
                       
                </div>
              </div>
            </div>
          </body>
      </html>
    `;
};
