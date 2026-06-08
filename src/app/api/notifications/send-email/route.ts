import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

let resend: Resend | null = null;
function getResend() {
  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

export interface SendEmailRequest {
  to: string;
  customerName: string;
  orderNumber: string;
  status: "pending" | "confirmed" | "dispatched" | "delivered" | "cancelled";
  message: string;
  estimatedDeliveryDate?: string;
  trackingUrl?: string;
  items?: Array<{ name: string; quantity: number; price: number }>;
  total?: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: SendEmailRequest = await request.json();

    const { to, customerName, orderNumber, status, message, estimatedDeliveryDate, trackingUrl, items, total } = body;

    // Validate required fields
    if (!to || !customerName || !orderNumber || !status || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.warn("Resend API key not configured. Email would be sent in production.");
      console.log("Email (dev mode):", { to, orderNumber, status });
      return NextResponse.json(
        {
          success: true,
          message: `Email notification sent to ${to} (dev mode)`,
        },
        { status: 200 }
      );
    }

    // Generate email HTML
    const htmlContent = generateEmailHTML({
      to,
      customerName,
      orderNumber,
      status,
      message,
      estimatedDeliveryDate,
      trackingUrl,
      items,
      total,
    });

    // Send email via Resend
    const response = await getResend().emails.send({
      from: `${process.env.EMAIL_FROM_NAME || "Trippy Head Stash Delivery"} <${process.env.EMAIL_FROM || "noreply@resend.dev"}>`,
      to,
      subject: getEmailSubject(orderNumber, status),
      html: htmlContent,
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    console.log("Email sent successfully:", { to, orderNumber, messageId: response.data?.id });

    return NextResponse.json(
      {
        success: true,
        message: `Email notification sent to ${to}`,
        messageId: response.data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Failed to send email",
      },
      { status: 500 }
    );
  }
}

/**
 * Generate email subject based on order status
 */
function getEmailSubject(orderNumber: string, status: string): string {
  const subjects: Record<string, string> = {
    pending: `Order Received: ${orderNumber}`,
    confirmed: `Order Confirmed: ${orderNumber}`,
    dispatched: `Order On The Way: ${orderNumber}`,
    delivered: `Order Delivered: ${orderNumber}`,
    cancelled: `Order Cancelled: ${orderNumber}`,
  };
  return subjects[status] || `Order Update: ${orderNumber}`;
}

/**
 * Generate professional HTML email template based on order status
 */
function generateEmailHTML(data: SendEmailRequest & { items?: Array<{ name: string; quantity: number; price: number }>; total?: number }): string {
  const { customerName, orderNumber, status, message, estimatedDeliveryDate, trackingUrl, items, total } = data;

  // Status-specific styling
  const statusColors: Record<string, { bg: string; border: string; text: string }> = {
    pending: { bg: "#FEF3C7", border: "#F59E0B", text: "#92400E" },
    confirmed: { bg: "#DBEAFE", border: "#3B82F6", text: "#1E40AF" },
    dispatched: { bg: "#E0E7FF", border: "#6366F1", text: "#312E81" },
    delivered: { bg: "#DCFCE7", border: "#22C55E", text: "#166534" },
    cancelled: { bg: "#FEE2E2", border: "#EF4444", text: "#991B1B" },
  };

  const statusColor = statusColors[status] || statusColors.pending;

  const itemsHTML = items && items.length > 0
    ? `
      <div style="margin-top: 20px; border-top: 1px solid #E5E7EB; padding-top: 20px;">
        <h3 style="font-size: 14px; font-weight: bold; margin-bottom: 15px; color: #1F2937;">Order Items</h3>
        <table style="width: 100%; border-collapse: collapse;">
          ${items.map(item => `
            <tr style="border-bottom: 1px solid #F3F4F6;">
              <td style="padding: 10px 0; color: #4B5563;">${item.name}</td>
              <td style="padding: 10px 0; text-align: center; color: #4B5563;">Qty: ${item.quantity}</td>
              <td style="padding: 10px 0; text-align: right; color: #4B5563; font-weight: bold;">$${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          `).join('')}
        </table>
        ${total ? `
          <div style="margin-top: 15px; padding-top: 15px; border-top: 2px solid #E5E7EB; text-align: right;">
            <p style="font-size: 16px; font-weight: bold; color: #1F2937;">Total: <span style="color: #E83E6B;">$${total.toFixed(2)}</span></p>
          </div>
        ` : ''}
      </div>
    `
    : '';

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            color: #1F2937;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #F9FAFB;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .email-wrapper {
            background-color: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #E83E6B 0%, #06D6A0 50%, #8B5CF6 100%);
            padding: 40px 20px;
            text-align: center;
            color: white;
          }
          .header h1 {
            margin: 0 0 5px 0;
            font-size: 28px;
            font-weight: bold;
          }
          .header p {
            margin: 0;
            font-size: 14px;
            opacity: 0.9;
          }
          .status-badge {
            display: inline-block;
            background-color: ${statusColor.bg};
            border: 2px solid ${statusColor.border};
            color: ${statusColor.text};
            padding: 8px 16px;
            border-radius: 6px;
            font-weight: bold;
            font-size: 13px;
            margin-top: 15px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          .content {
            padding: 30px;
          }
          .greeting {
            font-size: 16px;
            font-weight: 500;
            margin: 0 0 20px 0;
          }
          .message {
            font-size: 15px;
            color: #4B5563;
            margin: 0 0 20px 0;
            line-height: 1.7;
          }
          .order-details {
            background-color: #F9FAFB;
            border: 1px solid #E5E7EB;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
          }
          .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 12px;
            font-size: 14px;
          }
          .detail-label {
            color: #6B7280;
            font-weight: 500;
          }
          .detail-value {
            color: #1F2937;
            font-weight: bold;
          }
          .tracking-button {
            display: inline-block;
            background: linear-gradient(135deg, #E83E6B, #06D6A0);
            color: white;
            padding: 12px 24px;
            border-radius: 6px;
            text-decoration: none;
            font-weight: bold;
            font-size: 14px;
            margin-top: 20px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            transition: transform 0.2s;
          }
          .tracking-button:hover {
            transform: translateY(-2px);
          }
          .footer {
            background-color: #F3F4F6;
            padding: 20px;
            text-align: center;
            border-top: 1px solid #E5E7EB;
            font-size: 12px;
            color: #6B7280;
          }
          .footer a {
            color: #E83E6B;
            text-decoration: none;
          }
          .divider {
            height: 1px;
            background-color: #E5E7EB;
            margin: 20px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="email-wrapper">
            <!-- Header -->
            <div class="header">
              <h1>TRIPPY HEAD STASH DELIVERY</h1>
              <p>Order Status Update</p>
              <div class="status-badge">${status.toUpperCase()}</div>
            </div>

            <!-- Content -->
            <div class="content">
              <p class="greeting">Hey ${customerName}! 👋</p>
              
              <p class="message">${message}</p>

              <!-- Order Details -->
              <div class="order-details">
                <div class="detail-row">
                  <span class="detail-label">Order Number:</span>
                  <span class="detail-value">${orderNumber}</span>
                </div>
                ${estimatedDeliveryDate ? `
                  <div class="detail-row">
                    <span class="detail-label">Estimated Delivery:</span>
                    <span class="detail-value">${estimatedDeliveryDate}</span>
                  </div>
                ` : ''}
                <div class="detail-row">
                  <span class="detail-label">Order Date:</span>
                  <span class="detail-value">${new Date().toLocaleDateString()}</span>
                </div>
              </div>

              ${itemsHTML}

              <!-- Tracking Link -->
              ${trackingUrl ? `
                <a href="${trackingUrl}" class="tracking-button">🚀 Track Your Order</a>
              ` : ''}

              <!-- Support Info -->
              <div class="divider"></div>
              <p style="font-size: 13px; color: #6B7280; margin-top: 20px;">
                Have questions? Reply to this email or visit our support center at 
                <a href="mailto:support@trippyheadstash.com" style="color: #E83E6B; text-decoration: none;">support@trippyheadstash.com</a>
              </p>
            </div>

            <!-- Footer -->
            <div class="footer">
              <p style="margin: 0 0 8px 0;">
                Trippy Head Stash Delivery™ | Est. 2026
              </p>
              <p style="margin: 0; font-size: 11px; color: #9CA3AF;">
                This is an automated message. Please do not reply with sensitive information.
              </p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}
