import connectDB, { isDbConfigured } from '@/lib/db';
import ValidAdmin from '@/models/ValidAdmin';

type AdminType = {
  _id: string;
  email: string;
  name?: string;
};

export async function GET() {
  const defaultEmail = process.env.ADMIN_EMAIL || 's.shankhdhar1981@gmail.com';
  const defaultName = 'Shivam Shankhdhar';

  try {
    if (!isDbConfigured()) {
      return Response.json({
        success: true,
        email: defaultEmail,
        name: defaultName,
      });
    }

    await connectDB();
    const admin = await ValidAdmin.findOne().lean<AdminType>();

    return Response.json({
      success: true,
      email: admin?.email || defaultEmail,
      name: admin?.name || defaultName,
    });
  } catch (error) {
    return Response.json({
      success: true,
      email: defaultEmail,
      name: defaultName,
    });
  }
}