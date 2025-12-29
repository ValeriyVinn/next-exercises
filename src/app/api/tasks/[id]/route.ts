// import clientPromise from "../../../../../lib/mongodb";
// import { ObjectId } from "mongodb";
// import { NextResponse } from "next/server";

// export async function GET(
//   request: Request,
//   context: { params: Record<string, string | string[]> }
// ) {
//   try {
//     const client = await clientPromise;
//     const collection = client.db("exercises").collection("tasks");

//     const id = context.params.id as string; // 👈 кастимо до string
//     const task = await collection.findOne({ _id: new ObjectId(id) });

//     if (!task) {
//       return NextResponse.json({ error: "Task not found" }, { status: 404 });
//     }

//     return NextResponse.json(task, { status: 200 });
//   } catch (error) {
//     console.error("GET /tasks/[id] error:", error);
//     return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
//   }
// }

// export async function PUT(
//   request: Request,
//   context: { params: Record<string, string | string[]> }
// ) {
//   try {
//     const body = await request.json();

//     const client = await clientPromise;
//     const collection = client.db("exercises").collection("tasks");

//     const id = context.params.id as string;
//     await collection.updateOne({ _id: new ObjectId(id) }, { $set: body });

//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (error) {
//     console.error("PUT /tasks/[id] error:", error);
//     return NextResponse.json({ error: "Failed to update task" }, { status: 500 });
//   }
// }

// export async function DELETE(
//   request: Request,
//   context: { params: Record<string, string | string[]> }
// ) {
//   try {
//     const client = await clientPromise;
//     const collection = client.db("exercises").collection("tasks");

//     const id = context.params.id as string;
//     await collection.deleteOne({ _id: new ObjectId(id) });

//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (error) {
//     console.error("DELETE /tasks/[id] error:", error);
//     return NextResponse.json({ error: "Failed to delete task" }, { status: 500 });
//   }
// }