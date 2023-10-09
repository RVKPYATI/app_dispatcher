"use client";
import { useState, useEffect } from "react";
import AvatarEditor from "react-avatar-editor";

const UploadAvatar = ({ avatarChange }) => {
  const [editor, setEditor] = useState(null);
  const [src, setSrc] = useState(null);

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

  const onSave = () => {
    if (editor) {
      const canvas = editor.getImageScaledToCanvas();
      const dataUrl = canvas.toDataURL();
      avatarChange(dataUrl);
    }
  };

  useEffect(() => {
    // Здесь вы можете добавить логику для предварительного просмотра, если необходимо
  }, [src]);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <label
        htmlFor="imageInput"
        style={{
          backgroundColor: "#007bff",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
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
        ref={(editorRef) => setEditor(editorRef)}
        image={src}
        width={150}
        height={150}
        border={10}
        color={[255, 255, 255, 0.6]} // Цвет рамки
        scale={1.2} // Масштаб
        rotate={0} // Поворот
        style={{ margin: "20px auto" }}
      />
      {src && <button onClick={onSave}>✅</button>}
    </div>
  );
};

export { UploadAvatar };
