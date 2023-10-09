"use client";
import { useState, useEffect, useRef } from "react";
import AvatarEditor from "react-avatar-editor";

const UploadAvatar = ({ avatarChange }) => {
  const [src, setSrc] = useState(null);
  const editorRef = useRef(null);

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSrc(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onEditorMouseUp = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const dataUrl = canvas.toDataURL();
      avatarChange(dataUrl);
    }
  };

  useEffect(() => {
    // Здесь вы можете добавить логику для предварительного просмотра, если необходимо
  }, [src]);

  return (
    <div className="text-center mt-5 rounded-[50%]">
      <label
        htmlFor="imageInput"
        className=" bg-primary text-white py-4 px-4 rounded-md cursor-pointer"
      >
        Загрузить
      </label>
      <input
        type="file"
        id="imageInput"
        accept="image/*"
        onChange={onImageChange}
        style={{ display: "none" }}
      />
      <AvatarEditor
        ref={editorRef}
        onMouseUp={onEditorMouseUp}
        image={src}
        width={150}
        height={150}
        border={10}
        color={[255, 255, 255, 0.6]} // Цвет рамки
        scale={1.2} // Масштаб
        rotate={0} // Поворот
        style={{ margin: "20px auto" }}
      />
    </div>
  );
};

export { UploadAvatar };
