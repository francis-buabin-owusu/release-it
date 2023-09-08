export interface EmailData {
  employee: string;
  projectName: string;
}
export const removeStaffEmail = (emailData: EmailData): string => {
  const { employee, projectName } = emailData;
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
                      We wanted to inform you that there have been changes on project, ${projectName}. 
                      </p>
                      <p style="font-family: 'work-sans', sans-serif;font-style: normal;font-weight: 400;font-size: 16px;padding: 5px 0 15px;color: #474d66; margin: auto;text-align: start;">
                      After careful consideration, we have decided to make adjustments to the project team, and as a result, your participation in the project is no longer required. We understand that this news may come as a surprise, and we apologize for any inconvenience caused.
                      </p>
                      <p style="font-family: 'work-sans', sans-serif;font-style: normal;font-weight: 400;font-size: 16px;padding: 5px 0 15px;color: #474d66; margin: auto;text-align: start;">
                      However, your contributions and skills remain highly valued, and we look forward to your continued involvement in other projects within the organization.
                      </p>
                      <p style="font-family: 'work-sans', sans-serif;font-style: normal;font-weight: 400;font-size: 16px;padding: 5px 0 15px;color: #474d66;margin: auto;text-align: start;">
                          Best regards, <br>
                          Judith,<br>
                          HR Manager
                      </p>  
                  </div>
                       
                </div>
              </div>
            </div>
          </body>
      </html>
    `;
};
