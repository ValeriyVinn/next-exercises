
import clientPromise from "../../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const collection = client.db("exercises").collection("tasks");

    const tasks = await collection.find({}).toArray();

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("GET /task/ error:", error);
    return NextResponse.json({ error: "Failed to fetch tasks" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const client = await clientPromise;
    const collection = client.db("exercises").collection("tasks");

    const newTask = {
      title: body.title,
      description: body.description ?? "",
      completed: false,
      createdAt: new Date()
    };

    const result = await collection.insertOne(newTask);

    return NextResponse.json(
      { insertedId: result.insertedId, ...newTask },
      { status: 201 }
    );
  } catch (error) {
    console.error("GET /task/ error:", error);
    return NextResponse.json({ error: "Failed to create task" }, { status: 500 });
  }
}
