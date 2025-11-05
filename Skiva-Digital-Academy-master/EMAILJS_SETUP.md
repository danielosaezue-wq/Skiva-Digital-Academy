# EmailJS Setup Guide for Skiva Digital Academy

## Overview
EmailJS is a free email service that allows you to send emails directly from your client-side JavaScript code without a backend server. The free tier includes **200 emails per month**, which is perfect for form submissions.

## Step-by-Step Setup

### 1. Create an EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### 2. Add an Email Service
1. Log in to your EmailJS dashboard
2. Go to **Email Services** in the sidebar
3. Click **Add New Service**
4. Choose your email provider (Gmail, Outlook, Yahoo, etc.)
5. Follow the instructions to connect your email account
6. Note down your **Service ID** (e.g., `service_abc123`)

### 3. Create an Email Template
1. Go to **Email Templates** in the sidebar
2. Click **Create New Template**
3. Use this template structure:

**Subject Line:**
```
New Training Booking from {{fullName}}
```

**Email Body:**
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #008080; color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #008080; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎓 New Training Booking Request</h1>
        </div>
        <div class="content">
            <p>A new training booking has been submitted:</p>
            
            <div class="field">
                <span class="label">📚 Course:</span> {{courseInterest}}
            </div>
            
            <div class="field">
                <span class="label">👤 Full Name:</span> {{fullName}}
            </div>
            
            <div class="field">
                <span class="label">📧 Email:</span> {{email}}
            </div>
            
            <div class="field">
                <span class="label">📱 Phone:</span> {{phone}}
            </div>
            
            <div class="field">
                <span class="label">📍 Location:</span> {{location}}
            </div>
            
            <div class="field">
                <span class="label">👥 Age Range:</span> {{ageRange}}
            </div>
            
            <div class="field">
                <span class="label">📊 Skill Level:</span> {{skillLevel}}
            </div>
            
            <div class="field">
                <span class="label">💻 Training Mode:</span> {{trainingMode}}
            </div>
            
            <div class="field">
                <span class="label">⏰ Preferred Time:</span> {{preferredTime}}
            </div>
            
            <div class="field">
                <span class="label">📅 Preferred Schedule:</span> {{preferredSchedule}}
            </div>
            
            <div class="field">
                <span class="label">💬 Additional Message:</span> {{message}}
            </div>
            
            <div class="field">
                <span class="label">📆 Submission Date:</span> {{submissionDate}}
            </div>
        </div>
        <div class="footer">
            <p>Skiva Digital Academy - Training Booking System</p>
        </div>
    </div>
</body>
</html>
```

4. Save the template and note down your **Template ID** (e.g., `template_xyz789`)

### 4. Get Your Public Key
1. Go to **Account** in the sidebar
2. Find your **Public Key** (e.g., `abcdefg123456`)
3. This is also called the User ID in some versions

### 5. Update Your Code

**For BookTraining Page:**
Open `src/pages/BookTraining.jsx` and replace these values around line 85-87:

```javascript
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';        // Replace with your Service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';      // Replace with your Template ID
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';        // Replace with your Public Key
```

**For CourseDetail Page:**
Open `src/pages/CourseDetail.jsx` and replace these values around line 79-81:

```javascript
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';        // Replace with your Service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';      // Replace with your Template ID
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';        // Replace with your Public Key
```

**Note:** You can use the **same EmailJS credentials** for both pages, or create separate templates for each if you want different email formats.

Example:
```javascript
const EMAILJS_SERVICE_ID = 'service_abc123';
const EMAILJS_TEMPLATE_ID = 'template_xyz789';
const EMAILJS_PUBLIC_KEY = 'abcdefg123456';
```

### 6. Test Your Setup
1. Run your development server: `npm run dev`
2. Navigate to the Book Training page
3. Fill out the form and submit
4. Check your email inbox (the one connected to EmailJS)
5. You should receive the booking details email

## Optional: Create a User Confirmation Email

To send a confirmation email to the user who submitted the form:

1. Create a **second email template** for user confirmation
2. Subject: `Training Booking Confirmation - Skiva Digital Academy`
3. Body:
```html
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: #008080; color: white; padding: 20px; text-align: center;">
            <h1>🎉 Booking Received!</h1>
        </div>
        <div style="padding: 20px;">
            <p>Dear {{fullName}},</p>
            <p>Thank you for booking a training session with Skiva Digital Academy!</p>
            <p><strong>Course:</strong> {{courseInterest}}</p>
            <p>We have received your booking request and will contact you within 24 hours to confirm your schedule and provide further details.</p>
            <p>If you have any urgent questions, feel free to reach out to us via WhatsApp at +234 702 575 3414.</p>
            <p>Best regards,<br>Skiva Digital Academy Team</p>
        </div>
    </div>
</body>
</html>
```

4. Add a second EmailJS call in the code to send this template to the user's email

## Optional: Create a Course Enrollment Template

For the **CourseDetail page**, you may want to create a separate template to capture enrollment-specific information:

**Subject Line:**
```
New Course Enrollment - {{courseName}}
```

**Email Body:**
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #008080; color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #008080; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎓 New Course Enrollment</h1>
        </div>
        <div class="content">
            <p>A new student has enrolled for a course:</p>
            
            <div class="field">
                <span class="label">📚 Course:</span> {{courseName}}
            </div>
            
            <div class="field">
                <span class="label">👤 Student Name:</span> {{studentName}}
            </div>
            
            <div class="field">
                <span class="label">📧 Email:</span> {{email}}
            </div>
            
            <div class="field">
                <span class="label">📱 Phone:</span> {{phone}}
            </div>
            
            <div class="field">
                <span class="label">💼 Sponsor:</span> {{sponsor}}
            </div>
            
            <div class="field">
                <span class="label">💻 Training Preference:</span> {{trainingPreference}}
            </div>
            
            <div class="field">
                <span class="label">⏰ Preferred Time:</span> {{preferredTime}}
            </div>
            
            <div class="field">
                <span class="label">💰 Course Price:</span> {{coursePrice}}
            </div>
            
            <div class="field">
                <span class="label">📆 Submission Date:</span> {{submissionDate}}
            </div>
        </div>
        <div class="footer">
            <p>Skiva Digital Academy - Course Enrollment System</p>
        </div>
    </div>
</body>
</html>
```

**Note:** You can use the same EmailJS service and credentials for both BookTraining and CourseDetail pages. Just make sure the template variables match what you're sending from each form.

## Troubleshooting

### Emails Not Sending
- Check that all three IDs are correct
- Verify your email service is connected in EmailJS dashboard
- Check browser console for error messages
- Ensure you haven't exceeded the 200 emails/month limit

### Template Variables Not Working
- Make sure variable names match exactly: `{{fullName}}`, not `{{full_name}}`
- Check that variables are wrapped in double curly braces

### Rate Limiting
- Free tier: 200 emails/month
- If you need more, upgrade to a paid plan ($8/month for 1,000 emails)

## Support
- EmailJS Documentation: [https://www.emailjs.com/docs/](https://www.emailjs.com/docs/)
- EmailJS Support: support@emailjs.com
