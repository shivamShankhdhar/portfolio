import connectDB from '@/lib/db';
import ValidAdmin from '@/models/ValidAdmin';

export async function GET() {
  try {
    await connectDB();

    // Get the first admin email (main portfolio owner)
    const admin = await ValidAdmin.findOne().lean();

    if (!admin) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'No admin email found',
        }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        email: admin.email,
        name: admin.name,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Portfolio info error:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Failed to fetch portfolio info',
      }),
      { status: 500 }
    );
  }
}
