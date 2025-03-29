import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

// Đường dẫn tới file localStorageData.json
const filePath = path.join(process.cwd(), process.env.FILE_PATH || "");

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params; // Lấy id từ dynamic route

    // Đọc nội dung file hiện tại
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const currentData = JSON.parse(fileContent);

    // Tìm bài viết theo id
    const post = currentData.find((p: { id: string }) => p.id === id);

    if (!post) {
      return NextResponse.json(
        { error: "Bài viết không tồn tại" },
        { status: 404 }
      );
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error("Error reading file:", error);
    return NextResponse.json(
      { error: "Failed to read data from file" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params; // Lấy id từ dynamic route

    // Đọc nội dung file hiện tại
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const currentData = JSON.parse(fileContent);

    // Tìm bài viết theo id và xóa nó
    const updatedData = currentData.filter((p: { id: string }) => p.id !== id);

    // Kiểm tra nếu không tìm thấy bài viết để xóa
    if (updatedData.length === currentData.length) {
      return NextResponse.json(
        { error: "Bài viết không tồn tại" },
        { status: 404 }
      );
    }

    // Ghi lại dữ liệu mới vào file
    fs.writeFileSync(filePath, JSON.stringify(updatedData, null, 2), "utf-8");

    return NextResponse.json(
      { message: `Bài viết với id ${id} đã được xóa thành công` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting blog:", error);
    return NextResponse.json(
      { error: "Failed to delete blog" },
      { status: 500 }
    );
  }
}
