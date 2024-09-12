import prisma from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// CHANGE THE STATUS OF AN ORDER
export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  const { id } = params;

  try {
    const { status } = await req.json(); // Destructure the status from the request body

    await prisma.order.update({
      where: {
        id: id,
      },
      data: { status }, // Update the order's status
    });

    return new NextResponse(
      JSON.stringify({ message: "Order has been updated!" }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
