const getVerifyMailTemplate = (verifyLink) => (
`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Verify Your Email</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=Inter:wght@400;500&display=swap');

    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      background-color: #0f0f13;
      font-family: 'Inter', sans-serif;
      -webkit-font-smoothing: antialiased;
    }

    .wrapper {
      max-width: 560px;
      margin: 40px auto;
      background: #16161d;
      border-radius: 20px;
      overflow: hidden;
      border: 1px solid #2a2a38;
      box-shadow: 0 24px 80px rgba(0,0,0,0.5);
    }

    /* ── Header banner ── */
    .header {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
      padding: 44px 40px 36px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .header::before {
      content: '';
      position: absolute;
      top: -60px; left: -60px;
      width: 220px; height: 220px;
      background: radial-gradient(circle, rgba(99,102,241,0.25) 0%, transparent 70%);
      border-radius: 50%;
    }
    .header::after {
      content: '';
      position: absolute;
      bottom: -40px; right: -40px;
      width: 180px; height: 180px;
      background: radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 70%);
      border-radius: 50%;
    }

    .logo-mark {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 56px; height: 56px;
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      border-radius: 16px;
      margin-bottom: 20px;
      box-shadow: 0 8px 24px rgba(99,102,241,0.4);
      position: relative; z-index: 1;
    }
    .logo-mark svg { width: 28px; height: 28px; }

    .header h1 {
      font-family: 'Sora', sans-serif;
      font-size: 26px;
      font-weight: 700;
      color: #f0f0ff;
      letter-spacing: -0.5px;
      position: relative; z-index: 1;
    }
    .header p {
      font-size: 14px;
      color: #8b8ba7;
      margin-top: 6px;
      position: relative; z-index: 1;
    }

    /* ── Body ── */
    .body {
      padding: 40px 40px 32px;
    }

    .greeting {
      font-family: 'Sora', sans-serif;
      font-size: 20px;
      font-weight: 600;
      color: #e8e8f0;
      margin-bottom: 14px;
    }

    .body p {
      font-size: 15px;
      line-height: 1.7;
      color: #9090a8;
      margin-bottom: 14px;
    }

    /* ── CTA button ── */
    .cta-wrapper {
      text-align: center;
      margin: 32px 0;
    }

    .cta-btn {
      display: inline-block;
      padding: 15px 44px;
      background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
      color: #ffffff !important;
      text-decoration: none;
      font-family: 'Sora', sans-serif;
      font-size: 15px;
      font-weight: 600;
      letter-spacing: 0.3px;
      border-radius: 12px;
      box-shadow: 0 8px 28px rgba(99,102,241,0.45);
      transition: all 0.2s;
    }

    /* ── Notice box ── */
    .notice {
      background: #1e1e2e;
      border: 1px solid #2a2a3e;
      border-left: 3px solid #6366f1;
      border-radius: 10px;
      padding: 16px 18px;
      margin-bottom: 28px;
    }
    .notice p {
      font-size: 13px;
      color: #7070a0;
      margin: 0;
      line-height: 1.6;
    }
    .notice strong {
      color: #a0a0c0;
    }

    /* ── Fallback link ── */
    .fallback {
      font-size: 12px !important;
      color: #5a5a78 !important;
      text-align: center;
      word-break: break-all;
    }
    .fallback a {
      color: #6366f1 !important;
    }

    /* ── Divider ── */
    .divider {
      border: none;
      border-top: 1px solid #22222e;
      margin: 28px 0;
    }

    /* ── Footer ── */
    .footer {
      background: #111118;
      padding: 24px 40px;
      text-align: center;
      border-top: 1px solid #1e1e2a;
    }
    .footer p {
      font-size: 12px;
      color: #44445a;
      line-height: 1.7;
    }
    .footer a {
      color: #6366f1;
      text-decoration: none;
    }

    .expiry-badge {
      display: inline-block;
      background: rgba(251,191,36,0.1);
      border: 1px solid rgba(251,191,36,0.25);
      color: #fbbf24;
      font-size: 12px;
      font-weight: 500;
      padding: 4px 10px;
      border-radius: 20px;
      margin-left: 6px;
      vertical-align: middle;
    }
  </style>
</head>
<body>
  <div class="wrapper">

    <!-- Header -->
    <div class="header">
      <div class="logo-mark">
        <!-- Shield / lock icon -->
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2L4 6V12C4 15.31 7.58 18.4 12 20C16.42 18.4 20 15.31 20 12V6L12 2Z"
                fill="white" fill-opacity="0.9"/>
          <path d="M9 12L11 14L15 10" stroke="#6366f1" stroke-width="2"
                stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h1>Verify Your Email</h1>
      <p>One step away from full access</p>
    </div>

    <!-- Body -->
    <div class="body">

      <p class="greeting">Hey there! 👋</p>

      <p>
        Thanks for signing up. To activate your account and get full access
        to everything, please confirm your email address by clicking the
        button below.
      </p>

      <!-- CTA -->
      <div class="cta-wrapper">
        <a href="${verifyLink}" class="cta-btn">
          ✦ &nbsp; Verify My Email
        </a>
      </div>

      <!-- Notice -->
      <div class="notice">
        <p>
          <strong>⏱ This link expires in 10 minutes.</strong><br/>
          If you didn't create an account, you can safely ignore this email —
          no account will be activated.
        </p>
      </div>

      <p>
        Until you verify your email, you won't be able to log in or access
        any features of the platform. Verification takes just one click!
      </p>

      <hr class="divider"/>

      <p class="fallback">
        Button not working? Copy and paste this link into your browser:<br/>
        <a href="${verifyLink}">${verifyLink}</a>
      </p>

    </div>

    <!-- Footer -->
    <div class="footer">
      <p>
        You're receiving this because you registered an account.<br/>
        &copy; ${new Date().getFullYear()} YourApp. All rights reserved.
      </p>
    </div>

  </div>
</body>
</html>
`
)

const getOtpTemplate = (otp) => (
`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700&family=Inter:wght@400;500&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { background-color: #0f0f13; font-family: 'Inter', sans-serif; }
    .wrapper { max-width: 560px; margin: 40px auto; background: #16161d; border-radius: 20px; overflow: hidden; border: 1px solid #2a2a38; }
    .header { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); padding: 44px 40px 36px; text-align: center; }
    .logo-mark { display: inline-flex; align-items: center; justify-content: center; width: 56px; height: 56px; background: linear-gradient(135deg, #6366f1, #8b5cf6); border-radius: 16px; margin-bottom: 20px; }
    .header h1 { font-family: 'Sora', sans-serif; font-size: 26px; font-weight: 700; color: #f0f0ff; }
    .header p { font-size: 14px; color: #8b8ba7; margin-top: 6px; }
    .body { padding: 40px; }
    .greeting { font-family: 'Sora', sans-serif; font-size: 20px; font-weight: 600; color: #e8e8f0; margin-bottom: 14px; }
    .body p { font-size: 15px; line-height: 1.7; color: #9090a8; margin-bottom: 14px; }
    .otp-wrapper { text-align: center; margin: 32px 0; }
    .otp-box { display: inline-block; background: #1e1e2e; border: 2px solid #6366f1; border-radius: 16px; padding: 24px 48px; }
    .otp-label { font-size: 12px; color: #6666a0; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 12px; }
    .otp-code { font-family: 'Sora', sans-serif; font-size: 42px; font-weight: 700; color: #a5b4fc; letter-spacing: 8px; }
    .notice { background: #1e1e2e; border: 1px solid #2a2a3e; border-left: 3px solid #6366f1; border-radius: 10px; padding: 16px 18px; margin-bottom: 28px; }
    .notice p { font-size: 13px; color: #7070a0; margin: 0; line-height: 1.6; }
    .notice strong { color: #a0a0c0; }
    .divider { border: none; border-top: 1px solid #22222e; margin: 28px 0; }
    .footer { background: #111118; padding: 24px 40px; text-align: center; border-top: 1px solid #1e1e2a; }
    .footer p { font-size: 12px; color: #44445a; line-height: 1.7; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <div class="logo-mark">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <rect x="3" y="11" width="18" height="11" rx="2" fill="white" fill-opacity="0.9"/>
          <path d="M7 11V7a5 5 0 0 1 10 0v4" stroke="white" stroke-width="2" stroke-linecap="round"/>
          <circle cx="12" cy="16" r="1.5" fill="#6366f1"/>
        </svg>
      </div>
      <h1>Reset Your Password</h1>
      <p>Use the OTP below to reset your password</p>
    </div>
    <div class="body">
      <p class="greeting">Hey there! 👋</p>
      <p>We received a request to reset your password. Enter this OTP code to proceed. It is valid for 10 minutes only.</p>
      <div class="otp-wrapper">
        <div class="otp-box">
          <div class="otp-label">Your OTP Code</div>
          <div class="otp-code">${otp}</div>
        </div>
      </div>
      <div class="notice">
        <p><strong>⏱ This OTP expires in 10 minutes.</strong><br/>
        If you didn't request a password reset, please ignore this email — your password will remain unchanged.</p>
      </div>
      <hr class="divider"/>
      <p style="font-size: 13px; color: #5a5a78; text-align: center;">Never share this OTP with anyone, including our support team.</p>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} YourApp. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`
)

const getFeedbackTemplate = (user, initials, subject, message) => (
  `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8"/>
          <style>
            body { margin:0; padding:0; background:#f0f4f8; font-family: Arial, sans-serif; }
            .wrapper { max-width: 560px; margin: 40px auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e5e7eb; }
            .header { background: #ff6b35; padding: 32px 32px 24px; }
            .header h1 { margin: 0; color: #ffffff; font-size: 22px; font-weight: 700; }
            .header p { margin: 6px 0 0; color: #ffe0d3; font-size: 13px; }
            .body { padding: 28px 32px; }
            .avatar { width: 48px; height: 48px; border-radius: 50%; background: #fff3ee; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 700; color: #ff6b35; border: 2px solid #ffcbb8; float: left; margin-right: 14px; text-align:center; line-height:48px; }
            .user-info { overflow: hidden; padding-top: 4px; }
            .user-info h2 { margin: 0; font-size: 16px; color: #1a1a2e; font-weight: 700; }
            .user-info p { margin: 3px 0 0; font-size: 13px; color: #6b7280; }
            .divider { border: none; border-top: 1px solid #f3f4f6; margin: 22px 0; }
            .label { font-size: 11px; font-weight: 700; color: #ff6b35; text-transform: uppercase; letter-spacing: 0.8px; margin-bottom: 6px; }
            .subject-box { background: #fff3ee; border-radius: 10px; padding: 12px 16px; font-size: 15px; font-weight: 700; color: #1a1a2e; margin-bottom: 18px; }
            .message-box { background: #f9fafb; border-radius: 10px; padding: 16px; font-size: 14px; color: #374151; line-height: 1.75; white-space: pre-wrap; }
            .footer { background: #f9fafb; padding: 16px 32px; text-align: center; border-top: 1px solid #f3f4f6; }
            .footer p { margin: 0; font-size: 12px; color: #9ca3af; }
            .footer span { color: #ff6b35; font-weight: 700; }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="header">
              <h1>📝 New Feedback Received</h1>
              <p>${new Date().toLocaleDateString("en-US", { weekday:"long", year:"numeric", month:"long", day:"numeric" })}</p>
            </div>
            <div class="body">
              <div style="overflow:hidden; margin-bottom: 8px;">
                <div class="avatar">${initials}</div>
                <div class="user-info">
                  <h2>${user.fullName}</h2>
                  <p>@${user.username} &nbsp;·&nbsp; ${user.email}</p>
                </div>
              </div>
              <hr class="divider"/>
              <div class="label">Subject</div>
              <div class="subject-box">${subject}</div>
              <div class="label">Message</div>
              <div class="message-box">${message}</div>
            </div>
            <div class="footer">
              <p>Sent via <span>Notes App</span> feedback form</p>
            </div>
          </div>
        </body>
        </html>
        `
)

export {
    getVerifyMailTemplate,
    getOtpTemplate,
    getFeedbackTemplate
}