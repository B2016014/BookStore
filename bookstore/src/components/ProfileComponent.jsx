import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useAuthContext } from '../hook/useAuthContext';

const ProfileComponent = () => {
  const { user } = useAuthContext();
  const [profile, setProfile] = useState([])
  const [changes, setChanges] = useState({});
  const [success, setSuccess] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (!user) {
      { <div>Loading...</div> }
    }
    else {
      console.log(user);
      axios.get('http://localhost:3000/users/Profile', {
        headers: {
          authorization: `Bearer ${user.token}`
        }
      })
        .then((res) => {
          console.log(res.data)
          setProfile(res.data)
        })
        .catch((error) => {
          console.log("error while fetching your profile" + error);
        });
    }
  }, [user])

  const handleInputChange = (event) => {

    const { name, value } = event.target;
    console.log(name, value)
    setChanges((prevChanges) => ({
      ...prevChanges,
      [name]: value,
    }));
    profile.name = value;
    console.log(profile.name)
  };
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = () => {
    axios.post('http://localhost:3000/users/Profile/update', changes, {
      headers: {
        authorization: `Bearer ${user.token}`
      }
    })
      .then((res) => {
        setProfile(res.data);
        setSuccess(true)
      })
      .catch((err) => {
        console.log("error in updating the profile")
      })
  }
  const uploadFile = (e) => {
    console.log(file);
    const formData = new FormData();
    formData.append('file', file);
    axios.post('http://localhost:3000/upload', formData, {
      headers: {
        authorization: `Bearer ${user.token}`
      }
    })
      .then((res) => {
        console.log("Response " + res)
        setProfile(res.data);
      })
      .catch((err) => {
        console.log("error in uploading the profile " + err);
      })
  }

  return (
    <div>
      {
        success && (<div>
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            <strong>Updated successfully</strong>
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        </div>)
      }
      <div className='profile'>
        <div className='profile-img'>
          {profile.image ? (
            <label htmlFor="fileInput" className='profile-upload'>
              <img
                src={`http://localhost:3000/${profile.image}`}
                className="rounded-circle clickable"
                alt={profile.username}data-toggle="tooltip" data-placement="top" title="Click to Select your photo"
              />
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <button onClick={uploadFile} data-toggle="tooltip" data-placement="top" title="upload your selected photo"><i class="fa-solid fa-plus"></i></button>
            </label>
          ) : (
            <label htmlFor="fileInput" className='profile-upload'>
              <img
                src="/assets/null_image.png"
                className="rounded-circle clickable"
                alt="Add profile"
              />
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <button onClick={uploadFile}><i class="fa-solid fa-plus"></i></button>
            </label>
          )}
        </div>


        <div className='form'>
          <label for="username">username</label>
          <input type="text" name="username" value={changes.username !== undefined ? changes.username : profile.username} className='flow-control' onChange={handleInputChange}></input>

          <label for="email">Email</label>
          <input type="email" name="email" value={changes.email !== undefined ? changes.email : profile.email} className='flow-control' onChange={handleInputChange}></input>

          <label for="phoneNumber">Phone Number</label>
          <input type="number" name="phoneNumber" value={changes.phoneNumber !== undefined ? changes.phoneNumber : profile.phoneNumber} className='flow-control' onChange={handleInputChange}></input>

          <label for="alternateNumber">Alternate Number</label>
          <input type="number" name="alternateNumber" value={changes.alternateNumber !== undefined ? changes.alternateNumber : profile.alternateNumber} className='flow-control' onChange={handleInputChange}></input>

          <label for="address">Address</label>
          <textarea name="address" value={changes.address !== undefined ? changes.address : profile.address} onChange={handleInputChange} rows={5}></textarea>

          <button type="button" className='btn btn-outline-success mt-4' onClick={handleSubmit}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default ProfileComponent