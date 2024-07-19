import * as z from "zod";

// profile
export const ProfileSchma = z.object({
  legal_name: z.string().min(1, "Legal name is required"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"), // Adjust regex as needed
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  account_number: z.string().min(1, "Account number is required"),
  ifsc_code: z.string().min(1, "IFSC code is required"),
  upi_id: z.string().min(1, "UPI ID is required"),
  address: z.string().min(1, "Address is required"),
});
