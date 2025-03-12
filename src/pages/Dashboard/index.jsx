import { Editor } from '@tinymce/tinymce-react';
import authorizedAxiosInstance from "../../utils/authorizedAxios";

export default function Dashboard() {
  return (
    <>
      <div>
        <Editor
          apiKey={import.meta.env.VITE_TINY_MCE_API_KEY}
          init={{
            plugins: ['image', 'link', 'lists'],
            toolbar: 'undo redo | bold italic underline strikethrough | link image | numlist bullist',
            menubar: false, // Ẩn menu trên cùng
            statusbar: false, // Ẩn thanh trạng thái bên dưới
            branding: false, // Ẩn logo TinyMCE
            height: 300, // Giảm chiều cao của editor để phù hợp với đăng status
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
          initialValue="Viết status của bạn ở đây..."
        />

      </div>
    </>
  )
}
