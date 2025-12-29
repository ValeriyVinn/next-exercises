import clientPromise from "../../../../../lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const collection = client.db("exercises").collection("tasks");

    const task = await collection.findOne({ _id: new ObjectId(params.id) });

    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    return NextResponse.json(task, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const client = await clientPromise;
    const collection = client.db("exercises").collection("tasks");

    await collection.updateOne(
      { _id: new ObjectId(params.id) },
      { $set: body }
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const client = await clientPromise;
    const collection = client.db("exercises").collection("tasks");

    await collection.deleteOne({ _id: new ObjectId(params.id) });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
  }
}
