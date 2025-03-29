import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import formidable from "formidable";

// Đường dẫn tới file localStorageData.ts
const filePath = path.join(process.cwd(), process.env.FILE_PATH || "");

export async function POST(req: Request) {
  try {
    const newData = await req.json(); // Lấy dữ liệu từ body của request

    // Kiểm tra nếu file tồn tại, nếu không thì tạo file mới với mảng rỗng
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, JSON.stringify([], null, 2), "utf-8");
    }
    // Đọc nội dung file hiện tại
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const currentData = JSON.parse(fileContent);

    // Thêm dữ liệu mới
    currentData.push(newData);

    // Ghi lại file với dữ liệu mới
    fs.writeFileSync(filePath, JSON.stringify(currentData, null, 2), "utf-8");

    return NextResponse.json({ message: "Data added successfully" });
  } catch (error) {
    console.error("Error writing to file:", error);
    return NextResponse.json(
      { error: "Failed to write data to file" },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    // Đọc nội dung file hiện tại
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const currentData = JSON.parse(fileContent);
    return NextResponse.json(currentData, { status: 200 });
  } catch (error) {
    console.error("Error reading file:", error);
    return NextResponse.json(
      { error: "Failed to read data from file" },
      { status: 500 }
    );
  }
}
