function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function getOtpHtml(otp) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        /* Reset styles for email clients */
        body, table, td, p, a, li, blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }
        body {
            height: 100% !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 100% !important;
            background-color: #f4f6f8;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: #333333;
        }
        
        /* Container layout */
        .wrapper {
            width: 100%;
            table-layout: fixed;
            background-color: #f4f6f8;
            padding: 40px 20px;
        }
        .container {
            max-width: 480px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 12px;
            padding: 40px 32px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            text-align: center;
        }

        /* Typography */
        h2 {
            font-size: 24px;
            font-weight: 700;
            color: #1a1a1a;
            margin-top: 0;
            margin-bottom: 16px;
        }
        p {
            font-size: 16px;
            line-height: 24px;
            color: #666666;
            margin: 0 0 24px 0;
        }
        p.subtext {
            font-size: 14px;
            color: #888888;
            margin-bottom: 0;
        }

        /* OTP Visual Component */
        .otp-container {
            background-color: #f8fafc;
            border: 1px dashed #cbd5e1;
            border-radius: 8px;
            padding: 16px;
            margin: 24px 0;
        }
        .otp {
            font-size: 32px;
            font-weight: 700;
            letter-spacing: 6px;
            color: #2563eb; /* Modern corporate blue */
            margin: 0;
            padding-left: 6px; /* Offsets the final letter-spacing for true centering */
        }
    </style>
</head>
<body>
    <div class="wrapper">
        <div class="container">
            <h2>Verify Your Account</h2>
            <p>You're almost there! Use the verification code below to complete your sign-in.</p>
            
            <div class="otp-container">
                <p class="otp">${otp}</p>
            </div>
            
            <p class="subtext">This code is valid for the next 10 minutes. If you didn't request this, you can safely ignore this email.</p>
        </div>
    </div>
</body>
</html>
  `;
}

export {
    generateOtp,
    getOtpHtml
}
