export default function Profile() {
	return (
		<div>
			<div className="container">
				<div className="bg-img"></div>
				<div className="profile">
					<img
						className="profile-img"
						src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
						alt="image of the person of the profile"
					/>
					<h2>The name</h2>
					<div className="age">32</div>
					<div className="about-section">
						About me: Lorem ipsum dolor sit, amet consectetur adipisicing elit.
						Ratione vitae beatae officia provident nihil. Non, vel sed?
					</div>
				</div>
				<div className="footer">
					<div className="followers"></div>
					<div className="likes"></div>
					<div className="photos"></div>
				</div>
			</div>
		</div>
	);
}
