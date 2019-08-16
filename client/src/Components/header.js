import React from 'react'
import '../form.css'

const Header = () => {
	return (
		<div>
			<div className="topBanner" style={{ backgroundImage: "url('top.jpg')" }}></div>

			<div style={{ height: "50px" }}></div>

			<div className="border">
				<div className="banner" style={{ backgroundImage: "url('bg-01.jpg')" }}>
				</div>
			</div>

			<div style={{ height: "50px" }}></div>
		</div>
	)
}

export default Header;

