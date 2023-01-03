const handleImageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      setImage(file);
      setImageUrl(reader.result);
      setImageName(file.name);
      setImageType(file.type);
      setImageSize(file.size);
      setImageBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };
  //img = db.Column(db.Unicode)