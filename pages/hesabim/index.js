import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css"
import React, { useState, useEffect, useRef } from "react";
import Layout from "../../src/components/Layout";
import styles from "./hesabim.module.css";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import useAuth from "../../src/hooks/useAuth";
import { useRouter } from "next/router";
import { firebase } from "../../utils/firebase";
import UpdateProfileFields from "./UpdateProfileFields";

// Create a root reference

const Index = () => {
  const { user, isAuthenticated, updateProfileField } = useAuth();
  const [avatar, setAvatar] = useState("");
  const [displayName, setDisplayName] = useState("");
  const router = useRouter();
  const cropperRef = useRef(null);
  const imageRef = useRef(null);
  const storage = getStorage(firebase);
  const [uploadImageSrc, setUploadImageSrc] = useState("");
  const [uploadImageFile, setUploadImageFile] = useState("");
  const [uploadPending, setUploadPending] = useState(false);
  const rand = Math.floor(Math.random() * 1000) + 1  // for disable caching profile photo

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/giris");
    }

    if (isAuthenticated) {
      const avatar = user?.photoURL ? user.photoURL : "/images/avatar.png";
      const displayName = user?.displayName ? user.displayName : "";
      setAvatar(avatar);
      setDisplayName(displayName);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (uploadPending) {
      updateProfileField(user, "photoURL", avatar);
      setUploadPending(false);
    }
  }, [avatar]);

  function handleInitialUpload() {
    let file = imageRef.current.files[0];
    let reader = new FileReader();
    let url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setUploadImageSrc(reader.result);
    }
  }

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  async function handleUpload() {

    const avatarRef = ref(storage, `/avatar/${user.uid}/profile.jpg`);

    var file = dataURLtoFile(uploadImageFile, 'profil.png');

    await setUploadImageFile(false);

    setUploadPending(true);

    uploadBytes(avatarRef, file).then((snapshot) => {
      getDownloadURL(snapshot.ref).then(async (downloadURL) => {
        // console.log("File available at", downloadURL);
        setAvatar(downloadURL);
      }).catch(err => {
        console.log(err);
      })
    });
  }

  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    setUploadImageFile(cropper.getCroppedCanvas({
      width: 300,
      height: 300,
      maxWidth: 300,
      maxHeight: 300,
      fillColor: '#fff',
      imageSmoothingEnabled: false,
      imageSmoothingQuality: 'high',
    }).toDataURL());
  };

  const handleCrop = () => {
    setUploadImageSrc("");
    handleUpload();
  }

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.row}>
          {uploadImageSrc &&
            <div className='d-flex flex-column justify-content-center'>
              <Cropper
                src={uploadImageSrc}
                style={{ height: "auto", width: "100%" }}
                // Cropper.js options
                aspectRatio={1 / 1}
                guides={false}
                crop={onCrop}
                ref={cropperRef}
                viewMode={1}
              />
              <button className='btn btn-sm btn-light' onClick={() => handleCrop()}>SEÇ</button>
            </div>
          }
          <h2>Genel Profil Ayarları</h2>
          <hr />
          <div className={styles.fieldContainer}>
            <div className={styles.fieldWrapper}>
              <p className={styles.fieldTitle}>Profil Fotoğrafı:</p>
              {avatar && (
                <img src={avatar} width={250} height={250} className={styles.avatar} />
              )}
              <input type="file" id="file-input" name="myfile" ref={imageRef} onChange={(e) => handleInitialUpload(e)} />
            </div>
            <UpdateProfileFields styles={styles} user={user} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Index;