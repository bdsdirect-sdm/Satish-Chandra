const mailTemplates = (firstName: string, lastName: string, password: string) => {
    const fullName: string = firstName + " " + lastName;

    let mailBody = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f6f6f6;
            color: #333;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: auto;
            background-color: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #007bff;
            color: white;
            padding: 30px;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            line-height: 1.6;
        }
        .content h2 {
            color: #007bff;
            font-size: 20px;
        }
        .content p {
            margin-bottom: 15px;
        }
        .footer {
            background-color: #f1f1f1;
            text-align: center;
            padding: 15px;
            font-size: 12px;
            color: #777777;
        }
        a {
            color: #007bff;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Greetings from smartData</h1>
        </div>
        <div class="content">
            <h2>Hello {{name}},</h2>
            <p>We hope this message finds you well. We're excited to share some updates with you!</p>
            <p>Congratulations , you are registered and thank you for a being part of us.\n\n Your password is${password} </p>
            <p>Thank you for being a valued member of our community.</p>
            <p>Best regards,<br> <br></p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Agency &trade; All rights reserved.</p>  
        </div>
    </div>
</body>
</html>
`;

    // Call the function to replace {{name}} with fullName
    const personalizedMailBody = replaceNameInTemplate(mailBody, fullName);
    return personalizedMailBody;
}

// Function to replace {{name}} with the full name
const replaceNameInTemplate = (template: string, fullName: string): string => {
    return template.replace(/{{name}}/g, fullName);
}

export default mailTemplates;
