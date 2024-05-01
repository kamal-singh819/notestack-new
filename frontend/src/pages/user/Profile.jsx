const Profile = () => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  return (
    <div>
      <p>Name is : {userInfo.name}</p>
      <p>Email is : {userInfo.email}</p>
    </div>
  );
};

export default Profile;
