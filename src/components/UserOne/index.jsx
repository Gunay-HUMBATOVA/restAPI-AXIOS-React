import "./index.css";

export default function UserOne() {


    function getImage() {}
    function handleChangeUserName() {}
    function handleChangeUserPSW() {}


    return (
        <div className="userOne">
            <form action="">
                <div className="header">
                    <h3>Edit profile</h3>
                    <div className="profileImg"></div>
                    <h3 className="userName">react7</h3>
                    <label htmlFor="file" className="changeImgFile">
                        change profile image
                        <input type="file" name="file" onChange={getImage}/>
                    </label>
                </div>
                <div className="article">
                    <label htmlFor="name">
                        Name
                        <input type="text" value="react7" onChange={handleChangeUserName} />
                    </label>
                    <label htmlFor="password">
                        Password
                        <input type="password" placeholder="new password" onChange={handleChangeUserPSW}/>
                    </label>
                </div>
                <div className="footer">
                    <button>Save</button>
                </div>
            </form>
        </div>
    )
}