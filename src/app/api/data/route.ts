import { NextRequest, NextResponse } from "next/server";

// Example data store (in-memory for demonstration)
const data = [
  { id: 1, name: "Item 1", description: "First item" },
  { id: 2, name: "Item 2", description: "Second item" },
  { id: 3, name: "Item 3", description: "Third item" },
];

// GET /api/data - Retrieve all items
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (id) {
    const item = data.find((item) => item.id === parseInt(id));
    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
    return NextResponse.json(item);
  }

  return NextResponse.json(data);
}

// POST /api/data - Create a new item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.description) {
      return NextResponse.json(
        { error: "Missing required fields: name and description" },
        { status: 400 }
      );
    }

    // Create new item
    const newItem = {
      id: data.length + 1,
      name: body.name,
      description: body.description,
    };

    data.push(newItem);

    return NextResponse.json(
      { message: "Item created successfully", data: newItem },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

// PUT /api/data - Update an item
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body.id) {
      return NextResponse.json(
        { error: "Missing required field: id" },
        { status: 400 }
      );
    }

    const itemIndex = data.findIndex((item) => item.id === body.id);
    if (itemIndex === -1) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    // Update item
    data[itemIndex] = { ...data[itemIndex], ...body };

    return NextResponse.json({
      message: "Item updated successfully",
      data: data[itemIndex],
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 }
    );
  }
}

// DELETE /api/data - Delete an item
export async function DELETE(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "Missing required parameter: id" },
      { status: 400 }
    );
  }

  const itemIndex = data.findIndex((item) => item.id === parseInt(id));
  if (itemIndex === -1) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  // Remove item
  data.splice(itemIndex, 1);

  return NextResponse.json({ message: "Item deleted successfully" });
}
