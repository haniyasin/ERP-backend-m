export const emailHtmlContent = (password: string) => {
   return `<html>
            <head>
            <style>
                body {
                background-color: #f4f4f4;
                font-family: Arial, sans-serif;
                }

                .email-container {
                border: 1px solid #ccc;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
                padding: 20px;
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
                }

                h1 {
                color: #333;
                font-size: 24px;
                margin-bottom: 20px;
                }

                h2 {
                color: #333;
                font-size: 18px;
                margin-top: 20px;
                margin-bottom: 15px;
                }

                h3 {
                color: #555;
                font-size: 16px;
                margin-bottom: 5px;
                }

                .password {
                color: #f00;
                font-size: 16px;
                }

                .description {
                color: #777;
                font-size: 14px;
                margin-top: 5px;
                }

                a {
                color: #0066cc;
                text-decoration: none;
                }
            </style>
            </head>
            <body>
            <div class="email-container">
                <h1>Welcome to Deafor's ERP System!</h1>
                <h2>You have been registered successfully.</h2>
                <h3>Your password:</h3>
                <span class="password">${password}</span>
                <h2>You can login <a href="http://localhost:3000/login">here</a>.</h2>
            </div>
            </body>
            </html>`
}

