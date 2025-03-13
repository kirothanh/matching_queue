import { Editor } from '@tinymce/tinymce-react';
import authorizedAxiosInstance from "../../utils/authorizedAxios";
import { Button } from '@mui/material';
import { useState } from 'react';
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify';
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from 'react-hook-form';

const schema = yup.object().shape({
  content: yup
    .string()
    .required("Nội dung không được để trống")
    .test("wordCount", "Nội dung không được vượt quá 300 từ", (value) => {
      const wordCount = value ? value.trim().split(/\s+/).length : 0;
      return wordCount <= 300;
    }),
});

export default function Dashboard() {
  const [content, setContent] = useState("");

  const {
    handleSubmit,
    setError,
    clearErrors,
    setValue, // Add setValue from react-hook-form
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleEditorChange = (newContent) => {
    setContent(newContent);
    setValue("content", newContent); // Update the form state with the new content
    clearErrors("content");
  };

  const onSubmit = async (data) => {
    try {
      // Kiểm tra validation trước khi submit
      await schema.validate({ content: data.content });

      // Lọc nội dung với DOMPurify
      const cleanContent = DOMPurify.sanitize(content);

      // Kiểm tra ảnh chỉ từ S3
      const doc = new DOMParser().parseFromString(cleanContent, "text/html");
      const images = doc.querySelectorAll("img");

      images.forEach(img => {
        if (!img.src.startsWith("https://matching-queue-bk.s3.ap-southeast-2.amazonaws.com/")) {
          throw new Error("Ảnh không hợp lệ!");
        }
      });

      // Gửi dữ liệu lên backend
      console.log('Filtered Content:', cleanContent);

      // Gửi nội dung lên backend
      console.log('content: ', data.content);
      toast.success("Đăng bài thành công!");
    } catch (error) {
      console.error("Validation failed:", error);
      setError("content", { message: error.message });
      toast.error(error.message);
    }
  };

  const handleCancel = () => {
    setContent("");
    setValue("content", ""); // Clear the form state
    clearErrors("content");
  };

  return (
    <>
      <div className='p-4 relative max-w-[1000px] mx-auto'>
        <form onSubmit={handleSubmit(onSubmit)}>
          {errors.content && <p className="text-red-500 text-sm mt-2">{errors.content.message}</p>}
          <Editor
            apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
            init={{
              plugins: ['image', 'link', 'lists'],
              toolbar: 'undo redo | bold italic underline strikethrough | link image | numlist bullist',
              menubar: false, // Ẩn menu trên cùng
              statusbar: false, // Ẩn thanh trạng thái bên dưới
              branding: false, // Ẩn logo TinyMCE
              height: 250, // Giảm chiều cao của editor để phù hợp với đăng status
              toolbar_location: 'bottom',
              images_upload_handler: async (blobInfo) => {
                try {
                  const formData = new FormData();
                  formData.append("image", blobInfo.blob(), blobInfo.filename());

                  const response = await authorizedAxiosInstance.post('/upload', formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                  });

                  const imageUrl = response.data.url;

                  if (!imageUrl) throw new Error("No URL found in response");

                  return imageUrl;
                } catch (error) {
                  console.error("Upload failed:", error);
                  return Promise.reject("Image upload failed: " + error.message);
                }
              }
            }}
            value={content}
            onEditorChange={handleEditorChange}
          />

          <div className='flex space-x-4 sm:absolute bottom-6 right-6'>
            <Button variant="contained" color="inherit" className="z-[2] w-full sm:w-auto" onClick={handleCancel}>Hủy bỏ</Button>
            <Button type="submit" variant="contained" color="primary" className="z-[2] w-full sm:w-auto">Đăng</Button>
          </div>
        </form>
      </div>
    </>
  );
}