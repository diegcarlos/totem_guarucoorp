export const handleFileChange = (e: any) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      return reader.result;
    };
    reader.readAsDataURL(file); // Converte o arquivo para Base64
  }
};
